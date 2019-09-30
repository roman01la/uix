(ns uix.compiler-test
  (:require [clojure.test :refer :all]
            [uix.compiler.alpha :as uixc]))

(defn render [el]
  (uixc/render-to-static-markup el))

(deftest test-class-names
  (is (= (render [:div]) "<div></div>"))
  (testing "Named types"
    (is (= (render [:div {:class "a"}]) "<div class=\"a\"></div>"))
    (is (= (render [:div {:class :a}]) "<div class=\"a\"></div>")))
  (testing "Collection of classes"
    (is (= (render [:div {:class [1 2 3]}]) "<div class=\"1 2 3\"></div>"))
    (is (= (render [:div {:class [1 :a "b"]}]) "<div class=\"1 a b\"></div>")))
  (testing "Map of class -> boolean"
    (is (= (render [:div {:class {:c1 true :c2 false}}]) "<div class=\"c1\"></div>"))))
