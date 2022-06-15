# Server-side rendering

- [Public API](#public-api)
- [How to write cross-platform UI code](#how-to-write-cross-platform-ui-code)
- [Hooks](#hooks)
- [Cross-platform `uix.core` API](#cross-platform-uixcore-api)

`uix.dom.server` namespace implements React's server-side rendering in Clojure enabling UIx components serialization to HTML on JVM.

```clojure
(ns my.app
  (:require [uix.core :refer [defui $]]
            [uix.dom.server :as dom.server]))

(defui title-bar []
  ($ :div.title-bar
    ($ :h1 "Hello")))

(dom.server/render-to-static-markup ($ title-bar))
;; "<div class=\"title-bar\"><h1>Hello</h1></div>"
```

## Public API

Similar to `react-dom/server` API there are two functions to render UIx components to HTML string and their streaming counterparts:

- `uix.dom.server/render-to-static-markup` and `uix.dom.server/render-to-static-stream` — generates HTML string, can be used for templating
- `uix.dom.server/render-to-string` and `uix.dom.server/render-to-stream` — generates HTML string that will be hydarated by React on the front-end, when HTML document is loaded

## How to write cross-platform UI code

When UI should be rendered on JVM and hydrated on the client, that essentially means that same UI code should be able to run in both Clojure/JVM and ClojureScript/JS environments.

For that it's recommended to put shared code in `.cljc` namespaces and use [reader conditionals](https://clojure.org/guides/reader_conditionals) for platform specific code.

```clojure
;; ui.cljc
(ns app.ui
  (:require [uix.core :refer [defui $]]))

(defui title-bar []
  ($ :div.title-bar
    ($ :h1 "Hello")
    ;; js/console.log doesn't exist on JVM, thus the code
    ;; should be included only for ClojureScript
    ($ :button {:on-click #?(:cljs #(js/console.log %)
                             :clj nil)}
       "+")))

;; server.clj
(ns app.server
  (:require [uix.core :refer [$]]
            [uix.dom.server :as dom.server]
            [app.ui :as ui]))

(defn handle-request
  "Generates HTML to be sent to the client"
  []
  (dom.server/render-to-static-markup ($ ui/title-bar)))

;; client.cljs
(ns app.client
  (:require [uix.core :refer [$]]
            [uix.dom :as dom.client]
            [app.ui :as ui]))

(defn hydrate
  "Hydrates server generated HTML into dynamic React UI"
  [root-node]
  (dom.client/hydrate ($ ui/title-bar) root-node))
```

## Hooks

UIx follows `react-dom/server` behaviour when it comes to hooks execution during server redering.

- `use-effect`, `use-layout-effect` and `use-imperative-handle` doesn't execute when rendering to string
- `use-memo` executes provided function and returns the result, memoization is redundant and thus not applied
- `use-callback` returns provided callback, the callback is not memoized
- `use-state` and `use-reducer` returns a tuple of provided initial state value and no-op state updater function
- `use-ref` returns an atom holding provided value
- `use-context` returns current context value

## Cross-platform `uix.core` API

### React Context

When rendering on JVM one should use `uix.core/defcontext` instead of `uix.core/create-context`, which is CLJS-only. `defcontext` creates a dynamic var that in JS gets assigned React Context which is binded via Context Provider. On JVM the context is just a dynamic var itself that gets binded via `clojure.core/binding`. Those implementation details are hidden within UIx, so that you don't have to write the code twice for both platforms.

```clojure
(defcontext *ui-theme* :light)

(defui button []
  (let [theme (uix.core/use-context *ui-theme*)]
    ...))

(defui app []
  ;; With `defcontext` the context should
  ;; be rendered directly, no need for `(.-Provider *ui-theme*)`
  ;; which is JS specific
  ($ *ui-theme* {:value :dark}
    ($ button)))
```
