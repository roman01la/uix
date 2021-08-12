(ns uix.core.alpha
  "Public API"
  (:refer-clojure :exclude [ref memoize])
  #?(:cljs (:require-macros [uix.core.alpha]))
  (:require #?(:cljs [react :as r])
            [uix.compiler.alpha :as compiler]
            [uix.compiler.aot :as uixr]
            [uix.lib :refer [doseq-loop]]
            [uix.hooks.alpha :as hooks]))

;; See https://twitter.com/roman01la/status/1182405182057058314?s=20
;; for context
#?(:cljs
   (when (and ^boolean goog.DEBUG
              (exists? js/__REACT_DEVTOOLS_GLOBAL_HOOK__))
     (defonce __devtools-hook
       (let [value (volatile! nil)
             react-type-setter (fn [v]
                                 (vreset! value v))
             react-type-getter (fn []
                                 (if-let [uixf (.-uixf @value)]
                                   uixf
                                   @value))
             config #js {:get react-type-getter
                         :set react-type-setter}]
         (.defineProperty js/Object js/window "$type" config)))))

(declare as-element)

;; React's top-level API

(defn strict-mode [child]
  #?(:cljs [:> r/StrictMode child]
     :clj child))

(defn profiler [child {:keys [id on-render] :as attrs}]
  #?(:cljs [:> r/Profiler attrs child]
     :clj child))

#?(:cljs
    (defn create-class
      "Creates class based React component"
      [{:keys [constructor static prototype]}]
      (let [ctor (fn [props]
                   (this-as this
                     (.apply r/Component this (js-arguments))
                     (when constructor
                       (constructor this props)))
                   nil)]
        (set! (.-prototype ctor) (.create js/Object (.-prototype r/Component)))
        (doseq-loop [[k v] static]
          (aset ctor (name k) v))
        (doseq-loop [[k v] prototype]
          (aset (.-prototype ctor) (name k) v))
        ctor)))

 (defn create-error-boundary
   "Creates React's Error Boundary component

    display-name — the name of the component to be displayed in stack trace
    error->state — maps error object to component's state that is used in render-fn
    handle-catch — for side-effects, logging etc.
    render-fn — takes state value returned from error->state and a vector of arguments passed into error boundary"
   [{:keys [display-name error->state handle-catch]
     :or {display-name (str (gensym "error-boundary"))}}
    render-fn]
   #?(:cljs
       (let [constructor (fn [^js/React.Component this _]
                           (set! (.-state this) #js {:argv nil})
                           (specify! (.-state this)
                             IDeref
                             (-deref [o]
                               (.. this -state -argv))
                             IReset
                             (-reset! [o new-value]
                               (.setState this #js {:argv new-value})
                               new-value)
                             ISwap
                             (-swap!
                               ([o f]
                                (-reset! o (f (-deref o))))
                               ([o f a]
                                (-reset! o (f (-deref o) a)))
                               ([o f a b]
                                (-reset! o (f (-deref o) a b)))
                               ([o f a b xs]
                                (-reset! o (apply f (-deref o) a b xs))))))
             derive-state (fn [error] #js {:argv (error->state error)})
             render (fn []
                      (this-as this
                        (let [args (.. this -props -argv)
                              state (.-state this)]
                          (-> (render-fn state args)
                              as-element))))
             klass (create-class {:constructor constructor
                                  :static {:displayName display-name
                                           :getDerivedStateFromError derive-state}
                                  :prototype {:componentDidCatch handle-catch
                                              :render render}})]
         (fn [& args]
           (r/createElement klass #js {:argv args})))

      :clj ^::error-boundary {:display-name display-name
                              :render-fn render-fn
                              :handle-catch handle-catch
                              :error->state error->state}))

#?(:cljs
   (deftype ReactRef [current]
     Object
     (equiv [this other]
       (-equiv this other))

     IHash
     (-hash [o] (goog/getUid o))

     IDeref
     (-deref [o]
       current)

     IPrintWithWriter
     (-pr-writer [o writer opts]
       (-write writer "#object [uix.core.alpha.ReactRef ")
       (pr-writer {:val (-deref o)} writer opts)
       (-write writer "]"))))

(defn create-ref
  "Creates React's ref type object."
  ([]
   (create-ref nil))
  ([v]
   #?(:cljs (ReactRef. v)
      :clj (atom v))))

(defn memoize
  "Takes component `f` and comparator function `should-update?`
  that takes previous and next props of the component.
  Returns memoized `f`.

  When `should-update?` is not provided uses default comparator
  that compares props with clojure.core/=

  UIx components are memoized by default"
  ([f]
   (memoize f #?(:cljs compiler/*default-compare-args*
                 :clj nil)))
  ([f should-update?]
   #?(:cljs (react/memo #(compiler/as-element (apply f (next (.-argv %))))
                        should-update?)
      :clj f)))

