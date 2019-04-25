(ns uix.compiler.react
  (:require [react :as react]
            [react-dom :as rdom]
            [uix.compiler.alpha :as r]))

(def >el react/createElement)
(def suspense react/Suspense)
(def fragment react/React.Fragment)
(def >portal rdom/createPortal)

(defn fn-to-react-fn [f]
  (if (when f (.hasOwnProperty f "$$typeof"))
    f
    (let [rf #(let [args (.-argv %)]
                (.apply f nil (r/array-from args)))
          rf-memo (react/memo rf #(= (.-argv %1) (.-argv %2)))]
      (r/with-name f rf rf-memo)
      (r/cache-react-fn f rf-memo)
      rf-memo)))

(defn as-component [tag]
  (if-some [cached-fn (r/cached-react-fn tag)]
    cached-fn
    (fn-to-react-fn tag)))

(defn component-element [tag attrs args]
  (let [js-props attrs
        el (as-component tag)]
    (set! (.-argv js-props) args)
    (>el el js-props)))
