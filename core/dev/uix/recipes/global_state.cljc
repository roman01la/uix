(ns uix.recipes.global-state
  "This recipe shows how UIx apps can architect global data store
  and effects handling using Hooks API."
  (:require [uix.core.alpha :as uix :refer [defui]]
            [xframe.core.alpha :as xf :refer [<sub]]
            #?(:cljs [cljs-bean.core :as bean])))

;; Subscriptions
(xf/reg-sub :db/repos
  (fn []
    (:repos (xf/<- [::xf/db]))))

(xf/reg-sub :repos/value
  (fn []
    (:value (xf/<- [:db/repos]))))

(xf/reg-sub :repos/loading?
  (fn []
    (:loading? (xf/<- [:db/repos]))))

(xf/reg-sub :repos/error
  (fn []
    (:error (xf/<- [:db/repos]))))

(xf/reg-sub :repos/items
  (fn []
    (:items (xf/<- [:db/repos]))))

(xf/reg-sub :repos/count
  (fn []
    (count (xf/<- [:repos/items]))))

(xf/reg-sub :repos/nth-item
  (fn [idx]
    (let [items (xf/<- [:repos/items])]
      (when (seq items)
        (nth items idx)))))

;; Event handlers
(xf/reg-event-db :db/init
  (fn [_ _]
    {:repos {:value ""
             :items []
             :loading? false
             :error nil}}))

(xf/reg-event-db :set-value
  (fn [db [_ value]]
    (assoc-in db [:repos :value] value)))

(xf/reg-event-fx :fetch-repos
  (fn [db [_ uname]]
    {:db (assoc-in db [:repos :loading?] true)
     :http {:url (str "https://api.github.com/users/" uname "/repos")
            :on-ok :fetch-repos-ok
            :on-failed :fetch-repos-failed}}))

(xf/reg-event-db :fetch-repos-ok
  (fn [db [_ repos]]
    (let [repos (vec repos)]
      (update db :repos assoc :items repos :loading? false :error nil))))

(xf/reg-event-db :fetch-repos-failed
  (fn [db [_ error]]
    (update db :repos assoc :loading? false :error error)))


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
  (let [{:keys [name description]} (<sub [:repos/nth-item idx])
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

(defui form []
  (let [uname (<sub [:repos/value])]
    [:form {:on-submit #(do
                          (.preventDefault %)
                          (xf/dispatch [:fetch-repos uname]))}
     [:input {:value uname
              :placeholder "GitHub username"
              :on-change #(xf/dispatch [:set-value (.. % -target -value)])}]
     [:button
      "Fetch repos"]]))

(defn repos-list []
  (let [repos-count (<sub [:repos/count])]
    (when (pos? repos-count)
      [:div {:style {:width 240
                     :height 400
                     :overflow-y :auto}}
       (for [idx (range repos-count)]
         ^{:key idx} [repo-item idx])])))

(defn recipe []
  (let [loading? (<sub [:repos/loading?])
        error (<sub [:repos/error])]
    [:<>
     [form]
     (when loading?
       [:div "Loading repos..."])
     (when error
       [:div {:style {:color "red"}}
        (.-message error)])
     [repos-list]]))


;; Init database
(defonce init-db
  (xf/dispatch [:db/init]))
