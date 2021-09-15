(ns uix.compiler.aot
  "Hiccup compiler that translates Hiccup into React.js at compile-time."
  (:require [clojure.string :as str]
            [uix.compiler.js :as js]
            [uix.compiler.attributes :as attrs]))

(defn unevaluated? [expr]
  (or (symbol? expr)
      (and (seq? expr)
           (not= (first expr) `quote))))

(defn literal? [x]
  (and (not (unevaluated? x))
       (or (not (or (vector? x) (map? x)))
           (and (every? literal? x)
                (not (keyword? (first x)))))))

(declare compile-html)

(defn normalize-element
  "Takes Hiccup element and optional index specifying position of attributes
  and returns a normalized element [tag attrs children]"
  ([v]
   (normalize-element v 1))
  ([v n]
   (let [tag (nth v (dec n))
         attrs (nth v n nil)
         children (drop (inc n) v)
         attrs? (or (nil? attrs) (map? attrs))
         children (if attrs? children (cons attrs children))
         attrs (if attrs? attrs nil)]
     [tag attrs children])))

;; Compiles Hiccup within well known Clojure forms
(defn form-name [form]
  (when (and (seq? form) (symbol? (first form)))
    (name (first form))))

(defmulti compile-form form-name)

(defmethod compile-form "do"
  [[_ & forms]]
  `(do ~@(butlast forms) ~(compile-html (last forms))))

(defmethod compile-form "array"
  [[_ & forms]]
  `(cljs.core/array ~@(mapv compile-html forms)))

(defmethod compile-form "let"
  [[_ bindings & body]]
  `(let ~bindings ~@(butlast body) ~(compile-html (last body))))

(defmethod compile-form "let*"
  [[_ bindings & body]]
  `(let* ~bindings ~@(butlast body) ~(compile-html (last body))))

(defmethod compile-form "letfn*"
  [[_ bindings & body]]
  `(letfn* ~bindings ~@(butlast body) ~(compile-html (last body))))

(defmethod compile-form "for"
  [[_ bindings body]]
  (if (== 2 (count bindings))
    (let [[item coll] bindings]
      `(reduce (fn ~'hicada-for-reducer [out-arr# ~item]
                 (.push out-arr# ~(compile-html body))
                 out-arr#)
               (cljs.core/array) ~coll))
    (list 'uix.compiler.alpha/array-from
          `(for ~bindings ~(compile-html body)))))

(defmethod compile-form "if"
  [[_ condition & body]]
  `(if ~condition ~@(doall (for [x body] (compile-html x)))))

(defmethod compile-form "when"
  [[_ bindings & body]]
  `(when ~bindings ~@(doall (for [x body] (compile-html x)))))

(defmethod compile-form "when-some"
  [[_ bindings & body]]
  `(when-some ~bindings ~@(butlast body) ~(compile-html (last body))))

(defmethod compile-form "when-let"
  [[_ bindings & body]]
  `(when-let ~bindings ~@(butlast body) ~(compile-html (last body))))

(defmethod compile-form "when-first"
  [[_ bindings & body]]
  `(when-first ~bindings ~@(butlast body) ~(compile-html (last body))))

(defmethod compile-form "when-not"
  [[_ bindings & body]]
  `(when-not ~bindings ~@(doall (for [x body] (compile-html x)))))

(defmethod compile-form "if-not"
  [[_ bindings & body]]
  `(if-not ~bindings ~@(doall (for [x body] (compile-html x)))))

(defmethod compile-form "if-some"
  [[_ bindings & body]]
  `(if-some ~bindings ~@(doall (for [x body] (compile-html x)))))

(defmethod compile-form "if-let"
  [[_ bindings & body]]
  `(if-let ~bindings ~@(doall (for [x body] (compile-html x)))))

(defmethod compile-form "case"
  [[_ v & cases]]
  `(case ~v
     ~@(doall (mapcat
               (fn [[test hiccup]]
                 (if hiccup
                   [test (compile-html hiccup)]
                   [(compile-html test)]))
               (partition-all 2 cases)))))

(defmethod compile-form "condp"
  [[_ f v & cases]]
  `(condp ~f ~v
     ~@(doall (mapcat
               (fn [[test hiccup]]
                 (if hiccup
                   [test (compile-html hiccup)]
                   [(compile-html test)]))
               (partition-all 2 cases)))))

(defmethod compile-form "cond"
  [[_ & clauses]]
  `(cond ~@(mapcat
            (fn [[check expr]] [check (compile-html expr)])
            (partition 2 clauses))))

(defmethod compile-form :default [expr]
  expr)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

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
      (vector? tag) :seq
      (seq? tag) :seq
      :else :component)))

(defmethod compile-element :seq [v]
  (seq (mapv compile-html v)))

(defmethod compile-element :element [v]
  (let [[tag attrs children] (normalize-element v)
        id-class (attrs/parse-tag tag)
        tag (first id-class)
        m (meta v)
        attrs (cond-> attrs
                :always (attrs/set-id-class id-class)
                (:key m) (assoc :key (:key m))
                (:ref attrs) (assoc :ref `(uix.compiler.alpha/unwrap-ref ~(:ref attrs))))
        attrs (js/to-js (attrs/compile-attrs attrs {:custom-element? (re-find #"-" tag)}))
        children (mapv compile-html children)
        ret `(>el ~tag ~attrs ~@children)]
    ret))

(defmethod compile-element :component [v]
  (let [[tag props & children] v
        tag (vary-meta tag assoc :tag 'js)
        children-compiled (mapv compile-html children)]
    `(uix.compiler.alpha/component-element ~tag ~props (cljs.core/array ~@children-compiled))))

(defmethod compile-element :fragment [v]
  (let [[_ attrs children] (normalize-element v)
        m (meta v)
        attrs (cond-> attrs
                (:key m) (assoc :key (:key m)))
        attrs (js/to-js (attrs/compile-attrs attrs))
        children (mapv compile-html children)
        ret `(>el fragment ~attrs ~@children)]
    ret))

(defmethod compile-element :suspense [v]
  (let [[_ attrs children] (normalize-element v)
        m (meta v)
        attrs (cond-> attrs
                (:fallback attrs) (update :fallback compile-html)
                (:key m) (assoc :key (:key m)))
        attrs (js/to-js (attrs/compile-attrs attrs))
        children (mapv compile-html children)
        ret `(>el suspense ~attrs ~children)]
    ret))

(defmethod compile-element :portal [v]
  (binding [*out* *err*]
    (println "WARNING: React portal Hiccup syntax :-> is deprecated, use uix.dom.alpha/create-portal instead"))
  (let [[_ child node] v]
    `(~'js/ReactDOM.createPortal ~(compile-html child) ~node)))

(defmethod compile-element :interop [v]
  (let [[tag attrs children] (normalize-element v 2)
        m (meta v)
        attrs (cond-> attrs
                (:key m) (assoc :key (:key m))
                (:ref attrs) (assoc :ref `(uix.compiler.alpha/unwrap-ref ~(:ref attrs))))
        attrs (js/to-js (attrs/compile-attrs attrs))
        children (mapv compile-html children)]
    `(>el ~tag ~attrs ~children)))

(defn compile-html
  "Compiles Hiccup expr into React.js calls"
  [expr]
  (cond
    (vector? expr) (compile-element expr)
    (literal? expr) expr
    :else (compile-form expr)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
