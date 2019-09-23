(ns uix.core-test
  (:require [clojure.test :refer :all]
            [uix.core.alpha :as core]
            [uix.compiler.alpha :as compiler]))

(deftest test-strict-mode
  (is (= 1 (core/strict-mode 1))))

(deftest test-create-ref
  (is (= 1 @(core/create-ref 1))))

(deftest test-memoize
  (is (= identity (core/memoize identity))))

(deftest test-as-element
  (is (= 1 (core/as-element 1))))

(deftest test-as-react
  (is (= identity (core/as-react identity))))

(core/require-lazy '[clojure.string :refer [blank?]])

(deftest test-require-lazy
  (testing "Should refer a var from ns"
    (is (= blank? clojure.string/blank?)))

  (testing "Should fail to alias ns"
    (try
      (macroexpand-1 '(core/require-lazy '[clojure.string :as str]))
      (catch Exception e
        (is (some? e))))))

(deftest test-defui
  (core/defui hello [x] x)
  (is (fn? hello))
  (is (= 1 (hello 1))))

(deftest test-use-let
  (core/use-let [x 1
                 y 2]
    (is (= x 1))
    (is (= y 2))))

(deftest test-create-error-boundary

  (testing "No error in error boundary"
    (let [error->state-called? (atom false)
          handle-catch-called? (atom false)
          err-b (core/create-error-boundary
                  {:error->state #(reset! error->state-called? true)
                   :handle-catch #(reset! handle-catch-called? true)}
                  (fn [err args]
                    (is (= nil err))
                    (is (= [1] args))))]

      (compiler/render-to-static-markup [err-b 1])
      (is (= false @error->state-called?))
      (is (= false @handle-catch-called?))))

  (testing "Error in error boundary"
    (let [handle-catch (atom nil)
          err-b (core/create-error-boundary
                  {:error->state ex-message
                   :handle-catch (fn [err info] (reset! handle-catch err))}
                  (fn [cause args]
                    (is (= [1] args))
                    (if (nil? cause)
                      (throw (Exception. "Hello!"))
                      (is (= "Hello!" cause)))))]

      (compiler/render-to-static-markup [err-b 1])
      (is (some? @handle-catch)))))
