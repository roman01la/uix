(ns uix.hooks.alpha
  "Wrappers for React.js Hooks"
  (:refer-clojure :exclude [ref])
  #?(:cljs (:require-macros [uix.hooks.alpha :refer [maybe-deps maybe-js-deps maybe-ret-fn with-deps-check]]))
  #?(:cljs (:require [react :as r]
                     [goog.object :as gobj])))

;; == State hook ==
#?(:cljs
   (deftype StateHook [value set-value]
     Object
     (equiv [this other]
       (-equiv this other))

     IHash
     (-hash [o] (goog/getUid o))

     IDeref
     (-deref [o]
       value)

     IReset
     (-reset! [o new-value]
       (set-value new-value))

     ISwap
     (-swap! [o f]
       (-reset! o (f value)))
     (-swap! [o f a]
       (-reset! o (f value a)))
     (-swap! [o f a b]
       (-reset! o (f value a b)))
     (-swap! [o f a b xs]
       (-reset! o (apply f value a b xs)))

     IPrintWithWriter
     (-pr-writer [o writer opts]
       (-write writer "#object [uix.hooks.alpha.StateHook ")
       (pr-writer {:val value} writer opts)
       (-write writer "]"))))

#?(:cljs
   (defn state
     "Takes initial value and returns an instance of StateHook."
     [value]
     (let [[value set-value] (r/useState value)]
       (StateHook. value set-value)))

   :clj
   (defn state [value]
     (atom value)))

(defprotocol IRef
  (unwrap [this]))

;; == Ref hook
#?(:cljs
   (deftype RefHook [rref]
     IRef
     (unwrap [this]
       rref)

     Object
     (equiv [this other]
       (-equiv this other))

     IHash
     (-hash [o] (goog/getUid o))

     IDeref
     (-deref [o]
       (gobj/get rref "current"))

     IReset
     (-reset! [o new-value]
       (gobj/set rref "current" new-value)
       new-value)

     ISwap
     (-swap! [o f]
       (-reset! o (f (-deref o))))
     (-swap! [o f a]
       (-reset! o (f (-deref o) a)))
     (-swap! [o f a b]
       (-reset! o (f (-deref o) a b)))
     (-swap! [o f a b xs]
       (-reset! o (apply f (-deref o) a b xs)))

     IPrintWithWriter
     (-pr-writer [o writer opts]
       (-write writer "#object [uix.hooks.alpha.RefHook ")
       (pr-writer {:val (-deref o)} writer opts)
       (-write writer "]"))))

(defn ref
  "Takes optional initial value and returns an instance of RefHook."
  ([]
   (ref nil))
  ([value]
   #?(:cljs (RefHook. (r/useRef value))
      :clj (atom value))))

#?(:clj
   (defmacro maybe-js-deps [deps]
     `(if ~deps (into-array ~deps) js/undefined)))

#?(:clj
   (defmacro maybe-deps [deps]
     `(or ~deps js/undefined)))

#?(:clj
   (defmacro maybe-ret-fn [f]
     `(fn [] (or (~f) js/undefined))))

#?(:clj
   (defmacro with-deps-check [[prev-deps] f deps]
     `(let [~prev-deps (ref ~deps)]
        (when (not= @~prev-deps ~deps)
          (reset! ~prev-deps ~deps))
        ~f)))

;; == Effect hook ==
(defn effect!
  "Takes a function to be executed in an effect and optional vector of dependencies.

  See: https://reactjs.org/docs/hooks-reference.html#useeffect"
  ([setup-fn]
   #?(:cljs (effect! setup-fn js/undefined)
      :clj (effect! setup-fn nil)))
  ([setup-fn deps]
   #?(:cljs (with-deps-check [prev-deps*]
              (r/useEffect
               (fn []
                 (reset! prev-deps* deps)
                 (let [ret (setup-fn)]
                   (if (fn? ret) ret js/undefined)))
               (maybe-deps @prev-deps*))
              deps)
      :clj nil)))

#?(:clj
   (defmacro with-effect
     "Takes optional vector of dependencies and body to be executed in an effect."
     [deps body]
     (let [[deps setup-fn] (if (vector? deps)
                             [deps body]
                             [nil (cons deps body)])]
       `(effect! #(do ~@setup-fn) (maybe-js-deps ~deps)))))

;; == Layout effect hook ==
(defn layout-effect!
  "Takes a function to be executed in a layout effect and optional vector of dependencies.

  See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect"
  ([setup-fn]
   #?(:cljs (layout-effect! setup-fn js/undefined)
      :clj (layout-effect! setup-fn nil)))
  ([setup-fn deps]
   #?(:cljs (with-deps-check [prev-deps*]
              (r/useLayoutEffect
               (fn []
                 (reset! prev-deps* deps)
                 (let [ret (setup-fn)]
                   (if (fn? ret) ret js/undefined)))
               (maybe-deps @prev-deps*))
              deps)
      :clj nil)))

#?(:clj
   (defmacro with-layout-effect
     "Takes optional vector of dependencies and body to be executed in a layout effect."
     [deps body]
     (let [[deps setup-fn] (if (vector? deps)
                             [deps body]
                             [nil (cons deps body)])]
       `(layout-effect! #(do ~@setup-fn) (maybe-js-deps ~deps)))))

;; == Callback hook ==
(defn callback
  "Takes function f and optional vector of dependencies, and returns f."
  ([f]
   (callback f nil))
  ([f deps]
   #?(:cljs (r/useCallback f (maybe-js-deps deps))
      :clj f)))

;; == Memo hook ==
(defn memo
  "Takes function f and optional vector of dependencies, and returns memoized f."
  ([f]
   (memo f nil))
  ([f deps]
   #?(:cljs (r/useMemo f (maybe-js-deps deps))
      :clj f)))
