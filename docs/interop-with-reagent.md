# Interop with Reagent

## Using Reagent components in UIx

In order to use Reagent component in UIx you just have to wrap Reagent's Hiccup with `r/as-element` so that Reagent can take care of Hiccup and convert it into React calls.

```clojure
(defn reagent-component []
  ...)

(defui uix-component []
  ($ :div (r/as-element [reagent-component])))
```

## Using UIx components in Reagent

When using UIx component in Reagent or anywhere else all you have to do is to keep using `$` macro. The macro will make sure that UIx component is properly created, no matter in which context it is used.

```clojure
(defui uix-component []
  ...)

(defn reagent-component []
  [:div ($ uix-component)])
```

## Syncing with ratoms and re-frame

External data sources can be consumed in hooks-based components via `useSyncExternalStoreWithSelector` from `"use-sync-external-store"` package (in React v18 the function is a part of public API, not need to install the package). This part is only concerned around making UI components reactive on external data sources. How the state is updated doesn't change.

### Implementation

```clojure
(ns app.hooks
  (:require ["use-sync-external-store/shim/with-selector" :refer [useSyncExternalStoreWithSelector]]
            [re-frame.core :as rf]
            [react-dom]
            [reagent.ratom :as ratom]
            [uix.core :as uix]))

(defn- setup-batched-updates-listener [^js ref]
  ;; Adding an atom holding a set of listeners on a ref if it wasn't added yet
  (when-not (.-react-listeners ref)
    (set! (.-react-listeners ref) (atom #{}))
    ;; When the ref is updated, execute all listeners in a batch
    (add-watch ref ::batched-subscribe
               (fn [_ _ _ _]
                 (react-dom/unstable_batchedUpdates
                  #(doseq [listener @(.-react-listeners ref)]
                     (listener)))))))

(defn- teardown-batched-updates-listener [^js ref]
  ;; When the last listener was removed
  ;; remove batched updates listener from the ref
  (when (empty? @(.-react-listeners ref))
    (set! (.-react-listeners ref) nil)
    (remove-watch ref ::batched-subscribe)))

(defn- use-batched-subscribe
  "Takes an atom-like ref type and returns a function that subscribes to changes
  in the ref, where subscribed listeners execution is batched via `react-dom/unstable_batchedUpdates`"
  [^js ref]
  (uix/use-callback
   (fn [listener]
     (setup-batched-updates-listener ref)
     (swap! (.-react-listeners ref) conj listener)
     (fn []
       (swap! (.-react-listeners ref) disj listener)
       (teardown-batched-updates-listener ref)))
   [ref]))

(defn- use-sync-external-store [subscribe get-snapshot]
  (useSyncExternalStoreWithSelector
   subscribe
   get-snapshot
   nil ;; getServerSnapshot, only needed for SSR
   identity ;; selector, not using, just returning the value itself
   =)) ;; value equality check)

;; Public API

(defn use-reaction
  "Takes Reagent's Reaction,
  subscribes UI component to changes in the reaction
  and returns current state value of the reaction"
  [reaction]
  (let [subscribe (use-batched-subscribe reaction)
        get-snapshot (uix/use-callback (fn []
                                          ;; Mocking ratom context
                                          ;; This makes sure that watchers added to the `reaction`
                                          ;; will be triggered when the `reaction` gets updated.
                                         (binding [ratom/*ratom-context* #js {}]
                                           @reaction))
                                       [reaction])]
    (use-sync-external-store subscribe get-snapshot)))

(defn use-subscribe
  "Takes re-frame subscription query e.g. [:user/id],
  creates an instance of the subscription,
  subscribes UI component to changes in the subscription
  and returns current state value of the subscription"
  [query]
  (let [sub (rf/subscribe query)
        ;; using an empty atom when re-frame susbcription is not registered
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
