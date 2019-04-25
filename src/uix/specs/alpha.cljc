(ns uix.specs.alpha
  (:require #?(:clj [clojure.spec.alpha :as s])
            #?(:cljs [cljs.spec.alpha :as s])
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
