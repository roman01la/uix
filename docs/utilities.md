# Utilities

## Component's source string
Sometimes you might need to print a component's source as a string. The most common use case would be when building a design system where it's useful to display the source alongside live UI. Instead of writing code twice (as UI code and as source string) and keeping it in sync, it is possible to print the UI code directly.

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
