(ns uix.recipes.interop
  "This recipe shows how JS React components can be used inside
  of UIx components and vice versa.

  In order to use JS component in UIx component there's a special
  Hiccup syntax `[:> component props & children]` where `props` is a map
  which will be transformed into JS Object with top-level keys camel-cased.
  Note that values are not touched, thus it's up to you to convert them
  before passing into JS component.

  UIx components can be adapted to JS React components
  using `uix.core.alpha/as-react`. It takes a function that takes
  JS props object transformed into immutable map.
  Again, values are not transformed."
  (:require [react :as r]
            [uix.core.alpha :as uix]))

(def h r/createElement)

(defn js-list [props]
  (let [items (.-items props)
        item (.-itemComponent props)]
    (h "ul" #js {}
       (.map items #(h item #js {:key %} %)))))

(defn list-item [child]
  [:li child])

(def list-item*
  (uix/as-react #(list-item (:children %))))

(defn recipe []
  [:> js-list {:items #js [1 2 3]
               :item-component list-item*}])
