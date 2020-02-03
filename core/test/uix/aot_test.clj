(ns uix.aot-test
  (:require [clojure.test :refer :all]
            [uix.compiler.aot :as aot]
            [cljs.env :as env]
            [cljs.analyzer :as ana]
            [cljs.compiler :as cljsc]))

(deftest test-static-value?
  (is (aot/static-value? 1))
  (is (aot/static-value? 'cljs.core.uix_hoisted_))
  (is (= false (aot/static-value? 'x)))
  (is (aot/static-value? [1 :k "s"])))

(deftest test-static-element?
  (is (aot/static-element? :div {} [1 2 3]))
  (is (false? (aot/static-element? :div {:ref 1} [1 2 3]))))

(deftest test-gen-constant-id
  (is (= 'uix-hoisted-0 (aot/gen-constant-id 0))))

(deftest test-register-constant!
  (binding [env/*compiler* (atom {})]
    (aot/register-constant! {:ns {:name 'cljs.core}} 0)
    (is (= @env/*compiler*
           '{::ana/constant-table {0 uix-hoisted-0},
             ::ana/namespaces {cljs.core {::ana/constants {:seen #{0}, :order [0]}}}}))))

(deftest test-maybe-hoist
  (is (= 'cljs.core.uix_hoisted__576654167
         (binding [env/*compiler* (atom {:options {:optimize-constants true}})
                   aot/*cljs-env* {}]
           (aot/maybe-hoist [:h1] "h1" :h1 {} [1]))))
  (is (= (binding [env/*compiler* (atom {:options {:optimize-constants false}})
                   aot/*cljs-env* {}]
           (aot/maybe-hoist [:h1] "h1" :h1 {} [1]))
         "h1")))

(deftest test-compile-html
  (is (= (binding [env/*compiler* (atom {})]
           (aot/compile-html [:h1] {}))
         '(js*
            "{'$$typeof':~{},'type':~{},'ref':~{},'key':~{},'props':~{},'_owner':~{}}"
            (js* "Symbol.for(~{})" "react.element")
            "h1" nil nil (js* "{}") nil)))
  (is (= (binding [env/*compiler* (atom {:options {:optimize-constants true}})]
           (aot/compile-html [:h1] {}))
         'cljs.core.uix_hoisted__576654167))
  (is (= (binding [env/*compiler* (atom {})]
           (aot/compile-html '[:> x {} 1 2] {}))
         '(uix.compiler.aot/>el x nil [1 2])))
  (is (= (binding [env/*compiler* (atom {})]
           (aot/compile-html '[:> x {:x 1 :ref 2} 1 2] {}))
         '(uix.compiler.aot/>el x (js* "{'x':~{},'ref':~{}}" 1 (uix.compiler.alpha/unwrap-ref 2)) [1 2]))))
