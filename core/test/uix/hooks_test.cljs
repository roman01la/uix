(ns uix.hooks-test
  (:require [clojure.test :refer [deftest is testing run-tests async]]
            [uix.hooks.alpha :as hooks :refer [maybe-js-deps]]
            [uix.dom.alpha :as dom]
            [uix.test-utils :as t]))

(defn render [el]
  (let [root (.createElement js/document "div")]
    (.append (.getElementById js/document "root") root)
    (dom/render el root)))

(deftest test-maybe-js-deps
  (is (.isArray js/Array (maybe-js-deps [])))
  (is (= (maybe-js-deps nil) js/undefined)))

(deftest test-state-hook
  (let [f-state (fn [done]
                  (let [state (hooks/state 1)]
                    (is (instance? hooks/StateHook state))
                    (is (or (== @state 1) (== @state 2)))
                    (if (== @state 2)
                      (done)
                      (swap! state inc))))]
    (async done
      (render [f-state done]))))

(deftest test-ref-hook
  (let [f-ref (fn [done]
                (let [ref (hooks/ref 1)]
                  (is (instance? hooks/RefHook ref))
                  (is (== @ref 1))
                  (swap! ref inc)
                  (is (== @ref 2))
                  (done)))]
    (async done
      (render [f-ref done]))))

#_(deftest test-effect-hook
    (let [f-effect (fn [done]
                     (let [calls (hooks/state 0)]
                       (hooks/effect!
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

