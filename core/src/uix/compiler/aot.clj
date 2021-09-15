(ns uix.compiler.aot
  "Hiccup compiler that translates Hiccup into React.js at compile-time."
  (:require [clojure.string :as str]))

(defn unevaluated? [expr]
  (or (symbol? expr)
      (and (seq? expr)
           (not= (first expr) `quote))))

(defn literal? [x]
  (and (not (unevaluated? x))
       (or (not (or (vector? x) (map? x)))
           (and (every? literal? x)
                (not (keyword? (first x)))))))

(declare compile-html*)

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

(declare to-js)

(defn join-classes-js
  "Emits runtime class string concatenation expression"
  [xs]
  (let [strs (->> (repeat (count xs) "~{}")
                  (interpose ",")
                  (apply str))]
    (->> xs
         (map to-js)
         (list* 'js* (str "[" strs "].join(' ')")))))

(defn join-classes
  "Joins class names into a single string"
  [classes]
  (->> (map #(if (string? %) % (seq %)) classes)
       flatten
       (remove nil?)
       (str/join " ")))

(def re-tag
  "Hiccup tag pattern :div :.class#id etc."
  #"([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?")

(defn parse-tag
  "Takes Hiccup tag (:div.class#id) and returns parsed tag, id and class fields"
  [hiccup-tag]
  (let [[tag id class-name] (->> hiccup-tag name (re-matches re-tag) next)
        class-name (when-not (nil? class-name)
                     (str/replace class-name #"\." " "))]
    (list tag id class-name)))

(defn set-id-class
  "Takes attributes map and parsed tag, and returns attributes merged with class names and id"
  [props [_ id class]]
  (cond-> props
    ;; Only use ID from tag keyword if no :id in props already
    (and (some? id) (nil? (get props :id)))
    (assoc :id id)

    ;; Merge classes
    class
    (assoc :class (join-classes [class (get props :class)]))))

(defn camel-case
  "Turns kebab-case keyword into camel-case keyword"
  [k]
  (if (keyword? k)
    (let [[first-word & words] (str/split (name k) #"-")]
      (if (or (empty? words)
              (= "aria" first-word)
              (= "data" first-word))
        k
        (-> (map str/capitalize words)
            (conj first-word)
            str/join
            keyword)))
    k))

(defn camel-case-keys
  "Takes map of attributes and returns same map with camel-cased keys"
  [m]
  (if (map? m)
    (reduce-kv #(assoc %1 (camel-case %2) %3) {} m)
    m))

(defmulti compile-config-kv (fn [name value] name))

(defn join-classes-map [m]
  (->> m
       (reduce-kv
         (fn [ret k v]
           (cond
             (true? v) (conj ret k)
             (false? v) ret
             :else (conj ret `(when ~v ~(to-js k)))))
         [])
       join-classes-js))

(defmethod compile-config-kv :class [name value]
  (cond
    (or (nil? value) (keyword? value) (string? value))
    value

    (map? value)
    (join-classes-map value)

    (and (or (sequential? value) (set? value))
         (every? string? value))
    (join-classes value)

    (vector? value)
    (join-classes-js value)

    :else value))

(defmethod compile-config-kv :style [name value]
  (camel-case-keys value))

(defmethod compile-config-kv :default [name value]
  value)

(defn compile-attrs
  "Takes map of attributes and returns same map with keys translated from Hiccup to React naming conventions"
  [attrs]
  (if (map? attrs)
    (reduce-kv
     #(assoc %1
             (case %2
               :class :className
               :for :htmlFor
               (camel-case %2))
             (compile-config-kv %2 %3))
     {}
     attrs)
    attrs))

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

(defn form-name [form]
  (when (and (seq? form) (symbol? (first form)))
    (name (first form))))

(defmulti compile-form form-name)

(defmethod compile-form "do"
  [[_ & forms]]
  `(do ~@(butlast forms) ~(compile-html* (last forms))))

(defmethod compile-form "array"
  [[_ & forms]]
  `(cljs.core/array ~@(mapv compile-html* forms)))

(defmethod compile-form "let"
  [[_ bindings & body]]
  `(let ~bindings ~@(butlast body) ~(compile-html* (last body))))

(defmethod compile-form "let*"
  [[_ bindings & body]]
  `(let* ~bindings ~@(butlast body) ~(compile-html* (last body))))

