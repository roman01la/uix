(ns ^:figwheel-hooks uix.example
  (:require [uix.core.alpha :as uix :refer-macros [html require-lazy]]
            [cljs.spec.alpha :as s]
            [cljs.spec.test.alpha :as stest]
            [clojure.string :as string]
            [uix.state.alpha :as st]))

(require-lazy '[uix.components :refer [ui-list]])


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


(defmethod st/handle-fx :fx/http [_ {:keys [url on-success]}]
  (-> (js/fetch url)
      (.then #(.json %))
      (.then #(st/dispatch [on-success (js->clj % :keywordize-keys true)]))))

(defmethod st/handle-event :db/init [db _]
  {:db (assoc db :repos []
                 :uname ""
                 :loading? false)})

(defmethod st/handle-event :repos/fetch [db [_ uname]]
  {:db (assoc db :loading? true)
   :fx/http {:url (str "https://api.github.com/users/" uname "/repos")
             :on-success :repos/fetch-ok}})

(defmethod st/handle-event :repos/fetch-ok [db [_ repos]]
  {:db (assoc db :repos repos :loading? false)})

(defmethod st/handle-event :repos/uname [db [_ uname]]
  {:db (assoc db :uname uname)})


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

(defn app []
  (let [{:keys [uname repos loading?]} (st/subscribe identity)]
    [:div {:style {:display "flex"
                   :flex-direction "column"
                   :align-items "center"
                   :padding "16px 0"}}
     [:form {:style {:display "flex"}
             :on-submit (fn [e]
                          (.preventDefault e)
                          (st/dispatch [:repos/fetch uname]))}
      [input {:value uname
              :on-change #(st/dispatch [:repos/uname %])}]
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

(st/dispatch [:db/init])

(uix/set-loaded! :example)