(defn no-memoize!
  "Disables memoization of the `f` component"
  [f]
  #?(:cljs (set! (.-uix-no-memo f) true)))

(defn state
  "Takes initial value and returns React's state hook wrapped in atom-like type."
  [value]
  (hooks/state value))

(defn cursor-in
  "Takes ref type value and path vector and returns ref type cursor value watching into original ref"
  [ref path]
  (hooks/cursor-in ref path))

(defn effect!
  "Takes a function to be executed in an effect and optional vector of dependencies.

  See: https://reactjs.org/docs/hooks-reference.html#useeffect"
  ([setup-fn]
   (hooks/effect! setup-fn))
  ([setup-fn deps]
   (hooks/effect! setup-fn deps)))

(defn layout-effect!
  "Takes a function to be executed in a layout effect and optional vector of dependencies.

  See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect"
  ([setup-fn]
   (hooks/layout-effect! setup-fn))
  ([setup-fn deps]
   (hooks/layout-effect! setup-fn deps)))

(defn memo
  "Takes function f and optional vector of dependencies, and returns memoized f."
  ([f]
   (hooks/memo f))
  ([f deps]
   (hooks/memo f deps)))

(defn ref
  "Takes optional initial value and returns React's ref hook wrapped in atom-like type."
  ([]
   (hooks/ref nil))
  ([value]
   (hooks/ref value)))

(defn callback
  "Takes function f and optional vector of dependencies, and returns f."
  ([f]
   (hooks/callback f))
  ([f deps]
   (hooks/callback f deps)))

(defn subscribe
  "subscribe - fn, takes callback, sets up a listener on external event emitter
               which calls the callback and returns a function that unsets the listener.

  get-current-value - fn, returns current state of the external event emitter"
  [{:keys [get-current-value subscribe] :as subscription}]
  (hooks/subscribe subscription))

#?(:cljs
   (defn create-context [v]
     (react/createContext v)))

#?(:clj
   (defmacro defcontext
     "cljs: Creates React context with initial value set to `value`.
     clj: Create dynamic var bound to `value`."
     ([name]
      (if (uix.lib/cljs-env? &env)
        `(def ~(with-meta name {:dynamic true}) (create-context nil))
        `(def ~(with-meta name {:dynamic true}))))
     ([name value]
      (if (uix.lib/cljs-env? &env)
        `(def ~(with-meta name {:dynamic true}) (create-context ~value))
        `(def ~(with-meta name {:dynamic true}) ~value)))))

(defn context
  "Takes React context and returns its current value"
  [v]
  (hooks/context v))

#?(:clj
   (defmacro context-provider
     "Takes a binding form where `ctx` is React context and `value` is a supplied value
     and any number of and child components.
     cljs: Injects provided value into the context for current components sub-tree.
     clj: Creates new bindings for `ctx` with supplied `value`, see clojure.core/binding "
     [[ctx value] & children]
     (if (uix.lib/cljs-env? &env)
       (into [:> `(.-Provider ~ctx) {:value value}]
             children)
       `(binding [~ctx ~value]
          ~(into [:<>! `(fn [f#] (binding [~ctx ~value] (f#)))] children)))))

#?(:clj
   (defmacro with-effect
     "Convenience macro for effect hook."
     [deps & body]
     `(hooks/with-effect ~deps ~@body)))

#?(:clj
   (defmacro with-layout-effect
     "Convenience macro for layout effect hook."
     [deps & body]
     `(hooks/with-layout-effect ~deps ~@body)))

#?(:clj
   (defmacro html
     "Compiles Hiccup into React elements at compile-time."
     [expr]
     (uixr/compile-html expr &env)))

#?(:clj
   (defmacro defui
     "Compiles UIx component into React component at compile-time."
     [sym args & body]
     (if-not (uix.lib/cljs-env? &env)
       `(defn ~sym ~args ~@body)
       `(defn ~sym ~args
          (uixr/compile-defui ~sym ~body)))))

(defn as-element
  "Compiles Hiccup into React elements at run-time."
  [x]
  #?(:cljs (compiler/as-element x)
     :clj x))

(defn as-react
  "Interop with React components. Takes UIx component function and returns same component wrapped into interop layer."
  [f]
  #?(:cljs (compiler/as-react f)
     :clj f))

(defn add-transform-fn [f]
  "Injects attributes transforming function for Hiccup elements pre-transformations"
  (compiler/add-transform-fn f))
