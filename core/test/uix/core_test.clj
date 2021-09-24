(ns uix.core-test
  (:require [clojure.test :refer :all]
            [uix.core.lazy-loader :refer [require-lazy]]))

(require-lazy '[clojure.string :refer [blank?]])

(deftest test-require-lazy
  (testing "Should refer a var from ns"
    (is (= blank? clojure.string/blank?)))

  (testing "Should fail to alias ns"
    (try
      (macroexpand-1 '(require-lazy '[clojure.string :as str]))
      (catch Exception e
        (is (some? e))))))
