# Interop with React

## Using React components in UIx

In [“Elements”](/docs/elements.md) section it was briefly mentioned that React components written in JavaScript can be used in `$` macro, but with a difference in how props are passed into such a component.

As an example lets say we have `Button` component that we want to use in UIx component.

```js
function Button({ onClick, title, style, className, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={style}
      className={className.join(" ")}
    >
      {children}
    </button>
  );
}
```

Here’s how to use it in UIx:

```clojure
($ Button {:on-click #(js/console.log :click)
           :title "this is a button"
           :style #js {:border "1px solid red"}
           :class-name #js ["hello" "world"]}
  "press me")
```

When a non-UIx component is passed into `$`, props map is converted into JS object using the following set of rules:

1. kebab-cased keys are automatically converted into camel-cased keys.
1. When a component expects a kebab-cased key, it can be passed as a string to avoid conversion.
1. props map is converted _shallowly_ into JavaScript object, meaning that nested collections and maps are not converted. If a JS component expects a prop to hold an array or object, you have to pass it explicitly. This is illustrated in the example above where `Button` expects `className` props to be JS array and `style` to be an object.

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
