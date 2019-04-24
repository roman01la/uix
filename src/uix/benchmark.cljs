(ns uix.benchmark
  (:require-macros [uix.benchmark :refer [bench]])
  (:require [reagent.core :as r]
            [uix.compiler.reagent :as uix]))

(defn reagent-interpret [{:keys [title body items]}]
  (r/as-element
    [:div.card
     [:div.card-title title]
     [:div.card-body body]
     [:ul.card-list
      (for [item items]
        ^{:key item} [:li item])]
     [:div.card-footer
      [:div.card-actions
       [:button "ok"]
       [:button "cancel"]]]]))

(defn uix-interpret [{:keys [title body items]}]
  (uix/as-element
    [:div.card
     [:div.card-title title]
     [:div.card-body body]
     [:ul.card-list
      (for [item items]
        ^{:key item} [:li item])]
     [:div.card-footer
      [:div.card-actions
       [:button "ok"]
       [:button "cancel"]]]]))

(let [data {:title "hello world"
            :body "body"
            :items (shuffle (range 10))}]

  (bench :uix-interpret 10000 (uix-interpret data))
  (bench :uix-interpret 10000 (uix-interpret data))

  (bench :reagent-interpret 10000 (reagent-interpret data))
  (bench :reagent-interpret 10000 (reagent-interpret data)))

