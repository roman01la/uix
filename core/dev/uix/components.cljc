(ns uix.components
  #?(:cljs (:require [cljs.loader :as loader])))

(defn alert [msg]
  [:ul {:style {:background "red"
                :color "white"
                :padding 8}}
   msg])

#?(:cljs (loader/set-loaded! :components))
