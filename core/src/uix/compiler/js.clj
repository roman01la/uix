(ns uix.compiler.js
  "Helper functions to convert Clojure literals into JS")

(defmulti to-js
  (fn [x]
    (cond
      (map? x) :map
      (vector? x) :vector
      (keyword? x) :keyword
      :else (class x))))

(defn to-js-map [m shallow?]
  (cond
    (nil? m) nil
    (empty? m) `(cljs.core/js-obj)
    :else (let [kvs-str (->> (mapv to-js (keys m))
                             (mapv #(-> (str \' % "':~{}")))
                             (interpose ",")
                             (apply str))]
            (vary-meta
             (list* 'js* (str "{" kvs-str "}")
                    (if shallow?
                      (vals m)
                      (mapv to-js (vals m))))
             assoc :tag 'object))))

(defmethod to-js :keyword [x] (name x))

(defmethod to-js :map [m] (to-js-map m false))

(defmethod to-js :vector [xs]
  (apply list 'cljs.core/array (mapv to-js xs)))

(defmethod to-js :default [x] x)
