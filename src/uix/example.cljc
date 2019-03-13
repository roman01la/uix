(ns ^:figwheel-hooks uix.example
  #?(:cljs (:require-macros [uix.core.alpha :refer [defui require-lazy]]))
  (:require #?(:cljs [cljs.loader :as loader])
            #?(:cljs [uix.core.alpha :as uix])
            #?(:clj [uix.core.alpha :refer [defui require-lazy]])
            [uix.hooks.alpha :as hooks]))

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
