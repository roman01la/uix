(ns uix.compiler.aot
  "Runtime helpers for Hiccup compiled into React.js"
  (:require [react :as react]
            [uix.compiler.alpha :as r]
            [uix.compiler.attributes]))

(defn >el [tag attrs-children children]
  (let [args (-> #js [tag] (.concat attrs-children) (.concat children))]
    (.apply react/createElement nil args)))

(def suspense react/Suspense)
(def fragment react/Fragment)
