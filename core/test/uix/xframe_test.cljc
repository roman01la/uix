(ns uix.xframe-test
  (:require [clojure.test :refer [deftest is testing run-tests]]
            [xframe.core.alpha :as xf]))

(deftest test-reg-sub

  (testing "db subscription"
    (reset! xf/db {:x 1})
    (is (= {:x 1} (xf/<- [::xf/db]))))

  (testing "chain of subscriptions"
    (xf/reg-sub :db/x
      (fn []
        (:x (xf/<- [::xf/db]))))
    (xf/reg-sub :db/x-as-string
      (fn []
        (str (xf/<- [:db/x]))))
    (is (= "1" (xf/<- [:db/x-as-string]))))

  (testing "parameterized subscription"
    (reset! xf/db {:x [1 2 3 4]})
    (xf/reg-sub :x/nth
      (fn [n]
        (-> (xf/<- [::xf/db]) :x (nth n))))
    (is (= 1 (xf/<- [:x/nth 0])))
    (is (= 3 (xf/<- [:x/nth 2])))))

(defn -main []
  (run-tests))
