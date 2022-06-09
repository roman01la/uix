(ns uix.source
  "Getting source of UIx components at macro expansion time"
  (:require [clojure.java.io :as io]
            [clojure.tools.reader.reader-types :as readers]
            [clojure.tools.reader :as reader]
            [cljs.tagged-literals :as tags]
            [uix.lib]
            [cljs.analyzer :as ana])
  (:import (java.io PushbackReader)))

;; from cljs.repl/source-fn
(defn- source-fn [{:keys [file line]}]
  (when file
    (let [f (io/file file)
          f (if (.exists f)
              f
              (io/resource file))]
      (when f
        (with-open [pbr (PushbackReader. (io/reader f))]
          (let [rdr (readers/source-logging-push-back-reader pbr)]
            (dotimes [_ (dec line)] (readers/read-line rdr))
            (binding [reader/*alias-map* identity
                      reader/*data-readers* tags/*cljs-data-readers*]
              (-> (reader/read {:read-cond :allow :features #{:cljs}} rdr)
                  meta
                  :source))))))))

(defn source [env sym]
  (-> (ana/resolve-var env sym) :meta source-fn))
