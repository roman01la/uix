(ns ^:figwheel-hooks uix.core
  #?(:cljs (:require-macros [uix.core :refer [defui]]))
  (:require #?(:clj [clojure.spec.alpha :as s])
            #?(:cljs [cljs.spec.alpha :as s])
            #?(:cljs [react :as r])
            #?(:cljs [react-dom :as rdom])))

(s/def :hiccup/element-inst
  (s/and
    vector?
    (s/cat
      :type keyword?
      :attr (s/? map?)
      :children (s/* :hiccup/form))))

(s/def :hiccup/component-inst
  (s/and
    vector?
    (s/cat
      :type fn?
      :args (s/* any?))))

(s/def :hiccup/fragment
  (s/and
    vector?
    (s/cat
      :type #{:<>}
      :attr (s/? map?)
      :children (s/* :hiccup/form))))

(s/def :hiccup/form
  (s/or
    :fragment :hiccup/fragment
    :element :hiccup/element-inst
    :component :hiccup/component-inst
    :number number?
    :string string?))

(defmulti compile-hiccup-ast first)

(defmethod compile-hiccup-ast :number [[_ value]]
  value)

(defmethod compile-hiccup-ast :string [[_ value]]
  value)

(defmethod compile-hiccup-ast :element [[_ {:keys [type attr children]}]]
  #?(:cljs
     (apply
       r/createElement
       (name type)
       (clj->js attr)
       (map compile-hiccup-ast children))))

(defmethod compile-hiccup-ast :fragment [[_ {:keys [attr children]}]]
  #?(:cljs
     (apply
       r/createElement
       r/Fragment
       (clj->js attr)
       (map compile-hiccup-ast children))))

(defmethod compile-hiccup-ast :component [[_ {:keys [type args]}]]
  #?(:cljs
     (r/createElement type #js {:uixargs args})))

#?(:clj
   (defmacro defui [sym args & body]
     `(defn ~sym [prop#]
        (let [~args (.-uixargs prop#)]
          (hiccup->react (do ~@body))))))

(defn hiccup->react [element]
  (if (s/valid? :hiccup/form element)
    (-> (s/conform :hiccup/form element)
        compile-hiccup-ast)
    (prn (s/explain-data :hiccup/form element))))

(defui button [attrs text]
  [:button attrs text])

#?(:cljs
    (deftype StateHook [value set-value]
      IDeref
      (-deref [o]
        value)
      IReset
      (-reset! [o new-value]
        (set-value new-value)
        new-value)
      ISwap
      (-swap! [o f]
        (-reset! o (f value)))
      (-swap! [o f a]
        (-reset! o (f value a)))
      (-swap! [o f a b]
        (-reset! o (f value a b)))
      (-swap! [o f a b xs]
        (-reset! o (apply f value a b xs)))))

#?(:clj
   (deftype StateHook [value set-value]))

#?(:cljs
   (defn state [value]
     (let [[value set-value] (r/useState value)]
       (StateHook. value set-value))))

#?(:clj
   (defn state [value]))

(defui counter []
  (let [value (state 0)]
    [:<>
     [button {:onClick #(swap! value dec)}
      "-"]
     [:span @value]
     [button {:onClick #(swap! value inc)}
      "+"]]))

#?(:cljs
   (defn render [element node]
     (-> (hiccup->react element)
         (rdom/render node)))

   :clj (defn render [element node]))

#?(:cljs (render [counter] js/root))



(defn ^:after-load -render [])

