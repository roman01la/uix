(ns user
  (:require [cljs.build.api :as b]
            [ring.adapter.jetty :as j]))

(def should-reload? (atom false))

(defn on-build []
  (reset! should-reload? true))

(defn handler [req]
  (case (:uri req)
    "/should-reload"
    {:status 200
     :headers {"Access-Control-Allow-Origin" "*"
               "Cache-Control" "no-cache"}
     :body (str (if @should-reload?
                  (do (reset! should-reload? false)
                      true)
                  @should-reload?))}

    {:status 200}))

(defn start []
  (j/run-jetty #'handler {:port 3000 :join? false})
  (future
    (b/watch "src/xtools"
             {:main 'xtools.core
              :optimizations :whitespace
              :output-dir "resources/public/out"
              :output-to "resources/public/xframe.js"
              :watch-fn on-build})))
