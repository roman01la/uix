(ns uix.hooks.alpha
  "Wrappers for React.js Hooks"
  (:refer-clojure :exclude [ref])
  #?(:cljs (:require-macros [uix.hooks.alpha :refer [maybe-js-deps with-deps-check]]))
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
       (set-value new-value))

     ISwap
     (-swap! [o f]
       (set-value f))
     (-swap! [o f a]
       (set-value #(f % a)))
     (-swap! [o f a b]
       (set-value #(f % a b)))
     (-swap! [o f a b xs]
       (set-value #(apply f % a b xs)))

     IPrintWithWriter
     (-pr-writer [o writer opts]
       (-write writer "#object [uix.hooks.alpha.StateHook ")
       (pr-writer {:val value} writer opts)
       (-write writer "]"))))

#?(:cljs
   (defn state [value]
     (let [[value set-value] (r/useState value)
           sh (r/useMemo #(StateHook. value set-value) #js [])]
       (r/useMemo (fn []
                    (set! (.-value sh) value)
                    (set! (.-set-value sh) set-value)
                    sh)
                  #js [value set-value])))

   :clj
   (defn state [value]
     (atom value)))

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

(defn ref [value]
  #?(:cljs (let [vref (r/useRef value)]
             (r/useMemo #(RefHook. vref) #js []))
     :clj (atom value)))

#?(:clj
   (defmacro maybe-js-deps [deps]
     `(if ~deps (into-array ~deps) js/undefined)))

#?(:clj
   (defmacro with-deps-check [[prev-deps] f deps]
     `(let [~prev-deps (ref ~deps)]
        (when (not= @~prev-deps ~deps)
          (reset! ~prev-deps ~deps))
        ~f)))

;; == Effect hook ==
(defn effect! [setup-fn deps]
  #?(:cljs (with-deps-check [prev-deps*]
             (r/useEffect
              (fn []
                (reset! prev-deps* deps)
                (let [ret (setup-fn)]
                  (if (fn? ret) ret js/undefined)))
              (maybe-js-deps @prev-deps*))
             deps)
     :clj nil))

#?(:clj
   (defmacro with-effect
     "Takes optional vector of dependencies and body to be executed in an effect."
     [deps body]
     (let [[deps setup-fn] (if (vector? deps)
                             [deps body]
                             [nil (cons deps body)])]
       `(effect! #(do ~@setup-fn) ~deps))))

;; == Layout effect hook ==
(defn layout-effect! [setup-fn deps]
  #?(:cljs (with-deps-check [prev-deps*]
             (r/useLayoutEffect
              (fn []
                (reset! prev-deps* deps)
                (let [ret (setup-fn)]
                  (if (fn? ret) ret js/undefined)))
              (maybe-js-deps @prev-deps*))
             deps)
     :clj nil))

#?(:clj
   (defmacro with-layout-effect
     "Takes optional vector of dependencies and body to be executed in a layout effect."
     [deps body]
     (let [[deps setup-fn] (if (vector? deps)
                             [deps body]
                             [nil (cons deps body)])]
       `(layout-effect! #(do ~@setup-fn) ~deps))))

;; == Callback hook ==
(defn callback [f deps]
  #?(:cljs (with-deps-check [prev-deps*]
             (r/useCallback f (maybe-js-deps @prev-deps*))
             deps)
     :clj f))

;; == Memo hook ==
(defn memo [f deps]
  #?(:cljs (with-deps-check [prev-deps*]
             (r/useMemo f (maybe-js-deps @prev-deps*))
             deps)
     :clj (f)))

;; == Subscription ==
;; https://github.com/facebook/react/tree/master/packages/use-subscription
(defn subscribe [{:keys [get-current-value subscribe]}]
  #?(:clj (get-current-value)
     :cljs (let [get-initial-state (r/useCallback (fn [] #js {:get-current-value get-current-value
                                                              :subscribe subscribe
                                                              :value (get-current-value)})
                                                  #js [get-current-value subscribe])
                 [state set-state] (r/useState get-initial-state)
                 ret-value (if (or (not (identical? (gobj/get state "get-current-value") get-current-value))
                                   (not (identical? (gobj/get state "subscribe") subscribe)))
                             (let [ret-val (get-current-value)]
                               (set-state #js {:get-current-value get-current-value
                                               :subscribe subscribe
                                               :value ret-val})
                               ret-val)
                             (gobj/get state "value"))]
             (r/useDebugValue ret-value)
             (r/useEffect
               (fn []
                 (let [did-unsubscribe? (volatile! false)
                       check-for-updates (fn []
                                           (when-not ^boolean @did-unsubscribe?
                                             (let [value (get-current-value)]
                                               (set-state
                                                 #(if (or (not (identical? (gobj/get % "get-current-value") get-current-value))
                                                          (not (identical? (gobj/get % "subscribe") subscribe))
                                                          (= (gobj/get % "value") value))
                                                    %
                                                    (.assign js/Object #js {} % #js {:value value}))))))
                       unsubscribe (subscribe check-for-updates)]
                   (check-for-updates)
                   (fn []
                     (vreset! did-unsubscribe? true)
                     (unsubscribe))))
               #js [get-current-value subscribe])
             ret-value)))
