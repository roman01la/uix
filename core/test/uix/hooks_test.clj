(ns uix.hooks-test
  (:require [clojure.test :refer :all]
            [uix.core.alpha :as core]
            [uix.hooks.alpha :as hooks]))

(deftest test-state
  (is (= 1 @(core/state 1))))

(deftest test-cursor-in
  (is (= 1 @(core/cursor-in (core/state {:x 1}) [:x]))))

(deftest test-ref
  (is (= nil @(core/ref)))
  (is (= 1 @(core/ref 1))))

(deftest test-with-deps-check
  (hooks/with-deps-check [prev-deps]
    (is (= [1] @prev-deps))
    [1]))

(deftest test-effect!
  (is (= nil (core/effect! identity))))

(deftest test-with-effect
  (is (= nil (core/with-effect [] (1)))))

(deftest test-layout-effect!
  (is (= nil (core/layout-effect! identity))))

(deftest test-with-layout-effect
  (is (= nil (core/with-layout-effect [] (1)))))

(deftest test-callback
  (is (= identity (core/callback identity))))

(deftest test-memo
  (is (= 1 (core/memo (constantly 1)))))

(deftest test-reducer
  (let [[value dispatch] (core/reducer identity 1 inc)]
    (is (= 2 value))))
