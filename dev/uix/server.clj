(ns uix.server
  (:require [aleph.http :as http]
            [manifold.stream :as s]
            [uix.core.alpha :as uix]))

(def text
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")

(defn db-fetch []
  (Thread/sleep 10)
  text)

(defn app [n]
  (when (pos? n)
    [:div n (db-fetch)
     (map (constantly [app (dec n)])
          (range n))]))

(def head
  "<html><head><title>Page</title>
  <script>
    console.log('Started loading script...');
    window.onload = () => console.log('Page loaded, running script!');
  </script>
  </head><body><div id=\"root\">")

(def end
  "</div></body></html>")

(defn non-chunked-response
  "Client starts receiving response immediately
  but actual content starts download after
  rendering is done, ~500ms"
  []
  (let [res (s/stream)]
    (future
      (s/put! res head)
      (s/put! res (uix/render-to-string [app 4]))
      (s/put! res end)
      (s/close! res))
    {:status 200
     :headers {"content-type" "text/html"}
     :body res}))

(defn chunked-response
  "Client immediately starts receiving response and rendering content"
  []
  (let [res (s/stream)]
    (future
      (s/put! res head)
      (uix/render-to-stream [app 4] {:on-chunk #(s/put! res %)})
      (s/put! res end)
      (s/close! res))
    {:status 200
     :headers {"content-type" "text/html"}
     :body res}))

(defn handler [req]
  (case (:uri req)
    "/" (non-chunked-response)
    "/chunked" (chunked-response)
    {:status 404
     :headers {"content-type" "text/plain"}
     :body "404"}))

(comment
  (def server
    (http/start-server #'handler {:port 8080}))

  (defn stop! []
    (.close server)))
