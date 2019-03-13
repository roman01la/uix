(ns uix.components
  #?(:cljs (:require-macros [uix.core.alpha :refer [defui]]))
  (:require #?(:cljs [cljs.loader :as loader])
            #?(:clj [uix.core.alpha :as uix :refer [defui]])
            [uix.core.alpha :as uix]))

(defui view [child]
  [:div {}
   child])

(uix/set-loaded! :components)
