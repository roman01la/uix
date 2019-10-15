(ns ^:figwheel-hooks uix.core.refresh)

(when ^boolean goog.DEBUG
  (.injectIntoGlobalHook js/ReactFreshRuntime js/window))

(defn ^:after-load perform-refresh []
  (.performReactRefresh js/ReactFreshRuntime))

(defn register [type id]
  (js/console.log type id)
  (.register js/ReactFreshRuntime type id))

(defn set-signature [type key force-reset get-custom-hooks]
  (.setSignature js/ReactFreshRuntime type key force-reset get-custom-hooks)
  type)
