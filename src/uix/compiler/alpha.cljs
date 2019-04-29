(ns uix.compiler.alpha
  (:require [react :as react]
            [react-dom :as rdom]
            [goog.object :as gobj]
            [clojure.string :as string]
            [uix.hooks.alpha :as hooks]))

(defn array-from [coll]
  (if (seq coll)
    (js/Array.from coll)
    coll))

(defn unwrap-ref [-ref]
  (if (satisfies? hooks/IRef -ref)
    (hooks/unwrap -ref)
    -ref))

(defn ^boolean js-val? [x]
  (not (identical? "object" (goog/typeOf x))))

(defn ^boolean named? [x]
  (or (keyword? x)
      (symbol? x)))

(defn ^boolean hiccup-tag? [x]
  (or (named? x)
      (string? x)))

(declare make-element)
(declare as-element)
(declare expand-seq)
(declare convert-prop-value)

(def re-tag #"([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?")

(def prop-name-cache #js {:class   "className"
                          :for     "htmlFor"
                          :charset "charSet"})

(def tag-name-cache #js {})

(defn cache-get [o k]
  (when ^boolean (.hasOwnProperty o k)
    (gobj/get o k)))

(def dont-camel-case #{"aria" "data"})

(defn ^string capitalize [^string s]
  (if (< (count s) 2)
    (string/upper-case s)
    (str (string/upper-case (subs s 0 1)) (subs s 1))))

(defn ^string dash-to-camel [dashed]
  (if (string? dashed)
    dashed
    (let [name-str (name dashed)
          [^string start & parts] (.split name-str #"-")]
      (if (contains? dont-camel-case start)
        name-str
        (str start (string/join (map capitalize parts)))))))

(defn cached-prop-name [k]
  (if (named? k)
    (if-some [k' (cache-get prop-name-cache (name k))]
      k'
      (let [v (dash-to-camel k)]
        (gobj/set prop-name-cache (name k))
        v))
    k))

(defn kv-conv [o k v]
  (if (keyword-identical? k :ref)
    (gobj/set o (cached-prop-name k) (unwrap-ref v))
    (gobj/set o (cached-prop-name k) (convert-prop-value v)))
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
    (named? x) (name x)
    (map? x) (reduce-kv kv-conv #js {} x)
    (coll? x) (clj->js x)
    (ifn? x) #(.apply x nil (array-from %&))
    :else (clj->js x)))

(defn ^string class-names
  ([])
  ([class]
   (if (coll? class)
     (let [classes (keep
                     #(when %
                        (if (named? %) (name %) %))
                     class)]
       (if (seq classes)
         (string/join " " classes)))
     (if (named? class)
       (name class)
       class)))
  ([a b]
   (if a
     (if b
       (str (class-names a) " " (class-names b))
       (class-names a))
     (class-names b)))
  ([a b & rst]
   (reduce class-names
           (class-names a b)
           rst)))

(defn set-id-class
  "Takes the id and class from tag keyword, and adds them to the
  other props. Parsed tag is JS object with :id and :class properties."
  [props id-class]
  (let [id (second id-class)
        class (last id-class)]
    (cond-> props
            ;; Only use ID from tag keyword if no :id in props already
            (and (some? id) (nil? (get props :id)))
            (assoc :id id)

            ;; Merge classes
            class
            (assoc :class (class-names class (get props :class))))))

(defn convert-props [props id-class]
  (let [class (get props :class)
        props (-> props
                  (cond-> class (assoc :class (class-names class)))
                  (set-id-class id-class))]
    (convert-prop-value props)))

(defn parse-tag [hiccup-tag]
  (let [[tag id class-name] (->> hiccup-tag name (re-matches re-tag) next)
        class-name (when-not (nil? class-name)
                     (string/replace class-name #"\." " "))]
    (list tag id class-name)))

(defn cached-parse [x]
  (if-some [s (cache-get tag-name-cache x)]
    s
    (let [v (parse-tag x)]
      (gobj/set tag-name-cache x v)
      v)))

(defn key-from-vec [v]
  (if-some [k (get-key (meta v))]
    k
    (get-key (nth v 1 nil))))

(defn native-element [parsed argv first-el]
  (let [component (first parsed)
        props (nth argv first-el nil)
        props? (or (nil? props) (map? props))
        js-props (or (convert-props (when props? props) parsed)
                     #js {})
        first-child (+ first-el (if props? 1 0))]
    (when-some [key (get-key (meta argv))]
      (set! (.-key js-props) key))
    (when-some [-ref (unwrap-ref (:ref (meta argv)))]
      (set! (.-ref js-props) -ref))
    (make-element argv component js-props first-child)))

(defn fragment-element [argv]
  (let [props (nth argv 1 nil)
        props? (or (nil? props) (map? props))
        js-props (or (convert-prop-value (when props? props))
                     #js {})
        first-child (+ 1 (if props? 1 0))]
    (when-some [key (key-from-vec argv)]
      (set! (.-key js-props) key))
    (make-element argv react/Fragment js-props first-child)))

(defn suspense-element [argv]
  (let [props (nth argv 1 nil)
        props? (or (nil? props) (map? props))
        [fallback props] (if props?
                           [(as-element (get props :fallback))
                            (dissoc props :fallback)]
                           [nil props])
        js-props (or (convert-prop-value (when props? props))
                     #js {})
        first-child (+ 1 (if props? 1 0))]
    (when fallback
      (set! (.-fallback js-props) fallback))
    (when-some [key (key-from-vec argv)]
      (set! (.-key js-props) key))
    (make-element argv react/Suspense js-props first-child)))

(defn portal-element [argv]
  (let [child (nth argv 1 nil)
        node (nth argv 2 nil)]
    (rdom/createPortal (as-element child) node)))

(defn interop-element [argv]
  (let [tag (nth argv 1 nil)
        parsed (list tag nil nil)]
    (native-element parsed argv 2)))

(defn cached-react-fn [f]
  (.-cljsReact f))

(defn cache-react-fn [f rf]
  (set! (.-cljsReact f) rf))

(defn ^string format-display-name [^string s]
  (let [parts (.split s #"\$")
        ns-parts (.slice parts 0 (dec (count parts)))
        name-part (.slice parts (dec (count parts)))]
    (str (.join ns-parts ".") "/" name-part)))

(defn with-name [f rf rf-memo]
  (when (string? (.-name f))
    (let [display-name (format-display-name (.-name f))]
      (set! (.-displayName rf) display-name)
      (set! (.-displayName rf-memo) (str "memo(" display-name ")")))))

(defn fn-to-react-fn [f]
  (if (when f (.hasOwnProperty f "$$typeof"))
    f
    (let [rf #(let [[tag & args] (.-argv %)]
                (as-element (.apply tag nil (array-from args))))
          rf-memo (react/memo rf #(= (.-argv %1) (.-argv %2)))]
      (with-name f rf rf-memo)
      (cache-react-fn f rf-memo)
      rf-memo)))

(defn as-lazy-component [f]
  (if-some [cached-fn (cached-react-fn f)]
    cached-fn
    (let [rf #(let [[_ & args] (.-argv %)]
                (as-element (.apply f nil (array-from args))))
          rf-memo (react/memo rf #(= (.-argv %1) (.-argv %2)))]
      (with-name f rf rf-memo)
      (cache-react-fn f rf-memo)
      rf-memo)))

(defn as-component [tag]
  (if-some [cached-fn (cached-react-fn tag)]
    cached-fn
    (fn-to-react-fn tag)))

(defn component-element [tag v]
  (let [js-props #js {}
        el (as-component tag)]
    (set! (.-argv js-props) v)
    (when-some [key (key-from-vec v)]
      (set! (.-key js-props) key))
    (when-some [-ref (unwrap-ref (:ref (meta v)))]
      (set! (.-ref js-props) -ref))
    (react/createElement el js-props)))

(defn vec-to-elem [v]
  (let [tag (nth v 0 nil)]
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
    (named? x) (name x)
    (satisfies? IPrintWithWriter x) (pr-str x)
    :else x))

(defn expand-seq [s]
  (into-array (map as-element s)))

(defn make-element [argv component js-props first-child]
  (case (- (count argv) first-child)
    0 (react/createElement component js-props)

    1 (react/createElement component js-props
                           (as-element (nth argv first-child nil)))

    (.apply react/createElement nil
            (reduce-kv (fn [a k v]
                         (when (>= k first-child)
                           (.push a (as-element v)))
                         a)
                       #js [component js-props]
                       argv))))
