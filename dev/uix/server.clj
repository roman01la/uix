(ns uix.server
  (:require [aleph.http :as http]
            [manifold.stream :as s]
            [uix.core.alpha :as uix]))

(def text
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")

(defn app [n]
  (if (pos? n)
    (do
      (Thread/sleep 10)
      [:div n text (map (constantly [app (dec n)])
                        (range n))])
    [:div]))

(def head
  "<html><head><title>Page</title></head><body><div id=\"root\">")

(def end
  "</div></body></html>")

(defn handler [req]
  (let [res (s/stream)]
    (future
      (s/put! res head)
      (uix/render-to-stream [app 4] {:on-chunk #(s/put! res %)})
      (s/put! res end)
      (s/close! res))
    {:status 200
     :headers {"content-type" "text/plain"}
     :body res}))

(def server
  (http/start-server #'handler {:port 8080}))

(defn stop! []
  (.close server))
