(ns uix.core-test
  (:require [clojure.test :refer :all]
            [uix.core :as uix]
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

(deftest test-parse-sig
  (is (thrown-with-msg? AssertionError #"uix.core\/defui doesn't support multi-arity"
                        (uix.core/parse-sig 'component-name '(([props]) ([props x])))))
  (is (thrown-with-msg? AssertionError #"uix.core\/defui should be a single-arity component"
        (uix.core/parse-sig 'component-name '([props x])))))

(deftest test-$
  (is (= (macroexpand-1 '(uix/$ :h1))
         '(uix.compiler.aot/>el "h1" (cljs.core/array nil) (cljs.core/array))))
  (is (= (macroexpand-1 '(uix/$ :> identity {} 1 2))
         '(uix.compiler.aot/>el identity (cljs.core/array (cljs.core/js-obj)) (cljs.core/array 1 2))))
  (is (= (macroexpand-1 '(uix/$ :> identity {:x 1 :ref 2} 1 2))
         '(uix.compiler.aot/>el identity (cljs.core/array (js* "{'x':~{},'ref':~{}}" 1 2)) (cljs.core/array 1 2)))))
