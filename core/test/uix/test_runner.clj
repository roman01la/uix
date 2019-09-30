(ns uix.test-runner
  (:require [clojure.test :refer :all]
            [uix.core-test]
            [uix.hooks-test]
            [uix.compiler-test]))

(defn -main [& args]
  (run-tests
    'uix.compiler-test
    'uix.core-test
    'uix.hooks-test))
