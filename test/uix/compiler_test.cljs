(ns uix.compiler
  (:require [cljs.test :refer :all :refer-macros [run-tests]]
            [uix.compiler.alpha :as uixc]
            [goog.object :as gobj]))

(enable-console-print!)

(defn as-string [comp]
  (-> (uixc/as-element [comp])
      js/ReactDOMServer.renderToString))

(defn js-equal? [a b]
  (gobj/equals a b))



(deftest cached-prop-name
  (is (= "className" (uixc/cached-prop-name :class))))

;(deftest cached-custom-prop-name
;  (is (= "hellowWorld" (uixc/cached-prop-name :hello-world))))
;
;(deftest convert-props-test
;  (is (js-equal? #js {:className "a"}
;                 (uixc/convert-props {:class "a"} [])))
;  (is (js-equal? #js {:className "a b" :id "a"}
;                 (uixc/convert-props {:class "b"} [nil "a" ["b"]]))))
;
;
;(deftest to-string-test []
;  (let [comp (fn [props]
;               [:div (str "i am " (:foo props))])]
;    (is (re-find #"i am foobar"
;                 (as-string [comp {:foo "foobar"}])))))
;
;(deftest data-aria-test []
;  (is (re-find #"data-foo"
;               (as-string [:div {:data-foo "x"}])))
;  (is (re-find #"aria-labelledby"
;               (as-string [:div {:aria-labelledby "x"}])))
;  (is (re-find #"enc[tT]ype"
;               (as-string [:div {"encType" "x"}]))
;      "Strings are passed through to React, and have to be camelcase.")
;  (is (re-find #"enc[tT]ype"
;               (as-string [:div {:enc-type "x"}]))
;      "Strings are passed through to React, and have to be camelcase."))
;
;(deftest dynamic-id-class []
;  (is (re-find #"id=.foo"
;               (as-string [:div#foo {:class "bar"}])))
;  (is (re-find #"class=.foo bar"
;               (as-string [:div.foo {:class "bar"}])))
;  (is (re-find #"class=.foo bar"
;               (as-string [:div.foo.bar])))
;  (is (re-find #"id=.foo"
;               (as-string [:div#foo.foo.bar])))
;  (is (re-find #"class=.xxx bar"
;               (as-string [:div#foo.xxx.bar])))
;  (is (re-find #"id=.foo"
;               (as-string [:div.bar {:id "foo"}])))
;  (is (re-find #"id=.foo"
;               (as-string [:div.bar.xxx {:id "foo"}])))
;  (is (re-find #"id=.foo"
;               (as-string [:div#bar {:id "foo"}]))
;      "Dynamic id overwrites static"))
;
;(deftest ifn-component []
;  (defmulti my-div :type)
;  (defmethod my-div :fooish [child] [:div.foo (:content child)])
;  (defmethod my-div :barish [child] [:div.bar (:content child)])
;
;  (let [comp {:foo [:div "foodiv"]
;              :bar [:div "bardiv"]}]
;    (is (re-find #"foodiv"
;                 (as-string [:div [comp :foo]])))
;    (is (re-find #"bardiv"
;                 (as-string [:div [comp :bar]])))
;    (is (re-find #"class=.foo"
;                 (as-string [my-div {:type :fooish :content "inner"}])))))
;
;(deftest symbol-string-tag []
;  (is (re-find #"foobar"
;               (as-string ['div "foobar"])))
;  (is (re-find #"foobar"
;               (as-string ["div" "foobar"])))
;  (is (re-find #"id=.foo"
;               (as-string ['div#foo "x"])))
;  (is (re-find #"id=.foo"
;               (as-string ["div#foo" "x"])))
;  (is (re-find #"class=.foo bar"
;               (as-string ['div.foo {:class "bar"}])))
;  (is (re-find #"class=.foo bar"
;               (as-string ["div.foo.bar"])))
;  (is (re-find #"id=.foo"
;               (as-string ['div#foo.foo.bar]))))
;
;(deftest test-null-component
;  (let [null-comp (fn [do-show]
;                    (when do-show
;                      [:div "div in test-null-component"]))]
;    (is (not (re-find #"test-null-component"
;                      (as-string [null-comp false]))))
;    (is (re-find #"test-null-component"
;                 (as-string [null-comp true])))))
;
;(deftest test-class-from-collection
;  (is (= (as-string [:p {:class ["a" "b" "c" "d"]}])
;         (as-string [:p {:class "a b c d"}])))
;  (is (= (as-string [:p {:class ["a" nil "b" false "c" nil]}])
;         (as-string [:p {:class "a b c"}])))
;  (is (= (as-string [:p {:class '("a" "b" "c")}])
;         (as-string [:p {:class "a b c"}])))
;  (is (= (as-string [:p {:class #{"a" "b" "c"}}])
;         (as-string [:p {:class "a b c"}]))))
;
;(deftest class-different-types
;  (testing "named values are supported"
;    (is (= (as-string [:p {:class :a}])
;           (as-string [:p {:class "a"}])))
;    (is (= (as-string [:p.a {:class :b}])
;           (as-string [:p {:class "a b"}])))
;    (is (= (as-string [:p.a {:class 'b}])
;           (as-string [:p {:class "a b"}])))
;    (is (= (as-string [:p {:class [:a :b]}])
;           (as-string [:p {:class "a b"}])))
;    (is (= (as-string [:p {:class ['a :b]}])
;           (as-string [:p {:class "a b"}]))))
;
;  (testing "non-named values like numbers"
;    (is (= (as-string [:p {:class [1 :b]}])
;           (as-string [:p {:class "1 b"}]))))
;
;  (testing "falsey values are filtered from collections"
;    (is (= (as-string [:p {:class [:a :b false nil]}])
;           (as-string [:p {:class "a b"}])))))
;
;
;(deftest style-property-names-are-camel-cased
;  (is (re-find #"<div style=\"text-align:center(;?)\">foo</div>"
;               (as-string [:div {:style {:text-align "center"}} "foo"]))))
;
;(deftest custom-element-class-prop
;  (is (re-find #"<custom-element class=\"foobar\">foo</custom-element>"
;               (as-string [:custom-element {:class "foobar"} "foo"])))
;
;  (is (re-find #"<custom-element class=\"foobar\">foo</custom-element>"
;               (as-string [:custom-element.foobar "foo"]))))
;
;(deftest test-fragments
;  (testing "Fragment as array"
;    (let [comp (fn comp1 []
;                 #js [(uixc/as-element [:div "hello"])
;                      (uixc/as-element [:div "world"])])]
;      (is (= "<div>hello</div><div>world</div>"
;             (as-string [comp])))))
;
;  (testing "Fragment element, :<>"
;    (let [comp (fn comp2 []
;                 [:<>
;                  [:div "hello"]
;                  [:div "world"]
;                  [:div "foo"]])]
;      (is (= "<div>hello</div><div>world</div><div>foo</div>"
;             (as-string [comp])))))
;
;  (testing "Fragment key"
;    ;; This would cause React warning if both fragments didn't have key set
;    ;; But wont fail the test
;    (let [children (fn comp4 []
;                     [:<>
;                      [:div "foo"]])
;          comp (fn comp3 []
;                 [:div
;                  (list
;                    [:<>
;                     {:key 1}
;                     [:div "hello"]
;                     [:div "world"]]
;                    ^{:key 2}
;                    [children]
;                    ^{:key 3}
;                    [:<>
;                     [:div "1"]
;                     [:div "2"]])])]
;      (is (= "<div><div>hello</div><div>world</div><div>foo</div><div>1</div><div>2</div></div>"
;             (as-string [comp]))))))

(defn start! []
  (run-tests))
