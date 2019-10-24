{:foreign-libs [{:file "react/react.production.min.js"
                 :provides ["react"]
                 :global-exports '{react React}}
                {:file "react/react-dom.production.min.js"
                 :provides ["react-dom"]
                 :requires ["react"]
                 :global-exports '{react-dom ReactDOM}}]}
