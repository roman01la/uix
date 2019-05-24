(ns uix.recipes.dynamic-styles
  "This recipe shows how to use UIx's API to hook into Hiccup transformation,
  in particular here it's used to transform inline CSS with CSS-in-JS library.

  `uix.core.alpha/add-transform-fn` takes a function that takes a map
  of attributes of Hiccup form when it is being transformed and returns
  the same map."
  (:require [uix.core.alpha :as uix]
            #?(:cljs [cljsjs.emotion])))

#?(:cljs
   (defonce _init-css-attr-transform
     (do
       (uix/add-transform-fn
         (fn [attrs]
           (if-not (contains? attrs :css)
             attrs
             (let [classes (:class attrs)
                   css (:css attrs)
                   class (->> (clj->js css)
                              js/emotion.css
                              (str classes " "))]
               (-> attrs
                   (dissoc :css)
                   (assoc :class class))))))
       0)))

(defn recipe []
  (let [border-color* (uix/state "#000")]
    [:<>
     [:div "Change border color (red, blue, etc.)"]
     [:input {:value @border-color*
              :on-change #(reset! border-color* (.. % -target -value))
              :css {:border-width 3
                    :border-color @border-color*
                    :border-style :solid
                    :border-radius 5
                    :padding "4px 12px"
                    :font-size 14
                    :outline :none}}]]))
