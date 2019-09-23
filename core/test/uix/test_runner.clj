(ns uix.test-runner
  (:require [clojure.test :refer :all]
            [uix.core-test]
            [uix.hooks-test]))

(defn -main [& args]
  (run-tests
    'uix.core-test
    'uix.hooks-test))
