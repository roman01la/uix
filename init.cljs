(require '[uix.core.alpha :as uix.core])
(require '[uix.dom.alpha :as uix.dom])
(require '[clojure.string :as str])

(defn fetch-repos [uname]
  (-> (js/fetch (str "https://api.github.com/users/" uname "/repos"))
      (.then #(.json %))
      (.then #(js->clj % :keywordize-keys true))))

(defn input [{:keys [value on-change placeholder]}]
  [:input {:value value
           :placeholder placeholder
           :on-change #(-> % .-target .-value on-change)
           :style {:display :flex
                   :font-size "16px"
                   :padding "4px 8px"
                   :border-radius 3
                   :border "1px solid blue"}}])

(defn button
  ([child]
   (button nil child))
  ([{:keys [on-click disabled?]} child]
   [:button {:on-click on-click
             :disabled disabled?
             :style {:padding "8px 12px"
                     :border-radius 3
                     :background-color :blue
                     :text-transform :uppercase
                     :font-weight 600
                     :color :white
                     :border :none}}
    child]))

(defn list-view [{:keys [data render-item key-fn]}]
  [:ul
   (for [item data]
     ^{:key (key-fn item)}
     [render-item item])])

(defn repo-item [{:keys [name html_url]}]
  [:li
   [:a {:href html_url} name]])

(defn example []
  (let [uname (uix.core/state "")
        repos (uix.core/state [])
        error (uix.core/state nil)
        loading? (uix.core/state false)
        handle-submit (fn [e]
                        (.preventDefault e)
                        (reset! loading? true)
                        (-> (fetch-repos @uname)
                            (.then #(do (reset! repos %)
                                        (reset! loading? false)
                                        (reset! error nil)))
                            (.catch #(do (reset! loading? false)
                                         (reset! error (.-message %))))))]
    [:<>
     [:form {:on-submit handle-submit}
      [input {:value @uname
              :placeholder "GitHub username"
              :on-change #(reset! uname %)}]
      [:div {:style {:margin-top 16}}
       [button {:disabled? (str/blank? @uname)}
        "Fetch repos"]]]
     (when @loading?
       [:div "Loading..."])
     (when-let [msg @error]
       [:div {:style {:padding "4px 12px"
                      :background-color "rgba(255, 0, 0, 0.1)"
                      :color :red
                      :border-radius 3}}
        msg])
     [list-view {:data @repos
                 :key-fn :name
                 :render-item repo-item}]]))


(uix.dom/render [example] (.getElementById js/document "viewRoot"))
