(ns uix.rn.alpha
  (:require [clojure.string :as str]))

(defn camel->dash [s]
  (-> (str/replace s #"[A-Z]" #(str "-" (str/lower-case %)))
      (subs 1)))

(defmacro gen-adapted-components [module names]
  `(do
     ~@(for [name names]
         `(def ~(symbol (camel->dash name))
            (adapt-fn (. ~module ~(symbol (str "-" name))))))))
