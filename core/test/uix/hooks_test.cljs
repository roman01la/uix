(ns uix.hooks-test
  (:require [clojure.test :refer [deftest is testing run-tests]]
            [uix.hooks.alpha :as hooks]
            [uix.test-utils :as t]
            [uix.compiler.alpha :as uixc]))

(defn f-state []
  (let [state (hooks/state 1)]
    (is (= @state 1))))

(deftest state-hook
  (t/as-string [f-state]))

(defn -main []
  (run-tests))

