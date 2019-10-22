(ns ^:figwheel-hooks uix.core.refresh
  (:require [cljs-bean.core :as bean]))

(defonce ^:private reloaded-names (atom nil))

(defn- namespaces->var-entries [namespaces]
  (->> namespaces
       (mapcat #(->> (str %) js/eval (.entries js/Object) bean/->clj))
       (filter #(some? (second %)))))

(defn- var-entries->uix-names [var-entries]
  (->> var-entries
       (filter #(.-cljsReact (second %)))
       (map first)
       set))

(defn- find-reloaded-vars [names entries]
  (->> entries
       (filter #(and (contains? names (first %)) (some? (second %))))
       (map second)))

(defn ^:before-load before-load [{:keys [namespaces]}]
  (->> (namespaces->var-entries namespaces)
       var-entries->uix-names
       (reset! reloaded-names)))

(defn ^:after-load after-load [{:keys [reloaded-namespaces]}]
  (->> (namespaces->var-entries reloaded-namespaces)
       (find-reloaded-vars @reloaded-names)
       (js/console.log)))

(when ^boolean goog.DEBUG
  (.injectIntoGlobalHook js/ReactFreshRuntime js/window))

(defn perform-refresh []
  (.performReactRefresh js/ReactFreshRuntime))

(defn register [type id]
  (js/console.log type id)
  (.register js/ReactFreshRuntime type id))

(defn set-signature [type key force-reset get-custom-hooks]
  (.setSignature js/ReactFreshRuntime type key force-reset get-custom-hooks)
  type)
