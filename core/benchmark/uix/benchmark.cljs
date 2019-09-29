(ns uix.benchmark
  (:require-macros [uix.benchmark :refer [bench]])
  (:require [reagent.core :as r]
            ["react-dom/server" :as rserver]
            [react :as react]
            [uix.compiler.alpha :as uixc]
            [uix.core.alpha :refer-macros [html]]
            [uix.dom.alpha :as uix.dom]
            [uix.hiccup :as hiccup]
            [uix.react :refer [Editor]]))

(defn reagent-interpret []
  (r/as-element [hiccup/editor]))

(defn uix-interpret []
  (uixc/as-element [hiccup/editor]))

(defn uix-compile []
  (uixc/as-element [hiccup/editor-compiled]))


(defn render [el]
  (rserver/renderToString el))

(do

  (bench :react 10000 (render (react/createElement Editor)))
  (bench :react 10000 (render (react/createElement Editor)))

  (bench :uix-compile 10000 (render (uix-compile)))
  (bench :uix-compile 10000 (render (uix-compile)))

  (bench :uix-interpret 10000 (render (uix-interpret)))
  (bench :uix-interpret 10000 (render (uix-interpret)))

  (bench :reagent-interpret 10000 (render (reagent-interpret)))
  (bench :reagent-interpret 10000 (render (reagent-interpret))))

(uix.dom/render [uix-interpret] js/root)

