(ns uix.core
  "Public API"
  (:refer-clojure :exclude [fn])
  (:require [clojure.core :as core]
            [uix.compiler.aot]
            [uix.source]
            [cljs.core]
            [uix.linter]
            [uix.dev]
            [uix.lib]))

(def ^:private goog-debug (with-meta 'goog.DEBUG {:tag 'boolean}))

(defn- no-args-component [sym var-sym body]
  `(defn ~sym []
     (let [f# (core/fn [] ~@body)]
       (if ~goog-debug
         (binding [*current-component* ~var-sym] (f#))
         (f#)))))

(defn- with-args-component [sym var-sym args body]
  `(defn ~sym [props#]
     (let [clj-props# (glue-args props#)
           ~args (cljs.core/array clj-props#)
           f# (core/fn [] ~@body)]
       (if ~goog-debug
         (binding [*current-component* ~var-sym]
           (assert (or (map? clj-props#)
                       (nil? clj-props#))
                   (str "UIx component expects a map of props, but instead got " clj-props#))
           (f#))
         (f#)))))

(defn- no-args-fn-component [sym var-sym body]
  `(core/fn ~sym []
     (let [f# (core/fn [] ~@body)]
       (if ~goog-debug
         (binding [*current-component* ~var-sym] (f#))
         (f#)))))

(defn- with-args-fn-component [sym var-sym args body]
  `(core/fn ~sym [props#]
     (let [clj-props# (glue-args props#)
           ~args (cljs.core/array clj-props#)
           f# (core/fn [] ~@body)]
       (if ~goog-debug
         (binding [*current-component* ~var-sym]
           (assert (or (map? clj-props#)
                       (nil? clj-props#))
                   (str "UIx component expects a map of props, but instead got " clj-props#))
           (f#))
         (f#)))))

(defn parse-sig [form name fdecl]
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
     (str form " doesn't support multi-arity.\n"
          "If you meant to make props an optional argument, you can safely skip it and have a single-arity component.\n
                 It's safe to destructure the props value even if it's `nil`."))
    (let [[args & fdecl] (first fdecl)]
      (uix.lib/assert!
       (>= 1 (count args))
       (str form " is a single argument component taking a map of props, found: " args "\n"
            "If you meant to retrieve `children`, they are under `:children` field in props map."))
      [(with-meta name m) args fdecl])))

(defmacro
  ^{:arglists '([name doc-string? attr-map? [params*] prepost-map? body]
                [name doc-string? attr-map? ([params*] prepost-map? body) + attr-map?])}
  defui
  "Creates UIx component. Similar to defn, but doesn't support multi arity.
  A component should have a single argument of props."
  [sym & fdecl]
  (let [[fname args fdecl] (parse-sig `defui sym fdecl)]
    (uix.linter/lint! sym fdecl &env)
    (if (uix.lib/cljs-env? &env)
      (let [var-sym (-> (str (-> &env :ns :name) "/" sym) symbol (with-meta {:tag 'js}))
            body (uix.dev/with-fast-refresh var-sym fdecl)]
        `(do
           ~(if (empty? args)
              (no-args-component fname var-sym body)
              (with-args-component fname var-sym args body))
           (set! (.-uix-component? ~var-sym) true)
           (set! (.-displayName ~var-sym) ~(str var-sym))
           ~(uix.dev/fast-refresh-signature var-sym body)))
      `(defn ~fname ~args
         ~@fdecl))))

(defmacro fn
  "Creates anonymous UIx component. Similar to fn, but doesn't support multi arity.
  A component should have a single argument of props."
  [& fdecl]
  (let [[sym fdecl] (if (symbol? (first fdecl))
                      [(first fdecl) (rest fdecl)]
                      [(gensym "uix-fn") fdecl])
        [fname args body] (parse-sig `fn sym fdecl)]
    (uix.linter/lint! sym body &env)
    (if (uix.lib/cljs-env? &env)
      (let [var-sym (with-meta sym {:tag 'js})]
        `(let [~var-sym ~(if (empty? args)
                           (no-args-fn-component fname var-sym body)
                           (with-args-fn-component fname var-sym args body))]
           (set! (.-uix-component? ~var-sym) true)
           (set! (.-displayName ~var-sym) ~(str var-sym))
           ~var-sym))
      `(core/fn ~fname ~args
         ~@fdecl))))

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
  (uix.linter/lint-exhaustive-deps! env form f deps)
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
   (uix.linter/lint-exhaustive-deps! &env &form f nil)
   `(uix.hooks.alpha/use-imperative-handle ~ref ~f))
  ([ref f deps]
   (uix.linter/lint-exhaustive-deps! &env &form f deps)
   `(uix.hooks.alpha/use-imperative-handle ~ref ~f ~(vector->js-array deps))))
