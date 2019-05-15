(ns user)

(defn start []
  (require '[figwheel.main.api :as fig])
  (fig/start "dev"))

(defn docs []
  (require '[codox.main :as codox])
  (codox/generate-docs
   {:metadata {:doc/format :markdown}
    :themes [:rdash]}))

(defn fmt []
  (require 'cljfmt.main)
  (require '[clojure.java.io :as io])
  (import (java.io File))
  (let [paths (->> ["src" "dev"]
                   (map io/file)
                   (filter #(and (.exists ^java.io.File %) (.isDirectory ^java.io.File %))))]
    (cljfmt.main/fix paths {:file-pattern #"\.clj[cs]?$"})))
