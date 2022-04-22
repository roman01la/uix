<img src="logo.png" width="125" />

_Idiomatic ClojureScript interface to modern React.js_

[Docs and Guides](https://roman01la.gitbook.io/pitch-uix/)

[![CircleCI](https://circleci.com/gh/pitch-io/uix.svg?style=svg)](https://circleci.com/gh/pitch-io/uix)

```clj
{:deps {uix.core/uix.core {:git/url "https://github.com/pitch-io/uix.git"
                           :deps/root "core"
                           :sha "b0cbf0bd47f83dfa2b0d6c7953bbaab008a927b2"}
        uix.dom/uix.dom {:git/url "https://github.com/pitch-io/uix.git"
                         :deps/root "dom"
                         :sha "b0cbf0bd47f83dfa2b0d6c7953bbaab008a927b2"}
        uix.rn/uix.rn {:git/url "https://github.com/pitch-io/uix.git"
                       :deps/root "rn"
                       :sha "b0cbf0bd47f83dfa2b0d6c7953bbaab008a927b2"}}}
```

```clj
(ns my.app
  (:require [uix.core :refer [defui $]]
            [uix.dom]))

(defui button [{:keys [on-click children]}]
  ($ :button.btn {:on-click on-click}
    children))

(defui app []
  (let [[state set-state!] (uix.core/use-state 0)]
    ($ :<>
      ($ button {:on-click #(set-state! dec)} "-")
      ($ :span state)]
      ($ button {:on-click #(set-state! inc)} "+"))))

(uix.dom/render ($ app) (js/document.getElementById "root"))
```

## Testing

```
scripts/test
```

_Note: to ensure you're using the right Node.js version, you can use [nvm](https://github.com/nvm-sh/nvm) and run `nvm use`
once in the directory. Otherwise the Node.js version you use is in the `.nvmrc` file. See nvm repo for more documentation._
