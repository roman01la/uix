(ns ^:figwheel-hooks uix.core
  #?(:cljs (:require-macros [uix.core :refer [defui]]
                            [uix.hooks :refer [with-effect]]))
  (:require #?(:clj [clojure.spec.alpha :as s])
            #?(:cljs [cljs.spec.alpha :as s])
            #?(:cljs [react :as r])
            #?(:cljs [react-dom :as rdom])
            [uix.compiler :as compiler]
            [uix.hooks :as hooks]
            [uix.specs]))

(defn hiccup->react [element]
  (if (s/valid? :hiccup/form element)
    (-> (s/conform :hiccup/form element)
        compiler/compile-hiccup-ast)
    (prn (s/explain-data :hiccup/form element))))

(defn debug-name [v m]
  #?(:cljs
     (let [{ns' :ns name' :name} m
           unmangled-name (str ns' "/" name')]
       (set! (.-displayName v) unmangled-name))
     :clj (fn [v m])))

(defn use-memo [f]
  #?(:cljs (r/memo f #(= (.-uixargs %1) (.-uixargs %2)))
     :clj f))

#?(:clj
   (defmacro defui [sym args & body]
     `(do
        (def ~sym
          (use-memo
            (fn [prop#]
              (let [~args (.-uixargs prop#)]
                (hiccup->react (do ~@body))))))
        (debug-name ~sym (meta (var ~sym))))))

#?(:cljs
        (defn render [element node]
          (-> (hiccup->react element)
              (rdom/render node)))

   :clj (defn render [element node]))

;; == Usage ==

(defui list-item [child]
  [:li child])

(defui counter []
  (let [n (hooks/state 0)]
    [:<>
     [:button {:onClick #(swap! n inc)} "+"]
     [:ul
      (for [n (range @n)]
        ^{:key n}
        [list-item (str "#" n)])]]))

#?(:cljs (render [counter] js/root))



(defn ^:after-load -render [])

