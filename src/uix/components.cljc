(ns uix.components
  #?(:cljs (:require-macros [uix.core.alpha :refer [defui]]))
  (:require #?(:cljs [cljs.loader :as loader])
            #?(:clj [uix.core.alpha :refer [defui]])
            [uix.core.alpha]))

(defui view [child]
  [:div {}
   child])

#?(:cljs (loader/set-loaded! :components))
