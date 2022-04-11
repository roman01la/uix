(ns uix.compiler-test
  (:require [clojure.test :refer [deftest is are testing run-tests]]
            [uix.compiler.alpha :as uixc]
            [uix.test-utils :refer [as-string js-equal? with-error symbol-for]]
            [uix.compiler.debug :as debug]
            [uix.core :refer [h]]
            [uix.dom.alpha :as uix.dom]
            [clojure.string :as str]))

(enable-console-print!)

(deftest test-default-compare-args
  (is (uixc/*default-compare-args* #js {:argv 1} #js {:argv 1})))

(uix.core/defui test-seq-return-comp []
  (for [x (range 2)]
    (h :span {} x)))

(deftest test-seq-return
  (is (= (as-string (h test-seq-return-comp)) "<span>0</span><span>1</span>")))

(when ^boolean goog.DEBUG
  (deftest test-default-format-display-name
    (is (= (debug/default-format-display-name (.-name js-equal?))
           "uix.test-utils/js-equal?"))
    (let [f-hello (fn [])]
      (is (= (debug/default-format-display-name (.-name f-hello))
             "f-hello"))))

  (deftest test-with-name
    (testing "should have formatted display and function names"
      (let [f (fn <some-component> [])]
        (debug/with-name f)
        (is (= (.-displayName f) "uix.compiler-test/<some-component>"))
        (is (= (.-name f) "uix.compiler-test/<some-component>"))))
    (testing "should throw when *format-display-name* is unbound"
      (let [f (fn <some-component> [])]
        (set! debug/*format-display-name* nil)
        (is (thrown-with-msg? js/Error #"\*format-display-name\* is not bound"
                              (debug/with-name f)))))
    (testing "should have formatted function name in a stack trace"
      (uix.core/defui some-component [] (throw (js/Error. "x")))
      (let [stack (try
                    (some-component)
                    (catch js/Error e
                      (.-stack e)))]
        (is (str/includes? stack "uix.compiler-test/some-component"))))))



(uix.core/defui to-string-test-comp [props]
  (h :div {} (str "i am " (:foo props))))

(deftest to-string-test []
                        (is (re-find #"i am foobar"
                                     (as-string (h to-string-test-comp {:foo "foobar"})))))

(deftest data-aria-test []
                        (is (re-find #"data-foo"
                                     (as-string (h :div {:data-foo "x"}))))
                        (is (re-find #"aria-labelledby"
                                     (as-string (h :div {:aria-labelledby "x"}))))
                        (is (re-find #"enc[tT]ype"
                                     (as-string (h :div {"encType" "x"})))
                            "Strings are passed through to React, and have to be camelcase.")
                        (is (re-find #"enc[tT]ype"
                                     (as-string (h :div {:enc-type "x"})))
                            "Strings are passed through to React, and have to be camelcase."))

(deftest dynamic-id-class []
                          (is (re-find #"id=.foo"
                                       (as-string (h :div#foo {:class "bar"}))))
                          (is (re-find #"class=.foo bar"
                                       (as-string (h :div.foo {:class "bar"}))))
                          (is (re-find #"class=.foo bar"
                                       (as-string (h :div.foo.bar))))
                          (is (re-find #"id=.foo"
                                       (as-string (h :div#foo.foo.bar))))
                          (is (re-find #"class=.xxx bar"
                                       (as-string (h :div#foo.xxx.bar))))
                          (is (re-find #"id=.foo"
                                       (as-string (h :div.bar {:id "foo"}))))
                          (is (re-find #"id=.foo"
                                       (as-string (h :div.bar.xxx {:id "foo"}))))
                          (is (re-find #"id=.foo"
                                       (as-string (h :div#bar {:id "foo"})))))

(uix.core/defui null-comp [do-show]
  (when do-show
    (h :div {} "div in test-null-component")))

(deftest test-null-component
  (is (not (re-find #"test-null-component"
                    (as-string (h null-comp false)))))
  (is (re-find #"test-null-component"
               (as-string (h null-comp true)))))

(deftest test-class-from-collection
  (is (= (as-string (h :p {:class ["a" "b" "c" "d"]}))
         (as-string (h :p {:class "a b c d"}))))
  (is (= (as-string (h :p.x {:class ["a" "b" "c" "d"]}))
         (as-string (h :p {:class "x a b c d"}))))
  (is (= (as-string (h :p {:class ["a" nil "b" false "c" nil]}))
         (as-string (h :p {:class "a b c"}))))
  (let [x ["b" "c"]]
    (is (= (as-string (h :p {:class x}))
           (as-string (h :p {:class "b c"}))))
    (is (= (as-string (h :p {:class (conj x "a")}))
           (as-string (h :p {:class "b c a"}))))
    (is (= (as-string (h :p.a {:class x}))
           (as-string (h :p {:class "a b c"}))))))

(deftest test-keyword-attrs-value
  (is (= (as-string (h :p {:title :hello}))
         (as-string (h :p {:title "hello"}))))
  (let [x :hello]
    (is (= (as-string (h :p {:title x}))
           (as-string (h :p {:title "hello"})))))
  (is (= (as-string (h :p {:style {:text-align :center}}))
         (as-string (h :p {:style {:text-align "center"}}))))
  (let [x :center]
    (is (= (as-string (h :p {:style {:text-align x}}))
           (as-string (h :p {:style {:text-align "center"}}))))))

(uix.core/defui key-tester []
  (h :div {}
     (for [i (range 3)]
       (h :p {:key i} i))))

(deftest test-keys
  (with-error #(as-string (h key-tester))))


(deftest style-property-names-are-camel-cased
  (is (re-find #"<div style=\"text-align:center(;?)\">foo</div>"
               (as-string (h :div {:style {:text-align "center"}} "foo")))))

(deftest custom-element-class-prop
  (is (re-find #"<custom-element class=\"foobar\">foo</custom-element>"
               (as-string (h :custom-element {:class "foobar"} "foo"))))

  (is (re-find #"<custom-element class=\"foobar\">foo</custom-element>"
               (as-string (h :custom-element.foobar {} "foo")))))

(deftest test-fragments
  #_(testing "Fragment as array"
      (uix.core/defui comp1 []
        #js [(h :div {} "hello")
             (h :div {} "world")])
      (is (= "<div>hello</div><div>world</div>"
             (as-string (h comp)))))

  (testing "Fragment element, :<>"
    (uix.core/defui comp2 []
      (h :<> {}
         (h :div {} "hello")
         (h :div {} "world")
         (h :div {} "foo")))
    (is (= "<div>hello</div><div>world</div><div>foo</div>"
           (as-string (h comp2)))))

  (testing "Fragment key"
    ;; This would cause React warning if both fragments didn't have key set
    ;; But wont fail the test
    (uix.core/defui comp4 []
      (h :<> {}
         (h :div {} "foo")))
    (uix.core/defui comp3 []
      (h :div {}
         (list
           (h :<> {:key 1}
              (h :div {} "hello")
              (h :div {} "world"))
           (h comp4 {:key 2})
           (h :<> {:key 3}
              (h :div {} "1")
              (h :div {} "2")))))
    (is (= "<div><div>hello</div><div>world</div><div>foo</div><div>1</div><div>2</div></div>"
           (as-string (h comp3))))))

(deftest test-suspense
  (is (.-type (h :# {:fallback 1} 2))
      (symbol-for "react.suspense")))

(deftest test-interop
  (testing "Interop element type"
    (is (.-type (h :> inc))
        inc))
  (testing "Shallowly converted props"
    (let [el (h :> inc {:a 1 :b {:c 2}} :child)
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
      (h :h1 (:text props)))
    (let [h1 (uixc/as-react test-c)
          el (h1 #js {:text "TEXT"})
          props (.-props el)]
      (is (.-type el) "h1")
      (is (.-children props) "TEXT")))

(deftest test-validate-component
  (is (thrown-with-msg? js/Error #"Invalid use of a non-UIx component test in `h` form\..*"
                        (uixc/validate-component #js {:name "test"})))
  (when ^boolean goog.DEBUG
    (is (thrown-with-msg? js/Error #"Invalid use of a non-UIx component cljs\$core\$inc in `h` form\..*"
                          (h inc))))
  (let [target #js {:name "test"}]
    (set! (.-uix-component? target) true)
    (is (true? (uixc/validate-component target))))
  (when ^boolean goog.DEBUG
    (uix.core/defui test-comp [] "x")
    (is (= test-comp (.-type (h test-comp))))))

(defn -main []
  (run-tests))
