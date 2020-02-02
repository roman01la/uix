<img src="logo.png" width="125" />

_Idiomatic ClojureScript interface to modern React.js_

Discuss at [#uix on Clojurians Slack](http://clojurians.net/). Bug reports, feature requests and PRs are welcome.

[Try it live](https://roman01la.github.io/uix/)

[API Documentation](https://roman01la.github.io/uix/docs/)

<a href="https://www.patreon.com/bePatron?c=1239559">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" height="40px" />
</a>

[![CircleCI](https://circleci.com/gh/roman01la/uix.svg?style=svg)](https://circleci.com/gh/roman01la/uix)

There are no versioned releases yet, use `deps.edn` to depend on the code via git deps.

```clj
{:deps {uix.core {:git/url "https://github.com/roman01la/uix.git"
                  :deps/root "core"
                  :sha "{{replace with commit hash}}"}
        uix.dom {:git/url "https://github.com/roman01la/uix.git"
                 :deps/root "dom"
                 :sha "{{replace with commit hash}}"}
        uix.rn {:git/url "https://github.com/roman01la/uix.git"
                :deps/root "rn"
                :sha "{{replace with commit hash}}"}}}
```

```clj
(require '[uix.core.alpha :as uix])
(require '[uix.dom.alpha :as uix.dom])

(defn button [{:keys [on-click]} text]
  [:button.btn {:on-click on-click}
    text])

(defn app []
  (let [state* (uix/state 0)]
    [:<>
      [button {:on-click #(swap! state* dec)} "-"]
      [:span @state*]
      [button {:on-click #(swap! state* inc)} "+"]]))

(uix.dom/render [app] js/root)
```

## Recipes

- [State hook](https://github.com/roman01la/uix/blob/master/core/dev/uix/recipes/state_hook.cljc)
- [Global state and effects](https://github.com/roman01la/uix/blob/master/core/dev/uix/recipes/global_state.cljc)
- [Dynamic styles](https://github.com/roman01la/uix/blob/master/core/dev/uix/recipes/dynamic_styles.cljc)
- [Lazy loading](https://github.com/roman01la/uix/blob/master/core/dev/uix/recipes/lazy_loading.cljc)
- [Server-side rendering](https://github.com/roman01la/uix/blob/master/core/dev/uix/recipes/server_rendering.clj)
- [Interop between UIx and JS components](https://github.com/roman01la/uix/blob/master/core/dev/uix/recipes/interop.cljc)
- [Popups](https://github.com/roman01la/uix/blob/master/core/dev/uix/recipes/popup.cljc)
- [Error Boundaries](https://github.com/roman01la/uix/blob/master/core/dev/uix/recipes/error_boundary.cljc)
- [React Context](https://github.com/roman01la/uix/blob/master/core/dev/uix/recipes/context.cljc)

- Build front-end `clojure -A:dev -m figwheel.main -O advanced -bo dev:prod`
- Run server `clojure -A:dev -m uix.server`
- Run front-end recipes in dev `clojure -A:dev:rec-front`
- Run SSR streaming recipe `clojure -A:dev:rec-ssr`

## Features

### Hiccup syntax extension

- `[:div#id.class]` or `[:#id.class]`
- `[:> js/Component attrs & children]` - interop with JS components
- `[:<> attrs & children]` - `React.Fragment`
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

Injects provided function into attributes transformation stage. Could be used for various side effects, such as processing styles with CSS-in-JS libraries (see `uix.recipes.dynamic-styles`).

```clj
(uix.core.alpha/add-transform-fn
  (fn [attrs]
    (my-transform-attrs attrs)))
```

### Hiccup pre-compilation (advanced)

_NOTE: UIx interpreter is already super fast (3x faster than Reagent and only 2x slower than vanilla React).
Use pre-compilation ONLY if you are hitting performance problems._

Compiles Hiccup into inlined React elements at compile-time and hoists constant elements so they can be shared across components in different namespaces (for reference see [@babel/plugin-transform-react-inline-elements](https://babeljs.io/docs/en/babel-plugin-transform-react-inline-elements) and [@babel/plugin-transform-react-constant-elements](https://babeljs.io/docs/en/babel-plugin-transform-react-constant-elements)). Hoisting is enabled with `:optimize-constants` compiler option, which is automatically enabled for `:optimizations :advanced`.

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

### Lazy loading components

Loading React components on-demand as Closure modules. See [code splitting](https://clojurescript.org/guides/code-splitting) guide and how lazy loading is used in React with Suspense: [guide](https://reactjs.org/docs/code-splitting.html).

```clj
(uix.core.lazy-loader/require-lazy
  '[uix.components :refer [ui-list]])

[:# {:fallback "Loading..."}
  (when show?
    [ui-list])]
```

### Server-side rendering

UIx can be used for SSR or usual templating in both JVM and JavaScript runtimes

#### Server-side rendering in JVM

See an example in `uix.recipes.server-rendering`

```clj
(uix.dom/render-to-string element) ;; see https://reactjs.org/docs/react-dom-server.html#rendertostring
(uix.dom/render-to-static-markup element) ;; see https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup

;; Streaming HTML
(uix.dom/render-to-stream element {:on-chunk f}) ;; see https://reactjs.org/docs/react-dom-server.html#rendertonodestream
(uix.dom/render-to-static-stream element {:on-chunk f}) ;; see https://reactjs.org/docs/react-dom-server.html#rendertostaticnodestream
```

#### Server-side rendering in JS

SSR works in JavaScript environment via React's serializer using same API.

1. Add `ReactDOMServer` into your dependencies (as `cljsjs/react-dom-server` or any other way)
2. Run `(uix.dom/render-to-string element)`

## Benchmarks

- Hiccup interpretation `clojure -A:dev:benchmark:bench-front`
- SSR on JVM `clojure -A:dev:benchmark:bench-ssr`

### Hiccup interpretation

```
react x 23866 ops/s, elapsed 419ms
uix-interpret x 11848 ops/s, elapsed 844ms
reagent-interpret x 4031 ops/s, elapsed 2481ms
```

### SSR on JVM

| lib           | test 1   | test 2 | test 3  |
| ------------- | -------- | ------ | ------- |
| rum           | 107.8 µs | 3.6 ms | 7.7 ms  |
| uix           | 120.8 µs | 3.8 ms | 8.1 ms  |
| uix streaming | 115.7 µs | 3.4 ms | 7.6 ms  |
| hiccup        | 205.7 µs | 6.5 ms | 16.6 ms |

### TodoMVC bundle size

| lib     | size  | gzip |
| ------- | ----- | ---- |
| rum     | 254KB | 70KB |
| reagent | 269KB | 74KB |
| uix     | 234KB | 65KB |

## Figwheel

When developing with Figwheel it is recommended to mark root render function with `^:after-load` meta, so Figwheel can update UI tree once the code was re-evaluated.

```clj
(ns ^:figwheel-hooks my.ns)

(defn ^:after-load render []
  (uix.dom/render [app] js/root))
```

## React DevTools

When inspecting UI tree in React DevTools, filter out `memo` components to get cleaner view of components tree.

<img src="devtools.png" width="460">

## Testing

```
scripts/test
```

_Note: to ensure you're using the right Node.js version, you can use [nvm](https://github.com/nvm-sh/nvm) and run `nvm use`
once in the directory. Otherwise the Node.js version you use is in the `.nvmrc` file. See nvm repo for more documentation._

## Who’s using UIx

- Video editor (private)
- Fitness App (private)
- [Zeal (REPL meets Clipboard Manager)](https://github.com/den1k/zeal)
- [Floor Planner](http://floor-planner.surge.sh/)
- [Happy Paw mobile web app](https://github.com/roman01la/happy-paw)
