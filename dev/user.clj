(ns user
  (:require [figwheel.main.api]
            [codox.main]
            [cljfmt.main]
            [clojure.java.io])
  (:import (java.io File)))

(defn start []
  (figwheel.main.api/start "dev"))

(defn docs []
  (codox.main/generate-docs
   {:metadata {:doc/format :markdown}
    :themes [:rdash]}))

(defn fmt []
  (let [paths (->> ["src" "dev"]
                   (map clojure.java.io/file)
                   (filter #(and (.exists ^File %) (.isDirectory ^File %))))]
    (cljfmt.main/fix paths {:file-pattern #"\.clj[cs]?$"})))
