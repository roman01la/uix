(ns uix.hiccup
  (:require [uix.core.alpha :refer [defui]]))

(defn input-field [{:keys [field-type type placeholder size]
                    :or {field-type :input}}]
  [field-type
   {:class ["form-control" (get {:large "form-control-lg"} size)]
    :type type
    :placeholder placeholder
    :style {:border "1px solid blue"
            :border-radius 3
            :padding "4px 8px"}}])

(defn button [{:keys [size kind class]} child]
  [:button.btn
   {:class [(get {:large "btn-lg"} size)
            (get {:primary "btn-primary"} kind)
            class]
    :style {:padding "8px 24px"
            :color :white
            :background :blue
            :font-size "11px"
            :text-transform :uppercase
            :text-align :center}}
   child])

(defn fieldset [& children]
  (into [:fieldset.form-group
         {:style {:padding 8
                  :border :none}}]
        children))

(defn form [& children]
  (into [:form] children))

(defn row [& children]
  (into [:div.row] children))

(defn col [{:keys [md xs offset-md]} & children]
  (into
    [:div {:class [(str "col-md-" md)
                   (str "col-xs-" xs)
                   (str "offset-md-" offset-md)]}]
    children))

(defn editor []
  [:div.editor-page
   [:div.container.page
    [row
     [col {:md 10
           :xs 12
           :offset-md 1}
      [form
       [:fieldset
        [fieldset
         [input-field {:type "text"
                       :placeholder "Article Title"
                       :size :large}]]
        [fieldset
         [input-field {:type "text"
                       :placeholder "What's this article about?"}]]
        [fieldset
         [input-field {:rows "8"
                       :field-type :textarea
                       :placeholder "Write your article (in markdown)"}]]
        [fieldset
         [input-field {:type "text"
                       :placeholder "Enter tags"}]
         [:div.tag-list]]
        [button
         {:size :large
          :kind :primary
          :class "pull-xs-right"}
         "Update Article"]]]]]]])

;; ==== Pre-compiled components ====

(defui input-field-compiled
  [{:keys [field-type type placeholder size]
    :or {field-type :input}}]
  (if (= field-type :textarea)
    #el [:textarea
         {:class ["form-control" (get {:large "form-control-lg"} size)]
          :type type
          :placeholder placeholder
          :style {:border "1px solid blue"
                  :border-radius 3
                  :padding "4px 8px"}}]
    #el [:input
         {:class ["form-control" (get {:large "form-control-lg"} size)]
          :type type
          :placeholder placeholder
          :style {:border "1px solid blue"
                  :border-radius 3
                  :padding "4px 8px"}}]))

(defui button-compiled [{:keys [size kind class children]}]
  #el [:button.btn
       {:class [(get {:large "btn-lg"} size)
                (get {:primary "btn-primary"} kind)
                class]
        :style {:padding "8px 24px"
                :color :white
                :background :blue
                :font-size "11px"
                :text-transform :uppercase
                :text-align :center}}
       children])

(defui fieldset-compiled [{:keys [children]}]
  #el [:fieldset.form-group
       {:style {:padding 8
                :border :none}}
       children])

(defui form-compiled [{:keys [children]}]
  #el [:form children])

(defui row-compiled [{:keys [children]}]
  #el [:div.row children])

(defui col-compiled [{:keys [md xs offset-md children]}]
  #el [:div {:class [(str "col-md-" md)
                     (str "col-xs-" xs)
                     (str "offset-md-" offset-md)]}
       children])

(defui editor-compiled []
  #el [:div.editor-page
       #el [:div.container.page
            #el [row-compiled
                 #el [col-compiled
                      {:md 10
                       :xs 12
                       :offset-md 1}
                      #el [form-compiled
                           #el [:fieldset
                                #el [fieldset-compiled
                                     #el [input-field-compiled
                                          {:type "text"
                                           :placeholder "Article Title"
                                           :size :large}]]
                                #el [fieldset-compiled
                                     #el [input-field-compiled
                                          {:type "text"
                                           :placeholder "What's this article about?"}]]
                                #el [fieldset-compiled
                                     #el [input-field-compiled
                                          {:rows "8"
                                           :field-type :textarea
                                           :placeholder "Write your article (in markdown)"}]]
                                #el [fieldset-compiled
                                     #el [input-field-compiled
                                          {:type "text"
                                           :placeholder "Enter tags"}]
                                     #el [:div.tag-list]]
                                #el [button-compiled
                                     {:size :large
                                      :kind :primary
                                      :class "pull-xs-right"}
                                     "Update Article"]]]]]]])
