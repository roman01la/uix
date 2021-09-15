(ns uix.compiler.alpha
  "Hiccup and UIx components interpreter. Based on Reagent."
  (:require [react :as react]
            [uix.hooks.alpha :as hooks]
            [cljs-bean.core :as bean]))

(def ^:dynamic *default-compare-args* #(= (.-argv %1) (.-argv %2)))

(defn unwrap-ref [-ref]
  (if (implements? hooks/IRef -ref)
    (hooks/unwrap ^not-native -ref)
    -ref))

(defn js-val? [x]
  (not (identical? "object" (goog/typeOf x))))

(defn portal-element [^not-native argv]
  (.warn js/console "React portal Hiccup syntax :-> is deprecated, use uix.dom.alpha/create-portal instead")
  (let [child (-nth argv 1 nil)
        target (-nth argv 2 nil)
        node (if (or (string? target) (keyword? target))
               (.querySelector js/document (name target))
               target)]
    ;; `child` has to be compiled
    (js/ReactDOM.createPortal child node)))

(defn symbol-for [s]
  (js* "Symbol.for(~{})" s))

(defn default-format-display-name [^string s]
  (let [^js/Array parts (.split s #"\$")
        last-idx (dec ^number (.-length parts))
        ^string name-part (aget parts last-idx)]
    (if (== 1 (.-length parts))
      (demunge name-part)
      (-> ^js/Array (.slice parts 0 last-idx)
          ^string (.join ".")
          (str "/" name-part)
          demunge))))


(def ^:dynamic *format-display-name* default-format-display-name)

(defn format-display-name [s]
  (if (fn? *format-display-name*)
    (*format-display-name* s)
    (throw (ex-info "unexpected uix.compiler.alpha/*format-display-name* is not bound to a function"
                    {:bound-value *format-display-name*
                     :value-type (goog/typeOf *format-display-name*)}))))

(defn effective-component-name [^js f]
  (or (when-some [display-name (.-displayName f)]
        (if (string? display-name)
          display-name))
      (when-some [name (.-name f)]
        (if (string? name)
          name))))

(defn with-name [^js f]
  (when-let [component-name (effective-component-name f)]
    (when-some [display-name (format-display-name component-name)]
      (set! (.-displayName f) display-name)))
  f)

(defn as-lazy-component [f]
  (with-name f))

(defn as-react [f]
  #(f (bean/bean %)))

(defn component-element [component-type props children]
  (let [js-props (if-some [key (:key props)]
                   #js {:key key :argv (dissoc props :key)}
                   #js {:argv props})]
    (.apply react/createElement nil (.concat #js [(with-name component-type) js-props] children))))
