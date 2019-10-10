(ns xtools.core
  (:require [uix.core.alpha :as uix.core]
            [uix.dom.alpha :as uix.dom]
            [cljs.reader :as reader]))

(when ^boolean goog.DEBUG
  (let [fetch-update (fn []
                       (-> (js/fetch "http://localhost:3000/should-reload")
                           (.then #(.text %))
                           (.then #(when (= "true" %)
                                     (set! (.-href js/location) (.-href js/location))))
                           (.catch #(.error js/console %))))]
    (js/setInterval fetch-update 5000)))

(defn eval-js
  ([s]
   (eval-js s nil))
  ([s f]
   (.eval (.. js/chrome -devtools -inspectedWindow) s f)))

(eval-js "window.xframe.core.alpha.devtools_hook();")

(def state (atom {:subscriptions []}))

(defn check-state []
  (eval-js "window.__XTOOLS_HOOK__"
           (fn [d]
             (swap! state assoc :subscriptions
                    (reader/read-string (.-subscriptions d)))
             (swap! state assoc :refs
                    (.-refs d)))))

(check-state)
(js/setInterval check-state 5000)

(def ^:export enabled true)

(defn ^:export assoc-state! [& args]
  (apply swap! state assoc args))

(defn section-title [text]
  [:div {:style {:font-size "13px"
                 :text-transform :uppercase
                 :font-weight 600
                 :margin "8px 0"}}
   text])

(defn root [{:keys [subscriptions refs]}]
  [:div
   [:div
    [section-title "Registered subscriptions"]
    (for [s subscriptions]
      ^{:key (str s)}
      [:div (str s)])]
   [:div
    [section-title "Subscriptions graph"]
    (let [[ref refs] refs]
      [:div (str ref)
       (for [entry refs]
         [:div (str s)])])]])

(add-watch state ::state (fn [_ _ o n]
                           (when (not= o n)
                             (uix.dom/render [root n] js/root))))

(uix.dom/render [root @state] js/root)
