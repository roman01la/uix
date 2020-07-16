(ns uix.hooks-test
  (:require [clojure.test :refer [deftest is testing run-tests async]]
            [uix.hooks.alpha :as hooks :refer [maybe-js-deps]]
            [uix.core.alpha :as core]
            [uix.test-utils :as t]))

(deftest test-maybe-js-deps
  (is (.isArray js/Array (maybe-js-deps [])))
  (is (= (maybe-js-deps nil) js/undefined)))

(deftest test-state-hook
  (let [f-state (fn [done]
                  (let [state (core/state 1)]
                    (is (instance? hooks/StateHook state))
                    (is (or (== @state 1) (== @state 2)))
                    (if (== @state 2)
                      (done)
                      (is (== 2 (swap! state inc))))))]
    (async done
      (t/render [f-state done]))))

(deftest test-cursor-in-hook
  (let [f-state (fn [done]
                  (let [state (core/state {:x 1})
                        x (core/cursor-in state [:x])]
                    (is (instance? hooks/Cursor x))
                    (is (or (== @x 1) (== @x 2)))
                    (if (== @x 2)
                      (done)
                      (is (== 2 (swap! x inc))))))]
    (async done
      (t/render [f-state done]))))

(deftest test-state-hook-identity
  (let [f-state (fn [done]
                  (let [xs (core/state [])]
                    (if (< (count @xs) 2)
                      (swap! xs conj xs)
                      (let [[s1 s2] @xs]
                        (is (identical? s1 s2))
                        (done)))))]
    (async done
      (t/render [f-state done]))))

(deftest test-ref-hook-mutable
  (let [f-ref (fn [done]
                (let [ref (core/ref 1)]
                  (is (instance? hooks/RefHook ref))
                  (is (== @ref 1))
                  (is (== 2 (swap! ref inc)))
                  (is (== @ref 2))
                  (done)))]
    (async done
      (t/render [f-ref done]))))

(deftest test-ref-hook-memoized-instance
  (let [f-ref (fn [done]
                (let [ref (core/ref 1)
                      refs (core/state [])]
                  (if (< (count @refs) 2)
                    (swap! refs conj ref)
                    (let [[r1 r2] @refs]
                      (is (identical? r1 r2))
                      (done)))))]
    (async done
      (t/render [f-ref done]))))

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

