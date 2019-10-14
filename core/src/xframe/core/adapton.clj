(ns xframe.core.adapton)

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

(deftype Adapton [^:volatile-mutable thunk
                  ^:volatile-mutable result
                  ^:volatile-mutable sub
                  ^:volatile-mutable sup
                  ^:volatile-mutable clean?]
  IAdapton
  (get-sup [this]
    sup)
  (set-sup! [this new-sup]
    (set! sup new-sup))
  (get-result [this]
    result)
  (+edge! [this a-sub]
    (set! sub (conj sub a-sub))
    (set-sup! a-sub (conj (get-sup a-sub) this)))
  (-edge! [this a-sub]
    (set! sub (disj sub a-sub))
    (set-sup! a-sub (disj (get-sup a-sub) this)))
  (compute [this]
    (if clean?
      result
      (do
        (run! #(-edge! this %) sub)
        (set! clean? true)
        (set! result (thunk))
        (recur))))
  (dirty! [this]
    (when clean?
      (set! clean? false)
      (run! dirty! sup)))
  (set-thunk! [this new-thunk]
    (set! thunk new-thunk))
  (set-result! [this new-result]
    (set! result new-result))

  clojure.lang.IDeref
  (deref [this]
    (let [prev-adapting (volatile! @curr-adapting)
          _ (vreset! curr-adapting this)
          result (compute this)
          _ (vreset! curr-adapting @prev-adapting)]
      (when @curr-adapting
        (+edge! @curr-adapting this))
      result))

  clojure.lang.IAtom
  (reset [this v]
    (set-result! this v)
    (dirty! this))

  (swap [this f]
    (.reset this (f (.deref this))))
  (swap [this f x]
    (.reset this (f (.deref this) x)))
  (swap [this f x y]
    (.reset this (f (.deref this) x y)))
  (swap [this f x y args]
    (.reset this (apply f (.deref this) x y args))))

(defn adapton? [v]
  (instance? Adapton v))

(defn make-athunk [thunk]
  (Adapton. thunk nil #{} #{} false))

(defn aref [v]
  (let [a (Adapton. nil v #{} #{} true)]
    (set-thunk! a #(get-result a))
    a))

(defmacro adapt [e]
  `(make-athunk (fn [] ~e)))

(defn avar-get [v]
  (deref (deref v)))

(defmacro defamemo [f args & body]
  `(def ~f
     (let [f# (fn ~args ~@body)
           f*# (memoize #(adapt (apply f# %)))]
       (fn [& args#] @(f*# args#)))))

(defmacro avar [e]
  `(aref (adapt ~e)))

(defmacro defavar [name e]
  `(def ~name (avar ~e)))

(defmacro avar-set! [v e]
  `(reset! ~v (adapt ~e)))
