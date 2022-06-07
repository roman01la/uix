(ns uix.core
  "Public API"
  (:require-macros [uix.core])
  (:require [goog.object :as gobj]
            [react]
            [uix.compiler.debug :as debug]
            [uix.hooks.alpha :as hooks]
            [uix.compiler.alpha :as compiler]
            [uix.compiler.aot]
            [uix.lib :refer [doseq-loop map->js]]))

(def ^:dynamic *current-component*)

;; React's top-level API

(def ^:private built-in-static-method-names
  [:childContextTypes :contextTypes :contextType
   :getDerivedStateFromProps :getDerivedStateFromError])

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
  (let [methods (map->js (apply dissoc fields :displayName :getInitialState :constructor :render
                                built-in-static-method-names))
        static-methods (map->js (select-keys fields built-in-static-method-names))
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
    ctor))

(defn create-ref
  "Creates React's ref type object."
  []
  (react/createRef))

(defn glue-args [^js props]
  (cond-> (.-argv props)
    (.-children props) (assoc :children (.-children props))))

(defn- memo-compare-args [a b]
  (= (glue-args a) (glue-args b)))

(defn memo
  "Takes component `f` and optional comparator function `should-update?`
  that takes previous and next props of the component.
  Returns memoized `f`.

  When `should-update?` is not provided uses default comparator
  that compares props with clojure.core/="
  ([f]
   (memo f memo-compare-args))
  ([^js f should-update?]
   (let [fm (react/memo f should-update?)]
     (when (.-uix-component? f)
       (set! (.-uix-component? fm) true))
     fm)))

(defn use-state
  "Takes initial value or a function that computes it and returns a stateful value,
  and a function to update it.

  See: https://reactjs.org/docs/hooks-reference.html#usestate"
  [value]
  (hooks/use-state value))

(defn use-reducer
  "An alternative to `use-state`. Accepts a reducer of type (state, action) => new-state,
  and returns the current state paired with a dispatch method.

  See: https://reactjs.org/docs/hooks-reference.html#usereducer"
  ([f value]
   (hooks/use-reducer f value))
  ([f value init-state]
   (hooks/use-reducer f value init-state)))

(defn use-ref
  "Takes optional initial value and returns React's ref hook wrapped in atom-like type."
  ([]
   (use-ref nil))
  ([value]
   (let [ref (hooks/use-ref nil)]
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
     (.-current ref))))

(defn create-context
  "Creates React Context with an optional default value"
  ([]
   (react/createContext))
  ([default-value]
   (react/createContext default-value)))

(defn use-context
  "Takes React context and returns its current value"
  [context]
  (hooks/use-context context))

(defn as-react
  "Interop with React components. Takes UIx component function and returns same component wrapped into interop layer."
  [f]
  (compiler/as-react f))

(defn stringify-clojure-primitives [v]
  (cond
    ;; fast direct lookup for a string value
    ;; already stored on the instance of the known type
    (keyword? v) (.-fqn v)
    (uuid? v) (.-uuid v)
    (symbol? v) (.-str v)
    :else v))

(defn jsfy-deps [coll]
  (if (or (js/Array.isArray coll)
          (vector? coll))
    (reduce (fn [arr v]
              (.push arr (stringify-clojure-primitives v))
              arr)
            #js []
            coll)
    coll))

(defn lazy [f]
  (let [lazy-component (react/lazy #(.then (f) (fn [component] #js {:default component})))]
    (set! (.-uix-component? lazy-component) true)
    lazy-component))
