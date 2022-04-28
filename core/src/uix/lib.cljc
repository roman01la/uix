(ns uix.lib
  #?(:cljs (:require-macros [uix.lib :refer [doseq-loop]]))
  #?(:clj (:require [cljs.analyzer :as ana])))

#?(:clj
   (defmacro doseq-loop [[v vs] & body]
     `(let [v# ~vs]
        (when (seq v#)
          (loop [x# (first v#)
                 xs# (next v#)]
            (let [~v x#]
              ~@body)
            (when (seq xs#)
              (recur (first xs#) (next xs#))))))))

#?(:cljs
   (defn re-seq*
     "Similar to cljs.core/re-seq, but eager and faster"
     [re s]
     (loop [s s
            matches (.exec re s)
            ret #js []]
       (let [match-str (aget matches 0)
             match-vals (if (== (.-length matches) 1)
                          match-str
                          matches)
             post-idx (+ (.-index matches) (max 1 (.-length match-str)))
             next-s (subs s post-idx)]
         (.push ret match-vals)
         (if (<= post-idx (.-length s))
           (if-some [next-matches (.exec re next-s)]
             (recur next-s next-matches ret)
             ret)
           ret)))))
#?(:clj
   (defn cljs-env? [env]
     (boolean (:ns env))))

#?(:clj
   (defn- ->sym
     "Returns a symbol from a symbol or var"
     [x]
     (if (map? x)
       (:name x)
       x)))

#?(:clj
   (defn ns-qualify
     "Qualify symbol s by resolving it or using the current *ns*."
     [env s]
     (if (namespace s)
       (binding [ana/*private-var-access-nowarn* true]
         (->sym (ana/resolve-var env s)))
       (symbol (str ana/*cljs-ns*) (str s)))))
