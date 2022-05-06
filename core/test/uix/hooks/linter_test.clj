(ns uix.hooks.linter-test
  (:require [clojure.test :refer [deftest is testing]]
            [uix.hooks.linter :as hooks.linter])
  (:import (cljs.tagged_literals JSValue)))

;; === Rules of Hooks ===

(defn lint-syms [syms expr-fn]
  (binding [hooks.linter/*component-context* (atom {:errors []})]
    (let [exprs (map expr-fn syms)
          _ (hooks.linter/lint-hooks! exprs)
          errors (:errors @hooks.linter/*component-context*)]
      [exprs (map :source-context errors)])))

(deftest test-lint-when
  (testing "hook in a branch should error"
    (let [[exprs errors] (lint-syms
                          (:when hooks.linter/forms)
                          (fn [sym] (list sym 'x '(use-state 0))))]
      (is (= exprs errors))))
  (testing "hook in test expr should not error"
    (let [[exprs errors] (lint-syms
                          '[when when-not]
                          (fn [sym] (list sym '(use-state 0) 'x)))]
      (is (zero? (count errors)))))
  (testing "hook in test bindings should not error"
    (let [[exprs errors] (lint-syms
                          '[when-let when-some when-first]
                          (fn [sym] (list sym '[x (use-state 0)])))]
      (is (zero? (count errors))))))

(deftest test-lint-if
  (testing "hook in a branch should error"
    (let [[exprs errors] (lint-syms
                          (:if hooks.linter/forms)
                          (fn [sym] (list sym 'test 'x '(use-state 0))))]
      (is (= exprs errors))))
  (testing "hook in test expr should not error"
    (let [[exprs errors] (lint-syms
                          '[if if-not]
                          (fn [sym] (list sym '(use-state 0) 'then 'else)))]
      (is (zero? (count errors)))))
  (testing "hook in test expr should not error"
    (let [[exprs errors] (lint-syms
                          '[if-let if-some]
                          (fn [sym] (list sym '[x (use-state 0)] 'then 'else)))]
      (is (zero? (count errors))))))

(deftest test-lint-logical
  (testing "hook at the first test position should not error"
    (let [[exprs errors] (lint-syms
                          (:logical hooks.linter/forms)
                          (fn [sym] (list sym '(use-state 0) 'test)))]
      (is (zero? (count errors)))))
  (testing "hook at second+ test position should error"
    (let [[exprs errors] (lint-syms
                          (:logical hooks.linter/forms)
                          (fn [sym] (list sym 'test '(use-state 0))))]
      (is (= exprs errors)))))

(deftest test-lint-cond
  (testing "hook at the first test position should not error"
    (let [[exprs errors] (lint-syms
                          (:cond hooks.linter/forms)
                          (fn [sym] (list sym '(use-state 0) 'expr)))]
      (is (zero? (count errors)))))
  (testing "hook at second+ test position should error"
    (let [[exprs errors] (lint-syms
                          (:cond hooks.linter/forms)
                          (fn [sym] (list sym 'test 'expr '(use-state 0) 'expr)))]
      (is (= exprs errors))))
  (testing "hook at expr position should error"
    (let [[exprs errors] (lint-syms
                          (:cond hooks.linter/forms)
                          (fn [sym] (list sym 'test '(use-state 0))))]
      (is (= exprs errors)))))

(deftest test-lint-cond-threaded
  (testing "hook at expr position should not error"
    (let [[exprs errors] (lint-syms
                          (:cond-threaded hooks.linter/forms)
                          (fn [sym] (list sym '(use-state 0) 'test 'form)))]
      (is (zero? (count errors)))))
  (testing "hook at test position should not error"
    (let [[exprs errors] (lint-syms
                          (:cond-threaded hooks.linter/forms)
                          (fn [sym] (list sym 'expr '(use-state 0) 'form '(use-state 0) 'form)))]
      (is (zero? (count errors)))))
  (testing "hook at form position should error"
    (let [[exprs errors] (lint-syms
                          (:cond-threaded hooks.linter/forms)
                          (fn [sym] (list sym 'expr 'test '(use-state 0))))]
      (is (= exprs errors)))))

(deftest test-lint-some-threaded
  (testing "hook at expr position should not error"
    (let [[exprs errors] (lint-syms
                          (:some-threaded hooks.linter/forms)
                          (fn [sym] (list sym '(use-state 0) 'form 'form)))]
      (is (zero? (count errors)))))
  (testing "hook at the first form position should not error"
    (let [[exprs errors] (lint-syms
                          (:some-threaded hooks.linter/forms)
                          (fn [sym] (list sym 'expr '(use-state 0) 'form)))]
      (is (zero? (count errors)))))
  (testing "hook at second+ form position should error"
    (let [[exprs errors] (lint-syms
                          (:some-threaded hooks.linter/forms)
                          (fn [sym] (list sym 'expr 'form '(use-state 0))))]
      (is (= exprs errors)))))

(deftest test-lint-condp
  (testing "hook at predicate position should not error"
    (let [[exprs errors] (lint-syms
                          (:condp hooks.linter/forms)
                          (fn [sym] (list sym '(use-state 0) 'expr 'test 'form)))]
      (is (zero? (count errors)))))
  (testing "hook at expr position should not error"
    (let [[exprs errors] (lint-syms
                          (:condp hooks.linter/forms)
                          (fn [sym] (list sym 'pred '(use-state 0) 'test 'form)))]
      (is (zero? (count errors)))))
  (testing "hook at the first test position should not error"
    (let [[exprs errors] (lint-syms
                          (:condp hooks.linter/forms)
                          (fn [sym] (list sym 'pred 'expr '(use-state 0) 'form)))]
      (is (zero? (count errors)))))
  (testing "hook at second+ test position should error"
    (let [[exprs errors] (lint-syms
                          (:condp hooks.linter/forms)
                          (fn [sym] (list sym 'pred 'expr 'test 'form '(use-state 0) 'form)))]
      (is (= exprs errors))))
  (testing "hook at form position should error"
    (let [[exprs errors] (lint-syms
                          (:condp hooks.linter/forms)
                          (fn [sym] (list sym 'pred 'expr 'test '(use-state 0))))]
      (is (= exprs errors)))))

(deftest test-lint-case
  (testing "hook at expr position should not error"
    (let [[exprs errors] (lint-syms
                          (:case hooks.linter/forms)
                          (fn [sym] (list sym '(use-state 0) 'test 'form)))]
      (is (zero? (count errors)))))
  (testing "hook at the first test position should not error"
    (let [[exprs errors] (lint-syms
                          (:case hooks.linter/forms)
                          (fn [sym] (list sym 'expr '(use-state 0) 'form)))]
      (is (zero? (count errors)))))
  (testing "hook at second+ test position should error"
    (let [[exprs errors] (lint-syms
                          (:case hooks.linter/forms)
                          (fn [sym] (list sym 'expr 'test 'form '(use-state 0) 'form)))]
      (is (= exprs errors))))
  (testing "hook at form position should error"
    (let [[exprs errors] (lint-syms
                          (:case hooks.linter/forms)
                          (fn [sym] (list sym 'expr 'test '(use-state 0))))]
      (is (= exprs errors)))))

(deftest test-lint-loop
  (testing "hook at body position should error"
    (let [[exprs errors] (lint-syms
                          (:loop hooks.linter/forms)
                          (fn [sym] '(loop []
                                       (use-state 0))))]
      (is (= exprs errors))))
  (testing "hook at bindings position should not error"
    (let [[exprs errors] (lint-syms
                          (:loop hooks.linter/forms)
                          (fn [sym] '(loop [[x & xs] (use-state 0)])))]
      (is (zero? (count errors))))))

(deftest test-lint-for-doseq
  (testing "hook at body position should error"
    (let [[exprs errors] (lint-syms
                          (:for hooks.linter/forms)
                          (fn [sym] (list sym '[x xs]
                                          '(use-state 0))))]
      (is (= exprs errors))))
  (testing "hook at the first bindings position should not error"
    (let [[exprs errors] (lint-syms
                          (:for hooks.linter/forms)
                          (fn [sym] (list sym '[x (use-state 0)])))]
      (is (zero? (count errors)))))
  (testing "hook at second+ bindings position should error"
    (let [[exprs errors] (lint-syms
                          (:for hooks.linter/forms)
                          (fn [sym] (list sym '[x (use-state 0)
                                                y (use-state 0)])))]
      (is (= exprs errors))))
  (testing "hook at modifier position should error"
    (let [[exprs errors] (lint-syms
                          (:for hooks.linter/forms)
                          (fn [sym] (list sym '[x (use-state 0)
                                                :let [y (use-state 0)]])))]
      (is (= exprs errors)))))

(deftest test-lint-iterfn
  (let [syms (:iter-fn hooks.linter/forms)]
    (testing "hook at coll position should not error"
      (let [[exprs errors] (lint-syms syms (fn [sym] (list sym identity '(use-state 0))))]
        (is (zero? (count errors)))))
    (testing "hook at anonymous f position should error"
      (let [[exprs errors] (lint-syms syms (fn [sym] (list sym '(fn [x] (use-state x)) 'coll)))]
        (is (= exprs errors))))
    (testing "hook at anonymous f shorthand position should error"
      (let [[exprs errors] (lint-syms syms (fn [sym] (list sym '#(use-state %) 'coll)))]
        (is (= exprs errors))))))

;; === Exhaustive Deps ===

(deftest test-lint-exhaustive-deps
  (testing "should report on a function reference passed into a hook"
    (is (= '([:uix.hooks.linter/inline-function {:source (use-effect identity)}])
           (hooks.linter/lint-exhaustive-deps {} '(use-effect identity) 'identity nil)))
    (is (= '([:uix.hooks.linter/inline-function {:source (use-effect identity)}])
           (hooks.linter/lint-exhaustive-deps {} '(use-effect identity) 'identity []))))
  (testing "should report on deps being a JS array"
    (is (= '([:uix.hooks.linter/deps-array-literal {:source (use-effect (fn []) [])}])
           (hooks.linter/lint-exhaustive-deps {} '(use-effect (fn []) []) '(fn []) (JSValue. [])))))
  (testing "should report on deps being something else, rather than vector"
    (is (= '([:uix.hooks.linter/deps-coll-literal {:source (use-effect (fn []) coll)}])
           (hooks.linter/lint-exhaustive-deps {} '(use-effect (fn []) coll) '(fn []) 'coll))))
  (testing "should report on deps vector including a literal of a primitive type"
    (is (= '([:uix.hooks.linter/literal-value-in-deps {:source (use-effect (fn []) [:kw]), :literals (:kw)}])
           (hooks.linter/lint-exhaustive-deps {} '(use-effect (fn []) [:kw]) '(fn []) [:kw])))
    (is (= '([:uix.hooks.linter/literal-value-in-deps {:source (use-effect (fn []) [1]), :literals (1)}])
           (hooks.linter/lint-exhaustive-deps {} '(use-effect (fn []) [1]) '(fn []) [1])))
    (is (= '([:uix.hooks.linter/literal-value-in-deps {:source (use-effect (fn []) [":kw"]), :literals (":kw")}])
           (hooks.linter/lint-exhaustive-deps {} '(use-effect (fn []) [":kw"]) '(fn []) [":kw"])))
    (is (= '([:uix.hooks.linter/literal-value-in-deps {:source (use-effect (fn []) [nil]), :literals (nil)}])
           (hooks.linter/lint-exhaustive-deps {} '(use-effect (fn []) [nil]) '(fn []) [nil])))
    (is (= '([:uix.hooks.linter/literal-value-in-deps {:source (use-effect (fn []) [true]), :literals (true)}])
           (hooks.linter/lint-exhaustive-deps {} '(use-effect (fn []) [true]) '(fn []) [true])))))
