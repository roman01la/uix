(ns ^:figwheel-hooks uix.example
  (:require-macros [uix.core.alpha :refer [require-lazy]]
                   [uix.hooks.alpha :refer [with-effect]])
  (:require [uix.core.alpha :as uix]
            [uix.hooks.alpha :as hooks]
            [uix.compiler.react :refer-macros [html]]))

(defn button [{:keys [on-click]} text]
  (html [:button {:on-click on-click}
         text]))


(defn app []
  (html
    [:<>
     (for [n (range 3)]
       ^{:key n}
       [button {:on-click js/console.log}
        "Submit+"])]))

(defonce root
  (uix/create-root js/root))

(defn ^:export renderApp []
  (uix/render-root [app] root))

(defn ^:after-load -render []
  (renderApp))

(uix/set-loaded! :example)
