(ns uix.recipes.global-state
  "This recipe shows how UIx apps can architect global data store
  and effects handling using Hooks API."
  (:require [uix.core.alpha :as uix]
            #?(:cljs [cljs-bean.core :as bean])
            #?(:cljs [react-dom :as rdom])))

;; Global database
(defonce db (atom {}))

;; Database subscription hook
;; https://github.com/facebook/react/tree/master/packages/use-subscription#subscribing-to-event-dispatchers
(def sub
  (let [!id (atom 0)]
    (fn [f]
      #?(:clj (f @db)
         :cljs (uix/subscribe
                 (uix/memo
                   (fn []
                     {:get-current-value #(f @db)
                      :subscribe (fn [callback]
                                   (let [id (swap! !id inc)]
                                     (add-watch db id #(when (not= (f %3) (f %4))
                                                         (callback)))
                                     #(remove-watch db id)))})
                   [f]))))))

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
  (let [repos (map :name repos)]
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

;; Init database
(defonce init-db
  (dispatch [:db/init]))
