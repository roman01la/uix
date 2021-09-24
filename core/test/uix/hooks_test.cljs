(ns uix.hooks-test
  (:require [clojure.test :refer [deftest is testing run-tests async]]
            [uix.hooks.alpha :as hooks :refer [maybe-js-deps]]
            [uix.core.alpha :as core]
            [uix.test-utils :as t]))

(deftest test-maybe-js-deps
  (is (.isArray js/Array (maybe-js-deps [])))
  (is (= (maybe-js-deps nil) js/undefined)))

(deftest test-state-hook
  (core/defui test-state-hook-comp [{:keys [done]}]
    (let [state (core/state 1)]
      (is (instance? hooks/StateHook state))
      (is (or (== @state 1) (== @state 2)))
      (if (== @state 2)
        (done)
        (swap! state inc))))
  (async done
    (t/render #el [test-state-hook-comp {:done done}])))

(deftest test-cursor-in-hook
  (core/defui test-cursor-in-hook-comp [{:keys [done]}]
    (let [state (core/state {:x 1})
          x (core/cursor-in state [:x])]
      (is (instance? hooks/Cursor x))
      (is (or (== @x 1) (== @x 2)))
      (if (== @x 2)
        (done)
        (swap! x inc))))
  (async done
    (t/render #el [test-cursor-in-hook-comp {:done done}])))

(deftest test-state-hook-identity
  (core/defui test-state-hook-identity-comp [{:keys [done]}]
    (let [xs (core/state [])]
      (if (< (count @xs) 2)
        (swap! xs conj xs)
        (let [[s1 s2] @xs]
          (is (identical? s1 s2))
          (done)))))
  (async done
    (t/render #el [test-state-hook-identity-comp {:done done}])))

(deftest test-ref-hook-mutable
  (core/defui test-ref-hook-mutable-comp [{:keys [done]}]
    (let [ref (core/ref 1)]
      (is (instance? hooks/RefHook ref))
      (is (== @ref 1))
      (swap! ref inc)
      (is (== @ref 2))
      (done)))
  (async done
    (t/render #el [test-ref-hook-mutable-comp {:done done}])))

(deftest test-ref-hook-memoized-instance
  (core/defui test-ref-hook-memoized-instance-comp [{:keys [done]}]
    (let [ref (core/ref 1)
          refs (core/state [])]
      (if (< (count @refs) 2)
        (swap! refs conj ref)
        (let [[r1 r2] @refs]
          (is (identical? r1 r2))
          (done)))))
  (async done
    (t/render #el [test-ref-hook-memoized-instance-comp {:done done}])))

#_(deftest test-effect-hook
    (let [f-effect (fn [done]
                     (let [calls (core/state 0)]
                       (core/effect!
                         (fn []
                           (if (== 0 @calls)
                             (swap! calls inc)
                             (do (is (== @calls 1))
                                 (done)))))
                       @calls))]
      (async done
        (render [f-effect done]))))

(defn -main []
  (run-tests))

