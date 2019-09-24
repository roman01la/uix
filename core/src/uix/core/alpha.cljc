(ns uix.core.alpha
  "Public API"
  (:refer-clojure :exclude [ref memoize])
  (:require #?(:clj [clojure.spec.alpha :as s])
            #?(:clj [uix.specs.alpha])
            #?(:cljs [react :as r])
            [uix.compiler.alpha :as compiler]
            [uix.compiler.react :as uixr]
            [uix.hooks.alpha :as hooks]))

(declare as-element)

;; React's top-level API

(defn strict-mode [child]
  #?(:cljs [:> r/StrictMode child]
     :clj child))

#?(:cljs
    (defn create-class
      "Creates class based React component"
      [{:keys [init-state static prototype] :or {init-state #js {}}}]
      (let [ctor (fn []
                   (this-as this
                     (.apply r/Component this (js-arguments))
                     (set! (.-state this) init-state))
                   nil)]
        (set! (.-prototype ctor) (.create js/Object (.-prototype r/Component)))
        (doseq [[k v] static]
          (aset ctor (name k) v))
        (doseq [[k v] prototype]
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
       (let [render (fn []
                      (this-as this
                        (-> (render-fn (.. this -state -argv)
                                       (.. this -props -argv))
                            as-element)))
             klass (create-class {:static {:displayName display-name
                                           :getDerivedStateFromError (fn [error] #js {:argv (error->state error)})}
                                  :prototype {:componentDidCatch handle-catch
                                              :render render}})]
         (fn [& args]
           (r/createElement klass #js {:argv args})))

      :clj (fn [& args]
             (try
               (render-fn nil args)
               (catch Exception e
                 (handle-catch e nil)
                 (render-fn (error->state e) args))))))

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

(defn default-compare-args [a b]
  (= (.-argv a) (.-argv b)))

(defn memoize
  "Takes component `f` and comparator function `should-update?`
  that takes previous and next props of the component.
  Returns memoized `f`.

  When `should-update?` is not provided uses default comparator
  that compares props with clojure.core/="
  ([f]
   (memoize f default-compare-args))
  ([f should-update?]
   #?(:cljs (react/memo #(compiler/as-element (apply f (next (.-argv %))))
                        should-update?)
      :clj f)))

(def state
  "Returns React's state hook wrapped in atom-like type."
  hooks/state)

(def effect!
  "React's effect hook. Takes callback and deps."
  hooks/effect!)

(def layout-effect!
  "React's layout effect hook. Takes callback and deps."
  hooks/layout-effect!)

(def memo
  "React's memo hook. Takes callback and deps."
  hooks/memo)

(def ref
  "Returns React's ref hook wrapped in atom-like type. Takes optional initial value."
  hooks/ref)

(def callback
  "React's callback hook. Takes callback and deps."
  hooks/callback)

#?(:clj
   (defmacro with-effect
     "Convenience macro for effect hook."
     [deps & body]
     `(hooks/with-effect ~deps ~body)))

#?(:clj
   (defmacro with-layout-effect
     "Convenience macro for layout effect hook."
     [deps & body]
     `(hooks/with-layout-effect ~deps ~body)))


#?(:clj
   (s/fdef require-lazy
     :args (s/cat :form :lazy/libspec)))

#?(:clj
   (defmacro require-lazy
     "require-like macro, returns lazy-loaded React components.

     (require-lazy '[my.ns.components :refer [c1 c2]])"
     [form]
     (if-not &env
       `(clojure.core/require ~form)
       (let [m (s/conform :lazy/libspec form)]
         (when (not= m :clojure.spec.alpha/invalid)
           (let [{:keys [lib refer]} (:libspec m)
                 module (->> (str lib)
                             (re-find #"\.([a-z0-9-]+)")
                             second
                             keyword)]
             `(do
                ~@(for [sym refer]
                    (let [qualified-sym (symbol (str lib "/" sym))
                          as-lazy `(uix.compiler.alpha/as-lazy-component (deref (cljs.core/resolve '~qualified-sym)))
                          export `(cljs.core/js-obj "default" ~as-lazy)
                          on-load `(fn [ok# fail#] (cljs.loader/load ~module #(ok# ~export)))]
                      `(def ~sym (~'js/React.lazy (fn [] (~'js/Promise. ~on-load)))))))))))))

#?(:clj
   (defmacro html
     "Compiles Hiccup into React elements at compile-time."
     [expr]
     (uixr/compile-html expr &env)))

#?(:clj
   (defmacro defui
     "Compiles UIx component into React component at compile-time."
     [sym args & body]
     (if-not &env
       `(defn ~sym ~args ~@body)
       `(defn ~sym ~args
          (uixr/compile-defui ~sym ~body)))))

#?(:clj
   (defmacro use-let
     "Bind variables as with let, except that the bindings are only evaluated once."
     [bindings & body]
     (if-not &env
       `(let ~bindings ~@body)
       (let [ref-bindings
             (->> (partition 2 bindings)
                  (reduce (fn [ret [sym v]]
                            (conj ret sym `(cljs.core/-deref (ref ~v))))
                          []))]
         `(let ~ref-bindings
               ~@body)))))

(defn as-element [x]
  "Compiles Hiccup into React elements at run-time."
  #?(:cljs (compiler/as-element x)
     :clj x))

(defn as-react [f]
  #?(:cljs (compiler/as-react f)
     :clj f))

(def add-transform-fn
  "Injects attributes transforming function for Hiccup elements pre-transformations"
  compiler/add-transform-fn)
