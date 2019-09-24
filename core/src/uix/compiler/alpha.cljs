(ns uix.compiler.alpha
  "Hiccup and UIx components interpreter. Based on Reagent."
  (:require [react :as react]
            [goog.object :as gobj]
            [uix.hooks.alpha :as hooks]
            [clojure.string :as str]
            [cljs-bean.core :as bean]))

(defn unwrap-ref [-ref]
  (if (implements? hooks/IRef -ref)
    (hooks/unwrap ^not-native -ref)
    -ref))

(defn js-val? [x]
  (not (identical? "object" (goog/typeOf x))))

(defn named? [x]
  (keyword? x))

(defn hiccup-tag? [x]
  (keyword? x))

(declare make-element)
(declare as-element)
(declare expand-seq)
(declare convert-prop-value)
(declare convert-prop-value-shallow)

(def prop-name-cache #js {:class "className"
                          :for "htmlFor"
                          :charset "charSet"})

(def custom-prop-name-cache #js {})

(def tag-name-cache #js {})

(def transform-fns (atom #{}))

(defn add-transform-fn [f]
  (swap! transform-fns conj f))

(defn ^string capitalize [^string s]
  (if (< (.-length s) 2)
    (str/upper-case s)
    (str ^string (str/upper-case (subs s 0 1)) ^string (subs s 1))))

(defn ^string dash-to-camel [dashed]
  (let [name-str (-name dashed)
        parts (.split name-str #"-")
        ^string start (aget parts 0)
        parts (.slice parts 1)]
    (if (or (= start "aria") (= start "data"))
      name-str
      (str start (-> parts
                     (array-reduce
                       (fn [a p]
                         (.push a (capitalize p))
                         a)
                       #js [])
                     ^string (.join ""))))))

(defn cached-prop-name [k]
  (if (named? k)
    (if-some [k' (aget prop-name-cache (-name k))]
      k'
      (let [v (dash-to-camel k)]
        (gobj/set prop-name-cache (-name k) v)
        v))
    k))

(defn cached-custom-prop-name [k]
  (if (named? k)
    (if-some [k' (aget custom-prop-name-cache (-name k))]
      k'
      (let [v (dash-to-camel k)]
        (gobj/set custom-prop-name-cache (-name k) v)
        v))
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
    (named? v) (-name v)
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

(defn try-get-key [x]
  ;; try catch to avoid ClojureScript peculiarity with
  ;; sorted-maps with keys that are numbers
  (try (get x :key)
       (catch :default e)))

(defn get-key [x]
  (when (map? x)
    (try-get-key x)))

(defn convert-prop-value [x]
  (cond
    (js-val? x) x
    (named? x) (-name x)
    (map? x) (reduce-kv kv-conv #js {} x)
    (coll? x) (clj->js x)
    (ifn? x) #(apply x %&)
    :else (clj->js x)))

(defn convert-prop-value-shallow [x]
  (if (map? x)
    (reduce-kv kv-conv-shallow #js {} x)
    x))

(defn convert-custom-prop-value [x]
  (cond
    (js-val? x) x
    (named? x) (-name x)
    (map? x) (reduce-kv custom-kv-conv #js {} x)
    (coll? x) (clj->js x)
    (ifn? x) #(apply x %&)
    :else (clj->js x)))

(defn ^string class-names
  ([])
  ([class]
   (cond
     (coll? class)
     (let [^js/Array classes (reduce (fn [^js/Array a c]
                                       (when ^boolean c
                                         (->> (if (named? c) (-name c) c)
                                              (.push a)))
                                       a)
                                     #js []
                                     class)]
       (when (pos? (.-length classes))
         (.join classes " ")))

     (named? class) (-name class)
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
        classes (aget id-class 2)
        classes (when ^boolean classes
                  (array-seq classes))]
    (cond-> props
            ;; Only use ID from tag keyword if no :id in props already
            (and (some? id) (nil? (get props :id)))
            (assoc :id id)

            ;; Merge classes
            (not (nil? classes))
            (assoc :class (class-names classes (get props :class))))))

(defn convert-props [props id-class ^boolean shallow?]
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

(def re-tag #"[#.]?[^#.]+")

(defn parse-tag [tag]
  (loop [matches (re-seq re-tag tag)
         tag "div"
         id nil
         ^js/Array classes #js []]
    (let [val (first matches)
          nval (next matches)]
      (if ^boolean val
        (if (= (aget val 0) "#")
          (recur nval tag (.slice val 1) classes)
          (if (= (aget val 0) ".")
            (recur nval tag id (.concat classes #js [(.slice val 1)]))
            (recur nval val id classes)))
        #js [tag id classes (str/includes? tag "-")]))))

(defn cached-parse [x]
  (if-some [s (aget tag-name-cache x)]
    s
    (let [v (parse-tag x)]
      (gobj/set tag-name-cache x v)
      v)))

(defn key-from-vec [v]
  (if-some [k (get-key (-meta v))]
    k
    (get-key (-nth v 1 nil))))

(defn native-element [parsed ^not-native argv first-el]
  (let [component (aget parsed 0)
        props (-nth argv first-el nil)
        props? (or (nil? props) (map? props))
        props (if props?
                (reduce (fn [p f] (f p)) props @transform-fns)
                props)
        js-props (or ^boolean (convert-props (when props? props) parsed false)
                     #js {})
        first-child (+ first-el (if props? 1 0))]
    (when-some [key (get-key (-meta argv))]
      (gobj/set js-props "key" key))
    (when-some [-ref (unwrap-ref (get props :ref))]
      (gobj/set js-props "ref" -ref))
    (when-some [-ref (unwrap-ref (get (-meta argv) :ref))]
      (gobj/set js-props "ref" -ref))
    (make-element argv component js-props first-child)))

(defn fragment-element [^not-native argv]
  (let [props (-nth argv 1 nil)
        props? (or (nil? props) (map? props))
        js-props (or ^boolean (convert-prop-value (when props? props))
                     #js {})
        first-child (+ 1 (if props? 1 0))]
    (when-some [key (key-from-vec argv)]
      (gobj/set js-props "key" key))
    (make-element argv react/Fragment js-props first-child)))

(defn suspense-element [^not-native argv]
  (let [props (-nth argv 1 nil)
        props? (or (nil? props) (map? props))
        [fallback props] (if props?
                           [(as-element (get props :fallback))
                            (dissoc props :fallback)]
                           [nil props])
        js-props (or ^boolean (convert-prop-value (when props? props))
                     #js {})
        first-child (+ 1 (if props? 1 0))]
    (when ^boolean fallback
      (gobj/set js-props "fallback" fallback))
    (when-some [key (key-from-vec argv)]
      (gobj/set js-props "key" key))
    (make-element argv react/Suspense js-props first-child)))

(defn portal-element [^not-native argv]
  (.warn js/console "React portal Hiccup syntax :-> is deprecated, use uix.dom.alpha/create-portal instead")
  (let [child (-nth argv 1 nil)
        target (-nth argv 2 nil)
        node (if (or (string? target) (keyword? target))
               (.querySelector js/document (name target))
               target)]
    (js/ReactDOM.createPortal (as-element child) node)))

(defn interop-element [^not-native argv]
  (let [tag (-nth argv 1 nil)
        parsed #js [tag nil nil]
        first-el 2
        props (-nth argv first-el nil)
        props? (or (nil? props) (map? props))
        props (if props?
                (reduce (fn [p f] (f p)) props @transform-fns)
                props)
        js-props (or ^boolean (convert-props (when props? props) parsed true)
                     #js {})
        first-child (+ first-el (if props? 1 0))]
    (when-some [key (get-key (-meta argv))]
      (gobj/set js-props "key" key))
    (when-some [-ref (unwrap-ref (get props :ref))]
      (gobj/set js-props "ref" -ref))
    (when-some [-ref (unwrap-ref (get (-meta argv) :ref))]
      (gobj/set js-props "ref" -ref))
    (make-element argv tag js-props first-child)))

(defn cached-react-fn [f]
  (.-cljsReact f))

(defn cache-react-fn [f rf]
  (set! (.-cljsReact f) rf))

(defn symbol-for [s]
  (js-invoke js/Symbol "for" s))

(def lazy-sym (symbol-for "react.lazy"))
(def memo-sym (symbol-for "react.memo"))

(defn lazy? [t]
  (identical? lazy-sym (aget t "$$typeof")))

(defn memo? [t]
  (identical? memo-sym (aget t "$$typeof")))

(defn react-type? [t]
  (or (lazy? t) (memo? t)))

(def fmt-dash-regex (js/RegExp. "_" "g"))
(def fmt-qmark-regex (js/RegExp. "_QMARK_" "g"))
(def fmt-bang-regex (js/RegExp. "_BANG_" "g"))
(def fmt-star-regex (js/RegExp. "_STAR_" "g"))

(defn ^string demunge-name [^string s]
  (-> s
      (.replace fmt-qmark-regex "?")
      (.replace fmt-bang-regex "!")
      (.replace fmt-star-regex "*")
      (.replace fmt-dash-regex "-")))

(defn format-display-name [^string s]
  (let [^js/Array parts (.split s #"\$")
        last-idx (dec ^number (.-length parts))
        ^string name-part (aget parts last-idx)]
    (if (== 1 (.-length parts))
      (demunge-name name-part)
      (-> ^js/Array (.slice parts 0 last-idx)
          ^string (.join ".")
          (str "/" name-part)
          demunge-name))))

(defn with-name [^js f ^js rf]
  (when (string? (.-name f))
    (set! (.-displayName rf) (format-display-name (.-name f)))))

(defn fn-to-react-fn [^js f]
  (if (react-type? f)
    f
    (let [rf #(let [argv ^not-native (.-argv %)
                    tag (-nth argv 0)
                    args (subvec argv 1)]
                (as-element (apply tag args)))]
      (when ^boolean goog.DEBUG
        (with-name f rf))
      (cache-react-fn f rf)
      rf)))

(defn as-lazy-component [f]
  (if-some [cached-fn (cached-react-fn f)]
    cached-fn
    (let [rf #(as-element (apply f (rest (.-argv %))))]
      (when ^boolean goog.DEBUG
        (with-name f rf))
      (cache-react-fn f rf)
      rf)))

(defn as-component [tag]
  (if-some [cached-fn (cached-react-fn tag)]
    cached-fn
    (fn-to-react-fn tag)))

(defn as-react [f]
  #(as-element (f (bean/bean %))))

(defn component-element [tag v]
  (let [js-props #js {}
        el (as-component tag)]
    (set! (.-argv js-props) v)
    (when-some [key (key-from-vec v)]
      (gobj/set js-props "key" key))
    (when-some [-ref (unwrap-ref (get (-meta v) :ref))]
      (gobj/set js-props "ref" -ref))
    (react/createElement el js-props)))

(defn vec-to-elem [^not-native v]
  (let [tag (-nth v 0 nil)]
    (cond
      (keyword-identical? :<> tag) (fragment-element v)
      (keyword-identical? :# tag) (suspense-element v)
      (keyword-identical? :-> tag) (portal-element v)
      (keyword-identical? :> tag) (interop-element v)
      (hiccup-tag? tag) (-> (cached-parse (name tag))
                            (native-element v 1))
      :else (component-element tag v))))

(defn as-element [x]
  (cond
    (js-val? x) x
    (vector? x) (vec-to-elem x)
    (seq? x) (expand-seq x)
    (named? x) (-name x)
    (satisfies? IPrintWithWriter x) (pr-str x)
    :else x))

(defn expand-seq [s]
  (reduce (fn [ret e]
            (.push ret (as-element e))
            ret)
          #js []
          s))

(defn make-element [^not-native argv component js-props first-child]
  (case (- (-count argv) first-child)
    0 (react/createElement component js-props)
    1 (->> (as-element (-nth argv first-child nil))
           (react/createElement component js-props))
    (.apply react/createElement nil
            (reduce-kv (fn [^js/Array a k v]
                         (when (>= k first-child)
                           (.push a (as-element v)))
                         a)
                       #js [component js-props]
                       argv))))
