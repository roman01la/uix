(ns uix.compiler.attributes
  (:require [clojure.string :as str]))

(def re-tag
  "Hiccup tag pattern :div :.class#id etc."
  #"([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?")

(defn parse-tag
  "Takes Hiccup tag (:div.class#id) and returns parsed tag, id and class fields"
  [hiccup-tag]
  (let [[tag id class-name] (->> hiccup-tag name (re-matches re-tag) next)
        class-name (when-not (nil? class-name)
                     (str/replace class-name #"\." " "))]
    (list tag id class-name (some? (re-find #"-" tag)))))

(defn set-id-class
  "Takes attributes map and parsed tag, and returns attributes merged with class names and id"
  [props [_ id class]]
  (if (or (map? props) (nil? props))
    (cond-> props
            ;; Only use ID from tag keyword if no :id in props already
            (and (some? id) (nil? (get props :id)))
            (assoc :id id)

            ;; Merge classes
            class
            (assoc :class `(str ~class " " ~(get props :class))))
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

(defmulti compile-config-kv (fn [name value] name))

(defmethod compile-config-kv :style [name value]
  (camel-case-keys value))

(defmethod compile-config-kv :default [name value]
  value)

(defn compile-attrs
  "Takes map of attributes and returns same map with keys translated from Hiccup to React naming conventions"
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
