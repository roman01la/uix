(ns uix.hooks-test
  (:require [clojure.test :refer :all]
            [uix.core]))

(deftest test-use-effect
  (is (nil? (macroexpand-1 '(uix.core/use-effect identity)))))

(deftest test-use-layout-effect
  (is (nil? (macroexpand-1 '(uix.core/use-layout-effect identity)))))

(deftest test-use-imperative-handle
  (is (nil? (macroexpand-1 '(uix.core/use-imperative-handle nil identity)))))

(deftest test-use-memo
  (is (== 1 (uix.core/use-memo (constantly 1) []))))

(deftest test-use-callback
  (is (identical? identity (uix.core/use-callback identity []))))

(deftest test-use-state
  (let [[state set-state] (uix.core/use-state 0)]
    (is (zero? state))
    (is (thrown-with-msg? Error #"Can\'t call set-state when rendering on JVM"
                          (set-state inc)))))

(deftest test-use-reducer
  (let [[state dispatch] (uix.core/use-reducer identity 0)]
    (is (zero? state))
    (is (thrown-with-msg? Error #"Can\'t call set-state when rendering on JVM"
                          (dispatch :inc)))))

(deftest test-use-ref
  (let [ref (uix.core/use-ref 1)]
    (is (== 1 @ref))))

(deftest test-use-context
  (is (== 1 (uix.core/use-context 1))))
