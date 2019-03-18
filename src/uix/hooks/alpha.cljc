(ns uix.hooks.alpha
  (:refer-clojure :exclude [ref])
  #?(:cljs (:require [react :as r])))

;; == State hook ==
#?(:cljs
   (deftype StateHook [value set-value]
     IDeref
     (-deref [o]
       value)
     IReset
     (-reset! [o new-value]
       (set-value new-value)
       new-value)
     ISwap
     (-swap! [o f]
       (-reset! o (f value)))
     (-swap! [o f a]
       (-reset! o (f value a)))
     (-swap! [o f a b]
       (-reset! o (f value a b)))
     (-swap! [o f a b xs]
       (-reset! o (apply f value a b xs)))))

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
     IDeref
     (-deref [o]
       (.-current -ref))
     IReset
     (-reset! [o new-value]
       (set! (.-current -ref) new-value)
       new-value)
     ISwap
     (-swap! [o f]
       (-reset! o (f (.-current -ref))))
     (-swap! [o f a]
       (-reset! o (f (.-current -ref) a)))
     (-swap! [o f a b]
       (-reset! o (f (.-current -ref) a b)))
     (-swap! [o f a b xs]
       (-reset! o (apply f (.-current -ref) a b xs)))))

#?(:clj
   (deftype RefHook [value set-value]))

(defn ref [value]
  #?(:cljs (RefHook. (r/useRef value))
     :clj nil))

;; == Effect hook ==

#?(:cljs (def refs* (atom {})))

;; this* ref represents an identity of a component, it is stored in refs* registry
;; prev-deps* tracks previous dependencies of a current effect
;; when effect's dependencies change we increment a value bound to component's identity
;; which causes React to call the effect again
(defn use-effect [setup-fn deps]
  #?(:cljs (let [prev-deps* (ref deps)
                 this* (ref #js {})]
             (when (not= @prev-deps* deps)
               (swap! refs* update @this* inc))
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
