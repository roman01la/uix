(ns uix.compiler-test
  (:require [clojure.test :refer [deftest is are testing run-tests]]
            [uix.compiler.alpha :as uixc]
            [uix.test-utils :refer [as-string js-equal? with-error symbol-for]]
            [uix.core :refer [defui $]]
            [uix.dom]))

(enable-console-print!)

(uix.core/defui test-seq-return-comp []
  (for [x (range 2)]
    ($ :span {:key x} x)))

(deftest test-seq-return
  (is (= (as-string ($ test-seq-return-comp)) "<span>0</span><span>1</span>")))

(uix.core/defui to-string-test-comp [props]
  ($ :div {} (str "i am " (:foo props))))

(deftest to-string-test []
  (is (re-find #"i am foobar"
               (as-string ($ to-string-test-comp {:foo "foobar"})))))

(deftest data-aria-test []
  (is (re-find #"data-foo"
               (as-string ($ :div {:data-foo "x"}))))
  (is (re-find #"aria-labelledby"
               (as-string ($ :div {:aria-labelledby "x"}))))
  (is (re-find #"enc[tT]ype"
               (as-string ($ :div {"encType" "x"})))
      "Strings are passed through to React, and have to be camelcase.")
  (is (re-find #"enc[tT]ype"
               (as-string ($ :div {:enc-type "x"})))
      "Strings are passed through to React, and have to be camelcase."))

