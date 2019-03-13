(ns uix.components
  #?(:cljs (:require-macros [uix.core :refer [defui]]))
  (:require #?(:cljs [cljs.loader :as loader])
            #?(:clj [uix.core :refer [defui]])
            [uix.core]))

(defui view [child]
  [:div {}
   child])

#?(:cljs (loader/set-loaded! :components))
