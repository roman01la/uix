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

That works as expected for primitive values like numbers and strings, but what about Clojure's maps and vectors that can be compared by value?

```clojure
(= {:x 1} {:x 1}) ;; true
```

Two maps equal by value but with different identity are considered to be not equal when React compares dependencies. This is happening because React is a JS library that is not aware of Clojure's equality algorithm, instead React is comparing values by identity `===` or `Object.is`. Thus it's important to think about what type of values you are passing as dependencies of a hook. It applies to JS as well, objects and arrays are still compared by reference.

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

In addition to JavaScript's primitive types like `Number` or `String`, ClojureScript has keywords, symbols and UUIDs that are represented as JS objects when compiled into JS and thus fall into the same trap with equality check. To make things simpler UIx automatically stringifies those three types when passed in the dependency vector.

## Return value in effect hooks

The _setup_ function, that is passed into one of the effect hooks, requires the return value to be either a function (that will be called on _cleanup_) or `js/undefined`. Otherwise React will throw an error saying that it got something else.

```clojure
(react/useEffect
  (fn []
    :keyword) ;; returning `:keyword` here will throw
  #js [])
```

Now in ClojureScript, when an expression returns _nothing_, it actually returns `nil`, which is compiled into `null` in JS. Since `null` is neither a function, nor `undefined`, React will throw as well.

```clojure
(react/useEffect
  (fn []
    (when false (prn :x))) ;; returns `nil` and thus React throws
  #js [])
```

Thus when using React hooks directly you'd have to explicitly return `js/undefined` in such cases.

```clojure
(react/useEffect
  (fn []
    (when false (prn :x))
    js/undefined)
  #js [])
```

This complication is also handled by UIx and if the return value is `nil` it will automatically return `js/undefined`. However keep in mind that since in Clojure the last expression is always returned implicitly, you still have to think about the return value and make sure that unexpected values are not returned from the _setup_ function.

In other words, make sure you ultimately only return `nil` or a function when using the UIx hooks, otherwise React will throw an error.

```clojure
(uix/use-effect
  (fn []
    (when false (prn :x))) ;; `nil` is handled, doesn't throw
  [])

(uix/use-effect
  (fn []
    (map inc [1 2 3])) ;; returns a collection and thus React throws
  [])
```

## Differences from `use-callback` and `use-memo` hooks

In pure React both the `use-callback` and `use-memo` hooks accept an optional dependency array. However, since the purpose of both hooks is memoization it generally doesn't make sense to call them without any dependencies; not providing the dependency array effectively means there's no memoization applied. In JavaScript this is enforced by ESLint rule, in UIx on the other hand we simply removed the single arity method for those hooks, and so you must always pass a dependency vector.

## `use-ref` hook

The `use-ref` hook returns an object that has a stable identity throughout the lifecycle of a component and allows storing arbitrary values inside of it. A ref is basically a mutable container bound to an instance of a component. This aligns pretty well with Clojure's `ref` types, namely `Atom` which is commonly used as a mutable container for immutable values.

While in pure React `useRef` returns an object with `current` property, in UIx `use-ref` returns the same object, but with an API identical to `Atom`. The ref can be dereferenced `@` to read its current value, and updated via `reset!` or `swap!` to set a new value.

```clojure
(defui component []
  (let [ref (uix/use-ref)]
    (uix/use-layout-effect
      (fn []
        (js/console.log (.-clientWidth @ref))))
    ($ :div {:ref ref})))
```
