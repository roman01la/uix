(ns uix.hooks-test
  (:require [clojure.test :refer :all]
            [uix.hooks.alpha :as hooks]))

(deftest test-state
  (is (= 1 @(hooks/state 1))))

(deftest test-ref
  (is (= nil @(hooks/ref)))
  (is (= 1 @(hooks/ref 1))))

(deftest test-with-deps-check
  (hooks/with-deps-check [prev-deps]
    (is (= [1] @prev-deps))
    [1]))

(deftest test-effect!
  (is (= nil (hooks/effect! identity))))

(deftest test-with-effect
  (is (= nil (hooks/with-effect [] (1)))))

(deftest test-layout-effect!
  (is (= nil (hooks/layout-effect! identity))))

(deftest test-with-layout-effect
  (is (= nil (hooks/with-layout-effect [] (1)))))

(deftest test-callback
  (is (= identity (hooks/callback identity))))

(deftest test-memo
  (is (= 1 (hooks/memo (constantly 1)))))
