(ns uix.compiler.aot
  "Hiccup compiler that translates Hiccup into React.js at compile-time."
  (:require [clojure.string :as str]
            [uix.compiler.js :as js]
            [uix.compiler.attributes :as attrs]))

(defn- add-key [props meta]
  (cond-> props
          (:key meta) (assoc :key (:key meta))))

(defmulti compile-attrs (fn [tag attrs opts] tag))

(defmethod compile-attrs :element [_ attrs {:keys [meta tag id-class]}]
  (let [attrs (add-key attrs meta)]
    (cond
      (nil? attrs) `(cljs.core/array)
      (map? attrs)
      `(cljs.core/array
         ~(cond-> attrs
                  :always (attrs/set-id-class id-class)
                  (:ref attrs) (assoc :ref `(uix.compiler.alpha/unwrap-ref ~(:ref attrs)))
                  (and (some? (:style attrs))
                       (not (map? (:style attrs))))
                  (assoc :style `(uix.compiler.attributes/convert-props ~(:style attrs) (cljs.core/array) true))
                  :always (attrs/compile-attrs {:custom-element? (re-find #"-" tag)})
                  :always js/to-js))
      :else `(uix.compiler.attributes/interpret-attrs ~attrs (cljs.core/array ~@id-class) false))))

(defmethod compile-attrs :component [_ props {:keys [meta]}]
  `(uix.compiler.attributes/interpret-props ~(add-key props meta)))

(defmethod compile-attrs :fragment [_ attrs {:keys [meta]}]
  (let [attrs (add-key attrs meta)]
    (if (map? attrs)
      `(cljs.core/array ~(-> attrs attrs/compile-attrs js/to-js))
      `(uix.compiler.attributes/interpret-attrs ~attrs (cljs.core/array) false))))

(defmethod compile-attrs :suspense [_ attrs {:keys [meta]}]
  (let [attrs (add-key attrs meta)]
    (if (map? attrs)
      `(cljs.core/array ~(-> attrs attrs/compile-attrs js/to-js))
      `(uix.compiler.attributes/interpret-attrs ~attrs (cljs.core/array) false))))

(defmethod compile-attrs :interop [_ props {:keys [meta]}]
  (let [props (add-key props meta)]
    (if (map? props)
      `(cljs.core/array
         ~(cond-> props
                  (:ref props) (assoc :ref `(uix.compiler.alpha/unwrap-ref ~(:ref props)))
                  :always (attrs/compile-attrs {:custom-element? true})
                  :always (js/to-js-map true)))
      `(uix.compiler.attributes/interpret-attrs ~props (cljs.core/array) true))))

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
        tag-id-class (attrs/parse-tag tag)
        tag-str (first tag-id-class)
        attrs-children (compile-attrs :element attrs {:meta (meta v)
                                                      :tag tag-str
                                                      :tag-id-class tag-id-class})
        ret `(>el ~tag-str ~attrs-children (cljs.core/array ~@children))]
    ret))

(defmethod compile-element :component [v]
  (let [[tag props & children] v
        tag (vary-meta tag assoc :tag 'js)
        props-children (compile-attrs :component props {:meta (meta v)})]
    `(uix.compiler.alpha/component-element ~tag ~props-children (cljs.core/array ~@children))))

(defmethod compile-element :fragment [v]
  (let [[_ attrs & children] v
        attrs (compile-attrs :fragment attrs {:meta (meta v)})
        ret `(>el fragment ~attrs (cljs.core/array ~@children))]
    ret))

(defmethod compile-element :suspense [v]
  (let [[_ attrs & children] v
        attrs (compile-attrs :suspense attrs {:meta (meta v)})
        ret `(>el suspense ~attrs (cljs.core/array ~@children))]
    ret))

(defmethod compile-element :portal [v]
  (binding [*out* *err*]
    (println "WARNING: React portal Hiccup syntax :-> is deprecated, use uix.dom.alpha/create-portal instead"))
  (let [[_ child node] v]
    `(~'js/ReactDOM.createPortal ~child ~node)))

(defmethod compile-element :interop [v]
  (let [[_ tag props & children] v
        props (compile-attrs :interop props {:meta (meta v)})]
    `(>el ~tag ~props (cljs.core/array ~@children))))

(defn compile-html
  "Compiles Hiccup expr into React.js calls"
  [expr]
  (if (vector? expr)
    (compile-element expr)
    expr))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
