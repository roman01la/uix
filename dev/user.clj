(ns user)

(defn start []
  (require 'figwheel.main.api)
  (figwheel.main.api/start "dev"))

(defn docs []
  (require 'codox.main)
  (codox.main/generate-docs
   {:metadata {:doc/format :markdown}
    :themes [:rdash]}))

(defn fmt []
  (require 'cljfmt.main)
  (require 'clojure.java.io)
  (import (java.io File))
  (let [paths (->> ["src" "dev"]
                   (map clojure.java.io/file)
                   (filter #(and (.exists ^java.io.File %) (.isDirectory ^java.io.File %))))]
    (cljfmt.main/fix paths {:file-pattern #"\.clj[cs]?$"})))
