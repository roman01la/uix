(ns uix.hooks.alpha
  "Wrappers for React Hooks"
  (:require [react :as r]))

;; == State hook ==

(defn use-state [value]
  (r/useState value))

(defn use-reducer
  ([f value]
   (r/useReducer #(f %1 %2) value))
  ([f value init-state]
   (r/useReducer #(f %1 %2) value init-state)))

;; == Ref hook

(defn use-ref [value]
  (r/useRef value))

;; == Effect hook ==
(defn use-effect
  ([setup-fn]
   (r/useEffect
    #(let [ret (setup-fn)]
       (if (fn? ret) ret js/undefined))))
  ([setup-fn deps]
   (r/useEffect
    #(let [ret (setup-fn)]
       (if (fn? ret) ret js/undefined))
    deps)))

;; == Layout effect hook ==
(defn use-layout-effect
  ([setup-fn]
   (r/useLayoutEffect
    #(let [ret (setup-fn)]
       (if (fn? ret) ret js/undefined))))
  ([setup-fn deps]
   (r/useLayoutEffect
    #(let [ret (setup-fn)]
       (if (fn? ret) ret js/undefined))
    deps)))

;; == Callback hook ==
(defn use-callback
  ([f]
   (r/useCallback f))
  ([f deps]
   (r/useCallback f deps)))

;; == Memo hook ==
(defn use-memo
  ([f]
   (r/useMemo f))
  ([f deps]
   (r/useMemo f deps)))

;; == Context hook ==
(defn use-context [v]
  (r/useContext v))

;; == Imperative Handle hook ==
(defn use-imperative-handle
  ([ref create-handle]
   (r/useImperativeHandle ref create-handle))
  ([ref create-handle deps]
   (r/useImperativeHandle ref create-handle deps)))

;; == Debug hook ==
(defn use-debug
  ([v]
   (use-debug v nil))
  ([v fmt]
   (r/useDebugValue v fmt)))
