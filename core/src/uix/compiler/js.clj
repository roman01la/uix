(ns uix.compiler.js)

(defmulti to-js
          (fn [x]
            (cond
              (map? x) :map
              (vector? x) :vector
              (keyword? x) :keyword
              :else (class x))))

(defn to-js-map [m]
  (when (seq m)
    (let [key-strs (mapv to-js (keys m))
          non-str (remove string? key-strs)
          _ (assert (empty? non-str)
                    (str "UIx: Props can't be dynamic:"
                         (pr-str non-str) "in: " (pr-str m)))
          kvs-str (->> (mapv #(-> (str \' % "':~{}")) key-strs)
                       (interpose ",")
                       (apply str))]
      (vary-meta
        (list* 'js* (str "{" kvs-str "}") (mapv to-js (vals m)))
        assoc :tag 'object))))

(defmethod to-js :keyword [x] (name x))

(defmethod to-js :map [m] (to-js-map m))

(defmethod to-js :vector [xs]
  (apply list 'cljs.core/array (mapv to-js xs)))

(defmethod to-js :default [x] x)
