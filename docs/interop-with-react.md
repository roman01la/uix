# Interop with React

## Using React components in UIx

In [“Elements”](/docs/elements.md) section it was briefly mentioned that React components written in JavaScript can be used in `$` macro, but with a difference in how props are passed into such a component.

As an example lets say we have `Button` component that we want to use in UIx component.

```js
function Button({ onClick, title, style, className, children }) {
  return (
    <button onClick={onClick} title={title} style={style} className={className}>
      {children}
    </button>
  );
}
```

Here’s how to use it in UIx:

```clojure
($ Button {:on-click #(js/console.log :click)
           :title "this is a button"
           :style {:border "1px solid red"}
           :class :button}
  "press me")
```

When a non-UIx component is passed into `$`, props map is converted into JS object using the following set of rules:

1. kebab-cased keys are automatically converted into camel-cased keys.
   - Similarly to DOM elements props, the following keys are renamed into their React counterparts:
     - `:class` -> `"className"`
     - `:for` -> `"htmlFor"`
     - `:charset` -> `"charSet"`
1. When a component expects a kebab-cased key, it can be passed as a string to avoid conversion.
1. props map is converted _shallowly_ into a JavaScript object, meaning that nested collections and maps are not converted. If a JS component expects a prop to hold an array or an object, you have to pass it explicitly. There are two exceptions though:

   - `:style` map is always converted into a JS object because it's a common prop, when passing styles into a third-party component.
   - Keyword values are converted into strings.

## Using UIx components in React

Now the other way around, we want to use UIx component in React component.

To achieve this we have to write interop layer using `uix.core/as-react` helper that takes a function which will take React props as a bean and call UIx component.

> Note that `as-react` doesn’t transform camel case keys into kebab case.

```clojure
(defui button [{:keys [on-click children]}]
  ($ :button {:on-click on-click}
    children))

(def Button
  (uix.core/as-react
    (fn [{:keys [onClick children]}]
      ($ button {:on-click onClick :children children}))))
```

Now `Button` can used as a normal React component.

```js
<Button onClick={console.log}>press me</Button>
```
