(ns uix.compiler-test
  (:require [clojure.test :refer [deftest is are testing run-tests]]
            [uix.compiler.alpha :as uixc]
            [uix.test-utils :refer [as-string js-equal? with-error symbol-for]]
            [uix.compiler.debug :as debug]
            [uix.core :as uix.core]
            [uix.dom.alpha :as uix.dom]))

(enable-console-print!)

(deftest test-default-compare-args
  (is (uixc/*default-compare-args* #js {:argv 1} #js {:argv 1})))

(uix.core/defui test-seq-return-comp []
  (for [x (range 2)]
    #el [:span {} x]))

(deftest test-seq-return
  (is (= (as-string #el [test-seq-return-comp]) "<span>0</span><span>1</span>")))

(when ^boolean goog.DEBUG
  (deftest test-default-format-display-name
    (is (= (debug/default-format-display-name (.-name js-equal?))
           "uix.test-utils/js-equal?"))
    (let [f-hello (fn [])]
      (is (= (debug/default-format-display-name (.-name f-hello))
             "f-hello"))))

  (deftest test-with-name
    (binding [debug/*format-display-name* debug/*format-display-name*]
      (let [f (fn <some-component> [])]
        (debug/with-name f)
        (is (= (.-displayName f) "uix.compiler-test/<some-component>")))
      ; nil returned from *format-display-name* means no name
      (set! debug/*format-display-name* (fn [_s _orig]))
      (let [f (fn <some-component> [])]
        (set! debug/*format-display-name* nil)
        (is (thrown-with-msg? js/Error #"\*format-display-name\* is not bound"
                              (debug/with-name f)))))))


(uix.core/defui to-string-test-comp [props]
  #el [:div {} (str "i am " (:foo props))])

(deftest to-string-test []
  (is (re-find #"i am foobar"
               (as-string #el [to-string-test-comp {:foo "foobar"}]))))

(deftest data-aria-test []
  (is (re-find #"data-foo"
               (as-string #el [:div {:data-foo "x"}])))
  (is (re-find #"aria-labelledby"
               (as-string #el [:div {:aria-labelledby "x"}])))
  (is (re-find #"enc[tT]ype"
               (as-string #el [:div {"encType" "x"}]))
      "Strings are passed through to React, and have to be camelcase.")
  (is (re-find #"enc[tT]ype"
               (as-string #el [:div {:enc-type "x"}]))
      "Strings are passed through to React, and have to be camelcase."))

(deftest dynamic-id-class []
  (is (re-find #"id=.foo"
               (as-string #el [:div#foo {:class "bar"}])))
  (is (re-find #"class=.foo bar"
               (as-string #el [:div.foo {:class "bar"}])))
  (is (re-find #"class=.foo bar"
               (as-string #el [:div.foo.bar])))
  (is (re-find #"id=.foo"
               (as-string #el [:div#foo.foo.bar])))
  (is (re-find #"class=.xxx bar"
               (as-string #el [:div#foo.xxx.bar])))
  (is (re-find #"id=.foo"
               (as-string #el [:div.bar {:id "foo"}])))
  (is (re-find #"id=.foo"
               (as-string #el [:div.bar.xxx {:id "foo"}])))
  (is (re-find #"id=.foo"
               (as-string #el [:div#bar {:id "foo"}]))))

(uix.core/defui null-comp [do-show]
  (when do-show
    #el [:div {} "div in test-null-component"]))

(deftest test-null-component
  (is (not (re-find #"test-null-component"
                    (as-string #el [null-comp false]))))
  (is (re-find #"test-null-component"
               (as-string #el [null-comp true]))))

(deftest test-class-from-collection
  (is (= (as-string #el [:p {:class ["a" "b" "c" "d"]}])
         (as-string #el [:p {:class "a b c d"}])))
  (is (= (as-string #el [:p.x {:class ["a" "b" "c" "d"]}])
         (as-string #el [:p {:class "x a b c d"}])))
  (is (= (as-string #el [:p {:class ["a" nil "b" false "c" nil]}])
         (as-string #el [:p {:class "a b c"}])))
  (let [x ["b" "c"]]
    (is (= (as-string #el [:p {:class x}])
           (as-string #el [:p {:class "b c"}])))
    (is (= (as-string #el [:p {:class (conj x "a")}])
           (as-string #el [:p {:class "b c a"}])))
    (is (= (as-string #el [:p.a {:class x}])
           (as-string #el [:p {:class "a b c"}])))))

(deftest test-keyword-attrs-value
  (is (= (as-string #el [:p {:title :hello}])
         (as-string #el [:p {:title "hello"}])))
  (let [x :hello]
    (is (= (as-string #el [:p {:title x}])
           (as-string #el [:p {:title "hello"}]))))
  (is (= (as-string #el [:p {:style {:text-align :center}}])
         (as-string #el [:p {:style {:text-align "center"}}])))
  (let [x :center]
    (is (= (as-string #el [:p {:style {:text-align x}}])
           (as-string #el [:p {:style {:text-align "center"}}])))))

(uix.core/defui key-tester []
  #el [:div {}
       (for [i (range 3)]
         #el [:p {:key i} i])])

(deftest test-keys
  (with-error #(as-string #el [key-tester])))


(deftest style-property-names-are-camel-cased
  (is (re-find #"<div style=\"text-align:center(;?)\">foo</div>"
               (as-string #el [:div {:style {:text-align "center"}} "foo"]))))

(deftest custom-element-class-prop
  (is (re-find #"<custom-element class=\"foobar\">foo</custom-element>"
               (as-string #el [:custom-element {:class "foobar"} "foo"])))

  (is (re-find #"<custom-element class=\"foobar\">foo</custom-element>"
               (as-string #el [:custom-element.foobar {} "foo"]))))

(deftest test-fragments
  #_(testing "Fragment as array"
      (uix.core/defui comp1 []
        #js [#el [:div {} "hello"]
             #el [:div {} "world"]])
      (is (= "<div>hello</div><div>world</div>"
             (as-string #el [comp]))))

  (testing "Fragment element, :<>"
    (uix.core/defui comp2 []
      #el [:<> {}
           #el [:div {} "hello"]
           #el [:div {} "world"]
           #el [:div {} "foo"]])
    (is (= "<div>hello</div><div>world</div><div>foo</div>"
           (as-string #el [comp2]))))

  (testing "Fragment key"
    ;; This would cause React warning if both fragments didn't have key set
    ;; But wont fail the test
    (uix.core/defui comp4 []
      #el [:<> {}
           #el [:div {} "foo"]])
    (uix.core/defui comp3 []
      #el [:div {}
           (list
             #el [:<> {:key 1}
                  #el [:div {} "hello"]
                  #el [:div {} "world"]]
             #el [comp4 {:key 2}]
             #el [:<> {:key 3}
                  #el [:div {} "1"]
                  #el [:div {} "2"]])])
    (is (= "<div><div>hello</div><div>world</div><div>foo</div><div>1</div><div>2</div></div>"
           (as-string #el [comp3])))))

(deftest test-suspense
  (is (.-type #el [:# {:fallback 1} 2])
      (symbol-for "react.suspense")))

(deftest test-interop
  (testing "Interop element type"
    (is (.-type #el [:> inc])
        inc))
  (testing "Shallowly converted props"
    (let [el #el [:> inc {:a 1 :b {:c 2}} :child]
          props (.-props el)]
      (is (.-a props) 1)
      (is (.-b props) {:c 2})
      (is (.-children props) :child))))

(deftest test-portal
  (try
    (uix.dom/create-portal 1 2)
    (catch :default e
      (is "Target container is not a DOM element." (.-message e)))))

#_(deftest test-as-react
    (uix.core/defui test-c [props]
      (is (map? props) true)
      (is "TEXT" (:text props))
      #el [:h1 (:text props)])
    (let [h1 (uixc/as-react test-c)
          el (h1 #js {:text "TEXT"})
          props (.-props el)]
      (is (.-type el) "h1")
      (is (.-children props) "TEXT")))

(defn -main []
  (run-tests))
