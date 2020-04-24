// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('cljs.spec.alpha');
goog.require('goog.string');
goog.require('goog.string.format');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__23544){
var map__23545 = p__23544;
var map__23545__$1 = (((((!((map__23545 == null))))?(((((map__23545.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23545.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23545):map__23545);
var m = map__23545__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23545__$1,cljs.core.cst$kw$ns);
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23545__$1,cljs.core.cst$kw$name);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var or__4120__auto__ = cljs.core.cst$kw$spec.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return [(function (){var temp__5735__auto__ = cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5735__auto__)){
var ns = temp__5735__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})()], 0));

if(cljs.core.truth_(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$forms.cljs$core$IFn$_invoke$arity$1(m))){
var seq__23547_23579 = cljs.core.seq(cljs.core.cst$kw$forms.cljs$core$IFn$_invoke$arity$1(m));
var chunk__23548_23580 = null;
var count__23549_23581 = (0);
var i__23550_23582 = (0);
while(true){
if((i__23550_23582 < count__23549_23581)){
var f_23583 = chunk__23548_23580.cljs$core$IIndexed$_nth$arity$2(null,i__23550_23582);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_23583], 0));


var G__23584 = seq__23547_23579;
var G__23585 = chunk__23548_23580;
var G__23586 = count__23549_23581;
var G__23587 = (i__23550_23582 + (1));
seq__23547_23579 = G__23584;
chunk__23548_23580 = G__23585;
count__23549_23581 = G__23586;
i__23550_23582 = G__23587;
continue;
} else {
var temp__5735__auto___23588 = cljs.core.seq(seq__23547_23579);
if(temp__5735__auto___23588){
var seq__23547_23589__$1 = temp__5735__auto___23588;
if(cljs.core.chunked_seq_QMARK_(seq__23547_23589__$1)){
var c__4550__auto___23590 = cljs.core.chunk_first(seq__23547_23589__$1);
var G__23591 = cljs.core.chunk_rest(seq__23547_23589__$1);
var G__23592 = c__4550__auto___23590;
var G__23593 = cljs.core.count(c__4550__auto___23590);
var G__23594 = (0);
seq__23547_23579 = G__23591;
chunk__23548_23580 = G__23592;
count__23549_23581 = G__23593;
i__23550_23582 = G__23594;
continue;
} else {
var f_23595 = cljs.core.first(seq__23547_23589__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_23595], 0));


var G__23596 = cljs.core.next(seq__23547_23589__$1);
var G__23597 = null;
var G__23598 = (0);
var G__23599 = (0);
seq__23547_23579 = G__23596;
chunk__23548_23580 = G__23597;
count__23549_23581 = G__23598;
i__23550_23582 = G__23599;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(m))){
var arglists_23600 = cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__4120__auto__ = cljs.core.cst$kw$macro.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.core.cst$kw$repl_DASH_special_DASH_function.cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_23600], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$quote,cljs.core.first(arglists_23600)))?cljs.core.second(arglists_23600):arglists_23600)], 0));
}
} else {
}
}

if(cljs.core.truth_(cljs.core.cst$kw$special_DASH_form.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,cljs.core.cst$kw$url)){
if(cljs.core.truth_(cljs.core.cst$kw$url.cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$url.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(cljs.core.cst$kw$macro.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Macro"], 0));
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$spec.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$repl_DASH_special_DASH_function.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(m))){
var seq__23551_23601 = cljs.core.seq(cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(m));
var chunk__23552_23602 = null;
var count__23553_23603 = (0);
var i__23554_23604 = (0);
while(true){
if((i__23554_23604 < count__23553_23603)){
var vec__23565_23605 = chunk__23552_23602.cljs$core$IIndexed$_nth$arity$2(null,i__23554_23604);
var name_23606 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23565_23605,(0),null);
var map__23568_23607 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23565_23605,(1),null);
var map__23568_23608__$1 = (((((!((map__23568_23607 == null))))?(((((map__23568_23607.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23568_23607.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23568_23607):map__23568_23607);
var doc_23609 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23568_23608__$1,cljs.core.cst$kw$doc);
var arglists_23610 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23568_23608__$1,cljs.core.cst$kw$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_23606], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_23610], 0));

if(cljs.core.truth_(doc_23609)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_23609], 0));
} else {
}


var G__23611 = seq__23551_23601;
var G__23612 = chunk__23552_23602;
var G__23613 = count__23553_23603;
var G__23614 = (i__23554_23604 + (1));
seq__23551_23601 = G__23611;
chunk__23552_23602 = G__23612;
count__23553_23603 = G__23613;
i__23554_23604 = G__23614;
continue;
} else {
var temp__5735__auto___23615 = cljs.core.seq(seq__23551_23601);
if(temp__5735__auto___23615){
var seq__23551_23616__$1 = temp__5735__auto___23615;
if(cljs.core.chunked_seq_QMARK_(seq__23551_23616__$1)){
var c__4550__auto___23617 = cljs.core.chunk_first(seq__23551_23616__$1);
var G__23618 = cljs.core.chunk_rest(seq__23551_23616__$1);
var G__23619 = c__4550__auto___23617;
var G__23620 = cljs.core.count(c__4550__auto___23617);
var G__23621 = (0);
seq__23551_23601 = G__23618;
chunk__23552_23602 = G__23619;
count__23553_23603 = G__23620;
i__23554_23604 = G__23621;
continue;
} else {
var vec__23570_23622 = cljs.core.first(seq__23551_23616__$1);
var name_23623 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23570_23622,(0),null);
var map__23573_23624 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23570_23622,(1),null);
var map__23573_23625__$1 = (((((!((map__23573_23624 == null))))?(((((map__23573_23624.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23573_23624.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23573_23624):map__23573_23624);
var doc_23626 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23573_23625__$1,cljs.core.cst$kw$doc);
var arglists_23627 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23573_23625__$1,cljs.core.cst$kw$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_23623], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_23627], 0));

if(cljs.core.truth_(doc_23626)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_23626], 0));
} else {
}


