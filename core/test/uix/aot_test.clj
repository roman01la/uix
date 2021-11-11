(ns uix.aot-test
  (:require [clojure.test :refer :all]
            [uix.compiler.aot :as aot]
            [uix.compiler.attributes :as attrs]))

(deftest test-parse-tag
  (is (= (attrs/parse-tag (name :div#id.class))
         ["div" "id" "class" false]))
  (is (= (attrs/parse-tag (name :custom-tag))
         ["custom-tag" nil nil true])))

(deftest test-class-names
  (is (= (attrs/compile-config-kv :class nil) nil))
  (testing "Named types"
    (is (= (attrs/compile-config-kv :class "a") "a"))
    #_
    (is (= (attrs/compile-config-kv :class :a) :a)))
  #_
  (testing "Collection of classes"
    (is (= (attrs/compile-config-kv :class ["a" "b" "c"]) "a b c")))
  #_(testing "Map of class -> boolean"
      (is (= (attrs/compile-config-kv :class {:c1 true :c2 false}) "c1"))))

(deftest test-set-id-class
  (testing "Hiccup classes should preceding attribute classes"
    (is (= (attrs/set-id-class {:class "a"} (attrs/parse-tag (name :div.b)))
           {:class `(uix.compiler.attributes/join-class-names (cljs.core/array "b" "a"))})))
  (testing "Attribute ID has higher priority than Hiccup ID"
    (is (= (attrs/set-id-class {:id "a"} (attrs/parse-tag (name :div#b)))
           {:id "a"}))))

(deftest convert-props-test
  (is (= {:className "a" :htmlFor "x"}
         (attrs/compile-attrs {:class "a" :for "x"}))))

(deftest test-compile-html
  (is (= (aot/compile-html [:h1])
         '(uix.compiler.aot/>el "h1" (cljs.core/array) (cljs.core/array))))
  (is (= (aot/compile-html '[:> x {} 1 2])
         '(uix.compiler.aot/>el x (cljs.core/array (cljs.core/js-obj)) (cljs.core/array 1 2))))
  (is (= (aot/compile-html '[:> x {:x 1 :ref 2} 1 2])
         '(uix.compiler.aot/>el x (cljs.core/array (js* "{'x':~{},'ref':~{}}" 1 2)) (cljs.core/array 1 2)))))
