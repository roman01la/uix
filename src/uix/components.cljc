(ns uix.components
  (:require [uix.core.alpha :as uix]))

(defn view [child]
  [:div
   child])

(uix/set-loaded! :components)
