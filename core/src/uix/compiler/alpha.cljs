(ns uix.compiler.alpha
  (:require [react :as react]
            [cljs-bean.core :as bean]))

(defn symbol-for [s]
  (js* "Symbol.for(~{})" s))

(defn as-react [f]
  #(f #js {:argv (bean/bean %)}))

(defn validate-component [^js component-type]
  (when-not ^boolean (.-uix-component? component-type)
    (let [name-str (or (.-displayName component-type)
                       (.-name component-type))]
      (throw (js/Error. (str "Invalid use of a non-UIx component " name-str " in `$` form.\n"
                             "Make sure that the component is declared with `defui`\n"
                             "If you meant to render React element, use :> syntax for interop with JavaScript components, i.e. ($ :> " name-str ")\n"
                             "If you meant to render Reagent element, make it Hiccup wrapped with r/as-element, i.e. (r/as-element [" name-str "])")))))
  true)

(defn component-element [component-type ^js props-children children]
  (when ^boolean goog.DEBUG
    (validate-component component-type))
  (let [props (aget props-children 0)
        js-props (if-some [key (:key props)]
                   #js {:key key :argv (dissoc props :key)}
                   #js {:argv props})
        args (if (= 2 (.-length props-children))
               #js [component-type js-props (aget props-children 1)]
               #js [component-type js-props])]
    (.apply react/createElement nil (.concat args children))))
