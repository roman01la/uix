(ns user
  (:require [figwheel.main.api :as fig]))

(defn start []
  (fig/start "dev"))

(comment
  (require '[codox.main :as codox])
  (codox/generate-docs
    {:metadata {:doc/format :markdown}
     :themes [:rdash]}))
