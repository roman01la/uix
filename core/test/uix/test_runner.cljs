(ns uix.test-runner
  (:require [cljs.test]
            [uix.aot-test]
            [uix.core-test]
            [uix.compiler-test]
            [uix.hooks-test]))

(defmethod cljs.test/report [::cljs.test/default :summary] [m]
  (println "\nRan" (:test m) "tests containing"
           (+ (:pass m) (:fail m) (:error m)) "assertions.")
  (println (:fail m) "failures," (:error m) "errors.")
  (when (pos? (:fail m))
    (js/testsFailed (:fail m)))
  (js/testsDone))

(cljs.test/run-tests
 (cljs.test/empty-env)
 'uix.aot-test
 'uix.core-test
 'uix.compiler-test
 'uix.hooks-test)
