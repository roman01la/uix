(ns uix.benchmark
  (:require-macros [uix.benchmark :refer [bench]])
  (:require [reagent.core :as r]
            ["react-dom/server" :as rserver]
            [react :as react]
            [uix.core :refer [defui $]]
            [uix.hiccup :as hiccup]
            [uix.react :refer [Editor]]))

(defui app []
  (let [[show-modal? set-show-modal!] (uix.core/use-state false)]
    ($ :div
      ($ :button {:on-click #(set-show-modal! true)})
      ($ :> react/Suspense {:fallback ($ :div "Loading...")}
        (when show-modal?
          ($ modal {:on-close #(set-show-modal! false)}))))))

(set! (.-React js/window) react)

(defn render [el]
      (rserver/renderToString el))

(def reagent-compiler
  (r/create-compiler {:function-components true}))

(js/console.log "Warming up...")
(bench :react 10000 (render (react/createElement Editor)))
(bench :uix-compiled 10000 (render ($ hiccup/editor-compiled)))
(bench :reagent-interpret 10000 (render (r/as-element [hiccup/editor])))

(js/console.log "Running the benchmark...")
(let [react-t (bench :react 10000 (render (react/createElement Editor)))
      uix-t (bench :uix-compiled 10000 (render ($ hiccup/editor-compiled)))
      reagent-t (bench :reagent-interpret 10000 (render (r/as-element [hiccup/editor])))]
  (js/testsDone #js [react-t uix-t reagent-t]))
