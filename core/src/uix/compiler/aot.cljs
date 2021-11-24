(ns uix.compiler.aot
  "Runtime helpers for UTL compiled into React.js"
  (:require [react :as react]
            [uix.compiler.alpha :as r]
            [uix.compiler.attributes]
            [uix.lib :refer [doseq-loop]]))

(defn- validate-children [children deep?]
  (doseq-loop [child children]
    (cond
      (and (not deep?) (sequential? child)) (validate-children child true)
      (vector? child) (throw (js/Error. (str "Hiccup is not valid as UIx child (found: " child "). If you meant to render an element, tag it with #el, i.e. #el " child))))))

(defn >el [tag attrs-children children]
  (let [args (-> #js [tag] (.concat attrs-children) (.concat children))]
    (when ^boolean goog.DEBUG
      (validate-children (.slice args 2) false))
    (.apply react/createElement nil args)))

(def suspense react/Suspense)
(def fragment react/Fragment)
