(ns uix.components
  (:require [uix.core.alpha :as uix]
            #?(:cljs [cljs.spec.alpha :as s]
               :clj [clojure.spec.alpha :as s])))

(s/def :ui-list/item
  any?)

(s/def :ui-list/items
  (s/coll-of :ui-list/item :min-count 0))

(s/fdef ui-list
  :args (s/cat :props (s/keys :req-un [:ui-list/items])
               :render-item fn?))

(defn ui-list [{:keys [items]} render-item]
  [:ul {:style {:list-style "none"}}
   (map render-item items)])

#?(:cljs
    (uix/set-loaded! :components))
