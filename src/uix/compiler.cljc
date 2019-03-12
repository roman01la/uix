(ns uix.compiler
  #?(:cljs (:require [react :as r])))

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
       (clj->js attr)
       (map compile-hiccup-ast children))))

(defmethod compile-hiccup-ast :fragment [[_ {:keys [attr children]}]]
  #?(:cljs
     (apply
       r/createElement
       r/Fragment
       (clj->js attr)
       (map compile-hiccup-ast children))))

(defmethod compile-hiccup-ast :component [[_ {:keys [type args] :as c}]]
  #?(:cljs
     (if-let [key (-> (meta c) :key)]
       (r/createElement type #js {:uixargs args :key key})
       (r/createElement type #js {:uixargs args}))))
