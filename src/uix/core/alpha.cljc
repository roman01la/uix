(ns uix.core.alpha
  (:refer-clojure :exclude [ref])
  (:require #?(:clj [clojure.spec.alpha :as s])
            #?(:clj [uix.specs.alpha])
            #?(:cljs [react :as r])
            #?(:cljs [react-dom :as rdom])
            #?(:cljs ["react-dom/server" :as rdoms])
            #?(:cljs [cljs.loader])
            #?(:cljs [uix.compiler.alpha :as compiler])
            [uix.compiler.react :as uixr]
            [uix.hooks.alpha :as hooks]))

;; React's top-level API
(defn render [element node]
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

(defn render-to-string [element]
  #?(:cljs (rdoms/renderToString (compiler/as-element element))
     :clj nil))

(defn hydrate [element node]
  #?(:cljs (rdom/hydrate element node)
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
  #?(:cljs (rdom/createPortal child node)
     :clj nil))

#?(:clj (deftype ReactRef [current])
   :cljs
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
  ([]
   (create-ref nil))
  ([v]
   #?(:cljs (ReactRef. v)
      :clj nil)))

(def state hooks/state)
(def effect hooks/effect)
(def memo hooks/memo)
(def ref hooks/ref)

#?(:cljs
   (defn load-module [module get-var]
     (js/Promise.
       (fn [ok fail]
         (cljs.loader/load module
           #(ok #js {:default (compiler/as-lazy-component @(get-var))}))))))

(defn require-lazy* [module get-var]
  #?(:clj nil
     :cljs (r/lazy #(load-module module get-var))))

#?(:clj
   (defmacro require-lazy [form]
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
                       (require-lazy* ~module #(resolve '~qualified-sym)))))))))))

#?(:clj (defn set-loaded! [module])
   :cljs (defn set-loaded! [module]
           (cljs.loader/set-loaded! module)))

#?(:clj
   (defmacro html [expr]
     (uixr/compile-html expr &env)))

#?(:cljs
   (def add-attr-transformer compiler/add-attr-transformer))