(defmethod compile-form "letfn*"
  [[_ bindings & body]]
  `(letfn* ~bindings ~@(butlast body) ~(compile-html* (last body))))

(defmethod compile-form "for"
  [[_ bindings body]]
  (if (== 2 (count bindings))
    (let [[item coll] bindings]
      `(reduce (fn ~'hicada-for-reducer [out-arr# ~item]
                 (.push out-arr# ~(compile-html* body))
                 out-arr#)
               (cljs.core/array) ~coll))
    (list 'uix.compiler.alpha/array-from
          `(for ~bindings ~(compile-html* body)))))

(defmethod compile-form "if"
  [[_ condition & body]]
  `(if ~condition ~@(doall (for [x body] (compile-html* x)))))

(defmethod compile-form "when"
  [[_ bindings & body]]
  `(when ~bindings ~@(doall (for [x body] (compile-html* x)))))

(defmethod compile-form "when-some"
  [[_ bindings & body]]
  `(when-some ~bindings ~@(butlast body) ~(compile-html* (last body))))

(defmethod compile-form "when-let"
  [[_ bindings & body]]
  `(when-let ~bindings ~@(butlast body) ~(compile-html* (last body))))

(defmethod compile-form "when-first"
  [[_ bindings & body]]
  `(when-first ~bindings ~@(butlast body) ~(compile-html* (last body))))

(defmethod compile-form "when-not"
  [[_ bindings & body]]
  `(when-not ~bindings ~@(doall (for [x body] (compile-html* x)))))

(defmethod compile-form "if-not"
  [[_ bindings & body]]
  `(if-not ~bindings ~@(doall (for [x body] (compile-html* x)))))

(defmethod compile-form "if-some"
  [[_ bindings & body]]
  `(if-some ~bindings ~@(doall (for [x body] (compile-html* x)))))

(defmethod compile-form "if-let"
  [[_ bindings & body]]
  `(if-let ~bindings ~@(doall (for [x body] (compile-html* x)))))

(defmethod compile-form "case"
  [[_ v & cases]]
  `(case ~v
     ~@(doall (mapcat
               (fn [[test hiccup]]
                 (if hiccup
                   [test (compile-html* hiccup)]
                   [(compile-html* test)]))
               (partition-all 2 cases)))))

(defmethod compile-form "condp"
  [[_ f v & cases]]
  `(condp ~f ~v
     ~@(doall (mapcat
               (fn [[test hiccup]]
                 (if hiccup
                   [test (compile-html* hiccup)]
                   [(compile-html* test)]))
               (partition-all 2 cases)))))

(defmethod compile-form "cond"
  [[_ & clauses]]
  `(cond ~@(mapcat
            (fn [[check expr]] [check (compile-html* expr)])
            (partition 2 clauses))))

(defmethod compile-form :default [expr]
  expr)

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
  (seq (mapv compile-html* v)))

(defmethod compile-element :element [v]
  (let [[tag attrs children] (normalize-element v)
        id-class (parse-tag tag)
        tag (first id-class)
        m (meta v)
        attrs (cond-> attrs
                :always (set-id-class id-class)
                (:key m) (assoc :key (:key m))
                (:ref attrs) (assoc :ref `(uix.compiler.alpha/unwrap-ref ~(:ref attrs))))
        attrs (to-js (compile-attrs attrs))
        children (mapv compile-html* children)
        ret `(>el ~tag ~attrs ~@children)]
    ret))

(defmethod compile-element :component [v]
  (let [[tag props & children] v
        tag (vary-meta tag assoc :tag 'js)
        children-compiled (mapv compile-html* children)]
    `(do
       (set! (.-compiled? ~tag) true)
       (uix.compiler.alpha/component-element ~tag ~props (cljs.core/array ~@children-compiled)))))

(defmethod compile-element :fragment [v]
  (let [[_ attrs children] (normalize-element v)
        m (meta v)
        attrs (cond-> attrs
                (:key m) (assoc :key (:key m)))
        attrs (to-js (compile-attrs attrs))
        children (mapv compile-html* children)
        ret `(>el fragment ~attrs ~@children)]
    ret))

(defmethod compile-element :suspense [v]
  (let [[_ attrs children] (normalize-element v)
        m (meta v)
        attrs (cond-> attrs
                (:fallback attrs) (update :fallback compile-html*)
                (:key m) (assoc :key (:key m)))
        attrs (to-js (compile-attrs attrs))
        children (mapv compile-html* children)
        ret `(>el suspense ~attrs ~children)]
    ret))

(defmethod compile-element :portal [v]
  (binding [*out* *err*]
    (println "WARNING: React portal Hiccup syntax :-> is deprecated, use uix.dom.alpha/create-portal instead"))
  (let [[_ child node] v]
    `(~'js/ReactDOM.createPortal ~(compile-html* child) ~node)))

(defmethod compile-element :interop [v]
  (let [[tag attrs children] (normalize-element v 2)
        m (meta v)
        attrs (cond-> attrs
                (:key m) (assoc :key (:key m))
                (:ref attrs) (assoc :ref `(uix.compiler.alpha/unwrap-ref ~(:ref attrs))))
        attrs (to-js (compile-attrs attrs))
        children (mapv compile-html* children)]
    `(>el ~tag ~attrs ~children)))

(defn compile-html
  "Compiles Hiccup expr into React.js calls"
  [expr]
  (cond
    (vector? expr) (compile-element expr)
    (literal? expr) expr
    :else (compile-form expr)))

(defmacro compile-defui
  "Compiles Hiccup component defined with defui macro into React component"
  [body]
  `(do ~@(mapv compile-html* body)))

