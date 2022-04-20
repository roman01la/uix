(ns uix.core
  "Public API"
  (:require [uix.compiler.aot]
            [uix.source]
            [cljs.core]
            [uix.hooks.linter :as hooks.linter]))

(def ^:private goog-debug (with-meta 'goog.DEBUG {:tag 'boolean}))

(defn- no-args-component [sym body]
  `(defn ~sym []
     (let [f# (fn [] ~@body)]
       (if ~goog-debug
         (binding [*current-component* ~sym] (f#))
         (f#)))))

(defn- with-args-component [sym args body]
  `(defn ~sym [props#]
     (let [~args (cljs.core/array (glue-args props#))
           f# (fn [] ~@body)]
       (if ~goog-debug
         (binding [*current-component* ~sym] (f#))
         (f#)))))

(defn parse-sig [name fdecl]
  (let [[fdecl m] (if (string? (first fdecl))
                    [(next fdecl) {:doc (first fdecl)}]
                    [fdecl {}])
        [fdecl m] (if (map? (first fdecl))
                    [(next fdecl) (conj m (first fdecl))]
                    [fdecl m])
        fdecl (if (vector? (first fdecl))
                (list fdecl)
                fdecl)
        [fdecl m] (if (map? (last fdecl))
                    [(butlast fdecl) (conj m (last fdecl))]
                    [fdecl m])
        m (conj {:arglists (list 'quote (#'cljs.core/sigs fdecl))} m)
        m (conj (if (meta name) (meta name) {}) m)]
    (assert (= 1 (count fdecl)) (str `defui " doesn't support multi-arity"))
    (let [[args & fdecl] (first fdecl)]
      (assert (>= 1 (count args))
              (str `defui " should be a single-arity component taking a map of props, found: " args "\n"
                   "If you meant to retrieve `children`, they are under `:children` field in props map"))
      [(with-meta name m) args fdecl])))

(defmacro
  ^{:arglists '([name doc-string? attr-map? [params*] prepost-map? body]
                [name doc-string? attr-map? ([params*] prepost-map? body)+ attr-map?])}
  defui
  "Compiles UIx component into React component at compile-time."
  [sym & fdecl]

  (let [[fname args fdecl] (parse-sig sym fdecl)]
    (uix.source/register-symbol! sym)
    (hooks.linter/lint! sym fdecl &env)
    `(do
       ~(if (empty? args)
          (no-args-component fname fdecl)
          (with-args-component fname args fdecl))
       (set! (.-uix-component? ~(with-meta sym {:tag 'js})) true)
       (with-name ~sym ~(-> &env :ns :name str) ~(str sym)))))

(defmacro source
  "Returns source string of UIx component"
  [sym]
  (uix.source/source sym))

(defmacro $
  "Creates React element

  DOM element: ($ :button#id.class {:on-click handle-click} \"click me\")
  React component: ($ title-bar {:title \"Title\"})"
  ([tag]
   (uix.compiler.aot/compile-element [tag]))
  ([tag props & children]
   (uix.compiler.aot/compile-element (into [tag props] children))))
