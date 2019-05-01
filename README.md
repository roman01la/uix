<img src="logo.png" width="125" />

_Experimental ClojureScript wrapper for modern React.js_

```clj
(require '[uix.core.alpha :as uix])

(defn button [{:keys [on-click]} text]
  [:button.btn {:on-click on-click}
    text])
    
(defn app []
  (let [state (uix/state 0)]
    [:<>
      [button {:on-click #(swap! state dec)} "-"]
      [:span @state]
      [button {:on-click #(swap! state inc)} "+"]]))
  
(uix/render [button {:on-click js/console.log} "button"])
```

## Example
`clojure -A:dev -m figwheel.main -O advanced -bo dev:prod`

## Benchmark
`clojure -A:dev:benchmark -m figwheel.main -O advanced -bo benchmark`

## Tests
`clj -A:test -m cljs.main -re node -m uix.compiler-test`
