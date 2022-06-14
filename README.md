<img src="logo.png" width="125" />

_Idiomatic ClojureScript interface to modern React.js_

API compatibility: React v17

UIx v1 is in [roman01la/uix](https://github.com/roman01la/uix) repo

[![CircleCI](https://circleci.com/gh/pitch-io/uix.svg?style=svg)](https://circleci.com/gh/pitch-io/uix)

## Installation

```clj
{:deps {uix.core/uix.core {:git/url "https://github.com/pitch-io/uix.git"
                           :deps/root "core"
                           :sha "a9be95ed5033dddcb77f67a1c6faa08e58ea08b2"}
        uix.dom/uix.dom {:git/url "https://github.com/pitch-io/uix.git"
                         :deps/root "dom"
                         :sha "a9be95ed5033dddcb77f67a1c6faa08e58ea08b2"}}}
```

## Usage

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

## Docs

- [What is UIx?](/docs/what-is-uix.md)
- [Components](/docs/components.md)
- [Elements](/docs/elements.md)
- [Hooks](/docs/hooks.md)
- [State](/docs/state.md)
- [Effects](/docs/effects.md)
- [Interop with React](/docs/interop-with-react.md)
- [Interop with Reagent](/docs/interop-with-reagent.md)
- [Code-splitting and React.lazy](/docs/code-splitting.md)
- [Migrating from Reagent](/docs/migrating-from-reagent.md)
- [Hot reloading](/docs/hot-reloading.md)

## Testing

```
scripts/test
```

_Note: to ensure you're using the right Node.js version, you can use [nvm](https://github.com/nvm-sh/nvm) and run `nvm use`
once in the directory. Otherwise the Node.js version you use is in the `.nvmrc` file. See nvm repo for more documentation._
