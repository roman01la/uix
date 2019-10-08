(ns uix.recipes.state-hook
  "This recipe shows how to use local state in UIx components.

  `uix.core.alpha/state` takes initial value and returns atom-like
  reference type that schedules re-render when the value is updated.

  Note that update is applied asynchronous, which means that a new value
  might not be immediately available when dereferenced."
  (:require [uix.core.alpha :as uix]))

#?(:cljs
   (do
     (deftype Cursor [ref path]
       IDeref
       (-deref [o]
         (get-in @ref path))
       IReset
       (-reset! [o new-value]
         (swap! ref update-in path (constantly new-value))))))

(defn derive-state [ref path]
  #?(:clj (atom (get-in @ref path))
     :cljs (uix/memo #(Cursor. ref path) [ref path])))

(defn recipe []
  (let [state* (uix/state {:value "Hello!"})
        value* (derive-state state* [:value])]
    [:div
     [:input {:value @value*
              :on-change #(reset! value* (.. % -target -value))}]
     [:div "Input text: " @value*]]))
