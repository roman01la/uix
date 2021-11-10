(ns uix.core
  "Public API"
  (:require [uix.compiler.aot]))

(defn- no-args-component [sym body]
  `(defn ~sym []
     ~@body))

(defn- with-args-component [sym args body]
  `(defn ~sym [props#]
     (let [~args (cljs.core/array (glue-args props#))]
       ~@body)))

(defmacro defui
  "Compiles UIx component into React component at compile-time."
  [sym args & body]
  `(do
     ~(if (empty? args)
        (no-args-component sym body)
        (with-args-component sym args body))
     (with-name ~sym)))
