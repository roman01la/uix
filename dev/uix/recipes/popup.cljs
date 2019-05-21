(ns uix.recipes.popup
  "This recipe shows how to use React's portals
  to render components into a different DOM node.

  UIx provides a special Hiccup syntax for declaring portals:
  `[:-> element target]` where target is either CSS selector
  of the target DOM node in a form of a keyword or a reference to
  DOM node itself."
  (:require [uix.core.alpha :as uix]))

(defn popup [{:keys [on-close]}]
  [:div {:style {:position :absolute
                 :bottom 64
                 :left 64
                 :width 320
                 :height 200
                 :display :flex
                 :justify-content :center
                 :align-items :center
                 :background "#d4e1ec"
                 :box-shadow "0 2px 16px rgba(0, 0, 0, 0.05)"}}
   [:button {:on-click on-close}
    "Close"]])

(defn recipe []
  (let [open?* (uix/state false)]
    [:<>
     [:button {:on-click #(reset! open?* true)}
      "Open popup"]
     (when @open?*
       [:-> [popup {:on-close #(reset! open?* false)}]
        :#popup-layer])]))
