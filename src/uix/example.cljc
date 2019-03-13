(ns ^:figwheel-hooks uix.example
  #?(:cljs (:require-macros [uix.core.alpha :refer [defui require-lazy]]
                            [uix.hooks.alpha :refer [with-effect]]))
  (:require #?(:cljs [cljs.loader :as loader])
            #?(:cljs [uix.core.alpha :as uix])
            #?(:clj [uix.core.alpha :as uix :refer [defui require-lazy]])
            #?(:clj [uix.hooks.alpha :refer [with-effect]])
            [uix.hooks.alpha :as hooks]))

(require-lazy '[uix.components :refer [view]])

(defui input [{:keys [value on-change]}]
  [:input {:value value
           :on-change #(on-change (.. % -target -value))}])

(defui popup [value]
  (with-effect
    (prn "Did mount")
    (finally
      (prn "Will unmount")))
  [view value])

(defui app []
  (let [value (hooks/state "Hello!")
        popup? (hooks/state false)
        button-ref (uix/ref)]
    [:div {:style {:padding 32}}
     [input {:value @value
             :on-change #(reset! value %)}]
     [:button {:ref button-ref
               :on-click #(do
                            (prn @button-ref)
                            (swap! popup? not))}
      "Toggle popup"]
     [:# {:fallback "loading..."}
      (when @popup?
        [:-> [popup @value] #?(:cljs js/popup)])]]))

#?(:cljs (defn ^:exports renderApp [] (uix/render [app] js/root)))

(defn ^:after-load -render [])

#?(:cljs (loader/set-loaded! :example))
