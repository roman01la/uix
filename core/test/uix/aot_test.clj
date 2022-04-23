(ns uix.aot-test
  (:require [clojure.test :refer :all]
            [uix.compiler.aot :as aot]
            [uix.compiler.attributes :as attrs]))

(deftest test-parse-tag
  (is (= (attrs/parse-tag (name :div#id.class))
         ["div" "id" "class" false]))
  (is (= (attrs/parse-tag (name :custom-tag))
         ["custom-tag" nil nil true])))

(deftest test-parse-tags
  (is (= (attrs/parse-tags :div#id.class)
         '(["div" "id" "class" false])))
  (is (= (attrs/parse-tags :div#id.class>h1)
         '(["div" "id" "class" false]
           ["h1" nil nil false]))))

(deftest test-class-names
  (is (= (attrs/compile-config-kv :class nil) nil))
  (testing "Named types"
    (is (= (attrs/compile-config-kv :class "a") "a"))))

(deftest convert-props-test
  (is (= {:className "a" :htmlFor "x"}
         (attrs/compile-attrs {:class "a" :for "x"}))))

(deftest test-compile-html
  (is (= (aot/compile-element [:h1])
         '(uix.compiler.aot/>el "h1" (cljs.core/array nil) (cljs.core/array))))
  (is (= (aot/compile-element '[:> x {} 1 2])
         '(uix.compiler.aot/>el x (cljs.core/array (cljs.core/js-obj)) (cljs.core/array 1 2))))
  (is (= (aot/compile-element '[:> x {:x 1 :ref 2} 1 2])
         '(uix.compiler.aot/>el x (cljs.core/array (js* "{'x':~{},'ref':~{}}" 1 2)) (cljs.core/array 1 2)))))
