(ns uix.dom.test-runner
  (:require [clojure.test :refer :all]
            [uix.dom.server-test]))

(defn -main [& args]
  (run-tests
   'uix.dom.server-test))
