(ns ^:figwheel-hooks uix.example
  (:require #?(:cljs [uix.core.alpha :as uix :refer-macros [require-lazy]]
               :clj [uix.core.alpha :as uix :refer [require-lazy]])
            #?(:cljs [cljs.spec.alpha :as s]
               :clj [clojure.spec.alpha :as s])
            #?(:cljs [cljs.spec.test.alpha :as stest]
               :clj [clojure.spec.test.alpha :as stest])
            [clojure.string :as string]))

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
  :args (s/cat :uname string? :on-done fn?))

(defn fetch-repos [uname on-done]
  #?(:cljs
     (-> (js/fetch (str "https://api.github.com/users/" uname "/repos"))
         (.then #(.json %))
         (.then #(js->clj % :keywordize-keys true))
         (.then on-done))))

(defn button [{:keys [on-click disabled?]} text]
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
  (let [state (uix/state {:uname ""
                          :repos []
                          :loading? false})
        {:keys [loading? repos uname]} @state]
    [:<>
     [:div {:style {:display :flex
                    :flex-direction :column
                    :align-items :center
                    :padding 16}}
      [:form {:style {:display :flex}
              :on-submit (fn [e]
                           (.preventDefault e)
                           (fetch-repos uname #(swap! state assoc :repos %)))}
       [input {:value uname
               :on-change #(swap! state assoc :uname %)}]
       [button {:disabled? (string/blank? uname)}
        "Submit"]]
      (when loading?
        [:div {:style {:padding 16}}
         "Loading..."])
      [:# {:fallback "..."}
       (when (seq repos)
         [ui-list {:items repos}
          (fn [{:keys [name]}]
            ^{:key name}
            [:li {:style {:padding 4
                          :border-bottom "1px solid #000"}}
             name])])]]]))

#?(:cljs
   (defn ^:export renderApp []
     (uix/hydrate [app] js/root)))

#?(:cljs
   (defn ^:after-load -render []
     (renderApp)))

(stest/instrument)

(uix/set-loaded! :example)

#?(:clj
   (let [html (uix/render-to-string [app])
         html (-> (slurp "resources/public/tmpl.html")
                  (string/replace "{{root}}" html))]
     (spit "resources/public/index.html" html)))
