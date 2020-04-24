// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('clojure.browser.repl.preload');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('clojure.browser.repl');
if((typeof clojure !== 'undefined') && (typeof clojure.browser !== 'undefined') && (typeof clojure.browser.repl !== 'undefined') && (typeof clojure.browser.repl.preload !== 'undefined') && (typeof clojure.browser.repl.preload.conn !== 'undefined')){
} else {
clojure.browser.repl.preload.conn = clojure.browser.repl.connect(["http://",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.browser.repl.HOST),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.browser.repl.PORT),"/repl"].join(''));
}
