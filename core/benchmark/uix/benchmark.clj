(ns uix.benchmark
  (:require [clojure.test :refer [deftest]]))

(defmacro bench [k iters expr]
  `(let [start# (js/Date.now)
         ret# (dotimes [_# ~iters] ~expr)
         end# (js/Date.now)
         elapsed# (- end# start#)
         rate# (js/Math.round (* (/ ~iters elapsed#) 1000))]
     (println (str ~(name k) " x " rate# " ops/s, elapsed " elapsed# "ms"))
     elapsed#))
