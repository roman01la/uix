(ns uix.test-utils
  (:require [uix.compiler.alpha :as uixc]
            ["react-dom/server" :as rserver]
            [goog.object :as gobj]
            [clojure.test :refer [is]]))

(defn as-string [comp]
  (-> (uixc/as-element comp)
      rserver/renderToStaticMarkup))

(defn js-equal? [a b]
  (gobj/equals a b))

(defn symbol-for [s]
  (js-invoke js/Symbol "for" s))

(defn with-error [f]
  (let [msgs (atom [])
        cc js/console.error]
    (set! js/console.error #(swap! msgs conj %))
    (f)
    (set! js/console.error cc)
    (is (empty? @msgs))))
