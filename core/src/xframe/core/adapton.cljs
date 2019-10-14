(ns xframe.core.adapton
  (:require-macros [xframe.core.adapton :refer [adapt]]))

(def ^:private curr-adapting (volatile! false))

(defprotocol IAdapton
  (+edge! [this a-sub])
  (-edge! [this a-sub])
  (compute [this])
  (dirty! [this])
  (set-thunk! [this new-thunk])
  (set-result! [this new-result])
  (get-sup [this])
  (set-sup! [this new-sup])
  (get-result [this]))

(deftype Adapton [^:mutable thunk
                  ^:mutable result
                  ^:mutable sub
                  ^:mutable sup
                  ^:mutable clean?]
  IAdapton
  (get-sup [this]
    sup)
  (set-sup! [this new-sup]
    (set! sup new-sup))
  (get-result [this]
    result)
  (+edge! [this a-sub]
    (.add sub a-sub)
    (.add (.-sup a-sub) this))
  (-edge! [this a-sub]
    (.delete sub a-sub)
    (.delete (get-sup a-sub) this))
  (compute [this]
    (if clean?
      result
      (do
        (-> (.from js/Array sub) (.forEach #(-edge! this %)))
        (set! clean? true)
        (set! result (thunk))
        (recur))))
  (dirty! [this]
    (when clean?
      (set! clean? false)
      (-> (.from js/Array sup) (.forEach #(dirty! %)))))
  (set-thunk! [this new-thunk]
    (set! thunk new-thunk))
  (set-result! [this new-result]
    (set! result new-result))

  IDeref
  (-deref [this]
    (let [prev-adapting (volatile! @curr-adapting)
          _ (vreset! curr-adapting this)
          result (compute this)
          _ (vreset! curr-adapting @prev-adapting)]
      (when @curr-adapting
        (+edge! @curr-adapting this))
      result))

  IReset
  (-reset! [this v]
    (set-result! this v)
    (dirty! this))

  ISwap
  (-swap! [this f]
    (-reset! this (f (-deref this))))
  (-swap! [this f x]
    (-reset! this (f (-deref this) x)))
  (-swap! [this f x y]
    (-reset! this (f (-deref this) x y)))
  (-swap! [this f x y args]
    (-reset! this (apply f (-deref this) x y args))))

(defn adapton? [v]
  (instance? Adapton v))

(defn make-athunk [thunk]
  (Adapton. thunk nil (js/Set.) (js/Set.) false))

(defn aref [v]
  (let [a (Adapton. nil v (js/Set.) (js/Set.) true)]
    (set-thunk! a #(get-result a))
    a))

(defn avar-get [v]
  (-deref (-deref v)))
