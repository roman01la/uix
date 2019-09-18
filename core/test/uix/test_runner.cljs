(ns uix.test-runner
  (:require [clojure.test]
            [uix.core-test]
            [uix.compiler-test]))

(defn -main []
  (clojure.test/run-tests
    (clojure.test/empty-env)
    'uix.core-test
    'uix.compiler-test))
