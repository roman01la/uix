(ns uix.state.alpha
  (:require [react :as react]))

(defonce db (atom {}))



(defn subscribe [f]
  (let [[state force-update] (react/useState (f @db))]
    (react/useLayoutEffect
      (fn []
        (let [id (random-uuid)]
          (add-watch db id (fn [_ _ o n]
                             (let [of (f o)
                                   nf (f n)]
                               (when (not= of nf)
                                 (force-update nf)))))
          #(remove-watch db id)))
      #js [state])
    state))




(defmulti handle-event (fn [db [event]] event))

(defmulti handle-fx (fn [event args] event))

(defn dispatch [event]
  (let [effects (handle-event @db event)]
    (when-let [db* (:db effects)]
      (reset! db db*))
    (doseq [[event args] (dissoc effects :db)]
      (handle-fx event args))))

