# Migrating from Reagent

This document describes how to migrate Reagent components to UIx, including syntactical differences and how various patterns in Reagent translate to UIx. UIx doesn't provide any abstractions on top of React, thus it is recommended to make yourself familiar with React in general.

## Element syntax

`$` macro instead of vector-based Hiccup

```clojure
;; Reagent
[:div#id.class {:on-click f}
  [:div]]

;; UIx
($ :div#id.class {:on-click f}
  ($ :div))
```

## Component syntax

`uix.core/defui` macro instead of `defn`

```clojure
;; Reagent
(defn avatar [{:keys [src]}]
  [:img {:src src}])

;; UIx
(defui avatar [{:keys [src]}]
  ($ :img {:src src}))
```

## Local state

`uix.core/use-state` hook instead of `r/with-let` or a closure + `r/atom`

```clojure
;; Reagent
(defn counter [props]
  (let [state (r/atom 0)]
    (fn [props]
      [:button {:on-click #(swap! state inc)} @state])))

(defn counter [props]
  (r/with-let [state (r/atom 0)]
    [:button {:on-click #(swap! state inc)} @state]))

;; UIx
(defui counter [props]
  (let [[value set-value!] (uix/use-state 0)]
    ($ :button {:on-click #(set-value! inc)} value)))
```

## Component props

A single map of props instead of arbitrary positional arguments

```clojure
;; Reagent, positional arguments
(defn button [{:keys [on-click]} text]
  …)

[button {:on-click f} "press"]

;; UIx, a single argument of props
(defui button [{:keys [on-click text]}]
  …)

($ button {:on-click f :text "press"})
```

### Child elements in props

Child elements are always put under `:children` key in props map, instead of being positional arguments

```clojure
;; Reagent, positional arguments
(defn button [{:keys [on-click]} text]
  …)

[button {:on-click f} "press"]

;; UIx, :children key in props map
(defui button [{:keys [on-click children]}]
  …)

($ button {:on-click f} "press")
```

While arguably in Reagent a one-to-one mapping between arguments and parameters is more straightforward than having implicit `:children` key in React/Ux, the ergonomics of this approach becomes more apparent when one needs to "insert" `children` into UI tree.

```clojure
;; Reagent
(defn button [{:keys [on-click]} & children] ;; rest args
  ;; splicing into Hiccup form
  (into [:button {:on-click on-click}]
    children))

[button {:on-click f} "press" "me"]

;; UIx
(defui button [{:keys [on-click children]}] ;; :children key
  ;; passing `children` as is
  ($ :button {:on-click on-click} children))

($ button {:on-click f} "press")
```

## `key` attribute in child elements

```clojure
;; Reagent
(defn ui-list [{:keys [items]}]
  [:ul
    (for [item items]
      ^{:key (:id item)} ;; or as an attribute
      [:li (:name item)])])

;; UIx
(defui ui-list [{:keys [items]}]
  ($ :ul
    (for [item items]
      ($ :li {:key (:id item)} ;; only as attribute
        (:name item)))))
```

## Global shared state

In Reagent it's common to have shared state in the form of a global var that holds an `r/atom`. In UIx and React shared state is not global at the namespace level, instead it's a local state that lives in UI tree and is being shared down the tree via React Context.

```clojure
;; Reagent
(def state (r/atom 0)) ;; declare shared state

(defn child-component []
  [:button
    {:on-click #(swap! state inc)}]) ;; update the shared state

(defn parent-component []
  (let [value @state] ;; consume the shared state
    [child-component]))

;; UIx
;; declare means of sharing value in UI tree
(def state-context (uix.core/create-context []))

(defui child-component []
  ;; consume state from the context
  (let [[n set-n!] (uix/use-context state-context)]
    ($ :button {:on-click #(set-n! inc)} n)))

(defui parent-component []
  ;; declare local state to be shared in UI subtree
  (let [[n set-n!] (uix/use-state 0)]
    ;; share the state with the subtree via context
    ($ (.-Provider state-context) {:value [n set-n!]}
      ($ child-component))))
```
