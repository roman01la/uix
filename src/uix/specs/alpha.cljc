(ns uix.specs.alpha
  (:require #?(:clj [clojure.spec.alpha :as s])
            #?(:cljs [cljs.spec.alpha :as s])
            #?(:cljs [goog.object :as gobj])
            [cljs.core.specs.alpha :as core.specs]))

(s/def :lazy/libspec
  (s/and
    seq?
    (s/cat
      :quote #{'quote}
      :libspec (s/spec
                 (s/cat
                   :lib simple-symbol?
                   :marker #{:refer}
                   :refer ::core.specs/refer)))))

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
#?(:cljs (def lazy-symbol (js-invoke js/Symbol "for" "react.lazy")))

(defn memo? [o]
  #?(:cljs
     (= (gobj/get o "$$typeof") memo-symbol)))

(defn lazy? [o]
  #?(:cljs
     (= (gobj/get o "$$typeof") lazy-symbol)))

(s/def :hiccup/component-inst
  (s/and
    vector?
    (preserve-metadata
      (s/cat
        :type (s/alt :memo memo?
                     :lazy lazy?)
        :args (s/* any?)))))

(s/def :hiccup/fragment
  (s/and
    vector?
    (s/cat
      :type #{:<>}
      :attr (s/? map?)
      :children (s/* :hiccup/child))))

(s/def :hiccup/interop
  (s/and
    vector?
    (s/cat
      :marker #{:>}
      :type fn?
      :attr (s/? map?)
      :children (s/* :hiccup/child))))

(defn dom-node? [node]
  #?(:cljs (instance? js/Node node)
     :clj nil))

(s/def :hiccup/portal
  (s/and
    vector?
    (s/cat
      :marker #{:->}
      :child :hiccup/form
      :node dom-node?)))

(s/def :hiccup/suspense
  (s/and
    vector?
    (s/cat
      :marker #{:#}
      :attr (s/keys :req-un [:suspense/fallback])
      :child :hiccup/form)))

(s/def :hiccup/form
  (s/or
    :suspense :hiccup/suspense
    :portal :hiccup/portal
    :interop :hiccup/interop
    :fragment :hiccup/fragment
    :element :hiccup/element-inst
    :component :hiccup/component-inst
    :number number?
    :string string?
    :null nil?))

(s/def :suspense/fallback
  :hiccup/form)
