(ns ^:figwheel-hooks uix.example
  (:require-macros [uix.core.alpha :refer [require-lazy]]
                   [uix.hooks.alpha :refer [with-effect]])
  (:require [uix.core.alpha :as uix :refer-macros [defui]]
            [uix.hooks.alpha :as hooks]
            [cljs.spec.alpha :as s]
            [cljs.spec.test.alpha :as stest]))

(s/fdef button
  :args (s/cat
          :attrs map?
          :text string?))

(defui button [{:keys [on-click]} text]
  [:button {:on-click on-click}
   text])

(defui app []
  (let [attrs {:on-click js/console.log}]
    [button attrs "text"]))



(defonce root
  (uix/create-root js/root))

(defn ^:export renderApp []
  (uix/render-root [app] root))

(defn ^:after-load -render []
  (renderApp))

(uix/set-loaded! :example)

(stest/instrument)
