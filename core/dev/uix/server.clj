(ns uix.server
  (:require [aleph.http :as http]
            [manifold.stream :as s]
            [uix.dom]
            [uix.recipes :as recipes]
            [clojure.string :as str]))

(def head
  "<!DOCTYPE html>
  <html lang=\"en\">
  <head>
  <meta charset=\"UTF-8\">
  <style>body {margin: 0;font: normal 14px sans-serif;}</style>
  </head>
  <body><div id=\"root\">")

(def end
  "</div>
  <div id=\"popup-layer\"></div>
  <script src=\"/out/cljs_base.js\"></script>
  <script src=\"/out/recipes.js\"></script>
  </body>
  </html>")

(defn response []
  (let [res (s/stream)]
    (future
      (s/put! res head)
      (uix.dom/render-to-stream [recipes/root] {:on-chunk #(s/put! res %)})
      (s/put! res end)
      (s/close! res))
    {:status 200
     :headers {"content-type" "text/html"}
     :body res}))

(defn handler [req]
  (cond
    (= (:uri req) "/")
    (response)

    (str/starts-with? (:uri req) "/out/")
    {:status 200
     :headers {"content-type" "application/javascript"}
     :body (slurp (str "resources/public" (:uri req)))}

    :else {:status 404
           :headers {"content-type" "text/plain"}
           :body "404"}))

(defn -main []
  (let [port 8080]
    (http/start-server #'handler {:port port})
    (println (str "Server started at http://localhost:" port))))
