(ns uix.compiler.attributes
  (:require [clojure.string :as str]
            [uix.compiler.js :as js]))

(defn join-classes-js
  "Emits runtime class string concatenation expression"
  [xs]
  (let [strs (->> (repeat (count xs) "~{}")
                  (interpose ",")
                  (apply str))]
    (->> xs
         (map js/to-js)
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
             :else (conj ret `(when ~v ~(js/to-js k)))))
         [])
       join-classes-js))

(defmethod compile-config-kv :class [name value]
  (cond
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
