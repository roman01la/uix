(ns uix.hooks
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
(defn use-effect [setup-fn cleanup-fn]
  #?(:cljs (r/useEffect #(do (setup-fn) js/undefined)
                        (if (nil? cleanup-fn)
                          js/undefined
                          #(do (cleanup-fn) js/undefined)))
     :clj (identity setup-fn)))

#?(:clj
   (defmacro with-effect [& body]
     (let [le (last body)
           with-cleanup? (and (list? le) (= 'finally (first le)))]
       (if with-cleanup?
         `(use-effect #(do ~@(butlast body)) #(do ~@(rest le)))
         `(use-effect #(do ~@body) nil)))))
