# Elements

UIx is using `$` to create elements that describe UI structure. There are 3 main types of elements: DOM elements, UIx component instances and interop elements.

## DOM elements

`$` takes tag name keyword, optional map of attributes and zero or more child elements.

```clojure
($ :button {:title "Submit"} "press me")
```

Element name is declared as a keyword with optional `id` and `class` attributes defined as a part of the name. Together they resemble CSS selector syntax.

```clojure
($ :div) ;; <div></div>
($ :h1.heading {:class "h1"} "👋") ;; <h1 class="heading h1">👋</h1>
($ :button#id.class1.class2) ;; <button id="id" class="class1 class2"></button>
```

## UIx component instances

Component instance is also created via `$` macro call, where the first argument is the component function itself, the second argument is an optional map of props and the rest are child elements.

```clojure
(defui button [{:keys [on-click children]}]
  ($ :button.btn {:on-click on-click}
    children))

($ button {:on-click #(js/console.log :click)}
  "press me")
```

## Interop elements

Interop syntax exists to allow using React components written in JavaScript as UIx components. More on that in [“Interop with React”](/docs/interop-with-react.md) page.

```clojure
($ :> Button {:on-click #(js/console.log :click)}
    "press me")
```
