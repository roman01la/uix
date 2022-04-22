(ns uix.core-test
  (:require [clojure.test :refer :all]
            [uix.core]
            [uix.core.lazy-loader :refer [require-lazy]]
            [cljs.analyzer :as ana]
            [uix.hooks.linter :as linter])
  (:import (cljs.tagged_literals JSValue)))

(require-lazy '[clojure.string :refer [blank?]])

(deftest test-require-lazy
  (testing "Should refer a var from ns"
    (is (= blank? clojure.string/blank?)))

  (testing "Should fail to alias ns"
    (try
      (macroexpand-1 '(require-lazy '[clojure.string :as str]))
      (catch Exception e
        (is (some? e))))))

(deftest test-parse-sig
  (is (thrown-with-msg? AssertionError #"uix.core\/defui doesn't support multi-arity"
                        (uix.core/parse-sig 'component-name '(([props]) ([props x])))))
  (is (thrown-with-msg? AssertionError #"uix.core\/defui should be a single-arity component"
        (uix.core/parse-sig 'component-name '([props x])))))

(deftest test-$
  (is (= (macroexpand-1 '(uix.core/$ :h1))
         '(uix.compiler.aot/>el "h1" (cljs.core/array nil) (cljs.core/array))))
  (is (= (macroexpand-1 '(uix.core/$ :> identity {} 1 2))
         '(uix.compiler.aot/>el identity (cljs.core/array (cljs.core/js-obj)) (cljs.core/array 1 2))))
  (is (= (macroexpand-1 '(uix.core/$ :> identity {:x 1 :ref 2} 1 2))
         '(uix.compiler.aot/>el identity (cljs.core/array (js* "{'x':~{},'ref':~{}}" 1 2)) (cljs.core/array 1 2)))))

(defn test-linter [form expected-messages]
  (let [errors (atom [])
        _ (with-redefs [ana/warning #(swap! errors conj %&)]
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
  #_
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
