(ns uix.dom.alpha
  "Public API"
  (:require #?(:cljs [react-dom :as rdom])
            [uix.compiler.alpha :as compiler]))

;; react-dom top-level API

(defn render
  "Renders element into DOM node. The first argument is Hiccup or React element."
  [element node]
  #?(:cljs
          (-> (compiler/as-element element)
              (rdom/render node))
     :clj nil))

(defn create-root [node]
  #?(:cljs (rdom/unstable_createRoot node)
     :clj nil))

(defn render-root [element root]
  #?(:cljs (.render root (compiler/as-element element))
     :clj nil))

(defn hydrate
  "Hydrates server rendered document at `node` with `element`."
  [element node]
  #?(:cljs (rdom/hydrate (compiler/as-element element) node)
     :clj nil))

(defn flush-sync! [cb]
  #?(:cljs (rdom/flushSync cb)
     :clj nil))

(defn flush-controlled! [cb]
  #?(:cljs (rdom/unstable_flushControlled cb)
     :clj nil))

#?(:clj
   (defmacro flush-sync [& body]
     `(flush-sync! (fn [] ~@body))))

#?(:clj
   (defmacro flush-controlled [& body]
     `(flush-controlled! (fn [] ~@body))))

(defn unmount-at-node
  "Unmounts React component rendered into DOM node"
  [node]
  #?(:cljs (rdom/unmountComponentAtNode node)
     :clj nil))

(defn find-dom-node
  "Returns top-level DOM node associated with component"
  [component]
  #?(:cljs (rdom/findDOMNode component)
     :clj nil))

(defn create-portal
  "Renders Hiccup element into DOM node"
  [child node]
  #?(:cljs (rdom/createPortal (compiler/as-element child) node)
     :clj (prn (str "Portal elements are not supported on JVM, skipping: " [:-> child node]))))

;; react-dom/server top-level API

(defn render-to-string [element]
  "Renders to HTML string to be used with React"
  #?(:clj (compiler/render-to-string element)
     :cljs (.renderToString js/ReactDOMServer (compiler/as-element element))))

(defn render-to-static-markup [element]
  "Renders to HTML string"
  #?(:clj (compiler/render-to-static-markup element)
     :cljs (.renderToStaticMarkup js/ReactDOMServer (compiler/as-element element))))

#?(:clj
   (def render-to-stream
     "Like render-to-string, but pushes HTML in chunks as they are being rendered

     (render-to-stream [element] {:on-chunk f})"
     compiler/render-to-stream))

#?(:cljs
   (defn render-to-stream [element]
     (.renderToNodeStream js/ReactDOMServer (compiler/as-element element))))

#?(:clj
   (def render-to-static-stream
     "Like render-to-static-markup, but pushes HTML in chunks as they are being rendered

     (render-to-static-stream [element] {:on-chunk f})"
     compiler/render-to-static-stream))

#?(:cljs
   (defn render-to-static-stream [element]
     (.renderToStaticNodeStream js/ReactDOMServer (compiler/as-element element))))
