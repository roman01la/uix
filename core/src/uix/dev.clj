(ns uix.dev
  (:require [clojure.string :as str]
            [uix.linter]
            [uix.lib]))

(def ^:private goog-debug (with-meta 'goog.DEBUG {:tag 'boolean}))

(defn with-fast-refresh [var-sym fdecl]
  (let [signature `(when ~goog-debug
                     (when-let [f# (.-fast-refresh-signature ~var-sym)]
                       (f#)))
        maybe-conds (first fdecl)]
    (if (and (map? maybe-conds) (or (:pre maybe-conds) (:post maybe-conds)))
      (cons maybe-conds (cons signature (rest fdecl)))
      (cons signature fdecl))))

(defn fast-refresh-signature [var-sym body]
  `(when ~goog-debug
     (when (cljs.core/exists? js/window.uix.dev)
       (let [sig# (js/window.uix.dev.signature!)]
         (sig# ~var-sym ~(str/join (uix.lib/find-form uix.linter/hook-call? body)) nil nil)
         (js/window.uix.dev.register! ~var-sym (.-displayName ~var-sym))
         (set! (.-fast-refresh-signature ~var-sym) sig#)))))
