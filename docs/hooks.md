# Hooks

UIx wraps existing React hooks to smooth over some rough spots and provide a more idiomatic interface for Clojure. `uix.core` exposes only the default React hooks, named equivalently to the JS versions except in kebab-case, e.g. `useEffect` becomes `use-effect`.

There are multiple differences from pure React though.

## Dependency array

Some hooks accept an array of dependencies as the second argument. While in pure React it has to be an array literal, `#js []`, to make it more idiomatic for Clojure, in UIx it is a vector literal `[]`.

```clojure
(uix/use-effect
  (fn [] (prn x))
  [x])
```

## How are dependencies compared?

When the same dependency has a different value between component updates, the hook will rerun.

```clojure
;; 1st update
(uix/use-effect
  (fn [] (prn x)) ;; prn 1
  [x]) ;; x = 1

;; 2nd update
(uix/use-effect
  (fn [] (prn x))
  [x]) ;; x = 1, didn't change, do nothing

;; 3rd update
(uix/use-effect
  (fn [] (prn x)) ;; prn 2
  [x]) ;; x = 2, `x` has changed, rerun the hook
```

That works as expected for primitive values that map to identical constructs in JS like numbers and strings, but what about Clojure's maps and vectors that can be compared by value?

TL;DR: As a rule of thumb, you should prefer to use only primitives as dependencies inside of a hook.

In React, comparison is done by identity, not value, and in JS, while two primitives with the same value have the same identity, two objects with the same value do not. Since a Clojure map is compiled into a JS object, even if two maps has the same value, they will never have the same identity, meaning that React will always see them as different. In other words, comparison in React is done using JS's `===` or `Object.is`, not Clojure's `=`.

Thus it's important to think about what type of values you are passing as dependencies of a hook. This principle applies to JS as well, as objects and arrays are still compared by reference.

```clojure
;; 1st update
(let [a {:x 1}]
  (uix/use-effect
    (fn [] (prn a)) ;; executed
    [a])))

;; 2nd update
(let [a {:x 1}]
  (uix/use-effect
    (fn [] (prn a)) ;; executed as well, since `a` is a new map that was created during render
    [a])))

;; 3rd update
(let [a {:x 1}]
  (uix/use-effect
    (fn [] (prn a)) ;; same, still executed for the same reason
    [a])))
```

### What about other Clojure's primitives?

In addition to JavaScript's primitives like `Number` or `String`, ClojureScript has keywords, symbols and UUIDs that are represented as JS objects when compiled into JS and thus fall into the same trap with equality check.

To make things more idiomatic and less cumbersome in Clojure, UIx automatically stringifies those three types when passed in the dependency vector.

## Return value in effect hooks

The _setup_ function, that is passed into one of the effect hooks, requires the return value to be either a function (that will be called on _cleanup_) or `js/undefined`. Otherwise React will throw an error saying that it got something else.

```clojure
(react/useEffect
  (fn []
    :keyword) ;; returning `:keyword` here will throw
  #js [])
```

In ClojureScript, when an expression returns _nothing_, it actually returns `nil`, which is compiled into `null` in JS. Since `null` is neither a function nor `undefined` React will throw in this case as well.

```clojure
(react/useEffect
  (fn []
    (when false (prn :x))) ;; returns `nil` and thus React throws
  #js [])
```

Thus when using React hooks directly you'd have to explicitly return `js/undefined` in most cases.

```clojure
(react/useEffect
  (fn []
    (when false (prn :x))
    js/undefined)
  #js [])
```

This complication is also handled by UIx and if the return value is not a function it will automatically return `js/undefined`. However keep in mind that, since in Clojure the last expression is always returned implicitly, you still have to make sure the hook doesn't return a function accidentally, because it's going to be executed in its _cleanup_ phase.

In other words, React will never complain about return value in UIx's effect hooks, unlike in pure React. And since Clojure has implicit return, make sure you don't return a function by accident.

```clojure
(uix/use-effect
  (fn []
    (when false (prn :x))) ;; `nil` is not a function, nothing from here
  [])

(uix/use-effect
  (fn []
    (map inc [1 2 3])) ;; return value is a collection, nothing wrong here as well
  [])

  (uix/use-effect
    (fn []
      (map inc)) ;; return value is a function (transducer),
    [])          ;; it's gonna be executed as a cleanup function,
                 ;; is that intended?
```

## Differences from `use-callback` and `use-memo` hooks

In pure React both the `use-callback` and `use-memo` hooks accept an optional dependency array. However, since the purpose of both hooks is memoization it generally doesn't make sense to call them without any dependencies; not providing the dependency array effectively means there's no memoization applied. In JavaScript this is enforced by ESLint rule, in UIx on the other hand we simply removed the single arity method for those hooks, and so you must always pass a dependency vector.

## `use-ref` hook

The `use-ref` hook returns an object that has a stable identity throughout the lifecycle of a component and allows storing arbitrary values inside of it. A ref is basically a mutable container bound to an instance of a component. This aligns pretty well with Clojure's `ref` types, namely `Atom` which is commonly used as a mutable container for immutable values.

While in pure React `useRef` returns an object with `current` property, in UIx `use-ref` returns the same object, but with an API identical to `Atom`. The ref can be dereferenced `@` to read its current value, and updated via `reset!` or `swap!` to set a new value.

Note that unlike `r/atom` in Reagent, a ref in UIx and React is not a state primitive, it's a mutable value that doesn't trigger an update.

```clojure
(defui component []
  (let [ref (uix/use-ref)]
    (uix/use-layout-effect
      (fn []
        (js/console.log (.-clientWidth @ref))))
    ($ :div {:ref ref})))
```
