(ns uix.core.alpha
  (:refer-clojure :exclude [ref])
  (:require #?(:clj [clojure.spec.alpha :as s])
            #?(:clj [uix.specs.alpha])
            #?(:cljs [react :as r])
            #?(:cljs [react-dom :as rdom])
            #?(:cljs [cljs.loader])
            [uix.compiler.alpha :as compiler]
            [uix.compiler.react :as uixr]
            [uix.hooks.alpha :as hooks]))

;; React's top-level API
(defn render
  "Renders element into DOM node. The first argument is Hiccup or React element."
  [element node]
  #?(:cljs
      (-> (compiler/as-element element)
          (rdom/render node))
     :clj nil))

(defn create-root [node]
  #?(:cljs (rdom/unstable_createRoot node)
     :clj nil))

(defn render-root [element root]
  #?(:cljs (.render root (compiler/as-element element))
     :clj nil))

(defn hydrate
  "Hydrates server rendered document at `node` with `element`."
  [element node]
  #?(:cljs (rdom/hydrate (compiler/as-element element) node)
     :clj nil))

(defn strict-mode [child]
  #?(:cljs [:> r/StrictMode child]
     :clj child))

(defn flush-sync* [cb]
  #?(:cljs (rdom/flushSync cb)
     :clj nil))

(defn flush-controlled* [cb]
  #?(:cljs (rdom/unstable_flushControlled cb)
     :clj nil))

#?(:clj
   (defmacro flush-sync [& body]
     `(flush-sync* (fn [] ~@body))))

#?(:clj
   (defmacro flush-controlled [& body]
     `(flush-controlled* (fn [] ~@body))))

(defn unmount-at-node [node]
  #?(:cljs (rdom/unmountComponentAtNode node)
     :clj nil))

(defn find-dom-node [component]
  #?(:cljs (rdom/findDOMNode component)
     :clj nil))

(defn create-portal [child node]
  #?(:cljs (rdom/createPortal (compiler/as-element child) node)
     :clj [:-> child node]))

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

#?(:cljs
   (defn- load-module [module get-var]
     (js/Promise.
       (fn [ok fail]
         (cljs.loader/load module
           #(ok #js {:default (compiler/as-lazy-component @(get-var))}))))))

(defn require-lazy* [module get-var]
  #?(:clj nil
     :cljs (r/lazy #(load-module module get-var))))

#?(:clj
   (s/fdef require-lazy
     :args (s/cat :form :lazy/libspec)))

#?(:clj
   (defmacro require-lazy
     "require-like macro, creates lazy-loaded React components.

     (require-lazy '[my.ns.components :refer [c1 c2]])"
     [form]
     (if-not &env
       `(require ~form)
       (let [m (s/conform :lazy/libspec form)]
         (when (not= m :clojure.spec.alpha/invalid)
           (let [{:keys [lib refer]} (:libspec m)
                 module (->> (str lib)
                             (re-find #"\.([a-z0-9-]+)")
                             second
                             keyword)]
             `(do
                ~@(for [sym refer]
                    (let [qualified-sym (symbol (str lib "/" sym))]
                      `(def ~sym
                         (require-lazy* ~module #(resolve '~qualified-sym))))))))))))

#?(:clj (defn set-loaded! [module])
   :cljs (defn set-loaded!
           "Wrapper for cljs.loader/set-loaded!"
           [module]
           (cljs.loader/set-loaded! module)))

#?(:clj
   (defmacro html
     "Compiles Hiccup into React elements at compile-time."
     [expr]
     (uixr/compile-html expr &env)))

#?(:clj
   (defmacro defui [sym args & body]
     (if-not &env
       `(defn ~sym ~args ~@body)
       `(defn ~sym ~args
          (uixr/compile-defui ~sym ~body)))))

#?(:cljs
   (def as-element
     "Compiles Hiccup into React elements at run-time."
     compiler/as-element))

#?(:cljs
   (def add-transform-fn
     "Injects attributes transforming function for Hiccup elements pre-transformations"
     compiler/add-transform-fn))

#?(:clj
   (def render-to-string
     "Renders to HTML string to be used with React"
     compiler/render-to-string))

#?(:clj
   (def render-to-static-markup
     "Renders to HTML string"
     compiler/render-to-static-markup))