(deftest dynamic-id-class []
  (is (re-find #"id=.foo"
               (as-string ($ :div#foo {:class "bar"}))))
  (is (re-find #"class=.foo bar"
               (as-string ($ :div.foo {:class "bar"}))))
  (is (re-find #"class=.foo bar"
               (as-string ($ :div.foo.bar))))
  (is (re-find #"id=.foo"
               (as-string ($ :div#foo.foo.bar))))
  (is (re-find #"class=.xxx bar"
               (as-string ($ :div#foo.xxx.bar))))
  (is (re-find #"id=.foo"
               (as-string ($ :div.bar {:id "foo"}))))
  (is (re-find #"id=.foo"
               (as-string ($ :div.bar.xxx {:id "foo"}))))
  (is (re-find #"id=.foo"
               (as-string ($ :div#bar {:id "foo"})))))

(uix.core/defui null-comp [do-show]
  (when do-show
    ($ :div {} "div in test-null-component")))

(deftest test-null-component
  (is (not (re-find #"test-null-component"
                    (as-string ($ null-comp false)))))
  (is (re-find #"test-null-component"
               (as-string ($ null-comp true)))))

(deftest test-class-from-collection
  (is (= (as-string ($ :p {:class ["a" "b" "c" "d"]}))
         (as-string ($ :p {:class "a b c d"}))))
  (is (= (as-string ($ :p.x {:class ["a" "b" "c" "d"]}))
         (as-string ($ :p {:class "x a b c d"}))))
  (is (= (as-string ($ :p {:class ["a" nil "b" false "c" nil]}))
         (as-string ($ :p {:class "a b c"}))))
  (let [x ["b" "c"]]
    (is (= (as-string ($ :p {:class x}))
           (as-string ($ :p {:class "b c"}))))
    (is (= (as-string ($ :p {:class (conj x "a")}))
           (as-string ($ :p {:class "b c a"}))))
    (is (= (as-string ($ :p.a {:class x}))
           (as-string ($ :p {:class "a b c"}))))))

(deftest test-keyword-attrs-value
  (is (= (as-string ($ :p {:title :hello}))
         (as-string ($ :p {:title "hello"}))))
  (let [x :hello]
    (is (= (as-string ($ :p {:title x}))
           (as-string ($ :p {:title "hello"})))))
  (is (= (as-string ($ :p {:style {:text-align :center}}))
         (as-string ($ :p {:style {:text-align "center"}}))))
  (let [x :center]
    (is (= (as-string ($ :p {:style {:text-align x}}))
           (as-string ($ :p {:style {:text-align "center"}}))))))

(uix.core/defui key-tester []
  ($ :div {}
     (for [i (range 3)]
       ($ :p {:key i} i))))

(deftest test-keys
  (with-error #(as-string ($ key-tester))))

(deftest style-property-names-are-camel-cased
  (is (re-find #"<div style=\"text-align:center(;?)\">foo</div>"
               (as-string ($ :div {:style {:text-align "center"}} "foo")))))

(deftest custom-element-class-prop
  (is (re-find #"<custom-element class=\"foobar\">foo</custom-element>"
               (as-string ($ :custom-element {:class "foobar"} "foo"))))

  (is (re-find #"<custom-element class=\"foobar\">foo</custom-element>"
               (as-string ($ :custom-element.foobar {} "foo")))))

(deftest test-fragments
  #_(testing "Fragment as array"
      (uix.core/defui comp1 []
        #js [($ :div {} "hello")
             ($ :div {} "world")])
      (is (= "<div>hello</div><div>world</div>"
             (as-string ($ comp)))))

  (testing "Fragment element, :<>"
    (uix.core/defui comp2 []
      ($ :<> {}
         ($ :div {} "hello")
         ($ :div {} "world")
         ($ :div {} "foo")))
    (is (= "<div>hello</div><div>world</div><div>foo</div>"
           (as-string ($ comp2)))))

  (testing "Fragment key"
    ;; This would cause React warning if both fragments didn't have key set
    ;; But wont fail the test
    (uix.core/defui comp4 []
      ($ :<> {}
         ($ :div {} "foo")))
    (uix.core/defui comp3 []
      ($ :div {}
         (list
          ($ :<> {:key 1}
             ($ :div {} "hello")
             ($ :div {} "world"))
          ($ comp4 {:key 2})
          ($ :<> {:key 3}
             ($ :div {} "1")
             ($ :div {} "2")))))
    (is (= "<div><div>hello</div><div>world</div><div>foo</div><div>1</div><div>2</div></div>"
           (as-string ($ comp3))))))

(deftest test-interop
  (defn testc-interop [])
  (testing "Interop element type"
    (is (.-type ($ testc-interop))
        testc-interop))
  (testing "Shallowly converted props"
    (let [el ($ testc-interop {:a 1 :b {:c 2}} :child)
          props (.-props el)]
      (is (.-a props) 1)
      (is (.-b props) {:c 2})
      (is (.-children props) :child))))

(deftest test-portal
  (try
    (uix.dom/create-portal 1 2)
    (catch :default e
      (is "Target container is not a DOM element." (.-message e)))))

(deftest test-validate-component
  (defn testc-validate-component-1 [])
  (defn testc-validate-component-2 [])
  (defn testc-validate-component-3 [])
  (aset testc-validate-component-1 "G_1" testc-validate-component-1)
  (is (thrown-with-msg? js/Error #"Invalid use of Reagent component uix\$compiler_test\$testc_validate_component_1 in.*"
                        (uixc/validate-component testc-validate-component-1)))
  (is (thrown-with-msg? js/Error #"Invalid use of Reagent component uix\$compiler_test\$testc_validate_component_1 in.*"
                        ($ testc-validate-component-1)))
  (set! (.-uix-component? ^clj testc-validate-component-2) true)
  (is (true? (uixc/validate-component testc-validate-component-2)))
  (is (true? (uixc/validate-component testc-validate-component-3))))

(deftest test-nil-attrs
  (defui test-nil-attrs-component [])
  (let [f-el #($ :div (when % "x") "y")
        f-comp #($ test-nil-attrs-component (when % "x") "y")]
    (is (= [nil "y"] (vec (.. (f-el false) -props -children))))
    (is (= ["x" "y"] (vec (.. (f-el true) -props -children))))
    (is (= [nil "y"] (vec (.. (f-comp false) -props -children))))
    (is (= ["x" "y"] (vec (.. (f-comp true) -props -children))))))

(defn -main []
  (run-tests))
