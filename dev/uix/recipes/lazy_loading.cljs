(ns uix.recipes.lazy-loading
  "This recipe shows how to leverage React's Suspense and Closure's modules
  to load UIx components on-demand.

  First ClojureScript's compiler has to be instructed to emit modules,
  see `dev.cljs.edn` file.

  Entry point of every module have to report back to modules manager runtime
  when it's loaded using `cljs.loader/set-loaded!`.

  A module can require another module and refer to UIx component var in there
  using `require-lazy` macro that resembles Clojure's `require`.

  Referenced component should be put into `[:# {:fallback element} child]` form
  as a child element. This is a special Hiccup syntax for React.Suspense which
  takes care of UI tree while loading referenced component."
  (:require [uix.core.alpha :as uix :refer-macros [require-lazy]]))

(require-lazy '[uix.components :refer [alert]])

(defn recipe []
  (let [open? (uix/state false)]
    [:<>
     [:button {:on-click #(reset! open? true)}
      "Show alert"]
     [:div [:small "Throttle network in DevTools Network panel to see :fallback component"]]
     [:# {:fallback [:h2 "Loading uix.components/alert..."]}
      (when @open?
        [alert "Lazy-loaded alert"])]]))
