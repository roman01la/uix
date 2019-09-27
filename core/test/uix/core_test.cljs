(ns uix.core-test
  (:require [clojure.test :refer [deftest is async testing run-tests]]
            [uix.core.alpha :as uix.core :refer-macros [with-let require-lazy html defui]]
            [react :as r]
            [uix.test-utils :as t]
            [cljs-bean.core :as bean]))

(deftest test-strict-mode
  (is (= (uix.core/strict-mode 1) [:> r/StrictMode 1])))

(deftest test-create-ref
  (let [ref (uix.core/create-ref 1)]
    (is (= (type ref) uix.core/ReactRef))
    (is (= @ref 1))))

(deftest test-default-compare-args
  (is (uix.core/default-compare-args #js {:argv 1} #js {:argv 1})))

(deftest test-memoize
  (let [f (uix.core/memoize (fn [x]
                              (is (= 1 x))
                              [:h1 x]))]
    (is (t/react-element-of-type? f "react.memo"))
    (is (= "<h1>1</h1>" (t/as-string [f 1])))))

#_(deftest test-require-lazy
    (require-lazy '[uix.core.alpha :refer [strict-mode]])
    (is (t/react-element-of-type? strict-mode "react.lazy")))

(deftest test-html
  (is (t/react-element-of-type? (html [:h1 1]) "react.element")))

(deftest test-defui
  (defui h1 [child]
    [:h1 ^:inline child])
  (is (= (t/as-string [h1 1]) "<h1>1</h1>")))

(deftest test-as-element
  (is (-> (uix.core/as-element [:h1 1])
          (t/react-element-of-type? "react.element"))))

(deftest test-as-react
  (let [ctor (fn [props]
               (is (= @#'bean/Bean (type props)))
               (:x props))
        ftype (-> (uix.core/as-react ctor)
                  ^js (r/createElement)
                  .-type)]
    (is (= (ftype #js {:x 1}) 1))))

(deftest test-with-let
  (let [v (atom 9)
        f (fn [done]
            (let [called?* (uix.core/state false)]
              (with-let [x 1
                         {:keys [y]} {:y 2}
                         z (swap! v inc)] ;; should eval only once
                        (is (= 1 x))
                        (is (= 2 y))
                        (is (= 10 z))
                        (if @called?*
                          (done)
                          (reset! called?* true)))))]
    (async done
      (t/render [f done]))))

(deftest test-create-error-boundary-1
  (let [error->state-called? (atom false)
        handle-catch-called? (atom false)
        err-b (uix.core/create-error-boundary
                {:display-name "err-b-1"
                 :error->state #(reset! error->state-called? true)
                 :handle-catch #(reset! handle-catch-called? true)}
                (fn [err [done x]]
                  (is (= nil @err))
                  (is (= 1 x))
                  (is (= false @error->state-called?))
                  (is (= false @handle-catch-called?))
                  (done)
                  x))]
    (async done
      (t/render [err-b done 1]))))

(deftest test-create-error-boundary-2
  (let [handle-catch (atom nil)
        child (fn [] (throw (js/Error. "Hello!")))
        err-b (uix.core/create-error-boundary
                {:display-name "err-b-2"
                 :error->state ex-message
                 :handle-catch (fn [err info] (reset! handle-catch err))}
                (fn [cause [done x child]]
                  (is (= 1 x))
                  (cond
                    (nil? @cause) child
                    
                    (= :recover @cause)
                    (do
                      (is (some? @handle-catch))
                      (done)
                      x)
                    
                    :else (do (is (= "Hello!" @cause))
                              (js/setTimeout #(reset! cause :recover) 20)
                              x))))]
    (async done
      (t/render [err-b done 1 [child]]))))

(defn -main []
  (run-tests))
