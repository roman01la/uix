(ns uix.compiler.attributes
  (:require [clojure.string :as str]))

(def re-tag
  "HyperScript tag pattern :div :div#id.class etc."
  #"([^\.#]*)(?:#([^\.#]+))?(?:\.([^#]+))?")

(defn parse-tag
  "Takes HyperScript tag (:div#id.class) and returns parsed tag, id and class fields,
  and boolean indicating if tag name is a custom element (a custom DOM element that has hyphen in the name)"
  [tag]
  (let [tag-str (name tag)]
    (when (and (not (re-matches re-tag tag-str))
               (re-find #"[#\.]" tag-str))
      ;; Throwing NPE here because shadow catches those to bring up error view in a browser
      (throw (NullPointerException. (str "Invalid tag name (found: " tag-str "). Make sure that the name matches the format and ordering is correct `:tag#id.class`"))))
    (let [[tag id class-name] (next (re-matches re-tag tag-str))
          tag (if (= "" tag) "div" tag)
          class-name (when-not (nil? class-name)
                       (str/replace class-name #"\." " "))]
      (list tag id class-name (some? (re-find #"-" tag))))))

(defn set-id-class
  "Takes attributes map and parsed tag triplet,
  and returns attributes merged with class names and id"
  [props [_ id class]]
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
                      :else class)))))

(defn camel-case-dom
  "Turns kebab-case keyword into camel-case keyword,
  kebab-cased DOM attributes aria-* and data-* are not converted"
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
    (reduce-kv #(assoc %1 (camel-case-dom %2) %3) {} m)
    m))

(defn convert-value
  ([v]
   (if (or (symbol? v) (list? v))
     `(keyword->string ~v)
     v))
  ([k v]
   (cond
     (= :children v) v
     (str/starts-with? (name k) "on-") v
     (symbol? v) `(keyword->string ~v)
     :else v)))

(defn convert-values [m]
  (if (map? m)
    (reduce-kv #(assoc %1 (camel-case-dom %2) (convert-value %3)) {} m)
    m))

(defmulti compile-config-kv (fn [name value] name))

(defmethod compile-config-kv :style [name value]
  (convert-values (camel-case-keys value)))

(defmethod compile-config-kv :default [name value]
  (convert-value name value))

(defn compile-attrs
  "Takes map of attributes and returns same map with keys
  translated from Clojure to React naming conventions

  :class -> :className
  :margin-right -> :marginRight
  :on-click -> :onClick"
  ([attrs]
   (compile-attrs attrs nil))
  ([attrs {:keys [custom-element?]}]
   (if (map? attrs)
     (reduce-kv
      #(assoc %1
              (if custom-element?
                (camel-case-dom %2)
                (case %2
                  :class :className
                  :for :htmlFor
                  :charset :charSet
                  :class-id :classID
                  :item-id :itemID
                  (camel-case-dom %2)))
              (compile-config-kv %2 %3))
      {}
      attrs)
     attrs)))
