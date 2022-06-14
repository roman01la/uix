(ns uix.core-test
  (:require [clojure.test :refer :all]
            [uix.core]
            [cljs.analyzer :as ana]
            [uix.hooks.linter :as linter]
            [uix.core.impl :as impl])
  (:import (cljs.tagged_literals JSValue)))

(deftest test-parse-sig
  (is (thrown-with-msg? AssertionError #"uix.core\/defui doesn't support multi-arity"
                        (impl/parse-sig 'component-name '(([props]) ([props x])))))
  (is (thrown-with-msg? AssertionError #"uix.core\/defui is a single argument component"
                        (impl/parse-sig 'component-name '([props x])))))

(deftest test-vector->js-array
  (is (= '(uix.core/jsfy-deps (cljs.core/array 1 2 3)) (impl/vector->js-array [1 2 3])))
  (is (= '(uix.core/jsfy-deps x) (impl/vector->js-array 'x)))
  (is (nil? (impl/vector->js-array nil))))

(deftest test-$
  (testing "in cljs env"
    (with-redefs [uix.lib/cljs-env? (fn [_] true)
                  ana/resolve-var (fn [_ _] nil)]
      (is (= (macroexpand-1 '(uix.core/$ :h1))
             '(uix.compiler.aot/>el "h1" (cljs.core/array nil) (cljs.core/array))))
      (is (= (macroexpand-1 '(uix.core/$ identity {} 1 2))
             '(uix.compiler.alpha/component-element identity (cljs.core/array {}) (cljs.core/array 1 2))))
      (is (= (macroexpand-1 '(uix.core/$ identity {:x 1 :ref 2} 1 2))
             '(uix.compiler.alpha/component-element identity (cljs.core/array {:x 1 :ref 2}) (cljs.core/array 1 2))))))
  (testing "in clj env"
    (is (= (macroexpand-1 '(uix.core/$ :h1))
           [:h1]))
    (is (= (macroexpand-1 '(uix.core/$ identity {} 1 2))
           '[identity {} 1 2]))
    (is (= (macroexpand-1 '(uix.core/$ identity {:x 1 :ref 2} 1 2))
           '[identity {:x 1 :ref 2} 1 2]))))

(defn test-linter [form expected-messages]
  (let [errors (atom [])
        _ (with-redefs [uix.lib/cljs-env? (fn [_] true)
                        ana/warning #(swap! errors conj %&)]
            (macroexpand-1 form))
        actual-messages (map (fn [[warning-type _ extra]]
                               (ana/error-message warning-type extra))
                             @errors)]
    (is (= actual-messages expected-messages))))

(deftest test-hooks
  (test-linter
   '(uix.core/use-effect identity)
   ["React Hook received a function whose dependencies are unknown. Pass an inline function instead.\n```\n(uix.core/use-effect identity)\n```"])
  (test-linter
   '(uix.core/use-effect identity [])
   ["React Hook received a function whose dependencies are unknown. Pass an inline function instead.\n```\n(uix.core/use-effect identity [])\n```"])
  (let [form `(uix.core/use-effect ~'(fn []) ~(JSValue. []))]
    (test-linter
     form
     [(str "React Hook was passed a dependency list that is a JavaScript array, instead of Clojure’s vector. Change it to be a vector literal.\n"
           (linter/ppr form))]))
  (test-linter
   `(uix.core/use-effect ~'(fn []) ~'coll)
   [(str "React Hook was passed a dependency list that is not a vector literal. This means we can’t statically verify whether you've passed the correct dependencies. Change it to be a vector literal with explicit set of dependencies.\n"
         (linter/ppr '(uix.core/use-effect (fn []) coll)))])
  (test-linter
   `(uix.core/use-effect ~'(fn []) [:kw])
   [(str "React Hook was passed literal values in dependency vector: [:kw]\nThose are not valid dependencies because they never change. You can safely remove them.\n"
         (linter/ppr '(uix.core/use-effect (fn []) [:kw])))]))
  ;; TODO: missing & unnecessary deps
  ;; TODO: set-state w/o deps

(uix.core/defui clj-component [props] props)
(deftest test-defui
  (is (= {:x 1} (clj-component {:x 1}))))

;; FIXME
#_#_
(uix.core/defui test-source-component [] "HELLO")
(deftest test-source
  (is (= (uix.core/source test-source-component)
         "(defui test-source-component []\n  \"HELLO\")")))

(deftest test-create-context
  (let [context (uix.core/create-context 1)]
    (is (== 1 context))))

(uix.core/defcontext *context* 1)

(deftest test-context
  (is (== 1 (uix.core/use-context *context*))))

(deftest test-$-context
  (let [[marker f children] (uix.core/$ *context* {:value 2} 1 2 3)]
    (is (= marker :uix/bind-context))
    (is (= [1 2 3] children))
    (is (= 2 (f (fn [] *context*))))))

(deftest test-as-react
  (is (identical? identity (uix.core/as-react identity))))

(deftest test-lazy
  (is (identical? identity (uix.core/lazy identity))))

(deftest test-memo
  (is (identical? identity (uix.core/memo identity))))

(deftest test-create-ref
  (is (instance? clojure.lang.Atom (uix.core/create-ref))))
