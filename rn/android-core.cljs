(ns {{app-name}}.android.core
  (:require [uix.core.alpha :as uix]
            [uix.rn.alpha :as n]))

(def logo-img (n/require "./images/cljs.png"))

(def styles
  (n/create-stylesheet
    {:screen {:flex-direction "column" :margin 40 :align-items "center"}
     :heading {:font-size 30 :font-weight "100" :margin-bottom 20 :text-align "center"}
     :logo {:width 80 :height 80 :margin-bottom 30}
     :button {:background-color "#999" :padding 10 :border-radius 5}
     :button-text {:color "white" :text-align "center" :font-weight "bold"}}))

(defn app-root []
  (let [greeting (uix/state "Hello!")]
    [n/view {:style (:screen styles)}
       [n/text {:style (:heading styles)}
         @greeting]
       [n/image {:source logo-img
                 :style  (:logo styles)}]
       [n/touchable-highlight {:style (:button styles)
                               :on-press #(alert "HELLO!")}
        [n/text {:style (:button-text styles)}
          "press me"]]]))

(defn init []
  (n/register "{{app-name}}" #(uix/as-react app-root)))
