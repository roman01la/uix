(ns uix.compiler.aot
  "Hiccup compiler that translates Hiccup into React.js at compile-time."
  (:require [clojure.string :as str]
            [uix.compiler.js :as js]
            [uix.compiler.attributes :as attrs]))

(defn check-attrs [v attrs children expr]
  (if (and (nil? attrs) (symbol? (first children)))
    `(let [m# ~(first children)]
       (assert (not (map? m#))
               (str "Looks like you've passed a dynamic map of props " m#
                    " in " ~(str v) " form. "
                    "Dynamic props are not supported in UIx's pre-compilation mode. "
                    "Make sure to declare props explicitly as map literal."))
       ~expr)
    expr))

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
        attrs (cond-> attrs
                :always (attrs/set-id-class id-class)
                (:key m) (assoc :key (:key m))
                (:ref attrs) (assoc :ref `(uix.compiler.alpha/unwrap-ref ~(:ref attrs))))
        attrs (js/to-js (attrs/compile-attrs attrs {:custom-element? (re-find #"-" tag)}))
        ret `(>el ~tag ~attrs ~@children)]
    ret))

(defmethod compile-element :component [v]
  (let [[tag props & children] v
        tag (vary-meta tag assoc :tag 'js)]
    `(uix.compiler.alpha/component-element ~tag ~props (cljs.core/array ~@children))))

(defmethod compile-element :fragment [v]
  (let [[_ attrs & children] v
        m (meta v)
        attrs (cond-> attrs
                (:key m) (assoc :key (:key m)))
        attrs (js/to-js (attrs/compile-attrs attrs))
        ret `(>el fragment ~attrs ~@children)]
    ret))

(defmethod compile-element :suspense [v]
  (let [[_ attrs & children] v
        m (meta v)
        attrs (cond-> attrs
                (:key m) (assoc :key (:key m)))
        attrs (js/to-js (attrs/compile-attrs attrs))
        ret `(>el suspense ~attrs ~children)]
    ret))

(defmethod compile-element :portal [v]
  (binding [*out* *err*]
    (println "WARNING: React portal Hiccup syntax :-> is deprecated, use uix.dom.alpha/create-portal instead"))
  (let [[_ child node] v]
    `(~'js/ReactDOM.createPortal ~child ~node)))

(defmethod compile-element :interop [v]
  (let [[tag attrs & children] v
        m (meta v)
        attrs (cond-> attrs
                (:key m) (assoc :key (:key m))
                (:ref attrs) (assoc :ref `(uix.compiler.alpha/unwrap-ref ~(:ref attrs))))
        attrs (js/to-js (attrs/compile-attrs attrs))]
    `(>el ~tag ~attrs ~children)))

(defn compile-html
  "Compiles Hiccup expr into React.js calls"
  [expr]
  (if (vector? expr)
    (compile-element expr)
    expr))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
