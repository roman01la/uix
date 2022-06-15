(ns uix.core
  "Public API"
  #?(:cljs (:require-macros [uix.core]))
  (:require [uix.compiler.aot]
            [uix.lib]
            #?@(:clj [[cljs.core]
                      [uix.core.impl :as impl]
                      [uix.source]
                      [uix.hooks.linter :as hooks.linter]])
            #?@(:cljs [[goog.object :as gobj]
                       [react]
                       [cljs-bean.core :as bean]
                       [uix.hooks.alpha :as hooks]])))

(def ^:dynamic *current-component*)

#?(:clj
    (defmacro
      ^{:arglists '([name doc-string? attr-map? [params*] prepost-map? body]
                    [name doc-string? attr-map? ([params*] prepost-map? body) + attr-map?])}
      defui
      "Creates UIx component. Similar to defn, but doesn't support multi arity.
      A component should have a single argument of props."
      [sym & fdecl]
      (let [[fname args fdecl] (impl/parse-sig sym fdecl)]
        (hooks.linter/lint! sym fdecl &env)
        (if (uix.lib/cljs-env? &env)
          (impl/cljs-component &env sym fname args fdecl)
          (impl/clj-component fname args fdecl)))))

#?(:clj
    (defmacro source
      "Returns source string of UIx component"
      [sym]
      ;; FIXME
      (if (uix.lib/cljs-env? &env)
        (uix.source/source &env sym))))

#?(:clj
    (defmacro $
      "Creates React element

      DOM element: ($ :button#id.class {:on-click handle-click} \"click me\")
      React component: ($ title-bar {:title \"Title\"})"
      ([tag]
       (uix.compiler.aot/compile-element [tag] {:env &env}))
      ([tag props & children]
       (uix.compiler.aot/compile-element (into [tag props] children) {:env &env}))))

;; React's top-level API

#?(:cljs
    (def ^:private built-in-static-method-names
      [:childContextTypes :contextTypes :contextType
       :getDerivedStateFromProps :getDerivedStateFromError]))

;; TODO: clj
#?(:cljs
    (defn create-class
      "Creates class based React component"
      [{:keys [constructor getInitialState render
               ;; lifecycle methods
               componentDidMount componentDidUpdate componentDidCatch
               shouldComponentUpdate getSnapshotBeforeUpdate componentWillUnmount
               ;; static methods
               childContextTypes contextTypes contextType
               getDerivedStateFromProps getDerivedStateFromError
               ;; class properties
               defaultProps displayName]
        :as fields}]
      (let [methods (uix.lib/map->js (apply dissoc fields :displayName :getInitialState :constructor :render
                                            built-in-static-method-names))
            static-methods (uix.lib/map->js (select-keys fields built-in-static-method-names))
            ctor (fn [props]
                   (this-as this
                            (.apply react/Component this (js-arguments))
                            (when constructor
                              (constructor this props))
                            (when getInitialState
                              (set! (.-state this) (getInitialState this)))
                            this))]
        (gobj/extend (.-prototype ctor) (.-prototype react/Component) methods)
        (when render (set! (.-render ^js (.-prototype ctor)) render))
        (gobj/extend ctor react/Component static-methods)
        (when displayName
          (set! (.-displayName ctor) displayName)
          (set! (.-cljs$lang$ctorStr ctor) displayName)
          (set! (.-cljs$lang$ctorPrWriter ctor)
                (fn [this writer opt]
                  (-write writer displayName))))
        (set! (.-cljs$lang$type ctor) true)
        (set! (.. ctor -prototype -constructor) ctor)
        (set! (.-uix-component? ctor) true)
        ctor)))

#?(:cljs
    (defn atomify-ref [ref value]
      (when (nil? (.-current ref))
        (set! (.-current ref)
              (specify! #js {:current value}
                IDeref
                (-deref [this]
                  (.-current this))

                IReset
                (-reset! [this v]
                  (set! (.-current ^js this) v))

                ISwap
                (-swap!
                  ([this f]
                   (set! (.-current ^js this) (f (.-current ^js this))))
                  ([this f a]
                   (set! (.-current ^js this) (f (.-current ^js this) a)))
                  ([this f a b]
                   (set! (.-current ^js this) (f (.-current ^js this) a b)))
                  ([this f a b xs]
                   (set! (.-current ^js this) (apply f (.-current ^js this) a b xs)))))))
      (.-current ref)))

(defn create-ref
  "Creates React's ref type object wrapped in atom-like type."
  []
  #?(:clj (atom nil)
     :cljs (atomify-ref (react/createRef) nil)))

#?(:cljs
    (defn glue-args [^js props]
      (cond-> (.-argv props)
        (.-children props) (assoc :children (.-children props)))))

(defn- memo-compare-args [a b]
  #?(:cljs (= (glue-args a) (glue-args b))))

(defn memo
  "Takes component `f` and optional comparator function `should-update?`
  that takes previous and next props of the component.
  Returns memoized `f`.

  When `should-update?` is not provided uses default comparator
  that compares props with clojure.core/="
  ([f]
   (memo f memo-compare-args))
  ([f should-update?]
   #?(:cljs
       (let [fm (react/memo f should-update?)]
         (when (.-uix-component? ^js f)
           (set! (.-uix-component? fm) true))
         fm)
      :clj f)))

#?(:clj
   (defn- not-supported-error [& args]
     (throw (Error. "Can't call set-state when rendering on JVM"))))

