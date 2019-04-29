<img src="logo.png" width="125" />

_Experimental ClojureScript wrapper for modern React.js_

I'm developing it as a part of [video series](https://www.youtube.com/user/roman01la/videos).

## Build

`clojure -m figwheel.main -O advanced -bo dev:prod`

## Benchmark
`clojure -m figwheel.main -O advanced -bo benchmark`

## Tests
`clj -A:test -m cljs.main -re node -m uix.compiler-test`
