(ns uix.aot-test
  (:require [clojure.test :refer [deftest is testing]]
            [uix.compiler.aot :as aot]
            [uix.compiler.attributes :as attrs]))

(defmulti x identity)

(deftest test-validate-children
  (when ^boolean goog.DEBUG
    (testing "should throw for Hiccup child"
      (is (thrown-with-msg? js/Error #"\(found: \[:div\]\)" (aot/validate-children #js [[:div]])))
      (is (thrown-with-msg? js/Error #"\(found: \[div\]\)" (aot/validate-children #js [['div]])))
      (is (thrown-with-msg? js/Error #"\(found: \[#object\[cljs\$core\$inc\]\]\)" (aot/validate-children #js [[inc]])))
      (is (thrown-with-msg? js/Error #"\(found: \[\#object\[cljs.core.MultiFn\]\]\)" (aot/validate-children #js [[x]])))))

  (testing "should throw for nested Hiccup child"
    (is (thrown-with-msg? js/Error #"\(found: \[:div 3\]\)" (aot/validate-children #js [1 [2 [:div 3]]]))))

  (testing "should not throw when there's no Hiccup children"
    (is (aot/validate-children #js [1 2 3]))
    (is (aot/validate-children #js [1 [2 3] [4 [5 6]]]))))

(deftest test-interpret-attrs
  (let [[props] (attrs/interpret-attrs {:class ["x" ["y" "z" ["p"]]]} #js [] false)]
    (is (= "x y z p" (.-className props))))
  (let [[props] (attrs/interpret-attrs {:class ["x" ["y" "z" ["p"]]]} #js [nil "id" "c l ass"] false)]
    (is (= "c l ass x y z p" (.-className props)))
    (is (= "id" (.-id props)))))
