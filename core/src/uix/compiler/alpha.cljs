(ns uix.compiler.alpha
  "UTL and UIx components interpreter. Based on Reagent."
  (:require [react :as react]
            [uix.hooks.alpha :as hooks]
            [cljs-bean.core :as bean]
            [uix.compiler.debug :as debug]))

(def ^:dynamic *default-compare-args* #(= (.-argv %1) (.-argv %2)))

(defn js-val? [x]
  (not (identical? "object" (goog/typeOf x))))

(defn symbol-for [s]
  (js* "Symbol.for(~{})" s))

(defn as-lazy-component [f]
  (debug/with-name f))

(defn as-react [f]
  #(f (bean/bean %)))

(defn component-element [component-type ^js props-children children]
  (let [props (aget props-children 0)
        js-props (if-some [key (:key props)]
                   #js {:key key :argv (dissoc props :key)}
                   #js {:argv props})
        args (if (= 2 (.-length props-children))
               #js [component-type js-props (aget props-children 1)]
               #js [component-type js-props])]
    (.apply react/createElement nil (.concat args children))))
