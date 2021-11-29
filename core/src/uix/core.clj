(ns uix.core
  "Public API"
  (:require [uix.compiler.aot]
            [uix.source]
            [cljs.core]))

(defn- no-args-component [sym body]
  `(defn ~sym []
     ~@body))

(defn- with-args-component [sym args body]
  `(defn ~sym [props#]
     (let [~args (cljs.core/array (glue-args props#))
           f# (fn [] ~@body)]
       (f#))))

(defn parse-sig [name fdecl]
  (let [[fdecl m] (if (string? (first fdecl))
                    [(next fdecl) {:doc (first fdecl)}]
                    [fdecl {}])
        [fdecl m] (if (map? (first fdecl))
                    [(next fdecl) (conj m (first fdecl))]
                    [fdecl m])
        fdecl (if (vector? (first fdecl))
                (list fdecl)
                fdecl)
        [fdecl m] (if (map? (last fdecl))
                    [(butlast fdecl) (conj m (last fdecl))]
                    [fdecl m])
        m (conj {:arglists (list 'quote (#'cljs.core/sigs fdecl))} m)
        m (conj (if (meta name) (meta name) {}) m)]
    (assert (= 1 (count fdecl)) (str `defui " doesn't support multi-arity"))
    [(with-meta name m) (first fdecl)]))

(defmacro
  ^{:arglists '([name doc-string? attr-map? [params*] prepost-map? body]
                [name doc-string? attr-map? ([params*] prepost-map? body)+ attr-map?])}
  defui
  "Compiles UIx component into React component at compile-time."
  [sym & fdecl]
  (let [[fname [args & fdecl]] (parse-sig sym fdecl)]
    (uix.source/register-symbol! sym)
    `(do
       ~(if (empty? args)
          (no-args-component fname fdecl)
          (with-args-component fname args fdecl))
       (set! (.-uix-component? ~(with-meta sym {:tag 'js})) true)
       (with-name ~sym ~(-> &env :ns :name str) ~(str sym)))))

(defmacro source
  "Returns source string of UIx component"
  [sym]
  (uix.source/source sym))
