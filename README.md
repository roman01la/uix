<img src="logo.png" width="125" />

_Experimental ClojureScript wrapper for modern React.js_

[API Documentation](https://roman01la.github.io/uix/)

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

## Features

### Hiccup syntax extension
- `[:div#id.class]` or `[:#id.class]`
- `[:> js/Component attrs & children]` - interop with JS components
- `[:<> attrs & children]` - `React.Fragment`
- `[:-> element :#selector]` or `[:-> element dom-node]` - `React.createPortal`
- `[:# {:fallback element} & children]` - `React.Suspense`

### Hooks
React Hooks in idiomatic Clojure style
```clj
;; state hook
;; (mutable ref type, re-renders component when mutated)
(let [state (uix/state 0)]
  (swap! state inc)
  @state) ; 1
  
;; ref hook
;; (mutable ref type, doesn't cause re-renders)
(let [ref (uix/ref 0)]
  (swap! ref inc)
  @ref) ; 1
  
;; effect hook
;; (executes after re-renders & before unmounting)
(uix/effect!
  (fn []
    (prn "after update")
    #(prn "before unmount"))
  [deps])
  
;; convenience macro for uix.core/effect!
(uix/with-effect [deps]
  (prn "after update")
  #(prn "before unmount"))
  
;; more in uix.core.alpha ns
```

### Attributes syntax extension
Injects provided function into attributes transformation stage. Could be used for various side effects, such as processing styles with CSS-in-JS libraries (see example.cljs).
```clj
(uix.core.alpha/add-transform-fn
  (fn [attrs]
    (my-transform-attrs attrs)))
```

### Hiccup pre-compilation
Optionally compiles Hiccup into inlined React elements at compile-time
```clj
(uix/html
  [:h1 "Title"])

;; emits this
{
  $$typeof: Symbol.for("react.element"),
  key: null,
  ref: null,
  props: { children: "Title" },
  _owner: null
}
```

Compiler will try to inline as much as possible based on type information provided by ClojureScript's compiler (inspired by [“On fast ClojureScript React templates”](https://kevinlynagh.com/notes/fast-cljs-react-templates/)). When it is unable to determine type of the value it will emit interpretation call for the value and print a warning asking to annotate a value with either `^:inline` or `^:interpret`.

`uix.core.alpha/defui` does the same as `html` macro and additionally skips type checking arguments if a spec is provided.
```clj
(s/fdef button
  :args (s/cat :attrs map? :child string?)
  
(uix/defui button [{:keys [on-click]} child]
  [:button {:on-click on-click} child])
```

### Lazy loading components
Loading React components on-demand as Closure modules. See [code splitting](https://clojurescript.org/guides/code-splitting) guide and how lazy loading is used in React with Suspense: [guide](https://reactjs.org/docs/code-splitting.html).
```clj
(uix/require-lazy '[uix.components :refer [ui-list]])

[:# {:fallback "Loading..."}
  (when show?
    [ui-list])]
```

### Server-side rendering (JVM)
```clj
(uix/render-to-string element) ;; see https://reactjs.org/docs/react-dom-server.html#rendertostring
(uix/render-to-static-markup element) ;; see https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup
``` 

## Benchmark
```
react x 23202 ops/s, elapsed 431ms
uix-compile x 21834 ops/s, elapsed 458ms
uix-interpret x 14368 ops/s, elapsed 696ms
reagent-interpret x 7174 ops/s, elapsed 1394ms
```

## Building

- Example `clojure -A:dev -m figwheel.main -O advanced -bo dev:prod`
- Benchmark `clojure -A:dev:benchmark -m figwheel.main -O advanced -bo benchmark`
- Tests `clj -A:dev:test -m cljs.main -re node -m uix.compiler-test`
