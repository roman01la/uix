(ns uix.benchmark
  (:require-macros [uix.benchmark :refer [bench]])
  (:require [reagent.core :as r]
            [react :as react]
            ["react-dom/server" :as rserver]
            [uix.compiler.alpha :as uixc]
            [uix.core.alpha :as uix :refer-macros [html]]))

(def >el react/createElement)

(def links
  [["https://news.ycombinator.com/newest" "new"]
   ["https://news.ycombinator.com/threads?id=roman01la" "threads"]
   ["https://news.ycombinator.com/front" "past"]
   ["https://news.ycombinator.com/newcomments" "comments"]
   ["https://news.ycombinator.com/ask" "ask"]
   ["https://news.ycombinator.com/show" "show"]
   ["https://news.ycombinator.com/jobs" "jobs"]
   ["https://news.ycombinator.com/submit" "submit"]])

(defn react []
  (>el "table" #js {:border 0
                    :cellpadding 0
                    :cellspacing 0
                    :width "100%"
                    :style #js {:padding 2}}
       (>el "tbody" nil
            (>el "tr" nil
                 (>el "td" #js {:style #js {:width 18
                                            :paddingRight 4}}
                      (>el "a" #js {:href "https://news.ycombinator.com/"}
                           (>el "img" #js {:src "https://news.ycombinator.com/y18.gif"
                                           :style #js {:border "1px white solid"
                                                       :width 18
                                                       :height 18}})))
                 (>el "td" #js {:style #js {:lineHeight "12pt"
                                            :height 10}}
                      (>el "span" #js {:className "pagetop"}
                           (>el "b" #js {:className "hnname"}
                                (>el "a" #js {:className "https://news.ycombinator.com/news"}
                                     "Hacker News"))
                           (->> links
                                (map (fn [[link label]]
                                       (>el "a" #js {:className link} label)))
                                (interpose " | "))))
                 (>el "td" #js {:style #js {:textAlign "right"
                                            :paddingRight 4}}
                      (>el "span" #js {:className "pagetop"}
                           (>el "a" #js {:href "username" :id "me"} "username")
                           " (10) |"
                           (>el "a" #js {:href "logout"} "logout")))))))

(def hiccup
  [:table
   {:border 0
    :cellpadding 0
    :cellspacing 0
    :width "100%"
    :style {:padding 2}}
   [:tbody
    [:tr
     [:td {:style {:width 18
                   :padding-right 4}}
      [:a {:href "https://news.ycombinator.com/"}
       [:img {:style {:border "1px white solid"
                      :width 18
                      :height 18}
              :src "https://news.ycombinator.com/y18.gif"}]]]
     [:td {:style {:line-height "12pt"
                   :height 10}}
      [:span.pagetop
       [:b.hnname
        [:a {:href "https://news.ycombinator.com/news"} "Hacker News"]]
       (->> links
            (map (fn [[link label]]
                   ^{:key label}
                   [:a {:href link} label]))
            (interpose " | "))]]
     [:td {:style {:text-align "right"
                   :padding-right 4}}
      [:span.pagetop
       [:a#me {:href "username"} "username"]
       " (10) |"
       [:a#logout {:href "logout"} "logout"]]]]]])

(defn reagent-interpret []
  (r/as-element
    hiccup))

(defn uix-interpret []
  (uixc/as-element
    hiccup))

(defn uix-compile []
  (html
    [:table
     {:border 0
      :cellpadding 0
      :cellspacing 0
      :width "100%"
      :style {:padding 2}}
     [:tbody
      [:tr
       [:td {:width 18
             :padding-right 4}
        [:a {:href "https://news.ycombinator.com/"}
         [:img {:style {:border "1px white solid"
                        :width 18
                        :height 18}
                :src "https://news.ycombinator.com/y18.gif"}]]]
       [:td {:style {:line-height "12pt"
                     :height 10}}
        [:span.pagetop
         [:b.hnname
          [:a {:href "https://news.ycombinator.com/news"} "Hacker News"]]
         ^:inline
         (->> links
              (map (fn [[link label]]
                     (html
                       ^{:key label}
                       [:a {:href link}
                        ^:inline label])))
              (interpose " | "))]]
       [:td {:style {:text-align "right"
                     :padding-right 4}}
        [:span.pagetop
         [:a#me {:href "username"} "username"]
         " (10) |"
         [:a#logout {:href "logout"} "logout"]]]]]]))

(defn render [el]
  (rserver/renderToString el))

(do

  (bench :react 10000 (render (react)))
  (bench :react 10000 (render (react)))

  (bench :uix-compile 10000 (render (uix-compile)))
  (bench :uix-compile 10000 (render (uix-compile)))

  (bench :uix-interpret 10000 (render (uix-interpret)))
  (bench :uix-interpret 10000 (render (uix-interpret)))

  (bench :reagent-interpret 10000 (render (reagent-interpret)))
  (bench :reagent-interpret 10000 (render (reagent-interpret))))

(uix/render [uix-interpret] js/root)

