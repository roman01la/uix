(ns uix.core-test
  (:require [clojure.test :refer [deftest is testing run-tests]]
            [uix.core.alpha :as uix.core :refer-macros [require-lazy html defui]]
            [react :as r]
            [uix.test-utils :as t]
            [cljs-bean.core :as bean]))

(deftest test-strict-mode
  (is (= (uix.core/strict-mode 1) [:> r/StrictMode 1])))

(deftest test-create-ref
  (let [ref (uix.core/create-ref 1)]
    (is (= (type ref) uix.core/ReactRef))
    (is (= @ref 1))))

(deftest test-default-compare-args
  (is (uix.core/default-compare-args #js {:argv 1} #js {:argv 1})))

(deftest test-memoize
  (let [f (uix.core/memoize (fn [x]
                              (is (= 1 x))
                              [:h1 x]))]
    (is (t/react-element-of-type? f "react.memo"))
    (is (= "<h1>1</h1>" (t/as-string [f 1])))))

#_(deftest test-require-lazy
    (require-lazy '[uix.core.alpha :refer [strict-mode]])
    (is (t/react-element-of-type? strict-mode "react.lazy")))

(deftest test-html
  (is (t/react-element-of-type? (html [:h1 1]) "react.element")))

(deftest test-defui
  (defui h1 [child]
    [:h1 ^:inline child])
  (is (= (t/as-string [h1 1]) "<h1>1</h1>")))

(deftest test-as-element
  (is (-> (uix.core/as-element [:h1 1])
          (t/react-element-of-type? "react.element"))))

(deftest test-as-react
  (let [ctor (fn [props]
               (is (= @#'bean/Bean (type props)))
               (:x props))
        ftype (-> (uix.core/as-react ctor)
                  r/createElement
                  .-type)]
    (is (= (ftype #js {:x 1}) 1))))


(defn -main []
  (run-tests))