;;;;;;;;; Hooks

#?(:clj
    (defmacro use-effect
      "Takes a function to be executed in an effect and optional vector of dependencies.

      See: https://reactjs.org/docs/hooks-reference.html#useeffect"
      ([f]
       (when (uix.lib/cljs-env? &env)
         (impl/make-hook-with-deps 'uix.hooks.alpha/use-effect &env &form f nil)))
      ([f deps]
       (when (uix.lib/cljs-env? &env)
         (impl/make-hook-with-deps 'uix.hooks.alpha/use-effect &env &form f deps)))))

#?(:clj
    (defmacro use-layout-effect
      "Takes a function to be executed in a layout effect and optional vector of dependencies.

      See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect"
      ([f]
       (when (uix.lib/cljs-env? &env)
         (impl/make-hook-with-deps 'uix.hooks.alpha/use-layout-effect &env &form f nil)))
      ([f deps]
       (when (uix.lib/cljs-env? &env)
         (impl/make-hook-with-deps 'uix.hooks.alpha/use-layout-effect &env &form f deps)))))

#?(:clj
    (defmacro use-memo
      "Takes function f and required vector of dependencies, and returns memoized result of f.

      See: https://reactjs.org/docs/hooks-reference.html#usememo"
      [f deps]
      (if (uix.lib/cljs-env? &env)
        (impl/make-hook-with-deps 'uix.hooks.alpha/use-memo &env &form f deps)
        `(~f))))

#?(:clj
    (defmacro use-callback
      "Takes function f and required vector of dependencies, and returns memoized f.

      See: https://reactjs.org/docs/hooks-reference.html#usecallback"
      [f deps]
      (if (uix.lib/cljs-env? &env)
        (impl/make-hook-with-deps 'uix.hooks.alpha/use-callback &env &form f deps)
        f)))

#?(:clj
    (defmacro use-imperative-handle
      "Customizes the instance value that is exposed to parent components when using ref.

      See: https://reactjs.org/docs/hooks-reference.html#useimperativehandle"
      ([ref f]
       (when (uix.lib/cljs-env? &env)
         (hooks.linter/lint-exhaustive-deps! &env &form f nil)
         `(uix.hooks.alpha/use-imperative-handle ~ref ~f)))
      ([ref f deps]
       (when (uix.lib/cljs-env? &env)
         (hooks.linter/lint-exhaustive-deps! &env &form f deps)
         `(uix.hooks.alpha/use-imperative-handle ~ref ~f ~(impl/vector->js-array deps))))))

(defn use-state
  "Takes initial value or a function that computes it and returns a stateful value,
  and a function to update it.

  See: https://reactjs.org/docs/hooks-reference.html#usestate"
  [value]
  #?(:cljs (hooks/use-state value)
     :clj [value not-supported-error]))

(defn use-reducer
  "An alternative to `use-state`. Accepts a reducer of type (state, action) => new-state,
  and returns the current state paired with a dispatch method.

  See: https://reactjs.org/docs/hooks-reference.html#usereducer"
  ([f value]
   #?(:cljs (hooks/use-reducer f value)
      :clj [value not-supported-error]))
  ([f value init-state]
   #?(:cljs (hooks/use-reducer f value init-state)
      :clj [value not-supported-error])))

(defn use-ref
  "Takes optional initial value and returns React's ref hook wrapped in atom-like type."
  ([]
   (use-ref nil))
  ([value]
   #?(:clj (atom value)
      :cljs (atomify-ref (hooks/use-ref nil) value))))

#?(:cljs
    (defn create-context
      "Creates React Context with an optional default value"
      ([]
       (react/createContext))
      ([default-value]
       (react/createContext default-value))))

#?(:clj
   (defmacro defcontext
     "Creates React context with initial value set to `value`."
     ([name]
      (let [sym (with-meta name {:uix/context true :dynamic true})]
        (if (uix.lib/cljs-env? &env)
          `(def ~sym (create-context))
          `(def ~sym))))
     ([name value]
      (let [sym (with-meta name {:uix/context true :dynamic true})]
        (if (uix.lib/cljs-env? &env)
          `(def ~sym (create-context ~value))
          `(def ~sym ~value))))))

(defn use-context
  "Takes React context and returns its current value"
  [context]
  #?(:cljs (hooks/use-context context)
     :clj context))

(defn as-react
  "Interop with React components. Takes UIx component function
  and returns same component wrapped into interop layer."
  [f]
  #?(:cljs #(f #js {:argv (bean/bean %)})
     :clj f))

#?(:cljs
    (defn stringify-clojure-primitives [v]
      (cond
        ;; fast direct lookup for a string value
        ;; already stored on the instance of the known type
        (keyword? v) (.-fqn v)
        (uuid? v) (.-uuid v)
        (symbol? v) (.-str v)
        :else v)))

#?(:cljs
    (defn jsfy-deps [coll]
      (if (or (js/Array.isArray coll)
              (vector? coll))
        (reduce (fn [arr v]
                  (.push arr (stringify-clojure-primitives v))
                  arr)
                #js []
                coll)
        coll)))

(defn lazy
  "Like React.lazy, but supposed to be used with UIx components"
  [f]
  #?(:cljs
      (let [lazy-component (react/lazy #(.then (f) (fn [component] #js {:default component})))]
        (set! (.-uix-component? lazy-component) true)
        lazy-component)
     :clj f))
