(ns uix.hooks.linter
  (:require [clojure.walk]
            [cljs.analyzer :as ana]
            [clojure.string :as str])
  (:import (cljs.tagged_literals JSValue)))

;; === Rules of Hooks ===

(def ^:dynamic *component-context* nil)
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
          (do (when *in-branch?* (add-error! form ::hook-in-branch))
              (when *in-loop?* (add-error! form ::hook-in-loop))
              nil)

          (and (list? form) (or (not *in-branch?*) (not *in-loop?*)))
          (maybe-lint form)

          :else form))
      expr)
    nil))

(defn lint-hooks! [exprs]
  (run! lint-hooks!* exprs))

(defmethod ana/error-message ::hook-in-branch [_ {:keys [name column line source]}]
  ;; https://github.com/facebook/react/blob/d63cd972454125d4572bb8ffbfeccbdf0c5eb27b/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js#L457
  (str "React Hook " source " is called conditionally.\n"
       "React Hooks must be called in the exact same order in every component render.\n"
       "Found in " name ", at " line ":" column))

(defmethod ana/error-message ::hook-in-loop [_ {:keys [name column line source]}]
  ;; https://github.com/facebook/react/blob/d63cd972454125d4572bb8ffbfeccbdf0c5eb27b/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js#L438
  (str "React Hook " source " may be executed more than once. "
       "Possibly because it is called in a loop. "
       "React Hooks must be called in the exact same order in "
       "every component render.\n"
       "Found in " name ", at " line ":" column))

(defn lint! [sym form env]
  (binding [*component-context* (atom {:errors []})]
    (lint-hooks! form)
    (let [{:keys [errors]} @*component-context*
          {:keys [column line]} env]
      (run! #(ana/warning (:type %) env (into {:name (str (-> env :ns :name) "/" sym)
                                               :column column
                                               :line line}
                                              %))
            errors))))

;; === Exhaustive Deps ===

(defn find-free-variables [env f deps]
  (let [syms (atom #{})
        deps (set deps)]
    (clojure.walk/postwalk
      #(cond
         (symbol? %)
         (do (swap! syms conj %)
             %)

         (= (type %) JSValue)
         (.-val %)

         :else %)
      f)
    (keep #(let [local (get-in env [:locals % :name])]
             (when (and local (nil? (deps local)))
               local))
          @syms)))

(defmethod ana/error-message ::inline-function [_ {:keys [source]}]
  (str "React Hook " source " received a function whose dependencies "
       "are unknown. Pass an inline function instead."))

(defmethod ana/error-message ::missing-deps [_ {:keys [source syms deps]}]
  (str "React Hook " source " has missing dependencies: [" (str/join " " syms) "]. "
       "Update the dependencies vector to be: [" (str/join " " (concat deps syms)) "]"))

(defmethod ana/error-message ::deps-array-literal [_ {:keys [source]}]
  (str "React Hook " source " was passed a "
       "dependency list that is a JavaScript array, instead of Clojure’s vector. "
       "Change it to be a vector literal."))

(defmethod ana/error-message ::deps-coll-literal [_ {:keys [source]}]
  (str "React Hook " source " was passed a "
       "dependency list that is not a vector literal. This means we "
       "can’t statically verify whether you've passed the correct dependencies. "
       "Change it to be a vector literal with explicit set of dependencies."))

(defmethod ana/error-message ::literal-value-in-deps [_ {:keys [source literals]}]
  (str "React Hook " source " was passed literal values in dependency vector: [" (str/join ", " literals) "]. "
       "Those are not valid dependencies because they never change. You can safely remove them."))

(defn- fn-literal? [form]
  (and (list? form) ('#{fn fn*} (first form))))

(def literal?
  (some-fn keyword? number? string? nil? boolean?))

(defn- deps->literals [deps]
  (filter literal? deps))

(defn lint-exhaustive-deps! [env form f deps]
  (when deps
    (cond
      ;; when deps are passed as JS Array, should be a vector instead
      (and (= (type deps) JSValue) (vector? (.-val deps)))
      (ana/warning ::deps-array-literal env {:source form})

      ;; when deps are neither JS Array nor Clojure's vector, should be a vector instead
      (not (vector? deps))
      (ana/warning ::deps-coll-literal env {:source form})

      ;; when deps vector has a primitive literal, it can be safely removed
      (seq (deps->literals deps))
      (ana/warning ::literal-value-in-deps env {:source form :literals (deps->literals deps)})))

  (cond
    ;; when a reference to a function passed into a hook, should be an inline function instead
    (not (fn-literal? f))
    (ana/warning ::inline-function env {:source form})

    (vector? deps)
    (let [syms (find-free-variables env f deps)]
      ;; when hook function is referencing vars from out scope that are missing in deps vector
      (when (seq syms)
        (ana/warning ::missing-deps env {:syms syms :deps deps :source form})))))
