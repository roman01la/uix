(ns xframe.core.alpha
  "EXPERIMENTAL: Global state management akin to re-frame.
  Alpha quality, may not work in every case.

  IMPLEMENTATION: Subscriptions graph is composed using `reg-sub` and `subscribe` functions
  where a node is atom-like data type (LazyRef).

  Updates propagate in demand-driven fashion: when database is updated xFrame triggers
  subscribed nodes which forces evaluation of the whole graph from the root.

  Every node memoizes on its input subscriptions or the database if none provided."
  (:require [uix.core.alpha :as uix]))

;; TODO: subscriptions graph visual debugger

(defprotocol ILazyRef
  (force-ref [o])
  (set-result! [o new-result])
  (set-clean? [o v]))

(defn -ref-deref [o f result clean?]
  (let [[args ret] result
        nargs (force-ref o)]
    (if (and clean? (= args nargs))
      ret
      (let [nret (f nargs)]
        (set-result! o [nargs nret])
        (set-clean? o true)
        nret))))

(defn -force-ref [refs]
  (if (== 1 (count refs))
    (deref (first refs))
    (map deref refs)))

#?(:cljs
   (deftype LazyRef [^:mutable f
                     refs
                     ^:mutable result
                     ^:mutable clean?]
     ILazyRef
     (set-result! [o new-result]
       (set! result new-result))
     (set-clean? [o v]
       (set! clean? v))
     (force-ref [o]
       (-force-ref refs))
     IDeref
     (-deref [o]
       (-ref-deref o f result clean?))
     IReset
     (-reset! [o new-value]
       (set! f new-value)
       (set! clean? false))))

#?(:clj
   (deftype LazyRef [^:volatile-mutable f
                     refs
                     ^:volatile-mutable result
                     ^:volatile-mutable clean?]
     ILazyRef
     (set-result! [o new-result]
       (set! result new-result))
     (set-clean? [o v]
       (set! clean? v))
     (force-ref [o]
       (-force-ref refs))
     clojure.lang.IDeref
     (deref [o]
       (-ref-deref o f result clean?))
     clojure.lang.IAtom
     (reset [o new-value]
       (set! f new-value)
       (set! clean? false))))

(defn lazy-ref
  ([f]
   (LazyRef. f nil nil false))
  ([f refs]
   (let [refs (cond
                (nil? refs) nil
                (sequential? refs) refs
                :else [refs])]
     (LazyRef. f refs nil false))))

;; =============================

(defonce db (lazy-ref (constantly {})))

(def ^:private subs-registry (volatile! {}))
(def ^:private refs-cache (volatile! {}))

#?(:cljs
   (def ^:private subs-in-order #js []))

(defn notify-listeners! []
  #?(:cljs (.forEach subs-in-order (fn [f] (f)))))

;; https://github.com/facebook/react/tree/master/packages/use-subscription#subscribing-to-event-dispatchers
(defn subscribe-ref [ref]
  #?(:clj  @ref
     :cljs (uix/subscribe
             (uix/memo
               (fn []
                 {:get-current-value (fn [] @ref)
                  :subscribe (fn [schedule-update!]
                               (.push subs-in-order schedule-update!)
                               #(let [idx (.indexOf subs-in-order schedule-update!)]
                                  (when-not (neg? idx)
                                    (.splice subs-in-order idx 1))))})
               #js [ref]))))

(defn create-sub-with-cache [s f deps-f]
  (if-let [ref (get @refs-cache s)]
    ref
    (let [ref (lazy-ref #(f % s) (deps-f s))]
      (vswap! refs-cache assoc s ref)
      ref)))

;; ====== Public API ======

(defn subscribe [[sub-name :as s]]
  (let [[f deps-f] (get @subs-registry sub-name)]
    (assert f (str "Subscription " sub-name " is not found"))
    (create-sub-with-cache s f deps-f)))

(defn <sub [s]
  (subscribe-ref (uix.core.alpha/memo #(subscribe s) [s])))

;; https://github.com/Day8/re-frame/blob/master/src/re_frame/subs.cljc#L200
(defn reg-sub [sub-name & args]
  (let [f (last args)
        input-args (butlast args)
        deps-f (case (count input-args)
                 0 (fn
                     ([_] db)
                     ([_ _] db))

                 1 (let [f (first input-args)]
                     (assert (fn? f) (str "2nd argument expected to be an inputs function, got: " f))
                     f)

                 2 (let [[marker v] input-args]
                     (assert (= :<- marker) (str "expected :<-, got: " marker))
                     (fn inp-fn
                       ([_] (subscribe v))
                       ([_ _] (subscribe v))))

                 (let [pairs (partition 2 input-args)
                       markers (map first pairs)
                       vecs    (map last pairs)]
                   (assert (and (every? #{:<-} markers) (every? vector? vecs))
                           (str "expected pairs of :<- and vectors, got: " pairs))
                   (fn inp-fn
                     ([_] (map subscribe vecs))
                     ([_ _] (map subscribe vecs)))))]
    (vswap! subs-registry assoc sub-name [f deps-f])))

(defn unreg-all-subs []
  (vreset! subs-registry {})
  (vreset! refs-cache {}))

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

(reg-fx :db
  (fn [_ [_ db*]]
    (reset! db (constantly db*))
    (notify-listeners!)))
