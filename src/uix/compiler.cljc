(ns uix.compiler
  (:require [clojure.string :as str]
            #?(:cljs  [react :as r])
            #?(:cljs  [react-dom :as rdom])
            #?(:cljs [goog.object :as gobj])))

(defn unwrap-ref [-ref]
  #?(:cljs (.-rref -ref)
     :clj nil))

(defn kebab->camel [k]
  (let [s (name k)
        [prefix & words] (str/split s #"-")]
    (if (#{"data" "aria"} prefix)
      s
      (apply str prefix (map str/capitalize words)))))

(defn transform-attrs [m]
  #?(:cljs
     (reduce
       (fn [o [k v]]
         (cond
           (= k :style) (gobj/set o (kebab->camel k) (transform-attrs v))
           (satisfies? IDeref v) (gobj/set o "ref" (unwrap-ref v))
           :else (gobj/set o (kebab->camel k) v))
         o)
       #js {}
       m)))

(defmulti compile-hiccup-ast first)

(defmethod compile-hiccup-ast :number [[_ value]]
  value)

(defmethod compile-hiccup-ast :string [[_ value]]
  value)

(defmethod compile-hiccup-ast :hiccup/form [[_ value]]
  (compile-hiccup-ast value))

(defmethod compile-hiccup-ast :hiccup/seq [[_ value]]
  (map compile-hiccup-ast value))

(defmethod compile-hiccup-ast :element [[_ {:keys [type attr children]}]]
  #?(:cljs
     (apply
       r/createElement
       (name type)
       (transform-attrs attr)
       (map compile-hiccup-ast children))))

(defmethod compile-hiccup-ast :fragment [[_ {:keys [attr children]}]]
  #?(:cljs
     (apply
       r/createElement
       r/Fragment
       (transform-attrs attr)
       (map compile-hiccup-ast children))))

(defmethod compile-hiccup-ast :interop [[_ {:keys [type attr children]}]]
  #?(:cljs
     (apply
       r/createElement
       type
       (transform-attrs attr)
       (map compile-hiccup-ast children))))

(defmethod compile-hiccup-ast :portal [[_ {:keys [child node]}]]
  #?(:cljs
     (rdom/createPortal (compile-hiccup-ast child) node)))

(defmethod compile-hiccup-ast :component [[_ {:keys [type args] :as c}]]
  #?(:cljs
     (if-let [key (-> (meta c) :key)]
       (r/createElement type #js {:uixargs args :key key})
       (r/createElement type #js {:uixargs args}))))
