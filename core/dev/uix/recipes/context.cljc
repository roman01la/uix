(ns uix.recipes.context
  #?(:cljs (:require-macros [uix.recipes.context :refer [defcontext]]))
  (:require [uix.core.alpha :as uix.core]
            #?(:cljs [react :as react])))

#?(:clj
   (defmacro defcontext [name value]
     (if &env
       `(def ~name (react/createContext ~value))
       `(def ~(with-meta name {:dynamic true}) ~value))))

(defcontext ctx nil)

(defn component [f]
  (let [v (uix.core/context ctx)]
    [:button {:on-click f}
     v]))

(defn provider [ctx {:keys [value]} & children]
  #?(:cljs (into [:> (.-Provider ctx) {:value value}]
                 children)
     :clj (binding [ctx value]
            (into [:<>] children))))

(defn recipe []
  (let [v (uix.core/state 0)
        f (uix.core/callback #(swap! v inc) [])]
    [provider ctx {:value @v}
     [component f]]))
