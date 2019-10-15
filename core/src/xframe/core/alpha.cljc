(ns xframe.core.alpha
  "EXPERIMENTAL: Global state management based on Adapton
  https://github.com/roman01la/adapton

  How it works:
  - App db is Adapton ref node
  - A subscription is Adapton thunk node
  - Subscriptions graph is a graph of Adapton nodes maintained by Adapton itself

  1. When UI is rendered `<sub` calls register listeners on Adapton nodes (subscriptions)
  2. When app db is updated, xFrame calls all listeners currently registered
  3. Listeners evaluate Adapton nodes, which triggers evaluation of the graph up to the root node (app db)

  1. Initial Adapton graph + subscriptions in UI
  db +---> A +---> B +---> [B]
   +
   +---> C +---> D

  2. db is updated, calling subscription listener [B]
  db +====> A +====> B +====> [B]
   +
   +---> C +---> D"
  #?(:cljs (:require-macros [xframe.core.alpha :refer [reg-sub]]))
  (:require [uix.core.alpha :as uix]
            [xframe.core.adapton :as adapton]
            [clojure.string :as str]))

;; TODO: reset graph when hot-reloading

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

(comment
  (require 'rhizome.viz)
  (rhizome.viz/view-tree (comp seq :children) :children g
    :node->descriptor (fn [n] {:label (:name n)})))

(defn subs-graph
  "Takes db and returns its dependency graph"
  [a]
  (let [sup #?(:cljs (->> (adapton/get-sup a) .values js/Array.from (mapv subs-graph))
               :clj (->> (adapton/get-sup a) (mapv subs-graph)))
        m (meta a)]
    {:name (if-let [name (:name m)]
             (into [name] (:args m))
             :db)
     :children sup
     :value (adapton/get-result a)}))

#?(:clj
   (defmacro reg-sub [name [_ args & body]]
     (let [f (-> (munge name) (str/replace "." "-") symbol)]
       `(do
          (adapton/defamemo ~(with-meta f {:name name}) ~args ~@body)
          (-reg-sub ~name ~f)))))

(defn <- [[name & args]]
  (let [f (get @subs-registry name)]
    (assert f (str "Subscription " name " is not found"))
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
