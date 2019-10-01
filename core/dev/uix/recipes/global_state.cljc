(ns uix.recipes.global-state
  "This recipe shows how UIx apps can architect global data store
  and effects handling using Hooks API."
  (:require [uix.core.alpha :as uix]
            #?(:cljs [cljs-bean.core :as bean])
            #?(:cljs [react-dom :as rdom])))

;; Database subscription hook
;; https://github.com/facebook/react/tree/master/packages/use-subscription#subscribing-to-event-dispatchers
(defn subscribe* [ref]
  #?(:clj  @ref
     :cljs (uix/subscribe
             (uix/memo
               (fn []
                 {:get-current-value (fn [] @ref)
                  :subscribe (fn [callback]
                               (let [id (random-uuid)]
                                 (add-watch ref id callback)
                                 #(remove-watch ref id)))})
               #js [ref]))))

;; Global database
(defonce db (atom {}))

(def db-subs (atom {}))

#?(:cljs
    (deftype SubRef [ref]
      IDeref
      (-deref [o]
        (subscribe* ref))))

(defn derive-ref [ref f]
  #?(:clj (atom (f @ref))
     :cljs (let [sref (atom (f @ref))]
             (add-watch ref f (fn [_ _ _ n]
                                (let [nv (f n)]
                                  (when (not= nv @sref)
                                    (reset! sref nv)))))
             (SubRef. sref))))

(defn reg-sub [name f]
  (swap! db-subs assoc name f))

(defn subscribe [[name :as s]]
  (let [f (get @db-subs name)]
    (assert f (str "Subscription " name " is not found"))
    (derive-ref db #(f % s))))

;; Event handler
(defmulti handle-event (fn [db [event]] event))

;; Effect handler
(defmulti handle-fx (fn [db [event]] event))

(defmethod handle-fx :db [_ [_ db*]]
  (reset! db db*))

;; Event dispatcher
(defn dispatch [event]
  #?(:cljs (js/console.log :event event))
  (let [effects (handle-event @db event)]
    (doseq [[event args] effects]
      (handle-fx @db [event args]))))

;; ==== Usage ====

;; Subscriptions
(reg-sub :db/value
  (fn [db]
    (:value db)))

(reg-sub :db/loading?
  (fn [db]
    (:loading? db)))

(reg-sub :db/error
  (fn [db]
    (:error db)))

(reg-sub :db/repos
  (fn [db]
    (:repos db)))

(reg-sub :db/nth-repo
  (fn [db [_ idx]]
    (when (seq (:repos db))
      (nth (:repos db) idx))))

;; Event handlers
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
  (let [repos (mapv :name repos)]
    {:db (assoc db :repos repos :loading? false)}))

(defmethod handle-event :fetch-repos-failed [db [_ error]]
  {:db (assoc db :repos [] :loading? false :error error)})


;; Effect handlers
(defmethod handle-fx :http [_ [_ {:keys [url on-ok on-failed]}]]
  #?(:cljs
     (-> (js/fetch url)
         (.then #(if (.-ok %)
                   (.json %)
                   (throw (.-statusText %))))
         (.then bean/->clj)
         (.then #(dispatch [on-ok %]))
         (.catch #(dispatch [on-failed %])))))

;; UI component
(defn recipe []
  (let [uname @(subscribe [:db/value])
        loading? @(subscribe [:db/loading?])
        error @(subscribe [:db/error])
        repos @(subscribe [:db/repos])
        repo3 @(subscribe [:db/nth-repo 3])]
    (println repo3)
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

;; Init database
(defonce init-db
  (dispatch [:db/init]))
