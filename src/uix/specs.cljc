(ns uix.specs
  (:require #?(:clj [clojure.spec.alpha :as s])
            #?(:cljs [cljs.spec.alpha :as s])
            #?(:cljs [goog.object :as gobj])))

(s/def :hiccup/child
  (s/or
    :hiccup/form :hiccup/form
    :hiccup/seq (s/coll-of :hiccup/form :min-count 0 :kind seq?)))

(s/def :hiccup/element-inst
  (s/and
    vector?
    (s/cat
      :type keyword?
      :attr (s/? map?)
      :children (s/* :hiccup/child))))

(defn preserve-metadata [spec]
  (s/conformer
    #(let [m (meta %)
           ret (s/conform spec %)]
       (if (satisfies? #?(:cljs IMeta :clj clojure.lang.IMeta) ret)
         (with-meta ret m)
         ret))))

#?(:cljs (def memo-symbol (js-invoke js/Symbol "for" "react.memo")))

(defn memo? [o]
  #?(:cljs
     (= (gobj/get o "$$typeof") memo-symbol)))

(s/def :hiccup/component-inst
  (s/and
    vector?
    (preserve-metadata
      (s/cat
        :type memo?
        :args (s/* any?)))))

(s/def :hiccup/fragment
  (s/and
    vector?
    (s/cat
      :type #{:<>}
      :attr (s/? map?)
      :children (s/* :hiccup/child))))

(s/def :hiccup/form
  (s/or
    :fragment :hiccup/fragment
    :element :hiccup/element-inst
    :component :hiccup/component-inst
    :number number?
    :string string?))
