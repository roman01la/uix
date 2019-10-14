(ns xframe.core.alpha
  "EXPERIMENTAL: Global state management based on Adapton
  https://github.com/roman01la/adapton"
  #?(:cljs (:require-macros [xframe.core.alpha :refer [reg-sub]]))
  (:require [uix.core.alpha :as uix]
            [xframe.core.adapton :as adapton]
            [clojure.string :as str]))

;; TODO: subscriptions graph visual debugger

(defonce db (adapton/aref {}))

(def ^:private subs-registry (atom {}))

(defn -reg-sub [name f]
  (swap! subs-registry assoc name f))

#?(:cljs
   (def ^:private subs-in-order #js []))

(defn notify-listeners! []
  #?(:cljs (.forEach subs-in-order (fn [f] (f)))))

;; https://github.com/facebook/react/tree/master/packages/use-subscription#subscribing-to-event-dispatchers
(defn subscribe-ref [get-state]
  #?(:clj  (get-state)
     :cljs (uix/subscribe
             (uix/memo
               (fn []
                 {:get-current-value get-state
                  :subscribe (fn [schedule-update!]
                               (.push subs-in-order schedule-update!)
                               #(let [idx (.indexOf subs-in-order schedule-update!)]
                                  (when-not (neg? idx)
                                    (.splice subs-in-order idx 1))))})
               #js [get-state]))))

;; ====== Public API ======

#?(:clj
   (defmacro reg-sub [name [_ args & body]]
     (let [f (-> (munge name) (str/replace "." "-") symbol)]
       `(do
          (adapton/defamemo ~f ~args ~@body)
          (-reg-sub ~name ~f)))))

(defn <- [[name & args]]
  (let [f (get @subs-registry name)]
    (assert (fn? f) (str "Subscription " name " is not found"))
    (apply f args)))

(defn <sub [s]
  (subscribe-ref (uix.core.alpha/callback #(<- s) [s])))

(def event-handlers (volatile! {}))
(def fx-handlers (volatile! {}))

(defn dispatch [[name :as event]]
  (let [handler (get @event-handlers name)
        _ (assert handler (str "Event handler " name " is not found"))
        effects (handler @db event)]
    (doseq [[event args] effects]
      (let [handler (get @fx-handlers event)]
        (assert handler (str "Effect handler " event " is not found"))
        (handler @db [event args])))))

(defn reg-event-db [name f]
  (vswap! event-handlers assoc name (fn [a b] {:db (f a b)})))

(defn reg-event-fx [name f]
  (vswap! event-handlers assoc name f))

(defn reg-fx [name f]
  (vswap! fx-handlers assoc name f))

(reg-sub ::db
  (fn []
    @db))

(reg-fx :db
  (fn [_ [_ db*]]
    (reset! db db*)
    (notify-listeners!)))
