(ns uix.compiler.debug
  (:require [clojure.string :as str]))

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

;; ============ Adapting React warnings to UIx ============

(defn react-keys-error? [args]
  (let [first-arg (aget args 0)]
    (and (string? first-arg)
         (str/starts-with? (aget args 0) "Warning: Each child in a list should have a unique \"key\" prop."))))

(defn format-react-keys-error [args]
  (let [msg (str/replace (aget args 1) #"`(.+)`" (fn [[_ component-name]]
                                                   (format-display-name component-name)))
        args-arr (js/Array.from args)]
    (aset args-arr 1 msg)
    args-arr))

(defn format-console-error [args]
  (cond
    (react-keys-error? args) (format-react-keys-error args)
    :else args))

(when ^boolean goog.DEBUG
  (defonce js-console-error js/console.error)
  (set! (.-error js/console) #(.apply js-console-error js/console (format-console-error (js-arguments)))))
