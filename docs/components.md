# Components

UIx components are defined using `defui` macro that returns React elements created using `$` macro. The signature of `$` macro is similar to `React.createElement` , with an additional shorthand syntax in the tag name to declare CSS id and class names, similar to Hiccup:

```js
// React without JSX
React.createElement("div", { onClick: f }, child1, child2);
```

```clojure
;; UIx
($ :div#id.class {:on-click f} child1 child2)
```

```clojure
(ns my.app
  (:require [uix.core :refer [defui $]]))

(defui button [{:keys [on-click children]}]
  ($ :button {:on-click on-click}
    children))

(defui text-input [{:keys [value type on-change]}]
  ($ :input {:value value
             :type type
             :on-change #(on-change (.. % -target -value))}))

(defui sign-in-form [{:keys [email password]}]
  ($ :form
    ($ text-input {:value email :type :email})
    ($ text-input {:value password :type password})
    ($ button {} "Sign in")))
```

## Component props

`defui` components are similar to React’s JSX components in a way how they take props and children, and provide them within a component in a single map of props.

Let's take a look at the following example:

```js
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

<Button onClick={console.log}>Press me</Button>;
```

The `Button` component takes JSX attributes and `"Press me"` string as a child element. The signature of the component declares a single parameter which is assigned to an object of passed in attributes + child elements stored under `children` key.

Similarly in UIx, components are taking a map of props and an arbitrary number of child elements, and the signature of the `defui` declares a single parameter which is assigned a hash map of passed in properties + child elements assigned to `:children` key.

```clojure
(defui button [{:keys [on-click children]}]
  ($ :button {:on-click on-click}
    children))

($ button {:on-click js/console.log} "Press me")
```

## DOM attributes

DOM attributes are keywords in kebab-case. Values that are normally strings without whitespace can be written as keywords as well, this may also improve autocompletion in your IDE.

```clojure
($ :button {:title "play button"
            :data-test-id :play-button})
```

## children

Similar to React, child components are passed as `children` in props map. `children` is JS Array of React elements.

```clojure
(defui popover [{:keys [children]}]
  ($ :div.popover children))
```

## :ref attribute

[Refs](https://reactjs.org/docs/refs-and-the-dom.html) provide a way to refer to DOM nodes. In UIx ref is passed as a normal attribute onto DOM elements, similar to React. `use-ref` return a ref with Atom-like API: the ref can be dereferenced `@` and updated with either `clojure.core/reset!` or `clojure.core/swap!`.

```clojure
(defui form []
  (let [ref (uix.core/use-ref)]
    ($ :form
      ($ :input {:ref ref})
      ($ :button {:on-click #(.focus @ref)}
        "press to focus on input"))))
```

> UIx components doesn't take refs because they are built on top of React's function-based components that doesn't have instances.

When you need to pass a ref into child component, pass it as a normal prop.

```clojure
(defui text-input [{:keys [ref]}]
  ($ :input {:ref ref}))

(defui form []
  (let [ref (uix.core/use-ref)]
    ($ :form
      ($ text-input {:ref ref})
      ($ :button {:on-click #(.focus @ref)}
        "press to focus on input"))))
```

## Class-based components
Sometimes you want to create a class-based React component, for example an error boundary. For that there's `uix.core/create-class` function.

```clojure
(def error-boundary
  (uix.core/create-class
    {:displayName "error-boundary"
     :getInitialState (fn [] #js {:error nil})
     :getDerivedStateFromError (fn [error] #js {:error error})
     :componentDidCatch (fn [error error-info]
                          (this-as this
                            (let [props (.. this -props -argv)]
                              (when-let [on-error (:on-error props)]
                                (on-error error)))))
     :render (fn []
               (this-as this
                 (if (.. this -state -error)
                   ($ :div "error")
                   (.. this -props -children))))}))

($ error-boundary {:on-error js/console.error}
  ($ some-ui-that-can-error))
```
