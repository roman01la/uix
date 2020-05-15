(ns uix.core-test
  (:require [clojure.test :refer [deftest is async testing run-tests]]
            [uix.core.alpha :as uix.core :refer [html defui defcontext]]
            ;[uix.core.lazy-loader :refer [require-lazy]]
            [uix.lib]
            [react :as r]
            [uix.test-utils :as t]
            [cljs-bean.core :as bean]
            [clojure.string :as str]))

(deftest test-lib
  (is (= (seq (uix.lib/re-seq* (re-pattern "foo") "foo bar foo baz foo zot"))
         (list "foo" "foo" "foo")))

  (is (= (map vec (uix.lib/re-seq* (re-pattern "f(.)o") "foo bar foo baz foo zot"))
         (list ["foo" "o"] ["foo" "o"] ["foo" "o"])))

  (is (= '("") (seq (uix.lib/re-seq* #"\s*" "")))))

(deftest test-strict-mode
  (is (= (uix.core/strict-mode 1) [:> r/StrictMode 1])))

(deftest test-create-ref
  (let [ref (uix.core/create-ref 1)]
    (is (= (type ref) uix.core/ReactRef))
    (is (= @ref 1))))

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

(deftest test-context
  (defcontext *ctx* 0)
  (let [child-component (fn [done]
                          (let [v (uix.core/context *ctx*)]
                            (is (== v 1))
                            (done)
                            v))
        component (fn [done]
                    (uix.core/context-provider [*ctx* 1]
                      [child-component done]))]
    (async done
      (t/render [component done]))))

(deftest test-no-memoize
  (let [f (fn [])
        _ (uix.core/no-memoize! f)
        el (uix.core/as-element [f])]
    (is (= true (.-uix-no-memo f)))
    (when ^boolean goog.DEBUG
      (is (not (str/starts-with? (.. ^js el -type -displayName) "memo("))))
    (is (not (identical? (.for js/Symbol "react.memo") (aget (.-type el) "$$typeof"))))))

(defn -main []
  (run-tests))
