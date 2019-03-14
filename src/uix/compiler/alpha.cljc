(ns uix.compiler.alpha
  (:refer-clojure :exclude [ref])
  (:require [clojure.string :as str]
            #?(:cljs  [react :as r])
            #?(:cljs  [react-dom :as rdom])
            #?(:cljs [goog.object :as gobj])
            [uix.specs.alpha :as uix.specs]))

(defn unwrap-ref [-ref]
  #?(:cljs (.-rref -ref)
     :clj nil))

(defn kebab->camel [k]
  (let [s (name k)
        [prefix & words] (str/split s #"-")]
    (if (#{"data" "aria"} prefix)
      s
      (str/join (cons prefix (map str/capitalize words))))))

(defn transform-attrs [m]
  #?(:cljs
     (reduce
       (fn [o [k v]]
         (cond
           (= k :style) (gobj/set o (kebab->camel k) (transform-attrs v))
           (satisfies? IDeref v) (gobj/set o "ref" (unwrap-ref v))
           :else (gobj/set o (kebab->camel k) v))
         o)
       #js {}
       m)))

(defmulti compile-hiccup-ast first)

(defmethod compile-hiccup-ast :number [[_ value]]
  value)

(defmethod compile-hiccup-ast :string [[_ value]]
  value)

(defmethod compile-hiccup-ast :null [[_ value]]
  value)

(defmethod compile-hiccup-ast :memo [[_ value]]
  value)

(defmethod compile-hiccup-ast :lazy [[_ value]]
  value)

(defmethod compile-hiccup-ast :hiccup/form [[_ value]]
  (compile-hiccup-ast value))

(defmethod compile-hiccup-ast :hiccup/seq [[_ value]]
  (into-array (map compile-hiccup-ast value)))

(defn parse-selector [s]
  (loop [matches (re-seq #"([#.])?([^#.]+)" (name s))
         tag     "div"
         ids      nil
         classes nil]
    (if-let [[_ prefix val] (first matches)]
      (case prefix
        nil (recur (next matches) val ids classes)
        "#" (recur (next matches) tag (cons val ids) classes)
        "." (recur (next matches) tag ids (cons val classes)))
      [tag ids classes])))

(defn normalize-attrs [ids classes attr]
  (let [class (:class attr)
        classes (if class (cons class classes) classes)]
    (-> attr
        (update :id #(str/join " " (if % (cons % ids) ids)))
        (assoc :class-name (str/join " " classes)))))

(defn children->react-children [children]
  (let [children (map compile-hiccup-ast children)]
    (if (= 1 (count children))
      (first children)
      (into-array children))))

(defmethod compile-hiccup-ast :element [[_ {:keys [type attr children] :as e}]]
  #?(:cljs
     (let [[type ids classes] (parse-selector (name type))
           {:keys [key ref]} (meta e)
           children (children->react-children children)
           attr (cond-> (normalize-attrs ids classes attr)
                        key (assoc :key key)
                        ref (assoc :ref ref)
                        :always transform-attrs)
           _ (set! (.-children attr) children)]
       (r/createElement type attr))))

(defmethod compile-hiccup-ast :fragment [[_ {:keys [attr children]}]]
  #?(:cljs
     (let [children (children->react-children children)
           attr (transform-attrs attr)
           _ (set! (.-children attr) children)]
       (r/createElement r/Fragment attr))))

(defmethod compile-hiccup-ast :interop [[_ {:keys [type attr children]}]]
  #?(:cljs
     (let [children (children->react-children children)
           attr (transform-attrs attr)
           _ (set! (.-children attr) children)]
       (r/createElement type attr))))

(defmethod compile-hiccup-ast :portal [[_ {:keys [child node]}]]
  #?(:cljs
     (rdom/createPortal (compile-hiccup-ast child) node)))

(defmethod compile-hiccup-ast :suspense [[_ {:keys [attr child]}]]
  (let [fallback (compile-hiccup-ast (:fallback attr))]
    #?(:cljs
       (r/createElement
         r/Suspense
         #js {:fallback fallback}
         (when child (compile-hiccup-ast child))))))

(defmethod compile-hiccup-ast :component [[_ {:keys [type args] :as c}]]
  #?(:cljs
     (let [type (compile-hiccup-ast type)
           {:keys [key]} (meta c)
           attrs #js {}
           _ (set! (.-uixargs attrs) args)
           _ (when key (set! (.-key attrs) key))]
       (r/createElement type attrs))))

;; == Fast-path Hiccup reader ==

(declare read-hiccup-form)

(defn hiccup-component? [type]
  (or (uix.specs/memo? type) (uix.specs/lazy? type)))

(defn read-hiccup-child [form]
  (if (seq? form)
    [:hiccup/seq (map read-hiccup-form form)]
    [:hiccup/form (read-hiccup-form form)]))

(defn read-hiccup-suspense [[marker attr child]]
  {:marker marker
   :attr {:fallback (read-hiccup-form (:fallback attr))}
   :child (read-hiccup-form child)})

(defn read-hiccup-portal [[marker child node]]
  {:marker marker
   :child (read-hiccup-form child)
   :node node})

(defn read-hiccup-interop [[marker type attr & children]]
  (let [children (if (map? attr)
                   children
                   (cons attr children))
        attr (when (map? attr) attr)]
    {:marker marker
     :type type
     :attr attr
     :children (map read-hiccup-child children)}))

(defn read-hiccup-fragment [[type attr & children]]
  (let [children (if (map? attr)
                   children
                   (cons attr children))
        attr (when (map? attr) attr)]
    {:type type
     :attr attr
     :children (map read-hiccup-child children)}))

(defn read-hiccup-element [[type attr & children]]
  (let [children (if (map? attr)
                   children
                   (cons attr children))
        attr (when (map? attr) attr)]
    {:type type
     :attr attr
     :children (map read-hiccup-child children)}))

(defn read-hiccup-component [[type & args]]
  {:type (cond
           (uix.specs/memo? type) [:memo type]
           (uix.specs/lazy? type) [:lazy type]
           :else (throw (str "Unknown type of Hiccup component: " type)))
   :args args})

(defn read-hiccup-vector [form]
  (let [[type] form]
    (cond
      (= :# type) [:suspense (read-hiccup-suspense form)]
      (= :-> type) [:portal (read-hiccup-portal form)]
      (= :> type) [:interop (read-hiccup-interop form)]
      (= :<> type) [:fragment (read-hiccup-fragment form)]
      (keyword? type) [:element (read-hiccup-element form)]
      (hiccup-component? type) [:component (read-hiccup-component form)]
      :else (throw (str "Unknown type of Hiccup element: " type " in " form)))))

(defn read-hiccup-form [form]
  (cond
    (vector? form) (read-hiccup-vector form)
    (number? form) [:number form]
    (string? form) [:string form]
    (nil? form) [:null form]
    :else (throw (str "Don't know how to read Hiccup form: " form))))
