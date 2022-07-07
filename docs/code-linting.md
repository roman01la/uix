# Hooks linter

UIx has a built-in linter that will help you to use React Hooks correctly. The linter is built into `defui` and default `uix.core/*` hooks, it implements a set of rules from React's official [ESLint plugin](https://reactjs.org/docs/hooks-rules.html).

While in original ESLint plugin there are rules that can be considered as suggestions and thus reported as warnings, most of the rules implemented in UIx should be always followed, breaking them will lead to bugs in UI. For this reason in UIx a broken rule will fail a build so that it's impossible to build a project with problematic behaviour in UI components.

## What's the rule of thumb to use Hooks correctly?

Call hooks at the top level in component's body

```clojure
;; bad
(defui component [{:keys [active?]}]
  (when active?
    (use-effect ...))
  ...))

;; good
(defui component [{:keys [active?]}]
  (use-effect
    (fn []
      (when active?
        ...)))
  ...))
```

List all necessary dependencies in deps vector for hooks that require dependencies

```clojure
;; bad
(defui component [{:keys [active? id]}]
  (use-effect
    (fn []
      (when active?
        (rf/dispatch :user/set-id {:id id})))
    [active?])
  ...))

;; good
(defui component [{:keys [active? id]}]
  (use-effect
    (fn []
      (when active?
        (rf/dispatch :user/set-id {:id id})))
    [active? id])
  ...))
```

## What type of errors UIx is able to catch?

### Hooks called inside of conditions or iterating functions

The rule here is to call function at the top level of component's body.

```clojure
(defui component [{:keys [active?]}]
  (when active?
    (use-effect ...)) ;; error
  ...))

(defui component [{:keys [items]}]
  (for [item items]
    ($ list-item
      {:item item
                 ;; error
       :on-click (use-callback #(rf/dispatch %) [item])}))))
```

### A hook doesn't meet its dependencies requirements

> This rule is currently experimental and disabled, it's possible to opt-in by adding `^:lint-deps` meta onto deps vector

This rule will check for missing and unnecessary dependencies and suggest a correct deps vector.

```clojure
(defui component [{:keys [active? id]}]
  (use-effect
    (fn []
      (when active?
        (rf/dispatch :user/set-id {:id id})))
    [active?]) ;; error, update deps vector to [active? id]
  ...))
```

### Unsafe set-state in effect hook without dependencies

This type of code leads to infinite loop of updates in components.

```clojure
(defui component [{:keys [active? id]}]
  (let [[value set-value] (use-state 0)]
    (use-effect
      (fn []
        (set-value (inc value)))))) ;; error

(defui component [{:keys [active? id]}]
  (let [[value set-value] (use-state 0)]
    (use-effect
      (fn []
        (set-value (inc value)))
      [value]))) ;; fix: only run hook when value changes
```

### A hook is being passed something as deps that is not a vector literal

Deps should be always a vector literal of constant size, React doesn't allow deps to be of dynamic length because it causes issues in UI components.

```clojure
;; incorrect
(defui component [{:keys [labels]}]
  (let [dimensions (use-memo #(measure-labels labels) labels)]
    ...))

;; correct
(defui component [{:keys [labels]}]
  (let [dimensions (use-memo #(measure-labels labels) [labels])]
    ...))
```

### A hook is being passed deps as JS array instead of a vector

This is UIx specific, since UIx is a Clojure wrapper it expects a vector of deps instead of JS array to be more idiomatic with repsect to Clojure.

```clojure
(defui component [{:keys [html]}]
  (let [html (use-memo #(sanitize-html html) #js [html])] ;; incorrect
    ...))

(defui component [{:keys [html]}]
  (let [html (use-memo #(sanitize-html html) [html])] ;; correct
    ...))
```

### A function reference is passed into a hook instead of an inline function

This won't cause actual bugs, but it prevents further type checking to determine if the hook satisfies dependency requirements, thus it's encouraged to use inline function instead. Note that linter might improve in the future and this rule will be depreacated.

```clojure
(defui component [{:keys [active? id]}]
  (let [do-something (fn []
                       (when active?
                         (rf/dispatch :user/set-id {:id id})))]
    ;; deps are correct, but it still gonna error
    (use-effect do-something [active? id])))

(defui component [{:keys [active? id]}]
  (let [do-something (fn [active? id]
                       (when active?
                         (rf/dispatch :user/set-id {:id id})))]
  ;; now linter is able to check whether the effect meets deps requirements correctly
  (use-effect #(do-something active? id) [active? id])))
```

# Reagent interop linter

When migrating from Reagent + re-frame to UIx you might want to keep using re-frame or at least stick with it for some time, because migrating data management is not as simple as rewriting UI components.

To make sure this transition path is smooth UIx will check for re-frame `subscribe` calls in UIx components and trigger compilation error that will suggest to use `use-subscribe` hook instead and point to [“Syncing with ratoms and re-frame”](https://github.com/pitch-io/uix/blob/master/docs/interop-with-reagent.md#syncing-with-ratoms-and-re-frame) section in UIx docs.

Given this piece of code

```clojure
(defui component []
  (rf/subscribe [:user/id]))
```

You'll get the following compilation error

```
re-frame subscription (rf/subscribe [:user/id])) is non-reactive in UIx components when called via re-frame.core/subscribe, use `use-subscribe` hook instead.

Read https://github.com/pitch-io/uix/blob/master/docs/interop-with-reagent.md#syncing-with-ratoms-and-re-frame for more context
```

# Configuring the linter

UIx's linter can be provided with external configuration that should live in `.uix/config.edn` file at the root of your project.

Currently the only onfiguration option available is for re-frame `subscribe` checks for cases when you are wrapping the function in application code.

Example

```clojure
{:linters
 {:re-frame
  {:resolve-as {my.app/subscribe re-frame.core/subscribe}}}}
  ;; re-frame.core/subscribe is checked by default
```
