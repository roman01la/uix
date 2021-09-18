(ns uix.compiler.aot
  "Hiccup compiler that translates Hiccup into React.js at compile-time."
  (:require [clojure.string :as str]
            [uix.compiler.js :as js]
            [uix.compiler.attributes :as attrs]))

;; Compiles Hiccup into React.createElement
(defmulti compile-element
  (fn [[tag]]
    (cond
      (= :<> tag) :fragment
      (= :# tag) :suspense
      (= :-> tag) :portal
      (= :> tag) :interop
      (keyword? tag) :element
      :else :component)))

(defmethod compile-element :element [v]
  (let [[tag attrs & children] v
        id-class (attrs/parse-tag tag)
        tag (first id-class)
        m (meta v)
        attrs (when (some? attrs)
                (if-not (map? attrs)
                  `(uix.compiler.attributes/interpret-attrs ~attrs (cljs.core/array ~@id-class) false)
                  (cond-> attrs
                    :always (attrs/set-id-class id-class)
                    (:key m) (assoc :key (:key m))
                    (:ref attrs) (assoc :ref `(uix.compiler.alpha/unwrap-ref ~(:ref attrs)))
                    (and (some? (:style attrs))
                         (not (map? (:style attrs))))
                    (assoc :style `(uix.compiler.attributes/interpret-attrs ~(:style attrs) (cljs.core/array) true))
                    :always (attrs/compile-attrs {:custom-element? (re-find #"-" tag)})
                    :always js/to-js)))
        ret `(>el ~tag ~attrs ~@children)]
    ret))

(defmethod compile-element :component [v]
  (let [[tag props & children] v
        tag (vary-meta tag assoc :tag 'js)]
    `(uix.compiler.alpha/component-element ~tag ~props (cljs.core/array ~@children))))

(defmethod compile-element :fragment [v]
  (let [[_ attrs & children] v
        m (meta v)
        attrs (when (some? attrs)
                (if-not (map? attrs)
                  `(uix.compiler.attributes/interpret-attrs ~attrs (cljs.core/array) false)
                  (cond-> attrs
                    (:key m) (assoc :key (:key m))
                    :always attrs/compile-attrs
                    :always js/to-js)))
        ret `(>el fragment ~attrs ~@children)]
    ret))

(defmethod compile-element :suspense [v]
  (let [[_ attrs & children] v
        m (meta v)
        attrs (when (some? attrs)
                (if-not (map? attrs)
                  `(uix.compiler.attributes/interpret-attrs ~attrs (cljs.core/array) false)
                  (cond-> attrs
                    (:key m) (assoc :key (:key m))
                    :always attrs/compile-attrs
                    :always js/to-js)))
        ret `(>el suspense ~attrs ~children)]
    ret))

(defmethod compile-element :portal [v]
  (binding [*out* *err*]
    (println "WARNING: React portal Hiccup syntax :-> is deprecated, use uix.dom.alpha/create-portal instead"))
  (let [[_ child node] v]
    `(~'js/ReactDOM.createPortal ~child ~node)))

(defmethod compile-element :interop [v]
  (let [[_ tag attrs & children] v
        m (meta v)
        attrs (when (some? attrs)
                (if-not (map? attrs)
                  `(uix.compiler.attributes/interpret-attrs ~attrs (cljs.core/array) true)
                  (cond-> attrs
                    (:key m) (assoc :key (:key m))
                    (:ref attrs) (assoc :ref `(uix.compiler.alpha/unwrap-ref ~(:ref attrs)))
                    :always attrs/compile-attrs
                    :always js/to-js)))]
    `(>el ~tag ~attrs ~children)))

(defn compile-html
  "Compiles Hiccup expr into React.js calls"
  [expr]
  (if (vector? expr)
    (compile-element expr)
    expr))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
