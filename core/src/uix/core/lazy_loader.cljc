(ns uix.core.lazy-loader
  #?(:cljs (:require-macros [uix.core.lazy-loader]))
  #?(:clj (:require [clojure.spec.alpha :as s]
                    [uix.specs.alpha]
                    [uix.lib])
     :cljs (:require [cljs.loader]
                     [react])))

#?(:cljs
   (def react-lazy react/lazy))

#?(:cljs
   (def load! cljs.loader/load))

#?(:clj
   (s/fdef require-lazy
     :args (s/cat :form :lazy/libspec)))

#?(:clj
   (defmacro require-lazy
     "require-like macro, returns lazy-loaded React components.

     (require-lazy '[my.ns.components :refer [c1 c2]])"
     [form]
     (if-not (uix.lib/cljs-env? &env)
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
                          on-load `(fn [ok# fail#] (load! ~module #(ok# ~export)))]
                      `(def ~sym (react-lazy (fn [] (~'js/Promise. ~on-load)))))))))))))
