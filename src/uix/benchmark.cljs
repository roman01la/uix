(ns uix.benchmark
  (:require-macros [uix.benchmark :refer [bench]])
  (:require [reagent.core :as r]
            [uix.compiler.alpha :as uix]
            [uix.core.alpha :refer-macros [html defui]]
            [cljs.spec.alpha :as s]))

(def >el js/React.createElement)

(defn button [p]
  (>el "button" #js {:children p}))

(s/fdef button-c
  :args (s/cat :text string?))

(defn button-int [text]
  [:button text])

(defui button-c [text]
  [:button text])

(defn react [{:keys [title body items]}]
  (>el "div" #js {:className "card"}
    (>el "div" #js {:className "card-title"} title)
    (>el "div" #js {:className "card-body"} body)
    (>el "ul" #js {:className "card-list"}
      (for [item items]
        (>el "li" #js {:key item} item)))
    (>el "div" #js {:className "card-footer"}
      (>el "div" #js {:className "card-actions"}
        (button "ok")
        (button "cancel")))))

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
       [button-int "ok"]
       [button-int "cancel"]]]]))

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
       [button-int "ok"]
       [button-int "cancel"]]]]))

(defn uix-compile [{:keys [title body items]}]
  (html
    [:div.card
     [:div.card-title title]
     [:div.card-body body]
     [:ul.card-list
      (for [item items]
        ^{:key item} [:li item])]
     [:div.card-footer
      [:div.card-actions
       [button-c "ok"]
       [button-c "cancel"]]]]))

(let [data {:title "hello world"
            :body "body"
            :items (shuffle (range 10))}]

  (bench :react 10000 (react data))
  (bench :react 10000 (react data))

  (bench :uix-compile 10000 (uix-compile data))
  (bench :uix-compile 10000 (uix-compile data))

  (bench :uix-interpret 10000 (uix-interpret data))
  (bench :uix-interpret 10000 (uix-interpret data))

  (bench :reagent-interpret 10000 (reagent-interpret data))
  (bench :reagent-interpret 10000 (reagent-interpret data)))

