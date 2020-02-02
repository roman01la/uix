(ns uix.hiccup
  (:require [uix.core.alpha :refer [html]]))

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

(defn input-field-compiled
  [{:keys [field-type type placeholder size]
    :or {field-type :input}}]
  (if (= field-type :textarea)
    (html
      [:textarea
       {:class ["form-control" (get {:large "form-control-lg"} size)]
        :type type
        :placeholder placeholder
        :style {:border "1px solid blue"
                :border-radius 3
                :padding "4px 8px"}}])
    (html
      [:input
       {:class ["form-control" (get {:large "form-control-lg"} size)]
        :type type
        :placeholder placeholder
        :style {:border "1px solid blue"
                :border-radius 3
                :padding "4px 8px"}}])))

(defn button-compiled [{:keys [size kind class]} child]
  (html
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
     ^:inline child]))

(defn fieldset-compiled [& children]
  (html
    [:fieldset.form-group
     {:style {:padding 8
              :border :none}}
     ^:inline children]))

(defn form-compiled [& children]
  (html
    [:form ^:inline children]))

(defn row-compiled [& children]
  (html [:div.row ^:inline children]))

(defn col-compiled [{:keys [md xs offset-md]} & children]
  (html
    [:div {:class [(str "col-md-" md)
                   (str "col-xs-" xs)
                   (str "offset-md-" offset-md)]}
     ^:inline children]))

(defn editor-compiled []
  (html
    [:div.editor-page
     [:div.container.page
      [row-compiled
       [col-compiled
        {:md 10
         :xs 12
         :offset-md 1}
        [form-compiled
         [:fieldset
          [fieldset-compiled
           [input-field-compiled
            {:type "text"
             :placeholder "Article Title"
             :size :large}]]
          [fieldset-compiled
           [input-field-compiled
            {:type "text"
             :placeholder "What's this article about?"}]]
          [fieldset-compiled
           [input-field-compiled
            {:rows "8"
             :field-type :textarea
             :placeholder "Write your article (in markdown)"}]]
          [fieldset-compiled
           [input-field-compiled
            {:type "text"
             :placeholder "Enter tags"}]
           [:div.tag-list]]
          [button-compiled
           {:size :large
            :kind :primary
            :class "pull-xs-right"}
           "Update Article"]]]]]]]))
