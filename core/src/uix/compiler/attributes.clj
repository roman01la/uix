(ns uix.compiler.attributes
  (:require [clojure.string :as str]))

(def re-tag
  "HyperScript tag pattern :div#id.class etc."
  #"([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?")

;; https://github.com/tonsky/rum/blob/gh-pages/src/daiquiri/normalize.cljc#L71
(defn strip-css
  "Strip the # and . characters from the beginning of `s`."
  [s]
  (when s
    (str/replace s #"^[.#]" "")))

;; https://github.com/tonsky/rum/blob/gh-pages/src/daiquiri/normalize.cljc#L77
(defn parse-tag
  "Match `tag` as a CSS tag and return a vector of tag name, CSS id and
  CSS classes."
  [tag]
  (let [matches (re-seq #"[#.]?[^#.]+" (name tag))
        [tag-name names]
        (cond (empty? matches)
              (throw (ex-info (str "Invalid tag name (found: " tag ").") {:tag tag}))

              ;; shorthand for div
              (contains? #{\# \.} (ffirst matches))
              ["div" matches]

              :default
              [(first matches) (rest matches)])
        class (keep #(when (= \. (first %)) (strip-css %)) names)
        id (some #(when (= \# (first %1)) %1) names)]
    [tag-name
     (when id (strip-css id))
     (when (seq class) (str/join " " class))
     (some? (re-find #"-" tag-name))]))

(defn set-id-class
  "Takes attributes map and parsed tag, and returns attributes merged with class names and id"
  [props [_ id class]]
  (if (or (map? props) (nil? props))
    (let [props-class (get props :class)]
      (cond-> props
              ;; Only use ID from tag keyword if no :id in props already
              (and (some? id) (nil? (get props :id)))
              (assoc :id id)

              ;; Merge classes
              (or class props-class)
              (assoc :class (cond
                              (vector? props-class) `(class-names ~class ~@props-class)
                              props-class `(class-names ~class ~props-class)
                              :else class))))
    props))

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

(defn convert-value [v]
  (if (symbol? v)
    `(keyword->string ~v)
    v))

(defn convert-values [m]
  (if (map? m)
    (reduce-kv #(assoc %1 (camel-case %2) (convert-value %3)) {} m)
    m))

(defmulti compile-config-kv (fn [name value] name))

(defmethod compile-config-kv :style [name value]
  (convert-values (camel-case-keys value)))

(defmethod compile-config-kv :default [name value]
  (convert-value value))

(defn compile-attrs
  "Takes map of attributes and returns same map with keys translated from Clojure to React naming conventions"
  ([attrs]
   (compile-attrs attrs nil))
  ([attrs {:keys [custom-element?]}]
   (if (map? attrs)
     (reduce-kv
       #(assoc %1
           (if custom-element?
             (camel-case %2)
             (case %2
               :class :className
               :for :htmlFor
               (camel-case %2)))
           (compile-config-kv %2 %3))
       {}
       attrs)
     attrs)))
