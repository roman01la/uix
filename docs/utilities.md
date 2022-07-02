# Utilities

## Component's source string
Sometimes you might need to print component's source as a string, the most common use case would be when building a design system it's useful to display source alongside live UI. Instead of writing code twice (as UI code and as source string) an dkeeping it in sync, it would be cool to just print UI code itself.

`uix.core/source` macro does exactly that, it takes a reference to a component and returns its source string at compile-time:

```clojure
(ns app.ui
  (:require [uix.core :refer [$ defui]]
            [uix.dom]))

(defui button [props]
  ($ :button.btn props))

;; renders code block with `button`s source
(uix.dom/render ($ :pre (uix.core/source button))
                (js/document.getElementById "root"))
```