var G__23628 = cljs.core.next(seq__23551_23616__$1);
var G__23629 = null;
var G__23630 = (0);
var G__23631 = (0);
seq__23551_23601 = G__23628;
chunk__23552_23602 = G__23629;
count__23553_23603 = G__23630;
i__23554_23604 = G__23631;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5735__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n)),cljs.core.name(nm)));
if(cljs.core.truth_(temp__5735__auto__)){
var fnspec = temp__5735__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));

var seq__23575 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$args,cljs.core.cst$kw$ret,cljs.core.cst$kw$fn], null));
var chunk__23576 = null;
var count__23577 = (0);
var i__23578 = (0);
while(true){
if((i__23578 < count__23577)){
var role = chunk__23576.cljs$core$IIndexed$_nth$arity$2(null,i__23578);
var temp__5735__auto___23632__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5735__auto___23632__$1)){
var spec_23633 = temp__5735__auto___23632__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_23633)], 0));
} else {
}


var G__23634 = seq__23575;
var G__23635 = chunk__23576;
var G__23636 = count__23577;
var G__23637 = (i__23578 + (1));
seq__23575 = G__23634;
chunk__23576 = G__23635;
count__23577 = G__23636;
i__23578 = G__23637;
continue;
} else {
var temp__5735__auto____$1 = cljs.core.seq(seq__23575);
if(temp__5735__auto____$1){
var seq__23575__$1 = temp__5735__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__23575__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__23575__$1);
var G__23638 = cljs.core.chunk_rest(seq__23575__$1);
var G__23639 = c__4550__auto__;
var G__23640 = cljs.core.count(c__4550__auto__);
var G__23641 = (0);
seq__23575 = G__23638;
chunk__23576 = G__23639;
count__23577 = G__23640;
i__23578 = G__23641;
continue;
} else {
var role = cljs.core.first(seq__23575__$1);
var temp__5735__auto___23642__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5735__auto___23642__$2)){
var spec_23643 = temp__5735__auto___23642__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_23643)], 0));
} else {
}


