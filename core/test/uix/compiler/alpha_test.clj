(ns uix.compiler.alpha-test
  (:require [clojure.test :refer :all]
            [uix.compiler.alpha :as compiler]))

(deftest test-62
  (is (= "<div contenteditable=\"true\"></div>"
         (compiler/render-to-string [:div {:content-editable true}])))
  (is (= "<div hidden=\"\"></div>"
         (compiler/render-to-string [:div {:hidden true}]))))
