(ns uix.dev
  (:require [clojure.string :as str]
            [uix.hooks.linter :as hooks.linter]))

(def ^:private goog-debug (with-meta 'goog.DEBUG {:tag 'boolean}))

(defn find-hooks
  "Takes body of a component as sexpr and returns
  a collection of sexprs for hook calls"
  [body]
  (let [hooks (atom [])]
    (clojure.walk/prewalk
     (fn [x]
       (when (hooks.linter/hook-call? x)
         (swap! hooks conj x))
       x)
     body)
    @hooks))

(defn with-fast-refresh [sym fdecl]
  (let [signature `(when ~goog-debug
                     (when-let [f# (.-fast-refresh-signature ~sym)]
                       (f#)))
        maybe-conds (first fdecl)]
    (if (and (map? maybe-conds) (or (:pre maybe-conds) (:post maybe-conds)))
      (cons maybe-conds (cons signature (rest fdecl)))
      (cons signature fdecl))))

(defn fast-refresh-signature [sym body]
  `(when ~goog-debug
     (when (cljs.core/exists? js/window.uix.dev)
       (let [sig# (js/window.uix.dev.signature!)]
         (sig# ~sym ~(str/join (find-hooks body)) nil nil)
         (js/window.uix.dev.register! ~sym (.-displayName ~sym))
         (set! (.-fast-refresh-signature ~sym) sig#)))))
