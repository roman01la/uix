(ns ^:figwheel-hooks uix.example
  (:require #?(:cljs [uix.core.alpha :as uix :refer-macros [defui require-lazy]]
               :clj [uix.core.alpha :as uix :refer [defui require-lazy]])
            #?(:cljs [cljs.spec.alpha :as s]
               :clj [clojure.spec.alpha :as s])
            #?(:cljs [cljs.spec.test.alpha :as stest]
               :clj [clojure.spec.test.alpha :as stest])
            [clojure.string :as string]
            [uix.state :as st]
            [uix.elements :as els]
            #?(:cljs [cljsjs.emotion])))

#?(:cljs
    (defn emo-css [m]
      (js/emotion.css m)))

#?(:cljs
    (uix/add-transform-fn
      (fn [attrs]
        (if-not (contains? attrs :css)
          attrs
          (let [^string classes (:class attrs)
                ^string emo-class (emo-css (reduce-kv uix.compiler.alpha/kv-conv #js {} (:css attrs)))
                class (uix.compiler.alpha/class-names [classes emo-class])]
            (-> attrs
                (dissoc :css)
                (assoc :class class))))))
   :clj
   (defn transform-fn [attrs]
     (if-not (contains? attrs :css)
       attrs
       (let [classes (:class attrs)
             emo-class (str "css-" (hash (:css attrs)))
             class [classes emo-class]]
         (-> attrs
             (dissoc :css)
             (assoc :class class))))))


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

(s/fdef repos-list
  :args (s/cat))

#?(:cljs
    (defmethod st/handle-fx :fx/http [_ {:keys [url on-success]}]
      (-> (js/fetch url)
          (.then #(.json %))
          (.then #(st/dispatch [on-success (js->clj % :keywordize-keys true)])))))

(defmethod st/handle-event :db/init [db _]
  {:db (assoc db :repos {:items []
                         :loading? false}
                 :search-form {:uname ""})})

(defmethod st/handle-event :repos/fetch [db [_ uname]]
  {:db (assoc-in db [:repos :loading?] true)
   :fx/http {:url (str "https://api.github.com/users/" uname "/repos")
             :on-success :repos/fetch-ok}})

(defmethod st/handle-event :repos/fetch-ok [db [_ repos]]
  {:db (assoc db :repos {:items repos :loading? false})})

(defmethod st/handle-event :repos/uname [db [_ uname]]
  {:db (assoc-in db [:search-form :uname] uname)})

(defui button [{:keys [on-click disabled?]} text]
  [:button {:on-click on-click
            :disabled disabled?
            :style {:padding "10px 24px"
                    :font-size "15px"
                    :border "none"
                    :border-radius "3px"
                    :background "blue"
                    :color "white"
                    :font-weight "500"
                    :text-transform "uppercase"}}
   text])

(defui input [{:keys [value on-change]}]
  [:input {:value value
           :on-change #(on-change (.. % -target -value))
           :style {:padding 8
                   :font-size "15px"
                   :border "1px solid #eee"
                   :color "#000"
                   :border-radius "3px"
                   :outline "none"}}])

(def repos* (st/db-cell :repos))
(def items* (st/cell repos* :items))
(def items?* (st/cell items* seq))
(def loading?* (st/cell repos* :loading?))
(def search-form* (st/db-cell :search-form))

(defn repos-list []
  (let [items (st/use-cell items*)]
    [ui-list {:items items}
     (fn [{:keys [name]}]
       ^{:key name}
       [:li {:css {:padding 4
                   :border-bottom "1px solid #000"}}
        name])]))

(defn popup [{:keys [on-close]}]
  [:div {:style {:position :absolute}}
   [:h1 "hello"]
   [:button {:on-click on-close}
    "CLOSE"]])

(defn app []
  (let [items? (st/use-cell items?*)
        loading? (st/use-cell loading?*)
        {:keys [uname]} (st/use-cell search-form*)
        popup? (uix/state false)]
    [:<>
     (when @popup?
       [:-> [popup {:on-close #(reset! popup? false)}]
        :#popup])
     [els/column {:align-x "center"
                  :padding 16}
      [:form {:css {:display "flex"}
              :on-submit (fn [e]
                           (.preventDefault e)
                           (st/dispatch [:repos/fetch uname]))}
       [els/spacing {:x 8}
        [input {:value uname
                :on-change #(st/dispatch [:repos/uname %])}]
        [button {:disabled? (string/blank? uname)}
         "Submit"]]]
      (when loading?
        [els/row {:padding 16}
         "Loading..."])
      [:# {:fallback "loading"}
       (when (seq items?)
         [repos-list])]]]))


#?(:cljs
    (defn ^:export renderApp []
      (uix/hydrate [app] js/root)))

#?(:cljs
    (defn ^:after-load -render []
      (renderApp)))

(stest/instrument)

(st/dispatch [:db/init])

(uix/set-loaded! :example)

#?(:clj
    (let [html (uix/render-to-string [app] {:transform-fn transform-fn})
          html (-> (slurp "resources/public/tmpl.html")
                   (string/replace "{{root}}" html))]
      (spit "resources/public/index.html" html)))
