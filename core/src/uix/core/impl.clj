(ns uix.core.impl
  (:require [uix.hooks.linter :as hooks.linter]
            [uix.dev]))

(def ^:private goog-debug (with-meta 'goog.DEBUG {:tag 'boolean}))

(defn- no-args-component [sym body]
  `(defn ~sym []
     (let [f# (fn [] ~@body)]
       (if ~goog-debug
         (binding [uix.core/*current-component* ~sym] (f#))
         (f#)))))

(defn- with-args-component [sym args body]
  `(defn ~sym [props#]
     (let [~args (cljs.core/array (uix.core/glue-args props#))
           f# (fn [] ~@body)]
       (if ~goog-debug
         (binding [uix.core/*current-component* ~sym] (f#))
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
    (uix.lib/assert!
     (= 1 (count fdecl))
     (str "uix.core/defui doesn't support multi-arity.\n"
          "If you meant to make props an optional argument, you can safely skip it and have a single-arity component.\n
                  It's safe to destructure the props value even if it's `nil`."))
    (let [[args & fdecl] (first fdecl)]
      (uix.lib/assert!
       (>= 1 (count args))
       (str "uix.core/defui is a single argument component taking a map of props, found: " args "\n"
            "If you meant to retrieve `children`, they are under `:children` field in props map."))
      [(with-meta name m) args fdecl])))

(defn cljs-component [env sym fname args fdecl]
  (let [sym (with-meta sym {:tag 'js})
        body (uix.dev/with-fast-refresh sym fdecl)]
    `(do
       ~(if (empty? args)
          (no-args-component fname body)
          (with-args-component fname args body))
       (set! (.-uix-component? ~sym) true)
       (set! (.-displayName ~sym) ~(str (-> env :ns :name) "/" sym))
       ~(uix.dev/fast-refresh-signature sym body))))

(defn clj-component [fname args fdecl]
  `(defn ~fname ~args
     ~@fdecl))

;; === Hooks ===

(defn vector->js-array [coll]
  (cond
    (vector? coll) `(uix.core/jsfy-deps (cljs.core/array ~@coll))
    (some? coll) `(uix.core/jsfy-deps ~coll)
    :else coll))

(defn make-hook-with-deps [sym env form f deps]
  (hooks.linter/lint-exhaustive-deps! env form f deps)
  (if deps
    `(~sym ~f ~(vector->js-array deps))
    `(~sym ~f)))
