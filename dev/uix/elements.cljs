(ns uix.elements
  (:require [cljs.spec.alpha :as s]))

(s/fdef row
  :args (s/cat :attrs map? :children (s/* any?)))

(s/fdef column
  :args (s/cat :attrs map? :children (s/* any?)))

(s/fdef spacing
  :args (s/cat :attrs map? :children (s/* any?)))

(defn row [attrs & children]
  (let [{:keys [align-x align-y]} attrs
        attrs (dissoc attrs :align-x :align-y)]
    (into
      [:div {:css (merge
                    attrs
                    {:display "flex"
                     :justify-content align-x
                     :align-items align-y})}]
      children)))

(defn column [attrs & children]
  (let [{:keys [align-x align-y]} attrs
        attrs (dissoc attrs :align-x :align-y)]
    (into
      [:div {:css (merge
                    attrs
                    {:display "flex"
                     :flex-direction "column"
                     :justify-content align-y
                     :align-items align-x})}]
      children)))

(defn spacing [{:keys [x y]} & children]
  (->> children
       (interpose [:div {:css {:margin-left x}}])
       (into [:<>])))
