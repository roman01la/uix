(ns uix.core
  "Public API"
  (:require [uix.compiler.aot]))

(defmacro defui
  "Compiles UIx component into React component at compile-time."
  [sym args & body]
  `(do
     (defn ~sym [props#]
       (let [~args (cljs.core/array (glue-args props#))]
         ~@body))
     (with-name ~sym)))
