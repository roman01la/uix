(ns uix.components
  (:require [cljs.loader :as loader]))

(defn alert [msg]
  [:ul {:style {:background "red"
                :color "white"
                :padding 8}}
   msg])

(loader/set-loaded! :components)
