(ns ^:figwheel-no-load env.ios.main
  (:require [uix.core.alpha :as uix]
            [{{app-name}}.ios.core :as core]
            [figwheel.client :as fw]
            [env.config :as conf]))

(enable-console-print!)

(assert (exists? core/init) "Fatal Error - Your core.cljs file doesn't define an 'init' function!!! - Perhaps there was a compilation failure?")
(assert (exists? core/app-root) "Fatal Error - Your core.cljs file doesn't define an 'app-root' function!!! - Perhaps there was a compilation failure?")

(def cnt (atom 0))

(defn reloader []
  (let [state (uix/state 0)]
    (uix/effect!
      (fn []
        (add-watch cnt ::key #(swap! state inc))
        #(remove-watch cnt ::key))
      #js [])
    [core/app-root]))

;; Do not delete, root-el is used by the figwheel-bridge.js
(def root-el (uix/as-element [reloader]))

(defn force-reload! []
      (swap! cnt inc))

(fw/start {
           :websocket-url    (:ios conf/figwheel-urls)
           :heads-up-display false
           :jsload-callback  force-reload!})

(core/init)
