# Interop with React

## Using React components in UIx

In [“Elements”](/docs/elements.md) section we've learned about special interop syntax for consuming React components written in JavaScript.

As an example lets say we have `Button` component that we want to use in UIx component.

```js
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
```

Here’s how to use it in UIx:

```clojure
($ :> Button {:on-click #(js/console.log :click)}
    "press me")
```

Interop element starts with a special marker `:>`, followed by JS component, that instructs UIx to handle provided component in a special way:

1. The first argument to JS component is optional map of attributes
   - Map of attributes is _shallowly_ transformed into JavaScript object, meaning that it is your responsibility to pass nested objects as proper JS objects or arrays
   - `:style` attribute is the only exception, the value can be Clojure’s hash map which will be turned into JS object
   - Keys in kebab case are transformed into camel case
2. The rest are child components

> UIx components wrapped with React.lazy or React.memo can be created as usual UIx components, there's no need for :> syntax, this will not actually work.

```clojure
(defui button [props] ...)

(def memoized-button (react/memo button))

($ memoized-button {:on-click handle-click})
```

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
