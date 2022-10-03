# Hot reloading

While a UIx component tree can be reloaded in a traditional way, by re-rendering from the root after reload, this resets component local state and re-runs hooks. It happens because the reloaded namespace will create new component functions, which in turn invalidate the UI tree when re-rendering after reload and cause the updated components to be re-mounted.

[react-refresh](https://www.npmjs.com/package/react-refresh) makes it possible to reload components in a way that preserves local state and the state of hooks.

## Setup for shadow-cljs

1. Make sure you have [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) installed for your browser

2. Install the package `yarn add react-refresh --dev`

3. Create a dev-only namespace that will be responsible for managning hot-reloading

```clojure
(ns my.app.preload
  (:require [uix.dev]))

;; initializes fast-refresh runtime
(uix.dev/init-fast-refresh!)

;; called by shadow-cljs after every reload
(defn ^:dev/after-load refresh []
  ;; performs components refresh
  (uix.dev/refresh!))
```

4. Add the namespace to `:preloads` so that it's only loaded in dev

```clojure
;; shadow-cljs.edn
{:builds
 {:build-id
  {:devtools {:preloads [my.app.preload]}}}}
```

5. That's it. Now you can edit a UIx component, hit save, and once reloaded in the browser the local state should be preserved.

### Things to look out for

Make sure that your UI is not re-rendered from the root in a traditional way when using fast-refresh, otherwise fast-refresh won't work and the state will be reset.
