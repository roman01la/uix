(ns uix.test-runner
  (:require [cljs.test]
            [uix.core-test]
            [uix.compiler-test]
            [uix.hooks-test]))

(defmethod cljs.test/report [::cljs.test/default :summary] [m]
  (when (pos? (:fail m))
    (js/testsFailed (:fail m)))
  (when (pos? (:error m))
    (js/testsErrored (:error m))))

(cljs.test/run-tests
  (cljs.test/empty-env)
  'uix.core-test
  'uix.compiler-test
  'uix.hooks-test)
