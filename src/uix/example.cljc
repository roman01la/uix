(ns ^:figwheel-hooks uix.example
  #?(:cljs (:require-macros [uix.core :refer [defui require-lazy]]))
  (:require #?(:cljs [cljs.loader :as loader])
            #?(:cljs [uix.core :as uix])
            #?(:clj [uix.core :refer [defui require-lazy]])
            [uix.hooks :as hooks]))

(require-lazy '[uix.components :refer [view]])

(defui app []
  (let [load? (hooks/state false)]
    [:# {:fallback [:div "loading..."]}
     [:<>
      [:button {:on-click #(reset! load? true)}
       "Load view"]
      (when @load?
        [view "Hello!"])]]))

#?(:cljs (defn ^:exports renderApp [] (uix/render [app] js/root)))

(defn ^:after-load -render [])

#?(:cljs (loader/set-loaded! :example))
