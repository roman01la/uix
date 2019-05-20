(ns uix.components
  (:require [uix.core.alpha :as uix]))

(defn alert [msg]
  [:ul {:style {:background "red"
                :color "white"
                :padding 8}}
   msg])

(uix/set-loaded! :components)
