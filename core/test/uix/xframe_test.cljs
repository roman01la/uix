(ns uix.xframe-test
  (:require [clojure.test :refer [deftest is testing run-tests async]]
            [xframe.core.alpha :as xf]
            [clojure.string :as str]))

(deftest test-lazy-ref

  (testing "should fail"
    (let [thrown? (atom false)]
      (try
        (xf/lazy-ref 0)
        (catch :default e
          (reset! thrown? (str/includes? (.-message e) "is not a function"))))
      (is @thrown?)))

  (testing "no deps"
    (let [ref (xf/ref! 0)]
      (is (= 0 @ref))
      (xf/set-ref! ref 1)
      (is (= 1 @ref))))

  (testing "with deps"
    (let [ref1 (xf/ref! 4)
          ref2 (xf/ref! 6)
          ref (xf/lazy-ref (fn [[r1 r2]]
                             (+ r1 r2))
                           [ref1 ref2])]
      (is (= 10 @ref))
      (xf/set-ref! ref1 8)
      (is (= 14 @ref)))))

(deftest test-reg-sub

  (testing "db subscription"
    (xf/reg-sub :db
      (fn [db [_ x]]
        [db x]))
    (xf/set-ref! xf/db {:x 1})
    (is (= [{:x 1} 2] @(xf/subscribe [:db 2]))))

  (testing "chain of subscriptions"
    (xf/reg-sub :db/x
      (fn [db]
        (:x db)))
    (xf/reg-sub :db/x-as-string
      :<- [:db/x]
      (fn [x]
        (str x)))
    (is (= "1" @(xf/subscribe [:db/x-as-string])))))

(defn -main []
  (run-tests))
