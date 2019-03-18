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
(defn use-effect [setup-fn deps]
  #?(:cljs (r/useEffect #(or (setup-fn) js/undefined)
                        (when-not (nil? deps)
                          (into-array deps)))
     :clj (identity setup-fn)))

#?(:clj
   (defmacro with-effect [deps & setup-fn]
     (let [[deps setup-fn] (if (vector? deps)
                             [deps setup-fn]
                             [nil (cons deps setup-fn)])]
       `(use-effect #(do ~@setup-fn) ~deps))))
