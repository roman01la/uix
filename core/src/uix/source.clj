(ns uix.source
  "Getting source of UIx components at macro expansion time"
  (:require [clojure.java.io :as io]
            [clojure.tools.reader.reader-types :as readers]
            [clojure.tools.reader :as reader]
            [cljs.tagged-literals :as tags])
  (:import (java.io PushbackReader)))

(def components (atom {}))

(defn register-symbol! [sym]
  (swap! components assoc sym sym))

;; from cljs.repl/source-fn
(defn- source-fn [sym]
  (let [v (meta sym)]
    (when-let [filepath (:file v)]
      (let [f (io/file filepath)
            f (if (.exists f)
                f
                (io/resource filepath))]
        (when f
          (with-open [pbr (PushbackReader. (io/reader f))]
            (let [rdr (readers/source-logging-push-back-reader pbr)]
              (dotimes [_ (dec (:line v))] (readers/read-line rdr))
              (binding [reader/*alias-map* identity
                        reader/*data-readers* tags/*cljs-data-readers*]
                (-> (reader/read {:read-cond :allow :features #{:cljs}} rdr)
                    meta
                    :source)))))))))

(defn source [sym]
  (source-fn (@components sym)))
