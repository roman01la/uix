(ns uix.compiler.attributes
  (:require [clojure.string :as str]
            [goog.object :as gobj]))

(declare convert-prop-value)
(declare convert-prop-value-shallow)

(defn js-val? [x]
  (not (identical? "object" (goog/typeOf x))))

(def prop-name-cache
  #js {:class "className"
       :for "htmlFor"
       :charset "charSet"})

(def custom-prop-name-cache #js {})

(def tag-name-cache #js {})

(def ^:private cc-regexp (js/RegExp. "-(\\w)" "g"))

(defn- cc-fn [s]
  (str/upper-case (aget s 1)))

(defn ^string dash-to-camel [^string name-str]
  (if (or (str/starts-with? name-str "aria-")
          (str/starts-with? name-str "data-"))
    name-str
    (.replace name-str cc-regexp cc-fn)))

(defn cached-prop-name [k]
  (if (keyword? k)
    (let [name-str (-name ^not-native k)]
      (if-some [k' (aget prop-name-cache name-str)]
        k'
        (let [v (dash-to-camel name-str)]
          (aset prop-name-cache name-str v)
          v)))
    k))

(defn cached-custom-prop-name [k]
  (if (keyword? k)
    (let [name-str (-name ^not-native k)]
      (if-some [k' (aget custom-prop-name-cache name-str)]
        k'
        (let [v (dash-to-camel name-str)]
          (aset custom-prop-name-cache name-str v)
          v)))
    k))

(defn convert-interop-prop-value [k v]
  (cond
    (= k :style) (if (vector? v)
                   (-reduce ^not-native v
                            (fn [a v]
                              (.push a (convert-prop-value-shallow v))
                              a)
                            #js [])
                   (convert-prop-value-shallow v))
    (keyword? v) (-name ^not-native v)
    :else v))

(defn kv-conv [o k v]
  (gobj/set o (cached-prop-name k) (convert-prop-value v))
  o)

(defn kv-conv-shallow [o k v]
  (gobj/set o (cached-prop-name k) (convert-interop-prop-value k v))
  o)

(defn custom-kv-conv [o k v]
  (gobj/set o (cached-custom-prop-name k) (convert-prop-value v))
  o)

(defn convert-prop-value [x]
  (cond
    (js-val? x) x
    (keyword? x) (-name ^not-native x)
    (map? x) (reduce-kv kv-conv #js {} x)
    (coll? x) (clj->js x)
    (ifn? x) #(apply x %&)
    :else (clj->js x)))

(defn convert-custom-prop-value [x]
  (cond
    (js-val? x) x
    (keyword? x) (-name ^not-native x)
    (map? x) (reduce-kv custom-kv-conv #js {} x)
    (coll? x) (clj->js x)
    (ifn? x) #(apply x %&)
    :else (clj->js x)))

(defn convert-prop-value-shallow [x]
  (if (map? x)
    (reduce-kv kv-conv-shallow #js {} x)
    x))

(defn class-names-coll [class]
  (let [^js/Array classes (reduce (fn [^js/Array a c]
                                    (when ^boolean c
                                      (->> (if (keyword? c) (-name ^not-native c) c)
                                           (.push a)))
                                    a)
                                  #js []
                                  class)]
    (when (pos? (.-length classes))
      (.join classes " "))))

(defn class-names-map [class]
  (let [^js/Array classes (reduce-kv (fn [^js/Array a b ^boolean c]
                                       (when c
                                         (->> (if (keyword? b) (-name ^not-native b) b)
                                              (.push a)))
                                       a)
                                     #js []
                                     class)]
    (when (pos? (.-length classes))
      (.join classes " "))))

(defn ^string class-names
  ([])
  ([class]
   (cond
     ;; {c1 true c2 false}
     (map? class)
     (class-names-map class)

     ;; [c1 c2 c3]
     (or (array? class) (coll? class))
     (class-names-coll class)

     ;; :c1
     (keyword? class)
     (-name ^not-native class)

     :else class))
  ([a b]
   (if ^boolean a
     (if ^boolean b
       (str (class-names a) " " (class-names b))
       (class-names a))
     (class-names b)))
  ([a b & rst]
   (reduce class-names (class-names a b) rst)))

(defn set-id-class
  "Takes the id and class from tag keyword, and adds them to the
  other props. Parsed tag is JS object with :id and :class properties."
  [props id-class]
  (let [id (aget id-class 1)
        classes ^js/Array (aget id-class 2)]
    (cond-> props
            ;; Only use ID from tag keyword if no :id in props already
            (and (some? id) (nil? (get props :id)))
            (assoc :id id)

            ;; Merge classes
            (and (some? classes) (pos? (.-length classes)))
            (assoc :class (class-names classes (get props :class))))))

(defn convert-props
  "Converts `props` Clojure map into JS object suitable for
  passing as `props` object into `React.crteateElement`

  - `props` — Clojure map of props
  - `id-class` — a triplet of parsed tag, id and class names
  - `shallow?` — indicates whether `props` map should be converted shallowly or not"
  [props id-class ^boolean shallow?]
  (let [class (get props :class)
        props (-> props
                  (cond-> class (assoc :class (class-names class)))
                  (set-id-class id-class))]
    (cond
      ^boolean (aget id-class 3)
      (convert-custom-prop-value props)

      shallow?
      (convert-prop-value-shallow props)

      :else (convert-prop-value props))))

(defn interpret-attrs
  "Returns a tuple of attributes and a child element

  - [attrs] when `attrs` is actually a map of attributes
  - [nil attrs] when `attrs` is not a map, thus a child element"
  [maybe-attrs id-class shallow?]
  (if (or (map? maybe-attrs) (nil? maybe-attrs))
    #js [(convert-props maybe-attrs id-class shallow?)]
    #js [(convert-props {} id-class shallow?) maybe-attrs]))

(defn interpret-props
  "Returns a tuple of component props and a child element

  - [props] when `props` is actually a map of attributes
  - [nil props] when `props` is not a map, thus a child element"
  [props]
  (if (or (map? props) (nil? props))
    #js [props]
    #js [nil props]))
