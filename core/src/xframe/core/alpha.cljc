(ns ^:figwheel-hooks xframe.core.alpha
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
   +---> C +---> D
  
  Alternatives:
  - https://github.com/salsa-rs/salsa"
  #?(:cljs (:require-macros [xframe.core.alpha :refer [reg-sub]]))
  (:require [uix.core.alpha :as uix]
            [xframe.core.adapton :as adapton]
            [uix.lib :refer [doseq-loop]]))

(defonce ^:dynamic db (adapton/aref {}))

(defonce ^:private subs-registry (atom {}))

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
    (defn memoize-last-by [key-f args-f f]
      (let [mem (atom {})]
        (fn [& args]
          (let [k (key-f args)
                args (args-f args)
                e (find @mem k)]
            (if (and e (= args (first (val e))))
              (second (val e))
              (let [ret (f args)]
                (swap! mem assoc k (list args ret))
                ret))))))
   :cljs
    (defn memoize-last-by [key-f args-f f]
      (let [mem (volatile! {})
            lookup-sentinel #js {}]
        (fn [& args]
          (let [k (key-f args)
                args (args-f args)
                v (get @mem k lookup-sentinel)]
            (if (or (identical? v lookup-sentinel)
                    (not= args (aget v 0)))
              (let [ret (f args)]
                (vswap! mem assoc k #js [args ret])
                ret)
              (aget v 1)))))))

#?(:clj
   (defmacro reg-sub [name [_ args & body]]
     `(->> (adapton/xf-amemo ~(with-meta args {:name name}) ~@body)
           (-reg-sub ~name))))

(defn <-
  ([s]
   (<- s nil))
  ([[name & args] key]
   (let [f (get @subs-registry name)]
     (assert f (str "Subscription " name " is not found"))
     (f key args))))

#?(:clj
    (defmacro <sub [s]
      (let [get-state-sym (gensym "get-state")
            s-sym (gensym "s")
            ret `(subscribe-ref (uix.core.alpha/callback ~get-state-sym [~s-sym]))]
        `(let [~s-sym ~s
               k# ~(str (gensym))
               ~get-state-sym #(<- ~s-sym k#)]
           ~(if (uix.lib/cljs-env? &env)
              `(if ~(with-meta 'goog.DEBUG {:tag 'boolean})
                 (if (and ~'js/__REACT_DEVTOOLS_GLOBAL_HOOK__
                          (-> (.. ~'js/__REACT_DEVTOOLS_GLOBAL_HOOK__ -renderers) (.get 1) .getCurrentFiber))
                   ~ret
                   (~get-state-sym))
                 ~ret)
              ret)))))

(def event-handlers (volatile! {}))
(def fx-handlers (volatile! {}))

(defn dispatch [[name :as event]]
  (let [handler (get @event-handlers name)
        _ (assert handler (str "Event handler " name " is not found"))
        effects (handler @db event)]
    (when-let [db' (:db effects)]
      (let [handler (get @fx-handlers :db)]
        (handler nil [nil db'])))
    (doseq-loop [[event args] (dissoc effects :db)]
      (let [handler (get @fx-handlers event)]
        (assert handler (str "Effect handler " event " is not found"))
        #?(:clj
           (try
             (handler @db [event args])
             (catch Exception e
               (binding [*out* *err*]
                 (println (str "Effect handler " event " failed with arguments: ") args)
                 (println e))))
           :cljs
           (try
             (handler @db [event args])
             (catch :default e
               (.error js/console (str "Effect handler " event " failed") args)
               (.error js/console e))))))))

(defn reg-event-db [name f]
  (vswap! event-handlers assoc name (fn [a b] {:db (f a b)})))

(defn reg-event-fx [name f]
  (vswap! event-handlers assoc name f))

(defn reg-fx [name f]
  (vswap! fx-handlers assoc name f))

(defn reg-db-sub []
  (reg-sub ::db (fn [] @db)))

(reg-db-sub)

(reg-fx :db
  (fn [_ [_ db*]]
    (reset! db db*)
    (notify-listeners!)))

(reg-fx :dispatch
  (fn [_ [_ event]]
    (dispatch event)))

(reg-fx :dispatch-n
  (fn [_ [_ events]]
    (run! dispatch events)))

#?(:cljs
   (defn ^:before-load reset-db []
     (set! db (adapton/aref @db))
     (reg-db-sub)))
