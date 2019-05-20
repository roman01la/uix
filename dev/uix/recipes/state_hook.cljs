(ns uix.recipes.state-hook
  (:require [uix.core.alpha :as uix]))

(defn recipe []
  (let [value (uix/state "Hello!")]
    [:div
     [:input {:value @value
              :on-change #(reset! value (.. % -target -value))}]
     [:div "Input text: " @value]]))
