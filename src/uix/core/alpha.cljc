(ns uix.core.alpha
  (:refer-clojure :exclude [ref])
  (:require #?(:clj [clojure.spec.alpha :as s])
            #?(:cljs [cljs.spec.alpha :as s])
            #?(:cljs [react :as r])
            #?(:cljs [react-dom :as rdom])
            #?(:cljs [cljs.loader])
            [uix.compiler.alpha :as compiler]
            [uix.specs.alpha]))

(defn hiccup->react [element]
  (if (s/valid? :hiccup/form element)
    (-> (s/conform :hiccup/form element)
        compiler/compile-hiccup-ast)
    (prn (s/explain-data :hiccup/form element))))

(defn debug-name [v m]
  #?(:cljs
     (let [{ns' :ns name' :name} m
           unmangled-name (str ns' "/" name')]
       (set! (.-displayName v) unmangled-name))
     :clj (fn [v m])))

(defn use-memo [f]
  #?(:cljs (r/memo f #(= (.-uixargs %1) (.-uixargs %2)))
     :clj f))

#?(:clj
   (defmacro defui [sym args & body]
     `(do
        (def ~sym
          (use-memo
            (fn [prop#]
              (let [~args (.-uixargs prop#)]
                (hiccup->react (do ~@body))))))
        (debug-name ~sym (meta (var ~sym))))))

;; React's top-level API
(defn render [element node]
  #?(:cljs
      (-> (hiccup->react element)
          (rdom/render node))
     :clj nil))

(defn hydrate [element node]
  #?(:cljs (rdom/hydrate element node)
     :clj nil))

(defn unmount-at-node [node]
  #?(:cljs (rdom/unmountComponentAtNode node)
     :clj nil))

(defn find-dom-node [component]
  #?(:cljs (rdom/findDOMNode component)
     :clj nil))

(defn create-portal [child node]
  #?(:cljs (rdom/createPortal child node)
     :clj nil))

#?(:clj (deftype ReactRef [-ref])
   :cljs
   (deftype ReactRef [rref]
     IDeref
     (-deref [o]
       (.-current rref))))

(defn ref []
  #?(:cljs (ReactRef. (r/createRef))
     :clj nil))

#?(:cljs
   (defn load-module [module get-var]
     (js/Promise.
       (fn [ok fail]
         (cljs.loader/load module #(ok #js {:default @(get-var)}))))))

(defn require-lazy* [module get-var]
  #?(:clj nil
     :cljs (r/lazy #(load-module module get-var))))

#?(:clj
   (defmacro require-lazy [form]
     (let [m (s/conform :lazy/libspec form)]
       (when (not= m ::s/invalid)
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
