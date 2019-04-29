(ns ^:figwheel-hooks uix.example
  (:require [uix.core.alpha :as uix :refer-macros [html require-lazy]]
            [uix.hooks.alpha :as hooks]
            [cljs.spec.alpha :as s]
            [cljs.spec.test.alpha :as stest]
            [clojure.string :as string]))

(s/def :button/disabled? boolean?)
(s/def :button/on-click fn?)

(s/fdef button
  :args (s/cat :attrs (s/keys :req-un [:button/disabled?]
                              :opt-un [:button/on-click])
               :text string?))

(s/def :input/value string?)
(s/def :input/on-change fn?)

(s/fdef input
  :args (s/cat :attrs (s/keys :req-un [:input/value :input/on-change])))

(s/fdef fetch-repos
  :args (s/cat :uname string?))


(require-lazy '[uix.components :refer [ui-list]])


(defn js-obj? [x]
  (identical? "object" (goog/typeOf x)))

(defn button [{:keys [on-click disabled?]} text]
  [:button {:on-click on-click
            :disabled disabled?
            :style {:padding "10px 24px"
                    :font-size "15px"
                    :border "none"
                    :border-radius "3px"
                    :background "blue"
                    :color "white"
                    :font-weight 500
                    :text-transform "uppercase"}}
   text])

(defn input [{:keys [value on-change]}]
  [:input {:value value
           :on-change #(on-change (.. % -target -value))
           :style {:padding 8
                   :font-size "15px"
                   :border "1px solid #eee"
                   :color "#000"
                   :border-radius "3px"
                   :outline "none"}}])

(defn fetch-repos [uname]
  (-> (js/fetch (str "https://api.github.com/users/" uname "/repos"))
      (.then #(.json %))
      (.then #(js->clj % :keywordize-keys true))))

(defn app []
  (let [state (hooks/state {:uname ""
                            :repos []
                            :loading? false})
        {:keys [uname repos loading?]} @state]
    [:div {:style {:display "flex"
                   :flex-direction "column"
                   :align-items "center"
                   :padding "16px 0"}}
     [:form {:style {:display "flex"}
             :on-submit (fn [e]
                          (.preventDefault e)
                          (swap! state assoc :loading? true)
                          (-> (fetch-repos uname)
                              (.then #(swap! state assoc
                                             :loading? false
                                             :repos %))))}
      [input {:value uname
              :on-change #(swap! state assoc :uname %)}]
      [:div {:style {:margin "0 0 0 8px"}}
       [button {:disabled? (string/blank? uname)}
        "Submit"]]]
     (when loading?
       [:div {:style {:padding 16}}
        "Loading..."])
     [:# {:fallback "loading"}
      (when (seq repos)
        [ui-list {:items repos}
         (fn [{:keys [name]}]
           ^{:key name}
           [:li {:style {:padding 4
                         :border-bottom "1px solid #000"}}
            name])])]]))

(defonce root
  (uix/create-root js/root))

(defn ^:export renderApp []
  (uix/render-root [app] root))

(defn ^:after-load -render []
  (renderApp))

(stest/instrument)

(uix/set-loaded! :example)
