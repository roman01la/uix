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

(deftest test-create-error-boundary

  (testing "No error in error boundary"
    (let [error->state-called? (atom false)
          handle-catch-called? (atom false)
          err-b (core/create-error-boundary
                  {:error->state #(reset! error->state-called? true)
                   :handle-catch #(reset! handle-catch-called? true)}
                  (fn [err args]
                    (is (= nil @err))
                    (is (= [1] args))))]

      (compiler/render-to-static-markup [err-b 1])
      (is (= false @error->state-called?))
      (is (= false @handle-catch-called?))))

  (testing "Error in error boundary"
    (let [handle-catch (atom nil)
          child (fn [] (throw (Exception. "Hello!")))
          err-b (core/create-error-boundary
                  {:error->state ex-message
                   :handle-catch (fn [err info]
                                   (println (ex-message err) info)
                                   (reset! handle-catch err))}
                  (fn [cause [x child]]
                    (is (= 1 x))
                    (if (nil? @cause)
                      child
                      (is (= "Hello!" @cause)))))]

      (compiler/render-to-static-markup [err-b 1 [child]])
      (is (some? @handle-catch)))))

(deftest test-ifn-component
  (defmulti multi-c (fn [t _] t))
  (defmethod multi-c :div [_ child]
    [:div child])
  (defmethod multi-c :span [_ child]
    [:span child])
  (is (= "<div>1</div>" (compiler/render-to-static-markup [multi-c :div 1])))
  (is (= "<span>1</span>" (compiler/render-to-static-markup [multi-c :span 1]))))
