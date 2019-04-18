(ns ^:figwheel-hooks uix.example
  (:require-macros [uix.core.alpha :refer [require-lazy]]
                   [uix.hooks.alpha :refer [with-effect]])
  (:require [uix.core.alpha :as uix]
            [uix.hooks.alpha :as hooks]))

(require-lazy '[uix.components :refer [view]])

(defn app []
  (let [n (hooks/state 0)]
    [:<>
     [:button#button-1.btn {:on-click #(swap! n + 5)}
      "+"]
     [:# {:fallback "Loading..."}
      (when (>= @n 5)
        [view "VIEW!"])]
     (for [n (range @n)]
       ^{:key n}
        [:span n])]))

(defonce root
  (uix/create-root js/root))

(defn ^:export renderApp []
  (uix/render-root [app] root))

(defn ^:after-load -render []
  (renderApp))

(uix/set-loaded! :example)
