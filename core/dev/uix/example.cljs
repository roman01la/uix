(ns uix.example
  (:require [cljs.js :as cljs]
            [uix.core.alpha :as uix.core :refer-macros [with-let]]
            [uix.dom.alpha :as uix.dom]))

(def st (cljs/empty-state))

(defn eval-handler [{:keys [error value]}]
  (if error
    (throw (str error))
    (println value)))

(defn browser-load [{:keys [name macros]} cb]
  (let [url (str "example-out/" (cljs/ns->relpath name) ".js")]
    (-> (js/fetch url)
        (.then #(.text %))
        (.then #(cb {:lang :js :source %})))))

(defn eval-string [s]
  (cljs/eval-str st s nil
                 {:eval cljs/js-eval
                  :load browser-load}
                 eval-handler))

;; =============================================

(defn create-editor [node value]
  (js/CodeMirror node
    #js {:lineNumbers true
         :autoCloseBrackets true
         :matchBrackets true
         :mode "text/x-clojure"
         :value value}))

(defn editor [{:keys [init-value on-change on-eval]}]
  (let [editor-ref (uix.core/ref)
        _ (uix.core/effect!
            (fn []
              (let [editor (create-editor @editor-ref init-value)]
                (.on editor "change" #(on-change (.getValue %)))))
            [])]
    [:div {:style {:flex 1}}
     [:div#editor {:ref editor-ref}]
     [:button {:on-click on-eval
               :style {:margin-top 16
                       :padding "8px 12px"
                       :border-radius "3px"
                       :background-color :blue
                       :text-transform :uppercase
                       :font-weight 600
                       :color :white
                       :border :none}}
      "Evaluate"]]))

(defn view []
  [:div {:style {:flex 1
                 :margin-left 16}}
   [:div#viewRoot]])

(defn root [initial-code]
  (with-let [code (uix.core/state initial-code)
             handle-change #(reset! code %)]
            (uix.core/effect!
              (fn []
                (eval-string initial-code))
              [])
            [:div {:style {:height "90%"
                           :display :flex
                           :flex-direction :column
                           :padding 16}}
             [:header
              [:img {:src "logo.png" :width 125}]]
             [:div {:style {:display :flex
                            :flex 1}}
              [editor {:init-value initial-code
                       :on-change handle-change
                       :on-eval #(eval-string @code)}]
              [view]]]))

(-> (js/fetch "init.cljs")
    (.then #(.text %))
    (.then #(uix.dom/render [root %] (.-root js/window))))
