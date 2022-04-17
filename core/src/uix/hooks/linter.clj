(ns uix.hooks.linter
  (:require [clojure.walk]
            [clojure.pprint :as pp]))

(def ^:dynamic *component-context* nil)
(def ^:dynamic *source-context* false)
(def ^:dynamic *in-branch?* false)
(def ^:dynamic *in-loop?* false)

(defn hook? [sym]
  (and (symbol? sym)
       (some? (re-find #"^use-|use[A-Z]" (name sym)))))

(declare lint-hooks!*)

(def forms
  '{:when #{when when-not when-let when-some when-first}
    :if #{if if-not if-let if-some}
    :logical #{and or}
    :cond #{cond}
    :cond-threaded #{cond-> cond->>}
    :some-threaded #{some-> some->>}
    :condp #{condp}
    :case #{case}
    :loop #{loop}
    :for  #{for doseq}
    :iter-fn #{map mapv map-indexed filter filterv reduce reduce-kv keep keep-indexed
               remove mapcat drop-while take-while group-by partition-by split-with
               sort-by some}})

(defmulti maybe-lint
          (fn [[sym :as form]]
            (reduce-kv
              (fn [ret kw forms]
                (if (forms sym)
                  (reduced kw)
                  ret))
              form
              forms)))

(defmethod maybe-lint :default [form]
  form)

(defmethod maybe-lint :when [[_ test & body]]
  (lint-hooks!* test :in-branch? false)
  (run! #(lint-hooks!* % :in-branch? true) body))

(defmethod maybe-lint :if [[_ test then else]]
  (lint-hooks!* test :in-branch? false)
  (lint-hooks!* then :in-branch? true)
  (lint-hooks!* else :in-branch? true))

(defmethod maybe-lint :logical [[_ test & tests]]
  (lint-hooks!* test :in-branch? false)
  (run! #(lint-hooks!* % :in-branch? true) tests))

(defmethod maybe-lint :cond [[_ clause & clauses]]
  (lint-hooks!* clause :in-branch? false)
  (run! #(lint-hooks!* % :in-branch? true) clauses))

(defmethod maybe-lint :condp [[_ pred e clause & clauses]]
  (lint-hooks!* pred :in-branch? false)
  (lint-hooks!* e :in-branch? false)
  (lint-hooks!* clause :in-branch? false)
  (run! #(lint-hooks!* % :in-branch? true) clauses))

(defmethod maybe-lint :cond-threaded [[_ e & clauses]]
  (lint-hooks!* e :in-branch? false)
  (->> (partition 2 clauses)
       (run! (fn [[test expr]]
               (lint-hooks!* test :in-branch? false)
               (lint-hooks!* expr :in-branch? true)))))

(defmethod maybe-lint :some-threaded [[_ e clause & clauses]]
  (lint-hooks!* e :in-branch? false)
  (lint-hooks!* clause :in-branch? false)
  (run! #(lint-hooks!* % :in-branch? true) clauses))

(defmethod maybe-lint :case [[_ e clause & clauses]]
  (lint-hooks!* e :in-branch? false)
  (lint-hooks!* clause :in-branch? false)
  (run! #(lint-hooks!* % :in-branch? true) clauses))

(defmethod maybe-lint :loop [[_ bindings & body]]
  (lint-hooks!* bindings :in-loop? false)
  (run! #(lint-hooks!* % :in-loop? true) body))

(defmethod maybe-lint :for [[_ bindings & body]]
  (let [[binding & bindings] (partition 2 bindings)]
    (lint-hooks!* (second binding) :in-loop? false)
    (run! (fn [[v expr]] (lint-hooks!* expr :in-loop? true))
          bindings)
    (run! #(lint-hooks!* % :in-loop? true) body)))

(defmethod maybe-lint :iter-fn [[_ f :as form]]
  (when (and (list? f)
             ('#{fn fn*} (first f))
             (vector? (second f)))
    (let [[_ _ & body] f]
      (run! #(lint-hooks!* % :in-loop? true) body))))

(defn add-error! [form type]
  (swap! *component-context* update :errors conj {:source form
                                                  :source-context *source-context*
                                                  :type type}))

(defn lint-hooks!*
  [expr & {:keys [in-branch? in-loop?]
           :or {in-branch? *in-branch?*
                in-loop? *in-loop?*}}]
  (binding [*in-branch?* in-branch?
            *in-loop?* in-loop?]
    (clojure.walk/prewalk
      (fn [form]
        (cond
          (and (list? form) (hook? (first form)))
          (do (when *in-branch?* (add-error! form :hook-in-branch))
              (when *in-loop?* (add-error! form :hook-in-loop))
              nil)

          (and (list? form) (or (not *in-branch?*) (not *in-loop?*)))
          (binding [*source-context* form]
            (maybe-lint form))

          :else form))
      expr)
    nil))

(defn lint-hooks! [exprs]
  (run! lint-hooks!* exprs))

(defmulti error->msg (fn [_ err] (:type err)))

(defmethod error->msg :hook-in-branch [{:keys [name column line]} {:keys [source source-context]}]
  ;; https://github.com/facebook/react/blob/d63cd972454125d4572bb8ffbfeccbdf0c5eb27b/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js#L457
  (str "React Hook " source " is called conditionally.\n"
       "React Hooks must be called in the exact same order in every component render.\n"
       "Found in " name ", at " line ":" column "\n"
       "Problematic code: " (with-out-str (pp/pprint source-context))))

(defmethod error->msg :hook-in-loop [{:keys [name column line]} {:keys [source source-context]}]
  ;; https://github.com/facebook/react/blob/d63cd972454125d4572bb8ffbfeccbdf0c5eb27b/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js#L438
  (str "React Hook " source " may be executed more than once. "
       "Possibly because it is called in a loop. "
       "React Hooks must be called in the exact same order in "
       "every component render.\n"
       "Found in " name ", at " line ":" column "\n"
       "Problematic code: " (with-out-str (pp/pprint source-context))))

(defn lint! [sym form env]
  (binding [*component-context* (atom {:errors []})]
    (lint-hooks! form)
    (let [{:keys [errors]} @*component-context*
          {:keys [column line]} env]
      (binding [*out* *err*]
        (->> errors
             (map (fn [err]
                    [(error->msg
                       {:name (str (-> env :ns :name) "/" sym)
                        :column column
                        :line line}
                       err)
                     (:type err)]))
             (run! (fn [[msg tag]] (throw (ex-info msg {:tag tag})))))))))

