# Effects

UIx provides a way to perform side effects in components via [React’s effect hook](https://reactjs.org/docs/hooks-effect.html). Effects are useful for making HTTP requests, interacting with DOM or basically performing any kind of impure operation that mutates some global state and might need to be cleaned up later at some point.

`uix.core/use-effect` function wraps React's `useEffect` hook and takes care of handling certain inconsistencies between JS and Clojure worlds so that you don't have to. More information about effect hook is available in [React documentation on effect hook](https://reactjs.org/docs/hooks-effect.html).

In the example below effect's callback will execute and update document’s title after every update of the component.

```clojure
(defui example []
  (let [[clicks set-clicks!] (uix.core/use-state 0)]
    (uix.core/use-effect
      (fn []
        (set! (.-title js/document)
              (str "Number of clicks: " clicks))))
    ($ :button {:on-click #(set-clicks! inc)}
      "increment")))
```

Dependencies vector allows conditional execution of an effect. In the example above dependencies are not passed into the effect causing it to execute on every update of the component. [Read more about conditional effect execution in React docs](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect).

In the example below the effect will be executed every time when a number of `clicks` becomes a multiple of 5

```clojure
(defui example []
  (let [[clicks set-clicks!] (uix.core/use-state 0)]
    (uix.core/use-effect
      (fn []
        (set! (.-title js/document)
              (str "Number of clicks: " clicks)))
      [(zero? (mod clicks 5))])
    ($ :button {:on-click #(set-clicks! inc)}
      "increment")))
```
