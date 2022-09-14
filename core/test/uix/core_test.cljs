(ns uix.core-test
  (:require [clojure.test :refer [deftest is async testing run-tests]]
            [uix.core :refer [defui $]]
            [uix.lib]
            [react :as r]
            [react-dom]
            [uix.test-utils :as t]
            [uix.compiler.attributes :as attrs]
            [uix.hiccup :refer [row-compiled]]))

(deftest test-use-ref
  (uix.core/defui test-use-ref-comp [_]
    (let [ref1 (uix.core/use-ref)
          ref2 (uix.core/use-ref 0)]
      (is (nil? (.-current ref1)))
      (is (nil? @ref1))
      (set! (.-current ref1) :x)
      (is (= :x (.-current ref1)))

      (is (= 0 (.-current ref2)))
      (is (= 0 @ref2))
      (reset! ref2 1)
      (is (= 1 @ref2))
      (swap! ref2 inc)
      (is (= 2 @ref2))
      (swap! ref2 + 2)
      (is (= 4 @ref2))
      "x"))
  (t/as-string ($ test-use-ref-comp)))

(deftest test-memoize
  (uix.core/defui test-memoize-comp [{:keys [x]}]
    (is (= 1 x))
    ($ :h1 x))
  (let [f (uix.core/memo test-memoize-comp)]
    (is (t/react-element-of-type? f "react.memo"))
    (is (= "<h1>1</h1>" (t/as-string ($ f {:x 1}))))))

(deftest test-html
  (is (t/react-element-of-type? ($ :h1 1) "react.element")))

(deftest test-defui
  (defui h1 [{:keys [children]}]
    ($ :h1 {} children))
  (is (= (t/as-string ($ h1 {} 1))) "<h1>1</h1>"))

(deftest test-jsfy-deps
  (is (= [1 "str" "k/w" "uix.core/sym" "b53887c9-4910-4d4e-aad9-f3487e6e97f5" nil [] {} #{}]
         (vec (uix.core/jsfy-deps [1 "str" :k/w 'uix.core/sym #uuid "b53887c9-4910-4d4e-aad9-f3487e6e97f5" nil [] {} #{}]))))
  (is (= [1 "str" "k/w" "uix.core/sym" "b53887c9-4910-4d4e-aad9-f3487e6e97f5" nil [] {} #{}]
         (vec (uix.core/jsfy-deps #js [1 "str" :k/w 'uix.core/sym #uuid "b53887c9-4910-4d4e-aad9-f3487e6e97f5" nil [] {} #{}]))))
  (is (= #{} (uix.core/jsfy-deps #{})))
  (is (= {} (uix.core/jsfy-deps {}))))

(deftest test-lazy
  (async done
         (let [expected-value :x
               lazy-f (uix.core/lazy (fn [] (js/Promise. (fn [res] (js/setTimeout #(res expected-value) 100)))))]
           (is (.-uix-component? lazy-f))
           (try
             (._init lazy-f (.-_payload lazy-f))
             (catch :default e
               (is (instance? js/Promise e))
               (.then e (fn [v]
                          (is (= expected-value (.-default ^js v)))
                          (done))))))))

(deftest test-create-class
  (let [actual (atom {:constructor {:this nil :props nil}
                      :getInitialState {:this nil}
                      :render {:state nil :props nil}
                      :componentDidMount false
                      :componentWillUnmount false})
        component (uix.core/create-class
                   {:displayName "test-comp"
                    :constructor (fn [this props]
                                   (swap! actual assoc :constructor {:this this :props props}))
                    :getInitialState (fn [this]
                                       (swap! actual assoc :getInitialState {:this this})
                                       #js {:x 1})
                    :componentDidMount #(swap! actual assoc :componentDidMount true)
                    :componentWillUnmount #(swap! actual assoc :componentWillUnmount true)
                    :render (fn []
                              (this-as this
                                       (swap! actual assoc :render {:state (.-state this) :props (.-props this)})
                                       "Hello!"))})
        root (js/document.createElement "div")]
    (react-dom/render ($ component {:x 1}) root)
    (is (instance? component (-> @actual :constructor :this)))
    (is (-> @actual :constructor :props .-argv (= {:x 1})))
    (is (instance? component (-> @actual :getInitialState :this)))
    (is (-> @actual :render :props .-argv (= {:x 1})))
    (is (-> @actual :render :state .-x (= 1)))
    (is (:componentDidMount @actual))
    (is (= "Hello!" (.-textContent root)))
    (react-dom/unmountComponentAtNode root)
    (is (:componentWillUnmount @actual))))

(deftest test-convert-props
  (testing "shallow conversion"
    (let [obj (attrs/convert-props
               {:x 1
                :y :keyword
                :f identity
                :style {:border :red
                        :margin-top "12px"}
                :class :class
                :for :for
                :charset :charset
                :hello-world "yo"
                "yo-yo" "string"
                :plugins [1 2 3]
                :data-test-id "hello"
                :aria-role "button"}
               #js []
               true)]
      (is (= 1 (.-x obj)))
      (is (= "keyword" (.-y obj)))
      (is (= identity (.-f obj)))
      (is (= "red" (.. obj -style -border)))
      (is (= "12px" (.. obj -style -marginTop)))
      (is (= "class" (.-className obj)))
      (is (= "for" (.-htmlFor obj)))
      (is (= "charset" (.-charSet obj)))
      (is (= "yo" (.-helloWorld obj)))
      (is (= [1 2 3] (.-plugins obj)))
      (is (= "string" (aget obj "yo-yo")))
      (is (= "hello" (aget obj "data-test-id")))
      (is (= "button" (aget obj "aria-role")))
      (is (= "a b c" (.-className (attrs/convert-props {:class [:a :b "c"]} #js [] true)))))))

(deftest test-as-react
  (uix.core/defui test-c [props]
    (is (map? props))
    (is (= "TEXT" (:text props)))
    ($ :h1 (:text props)))
  (let [h1 (uix.core/as-react test-c)
        el (h1 #js {:text "TEXT"})
        props (.-props el)]
    (is (= (.-type el) "h1"))
    (is (= (.-children props) "TEXT"))))

(defui test-source-component []
  "HELLO")

(deftest test-source
  (is (= (uix.core/source test-source-component)
         "(defui test-source-component []\n  \"HELLO\")"))
  (is (= (uix.core/source uix.hiccup/form-compiled)
         "(defui form-compiled [{:keys [children]}]\n  ($ :form children))"))
  (is (= (uix.core/source row-compiled)
         "(defui row-compiled [{:keys [children]}]\n  ($ :div.row children))")))

(defui comp-42336 [{:keys [comp-42336]}]
  (let [comp-42336 1]
    "hello"))

(deftest test-42336
  (is (.-uix-component? ^js comp-42336))
  (is (= (.-displayName comp-42336) (str `comp-42336))))

(defui comp-props-map [props] 1)

(deftest test-props-map
  (is (= 1 (comp-props-map #js {:argv nil})))
  (is (= 1 (comp-props-map #js {:argv {}})))
  (is (thrown-with-msg? js/Error #"UIx component expects a map of props, but instead got \[\]" (comp-props-map #js {:argv []}))))

(defn -main []
  (run-tests))
