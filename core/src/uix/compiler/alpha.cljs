(ns uix.compiler.alpha
  (:require [react :as react]
            [cljs-bean.core :as bean]
            [goog.object :as gobj]
            [uix.compiler.attributes :as attrs]
            [clojure.string :as str]))

(defn symbol-for [s]
  (js* "Symbol.for(~{})" s))

(defn as-react [f]
  #(f #js {:argv (bean/bean %)}))

(defn- reagent-component? [^js component-type]
  (->> (.keys js/Object component-type)
       (some #(when (str/starts-with? % "G_")
                (identical? component-type (gobj/get component-type %))))))

(defn validate-component [^js component-type]
  (when (and (not (.-uix-component? component-type))
             (reagent-component? component-type))
    (let [name-str (or (.-displayName component-type)
                       (.-name component-type))]
      (throw (js/Error. (str "Invalid use of Reagent component " name-str " in `$` form.\n"
                             "UIx doesn't know how to render Reagent components.\n"
                             "Reagent element should be Hiccup wrapped with r/as-element, i.e. (r/as-element [" name-str "])")))))
  true)

(defn- uix-component-element [component-type ^js props-children children]
  (let [props (aget props-children 0)
        js-props (if-some [key (:key props)]
                   #js {:key key :argv (dissoc props :key)}
                   #js {:argv props})
        args (if (= 2 (.-length props-children))
               #js [component-type js-props (aget props-children 1)]
               #js [component-type js-props])]
    (.apply react/createElement nil (.concat args children))))

(defn- react-component-element [component-type ^js props-children children]
  (let [js-props (-> (aget props-children 0)
                     (attrs/interpret-attrs #js [] true)
                     (aget 0))
        args (if (= 2 (.-length props-children))
               #js [component-type js-props (aget props-children 1)]
               #js [component-type js-props])]
    (.apply react/createElement nil (.concat args children))))

(defn component-element [^clj component-type props-children children]
  (when ^boolean goog.DEBUG
    (validate-component component-type))
  (if (.-uix-component? component-type)
    (uix-component-element component-type props-children children)
    (react-component-element component-type props-children children)))
