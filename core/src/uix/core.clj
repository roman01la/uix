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
    (assert (= 1 (count fdecl))
            (str `defui " doesn't support multi-arity.\n"
                 "If you meant to make props an optional argument, you can safely skip it and have a single-arity component.\n
                 It's safe to destructure the props value even if it's `nil`."))
    (let [[args & fdecl] (first fdecl)]
      (assert (>= 1 (count args))
              (str `defui " is a single argument component taking a map of props, found: " args "\n"
                   "If you meant to retrieve `children`, they are under `:children` field in props map."))
      [(with-meta name m) args fdecl])))

(defmacro
  ^{:arglists '([name doc-string? attr-map? [params*] prepost-map? body]
                [name doc-string? attr-map? ([params*] prepost-map? body) + attr-map?])}
  defui
  "Compiles UIx component into React component at compile-time."
  [sym & fdecl]
  (let [[fname args fdecl] (parse-sig sym fdecl)]
    (uix.source/register-symbol! &env sym)
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
  (uix.source/source &env sym))

(defmacro $
  "Creates React element

  DOM element: ($ :button#id.class {:on-click handle-click} \"click me\")
  React component: ($ title-bar {:title \"Title\"})"
  ([tag]
   (uix.compiler.aot/compile-element [tag] {:env &env}))
  ([tag props & children]
   (uix.compiler.aot/compile-element (into [tag props] children) {:env &env})))

;; === Hooks ===

(defn vector->js-array [coll]
  (cond
    (vector? coll) `(jsfy-deps (cljs.core/array ~@coll))
    (some? coll) `(jsfy-deps ~coll)
    :else coll))

(defn- make-hook-with-deps [sym env form f deps]
  (hooks.linter/lint-exhaustive-deps! env form f deps)
  (if deps
    `(~sym ~f ~(vector->js-array deps))
    `(~sym ~f)))

(defmacro use-effect
  "Takes a function to be executed in an effect and optional vector of dependencies.

  See: https://reactjs.org/docs/hooks-reference.html#useeffect"
  ([f]
   (make-hook-with-deps 'uix.hooks.alpha/use-effect &env &form f nil))
  ([f deps]
   (make-hook-with-deps 'uix.hooks.alpha/use-effect &env &form f deps)))

(defmacro use-layout-effect
  "Takes a function to be executed in a layout effect and optional vector of dependencies.

  See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect"
  ([f]
   (make-hook-with-deps 'uix.hooks.alpha/use-layout-effect &env &form f nil))
  ([f deps]
   (make-hook-with-deps 'uix.hooks.alpha/use-layout-effect &env &form f deps)))

(defmacro use-memo
  "Takes function f and required vector of dependencies, and returns memoized result of f.

   See: https://reactjs.org/docs/hooks-reference.html#usememo"
  [f deps]
  (make-hook-with-deps 'uix.hooks.alpha/use-memo &env &form f deps))

(defmacro use-callback
  "Takes function f and required vector of dependencies, and returns memoized f.

  See: https://reactjs.org/docs/hooks-reference.html#usecallback"
  [f deps]
  (make-hook-with-deps 'uix.hooks.alpha/use-callback &env &form f deps))

(defmacro use-imperative-handle
  "Customizes the instance value that is exposed to parent components when using ref.

  See: https://reactjs.org/docs/hooks-reference.html#useimperativehandle"
  ([ref f]
   (hooks.linter/lint-exhaustive-deps! &env &form f nil)
   `(uix.hooks.alpha/use-imperative-handle ~ref ~f))
  ([ref f deps]
   (hooks.linter/lint-exhaustive-deps! &env &form f deps)
   `(uix.hooks.alpha/use-imperative-handle ~ref ~f ~(vector->js-array deps))))
