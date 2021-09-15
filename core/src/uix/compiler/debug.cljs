(ns uix.compiler.debug)

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
