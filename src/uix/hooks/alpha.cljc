(ns uix.hooks.alpha
  (:refer-clojure :exclude [ref])
  #?(:cljs (:require [react :as r]
                     [goog.object :as gobj])))

;; == State hook ==
#?(:cljs
   (deftype StateHook [value set-value]
     Object
     (equiv [this other]
       (-equiv this other))

     IHash
     (-hash [o] (goog/getUid o))

     IDeref
     (-deref [o]
       value)

     IReset
     (-reset! [o new-value]
       ;; Do not update state when passing an equal value
       ;; we should rely on Clojure's equality semantics here,
       ;; because it's different from JavaScript
       (when (not= new-value value)
         (set-value new-value)))

     ISwap
     (-swap! [o f]
       (-reset! o (f value)))
     (-swap! [o f a]
       (-reset! o (f value a)))
     (-swap! [o f a b]
       (-reset! o (f value a b)))
     (-swap! [o f a b xs]
       (-reset! o (apply f value a b xs)))

     IPrintWithWriter
     (-pr-writer [o writer opts]
       (-write writer "#object [uix.hooks.alpha.StateHook ")
       (pr-writer {:val value} writer opts)
       (-write writer "]"))))

#?(:clj
   (deftype StateHook [value set-value]))

#?(:cljs
   (defn state [value]
     (let [[value set-value] (r/useState value)]
       (StateHook. value set-value)))

   :clj
   (defn state [value]))

(defprotocol IRef
  (unwrap [this]))

;; == Ref hook
#?(:cljs
   (deftype RefHook [rref]
     IRef
     (unwrap [this]
       rref)

     Object
     (equiv [this other]
       (-equiv this other))

     IHash
     (-hash [o] (goog/getUid o))

     IDeref
     (-deref [o]
       (gobj/get rref "current"))

     IReset
     (-reset! [o new-value]
       (gobj/set rref "current" new-value)
       new-value)

     ISwap
     (-swap! [o f]
       (-reset! o (f (-deref o))))
     (-swap! [o f a]
       (-reset! o (f (-deref o) a)))
     (-swap! [o f a b]
       (-reset! o (f (-deref o) a b)))
     (-swap! [o f a b xs]
       (-reset! o (apply f (-deref o) a b xs)))

     IPrintWithWriter
     (-pr-writer [o writer opts]
       (-write writer "#object [uix.hooks.alpha.RefHook ")
       (pr-writer {:val (-deref o)} writer opts)
       (-write writer "]"))))

#?(:clj
   (deftype RefHook [value set-value]))

(defn ref
  ([]
   (ref nil))
  ([value]
   #?(:cljs (RefHook. (r/useRef value))
      :clj nil)))

;; == Effect hook ==
(defn effect [setup-fn deps]
  #?(:cljs (let [prev-deps* (ref deps)]
             (when (not= @prev-deps* deps)
               (reset! prev-deps* deps))
             (r/useEffect (fn []
                            (reset! prev-deps* deps)
                            (or (setup-fn) js/undefined))
                          #js [@prev-deps*]))
     :clj (identity setup-fn)))

#?(:clj
   (defmacro with-effect [deps body]
     (let [[deps setup-fn] (if (vector? deps)
                             [deps body]
                             [nil (cons deps body)])]
       `(effect #(do ~@setup-fn) ~deps))))

;; == Memo hook ==
(defn memo [f deps]
  #?(:cljs (r/useMemo f deps)
     :clj f))
