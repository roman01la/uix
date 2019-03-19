(ns uix.hooks.alpha
  (:refer-clojure :exclude [ref])
  #?(:cljs (:require [react :as r])))

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

;; == Ref hook
#?(:cljs
   (deftype RefHook [-ref]
     Object
     (equiv [this other]
       (-equiv this other))

     IHash
     (-hash [o] (goog/getUid o))

     IDeref
     (-deref [o]
       (.-current -ref))

     IReset
     (-reset! [o new-value]
       (set! (.-current -ref) new-value)
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

(defn ref [value]
  #?(:cljs (RefHook. (r/useRef value))
     :clj nil))

;; == Effect hook ==

#?(:cljs (def refs* (atom {})))

;; this* ref represents an identity of a component, it is stored in refs* registry
;; prev-deps* tracks previous dependencies of a current effect
;; when effect's dependencies change we set current deps onto refs* registry
;; which causes React to call the effect again because deps value is different now
(defn use-effect [setup-fn deps]
  #?(:cljs (let [prev-deps* (ref deps)
                 this* (ref #js {})]
             (when (not= @prev-deps* deps)
               (swap! refs* assoc @this* deps))
             (r/useEffect (fn []
                            (reset! prev-deps* deps)
                            (or (setup-fn) js/undefined))
                          #js [(get @refs* @this*)]))
     :clj (identity setup-fn)))

#?(:clj
   (defmacro with-effect [deps & setup-fn]
     (let [[deps setup-fn] (if (vector? deps)
                             [deps setup-fn]
                             [nil (cons deps setup-fn)])]
       `(use-effect #(do ~@setup-fn) ~deps))))
