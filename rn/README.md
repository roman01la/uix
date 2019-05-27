<img src="../logo.png" width="125" />

_Experimental ClojureScript wrapper for modern React.js_

Bug reports, feature requests and PRs are welcome 👌

There are no versioned releases yet, use `deps.edn` to depend on the code via git deps.

Rendering target package, `react-native` wrapper.

## How to use UIx in React Native

1. Install [re-natal](https://github.com/drapanjanas/re-natal)
2. Initialize Reagent-based project `re-natal init {{AppName}}`
3. Remove `reagent` from `:dependencies` in `project.clj`
4. Add `[lein-tools-deps "0.4.5"]` to `:plugins` in `project.clj`
5. Add `:middleware [lein-tools-deps.plugin/resolve-dependencies-with-deps-edn]` to `project.clj`
6. Add `:lein-tools-deps/config {:config-files [:project] :clojure-executables ["/usr/local/bin/clojure"]}` to `project.clj`
7. Replace `env/dev/env/ios/main.cljs` with contents of `setup/ios-dev.cljs`, and replace `{{app-name}}` with your's apps root ns name
8. Replace `env/dev/env/android/main.cljs` with contents of `setup/android-dev.cljs`, and replace `{{app-name}}` with your's apps root ns name
9. Delete `src/reagent` directory
10. Delete `src/{{app-name}}/db.cljs`, `src/{{app-name}}/subs.cljs` and `src/{{app-name}}/events.cljs` files
11. Replace `src/{{app-name}}/ios/core.cljs` with contents of `setup/ios-core.cljs`, and replace `{{app-name}}` with your's apps root ns name
12. Replace `src/{{app-name}}/android/core.cljs` with contents of `setup/android-core.cljs`, and replace `{{app-name}}` with your's apps root ns name
13. Follow [re-natal's README](https://github.com/drapanjanas/re-natal) for further instructions
