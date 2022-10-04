# Interop with Reagent

## Using Reagent components in UIx

In order to use a Reagent component in UIx you need to wrap Reagent's Hiccup with `r/as-element` so that Reagent can take care of Hiccup and convert it into React calls.

```clojure
(defn reagent-component []
  ...)

(defui uix-component []
  ($ :div (r/as-element [reagent-component])))
```

## Using UIx components in Reagent

When using a UIx component in Reagent (or anywhere else) you can continue to use the`$` macro without changing anything. The macro will make sure that UIx component is properly created no matter  which context it is used in.

```clojure
(defui uix-component []
  ...)

(defn reagent-component []
  [:div ($ uix-component)])
```

## Syncing with ratoms and re-frame

External data sources can be consumed in hooks-based components via `useSyncExternalStoreWithSelector` from the `"use-sync-external-store"` package (in React v18 the function is a part of the public API so there is no need to install the package). This part is only concerned about making the UI components reactive on external data sources. How the state is updated doesn't change.

### Implementation

```clojure
(ns app.hooks
  (:require ["use-sync-external-store/shim/with-selector" :refer [useSyncExternalStoreWithSelector]]
            [re-frame.core :as rf]
            [reagent.impl.component :as impl.component]
            [reagent.ratom :as ratom]
            [scheduler]
            [uix.core :as uix]))

(defn- use-batched-subscribe
  "Takes an atom-like ref type and returns a function
  that adds change listeners to the ref"
  [^js ref]
  (uix/use-callback
   (fn [listener]
     ;; Adding an atom holding a set of listeners on a ref
     (let [listeners (or (.-react-listeners ref) (atom #{}))]
       (set! (.-react-listeners ref) listeners)
       (swap! listeners conj listener))
     (fn []
       (let [listeners (.-react-listeners ref)]
         (swap! listeners disj listener)
         ;; When the last listener was removed
         ;; remove batched updates listener from the ref
         (when (empty? @listeners)
           (set! (.-react-listeners ref) nil)))))
   [ref]))

(defn- use-sync-external-store [subscribe get-snapshot]
  (useSyncExternalStoreWithSelector
   subscribe
   get-snapshot
   nil ;; getServerSnapshot, only needed for SSR
   identity ;; selector, not using, just returning the value itself
   =)) ;; value equality check

(defn- run-reaction [^js ref]
  (let [key "__rat"
        ^js rat (aget ref key)
        on-change (fn [_]
                    ;; When the ref is updated, schedule all listeners in a batch
                    (when-let [listeners (.-react-listeners ref)]
                      (scheduler/unstable_scheduleCallback scheduler/unstable_ImmediatePriority
                        #(doseq [listener @listeners]
                          (listener)))))]
    (if (nil? rat)
      (ratom/run-in-reaction
       #(-deref ref) ref key on-change {:no-cache true})
      (._run rat false))))

;; Public API

(defn use-reaction
  "Takes Reagent's Reaction,
  subscribes UI component to changes in the reaction
  and returns current state value of the reaction"
  [reaction]
  (if impl.component/*current-component*
    ;; in case when the reaction runs in Reagent component
    ;; just deref it and let Reagent handle everything
    @reaction
    ;; otherwise manage subscription via hooks
    (let [subscribe (use-batched-subscribe reaction)
          get-snapshot (uix/use-callback #(run-reaction reaction) [reaction])]
      (use-sync-external-store subscribe get-snapshot))))

(defn use-subscribe
  "Takes re-frame subscription query e.g. [:current-document/title],
  creates an instance of the subscription,
  subscribes UI component to changes in the subscription
  and returns current state value of the subscription"
  [query]
  (let [sub (rf/subscribe query)
        ;; using an empty atom when re-frame subscription is not registered
        ;; re-frame will still print the error in console
        ref (or sub (atom nil))]
    (use-reaction ref)))
```

### Usage

```clojure

(def counter (r/atom 0))

(defui title-bar []
  (let [n (use-reaction counter) ;; Reagent's reaction
        title (use-subscribe [:app/title])] ;; re-frame subscription
    ($ :div
      title
      ($ :button {:on-click #(swap! counter inc)}
        n))))
```
