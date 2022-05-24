(ns uix.dev
  (:require ["react-refresh/runtime" :as refresh]))

(set! (.-$$Register$$ js/window) refresh/register)
(set! (.-$$Signature$$ js/window) refresh/createSignatureFunctionForTransform)

(defn signature! []
  (when (exists? (.-$$Signature$$ js/window))
    (.$$Signature$$ js/window)))

(defn register! [type id]
  (when (exists? (.-$$Register$$ js/window))
    (.$$Register$$ js/window type id)))

;;;; Public API ;;;;

(defn init-fast-refresh!
  "Injects react-refresh runtime. Should be called before UI is rendered"
  []
  (refresh/injectIntoGlobalHook js/window))

(defn refresh!
  "Should be called after hot-reload, in shadow's ^:dev/after-load hook"
  []
  (refresh/performReactRefresh))
