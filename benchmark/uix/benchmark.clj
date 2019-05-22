(ns uix.benchmark
  (:require [clojure.string :as str]
            [net.cgrand.enlive-html :as enlive]
            [clojure.test :refer [deftest]]
            [criterium.core :as criterium]
            [hiccup.core :as hiccup]
            [rum.core :as rum]
            [uix.core.alpha :as uix])
  (:import (java.io ByteArrayInputStream)))

(defmacro bench [k iters expr]
  `(let [start# (js/Date.now)
         ret# (dotimes [_# ~iters] ~expr)
         end# (js/Date.now)
         elapsed# (- end# start#)
         rate# (js/Math.round (* (/ ~iters elapsed#) 1000))]
     (println (str ~(name k) " x " rate# " ops/s, elapsed " elapsed# "ms"))))


;; ========================

(def ^:dynamic *convert-style?* true)

(defn convert-tag-name [tag attrs]
  (let [id (:id attrs)
        classes (when-not (str/blank? (:class attrs))
                  (->> (str/split (:class attrs) #"\s+")
                       (remove str/blank?)))]
    (keyword
      (str tag
           (when id (str "#" id))
           (when-not (empty? classes)
             (str "." (str/join "." classes)))))))

(defn convert-style [s]
  (into {}
        (for [[_ k v] (re-seq #"([\w+\-]+)\s*:\s*([^;]+)" s)]
          (let [k' (keyword k)
                v' (condp re-matches v
                     #"(\d+)px" :>> (fn [[_ n]] (Long/parseLong n))
                     #"(\d+\.\d+)px" :>> (fn [[_ n]] (Double/parseDouble n))
                     v)]
            [k' v']))))

(defn convert-attrs [attrs]
  (cond-> attrs
          true (dissoc :class :id :data-bem)
          (and *convert-style?*
               (contains? attrs :style)) (update :style convert-style)
          true not-empty))

(defn convert-tag [form]
  (cond
    ;; tag
    (map? form)
    (if (= :comment (:type form))
      nil
      (let [{:keys [tag attrs content type]} form
            tag' (convert-tag-name (name tag) attrs)
            attrs' (convert-attrs attrs)
            children (->> (map convert-tag content)
                          (remove nil?))]
        (vec
          (concat [tag'] (when attrs' [attrs']) children))))

    ;; text node
    (string? form)
    (if (str/blank? form) nil form)))

(defn convert-page [page]
  (-> (slurp page)
      .getBytes
      ByteArrayInputStream.
      enlive/html-resource
      (enlive/select [:body])
      first
      convert-tag))

(defn -main [& args]
  (doseq [page ["page1.html"
                "page2.html"
                "page3.html"]
          :let [path (str "benchmark/pages/" page)]]
    (let [comp (convert-page path)]
      (println "\n--- Rum: testing" page "---")
      (criterium/quick-bench (rum/render-static-markup comp))

      (println "\n--- UIx: testing" page "---")
      (criterium/quick-bench (uix/render-to-static-markup comp))

      (println "\n--- UIx streaming: testing" page "---")
      (criterium/quick-bench (uix/render-to-static-stream comp {:on-chunk (fn [_])})))

    (let [comp (binding [*convert-style?* false]
                 (convert-page path))]
      (println "\n+++ With Hiccup +++")
      (criterium/quick-bench (hiccup/html comp)))))
