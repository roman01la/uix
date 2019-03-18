(ns uix.hooks.alpha
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
