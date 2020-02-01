(ns uix.recipes.context
  (:require [uix.core.alpha :as uix.core :refer [defcontext]]))

(defcontext *ctx*)

(defn component [f]
  (let [v (uix.core/context *ctx*)]
    [:button {:on-click f}
     v]))

(defn recipe []
  (let [v (uix.core/state 0)
        f (uix.core/callback #(swap! v inc) [])]
    (uix.core/context-provider [*ctx* @v]
      [component f])))
