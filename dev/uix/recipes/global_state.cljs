(ns uix.recipes.global-state
  (:require [uix.core.alpha :as uix]))

(defonce db (atom {}))

(defn sub [f]
  (let [state (uix/state #(f @db))]
    (uix/layout-effect!
      (fn []
        (let [id (random-uuid)]
          (add-watch db id (fn [_ _ o n]
                             (let [of (f o)
                                   nf (f n)]
                               (when (not= of nf)
                                 (reset! state nf)))))
          #(remove-watch db id)))
      #js [f])
    (f @db)))

(defmulti handle-event (fn [db [event]] event))

(defmulti handle-fx (fn [db [event]] event))

(defmethod handle-fx :db [_ [_ db*]]
  (reset! db db*))

(defn dispatch [event]
  (let [effects (handle-event @db event)]
    (doseq [[event args] effects]
      (handle-fx @db [event args]))))

;; Usage

(defmethod handle-event :db/init [_ _]
  {:db {:value ""
        :repos []
        :loading? false
        :error nil}})

(defmethod handle-event :set-value [db [_ value]]
  {:db (assoc db :value value)})

(defmethod handle-event :fetch-repos [db [_ uname]]
  {:db (assoc db :loading? true)
   :http {:url (str "https://api.github.com/users/" uname "/repos")
          :on-ok :fetch-repos-ok
          :on-failed :fetch-repos-failed}})

(defmethod handle-event :fetch-repos-ok [db [_ repos]]
  (let [repos (map :name repos)]
    {:db (assoc db :repos repos :loading? false)}))

(defmethod handle-event :fetch-repos-failed [db [_ error]]
  {:db (assoc db :repos [] :loading? false :error error)})

(defmethod handle-fx :http [_ [_ {:keys [url on-ok on-failed]}]]
  (-> (js/fetch url)
      (.then #(.json %))
      (.then #(js->clj % :keywordize-keys true))
      (.then #(dispatch [on-ok %]))
      (.catch #(dispatch [on-failed %]))))

(defn recipe []
  (let [uname (sub :value)
        loading? (sub :loading?)
        error (sub :error)
        repos (sub :repos)]
    [:<>
     [:pre {:style {:white-space :normal}}
      "DB state: " (str @db)]
     [:div
      [:input {:value uname
               :placeholder "GitHub username"
               :on-change #(dispatch [:set-value (.. % -target -value)])}]
      [:button {:on-click #(dispatch [:fetch-repos uname])}
       "Fetch repos"]]
     (when loading?
       [:div "Loading repos for " uname "..."])
     (when error
       [:div {:style {:color "red"}}
        (.-message error)])
     (when (seq repos)
       [:ul
        (for [repo repos]
          ^{:key repo}
          [:li repo])])]))

(dispatch [:db/init])
