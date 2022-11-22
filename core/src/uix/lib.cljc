(ns uix.lib
  #?(:cljs (:require-macros [uix.lib :refer [doseq-loop]]))
  #?(:cljs (:require [goog.object :as gobj]))
  #?(:clj (:require [clojure.walk]
                    [cljs.core])))

#?(:clj
   (defmacro assert! [x message]
     `(when-not ~x
        (throw (new AssertionError (str "Assert failed: " ~message "\n" (pr-str '~x)))))))

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
   (defn map->js [m]
     (reduce-kv (fn [o k v]
                  (gobj/set o (name k) v)
                  o)
                #js {}
                m)))

#?(:clj
   (defn cljs-env? [env]
     (boolean (:ns env))))

#?(:clj
   (defn find-form [pred sexp]
     (let [forms (atom [])]
       (clojure.walk/prewalk
        (fn [x]
          (when (pred x)
            (swap! forms conj x))
          x)
        sexp)
       @forms)))

#?(:clj
   (defn parse-sig [name fdecl]
     (let [[fdecl m] (if (string? (first fdecl))
                       [(next fdecl) {:doc (first fdecl)}]
                       [fdecl {}])
           [fdecl m] (if (map? (first fdecl))
                       [(next fdecl) (conj m (first fdecl))]
                       [fdecl m])
           fdecl (if (vector? (first fdecl))
                   (list fdecl)
                   fdecl)
           [fdecl m] (if (map? (last fdecl))
                       [(butlast fdecl) (conj m (last fdecl))]
                       [fdecl m])
           m (conj {:arglists (list 'quote (#'cljs.core/sigs fdecl))} m)
           m (conj (if (meta name) (meta name) {}) m)]
       [(with-meta name m) fdecl])))
