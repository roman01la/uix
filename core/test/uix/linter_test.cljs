(ns uix.linter-test
  (:require [uix.core :refer [defui $]]))

(defui test-missing-deps [{:keys [x]}]
  (uix.core/use-effect (fn [] x) ^:lint-deps []))

(defui test-missing-deps-disabled [{:keys [z]}]
  (uix.core/use-effect (fn [] z) []))

(defui test-unnecessary-deps []
  (let [ref (uix.core/use-ref)
        [v set-v] (uix.core/use-state 0)]
    (uix.core/use-effect
     (fn []
       @ref
       (set-v (inc v)))
     [v ref set-v])))

(defui test-missing-deps-with-shadowing [{:keys [y]}]
  (uix.core/use-effect
   (fn []
     (let [y 1]
       y))
   ^:lint-deps []))

(defui test-fn-ref-passed-into-hook []
  (uix.core/use-effect identity))

(defui test-deps-js-array []
  (uix.core/use-effect (fn []) #js []))

(defui test-deps-something-else []
  (uix.core/use-effect (fn []) (list 1 2 3)))

(defui test-deps-includes-primitive-literals []
  (uix.core/use-effect (fn []) [:kw 1 "str" nil true]))

(defui test-unsafe-set-state []
  (let [[value set-value] (uix.core/use-state 0)]
    (uix.core/use-effect
     (fn []
       (set-value inc)))))

(defui test-hook-in-branch []
  (when true
    (uix.core/use-effect (fn []))))

(defui test-hook-in-loop []
  (for [x []]
    (uix.core/use-effect (fn []))))

(defui test-missing-key []
  (for [x []]
    ($ :div.test-missing-key {} x))
  (for [x []]
    ($ :div.test-missing-key ($ x))))
