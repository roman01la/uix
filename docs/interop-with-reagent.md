# Interop with Reagent

## Using Reagent components in UIx

In order to use Reagent component in UIx you just have to wrap Reagent's Hiccup with `r/as-element` so that Reagent can take care of Hiccup and convert it into React calls.

```clojure
(defn reagent-component []
  ...)

(defui uix-component []
  ($ :div (r/as-element [reagent-component])))
```

## Using UIx components in Reagent

When using UIx component in Reagent or anywhere else all you have to do is to keep using `$` macro. The macro will make sure that UIx component is properly created, no matter in which context it is used.

```clojure
(defui uix-component []
  ...)

(defn reagent-component []
  [:div ($ uix-component)])
```
