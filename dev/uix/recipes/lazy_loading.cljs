(ns uix.recipes.lazy-loading
  (:require [uix.core.alpha :as uix :refer-macros [require-lazy]]))

(require-lazy '[uix.components :refer [alert]])

(defn recipe []
  (let [open? (uix/state false)]
    [:<>
     [:button {:on-click #(reset! open? true)}
      "Show alert"]
     [:div [:small "Throttle network in DevTools Network panel to see :fallback component"]]
     [:# {:fallback [:h2 "Loading uix.components/alert..."]}
      (when @open?
        [alert "Lazy-loaded alert"])]]))
