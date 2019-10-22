(ns uix.xframe-test
  (:require [clojure.test :refer [deftest is testing run-tests]]
            [xframe.core.alpha :as xf]))

(deftest test-memoize-last-by
  (let [calls-n (atom 0)
        f (fn [[x y]]
            (swap! calls-n inc)
            (+ x y))
        f' (xf/memoize-last-by first next f)]
    (is (= 5 (f' 1 2 3)))
    (is (= 1 @calls-n))
    (is (= 5 (f' 1 2 3)))
    (is (= 1 @calls-n))
    (is (= 6 (f' 1 2 4)))
    (is (= 2 @calls-n))))

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
