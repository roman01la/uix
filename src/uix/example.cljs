(ns ^:figwheel-hooks uix.example
  (:require-macros [uix.core.alpha :refer [require-lazy]]
                   [uix.hooks.alpha :refer [with-effect]])
  (:require [uix.core.alpha :as uix :refer-macros [html]]
            [uix.hooks.alpha :as hooks]
            [cljs.spec.alpha :as s]
            [cljs.spec.test.alpha :as stest]))

(defn js-obj? [x]
  (identical? "object" (goog/typeOf x)))

(s/fdef button
  :args (s/cat
          :attrs map?
          :icon js-obj?
          :text string?))

(defn button [{:keys [on-click]} icon]
  (let [text "Send"]
    (html
      [:button {:on-click on-click}
       icon
       text])))

(defn app []
  (html
    (let [attrs {:on-click js/console.log}]
      [:form
       [:input {:value ""}]
       [button attrs
        [:i.send-icon]]])))



(defonce root
  (uix/create-root js/root))

(defn ^:export renderApp []
  (uix/render-root [app] root))

(defn ^:after-load -render []
  (renderApp))

(uix/set-loaded! :example)

(stest/instrument)
