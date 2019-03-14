(ns ^:figwheel-hooks uix.example
  #?(:cljs (:require-macros [uix.core.alpha :refer [defui require-lazy]]
                            [uix.hooks.alpha :refer [with-effect]]))
  (:require #?(:cljs [cljs.loader :as loader])
            #?(:cljs [uix.core.alpha :as uix])
            #?(:clj [uix.core.alpha :as uix :refer [defui require-lazy]])
            #?(:clj [uix.hooks.alpha :refer [with-effect]])
            [uix.hooks.alpha :as hooks]))

(defui app []
  (let [n (hooks/state 0)]
    [:<>
     [:button.btn#button-1 {:on-click #(swap! n + 5)}
      "+"]
     (for [n (range @n)]
       ^{:key n}
        [:span n])]))


#?(:cljs (defn ^:export renderApp [] (uix/render [app] js/root)))

#?(:cljs (defn ^:after-load -render []
           (renderApp)))

(uix/set-loaded! :example)
