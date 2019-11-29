(ns uix.compiler.aot
  "Runtime helpers for Hiccup compiled into React.js"
  (:require [react :as react]
            [uix.compiler.alpha :as r]))

(def >el react/createElement)
(def suspense react/Suspense)
(def fragment react/Fragment)

(defn fn-to-react-fn [f]
  (let [rf (fn -rf [props]
             (let [ret (apply f (.-argv props))]
               (if (vector? ret)
                 (r/as-element ret)
                 ret)))
        rf-memo (react/memo rf r/*default-compare-args*)]
    (when (and ^boolean goog.DEBUG (exists? js/__REACT_DEVTOOLS_GLOBAL_HOOK__))
      (set! (.-uixf rf) f))
    (when ^boolean goog.DEBUG
      (r/with-name f rf rf-memo))
    (r/cache-react-fn f rf-memo)
    rf-memo))

(defn as-component [tag]
  (if-some [cached-fn (r/cached-react-fn tag)]
    cached-fn
    (fn-to-react-fn tag)))

(defn component-element [tag attrs args]
  (let [js-props (or ^boolean attrs #js {})
        el (as-component tag)]
    (set! (.-argv js-props) args)
    (>el el js-props)))
