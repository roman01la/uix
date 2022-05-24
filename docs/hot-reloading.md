# Hot reloading

While UIx component tree can be reloaded in a traditional way, by re-rendering from the root after reload, this resets component local state and re-runs hooks. It happens because effectively a reloaded namespace creates new component functions which in turn invailidates UI tree when re-rendering after reload and thus updated components are re-mounted.

[react-refresh](https://www.npmjs.com/package/react-refresh) makes it possible to reload components in a way that preserves local state and state of hooks.

## Setup for shadow-cljs

1. Make sure you have [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) installed for your browser

2. Install the package `yarn add react-refresh --dev`

3. Create dev-only namespace that will be responsible for managning hot-reloading

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

5. That's it. Now you can edit UIx component, hit save and once reloaded in the browser, local state should be preserved.

### Things to look out for

Make sure that your UI is not re-rendered from the root in a trasitional way when using fast-refresh, otherwise fast-refresh won't work and you'll still get state reset.
