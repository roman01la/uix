(ns uix.compiler.react
  "Runtime helpers for Hiccup compiled into React.js"
  (:require [react :as react]
            [uix.compiler.alpha :as r]))

(def >el react/createElement)
(def suspense react/Suspense)
(def fragment react/Fragment)

(defn fn-to-react-fn [f]
  (let [rf #(apply f (.-argv %))
        rf-memo (react/memo rf #(= (.-argv %1) (.-argv %2)))]
    (when ^boolean goog.DEBUG
      (r/with-name f rf rf-memo))
    (r/cache-react-fn f rf-memo)
    rf-memo))

(defn as-component [tag]
  (if-some [cached-fn (r/cached-react-fn tag)]
    cached-fn
    (fn-to-react-fn tag)))

(defn component-element [tag attrs args]
  (let [js-props (or attrs #js {})
        el (as-component tag)]
    (set! (.-argv js-props) args)
    (>el el js-props)))