var G__23644 = cljs.core.next(seq__23575__$1);
var G__23645 = null;
var G__23646 = (0);
var G__23647 = (0);
seq__23575 = G__23644;
chunk__23576 = G__23645;
count__23577 = G__23646;
i__23578 = G__23647;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
var base = (function (t){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,(((t instanceof cljs.core.ExceptionInfo))?cljs.core.cst$sym$ExceptionInfo:(((t instanceof Error))?cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("js",t.name):null
))], null),(function (){var temp__5735__auto__ = cljs.core.ex_message(t);
if(cljs.core.truth_(temp__5735__auto__)){
var msg = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$message,msg], null);
} else {
return null;
}
})(),(function (){var temp__5735__auto__ = cljs.core.ex_data(t);
if(cljs.core.truth_(temp__5735__auto__)){
var ed = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$data,ed], null);
} else {
return null;
}
})()], 0));
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__23648 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(via,t);
var G__23649 = cljs.core.ex_cause(t);
via = G__23648;
t = G__23649;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek(via);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$via,cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(base,via)),cljs.core.cst$kw$trace,null], null),(function (){var temp__5735__auto__ = cljs.core.ex_message(root);
if(cljs.core.truth_(temp__5735__auto__)){
var root_msg = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cause,root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5735__auto__ = cljs.core.ex_data(root);
if(cljs.core.truth_(temp__5735__auto__)){
var data = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$data,data], null);
} else {
return null;
}
})(),(function (){var temp__5735__auto__ = cljs.core.cst$kw$clojure$error_SLASH_phase.cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data(o));
if(cljs.core.truth_(temp__5735__auto__)){
var phase = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$phase,phase], null);
} else {
return null;
}
})()], 0));
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__23652 = datafied_throwable;
var map__23652__$1 = (((((!((map__23652 == null))))?(((((map__23652.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23652.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23652):map__23652);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23652__$1,cljs.core.cst$kw$via);
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23652__$1,cljs.core.cst$kw$trace);
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23652__$1,cljs.core.cst$kw$phase,cljs.core.cst$kw$execution);
var map__23653 = cljs.core.last(via);
var map__23653__$1 = (((((!((map__23653 == null))))?(((((map__23653.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23653.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23653):map__23653);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23653__$1,cljs.core.cst$kw$type);
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23653__$1,cljs.core.cst$kw$message);
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23653__$1,cljs.core.cst$kw$data);
var map__23654 = data;
var map__23654__$1 = (((((!((map__23654 == null))))?(((((map__23654.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23654.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23654):map__23654);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23654__$1,cljs.core.cst$kw$cljs$spec$alpha_SLASH_problems);
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23654__$1,cljs.core.cst$kw$cljs$spec$alpha_SLASH_fn);
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23654__$1,cljs.core.cst$kw$cljs$spec$test$alpha_SLASH_caller);
var map__23655 = cljs.core.cst$kw$data.cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__23655__$1 = (((((!((map__23655 == null))))?(((((map__23655.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23655.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23655):map__23655);
var top_data = map__23655__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23655__$1,cljs.core.cst$kw$clojure$error_SLASH_source);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__23660 = phase;
var G__23660__$1 = (((G__23660 instanceof cljs.core.Keyword))?G__23660.fqn:null);
switch (G__23660__$1) {
case "read-source":
var map__23661 = data;
var map__23661__$1 = (((((!((map__23661 == null))))?(((((map__23661.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23661.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23661):map__23661);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23661__$1,cljs.core.cst$kw$clojure$error_SLASH_line);
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23661__$1,cljs.core.cst$kw$clojure$error_SLASH_column);
var G__23663 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$data.cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__23663__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23663,cljs.core.cst$kw$clojure$error_SLASH_source,source):G__23663);
var G__23663__$2 = (cljs.core.truth_((function (){var fexpr__23664 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__23664.cljs$core$IFn$_invoke$arity$1 ? fexpr__23664.cljs$core$IFn$_invoke$arity$1(source) : fexpr__23664(source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__23663__$1,cljs.core.cst$kw$clojure$error_SLASH_source):G__23663__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23663__$2,cljs.core.cst$kw$clojure$error_SLASH_cause,message);
} else {
return G__23663__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__23665 = top_data;
var G__23665__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23665,cljs.core.cst$kw$clojure$error_SLASH_source,source):G__23665);
var G__23665__$2 = (cljs.core.truth_((function (){var fexpr__23666 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__23666.cljs$core$IFn$_invoke$arity$1 ? fexpr__23666.cljs$core$IFn$_invoke$arity$1(source) : fexpr__23666(source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__23665__$1,cljs.core.cst$kw$clojure$error_SLASH_source):G__23665__$1);
var G__23665__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23665__$2,cljs.core.cst$kw$clojure$error_SLASH_class,type):G__23665__$2);
var G__23665__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23665__$3,cljs.core.cst$kw$clojure$error_SLASH_cause,message):G__23665__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23665__$4,cljs.core.cst$kw$clojure$error_SLASH_spec,data);
} else {
return G__23665__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__23667 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23667,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23667,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23667,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23667,(3),null);
var G__23670 = top_data;
var G__23670__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23670,cljs.core.cst$kw$clojure$error_SLASH_line,line):G__23670);
var G__23670__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23670__$1,cljs.core.cst$kw$clojure$error_SLASH_source,file):G__23670__$1);
var G__23670__$3 = (cljs.core.truth_((function (){var and__4109__auto__ = source__$1;
if(cljs.core.truth_(and__4109__auto__)){
return method;
} else {
return and__4109__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23670__$2,cljs.core.cst$kw$clojure$error_SLASH_symbol,(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__23670__$2);
var G__23670__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23670__$3,cljs.core.cst$kw$clojure$error_SLASH_class,type):G__23670__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23670__$4,cljs.core.cst$kw$clojure$error_SLASH_cause,message);
} else {
return G__23670__$4;
}

break;
case "execution":
var vec__23671 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23671,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23671,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23671,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23671,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__23651_SHARP_){
var or__4120__auto__ = (p1__23651_SHARP_ == null);
if(or__4120__auto__){
return or__4120__auto__;
} else {
var fexpr__23675 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__23675.cljs$core$IFn$_invoke$arity$1 ? fexpr__23675.cljs$core$IFn$_invoke$arity$1(p1__23651_SHARP_) : fexpr__23675(p1__23651_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$file.cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__4120__auto__ = cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return line;
}
})();
var G__23676 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$clojure$error_SLASH_class,type], null);
var G__23676__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23676,cljs.core.cst$kw$clojure$error_SLASH_line,err_line):G__23676);
var G__23676__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23676__$1,cljs.core.cst$kw$clojure$error_SLASH_cause,message):G__23676__$1);
var G__23676__$3 = (cljs.core.truth_((function (){var or__4120__auto__ = fn;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
var and__4109__auto__ = source__$1;
if(cljs.core.truth_(and__4109__auto__)){
return method;
} else {
return and__4109__auto__;
}
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23676__$2,cljs.core.cst$kw$clojure$error_SLASH_symbol,(function (){var or__4120__auto__ = fn;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__23676__$2);
var G__23676__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23676__$3,cljs.core.cst$kw$clojure$error_SLASH_source,file__$1):G__23676__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__23676__$4,cljs.core.cst$kw$clojure$error_SLASH_spec,data);
} else {
return G__23676__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__23660__$1)].join('')));

}
})(),cljs.core.cst$kw$clojure$error_SLASH_phase,phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__23680){
var map__23681 = p__23680;
var map__23681__$1 = (((((!((map__23681 == null))))?(((((map__23681.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23681.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23681):map__23681);
var triage_data = map__23681__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23681__$1,cljs.core.cst$kw$clojure$error_SLASH_phase);
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23681__$1,cljs.core.cst$kw$clojure$error_SLASH_source);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23681__$1,cljs.core.cst$kw$clojure$error_SLASH_line);
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23681__$1,cljs.core.cst$kw$clojure$error_SLASH_column);
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23681__$1,cljs.core.cst$kw$clojure$error_SLASH_symbol);
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23681__$1,cljs.core.cst$kw$clojure$error_SLASH_class);
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23681__$1,cljs.core.cst$kw$clojure$error_SLASH_cause);
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23681__$1,cljs.core.cst$kw$clojure$error_SLASH_spec);
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4120__auto__ = source;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4120__auto__ = line;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name((function (){var or__4120__auto__ = class$;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__23683 = phase;
var G__23683__$1 = (((G__23683 instanceof cljs.core.Keyword))?G__23683.fqn:null);
switch (G__23683__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format("Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__23684 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__23685 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__23686 = loc;
var G__23687 = (cljs.core.truth_(spec)?(function (){var sb__4661__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__23688_23721 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__23689_23722 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__23690_23723 = true;
var _STAR_print_fn_STAR__temp_val__23691_23724 = (function (x__4662__auto__){
return sb__4661__auto__.append(x__4662__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__23690_23723);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__23691_23724);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,cljs.core.cst$kw$cljs$spec$alpha_SLASH_problems,(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__23678_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__23678_SHARP_,cljs.core.cst$kw$in);
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__23689_23722);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__23688_23721);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4661__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format("%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__23684,G__23685,G__23686,G__23687) : format(G__23684,G__23685,G__23686,G__23687));

break;
case "macroexpansion":
var G__23692 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__23693 = cause_type;
var G__23694 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__23695 = loc;
var G__23696 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__23692,G__23693,G__23694,G__23695,G__23696) : format(G__23692,G__23693,G__23694,G__23695,G__23696));

break;
case "compile-syntax-check":
var G__23697 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__23698 = cause_type;
var G__23699 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__23700 = loc;
var G__23701 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__23697,G__23698,G__23699,G__23700,G__23701) : format(G__23697,G__23698,G__23699,G__23700,G__23701));

break;
case "compilation":
var G__23702 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__23703 = cause_type;
var G__23704 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__23705 = loc;
var G__23706 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__23702,G__23703,G__23704,G__23705,G__23706) : format(G__23702,G__23703,G__23704,G__23705,G__23706));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__23707 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__23708 = symbol;
var G__23709 = loc;
var G__23710 = (function (){var sb__4661__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__23711_23725 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__23712_23726 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__23713_23727 = true;
var _STAR_print_fn_STAR__temp_val__23714_23728 = (function (x__4662__auto__){
return sb__4661__auto__.append(x__4662__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__23713_23727);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__23714_23728);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,cljs.core.cst$kw$cljs$spec$alpha_SLASH_problems,(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__23679_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__23679_SHARP_,cljs.core.cst$kw$in);
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__23712_23726);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__23711_23725);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4661__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__23707,G__23708,G__23709,G__23710) : format(G__23707,G__23708,G__23709,G__23710));
} else {
var G__23715 = "Execution error%s at %s(%s).\n%s\n";
var G__23716 = cause_type;
var G__23717 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__23718 = loc;
var G__23719 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__23715,G__23716,G__23717,G__23718,G__23719) : format(G__23715,G__23716,G__23717,G__23718,G__23719));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__23683__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});
