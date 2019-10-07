(ns ^:figwheel-hooks uix.recipes.global-state
  "This recipe shows how UIx apps can architect global data store
  and effects handling using Hooks API."
  (:require [uix.core.alpha :as uix]
            [xframe.core.alpha :as xf :refer [<sub]]
            #?(:cljs [cljs-bean.core :as bean])))

(defn ^:before-load before-load []
  (xf/unreg-all-subs))

;; Subscriptions
(xf/reg-sub :db
  (fn [db]
    db))

(xf/reg-sub :db/value
  (fn [db]
    (:value db)))

(xf/reg-sub :db/loading?
  (fn [db]
    (:loading? db)))

(xf/reg-sub :db/error
  (fn [db]
    (:error db)))

(xf/reg-sub :db/repos
  (fn [db]
    (:repos db)))

(xf/reg-sub :db/repos-count
  :<- [:db/repos]
  (fn [repos _]
    (count repos)))

(xf/reg-sub :repos/nth
  :<- [:db/repos]
  (fn [repos [_ idx]]
    (when (seq repos)
      (nth repos idx))))

;; Event handlers
(xf/reg-event-db :db/init
  (fn [_ _]
    {:value ""
     :repos []
     :loading? false
     :error nil}))

(xf/reg-event-db :set-value
   (fn [db [_ value]]
     (assoc db :value value)))

(xf/reg-event-fx :fetch-repos
  (fn [db [_ uname]]
    {:db (assoc db :loading? true)
     :http {:url (str "https://api.github.com/users/" uname "/repos")
            :on-ok :fetch-repos-ok
            :on-failed :fetch-repos-failed}}))

(xf/reg-event-db :fetch-repos-ok
  (fn [db [_ repos]]
    (let [repos (vec repos)]
      (assoc db :repos repos :loading? false :error nil))))

(xf/reg-event-db :fetch-repos-failed
  (fn [db [_ error]]
    (assoc db :loading? false :error error)))


;; Effect handlers
(xf/reg-fx :http
  (fn [_ [_ {:keys [url on-ok on-failed]}]]
    #?(:cljs
       (-> (js/fetch url)
           (.then #(if (.-ok %)
                     (.json %)
                     (xf/dispatch [on-failed %])))
           (.then bean/->clj)
           (.then #(xf/dispatch [on-ok %]))))))

;; UI components
(defn repo-item [idx]
  (let [{:keys [name description]} (<sub [:repos/nth idx])
        open? (uix/state false)]
    [:div {:on-click #(swap! open? not)
           :style {:padding 8
                   :margin "8px 0"
                   :border-radius 5
                   :background-color "#fff"
                   :box-shadow "0 0 12px rgba(0,0,0,0.1)"
                   :cursor :pointer}}
     [:div {:style {:font-size "16px"}}
      name]
     (when @open?
       [:div {:style {:margin "8px 0 0"}}
        description])]))

(defn recipe []
  (let [uname (<sub [:db/value])
        repos-count (<sub [:db/repos-count])
        loading? (<sub [:db/loading?])
        error (<sub [:db/error])]
    [:<>
     [:div
      [:input {:value uname
               :placeholder "GitHub username"
               :on-change #(xf/dispatch [:set-value (.. % -target -value)])}]
      [:button {:on-click #(xf/dispatch [:fetch-repos uname])}
       "Fetch repos"]]
     (when loading?
       [:div "Loading repos for " uname "..."])
     (when error
       [:div {:style {:color "red"}}
        (.-message error)])
     (when (pos? repos-count)
       [:div {:style {:width 240
                      :height 400
                      :overflow-y :auto}}
        (for [idx (range repos-count)]
          ^{:key idx} [repo-item idx])])]))


;; Init database
(defonce init-db
  (xf/dispatch [:db/init]))
