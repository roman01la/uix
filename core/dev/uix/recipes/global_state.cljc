(ns uix.recipes.global-state
  "This recipe shows how UIx apps can architect global data store
  and effects handling using Hooks API."
  #?(:cljs (:require-macros [uix.recipes.global-state :refer [<sub]]))
  (:require [uix.core.alpha :as uix]
            #?(:cljs [cljs-bean.core :as bean])
            #?(:cljs [react-dom :as rdom])))

(defprotocol ILazyRef)

#?(:cljs
   (deftype LazyRef [^:mutable f]
     ILazyRef
     IDeref
     (-deref [o]
       ;; TODO: memoize
       (f))
     IReset
     (-reset! [o new-value]
       (set! f new-value))))

#?(:clj
   (deftype LazyRef [f]
     ILazyRef))

(defn lazy-ref [v]
  (LazyRef. (if (fn? v) v (constantly v))))

;; Global database
(defonce db (lazy-ref {}))

(def subs-registry (volatile! {}))
(def refs-cache (volatile! {}))

#?(:cljs
    (def subs-in-order (volatile! #js [])))

(defn notify-listeners! []
  #?(:cljs (run! (fn [f] (f)) @subs-in-order)))

;; Database subscription hook
;; https://github.com/facebook/react/tree/master/packages/use-subscription#subscribing-to-event-dispatchers
(defn subscribe-ref [ref key]
  #?(:clj  @ref
     :cljs (uix/subscribe
             (uix/memo
               (fn []
                 {:get-current-value (fn [] @ref)
                  :subscribe (fn [callback]
                               (.push @subs-in-order callback)
                               (fn []
                                 (let [idx (.indexOf @subs-in-order callback)]
                                   (when-not (neg? idx)
                                     (vswap! subs-in-order #(.splice % idx 1))))))})
               #js [ref]))))

(defn force-refs! [refs]
  (cond
    (sequential? refs) (map deref refs)
    #?@(:cljs [(satisfies? IDeref refs) (-deref refs)]
        :clj [(instance? clojure.lang.IDeref refs) (deref refs)])
    :else '()))

(defn ref-sink [refs f]
  (lazy-ref #(f (force-refs! refs))))

(defn create-sub-with-cache [s f deps-f]
  (if-let [ref (get @refs-cache s)]
    ref
    (let [ref (ref-sink (deps-f s) #(f % s))]
      (vswap! refs-cache assoc s ref)
      ref)))

(defn subscribe [[sub-name :as s]]
  (let [[f deps-f] (get @subs-registry sub-name)]
    (assert f (str "Subscription " sub-name " is not found"))
    (create-sub-with-cache s f deps-f)))

(defmacro <sub [s]
  `(let [s# ~s]
     (subscribe-ref (uix.core.alpha/memo #(subscribe s#) [s#]) s#)))

;; https://github.com/Day8/re-frame/blob/master/src/re_frame/subs.cljc#L200
(defn reg-sub [sub-name & args]
  (let [f (last args)
        input-args (butlast args)
        deps-f (case #?(:cljs (-count input-args)
                        :clj (count input-args))
                 0 (fn
                     ([_] db)
                     ([_ _] db))

                 1 (let [f (first input-args)]
                     (assert (fn? f) (str "2nd argument expected to be an inputs function, got: " f))
                     f)

                 2 (let [[marker v] input-args]
                     (assert #?(:cljs (keyword-identical? :<- marker)
                                :clj (= :<- marker))
                             (str "expected :<-, got: " marker))
                     (fn inp-fn
                       ([_] (subscribe v))
                       ([_ _] (subscribe v))))

                 (let [pairs (partition 2 input-args)
                       markers (map first pairs)
                       vecs    (map last pairs)]
                   (assert (and (every? #{:<-} markers) (every? vector? vecs))
                           (str "expected pairs of :<- and vectors, got: " pairs))
                   (fn inp-fn
                     ([_] (map subscribe vecs))
                     ([_ _] (map subscribe vecs)))))]
    (vswap! subs-registry assoc sub-name [f deps-f])))

;; Event handler
(defmulti handle-event (fn [db [event]] event))

;; Effect handler
(defmulti handle-fx (fn [db [event]] event))

(defmethod handle-fx :db [_ [_ db*]]
  (reset! db (constantly db*))
  (notify-listeners!))

;; Event dispatcher
(defn dispatch [event]
  #?(:cljs
     (when ^boolean goog.DEBUG
       (js/console.log event)))
  (let [effects (handle-event @db event)]
    (doseq [[event args] effects]
      (handle-fx @db [event args]))))

;; ==== Usage ====

;; Subscriptions
(reg-sub :db
  (fn [db]
    db))

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

(reg-sub :db/repos-count
  :<- [:db/repos]
  (fn [repos _]
    (count repos)))

(reg-sub :repos/nth
  :<- [:db/repos]
  (fn [repos [_ idx]]
    (when (seq repos)
      (nth repos idx))))

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
  (let [repos (vec repos)]
    {:db (assoc db :repos repos :loading? false :error nil)}))

(defmethod handle-event :fetch-repos-failed [db [_ error]]
  {:db (assoc db :loading? false :error error)})


;; Effect handlers
(defmethod handle-fx :http [_ [_ {:keys [url on-ok on-failed]}]]
  #?(:cljs
     (-> (js/fetch url)
         (.then #(if (.-ok %)
                   (.json %)
                   (dispatch [on-failed %])))
         (.then bean/->clj)
         (.then #(dispatch [on-ok %])))))

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
               :on-change #(dispatch [:set-value (.. % -target -value)])}]
      [:button {:on-click #(dispatch [:fetch-repos uname])}
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
  (dispatch [:db/init]))
