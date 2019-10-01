(ns uix.test-runner
  (:require [clojure.test :refer :all]
            [uix.core-test]
            [uix.hooks-test]
            [uix.ssr-test]))

(defn -main [& args]
  (run-tests
    #_'uix.ssr-test
    'uix.core-test
    'uix.hooks-test))
