# Code-splitting and React.lazy

Let's say you want to split out a library of UI component into a separate bundle, so that it can be shared across multiple applications that depend on the library.

```clojure
(ns app.ui.lib
  (:require [uix.core :refer [defui $]]))

(defui button [{:keys [on-click children]}]
  ($ :button {:on-click on-click} children))
```

In the application code you can use `require-lazy` macro that will take care of wiring everything together needed for module loading. Then in UI code you can use React's `Suspense` to load the component lazily and display a fallback UI while it's loading.

> Note that require-lazy can be used only in projects built via [shadow-cljs](https://github.com/thheller/shadow-cljs)

```clojure
(ns app.core
  (:require [uix.core :refer [defui $ require-lazy]]))

(require-lazy '[app.ui.lib :refer [button]])

(defui app []
  ($ :> react/Suspense {:fallback #el [:div "Loading..."]}
    ($ button {:on-click js/console.log})))
```

Check out [React's documentation page on Code-splitting and React.lazy](https://reactjs.org/docs/code-splitting.html) for more example.
