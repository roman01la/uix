(ns uix.compiler.alpha
  "Hiccup and UIx components interpreter. Based on Reagent."
  (:require [react :as react]
            [uix.hooks.alpha :as hooks]
            [cljs-bean.core :as bean]
            [uix.compiler.debug :as debug]))

(def ^:dynamic *default-compare-args* #(= (.-argv %1) (.-argv %2)))

(defn unwrap-ref [-ref]
  (if (implements? hooks/IRef -ref)
    (hooks/unwrap ^not-native -ref)
    -ref))

(defn js-val? [x]
  (not (identical? "object" (goog/typeOf x))))

(defn symbol-for [s]
  (js* "Symbol.for(~{})" s))

(defn as-lazy-component [f]
  (debug/with-name f))

(defn as-react [f]
  #(f (bean/bean %)))

(defn component-element [component-type props children]
  (let [js-props (if-some [key (:key props)]
                   #js {:key key :argv (dissoc props :key)}
                   #js {:argv props})]
    (.apply react/createElement nil (.concat #js [(debug/with-name component-type) js-props] children))))
