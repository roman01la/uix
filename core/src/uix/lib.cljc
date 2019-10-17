(ns uix.lib
  #?(:cljs (:require-macros [uix.lib :refer [doseq-loop]])))

#?(:clj
    (defmacro doseq-loop [[v vs] & body]
      `(let [v# ~vs]
         (loop [x# (first v#)
                xs# (next v#)]
           (let [~v x#]
             ~@body)
           (when (seq xs#)
             (recur (first xs#) (next xs#)))))))
