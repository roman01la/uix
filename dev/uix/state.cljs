(ns uix.state
  (:require [react :as react]))

(defonce db (atom {}))


(deftype Cell [ref f state]
  IDeref
  (-deref [o]
    (f (-deref ref)))

  IWatchable
  (-add-watch [o key f*]
    (-add-watch ref key (fn [_ _ _ n]
                          (let [nf (f n)]
                            (when (not= state nf)
                              (set! (.-state o) nf)
                              (f* key o state nf))))))
  (-remove-watch [o key]
    (-remove-watch ref key)))

(defn cell [ref f]
  (Cell. ref f (f @ref)))

(defn db-cell [f]
  (Cell. db f (f @db)))


(defn use-cell [cell*]
  (let [[state force-update] (react/useState @cell*)]
    (react/useLayoutEffect
      (fn []
        (let [id (random-uuid)]
          (add-watch cell* id (fn [_ _ _ n]
                                (force-update n)))
          #(remove-watch cell* id)))
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

