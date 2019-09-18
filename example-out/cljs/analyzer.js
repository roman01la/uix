// Compiled by ClojureScript 1.10.520 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('cljs.analyzer');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('goog.string');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.env');
goog.require('cljs.tagged_literals');
goog.require('cljs.tools.reader');
goog.require('cljs.tools.reader.reader_types');
goog.require('cljs.reader');
cljs.analyzer._STAR_cljs_ns_STAR_ = cljs.core.cst$sym$cljs$user;
cljs.analyzer._STAR_cljs_file_STAR_ = null;
cljs.analyzer._STAR_checked_arrays_STAR_ = false;
cljs.analyzer._STAR_check_alias_dupes_STAR_ = true;
cljs.analyzer._STAR_cljs_static_fns_STAR_ = false;
cljs.analyzer._STAR_fn_invoke_direct_STAR_ = false;
cljs.analyzer._STAR_cljs_macros_path_STAR_ = "/cljs/core";
cljs.analyzer._STAR_cljs_macros_is_classpath_STAR_ = true;
cljs.analyzer._STAR_cljs_dep_set_STAR_ = cljs.core.with_meta(cljs.core.PersistentHashSet.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$dep_DASH_path,cljs.core.PersistentVector.EMPTY], null));
cljs.analyzer._STAR_analyze_deps_STAR_ = true;
cljs.analyzer._STAR_load_tests_STAR_ = true;
cljs.analyzer._STAR_load_macros_STAR_ = true;
cljs.analyzer._STAR_reload_macros_STAR_ = false;
cljs.analyzer._STAR_macro_infer_STAR_ = true;
cljs.analyzer._STAR_passes_STAR_ = null;
cljs.analyzer._STAR_file_defs_STAR_ = null;
cljs.analyzer._STAR_private_var_access_nowarn_STAR_ = false;
/**
 * The namespace of the constants table as a symbol.
 */
cljs.analyzer.constants_ns_sym = cljs.core.cst$sym$cljs$core$constants;
cljs.analyzer.identity_counter = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
cljs.analyzer.add_identity = (function cljs$analyzer$add_identity(m){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,cljs.core.cst$kw$identity,cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.identity_counter,cljs.core.inc));
});
cljs.analyzer._STAR_verbose_STAR_ = false;
cljs.analyzer._cljs_macros_loaded = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
cljs.analyzer._STAR_cljs_warnings_STAR_ = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$invoke_DASH_ctor,cljs.core.cst$kw$extending_DASH_base_DASH_js_DASH_type,cljs.core.cst$kw$unsupported_DASH_preprocess_DASH_value,cljs.core.cst$kw$redef,cljs.core.cst$kw$js_DASH_shadowed_DASH_by_DASH_local,cljs.core.cst$kw$unsupported_DASH_js_DASH_module_DASH_type,cljs.core.cst$kw$invalid_DASH_protocol_DASH_symbol,cljs.core.cst$kw$private_DASH_var_DASH_access,cljs.core.cst$kw$protocol_DASH_duped_DASH_method,cljs.core.cst$kw$munged_DASH_namespace,cljs.core.cst$kw$single_DASH_segment_DASH_namespace,cljs.core.cst$kw$fn_DASH_arity,cljs.core.cst$kw$infer_DASH_warning,cljs.core.cst$kw$variadic_DASH_max_DASH_arity,cljs.core.cst$kw$protocol_DASH_with_DASH_variadic_DASH_method,cljs.core.cst$kw$fn_DASH_deprecated,cljs.core.cst$kw$undeclared_DASH_var,cljs.core.cst$kw$declared_DASH_arglists_DASH_mismatch,cljs.core.cst$kw$preamble_DASH_missing,cljs.core.cst$kw$undeclared_DASH_protocol_DASH_symbol,cljs.core.cst$kw$dynamic,cljs.core.cst$kw$invalid_DASH_array_DASH_access,cljs.core.cst$kw$unprovided,cljs.core.cst$kw$ns_DASH_var_DASH_clash,cljs.core.cst$kw$undeclared_DASH_ns,cljs.core.cst$kw$non_DASH_dynamic_DASH_earmuffed_DASH_var,cljs.core.cst$kw$undeclared_DASH_ns_DASH_form,cljs.core.cst$kw$invalid_DASH_arithmetic,cljs.core.cst$kw$protocol_DASH_deprecated,cljs.core.cst$kw$fn_DASH_var,cljs.core.cst$kw$protocol_DASH_impl_DASH_recur_DASH_with_DASH_target,cljs.core.cst$kw$overload_DASH_arity,cljs.core.cst$kw$protocol_DASH_multiple_DASH_impls,cljs.core.cst$kw$redef_DASH_in_DASH_file,cljs.core.cst$kw$protocol_DASH_invalid_DASH_method,cljs.core.cst$kw$extend_DASH_type_DASH_invalid_DASH_method_DASH_shape,cljs.core.cst$kw$multiple_DASH_variadic_DASH_overloads,cljs.core.cst$kw$protocol_DASH_impl_DASH_with_DASH_variadic_DASH_method],[true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]);
cljs.analyzer.unchecked_arrays_QMARK_ = (function cljs$analyzer$unchecked_arrays_QMARK_(){
return cljs.core._STAR_unchecked_arrays_STAR_;
});
/**
 * Returns false-y, :warn, or :error based on configuration and the
 * current value of *unchecked-arrays*.
 */
cljs.analyzer.checked_arrays = (function cljs$analyzer$checked_arrays(){
if(((cljs.core.not(cljs.core.cst$kw$advanced.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_))))) && ((!(cljs.core._STAR_unchecked_arrays_STAR_))))){
return cljs.analyzer._STAR_checked_arrays_STAR_;
} else {
return null;
}
});
cljs.analyzer.js_reserved = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 63, ["typeof",null,"float",null,"implements",null,"else",null,"boolean",null,"abstract",null,"int",null,"static",null,"package",null,"this",null,"await",null,"yield",null,"interface",null,"void",null,"delete",null,"class",null,"export",null,"var",null,"try",null,"long",null,"null",null,"return",null,"methods",null,"native",null,"private",null,"new",null,"for",null,"catch",null,"extends",null,"short",null,"protected",null,"throws",null,"synchronized",null,"transient",null,"super",null,"if",null,"let",null,"import",null,"char",null,"switch",null,"const",null,"case",null,"break",null,"volatile",null,"function",null,"continue",null,"final",null,"do",null,"double",null,"while",null,"public",null,"arguments",null,"debugger",null,"with",null,"instanceof",null,"default",null,"throw",null,"goto",null,"finally",null,"byte",null,"constructor",null,"in",null,"enum",null], null), null);
cljs.analyzer.es5_allowed = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["default",null], null), null);
cljs.analyzer.SENTINEL = ({});
cljs.analyzer.gets = (function cljs$analyzer$gets(var_args){
var G__15344 = arguments.length;
switch (G__15344) {
case 3:
return cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$3 = (function (m,k0,k1){
var m__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,k0,cljs.analyzer.SENTINEL);
if((m__$1 === cljs.analyzer.SENTINEL)){
return null;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(m__$1,k1);
}
});

cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$4 = (function (m,k0,k1,k2){
var m__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,k0,cljs.analyzer.SENTINEL);
if((m__$1 === cljs.analyzer.SENTINEL)){
return null;
} else {
var m__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m__$1,k1,cljs.analyzer.SENTINEL);
if((m__$2 === cljs.analyzer.SENTINEL)){
return null;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(m__$2,k2);
}
}
});

cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5 = (function (m,k0,k1,k2,k3){
var m__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,k0,cljs.analyzer.SENTINEL);
if((m__$1 === cljs.analyzer.SENTINEL)){
return null;
} else {
var m__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m__$1,k1,cljs.analyzer.SENTINEL);
if((m__$2 === cljs.analyzer.SENTINEL)){
return null;
} else {
var m__$3 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m__$2,k2,cljs.analyzer.SENTINEL);
if((m__$3 === cljs.analyzer.SENTINEL)){
return null;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(m__$3,k3);
}
}
}
});

cljs.analyzer.gets.cljs$lang$maxFixedArity = 5;

cljs.analyzer.CLJ_NIL_SYM = cljs.core.cst$sym$clj_DASH_nil;
cljs.analyzer.NUMBER_SYM = cljs.core.cst$sym$number;
cljs.analyzer.STRING_SYM = cljs.core.cst$sym$string;
cljs.analyzer.BOOLEAN_SYM = cljs.core.cst$sym$boolean;
cljs.analyzer.JS_STAR_SYM = cljs.core.cst$sym$js_STAR_;
cljs.analyzer.DOT_SYM = cljs.core.cst$sym$_DOT_;
cljs.analyzer.NEW_SYM = cljs.core.cst$sym$new;
cljs.analyzer.CLJS_CORE_SYM = cljs.core.cst$sym$cljs$core;
cljs.analyzer.CLJS_CORE_MACROS_SYM = cljs.core.cst$sym$cljs$core$macros;
cljs.analyzer.IGNORE_SYM = cljs.core.cst$sym$ignore;
cljs.analyzer.ANY_SYM = cljs.core.cst$sym$any;
cljs.analyzer.cljs_seq_QMARK_ = (function cljs$analyzer$cljs_seq_QMARK_(x){
if((!((x == null)))){
if((((x.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$ISeq$)))){
return true;
} else {
return false;
}
} else {
return false;
}
});
cljs.analyzer.cljs_map_QMARK_ = (function cljs$analyzer$cljs_map_QMARK_(x){
if((!((x == null)))){
if((((x.cljs$lang$protocol_mask$partition0$ & (1024))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$IMap$)))){
return true;
} else {
return false;
}
} else {
return false;
}
});
cljs.analyzer.cljs_vector_QMARK_ = (function cljs$analyzer$cljs_vector_QMARK_(x){
if((!((x == null)))){
if((((x.cljs$lang$protocol_mask$partition0$ & (16384))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$IVector$)))){
return true;
} else {
return false;
}
} else {
return false;
}
});
cljs.analyzer.cljs_set_QMARK_ = (function cljs$analyzer$cljs_set_QMARK_(x){
if((!((x == null)))){
if((((x.cljs$lang$protocol_mask$partition0$ & (4096))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$ISet$)))){
return true;
} else {
return false;
}
} else {
return false;
}
});
cljs.analyzer.munge_path = (function cljs$analyzer$munge_path(ss){
return cljs.core.munge(cljs.core.str.cljs$core$IFn$_invoke$arity$1(ss));
});
/**
 * Given a namespace as a symbol return the relative path. May optionally
 *   provide the file extension, defaults to :cljs.
 */
cljs.analyzer.ns__GT_relpath = (function cljs$analyzer$ns__GT_relpath(var_args){
var G__15351 = arguments.length;
switch (G__15351) {
case 1:
return cljs.analyzer.ns__GT_relpath.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.analyzer.ns__GT_relpath.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.ns__GT_relpath.cljs$core$IFn$_invoke$arity$1 = (function (ns){
return cljs.analyzer.ns__GT_relpath.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.cst$kw$cljs);
});

cljs.analyzer.ns__GT_relpath.cljs$core$IFn$_invoke$arity$2 = (function (ns,ext){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.replace(cljs.analyzer.munge_path(ns),".","/")),".",cljs.core.name(ext)].join('');
});

cljs.analyzer.ns__GT_relpath.cljs$lang$maxFixedArity = 2;

cljs.analyzer.topo_sort = (function cljs$analyzer$topo_sort(var_args){
var G__15354 = arguments.length;
switch (G__15354) {
case 2:
return cljs.analyzer.topo_sort.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.analyzer.topo_sort.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.topo_sort.cljs$core$IFn$_invoke$arity$2 = (function (x,get_deps){
return cljs.analyzer.topo_sort.cljs$core$IFn$_invoke$arity$4(x,(0),cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.sorted_map()),cljs.core.memoize(get_deps));
});

cljs.analyzer.topo_sort.cljs$core$IFn$_invoke$arity$4 = (function (x,depth,state,memo_get_deps){
var deps = (memo_get_deps.cljs$core$IFn$_invoke$arity$1 ? memo_get_deps.cljs$core$IFn$_invoke$arity$1(x) : memo_get_deps(x));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [depth], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.into,cljs.core.PersistentHashSet.EMPTY),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([deps], 0));

var seq__15355_15376 = cljs.core.seq(deps);
var chunk__15356_15377 = null;
var count__15357_15378 = (0);
var i__15358_15379 = (0);
while(true){
if((i__15358_15379 < count__15357_15378)){
var dep_15380 = chunk__15356_15377.cljs$core$IIndexed$_nth$arity$2(null,i__15358_15379);
cljs.analyzer.topo_sort.cljs$core$IFn$_invoke$arity$4(dep_15380,(depth + (1)),state,memo_get_deps);


var G__15381 = seq__15355_15376;
var G__15382 = chunk__15356_15377;
var G__15383 = count__15357_15378;
var G__15384 = (i__15358_15379 + (1));
seq__15355_15376 = G__15381;
chunk__15356_15377 = G__15382;
count__15357_15378 = G__15383;
i__15358_15379 = G__15384;
continue;
} else {
var temp__5735__auto___15385 = cljs.core.seq(seq__15355_15376);
if(temp__5735__auto___15385){
var seq__15355_15386__$1 = temp__5735__auto___15385;
if(cljs.core.chunked_seq_QMARK_(seq__15355_15386__$1)){
var c__4550__auto___15387 = cljs.core.chunk_first(seq__15355_15386__$1);
var G__15388 = cljs.core.chunk_rest(seq__15355_15386__$1);
var G__15389 = c__4550__auto___15387;
var G__15390 = cljs.core.count(c__4550__auto___15387);
var G__15391 = (0);
seq__15355_15376 = G__15388;
chunk__15356_15377 = G__15389;
count__15357_15378 = G__15390;
i__15358_15379 = G__15391;
continue;
} else {
var dep_15392 = cljs.core.first(seq__15355_15386__$1);
cljs.analyzer.topo_sort.cljs$core$IFn$_invoke$arity$4(dep_15392,(depth + (1)),state,memo_get_deps);


var G__15393 = cljs.core.next(seq__15355_15386__$1);
var G__15394 = null;
var G__15395 = (0);
var G__15396 = (0);
seq__15355_15376 = G__15393;
chunk__15356_15377 = G__15394;
count__15357_15378 = G__15395;
i__15358_15379 = G__15396;
continue;
}
} else {
}
}
break;
}

var seq__15359_15397 = cljs.core.seq(cljs.core.subseq.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(state),cljs.core._LT_,depth));
var chunk__15360_15398 = null;
var count__15361_15399 = (0);
var i__15362_15400 = (0);
while(true){
if((i__15362_15400 < count__15361_15399)){
var vec__15369_15401 = chunk__15360_15398.cljs$core$IIndexed$_nth$arity$2(null,i__15362_15400);
var _LT_depth_15402 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15369_15401,(0),null);
var __15403 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15369_15401,(1),null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [_LT_depth_15402], null),clojure.set.difference,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([deps], 0));


var G__15404 = seq__15359_15397;
var G__15405 = chunk__15360_15398;
var G__15406 = count__15361_15399;
var G__15407 = (i__15362_15400 + (1));
seq__15359_15397 = G__15404;
chunk__15360_15398 = G__15405;
count__15361_15399 = G__15406;
i__15362_15400 = G__15407;
continue;
} else {
var temp__5735__auto___15408 = cljs.core.seq(seq__15359_15397);
if(temp__5735__auto___15408){
var seq__15359_15409__$1 = temp__5735__auto___15408;
if(cljs.core.chunked_seq_QMARK_(seq__15359_15409__$1)){
var c__4550__auto___15410 = cljs.core.chunk_first(seq__15359_15409__$1);
var G__15411 = cljs.core.chunk_rest(seq__15359_15409__$1);
var G__15412 = c__4550__auto___15410;
var G__15413 = cljs.core.count(c__4550__auto___15410);
var G__15414 = (0);
seq__15359_15397 = G__15411;
chunk__15360_15398 = G__15412;
count__15361_15399 = G__15413;
i__15362_15400 = G__15414;
continue;
} else {
var vec__15372_15415 = cljs.core.first(seq__15359_15409__$1);
var _LT_depth_15416 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15372_15415,(0),null);
var __15417 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15372_15415,(1),null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [_LT_depth_15416], null),clojure.set.difference,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([deps], 0));


var G__15418 = cljs.core.next(seq__15359_15409__$1);
var G__15419 = null;
var G__15420 = (0);
var G__15421 = (0);
seq__15359_15397 = G__15418;
chunk__15360_15398 = G__15419;
count__15361_15399 = G__15420;
i__15362_15400 = G__15421;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(depth,(0))){
return cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,cljs.core.vals(cljs.core.deref(state))));
} else {
return null;
}
});

cljs.analyzer.topo_sort.cljs$lang$maxFixedArity = 4;


cljs.analyzer.ast_QMARK_ = (function cljs$analyzer$ast_QMARK_(x){
return ((cljs.core.map_QMARK_(x)) && (cljs.core.contains_QMARK_(x,cljs.core.cst$kw$op)));
});
if((typeof cljs !== 'undefined') && (typeof cljs.analyzer !== 'undefined') && (typeof cljs.analyzer.error_message !== 'undefined')){
} else {
cljs.analyzer.error_message = (function (){var method_table__4613__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,(function (){var fexpr__15422 = cljs.core.get_global_hierarchy;
return (fexpr__15422.cljs$core$IFn$_invoke$arity$0 ? fexpr__15422.cljs$core$IFn$_invoke$arity$0() : fexpr__15422());
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.analyzer","error-message"),((function (method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__,hierarchy__4617__auto__){
return (function() { 
var G__15423__delegate = function (warning_type,_){
return warning_type;
};
var G__15423 = function (warning_type,var_args){
var _ = null;
if (arguments.length > 1) {
var G__15424__i = 0, G__15424__a = new Array(arguments.length -  1);
while (G__15424__i < G__15424__a.length) {G__15424__a[G__15424__i] = arguments[G__15424__i + 1]; ++G__15424__i;}
  _ = new cljs.core.IndexedSeq(G__15424__a,0,null);
} 
return G__15423__delegate.call(this,warning_type,_);};
G__15423.cljs$lang$maxFixedArity = 1;
G__15423.cljs$lang$applyTo = (function (arglist__15425){
var warning_type = cljs.core.first(arglist__15425);
var _ = cljs.core.rest(arglist__15425);
return G__15423__delegate(warning_type,_);
});
G__15423.cljs$core$IFn$_invoke$arity$variadic = G__15423__delegate;
return G__15423;
})()
;})(method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__,hierarchy__4617__auto__))
,cljs.core.cst$kw$default,hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$preamble_DASH_missing,(function (warning_type,info){
return ["Preamble resource file not found: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.cst$kw$missing.cljs$core$IFn$_invoke$arity$1(info)))].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$unprovided,(function (warning_type,info){
return ["Required namespace not provided for ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.cst$kw$unprovided.cljs$core$IFn$_invoke$arity$1(info)))].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$undeclared_DASH_var,(function (warning_type,info){
return [(cljs.core.truth_(cljs.core.cst$kw$macro_DASH_present_QMARK_.cljs$core$IFn$_invoke$arity$1(info))?"Can't take value of macro ":"Use of undeclared Var "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prefix.cljs$core$IFn$_invoke$arity$1(info)),"/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$suffix.cljs$core$IFn$_invoke$arity$1(info))].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$private_DASH_var_DASH_access,(function (warning_type,info){
return ["var: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sym.cljs$core$IFn$_invoke$arity$1(info))," is not public"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$undeclared_DASH_ns,(function (warning_type,p__15426){
var map__15427 = p__15426;
var map__15427__$1 = (((((!((map__15427 == null))))?(((((map__15427.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15427.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15427):map__15427);
var info = map__15427__$1;
var ns_sym = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15427__$1,cljs.core.cst$kw$ns_DASH_sym);
var js_provide = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15427__$1,cljs.core.cst$kw$js_DASH_provide);
return ["No such namespace: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns_sym),", could not locate ",cljs.analyzer.ns__GT_relpath.cljs$core$IFn$_invoke$arity$2(ns_sym,cljs.core.cst$kw$cljs),", ",cljs.analyzer.ns__GT_relpath.cljs$core$IFn$_invoke$arity$2(ns_sym,cljs.core.cst$kw$cljc),", or JavaScript source providing \"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_provide),"\"",((clojure.string.includes_QMARK_(cljs.analyzer.ns__GT_relpath.cljs$core$IFn$_invoke$arity$1(ns_sym),"_"))?" (Please check that namespaces with dashes use underscores in the ClojureScript file name)":null)].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$undeclared_DASH_macros_DASH_ns,(function (warning_type,p__15429){
var map__15430 = p__15429;
var map__15430__$1 = (((((!((map__15430 == null))))?(((((map__15430.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15430.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15430):map__15430);
var info = map__15430__$1;
var ns_sym = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15430__$1,cljs.core.cst$kw$ns_DASH_sym);
var js_provide = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15430__$1,cljs.core.cst$kw$js_DASH_provide);
return ["No such macros namespace: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns_sym),", could not locate ",cljs.analyzer.ns__GT_relpath.cljs$core$IFn$_invoke$arity$2(ns_sym,cljs.core.cst$kw$clj)," or ",cljs.analyzer.ns__GT_relpath.cljs$core$IFn$_invoke$arity$2(ns_sym,cljs.core.cst$kw$cljc)].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$dynamic,(function (warning_type,info){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info))," not declared ^:dynamic"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$redef,(function (warning_type,info){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sym.cljs$core$IFn$_invoke$arity$1(info))," already refers to: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(info)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sym.cljs$core$IFn$_invoke$arity$1(info))))," being replaced by: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns_DASH_name.cljs$core$IFn$_invoke$arity$1(info)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sym.cljs$core$IFn$_invoke$arity$1(info))))].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$redef_DASH_in_DASH_file,(function (warning_type,info){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sym.cljs$core$IFn$_invoke$arity$1(info))," at line ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(info))," is being replaced"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$fn_DASH_var,(function (warning_type,info){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns_DASH_name.cljs$core$IFn$_invoke$arity$1(info)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sym.cljs$core$IFn$_invoke$arity$1(info))))," no longer fn, references are stale"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$fn_DASH_arity,(function (warning_type,info){
return ["Wrong number of args (",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$argc.cljs$core$IFn$_invoke$arity$1(info)),") passed to ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4131__auto__ = cljs.core.cst$kw$ctor.cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info);
}
})())].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$fn_DASH_deprecated,(function (warning_type,info){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$fexpr.cljs$core$IFn$_invoke$arity$1(info))))," is deprecated"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$declared_DASH_arglists_DASH_mismatch,(function (warning_type,info){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns_DASH_name.cljs$core$IFn$_invoke$arity$1(info)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sym.cljs$core$IFn$_invoke$arity$1(info))))," declared arglists ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$declared.cljs$core$IFn$_invoke$arity$1(info))," mismatch defined arglists ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$defined.cljs$core$IFn$_invoke$arity$1(info))].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$undeclared_DASH_ns_DASH_form,(function (warning_type,info){
return ["Invalid :refer, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(info))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$lib.cljs$core$IFn$_invoke$arity$1(info)),"/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sym.cljs$core$IFn$_invoke$arity$1(info))," does not exist"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$protocol_DASH_deprecated,(function (warning_type,info){
return ["Protocol ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(info))," is deprecated"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$undeclared_DASH_protocol_DASH_symbol,(function (warning_type,info){
return ["Can't resolve protocol symbol ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(info))].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$invalid_DASH_protocol_DASH_symbol,(function (warning_type,info){
return ["Symbol ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(info))," is not a protocol"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$protocol_DASH_invalid_DASH_method,(function (warning_type,info){
if(cljs.core.truth_(cljs.core.cst$kw$no_DASH_such_DASH_method.cljs$core$IFn$_invoke$arity$1(info))){
return ["Bad method signature in protocol implementation, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(info))," does not declare method called ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$fname.cljs$core$IFn$_invoke$arity$1(info))].join('');
} else {
return ["Bad method signature in protocol implementation, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(info))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$fname.cljs$core$IFn$_invoke$arity$1(info))," does not declare arity ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$invalid_DASH_arity.cljs$core$IFn$_invoke$arity$1(info))].join('');
}
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$protocol_DASH_duped_DASH_method,(function (warning_type,info){
return ["Duplicated methods in protocol implementation ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(info))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$fname.cljs$core$IFn$_invoke$arity$1(info))].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$protocol_DASH_multiple_DASH_impls,(function (warning_type,info){
return ["Protocol ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(info))," implemented multiple times"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$protocol_DASH_with_DASH_variadic_DASH_method,(function (warning_type,info){
return ["Protocol ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(info))," declares method ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info))," with variadic signature (&)"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$protocol_DASH_impl_DASH_with_DASH_variadic_DASH_method,(function (warning_type,info){
return ["Protocol ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(info))," implements method ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info))," with variadic signature (&)"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$protocol_DASH_impl_DASH_recur_DASH_with_DASH_target,(function (warning_type,info){
return ["Ignoring target object \"",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(info)], 0)),"\" passed in recur to protocol method head"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$multiple_DASH_variadic_DASH_overloads,(function (warning_type,info){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info)),": Can't have more than 1 variadic overload"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$variadic_DASH_max_DASH_arity,(function (warning_type,info){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info)),": Can't have fixed arity function with more params than variadic function"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$overload_DASH_arity,(function (warning_type,info){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info)),": Can't have 2 overloads with same arity"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$extending_DASH_base_DASH_js_DASH_type,(function (warning_type,info){
return ["Extending an existing JavaScript type - use a different symbol name ","instead of ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$current_DASH_symbol.cljs$core$IFn$_invoke$arity$1(info))," e.g ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$suggested_DASH_symbol.cljs$core$IFn$_invoke$arity$1(info))].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$invalid_DASH_arithmetic,(function (warning_type,info){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$js_DASH_op.cljs$core$IFn$_invoke$arity$1(info)),", all arguments must be numbers, got ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$types.cljs$core$IFn$_invoke$arity$1(info))," instead"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$invalid_DASH_array_DASH_access,(function (warning_type,p__15432){
var map__15433 = p__15432;
var map__15433__$1 = (((((!((map__15433 == null))))?(((((map__15433.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15433.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15433):map__15433);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15433__$1,cljs.core.cst$kw$name);
var types = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15433__$1,cljs.core.cst$kw$types);
var G__15435 = name;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$cljs$core_SLASH_checked_DASH_aget,G__15435)){
return ["cljs.core/aget, arguments must be an array followed by numeric indices, got ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(types)," instead",((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$object,cljs.core.first(types))) || (cljs.core.every_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$string,null], null), null),cljs.core.rest(types)))))?[" (consider ",((((2) === cljs.core.count(types)))?"goog.object/get":"goog.object/getValueByKeys")," for object access)"].join(''):null)].join('');
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$cljs$core_SLASH_checked_DASH_aget_SINGLEQUOTE_,G__15435)){
return ["cljs.core/aget, arguments must be an array followed by numeric indices, got ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(types)," instead",((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$object,cljs.core.first(types))) || (cljs.core.every_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$string,null], null), null),cljs.core.rest(types)))))?[" (consider ",((((2) === cljs.core.count(types)))?"goog.object/get":"goog.object/getValueByKeys")," for object access)"].join(''):null)].join('');
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$cljs$core_SLASH_checked_DASH_aset,G__15435)){
return ["cljs.core/aset, arguments must be an array, followed by numeric indices, followed by a value, got ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(types)," instead",((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$object,cljs.core.first(types))) || (cljs.core.every_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$string,null], null), null),cljs.core.butlast(cljs.core.rest(types))))))?" (consider goog.object/set for object access)":null)].join('');
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$cljs$core_SLASH_checked_DASH_aset_SINGLEQUOTE_,G__15435)){
return ["cljs.core/aset, arguments must be an array, followed by numeric indices, followed by a value, got ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(types)," instead",((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$object,cljs.core.first(types))) || (cljs.core.every_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$string,null], null), null),cljs.core.butlast(cljs.core.rest(types))))))?" (consider goog.object/set for object access)":null)].join('');
} else {
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__15435)].join('')));

}
}
}
}
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$invoke_DASH_ctor,(function (warning_type,info){
return ["Cannot invoke type constructor ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$fexpr.cljs$core$IFn$_invoke$arity$1(info))))," as function "].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$single_DASH_segment_DASH_namespace,(function (warning_type,info){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info))," is a single segment namespace"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$munged_DASH_namespace,(function (warning_type,p__15437){
var map__15438 = p__15437;
var map__15438__$1 = (((((!((map__15438 == null))))?(((((map__15438.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15438.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15438):map__15438);
var info = map__15438__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15438__$1,cljs.core.cst$kw$name);
var munged = cljs.core.munge(clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (map__15438,map__15438__$1,info,name){
return (function (p1__15436_SHARP_){
if(cljs.core.truth_((cljs.analyzer.js_reserved.cljs$core$IFn$_invoke$arity$1 ? cljs.analyzer.js_reserved.cljs$core$IFn$_invoke$arity$1(p1__15436_SHARP_) : cljs.analyzer.js_reserved(p1__15436_SHARP_)))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__15436_SHARP_),"$"].join('');
} else {
return p1__15436_SHARP_;
}
});})(map__15438,map__15438__$1,info,name))
,clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name(name),/\./))));
return ["Namespace ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)," contains a reserved JavaScript keyword,"," the corresponding Google Closure namespace will be munged to ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(munged)].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$ns_DASH_var_DASH_clash,(function (warning_type,p__15440){
var map__15441 = p__15440;
var map__15441__$1 = (((((!((map__15441 == null))))?(((((map__15441.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15441.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15441):map__15441);
var info = map__15441__$1;
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15441__$1,cljs.core.cst$kw$ns);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15441__$1,cljs.core.cst$kw$var);
return ["Namespace ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns)," clashes with var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(var$)].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$non_DASH_dynamic_DASH_earmuffed_DASH_var,(function (warning_type,p__15443){
var map__15444 = p__15443;
var map__15444__$1 = (((((!((map__15444 == null))))?(((((map__15444.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15444.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15444):map__15444);
var info = map__15444__$1;
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15444__$1,cljs.core.cst$kw$var);
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(var$)," not declared dynamic and thus is not dynamically rebindable, but its name ","suggests otherwise. Please either indicate ^:dynamic ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(var$)," or change the name"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$extend_DASH_type_DASH_invalid_DASH_method_DASH_shape,(function (warning_type,p__15446){
var map__15447 = p__15446;
var map__15447__$1 = (((((!((map__15447 == null))))?(((((map__15447.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15447.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15447):map__15447);
var info = map__15447__$1;
var protocol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15447__$1,cljs.core.cst$kw$protocol);
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15447__$1,cljs.core.cst$kw$method);
return ["Bad extend-type method shape for protocol ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol)," method ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(method),", method arities must be grouped together"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$unsupported_DASH_js_DASH_module_DASH_type,(function (warning_type,p__15449){
var map__15450 = p__15449;
var map__15450__$1 = (((((!((map__15450 == null))))?(((((map__15450.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15450.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15450):map__15450);
var info = map__15450__$1;
var module_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15450__$1,cljs.core.cst$kw$module_DASH_type);
var file = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15450__$1,cljs.core.cst$kw$file);
return ["Unsupported JavaScript module type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(module_type)," for foreign library ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file),"."].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$unsupported_DASH_preprocess_DASH_value,(function (warning_type,p__15452){
var map__15453 = p__15452;
var map__15453__$1 = (((((!((map__15453 == null))))?(((((map__15453.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15453.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15453):map__15453);
var preprocess = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15453__$1,cljs.core.cst$kw$preprocess);
var file = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15453__$1,cljs.core.cst$kw$file);
return ["Unsupported preprocess value ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(preprocess)," for foreign library ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file),"."].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$js_DASH_shadowed_DASH_by_DASH_local,(function (warning_type,p__15455){
var map__15456 = p__15455;
var map__15456__$1 = (((((!((map__15456 == null))))?(((((map__15456.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15456.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15456):map__15456);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15456__$1,cljs.core.cst$kw$name);
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)," is shadowed by a local"].join('');
}));
cljs.analyzer.error_message.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$infer_DASH_warning,(function (warning_type,p__15458){
var map__15459 = p__15458;
var map__15459__$1 = (((((!((map__15459 == null))))?(((((map__15459.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15459.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15459):map__15459);
var warn_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15459__$1,cljs.core.cst$kw$warn_DASH_type);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15459__$1,cljs.core.cst$kw$form);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15459__$1,cljs.core.cst$kw$type);
var property = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15459__$1,cljs.core.cst$kw$property);
var G__15461 = warn_type;
var G__15461__$1 = (((G__15461 instanceof cljs.core.Keyword))?G__15461.fqn:null);
switch (G__15461__$1) {
case "target":
return ["Cannot infer target type in expression ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(form),""].join('');

break;
case "property":
return ["Cannot resolve property ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(property)," for inferred type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(type)," in expression ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(form)].join('');

break;
case "object":
return ["Adding extern to Object for property ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(property)," due to ","ambiguous expression ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(form)].join('');

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__15461__$1)].join('')));

}
}));
cljs.analyzer.default_warning_handler = (function cljs$analyzer$default_warning_handler(warning_type,env,extra){
if(cljs.core.truth_((warning_type.cljs$core$IFn$_invoke$arity$1 ? warning_type.cljs$core$IFn$_invoke$arity$1(cljs.analyzer._STAR_cljs_warnings_STAR_) : warning_type(cljs.analyzer._STAR_cljs_warnings_STAR_)))){
var temp__5735__auto__ = (cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2(warning_type,extra) : cljs.analyzer.error_message(warning_type,extra));
if(cljs.core.truth_(temp__5735__auto__)){
var s = temp__5735__auto__;
var _STAR_print_fn_STAR__orig_val__15463 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_fn_STAR__temp_val__15464 = cljs.core._STAR_print_err_fn_STAR_;
cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__15464;

try{return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var G__15465 = env;
var G__15466 = ["WARNING: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)].join('');
return (cljs.analyzer.message.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.message.cljs$core$IFn$_invoke$arity$2(G__15465,G__15466) : cljs.analyzer.message(G__15465,G__15466));
})()], 0));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__15463;
}} else {
return null;
}
} else {
return null;
}
});
cljs.analyzer._STAR_cljs_warning_handlers_STAR_ = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.analyzer.default_warning_handler], null);
cljs.analyzer.repeat_char = (function cljs$analyzer$repeat_char(c,n){
var ret = c;
var n__$1 = n;
while(true){
if((n__$1 > (0))){
var G__15467 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ret),cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)].join('');
var G__15468 = (n__$1 - (1));
ret = G__15467;
n__$1 = G__15468;
continue;
} else {
return ret;
}
break;
}
});
cljs.analyzer.hex_format = (function cljs$analyzer$hex_format(s,pad){
var hex = s.charCodeAt((0)).toString((16));
var len = hex.length;
var hex__$1 = (((len < pad))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.repeat_char("0",(pad - len))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(hex)].join(''):hex);
return ["_u",cljs.core.str.cljs$core$IFn$_invoke$arity$1(hex__$1),"_"].join('');
});
cljs.analyzer.gen_constant_id = (function cljs$analyzer$gen_constant_id(value){
var prefix = (((value instanceof cljs.core.Keyword))?"cst$kw$":(((value instanceof cljs.core.Symbol))?"cst$sym$":(function(){throw (new Error(["constant type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(value))," not supported"].join('')))})()
));
var name = (((value instanceof cljs.core.Keyword))?cljs.core.subs.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),(1)):cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
var name__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(".",name))?"_DOT_":clojure.string.replace(clojure.string.replace(cljs.core.munge(clojure.string.replace(name,"-","_DASH_")),".","$"),/[^a-z0-9$_]/i,((function (prefix,name){
return (function (p1__15469_SHARP_){
return cljs.analyzer.hex_format(p1__15469_SHARP_,(4));
});})(prefix,name))
));
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([prefix,cljs.core.str.cljs$core$IFn$_invoke$arity$1(name__$1)].join(''));
});
cljs.analyzer.register_constant_BANG_ = (function cljs$analyzer$register_constant_BANG_(var_args){
var G__15471 = arguments.length;
switch (G__15471) {
case 1:
return cljs.analyzer.register_constant_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.analyzer.register_constant_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.register_constant_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (val){
return cljs.analyzer.register_constant_BANG_.cljs$core$IFn$_invoke$arity$2(null,val);
});

cljs.analyzer.register_constant_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (env,val){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.env._STAR_compiler_STAR_,(function (cenv){
var G__15472 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cenv,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_constant_DASH_table], null),(function (table){
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(table,val))){
return table;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(table,val,cljs.analyzer.gen_constant_id(val));
}
}));
if(cljs.core.truth_(env)){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(G__15472,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env)),cljs.core.cst$kw$cljs$analyzer_SLASH_constants], null),((function (G__15472){
return (function (p__15473){
var map__15474 = p__15473;
var map__15474__$1 = (((((!((map__15474 == null))))?(((((map__15474.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15474.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15474):map__15474);
var constants = map__15474__$1;
var seen = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__15474__$1,cljs.core.cst$kw$seen,cljs.core.PersistentHashSet.EMPTY);
var order = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__15474__$1,cljs.core.cst$kw$order,cljs.core.PersistentVector.EMPTY);
var G__15476 = constants;
if((!(cljs.core.contains_QMARK_(seen,val)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(G__15476,cljs.core.cst$kw$seen,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(seen,val),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$order,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(order,val)], 0));
} else {
return G__15476;
}
});})(G__15472))
);
} else {
return G__15472;
}
}));
});

cljs.analyzer.register_constant_BANG_.cljs$lang$maxFixedArity = 2;

cljs.analyzer.default_namespaces = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$cljs$core,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,cljs.core.cst$sym$cljs$core], null),cljs.core.cst$sym$cljs$user,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,cljs.core.cst$sym$cljs$user], null)], null);
cljs.analyzer.namespaces = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.analyzer !== 'undefined') && (typeof cljs.analyzer.t_cljs$analyzer15478 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IWithMeta}
*/
cljs.analyzer.t_cljs$analyzer15478 = (function (meta15479){
this.meta15479 = meta15479;
this.cljs$lang$protocol_mask$partition0$ = 425984;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.analyzer.t_cljs$analyzer15478.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15480,meta15479__$1){
var self__ = this;
var _15480__$1 = this;
return (new cljs.analyzer.t_cljs$analyzer15478(meta15479__$1));
});

cljs.analyzer.t_cljs$analyzer15478.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15480){
var self__ = this;
var _15480__$1 = this;
return self__.meta15479;
});

cljs.analyzer.t_cljs$analyzer15478.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if((!((cljs.env._STAR_compiler_STAR_ == null)))){
return cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_));
} else {
return cljs.analyzer.default_namespaces;
}
});

cljs.analyzer.t_cljs$analyzer15478.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$meta15479], null);
});

cljs.analyzer.t_cljs$analyzer15478.cljs$lang$type = true;

cljs.analyzer.t_cljs$analyzer15478.cljs$lang$ctorStr = "cljs.analyzer/t_cljs$analyzer15478";

cljs.analyzer.t_cljs$analyzer15478.cljs$lang$ctorPrWriter = (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write(writer__4375__auto__,"cljs.analyzer/t_cljs$analyzer15478");
});

/**
 * Positional factory function for cljs.analyzer/t_cljs$analyzer15478.
 */
cljs.analyzer.__GT_t_cljs$analyzer15478 = (function cljs$analyzer$__GT_t_cljs$analyzer15478(meta15479){
return (new cljs.analyzer.t_cljs$analyzer15478(meta15479));
});

}

return (new cljs.analyzer.t_cljs$analyzer15478(cljs.core.PersistentArrayMap.EMPTY));
})()
;
cljs.analyzer.get_namespace = (function cljs$analyzer$get_namespace(var_args){
var G__15482 = arguments.length;
switch (G__15482) {
case 1:
return cljs.analyzer.get_namespace.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.analyzer.get_namespace.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.get_namespace.cljs$core$IFn$_invoke$arity$1 = (function (key){
return cljs.analyzer.get_namespace.cljs$core$IFn$_invoke$arity$2(cljs.env._STAR_compiler_STAR_,key);
});

cljs.analyzer.get_namespace.cljs$core$IFn$_invoke$arity$2 = (function (cenv,key){
var temp__5737__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cenv),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,key], null));
if((temp__5737__auto__ == null)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$cljs$user,key)){
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,cljs.core.cst$sym$cljs$user], null);
} else {
return null;
}
} else {
var ns = temp__5737__auto__;
return ns;
}
});

cljs.analyzer.get_namespace.cljs$lang$maxFixedArity = 2;

cljs.analyzer.get_line = (function cljs$analyzer$get_line(x,env){
var or__4131__auto__ = cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(x));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(env);
}
});
cljs.analyzer.get_col = (function cljs$analyzer$get_col(x,env){
var or__4131__auto__ = cljs.core.cst$kw$column.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(x));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.cst$kw$column.cljs$core$IFn$_invoke$arity$1(env);
}
});
/**
 * Given a Clojure namespace intern all macros into the ambient ClojureScript
 * analysis environment.
 */
cljs.analyzer.intern_macros = (function cljs$analyzer$intern_macros(var_args){
var G__15485 = arguments.length;
switch (G__15485) {
case 1:
return cljs.analyzer.intern_macros.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.analyzer.intern_macros.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.intern_macros.cljs$core$IFn$_invoke$arity$1 = (function (ns){
return cljs.analyzer.intern_macros.cljs$core$IFn$_invoke$arity$2(ns,false);
});

cljs.analyzer.intern_macros.cljs$core$IFn$_invoke$arity$2 = (function (ns,reload){
if(cljs.core.truth_((function (){var or__4131__auto__ = (cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns,cljs.core.cst$kw$macros) == null);
if(or__4131__auto__){
return or__4131__auto__;
} else {
return reload;
}
})())){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.env._STAR_compiler_STAR_,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns,cljs.core.cst$kw$macros], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__15486){
var vec__15487 = p__15486;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15487,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15487,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(function (){var vm = cljs.core.meta(v);
var ns__$1 = cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(vm).getName();
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(vm,cljs.core.cst$kw$ns,ns__$1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns__$1),cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)),cljs.core.cst$kw$macro,true], 0));
})()], null);
}),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__15490){
var vec__15491 = p__15490;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15491,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15491,(1),null);
return v.isMacro();
}),cljs.core.ns_interns_STAR_(ns)))));
} else {
return null;
}
});

cljs.analyzer.intern_macros.cljs$lang$maxFixedArity = 2;

/**
 * Construct an empty analysis environment. Required to analyze forms.
 */
cljs.analyzer.empty_env = (function cljs$analyzer$empty_env(){
var val__15282__auto__ = cljs.env._STAR_compiler_STAR_;
if((val__15282__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = cljs.env.default_compiler_env.cljs$core$IFn$_invoke$arity$0();
} else {
}

try{return new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$ns,cljs.analyzer.get_namespace.cljs$core$IFn$_invoke$arity$1(cljs.analyzer._STAR_cljs_ns_STAR_),cljs.core.cst$kw$context,cljs.core.cst$kw$statement,cljs.core.cst$kw$locals,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$fn_DASH_scope,cljs.core.PersistentVector.EMPTY,cljs.core.cst$kw$js_DASH_globals,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (val__15282__auto__){
return (function (p1__15495_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[p1__15495_SHARP_,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$op,cljs.core.cst$kw$js_DASH_var,cljs.core.cst$kw$name,p1__15495_SHARP_,cljs.core.cst$kw$ns,cljs.core.cst$sym$js], null)],null));
});})(val__15282__auto__))
,cljs.core.list(cljs.core.cst$sym$alert,cljs.core.cst$sym$window,cljs.core.cst$sym$document,cljs.core.cst$sym$console,cljs.core.cst$sym$escape,cljs.core.cst$sym$unescape,cljs.core.cst$sym$screen,cljs.core.cst$sym$location,cljs.core.cst$sym$navigator,cljs.core.cst$sym$history,cljs.core.cst$sym$location,cljs.core.cst$sym$global,cljs.core.cst$sym$process,cljs.core.cst$sym$require,cljs.core.cst$sym$module,cljs.core.cst$sym$exports)))], null);
}finally {if((val__15282__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = null;
} else {
}
}});
cljs.analyzer.source_info__GT_error_data = (function cljs$analyzer$source_info__GT_error_data(p__15496){
var map__15497 = p__15496;
var map__15497__$1 = (((((!((map__15497 == null))))?(((((map__15497.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15497.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15497):map__15497);
var file = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15497__$1,cljs.core.cst$kw$file);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15497__$1,cljs.core.cst$kw$line);
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15497__$1,cljs.core.cst$kw$column);
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$clojure$error_SLASH_source,file,cljs.core.cst$kw$clojure$error_SLASH_line,line,cljs.core.cst$kw$clojure$error_SLASH_column,column], null);
});
cljs.analyzer.source_info = (function cljs$analyzer$source_info(var_args){
var G__15500 = arguments.length;
switch (G__15500) {
case 1:
return cljs.analyzer.source_info.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.analyzer.source_info.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.source_info.cljs$core$IFn$_invoke$arity$1 = (function (env){
if(cljs.core.truth_(cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(env))){
return cljs.analyzer.source_info.cljs$core$IFn$_invoke$arity$2(null,env);
} else {
return null;
}
});

cljs.analyzer.source_info.cljs$core$IFn$_invoke$arity$2 = (function (name,env){
var G__15501 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$file,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env)),cljs.core.cst$sym$cljs$core))?"cljs/core.cljs":cljs.analyzer._STAR_cljs_file_STAR_),cljs.core.cst$kw$line,cljs.analyzer.get_line(name,env),cljs.core.cst$kw$column,cljs.analyzer.get_col(name,env)], null);
if(cljs.core.truth_(cljs.core.cst$kw$root_DASH_source_DASH_info.cljs$core$IFn$_invoke$arity$1(env))){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([G__15501,cljs.core.select_keys(env,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$root_DASH_source_DASH_info], null))], 0));
} else {
return G__15501;
}
});

cljs.analyzer.source_info.cljs$lang$maxFixedArity = 2;

cljs.analyzer.message = (function cljs$analyzer$message(env,s){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),(cljs.core.truth_(cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(env))?[" at line ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(env))," ",cljs.analyzer._STAR_cljs_file_STAR_].join(''):(cljs.core.truth_(cljs.analyzer._STAR_cljs_file_STAR_)?[" in file ",cljs.analyzer._STAR_cljs_file_STAR_].join(''):null))].join('');
});
cljs.analyzer.warning = (function cljs$analyzer$warning(warning_type,env,extra){
var seq__15503 = cljs.core.seq(cljs.analyzer._STAR_cljs_warning_handlers_STAR_);
var chunk__15504 = null;
var count__15505 = (0);
var i__15506 = (0);
while(true){
if((i__15506 < count__15505)){
var handler = chunk__15504.cljs$core$IIndexed$_nth$arity$2(null,i__15506);
(handler.cljs$core$IFn$_invoke$arity$3 ? handler.cljs$core$IFn$_invoke$arity$3(warning_type,env,extra) : handler(warning_type,env,extra));


var G__15507 = seq__15503;
var G__15508 = chunk__15504;
var G__15509 = count__15505;
var G__15510 = (i__15506 + (1));
seq__15503 = G__15507;
chunk__15504 = G__15508;
count__15505 = G__15509;
i__15506 = G__15510;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__15503);
if(temp__5735__auto__){
var seq__15503__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15503__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__15503__$1);
var G__15511 = cljs.core.chunk_rest(seq__15503__$1);
var G__15512 = c__4550__auto__;
var G__15513 = cljs.core.count(c__4550__auto__);
var G__15514 = (0);
seq__15503 = G__15511;
chunk__15504 = G__15512;
count__15505 = G__15513;
i__15506 = G__15514;
continue;
} else {
var handler = cljs.core.first(seq__15503__$1);
(handler.cljs$core$IFn$_invoke$arity$3 ? handler.cljs$core$IFn$_invoke$arity$3(warning_type,env,extra) : handler(warning_type,env,extra));


var G__15515 = cljs.core.next(seq__15503__$1);
var G__15516 = null;
var G__15517 = (0);
var G__15518 = (0);
seq__15503 = G__15515;
chunk__15504 = G__15516;
count__15505 = G__15517;
i__15506 = G__15518;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.analyzer.accumulating_warning_handler = (function cljs$analyzer$accumulating_warning_handler(warn_acc){
return (function (warning_type,env,extra){
if(cljs.core.truth_((warning_type.cljs$core$IFn$_invoke$arity$1 ? warning_type.cljs$core$IFn$_invoke$arity$1(cljs.analyzer._STAR_cljs_warnings_STAR_) : warning_type(cljs.analyzer._STAR_cljs_warnings_STAR_)))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(warn_acc,cljs.core.conj,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [warning_type,env,extra], null));
} else {
return null;
}
});
});
cljs.analyzer.replay_accumulated_warnings = (function cljs$analyzer$replay_accumulated_warnings(warn_acc){
return cljs.core.run_BANG_((function (p1__15519_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.warning,p1__15519_SHARP_);
}),cljs.core.deref(warn_acc));
});
cljs.analyzer.error_data = (function cljs$analyzer$error_data(var_args){
var G__15521 = arguments.length;
switch (G__15521) {
case 2:
return cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$2 = (function (env,phase){
return cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$3(env,phase,null);
});

cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$3 = (function (env,phase,symbol){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.analyzer.source_info__GT_error_data(cljs.analyzer.source_info.cljs$core$IFn$_invoke$arity$1(env)),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$clojure$error_SLASH_phase,phase], null),(cljs.core.truth_(symbol)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$clojure$error_SLASH_symbol,symbol], null):null)], 0));
});

cljs.analyzer.error_data.cljs$lang$maxFixedArity = 3;

cljs.analyzer.compile_syntax_error = (function cljs$analyzer$compile_syntax_error(env,msg,symbol){
return cljs.core.ex_info.cljs$core$IFn$_invoke$arity$3(null,cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$compile_DASH_syntax_DASH_check,symbol),(new Error(msg)));
});
cljs.analyzer.error = (function cljs$analyzer$error(var_args){
var G__15524 = arguments.length;
switch (G__15524) {
case 2:
return cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.analyzer.error.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2 = (function (env,msg){
return cljs.analyzer.error.cljs$core$IFn$_invoke$arity$3(env,msg,null);
});

cljs.analyzer.error.cljs$core$IFn$_invoke$arity$3 = (function (env,msg,cause){
return cljs.core.ex_info.cljs$core$IFn$_invoke$arity$3(cljs.analyzer.message(env,msg),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.analyzer.source_info.cljs$core$IFn$_invoke$arity$1(env),cljs.core.cst$kw$tag,cljs.core.cst$kw$cljs_SLASH_analysis_DASH_error),cause);
});

cljs.analyzer.error.cljs$lang$maxFixedArity = 3;

cljs.analyzer.analysis_error_QMARK_ = (function cljs$analyzer$analysis_error_QMARK_(ex){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$cljs_SLASH_analysis_DASH_error,cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data(ex)));
});
cljs.analyzer.has_error_data_QMARK_ = (function cljs$analyzer$has_error_data_QMARK_(ex){
return cljs.core.contains_QMARK_(cljs.core.ex_data(ex),cljs.core.cst$kw$clojure$error_SLASH_phase);
});
cljs.analyzer.implicit_nses = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$sym$String,"null",cljs.core.cst$sym$goog$string,"null",cljs.core.cst$sym$goog,"null",cljs.core.cst$sym$goog$object,"null",cljs.core.cst$sym$Math,"null",cljs.core.cst$sym$goog$array,"null"], null), null);
cljs.analyzer.implicit_import_QMARK_ = (function cljs$analyzer$implicit_import_QMARK_(env,prefix,suffix){
return cljs.core.contains_QMARK_(cljs.analyzer.implicit_nses,prefix);
});
cljs.analyzer.confirm_var_exist_warning = (function cljs$analyzer$confirm_var_exist_warning(env,prefix,suffix){
return (function (env__$1,prefix__$1,suffix__$1){
return cljs.analyzer.warning(cljs.core.cst$kw$undeclared_DASH_var,env__$1,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$prefix,prefix__$1,cljs.core.cst$kw$suffix,suffix__$1,cljs.core.cst$kw$macro_DASH_present_QMARK_,(!(((function (){var G__15527 = cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix__$1),cljs.core.str.cljs$core$IFn$_invoke$arity$1(suffix__$1));
var G__15528 = env__$1;
return (cljs.analyzer.get_expander.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.get_expander.cljs$core$IFn$_invoke$arity$2(G__15527,G__15528) : cljs.analyzer.get_expander(G__15527,G__15528));
})() == null)))], null));
});
});
/**
 * Check if a JavaScript namespace has been loaded. JavaScript vars are
 *   not currently checked.
 */
cljs.analyzer.loaded_js_ns_QMARK_ = (function cljs$analyzer$loaded_js_ns_QMARK_(env,prefix){
if(cljs.core.truth_(cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,prefix))){
return null;
} else {
var ns = cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env);
return (((!((cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$requires.cljs$core$IFn$_invoke$arity$1(ns),prefix) == null)))) || ((!((cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$imports.cljs$core$IFn$_invoke$arity$1(ns),prefix) == null)))));
}
});
cljs.analyzer.internal_js_module_exists_QMARK_ = (function cljs$analyzer$internal_js_module_exists_QMARK_(js_module_index,module){
return cljs.core.contains_QMARK_(cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__15529){
var vec__15530 = p__15529;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15530,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15530,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(v)], null);
})),js_module_index),cljs.core.str.cljs$core$IFn$_invoke$arity$1(module));
});
cljs.analyzer.js_module_exists_QMARK__STAR_ = cljs.core.memoize(cljs.analyzer.internal_js_module_exists_QMARK_);
cljs.analyzer.js_module_exists_QMARK_ = (function cljs$analyzer$js_module_exists_QMARK_(module){
var G__15533 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$js_DASH_module_DASH_index], null));
var G__15534 = module;
return (cljs.analyzer.js_module_exists_QMARK__STAR_.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.js_module_exists_QMARK__STAR_.cljs$core$IFn$_invoke$arity$2(G__15533,G__15534) : cljs.analyzer.js_module_exists_QMARK__STAR_(G__15533,G__15534));
});
cljs.analyzer.node_module_dep_QMARK_ = (function cljs$analyzer$node_module_dep_QMARK_(module){
try{return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_target_STAR_,"nodejs")) && (cljs.core.boolean$(require.resolve(cljs.core.str.cljs$core$IFn$_invoke$arity$1(module)))));
}catch (e15535){var _ = e15535;
return false;
}});
cljs.analyzer.dep_has_global_exports_QMARK_ = (function cljs$analyzer$dep_has_global_exports_QMARK_(module){
var global_exports = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$js_DASH_dependency_DASH_index,cljs.core.str.cljs$core$IFn$_invoke$arity$1(module),cljs.core.cst$kw$global_DASH_exports], null));
return ((cljs.core.contains_QMARK_(global_exports,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(module))) || (cljs.core.contains_QMARK_(global_exports,cljs.core.name(module))));
});
cljs.analyzer.confirm_var_exists = (function cljs$analyzer$confirm_var_exists(var_args){
var G__15537 = arguments.length;
switch (G__15537) {
case 3:
return cljs.analyzer.confirm_var_exists.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.analyzer.confirm_var_exists.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.confirm_var_exists.cljs$core$IFn$_invoke$arity$3 = (function (env,prefix,suffix){
var warn = cljs.analyzer.confirm_var_exist_warning(env,prefix,suffix);
return cljs.analyzer.confirm_var_exists.cljs$core$IFn$_invoke$arity$4(env,prefix,suffix,warn);
});

cljs.analyzer.confirm_var_exists.cljs$core$IFn$_invoke$arity$4 = (function (env,prefix,suffix,missing_fn){
var sufstr = cljs.core.str.cljs$core$IFn$_invoke$arity$1(suffix);
var suffix_str = (((((!((".." === sufstr)))) && (/\./.test(sufstr))))?cljs.core.first(clojure.string.split.cljs$core$IFn$_invoke$arity$2(sufstr,/\./)):suffix);
var suffix__$1 = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(suffix_str);
if((((!(cljs.analyzer.implicit_import_QMARK_(env,prefix,suffix__$1)))) && ((!(cljs.analyzer.loaded_js_ns_QMARK_(env,prefix)))) && ((!(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$cljs$core,prefix)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$unquote,suffix__$1)))))) && ((cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,prefix,cljs.core.cst$kw$defs,suffix__$1) == null)) && (cljs.core.not(cljs.analyzer.js_module_exists_QMARK_(prefix))))){
return (missing_fn.cljs$core$IFn$_invoke$arity$3 ? missing_fn.cljs$core$IFn$_invoke$arity$3(env,prefix,suffix__$1) : missing_fn(env,prefix,suffix__$1));
} else {
return null;
}
});

cljs.analyzer.confirm_var_exists.cljs$lang$maxFixedArity = 4;

cljs.analyzer.confirm_var_exists_throw = (function cljs$analyzer$confirm_var_exists_throw(){
return (function (env,prefix,suffix){
return cljs.analyzer.confirm_var_exists.cljs$core$IFn$_invoke$arity$4(env,prefix,suffix,(function (env__$1,prefix__$1,suffix__$1){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env__$1,["Unable to resolve var: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(suffix__$1)," in this context"].join(''));
}));
});
});
cljs.analyzer.resolve_ns_alias = (function cljs$analyzer$resolve_ns_alias(var_args){
var G__15540 = arguments.length;
switch (G__15540) {
case 2:
return cljs.analyzer.resolve_ns_alias.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.analyzer.resolve_ns_alias.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.resolve_ns_alias.cljs$core$IFn$_invoke$arity$2 = (function (env,name){
return cljs.analyzer.resolve_ns_alias.cljs$core$IFn$_invoke$arity$3(env,name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(name));
});

cljs.analyzer.resolve_ns_alias.cljs$core$IFn$_invoke$arity$3 = (function (env,name,not_found){
var sym = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(name);
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$requires.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env)),sym,not_found);
});

cljs.analyzer.resolve_ns_alias.cljs$lang$maxFixedArity = 3;

cljs.analyzer.resolve_macro_ns_alias = (function cljs$analyzer$resolve_macro_ns_alias(var_args){
var G__15543 = arguments.length;
switch (G__15543) {
case 2:
return cljs.analyzer.resolve_macro_ns_alias.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.analyzer.resolve_macro_ns_alias.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.resolve_macro_ns_alias.cljs$core$IFn$_invoke$arity$2 = (function (env,name){
return cljs.analyzer.resolve_macro_ns_alias.cljs$core$IFn$_invoke$arity$3(env,name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(name));
});

cljs.analyzer.resolve_macro_ns_alias.cljs$core$IFn$_invoke$arity$3 = (function (env,name,not_found){
var sym = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(name);
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$require_DASH_macros.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env)),sym,not_found);
});

cljs.analyzer.resolve_macro_ns_alias.cljs$lang$maxFixedArity = 3;

/**
 * Given env, an analysis environment, and ns-sym, a symbol identifying a
 * namespace, confirm that the namespace exists. Warn if not found.
 */
cljs.analyzer.confirm_ns = (function cljs$analyzer$confirm_ns(env,ns_sym){
if(((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$cljs$core,ns_sym)) && ((cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.implicit_nses,ns_sym) == null)) && ((cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$requires.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env)),ns_sym) == null)) && ((cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns_sym) == null)) && (cljs.core.not(cljs.analyzer.js_module_exists_QMARK_(ns_sym))))){
return cljs.analyzer.warning(cljs.core.cst$kw$undeclared_DASH_ns,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ns_DASH_sym,ns_sym,cljs.core.cst$kw$js_DASH_provide,ns_sym], null));
} else {
return null;
}
});
/**
 * Is sym visible from core in the current compilation namespace?
 */
cljs.analyzer.core_name_QMARK_ = (function cljs$analyzer$core_name_QMARK_(env,sym){
var and__4120__auto__ = (function (){var or__4131__auto__ = (!((cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,cljs.core.cst$sym$cljs$core,cljs.core.cst$kw$defs,sym) == null)));
if(or__4131__auto__){
return or__4131__auto__;
} else {
var temp__5737__auto__ = (cljs.analyzer.get_expander.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.get_expander.cljs$core$IFn$_invoke$arity$2(sym,env) : cljs.analyzer.get_expander(sym,env));
if((temp__5737__auto__ == null)){
return false;
} else {
var mac = temp__5737__auto__;
var ns = cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(mac));
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns.getName(),cljs.core.cst$sym$cljs$core$macros);
}
}
})();
if(and__4120__auto__){
return (!(cljs.core.contains_QMARK_(cljs.core.cst$kw$excludes.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env)),sym)));
} else {
return and__4120__auto__;
}
});
/**
 * Is sym public?
 */
cljs.analyzer.public_name_QMARK_ = (function cljs$analyzer$public_name_QMARK_(ns,sym){
var var_ast = (function (){var or__4131__auto__ = cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns,cljs.core.cst$kw$defs,sym);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.name(ns),"$macros"].join('')),cljs.core.cst$kw$defs,sym);
}
})();
return (((!((var_ast == null)))) && (cljs.core.not((function (){var or__4131__auto__ = cljs.core.cst$kw$private.cljs$core$IFn$_invoke$arity$1(var_ast);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.cst$kw$anonymous.cljs$core$IFn$_invoke$arity$1(var_ast);
}
})())));
});
cljs.analyzer.js_tag_QMARK_ = (function cljs$analyzer$js_tag_QMARK_(x){
return (((x instanceof cljs.core.Symbol)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$js,x)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("js",cljs.core.namespace(x))))));
});
cljs.analyzer.normalize_js_tag = (function cljs$analyzer$normalize_js_tag(x){
if((!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$js,x)))){
return cljs.core.with_meta(cljs.core.cst$sym$js,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$prefix,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.symbol,clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name(x),/\./))),cljs.core.cst$sym$prototype)], null));
} else {
return x;
}
});
/**
 * Ensures that a type tag is a set.
 */
cljs.analyzer.__GT_type_set = (function cljs$analyzer$__GT_type_set(t){
if(cljs.analyzer.cljs_set_QMARK_(t)){
return t;
} else {
return cljs.core.PersistentHashSet.createAsIfByAssoc([t]);
}
});
cljs.analyzer.canonicalize_type = (function cljs$analyzer$canonicalize_type(t){

if((t instanceof cljs.core.Symbol)){
return t;
} else {
if(cljs.core.empty_QMARK_(t)){
return null;
} else {
if(((1) === cljs.core.count(t))){
return cljs.core.first(t);
} else {
if(cljs.core.contains_QMARK_(t,cljs.core.cst$sym$any)){
return cljs.core.cst$sym$any;
} else {
if(cljs.core.contains_QMARK_(t,cljs.core.cst$sym$seq)){
var res = cljs.core.disj.cljs$core$IFn$_invoke$arity$2(t,cljs.core.cst$sym$clj_DASH_nil);
if(((1) === cljs.core.count(res))){
return cljs.core.cst$sym$seq;
} else {
return res;
}
} else {
return t;

}
}
}
}
}
});
/**
 * Produces a union of types.
 */
cljs.analyzer.add_types = (function cljs$analyzer$add_types(var_args){
var G__15549 = arguments.length;
switch (G__15549) {
case 0:
return cljs.analyzer.add_types.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.analyzer.add_types.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.analyzer.add_types.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__4751__auto__ = [];
var len__4730__auto___15551 = arguments.length;
var i__4731__auto___15552 = (0);
while(true){
if((i__4731__auto___15552 < len__4730__auto___15551)){
args_arr__4751__auto__.push((arguments[i__4731__auto___15552]));

var G__15553 = (i__4731__auto___15552 + (1));
i__4731__auto___15552 = G__15553;
continue;
} else {
}
break;
}

var argseq__4752__auto__ = (new cljs.core.IndexedSeq(args_arr__4751__auto__.slice((2)),(0),null));
return cljs.analyzer.add_types.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4752__auto__);

}
});

cljs.analyzer.add_types.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.cst$sym$any;
});

cljs.analyzer.add_types.cljs$core$IFn$_invoke$arity$1 = (function (t1){
return t1;
});

cljs.analyzer.add_types.cljs$core$IFn$_invoke$arity$2 = (function (t1,t2){
if((((t1 == null)) || ((t2 == null)))){
return cljs.core.cst$sym$any;
} else {
return cljs.analyzer.canonicalize_type(clojure.set.union.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.__GT_type_set(t1),cljs.analyzer.__GT_type_set(t2)));
}
});

cljs.analyzer.add_types.cljs$core$IFn$_invoke$arity$variadic = (function (t1,t2,ts){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.analyzer.add_types,cljs.analyzer.add_types.cljs$core$IFn$_invoke$arity$2(t1,t2),ts);
});

/** @this {Function} */
cljs.analyzer.add_types.cljs$lang$applyTo = (function (seq15546){
var G__15547 = cljs.core.first(seq15546);
var seq15546__$1 = cljs.core.next(seq15546);
var G__15548 = cljs.core.first(seq15546__$1);
var seq15546__$2 = cljs.core.next(seq15546__$1);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__15547,G__15548,seq15546__$2);
});

cljs.analyzer.add_types.cljs$lang$maxFixedArity = (2);

cljs.analyzer.alias__GT_type = new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$sym$object,cljs.core.cst$sym$Object,cljs.core.cst$sym$string,cljs.core.cst$sym$String,cljs.core.cst$sym$number,cljs.core.cst$sym$Number,cljs.core.cst$sym$array,cljs.core.cst$sym$Array,cljs.core.cst$sym$function,cljs.core.cst$sym$Function,cljs.core.cst$sym$boolean,cljs.core.cst$sym$Boolean,cljs.core.cst$sym$symbol,cljs.core.cst$sym$Symbol], null);
cljs.analyzer.has_extern_QMARK__STAR_ = (function cljs$analyzer$has_extern_QMARK__STAR_(var_args){
var G__15555 = arguments.length;
switch (G__15555) {
case 2:
return cljs.analyzer.has_extern_QMARK__STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.analyzer.has_extern_QMARK__STAR_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.has_extern_QMARK__STAR_.cljs$core$IFn$_invoke$arity$2 = (function (pre,externs){
var pre__$1 = (function (){var temp__5737__auto__ = cljs.core.find(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(externs,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$Window,cljs.core.cst$sym$prototype], null)),cljs.core.first(pre));
if((temp__5737__auto__ == null)){
return pre;
} else {
var me = temp__5737__auto__;
var temp__5737__auto____$1 = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(cljs.core.first(me)));
if((temp__5737__auto____$1 == null)){
return pre;
} else {
var tag = temp__5737__auto____$1;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag,cljs.core.cst$sym$prototype], null),cljs.core.next(pre));
}
}
})();
return cljs.analyzer.has_extern_QMARK__STAR_.cljs$core$IFn$_invoke$arity$3(pre__$1,externs,externs);
});

cljs.analyzer.has_extern_QMARK__STAR_.cljs$core$IFn$_invoke$arity$3 = (function (pre,externs,top){
while(true){
if(cljs.core.empty_QMARK_(pre)){
return true;
} else {
var x = cljs.core.first(pre);
var me = cljs.core.find(externs,x);
if(cljs.core.not(me)){
return false;
} else {
var vec__15556 = me;
var x_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15556,(0),null);
var externs_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15556,(1),null);
var xmeta = cljs.core.meta(x_SINGLEQUOTE_);
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$Function,cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(xmeta));
if(and__4120__auto__){
return cljs.core.cst$kw$ctor.cljs$core$IFn$_invoke$arity$1(xmeta);
} else {
return and__4120__auto__;
}
})())){
var or__4131__auto__ = cljs.analyzer.has_extern_QMARK__STAR_.cljs$core$IFn$_invoke$arity$3(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$prototype], null),cljs.core.next(pre)),externs_SINGLEQUOTE_,top);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.analyzer.has_extern_QMARK__STAR_.cljs$core$IFn$_invoke$arity$3(cljs.core.next(pre),externs_SINGLEQUOTE_,top);
}
} else {
var G__15560 = cljs.core.next(pre);
var G__15561 = externs_SINGLEQUOTE_;
var G__15562 = top;
pre = G__15560;
externs = G__15561;
top = G__15562;
continue;
}

}

}
break;
}
});

cljs.analyzer.has_extern_QMARK__STAR_.cljs$lang$maxFixedArity = 3;

cljs.analyzer.has_extern_QMARK_ = (function cljs$analyzer$has_extern_QMARK_(var_args){
var G__15564 = arguments.length;
switch (G__15564) {
case 1:
return cljs.analyzer.has_extern_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.analyzer.has_extern_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.has_extern_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (pre){
return cljs.analyzer.has_extern_QMARK_.cljs$core$IFn$_invoke$arity$2(pre,cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_externs));
});

cljs.analyzer.has_extern_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (pre,externs){
var or__4131__auto__ = cljs.analyzer.has_extern_QMARK__STAR_.cljs$core$IFn$_invoke$arity$2(pre,externs);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(pre)))?(function (){var x = cljs.core.first(pre);
var or__4131__auto____$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(externs,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$Window,cljs.core.cst$sym$prototype], null),x));
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(externs,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$Number], null),x));
}
})():null);
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
return clojure.string.starts_with_QMARK_(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.last(pre)),"cljs$");
}
}
});

cljs.analyzer.has_extern_QMARK_.cljs$lang$maxFixedArity = 2;

cljs.analyzer.js_tag = (function cljs$analyzer$js_tag(var_args){
var G__15567 = arguments.length;
switch (G__15567) {
case 1:
return cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$1 = (function (pre){
return cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$2(pre,cljs.core.cst$kw$tag);
});

cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$2 = (function (pre,tag_type){
return cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$3(pre,tag_type,cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_externs));
});

cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$3 = (function (pre,tag_type,externs){
return cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$4(pre,tag_type,externs,externs);
});

cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$4 = (function (pre,tag_type,externs,top){
var temp__5735__auto__ = cljs.core.find(externs,cljs.core.first(pre));
if(cljs.core.truth_(temp__5735__auto__)){
var vec__15568 = temp__5735__auto__;
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15568,(0),null);
var externs_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15568,(1),null);
var me = vec__15568;
var tag = (function (){var G__15571 = cljs.core.meta(p);
return (tag_type.cljs$core$IFn$_invoke$arity$1 ? tag_type.cljs$core$IFn$_invoke$arity$1(G__15571) : tag_type(G__15571));
})();
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(pre),(1))){
if(cljs.core.truth_(tag)){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("js",cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.analyzer.alias__GT_type.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.alias__GT_type.cljs$core$IFn$_invoke$arity$2(tag,tag) : cljs.analyzer.alias__GT_type(tag,tag))));
} else {
return null;
}
} else {
var or__4131__auto__ = cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$4(cljs.core.next(pre),tag_type,externs_SINGLEQUOTE_,top);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$4(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$prototype], null),cljs.core.next(pre)),tag_type,cljs.core.get.cljs$core$IFn$_invoke$arity$2(top,tag),top);
}
}
} else {
return null;
}
});

cljs.analyzer.js_tag.cljs$lang$maxFixedArity = 4;

cljs.analyzer.dotted_symbol_QMARK_ = (function cljs$analyzer$dotted_symbol_QMARK_(sym){
var s = cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym);
return ((goog.string.contains(s,".")) && ((!(goog.string.contains(s,"..")))));
});
cljs.analyzer.munge_node_lib = (function cljs$analyzer$munge_node_lib(name){
return ["node$module$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.munge(clojure.string.replace(cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),/[.\\/]/,"$$")))].join('');
});
cljs.analyzer.munge_global_export = (function cljs$analyzer$munge_global_export(name){
return ["global$module$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.munge(clojure.string.replace(cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),/[.\\/]/,"$$")))].join('');
});
/**
 * Takes a namespace and an unqualified symbol and potentially returns a new
 *   symbol to be used in lieu of the original.
 */
cljs.analyzer.resolve_alias = (function cljs$analyzer$resolve_alias(ns,sym){
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$cljs$core,ns);
if(and__4120__auto__){
var and__4120__auto____$1 = (function (){var fexpr__15575 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$aget,"null",cljs.core.cst$sym$aset,"null"], null), null);
return (fexpr__15575.cljs$core$IFn$_invoke$arity$1 ? fexpr__15575.cljs$core$IFn$_invoke$arity$1(sym) : fexpr__15575(sym));
})();
if(cljs.core.truth_(and__4120__auto____$1)){
return cljs.analyzer.checked_arrays();
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})())){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$warn,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$aget,cljs.core.cst$sym$checked_DASH_aget,cljs.core.cst$sym$aset,cljs.core.cst$sym$checked_DASH_aset], null),cljs.core.cst$kw$error,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$aget,cljs.core.cst$sym$checked_DASH_aget_SINGLEQUOTE_,cljs.core.cst$sym$aset,cljs.core.cst$sym$checked_DASH_aset_SINGLEQUOTE_], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.analyzer.checked_arrays(),sym], null));
} else {
return sym;
}
});
cljs.analyzer.ns__GT_module_type = (function cljs$analyzer$ns__GT_module_type(ns){
if(cljs.core.truth_(cljs.analyzer.js_module_exists_QMARK_(ns))){
return cljs.core.cst$kw$js;
} else {
if(cljs.analyzer.node_module_dep_QMARK_(ns)){
return cljs.core.cst$kw$node;
} else {
if(cljs.analyzer.dep_has_global_exports_QMARK_(ns)){
return cljs.core.cst$kw$global;
} else {
return null;
}
}
}
});
if((typeof cljs !== 'undefined') && (typeof cljs.analyzer !== 'undefined') && (typeof cljs.analyzer.resolve_STAR_ !== 'undefined')){
} else {
cljs.analyzer.resolve_STAR_ = (function (){var method_table__4613__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,(function (){var fexpr__15576 = cljs.core.get_global_hierarchy;
return (fexpr__15576.cljs$core$IFn$_invoke$arity$0 ? fexpr__15576.cljs$core$IFn$_invoke$arity$0() : fexpr__15576());
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.analyzer","resolve*"),((function (method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__,hierarchy__4617__auto__){
return (function (env,sym,full_ns,current_ns){
return cljs.analyzer.ns__GT_module_type(full_ns);
});})(method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__,hierarchy__4617__auto__))
,cljs.core.cst$kw$default,hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}
cljs.analyzer.resolve_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$js,(function (env,sym,full_ns,current_ns){
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(full_ns),cljs.core.name(sym)),cljs.core.cst$kw$op,cljs.core.cst$kw$js_DASH_var,cljs.core.cst$kw$ns,full_ns], null);
}));
cljs.analyzer.resolve_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$node,(function (env,sym,full_ns,current_ns){
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(current_ns),[cljs.analyzer.munge_node_lib(full_ns),".",cljs.core.name(sym)].join('')),cljs.core.cst$kw$op,cljs.core.cst$kw$js_DASH_var,cljs.core.cst$kw$ns,current_ns], null);
}));
cljs.analyzer.resolve_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$global,(function (env,sym,full_ns,current_ns){
var pre = cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$Object], null),cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.symbol,clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name(sym),/\./))));
if(cljs.core.truth_(cljs.analyzer.has_extern_QMARK_.cljs$core$IFn$_invoke$arity$1(pre))){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.env._STAR_compiler_STAR_,cljs.core.update_in,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,current_ns,cljs.core.cst$kw$externs], null),pre),cljs.core.merge,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.PersistentArrayMap.EMPTY], 0));
}

return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(current_ns),[cljs.analyzer.munge_global_export(full_ns),".",cljs.core.name(sym)].join('')),cljs.core.cst$kw$op,cljs.core.cst$kw$js_DASH_var,cljs.core.cst$kw$ns,current_ns,cljs.core.cst$kw$tag,cljs.core.with_meta(cljs.core.cst$sym$js,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$prefix,pre], null))], null);
}));
/**
 * Specially-treated symbols for which we don't trigger :private-var-access warnings.
 */
cljs.analyzer.private_var_access_exceptions = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$sym$cljs$core_SLASH_checked_DASH_aset_SINGLEQUOTE_,"null",cljs.core.cst$sym$cljs$core_SLASH_checked_DASH_aget_SINGLEQUOTE_,"null",cljs.core.cst$sym$cljs$core_SLASH_checked_DASH_aget,"null",cljs.core.cst$sym$cljs$core_SLASH_checked_DASH_aset,"null"], null), null);
cljs.analyzer.resolve_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (env,sym,full_ns,current_ns){
var sym_ast = cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,full_ns,cljs.core.cst$kw$defs,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(sym)));
var sym_name = cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(full_ns),cljs.core.name(sym));
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(current_ns,full_ns);
if(and__4120__auto__){
var and__4120__auto____$1 = cljs.core.cst$kw$private.cljs$core$IFn$_invoke$arity$1(sym_ast);
if(cljs.core.truth_(and__4120__auto____$1)){
return (((!(cljs.analyzer._STAR_private_var_access_nowarn_STAR_))) && ((!(cljs.core.contains_QMARK_(cljs.analyzer.private_var_access_exceptions,sym_name)))));
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})())){
cljs.analyzer.warning(cljs.core.cst$kw$private_DASH_var_DASH_access,env,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$sym,sym_name], null));
} else {
}

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([sym_ast,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$name,sym_name,cljs.core.cst$kw$op,cljs.core.cst$kw$var,cljs.core.cst$kw$ns,full_ns], null)], 0));
}));
cljs.analyzer.required_QMARK_ = (function cljs$analyzer$required_QMARK_(ns,env){
return ((cljs.core.contains_QMARK_(cljs.core.set(cljs.core.vals(cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$ns,cljs.core.cst$kw$requires))),ns)) || (cljs.core.contains_QMARK_(cljs.core.set(cljs.core.vals(cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$ns,cljs.core.cst$kw$uses))),ns)));
});
/**
 * Returns true if ns is a required namespace and a JavaScript module that
 * might be invokeable as a function.
 */
cljs.analyzer.invokeable_ns_QMARK_ = (function cljs$analyzer$invokeable_ns_QMARK_(ns,env){
var ns__$1 = cljs.analyzer.resolve_ns_alias.cljs$core$IFn$_invoke$arity$2(env,ns);
var and__4120__auto__ = cljs.analyzer.required_QMARK_(ns__$1,env);
if(and__4120__auto__){
var or__4131__auto__ = cljs.analyzer.js_module_exists_QMARK_(ns__$1);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return ((cljs.analyzer.node_module_dep_QMARK_(ns__$1)) || (cljs.analyzer.dep_has_global_exports_QMARK_(ns__$1)));
}
} else {
return and__4120__auto__;
}
});
cljs.analyzer.resolve_invokeable_ns = (function cljs$analyzer$resolve_invokeable_ns(ns,current_ns,env){
var ns__$1 = cljs.analyzer.resolve_ns_alias.cljs$core$IFn$_invoke$arity$2(env,ns);
var module_type = cljs.analyzer.ns__GT_module_type(ns__$1);
var G__15577 = module_type;
var G__15577__$1 = (((G__15577 instanceof cljs.core.Keyword))?G__15577.fqn:null);
switch (G__15577__$1) {
case "js":
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((function (){var or__4131__auto__ = cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$js_DASH_module_DASH_index,ns__$1,cljs.core.cst$kw$name);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.analyzer.resolve_ns_alias.cljs$core$IFn$_invoke$arity$2(env,ns__$1);
}
})()),cljs.core.cst$kw$op,cljs.core.cst$kw$js_DASH_var,cljs.core.cst$kw$ns,cljs.core.cst$sym$js], null);

break;
case "node":
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(current_ns),cljs.analyzer.munge_node_lib(cljs.analyzer.resolve_ns_alias.cljs$core$IFn$_invoke$arity$2(env,ns__$1))),cljs.core.cst$kw$op,cljs.core.cst$kw$js_DASH_var,cljs.core.cst$kw$ns,current_ns], null);

break;
case "global":
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(current_ns),cljs.analyzer.munge_global_export(cljs.analyzer.resolve_ns_alias.cljs$core$IFn$_invoke$arity$2(env,ns__$1))),cljs.core.cst$kw$op,cljs.core.cst$kw$js_DASH_var,cljs.core.cst$kw$ns,current_ns], null);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__15577__$1)].join('')));

}
});
cljs.analyzer.handle_symbol_local = (function cljs$analyzer$handle_symbol_local(sym,lb){
if((lb instanceof cljs.core.Symbol)){
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,sym], null);
} else {
return lb;
}
});
/**
 * Resolve a var. Accepts a side-effecting confirm fn for producing
 * warnings about unresolved vars.
 */
cljs.analyzer.resolve_var = (function cljs$analyzer$resolve_var(var_args){
var G__15580 = arguments.length;
switch (G__15580) {
case 2:
return cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2 = (function (env,sym){
return cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$3(env,sym,null);
});

cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$3 = (function (env,sym,confirm){
while(true){
var locals = cljs.core.cst$kw$locals.cljs$core$IFn$_invoke$arity$1(env);
if(("js" === cljs.core.namespace(sym))){
var symn = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(sym));
var shadowed_by_local = cljs.analyzer.handle_symbol_local(symn,cljs.core.get.cljs$core$IFn$_invoke$arity$2(locals,symn));
if((!((shadowed_by_local == null)))){
cljs.analyzer.warning(cljs.core.cst$kw$js_DASH_shadowed_DASH_by_DASH_local,env,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,sym], null));

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(shadowed_by_local,cljs.core.cst$kw$op,cljs.core.cst$kw$local);
} else {
var pre = cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.symbol,clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name(sym),/\./)));
if(((cljs.core.not(cljs.analyzer.has_extern_QMARK_.cljs$core$IFn$_invoke$arity$1(pre))) && (cljs.core.not(cljs.core.cst$kw$cljs$analyzer_SLASH_no_DASH_resolve.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(sym)))))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.env._STAR_compiler_STAR_,cljs.core.update_in,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env)),cljs.core.cst$kw$externs], null),pre),cljs.core.merge,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.PersistentArrayMap.EMPTY], 0));
} else {
}

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$name,sym,cljs.core.cst$kw$op,cljs.core.cst$kw$js_DASH_var,cljs.core.cst$kw$ns,cljs.core.cst$sym$js,cljs.core.cst$kw$tag,cljs.core.with_meta((function (){var or__4131__auto__ = cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$1(pre);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(sym));
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
return cljs.core.cst$sym$js;
}
}
})(),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$prefix,pre], null))], null),(function (){var temp__5735__auto__ = cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$2(pre,cljs.core.cst$kw$ret_DASH_tag);
if(cljs.core.truth_(temp__5735__auto__)){
var ret_tag = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$js_DASH_fn_DASH_var,true,cljs.core.cst$kw$ret_DASH_tag,ret_tag], null);
} else {
return null;
}
})()], 0));

}
} else {
var s = cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym);
var lb = cljs.analyzer.handle_symbol_local(sym,cljs.core.get.cljs$core$IFn$_invoke$arity$2(locals,sym));
var current_ns = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env));
if((!((lb == null)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(lb,cljs.core.cst$kw$op,cljs.core.cst$kw$local);
} else {
if((!((cljs.core.namespace(sym) == null)))){
var ns = cljs.core.namespace(sym);
var ns__$1 = ((("clojure.core" === ns))?"cljs.core":ns);
var full_ns = cljs.analyzer.resolve_ns_alias.cljs$core$IFn$_invoke$arity$3(env,ns__$1,(function (){var or__4131__auto__ = (function (){var and__4120__auto__ = cljs.analyzer.js_module_exists_QMARK_(ns__$1);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$js_DASH_module_DASH_index,ns__$1,cljs.core.cst$kw$name);
} else {
return and__4120__auto__;
}
})();
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(ns__$1);
}
})());
if((!((confirm == null)))){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(current_ns,full_ns)){
cljs.analyzer.confirm_ns(env,full_ns);
} else {
}

var G__15581_15588 = env;
var G__15582_15589 = full_ns;
var G__15583_15590 = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(sym));
(confirm.cljs$core$IFn$_invoke$arity$3 ? confirm.cljs$core$IFn$_invoke$arity$3(G__15581_15588,G__15582_15589,G__15583_15590) : confirm(G__15581_15588,G__15582_15589,G__15583_15590));
} else {
}

return (cljs.analyzer.resolve_STAR_.cljs$core$IFn$_invoke$arity$4 ? cljs.analyzer.resolve_STAR_.cljs$core$IFn$_invoke$arity$4(env,sym,full_ns,current_ns) : cljs.analyzer.resolve_STAR_(env,sym,full_ns,current_ns));
} else {
if(cljs.analyzer.dotted_symbol_QMARK_(sym)){
var idx = s.indexOf(".");
var prefix = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),idx));
var suffix = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(idx + (1)));
var temp__5737__auto__ = cljs.analyzer.handle_symbol_local(prefix,cljs.core.get.cljs$core$IFn$_invoke$arity$2(locals,prefix));
if((temp__5737__auto__ == null)){
var temp__5737__auto____$1 = cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,current_ns,cljs.core.cst$kw$imports,prefix);
if((temp__5737__auto____$1 == null)){
var temp__5737__auto____$2 = cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,current_ns,cljs.core.cst$kw$defs,prefix);
if((temp__5737__auto____$2 == null)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,prefix,cljs.core.cst$kw$defs,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(suffix)),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$name,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("",prefix))?cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(suffix):cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),suffix)),cljs.core.cst$kw$op,cljs.core.cst$kw$var,cljs.core.cst$kw$ns,prefix], null)], 0));
} else {
var info = temp__5737__auto____$2;
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([info,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(current_ns),cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym)),cljs.core.cst$kw$op,cljs.core.cst$kw$var,cljs.core.cst$kw$ns,current_ns], null)], 0));
}
} else {
var full_ns = temp__5737__auto____$1;
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$op,cljs.core.cst$kw$js_DASH_var,cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(full_ns),suffix)], null);
}
} else {
var lb__$1 = temp__5737__auto__;
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$op,cljs.core.cst$kw$local,cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(lb__$1)),".",cljs.core.str.cljs$core$IFn$_invoke$arity$1(suffix)].join(''))], null);
}
} else {
if((!((cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,current_ns,cljs.core.cst$kw$uses,sym) == null)))){
var full_ns = cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,current_ns,cljs.core.cst$kw$uses,sym);
return (cljs.analyzer.resolve_STAR_.cljs$core$IFn$_invoke$arity$4 ? cljs.analyzer.resolve_STAR_.cljs$core$IFn$_invoke$arity$4(env,sym,full_ns,current_ns) : cljs.analyzer.resolve_STAR_(env,sym,full_ns,current_ns));
} else {
if((!((cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,current_ns,cljs.core.cst$kw$renames,sym) == null)))){
var qualified_symbol = cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,current_ns,cljs.core.cst$kw$renames,sym);
var full_ns = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace(qualified_symbol));
var sym__$1 = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(qualified_symbol));
return (cljs.analyzer.resolve_STAR_.cljs$core$IFn$_invoke$arity$4 ? cljs.analyzer.resolve_STAR_.cljs$core$IFn$_invoke$arity$4(env,sym__$1,full_ns,current_ns) : cljs.analyzer.resolve_STAR_(env,sym__$1,full_ns,current_ns));
} else {
if((!((cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,current_ns,cljs.core.cst$kw$imports,sym) == null)))){
var G__15591 = env;
var G__15592 = cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,current_ns,cljs.core.cst$kw$imports,sym);
var G__15593 = confirm;
env = G__15591;
sym = G__15592;
confirm = G__15593;
continue;
} else {
if((!((cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,current_ns,cljs.core.cst$kw$defs,sym) == null)))){
if((!((confirm == null)))){
(confirm.cljs$core$IFn$_invoke$arity$3 ? confirm.cljs$core$IFn$_invoke$arity$3(env,current_ns,sym) : confirm(env,current_ns,sym));
} else {
}

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,current_ns,cljs.core.cst$kw$defs,sym),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(current_ns),cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym)),cljs.core.cst$kw$op,cljs.core.cst$kw$var,cljs.core.cst$kw$ns,current_ns], null)], 0));
} else {
if(cljs.analyzer.core_name_QMARK_(env,sym)){
if((!((confirm == null)))){
var G__15584_15594 = env;
var G__15585_15595 = cljs.core.cst$sym$cljs$core;
var G__15586_15596 = sym;
(confirm.cljs$core$IFn$_invoke$arity$3 ? confirm.cljs$core$IFn$_invoke$arity$3(G__15584_15594,G__15585_15595,G__15586_15596) : confirm(G__15584_15594,G__15585_15595,G__15586_15596));
} else {
}

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,cljs.core.cst$sym$cljs$core,cljs.core.cst$kw$defs,sym),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.core",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym)),cljs.core.cst$kw$op,cljs.core.cst$kw$var,cljs.core.cst$kw$ns,cljs.core.cst$sym$cljs$core], null)], 0));
} else {
if(cljs.core.truth_(cljs.analyzer.invokeable_ns_QMARK_(s,env))){
return cljs.analyzer.resolve_invokeable_ns(s,current_ns,env);
} else {
if((!((confirm == null)))){
(confirm.cljs$core$IFn$_invoke$arity$3 ? confirm.cljs$core$IFn$_invoke$arity$3(env,current_ns,sym) : confirm(env,current_ns,sym));
} else {
}

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,current_ns,cljs.core.cst$kw$defs,sym),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(current_ns),cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym)),cljs.core.cst$kw$op,cljs.core.cst$kw$var,cljs.core.cst$kw$ns,current_ns], null)], 0));

}
}
}
}
}
}
}
}
}
}
break;
}
});

cljs.analyzer.resolve_var.cljs$lang$maxFixedArity = 3;

/**
 * Given env, an analysis environment, and sym, a symbol, resolve an existing var.
 * Emits a warning if no such var exists.
 */
cljs.analyzer.resolve_existing_var = (function cljs$analyzer$resolve_existing_var(env,sym){
if(cljs.core.not(cljs.core.cst$kw$cljs$analyzer_SLASH_no_DASH_resolve.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(sym)))){
return cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$3(env,sym,cljs.analyzer.confirm_var_exists);
} else {
return cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(env,sym);
}
});
/**
 * Given env, an analysis environment env, and names, a list of symbols, confirm
 * that all correspond to declared dynamic vars.
 */
cljs.analyzer.confirm_bindings = (function cljs$analyzer$confirm_bindings(env,names){
var seq__15597 = cljs.core.seq(names);
var chunk__15598 = null;
var count__15599 = (0);
var i__15600 = (0);
while(true){
if((i__15600 < count__15599)){
var name = chunk__15598.cljs$core$IIndexed$_nth$arity$2(null,i__15600);
var env_15601__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$ns,cljs.analyzer.get_namespace.cljs$core$IFn$_invoke$arity$1(cljs.analyzer._STAR_cljs_ns_STAR_));
var ev_15602 = cljs.analyzer.resolve_existing_var(env_15601__$1,name);
if(cljs.core.truth_((function (){var and__4120__auto__ = ev_15602;
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.not(cljs.core.cst$kw$dynamic.cljs$core$IFn$_invoke$arity$1(ev_15602));
} else {
return and__4120__auto__;
}
})())){
cljs.analyzer.warning(cljs.core.cst$kw$dynamic,env_15601__$1,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ev,ev_15602,cljs.core.cst$kw$name,cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(ev_15602)], null));
} else {
}


var G__15603 = seq__15597;
var G__15604 = chunk__15598;
var G__15605 = count__15599;
var G__15606 = (i__15600 + (1));
seq__15597 = G__15603;
chunk__15598 = G__15604;
count__15599 = G__15605;
i__15600 = G__15606;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__15597);
if(temp__5735__auto__){
var seq__15597__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15597__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__15597__$1);
var G__15607 = cljs.core.chunk_rest(seq__15597__$1);
var G__15608 = c__4550__auto__;
var G__15609 = cljs.core.count(c__4550__auto__);
var G__15610 = (0);
seq__15597 = G__15607;
chunk__15598 = G__15608;
count__15599 = G__15609;
i__15600 = G__15610;
continue;
} else {
var name = cljs.core.first(seq__15597__$1);
var env_15611__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$ns,cljs.analyzer.get_namespace.cljs$core$IFn$_invoke$arity$1(cljs.analyzer._STAR_cljs_ns_STAR_));
var ev_15612 = cljs.analyzer.resolve_existing_var(env_15611__$1,name);
if(cljs.core.truth_((function (){var and__4120__auto__ = ev_15612;
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.not(cljs.core.cst$kw$dynamic.cljs$core$IFn$_invoke$arity$1(ev_15612));
} else {
return and__4120__auto__;
}
})())){
cljs.analyzer.warning(cljs.core.cst$kw$dynamic,env_15611__$1,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ev,ev_15612,cljs.core.cst$kw$name,cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(ev_15612)], null));
} else {
}


var G__15613 = cljs.core.next(seq__15597__$1);
var G__15614 = null;
var G__15615 = (0);
var G__15616 = (0);
seq__15597 = G__15613;
chunk__15598 = G__15614;
count__15599 = G__15615;
i__15600 = G__15616;
continue;
}
} else {
return null;
}
}
break;
}
});
/**
 * Given env, an analysis environment, and sym, a symbol, resolve a macro.
 */
cljs.analyzer.resolve_macro_var = (function cljs$analyzer$resolve_macro_var(env,sym){
var ns = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env));
var namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces);
if((!((cljs.core.namespace(sym) == null)))){
var ns__$1 = cljs.core.namespace(sym);
var ns__$2 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("clojure.core",ns__$1))?"cljs.core":ns__$1);
var full_ns = cljs.analyzer.resolve_macro_ns_alias.cljs$core$IFn$_invoke$arity$2(env,ns__$2);
var full_ns__$1 = (((!(clojure.string.ends_with_QMARK_(cljs.core.str.cljs$core$IFn$_invoke$arity$1(full_ns),"$macros"))))?cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(full_ns),"$macros"].join('')):full_ns);
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(namespaces,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [full_ns__$1,cljs.core.cst$kw$defs,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(sym))], null));
} else {
if((!((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(namespaces,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns,cljs.core.cst$kw$use_DASH_macros,sym], null)) == null)))){
var full_ns = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(namespaces,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns,cljs.core.cst$kw$use_DASH_macros,sym], null));
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(namespaces,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [full_ns,cljs.core.cst$kw$macros,sym], null));
} else {
if((!((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(namespaces,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns,cljs.core.cst$kw$rename_DASH_macros,sym], null)) == null)))){
var qualified_symbol = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(namespaces,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns,cljs.core.cst$kw$rename_DASH_macros,sym], null));
var full_ns = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace(qualified_symbol));
var sym__$1 = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(qualified_symbol));
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(namespaces,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [full_ns,cljs.core.cst$kw$macros,sym__$1], null));
} else {
var ns__$1 = (((!((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(namespaces,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns,cljs.core.cst$kw$macros,sym], null)) == null))))?ns:((cljs.analyzer.core_name_QMARK_(env,sym))?cljs.analyzer.CLJS_CORE_MACROS_SYM:null));
if((!((ns__$1 == null)))){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(namespaces,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns__$1,cljs.core.cst$kw$defs,sym], null));
} else {
return null;
}

}
}
}
});


cljs.analyzer.specials = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 22, [cljs.core.cst$sym$_AMPERSAND_,"null",cljs.core.cst$sym$case_STAR_,"null",cljs.core.cst$sym$defrecord_STAR_,"null",cljs.core.cst$sym$try,"null",cljs.core.cst$sym$ns_STAR_,"null",cljs.core.cst$sym$loop_STAR_,"null",cljs.core.cst$sym$do,"null",cljs.core.cst$sym$letfn_STAR_,"null",cljs.core.cst$sym$if,"null",cljs.core.cst$sym$new,"null",cljs.core.cst$sym$ns,"null",cljs.core.cst$sym$deftype_STAR_,"null",cljs.core.cst$sym$let_STAR_,"null",cljs.core.cst$sym$js_STAR_,"null",cljs.core.cst$sym$fn_STAR_,"null",cljs.core.cst$sym$recur,"null",cljs.core.cst$sym$set_BANG_,"null",cljs.core.cst$sym$_DOT_,"null",cljs.core.cst$sym$var,"null",cljs.core.cst$sym$quote,"null",cljs.core.cst$sym$throw,"null",cljs.core.cst$sym$def,"null"], null), null);
cljs.analyzer._STAR_recur_frames_STAR_ = null;
cljs.analyzer._STAR_loop_lets_STAR_ = cljs.core.List.EMPTY;
cljs.analyzer._STAR_allow_redef_STAR_ = false;
cljs.analyzer._STAR_allow_ns_STAR_ = true;
cljs.analyzer.analyze_keyword = (function cljs$analyzer$analyze_keyword(env,sym){
cljs.analyzer.register_constant_BANG_.cljs$core$IFn$_invoke$arity$2(env,sym);

return new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$op,cljs.core.cst$kw$const,cljs.core.cst$kw$val,sym,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,sym,cljs.core.cst$kw$tag,cljs.core.cst$sym$cljs$core_SLASH_Keyword], null);
});
cljs.analyzer.get_tag = (function cljs$analyzer$get_tag(e){
var temp__5737__auto__ = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(e)));
if((temp__5737__auto__ == null)){
var temp__5737__auto____$1 = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(e);
if((temp__5737__auto____$1 == null)){
return cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(e));
} else {
var tag = temp__5737__auto____$1;
return tag;
}
} else {
var tag = temp__5737__auto__;
return tag;
}
});
cljs.analyzer.find_matching_method = (function cljs$analyzer$find_matching_method(f,params){
var methods$ = (function (){var or__4131__auto__ = cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(f);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(f));
}
})();
var c = cljs.core.count(params);
return cljs.core.some(((function (methods$,c){
return (function (m){
var and__4120__auto__ = (function (){var or__4131__auto__ = (cljs.core.cst$kw$fixed_DASH_arity.cljs$core$IFn$_invoke$arity$1(m) === c);
if(or__4131__auto__){
return or__4131__auto__;
} else {
return cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(m);
}
})();
if(cljs.core.truth_(and__4120__auto__)){
return m;
} else {
return and__4120__auto__;
}
});})(methods$,c))
,methods$);
});
cljs.analyzer.type_QMARK_ = (function cljs$analyzer$type_QMARK_(env,t){
if((((!((t == null)))) && ((t instanceof cljs.core.Symbol)))){
var var$ = cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(env,t);
var temp__5737__auto__ = cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(var$);
if((temp__5737__auto__ == null)){
var temp__5737__auto____$1 = cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(var$));
if((temp__5737__auto____$1 == null)){
var temp__5737__auto____$2 = cljs.core.cst$kw$protocol_DASH_symbol.cljs$core$IFn$_invoke$arity$1(var$);
if((temp__5737__auto____$2 == null)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$cljs$core_SLASH_PersistentHashMap,"null",cljs.core.cst$sym$cljs$core_SLASH_List,"null"], null), null),t);
} else {
var proto = temp__5737__auto____$2;
return proto;
}
} else {
var type = temp__5737__auto____$1;
return type;
}
} else {
var type = temp__5737__auto__;
return type;
}
} else {
return null;
}
});
cljs.analyzer.NOT_NATIVE = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$clj,"null",cljs.core.cst$sym$not_DASH_native,"null"], null), null);
cljs.analyzer.BOOLEAN_OR_SEQ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$seq,"null",cljs.core.cst$sym$boolean,"null"], null), null);
cljs.analyzer.unwrap_quote = (function cljs$analyzer$unwrap_quote(p__15617){
var map__15618 = p__15617;
var map__15618__$1 = (((((!((map__15618 == null))))?(((((map__15618.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15618.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15618):map__15618);
var expr = map__15618__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15618__$1,cljs.core.cst$kw$op);
if(cljs.core.keyword_identical_QMARK_(op,cljs.core.cst$kw$quote)){
return cljs.core.cst$kw$expr.cljs$core$IFn$_invoke$arity$1(expr);
} else {
return expr;
}
});
cljs.analyzer.infer_if = (function cljs$analyzer$infer_if(env,e){
var map__15620 = cljs.analyzer.unwrap_quote(cljs.core.cst$kw$test.cljs$core$IFn$_invoke$arity$1(e));
var map__15620__$1 = (((((!((map__15620 == null))))?(((((map__15620.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15620.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15620):map__15620);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15620__$1,cljs.core.cst$kw$op);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15620__$1,cljs.core.cst$kw$form);
var then_tag = (function (){var G__15622 = env;
var G__15623 = cljs.core.cst$kw$then.cljs$core$IFn$_invoke$arity$1(e);
return (cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2(G__15622,G__15623) : cljs.analyzer.infer_tag(G__15622,G__15623));
})();
if(((cljs.core.keyword_identical_QMARK_(op,cljs.core.cst$kw$const)) && ((!((form == null)))) && ((!(form === false))))){
return then_tag;
} else {
var else_tag = (function (){var G__15624 = env;
var G__15625 = cljs.core.cst$kw$else.cljs$core$IFn$_invoke$arity$1(e);
return (cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2(G__15624,G__15625) : cljs.analyzer.infer_tag(G__15624,G__15625));
})();
if(((cljs.core.symbol_identical_QMARK_(then_tag,else_tag)) || (cljs.core.symbol_identical_QMARK_(else_tag,cljs.analyzer.IGNORE_SYM)))){
return then_tag;
} else {
if(cljs.core.symbol_identical_QMARK_(then_tag,cljs.analyzer.IGNORE_SYM)){
return else_tag;
} else {
if((((((!((cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.NOT_NATIVE,then_tag) == null)))) || (cljs.analyzer.type_QMARK_(env,then_tag)))) && ((((!((cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.NOT_NATIVE,else_tag) == null)))) || (cljs.analyzer.type_QMARK_(env,else_tag)))))){
return cljs.core.cst$sym$clj;
} else {
if((((!((cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.BOOLEAN_OR_SEQ,then_tag) == null)))) && ((!((cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.BOOLEAN_OR_SEQ,else_tag) == null)))))){
return cljs.core.cst$sym$seq;
} else {
var then_tag__$1 = ((cljs.analyzer.cljs_set_QMARK_(then_tag))?then_tag:cljs.core.PersistentHashSet.createAsIfByAssoc([then_tag]));
var else_tag__$1 = ((cljs.analyzer.cljs_set_QMARK_(else_tag))?else_tag:cljs.core.PersistentHashSet.createAsIfByAssoc([else_tag]));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(then_tag__$1,else_tag__$1);
}

}
}
}
}
});
cljs.analyzer.infer_invoke = (function cljs$analyzer$infer_invoke(env,p__15626){
var map__15627 = p__15626;
var map__15627__$1 = (((((!((map__15627 == null))))?(((((map__15627.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15627.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15627):map__15627);
var e = map__15627__$1;
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15627__$1,cljs.core.cst$kw$fn);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15627__$1,cljs.core.cst$kw$args);
var me = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.analyzer.find_matching_method(f,args),cljs.core.cst$kw$op,cljs.core.cst$kw$fn_DASH_method);
var temp__5737__auto__ = (cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2(env,me) : cljs.analyzer.infer_tag(env,me));
if((temp__5737__auto__ == null)){
var map__15629 = f;
var map__15629__$1 = (((((!((map__15629 == null))))?(((((map__15629.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15629.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15629):map__15629);
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15629__$1,cljs.core.cst$kw$info);
var temp__5737__auto____$1 = ((((cljs.core.cst$kw$fn_DASH_var.cljs$core$IFn$_invoke$arity$1(info) === true) || (cljs.core.cst$kw$js_DASH_fn_DASH_var.cljs$core$IFn$_invoke$arity$1(info) === true)))?cljs.core.cst$kw$ret_DASH_tag.cljs$core$IFn$_invoke$arity$1(info):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$js,cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(info)))?cljs.core.cst$sym$js:null));
if((temp__5737__auto____$1 == null)){
return cljs.analyzer.ANY_SYM;
} else {
var ret_tag = temp__5737__auto____$1;
return ret_tag;
}
} else {
var ret_tag = temp__5737__auto__;
return ret_tag;
}
});
/**
 * Given env, an analysis environment, and e, an AST node, return the inferred
 * type of the node
 */
cljs.analyzer.infer_tag = (function cljs$analyzer$infer_tag(env,e){
var temp__5737__auto__ = cljs.analyzer.get_tag(e);
if((temp__5737__auto__ == null)){
var G__15631 = cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(e);
var G__15631__$1 = (((G__15631 instanceof cljs.core.Keyword))?G__15631.fqn:null);
switch (G__15631__$1) {
case "recur":
return cljs.analyzer.IGNORE_SYM;

break;
case "throw":
return cljs.analyzer.IGNORE_SYM;

break;
case "let":
var G__15632 = env;
var G__15633 = cljs.core.cst$kw$body.cljs$core$IFn$_invoke$arity$1(e);
return (cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2(G__15632,G__15633) : cljs.analyzer.infer_tag(G__15632,G__15633));

break;
case "loop":
var G__15634 = env;
var G__15635 = cljs.core.cst$kw$body.cljs$core$IFn$_invoke$arity$1(e);
return (cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2(G__15634,G__15635) : cljs.analyzer.infer_tag(G__15634,G__15635));

break;
case "do":
var G__15636 = env;
var G__15637 = cljs.core.cst$kw$ret.cljs$core$IFn$_invoke$arity$1(e);
return (cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2(G__15636,G__15637) : cljs.analyzer.infer_tag(G__15636,G__15637));

break;
case "fn-method":
var G__15638 = env;
var G__15639 = cljs.core.cst$kw$body.cljs$core$IFn$_invoke$arity$1(e);
return (cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2(G__15638,G__15639) : cljs.analyzer.infer_tag(G__15638,G__15639));

break;
case "def":
var G__15640 = env;
var G__15641 = cljs.core.cst$kw$init.cljs$core$IFn$_invoke$arity$1(e);
return (cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2(G__15640,G__15641) : cljs.analyzer.infer_tag(G__15640,G__15641));

break;
case "invoke":
return cljs.analyzer.infer_invoke(env,e);

break;
case "if":
return cljs.analyzer.infer_if(env,e);

break;
case "const":
var G__15642 = cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(e);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(true,G__15642)){
return cljs.analyzer.BOOLEAN_SYM;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(false,G__15642)){
return cljs.analyzer.BOOLEAN_SYM;
} else {
return cljs.analyzer.ANY_SYM;

}
}

break;
case "quote":
var G__15643 = env;
var G__15644 = cljs.core.cst$kw$expr.cljs$core$IFn$_invoke$arity$1(e);
return (cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2(G__15643,G__15644) : cljs.analyzer.infer_tag(G__15643,G__15644));

break;
case "var":
case "local":
case "js-var":
case "binding":
var temp__5737__auto____$1 = cljs.core.cst$kw$init.cljs$core$IFn$_invoke$arity$1(e);
if((temp__5737__auto____$1 == null)){
var G__15645 = env;
var G__15646 = cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(e);
return (cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2(G__15645,G__15646) : cljs.analyzer.infer_tag(G__15645,G__15646));
} else {
var init = temp__5737__auto____$1;
return (cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.infer_tag.cljs$core$IFn$_invoke$arity$2(env,init) : cljs.analyzer.infer_tag(env,init));
}

break;
case "host-field":
case "host-call":
return cljs.analyzer.ANY_SYM;

break;
case "js":
return cljs.analyzer.ANY_SYM;

break;
default:
return null;

}
} else {
var tag = temp__5737__auto__;
return tag;
}
});
if((typeof cljs !== 'undefined') && (typeof cljs.analyzer !== 'undefined') && (typeof cljs.analyzer.parse !== 'undefined')){
} else {
cljs.analyzer.parse = (function (){var method_table__4613__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,(function (){var fexpr__15648 = cljs.core.get_global_hierarchy;
return (fexpr__15648.cljs$core$IFn$_invoke$arity$0 ? fexpr__15648.cljs$core$IFn$_invoke$arity$0() : fexpr__15648());
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.analyzer","parse"),((function (method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__,hierarchy__4617__auto__){
return (function() { 
var G__15649__delegate = function (op,rest){
return op;
};
var G__15649 = function (op,var_args){
var rest = null;
if (arguments.length > 1) {
var G__15650__i = 0, G__15650__a = new Array(arguments.length -  1);
while (G__15650__i < G__15650__a.length) {G__15650__a[G__15650__i] = arguments[G__15650__i + 1]; ++G__15650__i;}
  rest = new cljs.core.IndexedSeq(G__15650__a,0,null);
} 
return G__15649__delegate.call(this,op,rest);};
G__15649.cljs$lang$maxFixedArity = 1;
G__15649.cljs$lang$applyTo = (function (arglist__15651){
var op = cljs.core.first(arglist__15651);
var rest = cljs.core.rest(arglist__15651);
return G__15649__delegate(op,rest);
});
G__15649.cljs$core$IFn$_invoke$arity$variadic = G__15649__delegate;
return G__15649;
})()
;})(method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__,hierarchy__4617__auto__))
,cljs.core.cst$kw$default,hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}
cljs.analyzer.var_meta = (function cljs$analyzer$var_meta(var_args){
var G__15655 = arguments.length;
switch (G__15655) {
case 1:
return cljs.analyzer.var_meta.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.analyzer.var_meta.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.var_meta.cljs$core$IFn$_invoke$arity$1 = (function (var$){
return cljs.analyzer.var_meta.cljs$core$IFn$_invoke$arity$2(var$,null);
});

cljs.analyzer.var_meta.cljs$core$IFn$_invoke$arity$2 = (function (var$,expr_env){
var sym = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(var$);
var ks = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ns,cljs.core.cst$kw$doc,cljs.core.cst$kw$file,cljs.core.cst$kw$line,cljs.core.cst$kw$column], null);
var m = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var user_meta = cljs.core.cst$kw$meta.cljs$core$IFn$_invoke$arity$1(var$);
var uks = cljs.core.keys(user_meta);
return cljs.core.zipmap(uks,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (user_meta,uks,sym,ks){
return (function (p1__15652_SHARP_){
return (new cljs.core.List(null,cljs.core.cst$sym$quote,(new cljs.core.List(null,cljs.core.get.cljs$core$IFn$_invoke$arity$2(user_meta,p1__15652_SHARP_),null,(1),null)),(2),null));
});})(user_meta,uks,sym,ks))
,uks));
})(),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(cljs.core.zipmap(ks,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (sym,ks){
return (function (p1__15653_SHARP_){
return (new cljs.core.List(null,cljs.core.cst$sym$quote,(new cljs.core.List(null,cljs.core.get.cljs$core$IFn$_invoke$arity$2(var$,p1__15653_SHARP_),null,(1),null)),(2),null));
});})(sym,ks))
,ks)),cljs.core.cst$kw$name,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,cljs.core.cst$sym$quote,null,(1),null)),(new cljs.core.List(null,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(var$))),null,(1),null))))),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$test,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,cljs.core.cst$sym$cljs$core_SLASH_when,null,(1),null)),(new cljs.core.List(null,sym,null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,cljs.core.cst$sym$$_DASH_cljs$lang$test,null,(1),null)),(new cljs.core.List(null,sym,null,(1),null))))),null,(1),null))], 0)))),cljs.core.cst$kw$arglists,(function (){var arglists = cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(var$);
var arglists_SINGLEQUOTE_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$quote,cljs.core.first(arglists)))?cljs.core.second(arglists):arglists);
return (new cljs.core.List(null,cljs.core.cst$sym$quote,(new cljs.core.List(null,cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.with_meta,arglists_SINGLEQUOTE_,cljs.core.cst$kw$arglists_DASH_meta.cljs$core$IFn$_invoke$arity$1(var$))),null,(1),null)),(2),null));
})()], 0))], 0));
if(cljs.core.truth_(expr_env)){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(expr_env,m) : cljs.analyzer.analyze(expr_env,m));
} else {
return m;
}
});

cljs.analyzer.var_meta.cljs$lang$maxFixedArity = 2;

cljs.analyzer.var_ast = (function cljs$analyzer$var_ast(env,sym){
var _STAR_private_var_access_nowarn_STAR__orig_val__15657 = cljs.analyzer._STAR_private_var_access_nowarn_STAR_;
var _STAR_private_var_access_nowarn_STAR__temp_val__15658 = true;
cljs.analyzer._STAR_private_var_access_nowarn_STAR_ = _STAR_private_var_access_nowarn_STAR__temp_val__15658;

try{var env__$1 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$locals);
var var$ = cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$3(env__$1,sym,cljs.analyzer.confirm_var_exists_throw());
var expr_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env__$1,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var temp__5739__auto__ = cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(var$);
if((temp__5739__auto__ == null)){
return null;
} else {
var var_ns = temp__5739__auto__;
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$var,(cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(expr_env,sym) : cljs.analyzer.analyze(expr_env,sym)),cljs.core.cst$kw$sym,(function (){var G__15659 = expr_env;
var G__15660 = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,cljs.core.cst$sym$quote,null,(1),null)),(new cljs.core.List(null,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.name(var_ns),cljs.core.name(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(var$))),null,(1),null)))));
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15659,G__15660) : cljs.analyzer.analyze(G__15659,G__15660));
})(),cljs.core.cst$kw$meta,cljs.analyzer.var_meta.cljs$core$IFn$_invoke$arity$2(var$,expr_env)], null);
}
}finally {cljs.analyzer._STAR_private_var_access_nowarn_STAR_ = _STAR_private_var_access_nowarn_STAR__orig_val__15657;
}});
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$var,(function (op,env,p__15661,_,___$1){
var vec__15662 = p__15661;
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15662,(0),null);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15662,(1),null);
var form = vec__15662;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(form))){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Wrong number of args to var");
} else {
}

if((sym instanceof cljs.core.Symbol)){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Argument to var must be symbol");
}

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$env,env,cljs.core.cst$kw$op,cljs.core.cst$kw$the_DASH_var,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,cljs.core.cst$kw$sym,cljs.core.cst$kw$meta], null),cljs.core.cst$kw$form,form], null),cljs.analyzer.var_ast(env,sym)], 0));
}));
cljs.analyzer.predicate__GT_tag = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$sym$cljs$core_SLASH_array_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_boolean_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_char_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_sequential_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_var_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_map_DASH_entry_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_double_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_string_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_inst_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_float_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_true_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_number_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_volatile_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_integer_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_infinite_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_undefined_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_uuid_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_record_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_reduced_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_tagged_DASH_literal_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_nil_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_zero_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_false_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_list_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_seqable_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_symbol_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_seq_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_delay_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_regexp_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_ident_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_chunked_DASH_seq_QMARK_],[cljs.core.cst$sym$array,cljs.core.cst$sym$boolean,cljs.core.cst$sym$string,cljs.core.cst$sym$cljs$core_SLASH_ISequential,cljs.core.cst$sym$cljs$core_SLASH_Keyword,cljs.core.cst$sym$cljs$core_SLASH_Var,cljs.core.cst$sym$cljs$core_SLASH_IMapEntry,cljs.core.cst$sym$number,cljs.core.cst$sym$string,cljs.core.cst$sym$cljs$core_SLASH_Inst,cljs.core.cst$sym$number,cljs.core.cst$sym$boolean,cljs.core.cst$sym$number,cljs.core.cst$sym$cljs$core_SLASH_Volatile,cljs.core.cst$sym$number,cljs.core.cst$sym$number,cljs.core.cst$sym$clj_DASH_nil,cljs.core.cst$sym$cljs$core_SLASH_IUUID,cljs.core.cst$sym$cljs$core_SLASH_IRecord,cljs.core.cst$sym$cljs$core_SLASH_Reduced,cljs.core.cst$sym$cljs$core_SLASH_ITaggedLiteral,cljs.core.cst$sym$clj_DASH_nil,cljs.core.cst$sym$number,cljs.core.cst$sym$boolean,cljs.core.cst$sym$cljs$core_SLASH_IList,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$sym$cljs$core_SLASH_ISeqable,"null",cljs.core.cst$sym$array,"null",cljs.core.cst$sym$string,"null"], null), null),cljs.core.cst$sym$cljs$core_SLASH_Symbol,cljs.core.cst$sym$seq,cljs.core.cst$sym$cljs$core_SLASH_Delay,cljs.core.cst$sym$js_SLASH_RegExp,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$cljs$core_SLASH_Keyword,"null",cljs.core.cst$sym$cljs$core_SLASH_Symbol,"null"], null), null),cljs.core.cst$sym$cljs$core_SLASH_IChunkedSeq]);
/**
 * Look for a predicate-induced tag when the test expression is a simple
 * application of a predicate to a local, as in (string? x).
 */
cljs.analyzer.simple_predicate_induced_tag = (function cljs$analyzer$simple_predicate_induced_tag(env,test){
if(((cljs.core.list_QMARK_(test)) && (((2) === cljs.core.count(test))) && (cljs.core.every_QMARK_(cljs.core.symbol_QMARK_,test)))){
var analyzed_fn = (function (){var _STAR_cljs_warnings_STAR__orig_val__15665 = cljs.analyzer._STAR_cljs_warnings_STAR_;
var _STAR_cljs_warnings_STAR__temp_val__15666 = cljs.core.zipmap(cljs.core.keys(cljs.analyzer._STAR_cljs_warnings_STAR_),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(false));
cljs.analyzer._STAR_cljs_warnings_STAR_ = _STAR_cljs_warnings_STAR__temp_val__15666;

try{var G__15667 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var G__15668 = cljs.core.first(test);
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15667,G__15668) : cljs.analyzer.analyze(G__15667,G__15668));
}finally {cljs.analyzer._STAR_cljs_warnings_STAR_ = _STAR_cljs_warnings_STAR__orig_val__15665;
}})();
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$var,cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(analyzed_fn))){
var temp__5735__auto__ = (function (){var G__15669 = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(analyzed_fn);
return (cljs.analyzer.predicate__GT_tag.cljs$core$IFn$_invoke$arity$1 ? cljs.analyzer.predicate__GT_tag.cljs$core$IFn$_invoke$arity$1(G__15669) : cljs.analyzer.predicate__GT_tag(G__15669));
})();
if(cljs.core.truth_(temp__5735__auto__)){
var tag = temp__5735__auto__;
var sym = cljs.core.last(test);
if(cljs.core.truth_((function (){var and__4120__auto__ = (cljs.core.namespace(sym) == null);
if(and__4120__auto__){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$locals,sym], null));
} else {
return and__4120__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sym,tag], null);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
});
/**
 * Look for a type-check-induced tag when the test expression is the use of
 * instance? on a local, as in (instance? ICounted x).
 */
cljs.analyzer.type_check_induced_tag = (function cljs$analyzer$type_check_induced_tag(env,test){
if(((cljs.core.list_QMARK_(test)) && (((3) === cljs.core.count(test))) && (cljs.core.every_QMARK_(cljs.core.symbol_QMARK_,test)))){
var analyzed_fn = (function (){var _STAR_cljs_warnings_STAR__orig_val__15670 = cljs.analyzer._STAR_cljs_warnings_STAR_;
var _STAR_cljs_warnings_STAR__temp_val__15671 = cljs.core.zipmap(cljs.core.keys(cljs.analyzer._STAR_cljs_warnings_STAR_),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(false));
cljs.analyzer._STAR_cljs_warnings_STAR_ = _STAR_cljs_warnings_STAR__temp_val__15671;

try{var G__15672 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var G__15673 = cljs.core.first(test);
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15672,G__15673) : cljs.analyzer.analyze(G__15672,G__15673));
}finally {cljs.analyzer._STAR_cljs_warnings_STAR_ = _STAR_cljs_warnings_STAR__orig_val__15670;
}})();
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$var,cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(analyzed_fn))){
if(cljs.core.truth_((function (){var G__15675 = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(analyzed_fn);
var fexpr__15674 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$cljs$core_SLASH_instance_QMARK_,"null"], null), null);
return (fexpr__15674.cljs$core$IFn$_invoke$arity$1 ? fexpr__15674.cljs$core$IFn$_invoke$arity$1(G__15675) : fexpr__15674(G__15675));
})())){
var analyzed_type = (function (){var _STAR_cljs_warnings_STAR__orig_val__15676 = cljs.analyzer._STAR_cljs_warnings_STAR_;
var _STAR_cljs_warnings_STAR__temp_val__15677 = cljs.core.zipmap(cljs.core.keys(cljs.analyzer._STAR_cljs_warnings_STAR_),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(false));
cljs.analyzer._STAR_cljs_warnings_STAR_ = _STAR_cljs_warnings_STAR__temp_val__15677;

try{var G__15678 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var G__15679 = cljs.core.second(test);
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15678,G__15679) : cljs.analyzer.analyze(G__15678,G__15679));
}finally {cljs.analyzer._STAR_cljs_warnings_STAR_ = _STAR_cljs_warnings_STAR__orig_val__15676;
}})();
var tag = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(analyzed_type);
var sym = cljs.core.last(test);
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$var,cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(analyzed_type));
if(and__4120__auto__){
var and__4120__auto____$1 = (cljs.core.namespace(sym) == null);
if(and__4120__auto____$1){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$locals,sym], null));
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sym,tag], null);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
});
/**
 * Refine a tag to exclude clj-nil if the test is a simple symbol.
 */
cljs.analyzer.truth_induced_tag = (function cljs$analyzer$truth_induced_tag(env,test){
if((((test instanceof cljs.core.Symbol)) && ((cljs.core.namespace(test) == null)))){
var analyzed_symbol = (function (){var _STAR_cljs_warnings_STAR__orig_val__15680 = cljs.analyzer._STAR_cljs_warnings_STAR_;
var _STAR_cljs_warnings_STAR__temp_val__15681 = cljs.core.zipmap(cljs.core.keys(cljs.analyzer._STAR_cljs_warnings_STAR_),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(false));
cljs.analyzer._STAR_cljs_warnings_STAR_ = _STAR_cljs_warnings_STAR__temp_val__15681;

try{var G__15682 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var G__15683 = test;
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15682,G__15683) : cljs.analyzer.analyze(G__15682,G__15683));
}finally {cljs.analyzer._STAR_cljs_warnings_STAR_ = _STAR_cljs_warnings_STAR__orig_val__15680;
}})();
var temp__5735__auto__ = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(analyzed_symbol);
if(cljs.core.truth_(temp__5735__auto__)){
var tag = temp__5735__auto__;
if(((cljs.core.set_QMARK_(tag)) && (cljs.core.contains_QMARK_(tag,cljs.core.cst$sym$clj_DASH_nil)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [test,cljs.analyzer.canonicalize_type(cljs.core.disj.cljs$core$IFn$_invoke$arity$2(tag,cljs.core.cst$sym$clj_DASH_nil))], null);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
});
/**
 * Looks at the test and sets any tags which are induced by virtue
 *   of the test being truthy. For example in (if (string? x) x :bar)
 *   the local x in the then branch must be of string type.
 */
cljs.analyzer.set_test_induced_tags = (function cljs$analyzer$set_test_induced_tags(env,test){
var vec__15684 = (function (){var or__4131__auto__ = cljs.analyzer.simple_predicate_induced_tag(env,test);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = cljs.analyzer.type_check_induced_tag(env,test);
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
return cljs.analyzer.truth_induced_tag(env,test);
}
}
})();
var local = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15684,(0),null);
var tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15684,(1),null);
var G__15687 = env;
if(cljs.core.truth_(local)){
return cljs.core.assoc_in(G__15687,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$locals,local,cljs.core.cst$kw$tag], null),tag);
} else {
return G__15687;
}
});
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$if,(function (op,env,p__15688,name,_){
var vec__15689 = p__15688;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15689,(0),null);
var test = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15689,(1),null);
var then = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15689,(2),null);
var else$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15689,(3),null);
var form = vec__15689;
if((cljs.core.count(form) < (3))){
throw cljs.analyzer.compile_syntax_error(env,"Too few arguments to if",cljs.core.cst$sym$if);
} else {
}

if((cljs.core.count(form) > (4))){
throw cljs.analyzer.compile_syntax_error(env,"Too many arguments to if",cljs.core.cst$sym$if);
} else {
}

var test_expr = (function (){var _STAR_recur_frames_STAR__orig_val__15692 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__15693 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15693;

try{var G__15694 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var G__15695 = test;
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15694,G__15695) : cljs.analyzer.analyze(G__15694,G__15695));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15692;
}})();
var then_expr = (function (){var _STAR_allow_redef_STAR__orig_val__15696 = cljs.analyzer._STAR_allow_redef_STAR_;
var _STAR_allow_redef_STAR__temp_val__15697 = true;
cljs.analyzer._STAR_allow_redef_STAR_ = _STAR_allow_redef_STAR__temp_val__15697;

try{var G__15698 = cljs.analyzer.set_test_induced_tags(env,test);
var G__15699 = then;
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15698,G__15699) : cljs.analyzer.analyze(G__15698,G__15699));
}finally {cljs.analyzer._STAR_allow_redef_STAR_ = _STAR_allow_redef_STAR__orig_val__15696;
}})();
var else_expr = (function (){var _STAR_allow_redef_STAR__orig_val__15700 = cljs.analyzer._STAR_allow_redef_STAR_;
var _STAR_allow_redef_STAR__temp_val__15701 = true;
cljs.analyzer._STAR_allow_redef_STAR_ = _STAR_allow_redef_STAR__temp_val__15701;

try{return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(env,else$) : cljs.analyzer.analyze(env,else$));
}finally {cljs.analyzer._STAR_allow_redef_STAR_ = _STAR_allow_redef_STAR__orig_val__15700;
}})();
return new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$env,env,cljs.core.cst$kw$op,cljs.core.cst$kw$if,cljs.core.cst$kw$form,form,cljs.core.cst$kw$test,test_expr,cljs.core.cst$kw$then,then_expr,cljs.core.cst$kw$else,else_expr,cljs.core.cst$kw$unchecked,cljs.core._STAR_unchecked_if_STAR_,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$test,cljs.core.cst$kw$then,cljs.core.cst$kw$else], null)], null);
}));
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$case_STAR_,(function (op,env,p__15704,name,_){
var vec__15705 = p__15704;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15705,(0),null);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15705,(1),null);
var tests = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15705,(2),null);
var thens = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15705,(3),null);
var default$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15705,(4),null);
var form = vec__15705;
if((sym instanceof cljs.core.Symbol)){
} else {
throw (new Error(["Assert failed: ","case* must switch on symbol","\n","(symbol? sym)"].join('')));
}

if(cljs.core.every_QMARK_(cljs.core.vector_QMARK_,tests)){
} else {
throw (new Error(["Assert failed: ","case* tests must be grouped in vectors","\n","(every? vector? tests)"].join('')));
}

var expr_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var v = (function (){var _STAR_recur_frames_STAR__orig_val__15708 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__15709 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15709;

try{return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(expr_env,sym) : cljs.analyzer.analyze(expr_env,sym));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15708;
}})();
var tests__$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (expr_env,v,vec__15705,___$1,sym,tests,thens,default$,form){
return (function (p1__15702_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (expr_env,v,vec__15705,___$1,sym,tests,thens,default$,form){
return (function (t){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(expr_env,t) : cljs.analyzer.analyze(expr_env,t));
});})(expr_env,v,vec__15705,___$1,sym,tests,thens,default$,form))
,p1__15702_SHARP_);
});})(expr_env,v,vec__15705,___$1,sym,tests,thens,default$,form))
,tests);
var thens__$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (expr_env,v,tests__$1,vec__15705,___$1,sym,tests,thens,default$,form){
return (function (p1__15703_SHARP_){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(env,p1__15703_SHARP_) : cljs.analyzer.analyze(env,p1__15703_SHARP_));
});})(expr_env,v,tests__$1,vec__15705,___$1,sym,tests,thens,default$,form))
,thens);
var nodes = cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(((function (expr_env,v,tests__$1,thens__$1,vec__15705,___$1,sym,tests,thens,default$,form){
return (function (tests__$2,then){
return new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$op,cljs.core.cst$kw$case_DASH_node,cljs.core.cst$kw$env,env,cljs.core.cst$kw$tests,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (expr_env,v,tests__$1,thens__$1,vec__15705,___$1,sym,tests,thens,default$,form){
return (function (test){
return new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$op,cljs.core.cst$kw$case_DASH_test,cljs.core.cst$kw$form,cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(test),cljs.core.cst$kw$env,expr_env,cljs.core.cst$kw$test,test,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$test], null)], null);
});})(expr_env,v,tests__$1,thens__$1,vec__15705,___$1,sym,tests,thens,default$,form))
,tests__$2),cljs.core.cst$kw$then,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$op,cljs.core.cst$kw$case_DASH_then,cljs.core.cst$kw$form,cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(then),cljs.core.cst$kw$env,env,cljs.core.cst$kw$then,then,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$then], null)], null),cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tests,cljs.core.cst$kw$then], null)], null);
});})(expr_env,v,tests__$1,thens__$1,vec__15705,___$1,sym,tests,thens,default$,form))
,tests__$1,thens__$1);
var default$__$1 = (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(env,default$) : cljs.analyzer.analyze(env,default$));
if(cljs.core.every_QMARK_(((function (expr_env,v,tests__$1,thens__$1,nodes,default$__$1,vec__15705,___$1,sym,tests,thens,default$,form){
return (function (t){
var or__4131__auto__ = cljs.core.cst$kw$const.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(t));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var and__4120__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$const,cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(t));
if(and__4120__auto__){
var G__15713 = cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(t);
var fexpr__15712 = cljs.core.some_fn.cljs$core$IFn$_invoke$arity$3(cljs.core.number_QMARK_,cljs.core.string_QMARK_,cljs.core.char_QMARK_);
return (fexpr__15712.cljs$core$IFn$_invoke$arity$1 ? fexpr__15712.cljs$core$IFn$_invoke$arity$1(G__15713) : fexpr__15712(G__15713));
} else {
return and__4120__auto__;
}
}
});})(expr_env,v,tests__$1,thens__$1,nodes,default$__$1,vec__15705,___$1,sym,tests,thens,default$,form))
,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,tests__$1))){
} else {
throw (new Error(["Assert failed: ","case* tests must be numbers, strings, or constants","\n","(every? (fn [t] (or (-> t :info :const) (and (= :const (:op t)) ((some-fn number? string? char?) (:form t))))) (apply concat tests))"].join('')));
}

return new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$env,env,cljs.core.cst$kw$op,cljs.core.cst$kw$case,cljs.core.cst$kw$form,form,cljs.core.cst$kw$test,v,cljs.core.cst$kw$nodes,nodes,cljs.core.cst$kw$default,default$__$1,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$test,cljs.core.cst$kw$nodes,cljs.core.cst$kw$default], null)], null);
}));
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$throw,(function (op,env,p__15714,name,_){
var vec__15715 = p__15714;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15715,(0),null);
var throw_form = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15715,(1),null);
var form = vec__15715;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(form))){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Too few arguments to throw, throw expects a single Error instance");
} else {
if(((2) < cljs.core.count(form))){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Too many arguments to throw, throw expects a single Error instance");
} else {
}
}

var throw_expr = (function (){var _STAR_recur_frames_STAR__orig_val__15718 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__15719 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15719;

try{var G__15720 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var G__15721 = throw_form;
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15720,G__15721) : cljs.analyzer.analyze(G__15720,G__15721));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15718;
}})();
return new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$env,env,cljs.core.cst$kw$op,cljs.core.cst$kw$throw,cljs.core.cst$kw$form,form,cljs.core.cst$kw$exception,throw_expr,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$exception], null)], null);
}));
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$try,(function (op,env,p__15726,name,_){
var vec__15727 = p__15726;
var seq__15728 = cljs.core.seq(vec__15727);
var first__15729 = cljs.core.first(seq__15728);
var seq__15728__$1 = cljs.core.next(seq__15728);
var ___$1 = first__15729;
var body = seq__15728__$1;
var form = vec__15727;
var catchenv = cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$context], null),((function (vec__15727,seq__15728,first__15729,seq__15728__$1,___$1,body,form){
return (function (p1__15722_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,p1__15722_SHARP_)){
return cljs.core.cst$kw$return;
} else {
return p1__15722_SHARP_;
}
});})(vec__15727,seq__15728,first__15729,seq__15728__$1,___$1,body,form))
);
var catch_QMARK_ = cljs.core.every_pred.cljs$core$IFn$_invoke$arity$2(cljs.core.seq_QMARK_,((function (catchenv,vec__15727,seq__15728,first__15729,seq__15728__$1,___$1,body,form){
return (function (p1__15723_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(p1__15723_SHARP_),cljs.core.cst$sym$catch);
});})(catchenv,vec__15727,seq__15728,first__15729,seq__15728__$1,___$1,body,form))
);
var default_QMARK_ = cljs.core.every_pred.cljs$core$IFn$_invoke$arity$2(catch_QMARK_,((function (catchenv,catch_QMARK_,vec__15727,seq__15728,first__15729,seq__15728__$1,___$1,body,form){
return (function (p1__15724_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.second(p1__15724_SHARP_),cljs.core.cst$kw$default);
});})(catchenv,catch_QMARK_,vec__15727,seq__15728,first__15729,seq__15728__$1,___$1,body,form))
);
var finally_QMARK_ = cljs.core.every_pred.cljs$core$IFn$_invoke$arity$2(cljs.core.seq_QMARK_,((function (catchenv,catch_QMARK_,default_QMARK_,vec__15727,seq__15728,first__15729,seq__15728__$1,___$1,body,form){
return (function (p1__15725_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(p1__15725_SHARP_),cljs.core.cst$sym$finally);
});})(catchenv,catch_QMARK_,default_QMARK_,vec__15727,seq__15728,first__15729,seq__15728__$1,___$1,body,form))
);
var map__15730 = (function (){var parser = new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$state,cljs.core.cst$kw$start,cljs.core.cst$kw$forms,body,cljs.core.cst$kw$body,cljs.core.PersistentVector.EMPTY,cljs.core.cst$kw$cblocks,cljs.core.PersistentVector.EMPTY,cljs.core.cst$kw$dblock,null,cljs.core.cst$kw$fblock,null], null);
while(true){
if(cljs.core.seq_QMARK_(cljs.core.cst$kw$forms.cljs$core$IFn$_invoke$arity$1(parser))){
var vec__15735 = cljs.core.cst$kw$forms.cljs$core$IFn$_invoke$arity$1(parser);
var seq__15736 = cljs.core.seq(vec__15735);
var first__15737 = cljs.core.first(seq__15736);
var seq__15736__$1 = cljs.core.next(seq__15736);
var form__$1 = first__15737;
var forms_STAR_ = seq__15736__$1;
var parser_STAR_ = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(parser,cljs.core.cst$kw$forms,forms_STAR_);
var G__15738 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(parser);
var G__15738__$1 = (((G__15738 instanceof cljs.core.Keyword))?G__15738.fqn:null);
switch (G__15738__$1) {
case "start":
if(cljs.core.truth_((catch_QMARK_.cljs$core$IFn$_invoke$arity$1 ? catch_QMARK_.cljs$core$IFn$_invoke$arity$1(form__$1) : catch_QMARK_(form__$1)))){
var G__15760 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(parser,cljs.core.cst$kw$state,cljs.core.cst$kw$catches);
parser = G__15760;
continue;
} else {
if(cljs.core.truth_((finally_QMARK_.cljs$core$IFn$_invoke$arity$1 ? finally_QMARK_.cljs$core$IFn$_invoke$arity$1(form__$1) : finally_QMARK_(form__$1)))){
var G__15761 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(parser,cljs.core.cst$kw$state,cljs.core.cst$kw$finally);
parser = G__15761;
continue;
} else {
var G__15762 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(parser_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$body], null),cljs.core.conj,form__$1);
parser = G__15762;
continue;

}
}

break;
case "catches":
if(cljs.core.truth_((default_QMARK_.cljs$core$IFn$_invoke$arity$1 ? default_QMARK_.cljs$core$IFn$_invoke$arity$1(form__$1) : default_QMARK_(form__$1)))){
var G__15763 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(parser_STAR_,cljs.core.cst$kw$dblock,form__$1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$state,cljs.core.cst$kw$finally], 0));
parser = G__15763;
continue;
} else {
if(cljs.core.truth_((catch_QMARK_.cljs$core$IFn$_invoke$arity$1 ? catch_QMARK_.cljs$core$IFn$_invoke$arity$1(form__$1) : catch_QMARK_(form__$1)))){
var G__15764 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(parser_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cblocks], null),cljs.core.conj,form__$1);
parser = G__15764;
continue;
} else {
if(cljs.core.truth_((finally_QMARK_.cljs$core$IFn$_invoke$arity$1 ? finally_QMARK_.cljs$core$IFn$_invoke$arity$1(form__$1) : finally_QMARK_(form__$1)))){
var G__15765 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(parser,cljs.core.cst$kw$state,cljs.core.cst$kw$finally);
parser = G__15765;
continue;
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Invalid try form");

}
}
}

break;
case "finally":
var G__15766 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(parser_STAR_,cljs.core.cst$kw$fblock,form__$1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$state,cljs.core.cst$kw$done], 0));
parser = G__15766;
continue;

break;
case "done":
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Unexpected form after finally");

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__15738__$1)].join('')));

}
} else {
return parser;
}
break;
}
})();
var map__15730__$1 = (((((!((map__15730 == null))))?(((((map__15730.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15730.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15730):map__15730);
var body__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15730__$1,cljs.core.cst$kw$body);
var cblocks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15730__$1,cljs.core.cst$kw$cblocks);
var dblock = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15730__$1,cljs.core.cst$kw$dblock);
var fblock = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15730__$1,cljs.core.cst$kw$fblock);
var finally$ = ((cljs.core.seq(fblock))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var _STAR_recur_frames_STAR__orig_val__15740 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__15741 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15741;

try{var G__15742 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$statement);
var G__15743 = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,cljs.core.cst$sym$do,null,(1),null)),cljs.core.rest(fblock))));
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15742,G__15743) : cljs.analyzer.analyze(G__15742,G__15743));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15740;
}})(),cljs.core.cst$kw$body_QMARK_,true):null);
var e = (cljs.core.truth_((function (){var or__4131__auto__ = cljs.core.seq(cblocks);
if(or__4131__auto__){
return or__4131__auto__;
} else {
return dblock;
}
})())?cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("e"):null);
var default$ = (function (){var temp__5733__auto__ = dblock;
if(cljs.core.truth_(temp__5733__auto__)){
var vec__15744 = temp__5733__auto__;
var seq__15745 = cljs.core.seq(vec__15744);
var first__15746 = cljs.core.first(seq__15745);
var seq__15745__$1 = cljs.core.next(seq__15745);
var ___$2 = first__15746;
var first__15746__$1 = cljs.core.first(seq__15745__$1);
var seq__15745__$2 = cljs.core.next(seq__15745__$1);
var ___$3 = first__15746__$1;
var first__15746__$2 = cljs.core.first(seq__15745__$2);
var seq__15745__$3 = cljs.core.next(seq__15745__$2);
var name__$1 = first__15746__$2;
var cb = seq__15745__$3;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,cljs.core.cst$sym$cljs$core_SLASH_let,null,(1),null)),(new cljs.core.List(null,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,name__$1,null,(1),null)),(new cljs.core.List(null,e,null,(1),null)))))),null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cb], 0))));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,cljs.core.cst$sym$throw,null,(1),null)),(new cljs.core.List(null,e,null,(1),null)))));
}
})();
var cblock = ((cljs.core.seq(cblocks))?cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,cljs.core.cst$sym$cljs$core_SLASH_cond,null,(1),null)),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (catchenv,catch_QMARK_,default_QMARK_,finally_QMARK_,map__15730,map__15730__$1,body__$1,cblocks,dblock,fblock,finally$,e,default$,vec__15727,seq__15728,first__15729,seq__15728__$1,___$1,body,form){
return (function (p__15747){
var vec__15748 = p__15747;
var seq__15749 = cljs.core.seq(vec__15748);
var first__15750 = cljs.core.first(seq__15749);
var seq__15749__$1 = cljs.core.next(seq__15749);
var ___$2 = first__15750;
var first__15750__$1 = cljs.core.first(seq__15749__$1);
var seq__15749__$2 = cljs.core.next(seq__15749__$1);
var type = first__15750__$1;
var first__15750__$2 = cljs.core.first(seq__15749__$2);
var seq__15749__$3 = cljs.core.next(seq__15749__$2);
var name__$1 = first__15750__$2;
var cb = seq__15749__$3;
if(cljs.core.truth_(name__$1)){
if(cljs.core.not(cljs.core.namespace(name__$1))){
} else {
throw (new Error(["Assert failed: ","Can't qualify symbol in catch","\n","(not (namespace name))"].join('')));
}
} else {
}

return cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,cljs.core.cst$sym$cljs$core_SLASH_instance_QMARK_,null,(1),null)),(new cljs.core.List(null,type,null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,e,null,(1),null))], 0)))),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,cljs.core.cst$sym$cljs$core_SLASH_let,null,(1),null)),(new cljs.core.List(null,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,name__$1,null,(1),null)),(new cljs.core.List(null,e,null,(1),null)))))),null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cb], 0)))),null,(1),null))))));
});})(catchenv,catch_QMARK_,default_QMARK_,finally_QMARK_,map__15730,map__15730__$1,body__$1,cblocks,dblock,fblock,finally$,e,default$,vec__15727,seq__15728,first__15729,seq__15728__$1,___$1,body,form))
,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cblocks], 0)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,cljs.core.cst$kw$else,null,(1),null)),(new cljs.core.List(null,default$,null,(1),null))], 0)))):default$);
var locals = cljs.core.cst$kw$locals.cljs$core$IFn$_invoke$arity$1(catchenv);
var locals__$1 = (cljs.core.truth_(e)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(locals,e,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$name,e,cljs.core.cst$kw$line,cljs.analyzer.get_line(e,env),cljs.core.cst$kw$column,cljs.analyzer.get_col(e,env)], null)):locals);
var catch$ = (cljs.core.truth_(cblock)?(function (){var _STAR_recur_frames_STAR__orig_val__15751 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__15752 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15752;

try{var G__15753 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(catchenv,cljs.core.cst$kw$locals,locals__$1);
var G__15754 = cblock;
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15753,G__15754) : cljs.analyzer.analyze(G__15753,G__15754));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15751;
}})():null);
var try$ = (function (){var _STAR_recur_frames_STAR__orig_val__15755 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__15756 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15756;

try{var G__15757 = (cljs.core.truth_((function (){var or__4131__auto__ = e;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return finally$;
}
})())?catchenv:env);
var G__15758 = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,cljs.core.cst$sym$do,null,(1),null)),body__$1)));
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15757,G__15758) : cljs.analyzer.analyze(G__15757,G__15758));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15755;
}})();
return new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$env,env,cljs.core.cst$kw$op,cljs.core.cst$kw$try,cljs.core.cst$kw$form,form,cljs.core.cst$kw$body,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(try$,cljs.core.cst$kw$body_QMARK_,true),cljs.core.cst$kw$finally,finally$,cljs.core.cst$kw$name,e,cljs.core.cst$kw$catch,catch$,cljs.core.cst$kw$children,cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$body], null),(cljs.core.truth_(catch$)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$catch], null):null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(cljs.core.truth_(finally$)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$finally], null):null)], 0)))], null);
}));
cljs.analyzer.valid_proto = (function cljs$analyzer$valid_proto(x){
if((x instanceof cljs.core.Symbol)){
return x;
} else {
return null;
}
});
cljs.analyzer.elide_env = (function cljs$analyzer$elide_env(env,ast,opts){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(ast,cljs.core.cst$kw$env);
});
cljs.analyzer.replace_env_pass = (function cljs$analyzer$replace_env_pass(new_env){
return (function (env,ast,opts){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ast,cljs.core.cst$kw$env,new_env);
});
});
cljs.analyzer.ast_children = (function cljs$analyzer$ast_children(ast){
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (c){
var g = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ast,c);
if(cljs.core.vector_QMARK_(g)){
return g;
} else {
if(cljs.core.truth_(g)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [g], null);
} else {
return null;
}
}
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$children.cljs$core$IFn$_invoke$arity$1(ast)], 0));
});
cljs.analyzer.constant_value_QMARK_ = (function cljs$analyzer$constant_value_QMARK_(p__15767){
var map__15768 = p__15767;
var map__15768__$1 = (((((!((map__15768 == null))))?(((((map__15768.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15768.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15768):map__15768);
var ast = map__15768__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15768__$1,cljs.core.cst$kw$op);
var or__4131__auto__ = (function (){var fexpr__15771 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$const,null,cljs.core.cst$kw$quote,null], null), null);
return (fexpr__15771.cljs$core$IFn$_invoke$arity$1 ? fexpr__15771.cljs$core$IFn$_invoke$arity$1(op) : fexpr__15771(op));
})();
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var and__4120__auto__ = (function (){var fexpr__15773 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$vector,null,cljs.core.cst$kw$set,null,cljs.core.cst$kw$map,null], null), null);
return (fexpr__15773.cljs$core$IFn$_invoke$arity$1 ? fexpr__15773.cljs$core$IFn$_invoke$arity$1(op) : fexpr__15773(op));
})();
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.every_QMARK_(cljs.analyzer.constant_value_QMARK_,cljs.analyzer.ast_children(ast));
} else {
return and__4120__auto__;
}
}
});
cljs.analyzer.const_expr__GT_constant_value = (function cljs$analyzer$const_expr__GT_constant_value(p__15774){
var map__15775 = p__15774;
var map__15775__$1 = (((((!((map__15775 == null))))?(((((map__15775.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15775.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15775):map__15775);
var e = map__15775__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15775__$1,cljs.core.cst$kw$op);
var G__15777 = op;
var G__15777__$1 = (((G__15777 instanceof cljs.core.Keyword))?G__15777.fqn:null);
switch (G__15777__$1) {
case "quote":
var G__15778 = cljs.core.cst$kw$expr.cljs$core$IFn$_invoke$arity$1(e);
return (cljs.analyzer.const_expr__GT_constant_value.cljs$core$IFn$_invoke$arity$1 ? cljs.analyzer.const_expr__GT_constant_value.cljs$core$IFn$_invoke$arity$1(G__15778) : cljs.analyzer.const_expr__GT_constant_value(G__15778));

break;
case "const":
return cljs.core.cst$kw$val.cljs$core$IFn$_invoke$arity$1(e);

break;
case "map":
return cljs.core.zipmap(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.const_expr__GT_constant_value,cljs.core.cst$kw$keys.cljs$core$IFn$_invoke$arity$1(e)),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.const_expr__GT_constant_value,cljs.core.cst$kw$vals.cljs$core$IFn$_invoke$arity$1(e)));

break;
case "set":
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.const_expr__GT_constant_value,cljs.core.cst$kw$items.cljs$core$IFn$_invoke$arity$1(e)));

break;
case "vector":
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.const_expr__GT_constant_value,cljs.core.cst$kw$items.cljs$core$IFn$_invoke$arity$1(e)));

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__15777__$1)].join('')));

}
});
cljs.analyzer.earmuffed_QMARK_ = (function cljs$analyzer$earmuffed_QMARK_(sym){
var s = cljs.core.name(sym);
return (((cljs.core.count(s) > (2))) && (clojure.string.starts_with_QMARK_(s,"*")) && (clojure.string.ends_with_QMARK_(s,"*")));
});
cljs.analyzer.core_ns_QMARK_ = (function cljs$analyzer$core_ns_QMARK_(ns_sym){
var s = cljs.core.name(ns_sym);
return ((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$cljs$user,ns_sym)) && (((clojure.string.starts_with_QMARK_(s,"cljs.")) || (clojure.string.starts_with_QMARK_(s,"clojure.")))));
});
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$def,(function (op,env,form,_,___$1){
if((cljs.core.count(form) > (4))){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Too many arguments to def");
} else {
}

var pfn = (function() {
var G__15797 = null;
var G__15797__2 = (function (___$2,sym){
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$sym,sym], null);
});
var G__15797__3 = (function (___$2,sym,init){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$sym,sym,cljs.core.cst$kw$init,init], null);
});
var G__15797__4 = (function (___$2,sym,doc,init){
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$sym,sym,cljs.core.cst$kw$doc,doc,cljs.core.cst$kw$init,init], null);
});
G__15797 = function(___$2,sym,doc,init){
switch(arguments.length){
case 2:
return G__15797__2.call(this,___$2,sym);
case 3:
return G__15797__3.call(this,___$2,sym,doc);
case 4:
return G__15797__4.call(this,___$2,sym,doc,init);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__15797.cljs$core$IFn$_invoke$arity$2 = G__15797__2;
G__15797.cljs$core$IFn$_invoke$arity$3 = G__15797__3;
G__15797.cljs$core$IFn$_invoke$arity$4 = G__15797__4;
return G__15797;
})()
;
var args = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(pfn,form);
var sym = cljs.core.cst$kw$sym.cljs$core$IFn$_invoke$arity$1(args);
var const_QMARK_ = cljs.core.cst$kw$const.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(sym));
var sym_meta = cljs.core.meta(sym);
var tag = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(sym));
var protocol = cljs.analyzer.valid_proto(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(sym)));
var dynamic = cljs.core.cst$kw$dynamic.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(sym));
var ns_name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env));
var locals = cljs.core.cst$kw$locals.cljs$core$IFn$_invoke$arity$1(env);
var clash_ns = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns_name),".",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym)].join(''));
var sym_ns = cljs.core.namespace(sym);
var sym__$1 = (cljs.core.truth_((function (){var and__4120__auto__ = sym_ns;
if(cljs.core.truth_(and__4120__auto__)){
return (!(cljs.core.symbol_identical_QMARK_(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(sym_ns),ns_name)));
} else {
return and__4120__auto__;
}
})())?(function(){throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,["Can't def ns-qualified name in namespace ",sym_ns].join(''))})():(((!((sym_ns == null))))?cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(sym)):sym
));
if((!((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,clash_ns], null)) == null)))){
cljs.analyzer.warning(cljs.core.cst$kw$ns_DASH_var_DASH_clash,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ns,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns_name),".",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym__$1)].join('')),cljs.core.cst$kw$var,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns_name),cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym__$1))], null));
} else {
}

if((!((cljs.core.cst$kw$const.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$locals),sym__$1)) == null)))){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Can't redefine a constant");
} else {
}

var temp__5739__auto___15798 = cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(args);
if((temp__5739__auto___15798 == null)){
} else {
var doc_15799 = temp__5739__auto___15798;
if(typeof doc_15799 === 'string'){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Too many arguments to def");
}
}

if(((cljs.core.not(dynamic)) && (cljs.analyzer.earmuffed_QMARK_(sym__$1)) && ((!(cljs.analyzer.core_ns_QMARK_(ns_name)))))){
cljs.analyzer.warning(cljs.core.cst$kw$non_DASH_dynamic_DASH_earmuffed_DASH_var,env,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$var,cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym__$1)], null));
} else {
}

var temp__5739__auto___15800 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns_name,cljs.core.cst$kw$defs,sym__$1], null));
if((temp__5739__auto___15800 == null)){
} else {
var v_15801 = temp__5739__auto___15800;
if(cljs.core.truth_((function (){var and__4120__auto__ = (!(cljs.analyzer._STAR_allow_redef_STAR_));
if(and__4120__auto__){
var and__4120__auto____$1 = cljs.core.not(cljs.core.cst$kw$declared.cljs$core$IFn$_invoke$arity$1(v_15801));
if(and__4120__auto____$1){
var and__4120__auto____$2 = cljs.core.not(cljs.core.cst$kw$declared.cljs$core$IFn$_invoke$arity$1(sym_meta));
if(and__4120__auto____$2){
var and__4120__auto____$3 = cljs.analyzer._STAR_file_defs_STAR_;
if(cljs.core.truth_(and__4120__auto____$3)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.analyzer._STAR_file_defs_STAR_),sym__$1);
} else {
return and__4120__auto____$3;
}
} else {
return and__4120__auto____$2;
}
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})())){
cljs.analyzer.warning(cljs.core.cst$kw$redef_DASH_in_DASH_file,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$sym,sym__$1,cljs.core.cst$kw$line,cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(v_15801)], null));
} else {
}

if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core.cst$kw$declared.cljs$core$IFn$_invoke$arity$1(v_15801);
if(cljs.core.truth_(and__4120__auto__)){
var and__4120__auto____$1 = cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(v_15801);
if(cljs.core.truth_(and__4120__auto____$1)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(v_15801),cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(sym_meta));
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})())){
cljs.analyzer.warning(cljs.core.cst$kw$declared_DASH_arglists_DASH_mismatch,env,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$ns_DASH_name,ns_name,cljs.core.cst$kw$sym,sym__$1,cljs.core.cst$kw$declared,cljs.core.second(cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(v_15801)),cljs.core.cst$kw$defined,cljs.core.second(cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(sym_meta))], null));
} else {
}
}

var env__$1 = ((((((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(ns_name,cljs.core.cst$sym$cljs$core)) && (cljs.analyzer.core_name_QMARK_(env,sym__$1)))) || ((!((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns_name,cljs.core.cst$kw$uses,sym__$1], null)) == null))))))?(function (){var ev = cljs.analyzer.resolve_existing_var(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$locals),cljs.core.with_meta(sym__$1,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cljs$analyzer_SLASH_no_DASH_resolve,true], null)));
var conj_to_set = cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY);
if(cljs.analyzer.public_name_QMARK_(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(ev),sym__$1)){
cljs.analyzer.warning(cljs.core.cst$kw$redef,env,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$sym,sym__$1,cljs.core.cst$kw$ns,cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(ev),cljs.core.cst$kw$ns_DASH_name,ns_name], null));
} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.env._STAR_compiler_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns_name,cljs.core.cst$kw$excludes], null),conj_to_set,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([sym__$1], 0));

return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ns,cljs.core.cst$kw$excludes], null),conj_to_set,sym__$1);
})():env);
var var_name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env__$1,cljs.core.cst$kw$locals),sym__$1));
var init_expr = ((cljs.core.contains_QMARK_(args,cljs.core.cst$kw$init))?(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.env._STAR_compiler_STAR_,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns_name,cljs.core.cst$kw$defs,sym__$1], null),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,var_name], null),sym_meta,((dynamic === true)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$dynamic,true], null):null),cljs.analyzer.source_info.cljs$core$IFn$_invoke$arity$2(var_name,env__$1)], 0)));

var _STAR_recur_frames_STAR__orig_val__15781 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__15782 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15782;

try{var _STAR_allow_ns_STAR__orig_val__15783 = cljs.analyzer._STAR_allow_ns_STAR_;
var _STAR_allow_ns_STAR__temp_val__15784 = false;
cljs.analyzer._STAR_allow_ns_STAR_ = _STAR_allow_ns_STAR__temp_val__15784;

try{var G__15785 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env__$1,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var G__15786 = cljs.core.cst$kw$init.cljs$core$IFn$_invoke$arity$1(args);
var G__15787 = sym__$1;
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$3 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$3(G__15785,G__15786,G__15787) : cljs.analyzer.analyze(G__15785,G__15786,G__15787));
}finally {cljs.analyzer._STAR_allow_ns_STAR_ = _STAR_allow_ns_STAR__orig_val__15783;
}}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15781;
}})()
:null);
var fn_var_QMARK_ = (((!((init_expr == null)))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(init_expr),cljs.core.cst$kw$fn)));
var tag__$1 = ((fn_var_QMARK_)?(function (){var or__4131__auto__ = cljs.core.cst$kw$ret_DASH_tag.cljs$core$IFn$_invoke$arity$1(init_expr);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = tag;
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
return cljs.core.cst$kw$inferred_DASH_ret_DASH_tag.cljs$core$IFn$_invoke$arity$1(init_expr);
}
}
})():(function (){var or__4131__auto__ = tag;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(init_expr);
}
})());
var export_as = (function (){var temp__5735__auto__ = cljs.core.cst$kw$export.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(sym__$1));
if(cljs.core.truth_(temp__5735__auto__)){
var export_val = temp__5735__auto__;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(true,export_val)){
return var_name;
} else {
return export_val;
}
} else {
return null;
}
})();
var doc = (function (){var or__4131__auto__ = cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(args);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(sym__$1));
}
})();
var temp__5739__auto___15802 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns_name,cljs.core.cst$kw$defs,sym__$1], null));
if((temp__5739__auto___15802 == null)){
} else {
var v_15803 = temp__5739__auto___15802;
if(((cljs.core.not(cljs.core.cst$kw$declared.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(sym__$1)))) && (((cljs.core.cst$kw$fn_DASH_var.cljs$core$IFn$_invoke$arity$1(v_15803) === true) && ((!(fn_var_QMARK_))))))){
cljs.analyzer.warning(cljs.core.cst$kw$fn_DASH_var,env__$1,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ns_DASH_name,ns_name,cljs.core.cst$kw$sym,sym__$1], null));
} else {
}
}

if((((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns_name,cljs.core.cst$kw$defs,sym__$1], null)) == null)) || (cljs.core.not(cljs.core.cst$kw$declared.cljs$core$IFn$_invoke$arity$1(sym_meta))))){
if(cljs.core.truth_(cljs.analyzer._STAR_file_defs_STAR_)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cljs.analyzer._STAR_file_defs_STAR_,cljs.core.conj,sym__$1);
} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.env._STAR_compiler_STAR_,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns_name,cljs.core.cst$kw$defs,sym__$1], null),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,var_name], null),(function (){var G__15788 = sym_meta;
if(cljs.core.truth_(cljs.core.cst$kw$test.cljs$core$IFn$_invoke$arity$1(sym_meta))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__15788,cljs.core.cst$kw$test,true);
} else {
return G__15788;
}
})(),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$meta,cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(sym_meta,cljs.core.cst$kw$test),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$file], null),((function (env__$1,var_name,init_expr,fn_var_QMARK_,tag__$1,export_as,doc,pfn,args,sym,const_QMARK_,sym_meta,tag,protocol,dynamic,ns_name,locals,clash_ns,sym_ns,sym__$1){
return (function (f){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env__$1)),cljs.core.cst$sym$cljs$core)){
return "cljs/core.cljs";
} else {
return f;
}
});})(env__$1,var_name,init_expr,fn_var_QMARK_,tag__$1,export_as,doc,pfn,args,sym,const_QMARK_,sym_meta,tag,protocol,dynamic,ns_name,locals,clash_ns,sym_ns,sym__$1))
)], null),(cljs.core.truth_(doc)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$doc,doc], null):null),(cljs.core.truth_(const_QMARK_)?(function (){var const_expr = (function (){var _STAR_passes_STAR__orig_val__15789 = cljs.analyzer._STAR_passes_STAR_;
var _STAR_passes_STAR__temp_val__15790 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.analyzer._STAR_passes_STAR_,cljs.analyzer.replace_env_pass(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$context,cljs.core.cst$kw$expr], null)));
cljs.analyzer._STAR_passes_STAR_ = _STAR_passes_STAR__temp_val__15790;

try{var G__15791 = env__$1;
var G__15792 = cljs.core.cst$kw$init.cljs$core$IFn$_invoke$arity$1(args);
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15791,G__15792) : cljs.analyzer.analyze(G__15791,G__15792));
}finally {cljs.analyzer._STAR_passes_STAR_ = _STAR_passes_STAR__orig_val__15789;
}})();
if(cljs.core.truth_(cljs.analyzer.constant_value_QMARK_(const_expr))){
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$const_DASH_expr,const_expr], null);
} else {
return null;
}
})():null),((dynamic === true)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$dynamic,true], null):null),cljs.analyzer.source_info.cljs$core$IFn$_invoke$arity$2(var_name,env__$1),(cljs.core.truth_(protocol)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$protocol,protocol], null):null),(function (){var temp__5735__auto__ = cljs.core.cst$kw$protocol_DASH_symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(sym__$1));
if(cljs.core.truth_(temp__5735__auto__)){
var protocol_symbol = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$protocol_DASH_symbol,protocol_symbol,cljs.core.cst$kw$info,cljs.core.cst$kw$protocol_DASH_info.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(protocol_symbol)),cljs.core.cst$kw$impls,cljs.core.PersistentHashSet.EMPTY], null);
} else {
return null;
}
})(),((fn_var_QMARK_)?(function (){var params = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (env__$1,var_name,init_expr,fn_var_QMARK_,tag__$1,export_as,doc,pfn,args,sym,const_QMARK_,sym_meta,tag,protocol,dynamic,ns_name,locals,clash_ns,sym_ns,sym__$1){
return (function (p1__15780_SHARP_){
return cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$name,cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(p1__15780_SHARP_)));
});})(env__$1,var_name,init_expr,fn_var_QMARK_,tag__$1,export_as,doc,pfn,args,sym,const_QMARK_,sym_meta,tag,protocol,dynamic,ns_name,locals,clash_ns,sym_ns,sym__$1))
,cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(init_expr));
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$fn_DASH_var,cljs.core.not(cljs.core.cst$kw$macro.cljs$core$IFn$_invoke$arity$1(sym_meta)),cljs.core.cst$kw$protocol_DASH_impl,cljs.core.cst$kw$protocol_DASH_impl.cljs$core$IFn$_invoke$arity$1(init_expr),cljs.core.cst$kw$protocol_DASH_inline,cljs.core.cst$kw$protocol_DASH_inline.cljs$core$IFn$_invoke$arity$1(init_expr)], null),(function (){var temp__5737__auto__ = cljs.core.cst$kw$top_DASH_fn.cljs$core$IFn$_invoke$arity$1(sym_meta);
if((temp__5737__auto__ == null)){
return new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$variadic_QMARK_,cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(init_expr),cljs.core.cst$kw$max_DASH_fixed_DASH_arity,cljs.core.cst$kw$max_DASH_fixed_DASH_arity.cljs$core$IFn$_invoke$arity$1(init_expr),cljs.core.cst$kw$method_DASH_params,params,cljs.core.cst$kw$arglists,cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(sym_meta),cljs.core.cst$kw$arglists_DASH_meta,cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.meta,cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(sym_meta)))], null);
} else {
var top_fn_meta = temp__5737__auto__;
return top_fn_meta;
}
})()], 0));
})():null),(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core.cst$kw$declared.cljs$core$IFn$_invoke$arity$1(sym_meta);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(sym_meta);
} else {
return and__4120__auto__;
}
})())?new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$declared,true,cljs.core.cst$kw$fn_DASH_var,true,cljs.core.cst$kw$method_DASH_params,cljs.core.second(cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(sym_meta))], null):null),((((fn_var_QMARK_) && ((!((tag__$1 == null))))))?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$ret_DASH_tag,tag__$1], null):(cljs.core.truth_(tag__$1)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,tag__$1], null):null))], 0)));
} else {
}

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$env,env__$1,cljs.core.cst$kw$op,cljs.core.cst$kw$def,cljs.core.cst$kw$form,form,cljs.core.cst$kw$ns,ns_name,cljs.core.cst$kw$name,var_name,cljs.core.cst$kw$var,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__15793 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env__$1,cljs.core.cst$kw$locals),cljs.core.cst$kw$context,cljs.core.cst$kw$expr),cljs.core.cst$kw$def_DASH_var,true);
var G__15794 = sym__$1;
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15793,G__15794) : cljs.analyzer.analyze(G__15793,G__15794));
})(),cljs.core.cst$kw$op,cljs.core.cst$kw$var),cljs.core.cst$kw$doc,doc,cljs.core.cst$kw$jsdoc,cljs.core.cst$kw$jsdoc.cljs$core$IFn$_invoke$arity$1(sym_meta)], null),((cljs.core.cst$kw$def_DASH_emits_DASH_var.cljs$core$IFn$_invoke$arity$1(env__$1) === true)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$var_DASH_ast,cljs.analyzer.var_ast(env__$1,sym__$1)], null):null),(function (){var temp__5739__auto__ = cljs.core.cst$kw$test.cljs$core$IFn$_invoke$arity$1(sym_meta);
if((temp__5739__auto__ == null)){
return null;
} else {
var test = temp__5739__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$test,(function (){var G__15795 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env__$1,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var G__15796 = test;
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15795,G__15796) : cljs.analyzer.analyze(G__15795,G__15796));
})()], null);
}
})(),(((!((tag__$1 == null))))?((fn_var_QMARK_)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$ret_DASH_tag,tag__$1], null):new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,tag__$1], null)):null),((dynamic === true)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$dynamic,true], null):null),(((!((export_as == null))))?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$export,export_as], null):null),(((!((init_expr == null))))?new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$init,init_expr,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,cljs.core.cst$kw$init], null)], null):new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var], null)], null))], 0));
}));
cljs.analyzer.analyze_fn_method_param = (function cljs$analyzer$analyze_fn_method_param(env){
return (function (p__15804,p__15805){
var vec__15806 = p__15804;
var locals = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15806,(0),null);
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15806,(1),null);
var vec__15809 = p__15805;
var arg_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15809,(0),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15809,(1),null);
if(cljs.core.truth_(cljs.core.namespace(name))){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,["Can't use qualified name as parameter: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''));
} else {
}

var line = cljs.analyzer.get_line(name,env);
var column = cljs.analyzer.get_col(name,env);
var nmeta = cljs.core.meta(name);
var tag = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(nmeta);
var shadow = (((!((locals == null))))?cljs.analyzer.handle_symbol_local(name,(locals.cljs$core$IFn$_invoke$arity$1 ? locals.cljs$core$IFn$_invoke$arity$1(name) : locals(name))):null);
var env__$1 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.select_keys(env,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$context], null)),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$line,line,cljs.core.cst$kw$column,column], null)], 0));
var param = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$name,cljs.core.cst$kw$binding_DASH_form_QMARK_,cljs.core.cst$kw$op,cljs.core.cst$kw$env,cljs.core.cst$kw$column,cljs.core.cst$kw$line,cljs.core.cst$kw$arg_DASH_id,cljs.core.cst$kw$info,cljs.core.cst$kw$tag,cljs.core.cst$kw$shadow,cljs.core.cst$kw$local],[name,true,cljs.core.cst$kw$binding,env__$1,column,line,arg_id,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$name,name,cljs.core.cst$kw$shadow,shadow], null),tag,shadow,cljs.core.cst$kw$arg]);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(locals,name,param),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(params,param)], null);
});
});
cljs.analyzer.analyze_fn_method_body = (function cljs$analyzer$analyze_fn_method_body(env,form,recur_frames){
var _STAR_recur_frames_STAR__orig_val__15812 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__15813 = recur_frames;
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15813;

try{return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(env,form) : cljs.analyzer.analyze(env,form));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15812;
}});
cljs.analyzer.analyze_fn_method = (function cljs$analyzer$analyze_fn_method(env,locals,form,type,analyze_body_QMARK_){
var param_names = cljs.core.first(form);
var variadic = cljs.core.boolean$(cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$_AMPERSAND_,"null"], null), null),param_names));
var param_names__$1 = cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$_AMPERSAND_,"null"], null), null),param_names));
var body = cljs.core.next(form);
var step = cljs.analyzer.analyze_fn_method_param(env);
var step_init = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [locals,cljs.core.PersistentVector.EMPTY], null);
var vec__15814 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(step,step_init,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,param_names__$1));
var locals__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15814,(0),null);
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15814,(1),null);
var params_SINGLEQUOTE_ = ((variadic === true)?cljs.core.butlast(params):params);
var fixed_arity = cljs.core.count(params_SINGLEQUOTE_);
var recur_frame = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$protocol_DASH_impl,cljs.core.cst$kw$protocol_DASH_impl.cljs$core$IFn$_invoke$arity$1(env),cljs.core.cst$kw$params,params,cljs.core.cst$kw$flag,cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null),cljs.core.cst$kw$tags,cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY)], null);
var recur_frames = cljs.core.cons(recur_frame,cljs.analyzer._STAR_recur_frames_STAR_);
var body_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(env,cljs.core.cst$kw$context,cljs.core.cst$kw$return,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$locals,locals__$1], 0));
var body_form = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,cljs.core.cst$sym$do,null,(1),null)),body)));
var expr = (cljs.core.truth_(analyze_body_QMARK_)?cljs.analyzer.analyze_fn_method_body(body_env,body_form,recur_frames):null);
var recurs = cljs.core.deref(cljs.core.cst$kw$flag.cljs$core$IFn$_invoke$arity$1(recur_frame));
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$env,env,cljs.core.cst$kw$op,cljs.core.cst$kw$fn_DASH_method,cljs.core.cst$kw$variadic_QMARK_,variadic,cljs.core.cst$kw$params,params,cljs.core.cst$kw$fixed_DASH_arity,fixed_arity,cljs.core.cst$kw$type,type,cljs.core.cst$kw$form,form,cljs.core.cst$kw$recurs,recurs], null),(((!((expr == null))))?new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$body,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(expr,cljs.core.cst$kw$body_QMARK_,true),cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$params,cljs.core.cst$kw$body], null)], null):new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$params], null)], null))], 0));
});
cljs.analyzer.fn_name_var = (function cljs$analyzer$fn_name_var(env,locals,name){
if((!((name == null)))){
var ns = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env));
var shadow = cljs.analyzer.handle_symbol_local(name,cljs.core.get.cljs$core$IFn$_invoke$arity$2(locals,name));
var shadow__$1 = (((shadow == null))?cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$js_DASH_globals,name], null)):null);
var fn_scope = cljs.core.cst$kw$fn_DASH_scope.cljs$core$IFn$_invoke$arity$1(env);
var name_var = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$name,name,cljs.core.cst$kw$op,cljs.core.cst$kw$binding,cljs.core.cst$kw$local,cljs.core.cst$kw$fn,cljs.core.cst$kw$info,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$fn_DASH_self_DASH_name,true,cljs.core.cst$kw$fn_DASH_scope,fn_scope,cljs.core.cst$kw$ns,ns,cljs.core.cst$kw$shadow,shadow__$1], null)], null);
var tag = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(name));
var ret_tag = (((!((tag == null))))?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$ret_DASH_tag,tag], null):null);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([name_var,ret_tag], 0));
} else {
return null;
}
});
cljs.analyzer.analyze_fn_methods_pass2_STAR_ = (function cljs$analyzer$analyze_fn_methods_pass2_STAR_(menv,locals,type,meths){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__15817_SHARP_){
return cljs.analyzer.analyze_fn_method(menv,locals,p1__15817_SHARP_,type,true);
}),meths);
});
cljs.analyzer.analyze_fn_methods_pass2 = (function cljs$analyzer$analyze_fn_methods_pass2(menv,locals,type,meths){
return cljs.analyzer.analyze_fn_methods_pass2_STAR_(menv,locals,type,meths);
});
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$fn_STAR_,(function (op,env,p__15819,name,_){
var vec__15820 = p__15819;
var seq__15821 = cljs.core.seq(vec__15820);
var first__15822 = cljs.core.first(seq__15821);
var seq__15821__$1 = cljs.core.next(seq__15821);
var ___$1 = first__15822;
var args = seq__15821__$1;
var form = vec__15820;
var named_fn_QMARK_ = (cljs.core.first(args) instanceof cljs.core.Symbol);
var vec__15823 = ((named_fn_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(args),cljs.core.next(args)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [name,cljs.core.seq(args)], null));
var name__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15823,(0),null);
var meths = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15823,(1),null);
var meths__$1 = ((cljs.core.vector_QMARK_(cljs.core.first(meths)))?(new cljs.core.List(null,meths,null,(1),null)):meths);
var locals = cljs.core.cst$kw$locals.cljs$core$IFn$_invoke$arity$1(env);
var name_var = cljs.analyzer.fn_name_var(env,locals,name__$1);
var env__$1 = (((!((name__$1 == null))))?cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(env,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fn_DASH_scope], null),cljs.core.conj,name_var):env);
var locals__$1 = (((((!((locals == null)))) && (named_fn_QMARK_)))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(locals,name__$1,name_var):locals);
var form_meta = cljs.core.meta(form);
var type = cljs.core.cst$kw$cljs$analyzer_SLASH_type.cljs$core$IFn$_invoke$arity$1(form_meta);
var proto_impl = cljs.core.cst$kw$cljs$analyzer_SLASH_protocol_DASH_impl.cljs$core$IFn$_invoke$arity$1(form_meta);
var proto_inline = cljs.core.cst$kw$cljs$analyzer_SLASH_protocol_DASH_inline.cljs$core$IFn$_invoke$arity$1(form_meta);
var menv = (((cljs.core.count(meths__$1) > (1)))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env__$1,cljs.core.cst$kw$context,cljs.core.cst$kw$expr):env__$1);
var menv__$1 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([menv,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$protocol_DASH_impl,proto_impl,cljs.core.cst$kw$protocol_DASH_inline,proto_inline], null)], 0));
var methods$ = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (named_fn_QMARK_,vec__15823,name__$1,meths,meths__$1,locals,name_var,env__$1,locals__$1,form_meta,type,proto_impl,proto_inline,menv,menv__$1,vec__15820,seq__15821,first__15822,seq__15821__$1,___$1,args,form){
return (function (p1__15818_SHARP_){
var _STAR_allow_ns_STAR__orig_val__15826 = cljs.analyzer._STAR_allow_ns_STAR_;
var _STAR_allow_ns_STAR__temp_val__15827 = false;
cljs.analyzer._STAR_allow_ns_STAR_ = _STAR_allow_ns_STAR__temp_val__15827;

try{return cljs.analyzer.analyze_fn_method(menv__$1,locals__$1,p1__15818_SHARP_,type,(name__$1 == null));
}finally {cljs.analyzer._STAR_allow_ns_STAR_ = _STAR_allow_ns_STAR__orig_val__15826;
}});})(named_fn_QMARK_,vec__15823,name__$1,meths,meths__$1,locals,name_var,env__$1,locals__$1,form_meta,type,proto_impl,proto_inline,menv,menv__$1,vec__15820,seq__15821,first__15822,seq__15821__$1,___$1,args,form))
,meths__$1);
var mfa = cljs.core.transduce.cljs$core$IFn$_invoke$arity$4(cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$fixed_DASH_arity),cljs.core.max,(0),methods$);
var variadic = cljs.core.boolean$(cljs.core.some(cljs.core.cst$kw$variadic_QMARK_,methods$));
var locals__$2 = ((named_fn_QMARK_)?cljs.core.update_in.cljs$core$IFn$_invoke$arity$variadic(locals__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null),cljs.core.assoc,cljs.core.cst$kw$fn_DASH_var,true,cljs.core.cst$kw$variadic_QMARK_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([variadic,cljs.core.cst$kw$max_DASH_fixed_DASH_arity,mfa,cljs.core.cst$kw$method_DASH_params,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$params,methods$)], 0)):locals__$1);
var methods$__$1 = (((!((name__$1 == null))))?(function (){var _STAR_allow_ns_STAR__orig_val__15828 = cljs.analyzer._STAR_allow_ns_STAR_;
var _STAR_allow_ns_STAR__temp_val__15829 = false;
cljs.analyzer._STAR_allow_ns_STAR_ = _STAR_allow_ns_STAR__temp_val__15829;

try{return cljs.analyzer.analyze_fn_methods_pass2(menv__$1,locals__$2,type,meths__$1);
}finally {cljs.analyzer._STAR_allow_ns_STAR_ = _STAR_allow_ns_STAR__orig_val__15828;
}})():cljs.core.vec(methods$));
var form__$1 = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$5(form,cljs.core.dissoc,cljs.core.cst$kw$cljs$analyzer_SLASH_protocol_DASH_impl,cljs.core.cst$kw$cljs$analyzer_SLASH_protocol_DASH_inline,cljs.core.cst$kw$cljs$analyzer_SLASH_type);
var js_doc = ((variadic === true)?"@param {...*} var_args":null);
var children = (((!((name_var == null))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$local,cljs.core.cst$kw$methods], null):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$methods], null));
var inferred_ret_tag = (function (){var inferred_tags = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.infer_tag,env__$1),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$body,methods$__$1));
if(cljs.core.truth_(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,inferred_tags))){
return cljs.core.first(inferred_tags);
} else {
return null;
}
})();
var ast = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$children,cljs.core.cst$kw$protocol_DASH_inline,cljs.core.cst$kw$name,cljs.core.cst$kw$loop_DASH_lets,cljs.core.cst$kw$inferred_DASH_ret_DASH_tag,cljs.core.cst$kw$protocol_DASH_impl,cljs.core.cst$kw$op,cljs.core.cst$kw$env,cljs.core.cst$kw$variadic_QMARK_,cljs.core.cst$kw$methods,cljs.core.cst$kw$recur_DASH_frames,cljs.core.cst$kw$max_DASH_fixed_DASH_arity,cljs.core.cst$kw$form,cljs.core.cst$kw$tag,cljs.core.cst$kw$jsdoc],[children,proto_inline,name_var,cljs.analyzer._STAR_loop_lets_STAR_,inferred_ret_tag,proto_impl,cljs.core.cst$kw$fn,env__$1,variadic,methods$__$1,cljs.analyzer._STAR_recur_frames_STAR_,mfa,form__$1,cljs.core.cst$sym$function,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [js_doc], null)]),(((!((name_var == null))))?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$local,name_var], null):null)], 0));
var variadic_methods_15830 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.filter.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$variadic_QMARK_),cljs.core.take.cljs$core$IFn$_invoke$arity$1((1))),methods$__$1);
var variadic_params_15831 = (((cljs.core.count(variadic_methods_15830) > (0)))?cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(variadic_methods_15830,(0)))):(0));
var param_counts_15832 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.count,cljs.core.cst$kw$params)),methods$__$1);
if(((1) < cljs.core.count(variadic_methods_15830))){
cljs.analyzer.warning(cljs.core.cst$kw$multiple_DASH_variadic_DASH_overloads,env__$1,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,name_var], null));
} else {
}

if((!((((variadic_params_15831 === (0))) || ((variadic_params_15831 === ((1) + mfa))))))){
cljs.analyzer.warning(cljs.core.cst$kw$variadic_DASH_max_DASH_arity,env__$1,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,name_var], null));
} else {
}

if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(param_counts_15832),param_counts_15832)){
cljs.analyzer.warning(cljs.core.cst$kw$overload_DASH_arity,env__$1,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,name_var], null));
} else {
}

return (cljs.analyzer.analyze_wrap_meta.cljs$core$IFn$_invoke$arity$1 ? cljs.analyzer.analyze_wrap_meta.cljs$core$IFn$_invoke$arity$1(ast) : cljs.analyzer.analyze_wrap_meta(ast));
}));
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$letfn_STAR_,(function (op,env,p__15833,name,_){
var vec__15834 = p__15833;
var seq__15835 = cljs.core.seq(vec__15834);
var first__15836 = cljs.core.first(seq__15835);
var seq__15835__$1 = cljs.core.next(seq__15835);
var ___$1 = first__15836;
var first__15836__$1 = cljs.core.first(seq__15835__$1);
var seq__15835__$2 = cljs.core.next(seq__15835__$1);
var bindings = first__15836__$1;
var exprs = seq__15835__$2;
var form = vec__15834;
if(((cljs.core.vector_QMARK_(bindings)) && (cljs.core.even_QMARK_(cljs.core.count(bindings))))){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"bindings must be vector of even number of elements");
}

var n__GT_fexpr = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.second),cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),bindings)));
var names = cljs.core.keys(n__GT_fexpr);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
var vec__15837 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (n__GT_fexpr,names,context,vec__15834,seq__15835,first__15836,seq__15835__$1,___$1,first__15836__$1,seq__15835__$2,bindings,exprs,form){
return (function (p__15843,n){
var vec__15844 = p__15843;
var map__15847 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15844,(0),null);
var map__15847__$1 = (((((!((map__15847 == null))))?(((((map__15847.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15847.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15847):map__15847);
var env__$1 = map__15847__$1;
var locals = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15847__$1,cljs.core.cst$kw$locals);
var bes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15844,(1),null);
var ret_tag = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(n));
var fexpr = (function (){var _STAR_cljs_warnings_STAR__orig_val__15849 = cljs.analyzer._STAR_cljs_warnings_STAR_;
var _STAR_cljs_warnings_STAR__temp_val__15850 = cljs.core.zipmap(cljs.core.keys(cljs.analyzer._STAR_cljs_warnings_STAR_),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(false));
cljs.analyzer._STAR_cljs_warnings_STAR_ = _STAR_cljs_warnings_STAR__temp_val__15850;

try{var G__15851 = env__$1;
var G__15852 = (n__GT_fexpr.cljs$core$IFn$_invoke$arity$1 ? n__GT_fexpr.cljs$core$IFn$_invoke$arity$1(n) : n__GT_fexpr(n));
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15851,G__15852) : cljs.analyzer.analyze(G__15851,G__15852));
}finally {cljs.analyzer._STAR_cljs_warnings_STAR_ = _STAR_cljs_warnings_STAR__orig_val__15849;
}})();
var be = (function (){var G__15853 = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$name,cljs.core.cst$kw$method_DASH_params,cljs.core.cst$kw$op,cljs.core.cst$kw$column,cljs.core.cst$kw$variadic_QMARK_,cljs.core.cst$kw$line,cljs.core.cst$kw$max_DASH_fixed_DASH_arity,cljs.core.cst$kw$fn_DASH_var,cljs.core.cst$kw$shadow,cljs.core.cst$kw$local],[n,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$params,cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(fexpr)),cljs.core.cst$kw$binding,cljs.analyzer.get_col(n,env__$1),cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(fexpr),cljs.analyzer.get_line(n,env__$1),cljs.core.cst$kw$max_DASH_fixed_DASH_arity.cljs$core$IFn$_invoke$arity$1(fexpr),true,cljs.analyzer.handle_symbol_local(n,(locals.cljs$core$IFn$_invoke$arity$1 ? locals.cljs$core$IFn$_invoke$arity$1(n) : locals(n))),cljs.core.cst$kw$letfn]);
if(cljs.core.truth_(ret_tag)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__15853,cljs.core.cst$kw$ret_DASH_tag,ret_tag);
} else {
return G__15853;
}
})();
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc_in(env__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$locals,n], null),be),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(bes,be)], null);
});})(n__GT_fexpr,names,context,vec__15834,seq__15835,first__15836,seq__15835__$1,___$1,first__15836__$1,seq__15835__$2,bindings,exprs,form))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [env,cljs.core.PersistentVector.EMPTY], null),names);
var meth_env = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15837,(0),null);
var bes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15837,(1),null);
var meth_env__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(meth_env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var vec__15840 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (n__GT_fexpr,names,context,vec__15837,meth_env,bes,meth_env__$1,vec__15834,seq__15835,first__15836,seq__15835__$1,___$1,first__15836__$1,seq__15835__$2,bindings,exprs,form){
return (function (p__15854,p__15855){
var vec__15856 = p__15854;
var meth_env__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15856,(0),null);
var bes__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15856,(1),null);
var map__15859 = p__15855;
var map__15859__$1 = (((((!((map__15859 == null))))?(((((map__15859.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15859.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15859):map__15859);
var be = map__15859__$1;
var name__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15859__$1,cljs.core.cst$kw$name);
var shadow = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15859__$1,cljs.core.cst$kw$shadow);
var env__$1 = cljs.core.assoc_in(meth_env__$2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$locals,name__$1], null),shadow);
var fexpr = (function (){var G__15861 = env__$1;
var G__15862 = (n__GT_fexpr.cljs$core$IFn$_invoke$arity$1 ? n__GT_fexpr.cljs$core$IFn$_invoke$arity$1(name__$1) : n__GT_fexpr(name__$1));
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15861,G__15862) : cljs.analyzer.analyze(G__15861,G__15862));
})();
var be_SINGLEQUOTE_ = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(be,cljs.core.cst$kw$init,fexpr,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$variadic_QMARK_,cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(fexpr),cljs.core.cst$kw$max_DASH_fixed_DASH_arity,cljs.core.cst$kw$max_DASH_fixed_DASH_arity.cljs$core$IFn$_invoke$arity$1(fexpr),cljs.core.cst$kw$method_DASH_params,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$params,cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(fexpr))], 0));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc_in(env__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$locals,name__$1], null),be_SINGLEQUOTE_),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(bes__$1,be_SINGLEQUOTE_)], null);
});})(n__GT_fexpr,names,context,vec__15837,meth_env,bes,meth_env__$1,vec__15834,seq__15835,first__15836,seq__15835__$1,___$1,first__15836__$1,seq__15835__$2,bindings,exprs,form))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [meth_env__$1,cljs.core.PersistentVector.EMPTY], null),bes);
var meth_env__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15840,(0),null);
var bes__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15840,(1),null);
var expr = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__15863 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(meth_env__$2,cljs.core.cst$kw$context,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context))?cljs.core.cst$kw$return:context));
var G__15864 = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,cljs.core.cst$sym$do,null,(1),null)),exprs)));
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15863,G__15864) : cljs.analyzer.analyze(G__15863,G__15864));
})(),cljs.core.cst$kw$body_QMARK_,true);
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$env,env,cljs.core.cst$kw$op,cljs.core.cst$kw$letfn,cljs.core.cst$kw$bindings,bes__$1,cljs.core.cst$kw$body,expr,cljs.core.cst$kw$form,form,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$bindings,cljs.core.cst$kw$body], null)], null);
}));
cljs.analyzer.analyze_do_statements_STAR_ = (function cljs$analyzer$analyze_do_statements_STAR_(env,exprs){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__15865_SHARP_){
var G__15866 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$statement);
var G__15867 = p1__15865_SHARP_;
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15866,G__15867) : cljs.analyzer.analyze(G__15866,G__15867));
}),cljs.core.butlast(exprs));
});
cljs.analyzer.analyze_do_statements = (function cljs$analyzer$analyze_do_statements(env,exprs){
var _STAR_recur_frames_STAR__orig_val__15868 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__15869 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15869;

try{return cljs.analyzer.analyze_do_statements_STAR_(env,exprs);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15868;
}});
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$do,(function (op,env,p__15870,_,___$1){
var vec__15871 = p__15870;
var seq__15872 = cljs.core.seq(vec__15871);
var first__15873 = cljs.core.first(seq__15872);
var seq__15872__$1 = cljs.core.next(seq__15872);
var ___$2 = first__15873;
var exprs = seq__15872__$1;
var form = vec__15871;
var statements = cljs.analyzer.analyze_do_statements(env,exprs);
if((cljs.core.count(exprs) <= (1))){
var ret = (function (){var G__15874 = env;
var G__15875 = cljs.core.first(exprs);
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15874,G__15875) : cljs.analyzer.analyze(G__15874,G__15875));
})();
var children = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$statements,cljs.core.cst$kw$ret], null);
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$op,cljs.core.cst$kw$do,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$statements,statements,cljs.core.cst$kw$ret,ret,cljs.core.cst$kw$children,children], null);
} else {
var ret_env = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env)))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$statement):cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$return));
var ret = (function (){var G__15876 = ret_env;
var G__15877 = cljs.core.last(exprs);
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15876,G__15877) : cljs.analyzer.analyze(G__15876,G__15877));
})();
var children = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$statements,cljs.core.cst$kw$ret], null);
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$op,cljs.core.cst$kw$do,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$statements,statements,cljs.core.cst$kw$ret,ret,cljs.core.cst$kw$children,children], null);
}
}));
cljs.analyzer.analyze_let_binding_init = (function cljs$analyzer$analyze_let_binding_init(env,init,loop_lets){
var _STAR_loop_lets_STAR__orig_val__15878 = cljs.analyzer._STAR_loop_lets_STAR_;
var _STAR_loop_lets_STAR__temp_val__15879 = loop_lets;
cljs.analyzer._STAR_loop_lets_STAR_ = _STAR_loop_lets_STAR__temp_val__15879;

try{return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(env,init) : cljs.analyzer.analyze(env,init));
}finally {cljs.analyzer._STAR_loop_lets_STAR_ = _STAR_loop_lets_STAR__orig_val__15878;
}});
cljs.analyzer.get_let_tag = (function cljs$analyzer$get_let_tag(name,init_expr){
var temp__5737__auto__ = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(name));
if((temp__5737__auto__ == null)){
var temp__5737__auto____$1 = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(init_expr);
if((temp__5737__auto____$1 == null)){
return cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(init_expr));
} else {
var tag = temp__5737__auto____$1;
return tag;
}
} else {
var tag = temp__5737__auto__;
return tag;
}
});
cljs.analyzer.analyze_let_bindings_STAR_ = (function cljs$analyzer$analyze_let_bindings_STAR_(encl_env,bindings,op){
var bes = cljs.core.PersistentVector.EMPTY;
var env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(encl_env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var bindings__$1 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),bindings));
while(true){
var temp__5737__auto__ = cljs.core.first(bindings__$1);
if((temp__5737__auto__ == null)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [bes,env], null);
} else {
var vec__15888 = temp__5737__auto__;
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15888,(0),null);
var init = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15888,(1),null);
if(cljs.core.truth_((function (){var or__4131__auto__ = (!((cljs.core.namespace(name) == null)));
if(or__4131__auto__){
return or__4131__auto__;
} else {
var G__15893 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(name);
var G__15894 = ".";
return goog.string.contains(G__15893,G__15894);
}
})())){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(encl_env,["Invalid local name: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''));
} else {
}

var init_expr = cljs.analyzer.analyze_let_binding_init(env,init,cljs.core.cons(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$params,bes], null),cljs.analyzer._STAR_loop_lets_STAR_));
var line = cljs.analyzer.get_line(name,env);
var col = cljs.analyzer.get_col(name,env);
var shadow = cljs.analyzer.handle_symbol_local(name,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$locals,name], null)));
var be = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$init,cljs.core.cst$kw$name,cljs.core.cst$kw$binding_DASH_form_QMARK_,cljs.core.cst$kw$op,cljs.core.cst$kw$env,cljs.core.cst$kw$column,cljs.core.cst$kw$line,cljs.core.cst$kw$info,cljs.core.cst$kw$tag,cljs.core.cst$kw$shadow,cljs.core.cst$kw$local],[init_expr,name,true,cljs.core.cst$kw$binding,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$line,line,cljs.core.cst$kw$column,col], null),col,line,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$name,name,cljs.core.cst$kw$shadow,shadow], null),cljs.analyzer.get_let_tag(name,init_expr),shadow,op]);
var be__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$fn,cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(init_expr)))?cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([be,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$fn_DASH_var,true,cljs.core.cst$kw$methods,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (bes,env,bindings__$1,init_expr,line,col,shadow,be,vec__15888,name,init,temp__5737__auto__){
return (function (p1__15880_SHARP_){
return cljs.core.select_keys(p1__15880_SHARP_,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tag,cljs.core.cst$kw$fixed_DASH_arity,cljs.core.cst$kw$variadic_QMARK_], null));
});})(bes,env,bindings__$1,init_expr,line,col,shadow,be,vec__15888,name,init,temp__5737__auto__))
,cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(init_expr))),cljs.core.cst$kw$variadic_QMARK_,cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(init_expr),cljs.core.cst$kw$max_DASH_fixed_DASH_arity,cljs.core.cst$kw$max_DASH_fixed_DASH_arity.cljs$core$IFn$_invoke$arity$1(init_expr),cljs.core.cst$kw$method_DASH_params,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$params,cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(init_expr))], null)], 0)):be);
var be__$2 = cljs.analyzer.add_identity(be__$1);
var G__15895 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(bes,be__$2);
var G__15896 = cljs.core.assoc_in(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$locals,name], null),be__$2);
var G__15897 = cljs.core.next(bindings__$1);
bes = G__15895;
env = G__15896;
bindings__$1 = G__15897;
continue;
}
break;
}
});
cljs.analyzer.analyze_let_bindings = (function cljs$analyzer$analyze_let_bindings(encl_env,bindings,op){
var _STAR_recur_frames_STAR__orig_val__15898 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__15899 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15899;

try{return cljs.analyzer.analyze_let_bindings_STAR_(encl_env,bindings,op);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15898;
}});
cljs.analyzer.analyze_let_body_STAR_ = (function cljs$analyzer$analyze_let_body_STAR_(env,context,exprs){
var G__15900 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context))?cljs.core.cst$kw$return:context));
var G__15901 = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,cljs.core.cst$sym$do,null,(1),null)),exprs)));
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15900,G__15901) : cljs.analyzer.analyze(G__15900,G__15901));
});
cljs.analyzer.analyze_let_body = (function cljs$analyzer$analyze_let_body(env,context,exprs,recur_frames,loop_lets){
var _STAR_recur_frames_STAR__orig_val__15902 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_loop_lets_STAR__orig_val__15903 = cljs.analyzer._STAR_loop_lets_STAR_;
var _STAR_recur_frames_STAR__temp_val__15904 = recur_frames;
var _STAR_loop_lets_STAR__temp_val__15905 = loop_lets;
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15904;

cljs.analyzer._STAR_loop_lets_STAR_ = _STAR_loop_lets_STAR__temp_val__15905;

try{return cljs.analyzer.analyze_let_body_STAR_(env,context,exprs);
}finally {cljs.analyzer._STAR_loop_lets_STAR_ = _STAR_loop_lets_STAR__orig_val__15903;

cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15902;
}});
cljs.analyzer.analyze_let = (function cljs$analyzer$analyze_let(encl_env,p__15906,is_loop,widened_tags){
while(true){
var vec__15907 = p__15906;
var seq__15908 = cljs.core.seq(vec__15907);
var first__15909 = cljs.core.first(seq__15908);
var seq__15908__$1 = cljs.core.next(seq__15908);
var _ = first__15909;
var first__15909__$1 = cljs.core.first(seq__15908__$1);
var seq__15908__$2 = cljs.core.next(seq__15908__$1);
var bindings = first__15909__$1;
var exprs = seq__15908__$2;
var form = vec__15907;
if(((cljs.core.vector_QMARK_(bindings)) && (cljs.core.even_QMARK_(cljs.core.count(bindings))))){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(encl_env,"bindings must be vector of even number of elements");
}

var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(encl_env);
var op = ((is_loop === true)?cljs.core.cst$kw$loop:cljs.core.cst$kw$let);
var bindings__$1 = (cljs.core.truth_(widened_tags)?cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (encl_env,p__15906,is_loop,widened_tags,context,op,vec__15907,seq__15908,first__15909,seq__15908__$1,_,first__15909__$1,seq__15908__$2,bindings,exprs,form){
return (function (p__15913,widened_tag){
var vec__15914 = p__15913;
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15914,(0),null);
var init = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15914,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(name,cljs.core.assoc,cljs.core.cst$kw$tag,widened_tag),init], null);
});})(encl_env,p__15906,is_loop,widened_tags,context,op,vec__15907,seq__15908,first__15909,seq__15908__$1,_,first__15909__$1,seq__15908__$2,bindings,exprs,form))
,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),bindings),widened_tags], 0))):bindings);
var vec__15910 = cljs.analyzer.analyze_let_bindings(encl_env,bindings__$1,op);
var bes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15910,(0),null);
var env = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15910,(1),null);
var recur_frame = ((is_loop === true)?new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$params,bes,cljs.core.cst$kw$flag,cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null),cljs.core.cst$kw$tags,cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$tag,bes))], null):null);
var recur_frames = (cljs.core.truth_(recur_frame)?cljs.core.cons(recur_frame,cljs.analyzer._STAR_recur_frames_STAR_):cljs.analyzer._STAR_recur_frames_STAR_);
var loop_lets = ((is_loop === true)?cljs.analyzer._STAR_loop_lets_STAR_:(((!((cljs.analyzer._STAR_loop_lets_STAR_ == null))))?cljs.core.cons(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$params,bes], null),cljs.analyzer._STAR_loop_lets_STAR_):null));
var warn_acc = (cljs.core.truth_((function (){var and__4120__auto__ = is_loop;
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.not(widened_tags);
} else {
return and__4120__auto__;
}
})())?cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY):null);
var expr = (cljs.core.truth_(warn_acc)?(function (){var _STAR_cljs_warning_handlers_STAR__orig_val__15917 = cljs.analyzer._STAR_cljs_warning_handlers_STAR_;
var _STAR_cljs_warning_handlers_STAR__temp_val__15918 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.analyzer.accumulating_warning_handler(warn_acc)], null);
cljs.analyzer._STAR_cljs_warning_handlers_STAR_ = _STAR_cljs_warning_handlers_STAR__temp_val__15918;

try{return cljs.analyzer.analyze_let_body(env,context,exprs,recur_frames,loop_lets);
}finally {cljs.analyzer._STAR_cljs_warning_handlers_STAR_ = _STAR_cljs_warning_handlers_STAR__orig_val__15917;
}})():cljs.analyzer.analyze_let_body(env,context,exprs,recur_frames,loop_lets));
var children = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$bindings,cljs.core.cst$kw$body], null);
var nil__GT_any = cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,cljs.core.cst$sym$any);
if(cljs.core.truth_((function (){var and__4120__auto__ = is_loop;
if(cljs.core.truth_(and__4120__auto__)){
return ((cljs.core.not(widened_tags)) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(nil__GT_any,cljs.core.deref(cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(recur_frame))),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(nil__GT_any,cljs.core.cst$kw$tag),bes))));
} else {
return and__4120__auto__;
}
})())){
var G__15919 = encl_env;
var G__15920 = form;
var G__15921 = is_loop;
var G__15922 = cljs.core.deref(cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(recur_frame));
encl_env = G__15919;
p__15906 = G__15920;
is_loop = G__15921;
widened_tags = G__15922;
continue;
} else {
if(cljs.core.truth_(warn_acc)){
cljs.analyzer.replay_accumulated_warnings(warn_acc);
} else {
}

return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$op,op,cljs.core.cst$kw$env,encl_env,cljs.core.cst$kw$bindings,bes,cljs.core.cst$kw$body,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(expr,cljs.core.cst$kw$body_QMARK_,true),cljs.core.cst$kw$form,form,cljs.core.cst$kw$children,children], null);
}
break;
}
});
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$let_STAR_,(function (op,encl_env,form,_,___$1){
return cljs.analyzer.analyze_let(encl_env,form,false,null);
}));
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$loop_STAR_,(function (op,encl_env,form,_,___$1){
return cljs.analyzer.analyze_let(encl_env,form,true,null);
}));
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$recur,(function (op,env,p__15924,_,___$1){
var vec__15925 = p__15924;
var seq__15926 = cljs.core.seq(vec__15925);
var first__15927 = cljs.core.first(seq__15926);
var seq__15926__$1 = cljs.core.next(seq__15926);
var ___$2 = first__15927;
var exprs = seq__15926__$1;
var form = vec__15925;
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
var frame = cljs.core.first(cljs.analyzer._STAR_recur_frames_STAR_);
var add_implicit_target_object_QMARK_ = (function (){var and__4120__auto__ = cljs.core.cst$kw$protocol_DASH_impl.cljs$core$IFn$_invoke$arity$1(frame);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(exprs),(cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(frame)) - (1)));
} else {
return and__4120__auto__;
}
})();
var exprs__$1 = (function (){var G__15928 = exprs;
if(cljs.core.truth_(add_implicit_target_object_QMARK_)){
return cljs.core.cons(null,G__15928);
} else {
return G__15928;
}
})();
var exprs__$2 = (function (){var _STAR_recur_frames_STAR__orig_val__15929 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__15930 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15930;

try{return cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (_STAR_recur_frames_STAR__orig_val__15929,_STAR_recur_frames_STAR__temp_val__15930,context,frame,add_implicit_target_object_QMARK_,exprs__$1,vec__15925,seq__15926,first__15927,seq__15926__$1,___$2,exprs,form){
return (function (p1__15923_SHARP_){
var G__15931 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var G__15932 = p1__15923_SHARP_;
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15931,G__15932) : cljs.analyzer.analyze(G__15931,G__15932));
});})(_STAR_recur_frames_STAR__orig_val__15929,_STAR_recur_frames_STAR__temp_val__15930,context,frame,add_implicit_target_object_QMARK_,exprs__$1,vec__15925,seq__15926,first__15927,seq__15926__$1,___$2,exprs,form))
,exprs__$1));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15929;
}})();
if(cljs.core.truth_(frame)){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Can't recur here");
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(exprs__$2),cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(frame)))){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,["recur argument count mismatch, expected: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(frame)))," args, got: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(exprs__$2))].join(''));
}

if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core.cst$kw$protocol_DASH_impl.cljs$core$IFn$_invoke$arity$1(frame);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.not(add_implicit_target_object_QMARK_);
} else {
return and__4120__auto__;
}
})())){
cljs.analyzer.warning(cljs.core.cst$kw$protocol_DASH_impl_DASH_recur_DASH_with_DASH_target,env,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$form,cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(cljs.core.first(exprs__$2))], null));
} else {
}

cljs.core.reset_BANG_(cljs.core.cst$kw$flag.cljs$core$IFn$_invoke$arity$1(frame),true);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(frame),((function (context,frame,add_implicit_target_object_QMARK_,exprs__$1,exprs__$2,vec__15925,seq__15926,first__15927,seq__15926__$1,___$2,exprs,form){
return (function (tags){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(((function (context,frame,add_implicit_target_object_QMARK_,exprs__$1,exprs__$2,vec__15925,seq__15926,first__15927,seq__15926__$1,___$2,exprs,form){
return (function (tag,expr){
return cljs.analyzer.add_types.cljs$core$IFn$_invoke$arity$2(tag,cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(expr));
});})(context,frame,add_implicit_target_object_QMARK_,exprs__$1,exprs__$2,vec__15925,seq__15926,first__15927,seq__15926__$1,___$2,exprs,form))
,tags,exprs__$2);
});})(context,frame,add_implicit_target_object_QMARK_,exprs__$1,exprs__$2,vec__15925,seq__15926,first__15927,seq__15926__$1,___$2,exprs,form))
);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$env,env,cljs.core.cst$kw$op,cljs.core.cst$kw$recur,cljs.core.cst$kw$form,form], null),cljs.core.cst$kw$frame,frame,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$exprs,exprs__$2,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$exprs], null)], 0));
}));
cljs.analyzer.analyze_const = (function cljs$analyzer$analyze_const(env,form){
var map__15933 = (function (){var G__15934 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$quoted_QMARK_,true);
var G__15935 = form;
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__15934,G__15935) : cljs.analyzer.analyze(G__15934,G__15935));
})();
var map__15933__$1 = (((((!((map__15933 == null))))?(((((map__15933.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15933.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15933):map__15933);
var tag = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15933__$1,cljs.core.cst$kw$tag);
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$op,cljs.core.cst$kw$const,cljs.core.cst$kw$env,env,cljs.core.cst$kw$literal_QMARK_,true,cljs.core.cst$kw$val,form,cljs.core.cst$kw$tag,tag,cljs.core.cst$kw$form,form], null);
});
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$quote,(function (_,env,p__15937,___$1,___$2){
var vec__15938 = p__15937;
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15938,(0),null);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15938,(1),null);
var form = vec__15938;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(form))){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Wrong number of args to quote");
} else {
}

var expr = cljs.analyzer.analyze_const(env,x);
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$op,cljs.core.cst$kw$quote,cljs.core.cst$kw$expr,expr,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$tag,cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(expr),cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$expr], null)], null);
}));
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$new,(function (_,env,p__15942,___$1,___$2){
var vec__15943 = p__15942;
var seq__15944 = cljs.core.seq(vec__15943);
var first__15945 = cljs.core.first(seq__15944);
var seq__15944__$1 = cljs.core.next(seq__15944);
var ___$3 = first__15945;
var first__15945__$1 = cljs.core.first(seq__15944__$1);
var seq__15944__$2 = cljs.core.next(seq__15944__$1);
var ctor = first__15945__$1;
var args = seq__15944__$2;
var form = vec__15943;
var _STAR_recur_frames_STAR__orig_val__15946 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__15947 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15947;

try{var enve = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var ctorexpr = (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(enve,ctor) : cljs.analyzer.analyze(enve,ctor));
var ctor_var = (cljs.core.truth_((function (){var G__15949 = cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(ctorexpr);
var fexpr__15948 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$var,null,cljs.core.cst$kw$js_DASH_var,null,cljs.core.cst$kw$local,null], null), null);
return (fexpr__15948.cljs$core$IFn$_invoke$arity$1 ? fexpr__15948.cljs$core$IFn$_invoke$arity$1(G__15949) : fexpr__15948(G__15949));
})())?cljs.analyzer.resolve_existing_var(env,ctor):null);
var record_args = (cljs.core.truth_((function (){var and__4120__auto__ = cljs.core.cst$kw$record.cljs$core$IFn$_invoke$arity$1(ctor_var);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.not(cljs.core.cst$kw$internal_DASH_ctor.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(ctor)));
} else {
return and__4120__auto__;
}
})())?cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((3),(cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(enve,null) : cljs.analyzer.analyze(enve,null))):null);
var argexprs = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (enve,ctorexpr,ctor_var,record_args,_STAR_recur_frames_STAR__orig_val__15946,_STAR_recur_frames_STAR__temp_val__15947,vec__15943,seq__15944,first__15945,seq__15944__$1,___$3,first__15945__$1,seq__15944__$2,ctor,args,form){
return (function (p1__15941_SHARP_){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(enve,p1__15941_SHARP_) : cljs.analyzer.analyze(enve,p1__15941_SHARP_));
});})(enve,ctorexpr,ctor_var,record_args,_STAR_recur_frames_STAR__orig_val__15946,_STAR_recur_frames_STAR__temp_val__15947,vec__15943,seq__15944,first__15945,seq__15944__$1,___$3,first__15945__$1,seq__15944__$2,ctor,args,form))
,args)),record_args);
var known_num_fields = cljs.core.cst$kw$num_DASH_fields.cljs$core$IFn$_invoke$arity$1(ctor_var);
var argc = cljs.core.count(args);
if(((cljs.core.not(cljs.core.cst$kw$internal_DASH_ctor.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(ctor)))) && ((!((known_num_fields == null)))) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(known_num_fields,argc)))){
cljs.analyzer.warning(cljs.core.cst$kw$fn_DASH_arity,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$argc,argc,cljs.core.cst$kw$ctor,ctor], null));
} else {
}

return new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$env,env,cljs.core.cst$kw$op,cljs.core.cst$kw$new,cljs.core.cst$kw$form,form,cljs.core.cst$kw$class,ctorexpr,cljs.core.cst$kw$args,argexprs,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class,cljs.core.cst$kw$args], null),cljs.core.cst$kw$tag,(function (){var name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(ctorexpr));
var or__4131__auto__ = (function (){var fexpr__15951 = new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$sym$js_SLASH_Object,cljs.core.cst$sym$object,cljs.core.cst$sym$js_SLASH_String,cljs.core.cst$sym$string,cljs.core.cst$sym$js_SLASH_Array,cljs.core.cst$sym$array,cljs.core.cst$sym$js_SLASH_Number,cljs.core.cst$sym$number,cljs.core.cst$sym$js_SLASH_Function,cljs.core.cst$sym$function,cljs.core.cst$sym$js_SLASH_Boolean,cljs.core.cst$sym$boolean], null);
return (fexpr__15951.cljs$core$IFn$_invoke$arity$1 ? fexpr__15951.cljs$core$IFn$_invoke$arity$1(name) : fexpr__15951(name));
})();
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return name;
}
})()], null);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15946;
}}));
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$set_BANG_,(function (_,env,p__15952,___$1,___$2){
var vec__15953 = p__15952;
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15953,(0),null);
var target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15953,(1),null);
var val = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15953,(2),null);
var alt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15953,(3),null);
var form = vec__15953;
var vec__15956 = (cljs.core.truth_(alt)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,cljs.core.cst$sym$_DOT_,null,(1),null)),(new cljs.core.List(null,target,null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,val,null,(1),null))], 0)))),alt], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [target,val], null));
var target__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15956,(0),null);
var val__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15956,(1),null);
var _STAR_recur_frames_STAR__orig_val__15959 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__15960 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__15960;

try{var _STAR_private_var_access_nowarn_STAR__orig_val__15961 = cljs.analyzer._STAR_private_var_access_nowarn_STAR_;
var _STAR_private_var_access_nowarn_STAR__temp_val__15962 = true;
cljs.analyzer._STAR_private_var_access_nowarn_STAR_ = _STAR_private_var_access_nowarn_STAR__temp_val__15962;

try{var enve = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var texpr = (((target__$1 instanceof cljs.core.Symbol))?(function (){
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(target__$1,cljs.core.cst$sym$_STAR_unchecked_DASH_if_STAR_)) && (((val__$1 === true) || (val__$1 === false))))){
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(target__$1,cljs.core.cst$sym$_STAR_unchecked_DASH_arrays_STAR_)) && (((val__$1 === true) || (val__$1 === false))))){
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(target__$1,cljs.core.cst$sym$_STAR_warn_DASH_on_DASH_infer_STAR_)) && (((val__$1 === true) || (val__$1 === false))))){
cljs.analyzer._STAR_cljs_warnings_STAR_ = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.analyzer._STAR_cljs_warnings_STAR_,cljs.core.cst$kw$infer_DASH_warning,val__$1);
} else {
}
}
}

if((!((cljs.core.cst$kw$const.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$locals),target__$1)) == null)))){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Can't set! a constant");
} else {
}

var local_15967 = cljs.analyzer.handle_symbol_local(target__$1,(function (){var G__15963 = cljs.core.cst$kw$locals.cljs$core$IFn$_invoke$arity$1(env);
return (target__$1.cljs$core$IFn$_invoke$arity$1 ? target__$1.cljs$core$IFn$_invoke$arity$1(G__15963) : target__$1(G__15963));
})());
if(cljs.core.truth_((function (){var or__4131__auto__ = (local_15967 == null);
if(or__4131__auto__){
return or__4131__auto__;
} else {
var and__4120__auto__ = cljs.core.cst$kw$field.cljs$core$IFn$_invoke$arity$1(local_15967);
if(cljs.core.truth_(and__4120__auto__)){
var or__4131__auto____$1 = cljs.core.cst$kw$mutable.cljs$core$IFn$_invoke$arity$1(local_15967);
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
var or__4131__auto____$2 = cljs.core.cst$kw$unsynchronized_DASH_mutable.cljs$core$IFn$_invoke$arity$1(local_15967);
if(cljs.core.truth_(or__4131__auto____$2)){
return or__4131__auto____$2;
} else {
return cljs.core.cst$kw$volatile_DASH_mutable.cljs$core$IFn$_invoke$arity$1(local_15967);
}
}
} else {
return and__4120__auto__;
}
}
})())){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Can't set! local var or non-mutable field");
}

return (cljs.analyzer.analyze_symbol.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze_symbol.cljs$core$IFn$_invoke$arity$2(enve,target__$1) : cljs.analyzer.analyze_symbol(enve,target__$1));
})()
:((cljs.core.seq_QMARK_(target__$1))?(function (){var texpr = (cljs.analyzer.analyze_seq.cljs$core$IFn$_invoke$arity$3 ? cljs.analyzer.analyze_seq.cljs$core$IFn$_invoke$arity$3(enve,target__$1,null) : cljs.analyzer.analyze_seq(enve,target__$1,null));
if(cljs.core.truth_(cljs.core.cst$kw$field.cljs$core$IFn$_invoke$arity$1(texpr))){
return texpr;
} else {
return null;
}
})():null)
);
var vexpr = (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(enve,val__$1) : cljs.analyzer.analyze(enve,val__$1));
if(cljs.core.seq_QMARK_(target__$1)){
var sym_15968 = (function (){var G__15964 = target__$1;
if((G__15964 == null)){
return null;
} else {
return cljs.core.second(G__15964);
}
})();
var meta_15969 = cljs.core.meta(sym_15968);
var temp__5735__auto___15970 = (function (){var and__4120__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$fn,cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(vexpr));
if(and__4120__auto__){
return cljs.core.cst$kw$top_DASH_fn.cljs$core$IFn$_invoke$arity$1(meta_15969);
} else {
return and__4120__auto__;
}
})();
if(cljs.core.truth_(temp__5735__auto___15970)){
var info_15971 = temp__5735__auto___15970;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.env._STAR_compiler_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env)),cljs.core.cst$kw$defs,sym_15968,cljs.core.cst$kw$methods], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.select_keys(info_15971,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fixed_DASH_arity,cljs.core.cst$kw$variadic_QMARK_], null)),cljs.core.select_keys(cljs.core.first(cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(vexpr)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tag], null))], 0))], 0));
} else {
}
} else {
}

if(cljs.core.truth_(texpr)){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"set! target must be a field or a symbol naming a var");
}

if(((cljs.core.not(cljs.core.cst$kw$def_DASH_emits_DASH_var.cljs$core$IFn$_invoke$arity$1(env))) && ((!(((function (){var fexpr__15966 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$sym$_STAR_warn_DASH_on_DASH_infer_STAR_,"null",cljs.core.cst$sym$_STAR_unchecked_DASH_arrays_STAR_,"null",cljs.core.cst$sym$_STAR_unchecked_DASH_if_STAR_,"null"], null), null);
return (fexpr__15966.cljs$core$IFn$_invoke$arity$1 ? fexpr__15966.cljs$core$IFn$_invoke$arity$1(target__$1) : fexpr__15966(target__$1));
})() == null)))))){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$env,env,cljs.core.cst$kw$op,cljs.core.cst$kw$no_DASH_op], null);
} else {
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$env,env,cljs.core.cst$kw$op,cljs.core.cst$kw$set_BANG_,cljs.core.cst$kw$form,form,cljs.core.cst$kw$target,texpr,cljs.core.cst$kw$val,vexpr,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$target,cljs.core.cst$kw$val], null)], null);

}
}finally {cljs.analyzer._STAR_private_var_access_nowarn_STAR_ = _STAR_private_var_access_nowarn_STAR__orig_val__15961;
}}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__15959;
}}));
cljs.analyzer.foreign_dep_QMARK_ = (function cljs$analyzer$foreign_dep_QMARK_(dep){
var js_index = cljs.core.cst$kw$js_DASH_dependency_DASH_index.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_));
var temp__5737__auto__ = cljs.core.find(js_index,cljs.core.name(dep));
if((temp__5737__auto__ == null)){
return false;
} else {
var vec__15972 = temp__5737__auto__;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15972,(0),null);
var map__15975 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15972,(1),null);
var map__15975__$1 = (((((!((map__15975 == null))))?(((((map__15975.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15975.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15975):map__15975);
var foreign = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15975__$1,cljs.core.cst$kw$foreign);
return foreign;
}
});
/**
 * Given a lib, a namespace, deps, its dependencies, env, an analysis environment
 * and opts, compiler options - analyze all of the dependencies. Required to
 * correctly analyze usage of other namespaces.
 */
cljs.analyzer.analyze_deps = (function cljs$analyzer$analyze_deps(var_args){
var G__15979 = arguments.length;
switch (G__15979) {
case 3:
return cljs.analyzer.analyze_deps.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.analyzer.analyze_deps.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.analyze_deps.cljs$core$IFn$_invoke$arity$3 = (function (lib,deps,env){
return cljs.analyzer.analyze_deps.cljs$core$IFn$_invoke$arity$4(lib,deps,env,(cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)):null));
});

cljs.analyzer.analyze_deps.cljs$core$IFn$_invoke$arity$4 = (function (lib,deps,env,opts){
var compiler = cljs.core.deref(cljs.env._STAR_compiler_STAR_);
var _STAR_cljs_dep_set_STAR__orig_val__15980 = cljs.analyzer._STAR_cljs_dep_set_STAR_;
var _STAR_cljs_dep_set_STAR__temp_val__15981 = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$5(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.analyzer._STAR_cljs_dep_set_STAR_,lib),cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$dep_DASH_path], null),cljs.core.conj,lib);
cljs.analyzer._STAR_cljs_dep_set_STAR_ = _STAR_cljs_dep_set_STAR__temp_val__15981;

try{if(cljs.core.every_QMARK_(((function (_STAR_cljs_dep_set_STAR__orig_val__15980,_STAR_cljs_dep_set_STAR__temp_val__15981,compiler){
return (function (p1__15977_SHARP_){
return (!(cljs.core.contains_QMARK_(cljs.analyzer._STAR_cljs_dep_set_STAR_,p1__15977_SHARP_)));
});})(_STAR_cljs_dep_set_STAR__orig_val__15980,_STAR_cljs_dep_set_STAR__temp_val__15981,compiler))
,deps)){
} else {
throw (new Error(["Assert failed: ",["Circular dependency detected, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(" -> ",cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$dep_DASH_path.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(cljs.analyzer._STAR_cljs_dep_set_STAR_)),cljs.core.some(cljs.analyzer._STAR_cljs_dep_set_STAR_,deps)))))].join(''),"\n","(every? (fn* [p1__15977#] (not (contains? *cljs-dep-set* p1__15977#))) deps)"].join('')));
}

var seq__15982 = cljs.core.seq(deps);
var chunk__15983 = null;
var count__15984 = (0);
var i__15985 = (0);
while(true){
if((i__15985 < count__15984)){
var dep = chunk__15983.cljs$core$IIndexed$_nth$arity$2(null,i__15985);
if(cljs.core.truth_((function (){var or__4131__auto__ = (!((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(compiler,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,dep,cljs.core.cst$kw$defs], null)) == null)));
if(or__4131__auto__){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = cljs.core.contains_QMARK_(cljs.core.cst$kw$js_DASH_dependency_DASH_index.cljs$core$IFn$_invoke$arity$1(compiler),cljs.core.name(dep));
if(or__4131__auto____$1){
return or__4131__auto____$1;
} else {
var or__4131__auto____$2 = cljs.analyzer.node_module_dep_QMARK_(dep);
if(or__4131__auto____$2){
return or__4131__auto____$2;
} else {
return cljs.analyzer.js_module_exists_QMARK_(cljs.core.name(dep));
}
}
}
})())){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,(function (){var G__15990 = cljs.core.cst$kw$undeclared_DASH_ns;
var G__15991 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ns_DASH_sym,dep,cljs.core.cst$kw$js_DASH_provide,cljs.core.name(dep)], null);
return (cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2(G__15990,G__15991) : cljs.analyzer.error_message(G__15990,G__15991));
})());
}


var G__15995 = seq__15982;
var G__15996 = chunk__15983;
var G__15997 = count__15984;
var G__15998 = (i__15985 + (1));
seq__15982 = G__15995;
chunk__15983 = G__15996;
count__15984 = G__15997;
i__15985 = G__15998;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__15982);
if(temp__5735__auto__){
var seq__15982__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15982__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__15982__$1);
var G__15999 = cljs.core.chunk_rest(seq__15982__$1);
var G__16000 = c__4550__auto__;
var G__16001 = cljs.core.count(c__4550__auto__);
var G__16002 = (0);
seq__15982 = G__15999;
chunk__15983 = G__16000;
count__15984 = G__16001;
i__15985 = G__16002;
continue;
} else {
var dep = cljs.core.first(seq__15982__$1);
if(cljs.core.truth_((function (){var or__4131__auto__ = (!((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(compiler,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,dep,cljs.core.cst$kw$defs], null)) == null)));
if(or__4131__auto__){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = cljs.core.contains_QMARK_(cljs.core.cst$kw$js_DASH_dependency_DASH_index.cljs$core$IFn$_invoke$arity$1(compiler),cljs.core.name(dep));
if(or__4131__auto____$1){
return or__4131__auto____$1;
} else {
var or__4131__auto____$2 = cljs.analyzer.node_module_dep_QMARK_(dep);
if(or__4131__auto____$2){
return or__4131__auto____$2;
} else {
return cljs.analyzer.js_module_exists_QMARK_(cljs.core.name(dep));
}
}
}
})())){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,(function (){var G__15992 = cljs.core.cst$kw$undeclared_DASH_ns;
var G__15993 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ns_DASH_sym,dep,cljs.core.cst$kw$js_DASH_provide,cljs.core.name(dep)], null);
return (cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2(G__15992,G__15993) : cljs.analyzer.error_message(G__15992,G__15993));
})());
}


var G__16003 = cljs.core.next(seq__15982__$1);
var G__16004 = null;
var G__16005 = (0);
var G__16006 = (0);
seq__15982 = G__16003;
chunk__15983 = G__16004;
count__15984 = G__16005;
i__15985 = G__16006;
continue;
}
} else {
return null;
}
}
break;
}
}finally {cljs.analyzer._STAR_cljs_dep_set_STAR_ = _STAR_cljs_dep_set_STAR__orig_val__15980;
}});

cljs.analyzer.analyze_deps.cljs$lang$maxFixedArity = 4;

cljs.analyzer.missing_use_QMARK_ = (function cljs$analyzer$missing_use_QMARK_(lib,sym,cenv){
var js_lib = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cenv,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$js_DASH_dependency_DASH_index,cljs.core.name(lib)], null));
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(cenv,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,lib,cljs.core.cst$kw$defs,sym], null),cljs.core.cst$kw$cljs$analyzer_SLASH_not_DASH_found),cljs.core.cst$kw$cljs$analyzer_SLASH_not_DASH_found)) && ((!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(js_lib,cljs.core.cst$kw$group),cljs.core.cst$kw$goog)))) && (cljs.core.not(cljs.core.get.cljs$core$IFn$_invoke$arity$2(js_lib,cljs.core.cst$kw$closure_DASH_lib))) && ((!(cljs.analyzer.node_module_dep_QMARK_(lib)))) && ((!(cljs.analyzer.dep_has_global_exports_QMARK_(lib)))));
});
cljs.analyzer.missing_rename_QMARK_ = (function cljs$analyzer$missing_rename_QMARK_(sym,cenv){
var lib = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace(sym));
var sym__$1 = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(sym));
return cljs.analyzer.missing_use_QMARK_(lib,sym__$1,cenv);
});
cljs.analyzer.missing_use_macro_QMARK_ = (function cljs$analyzer$missing_use_macro_QMARK_(lib,sym){
if((lib instanceof cljs.core.Symbol)){
var the_ns = cljs.core.find_macros_ns(lib);
return (((the_ns == null)) || ((the_ns.findInternedVar(sym) == null)));
} else {
return null;
}
});
cljs.analyzer.missing_rename_macro_QMARK_ = (function cljs$analyzer$missing_rename_macro_QMARK_(sym){
var lib = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace(sym));
var sym__$1 = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(sym));
var the_ns = cljs.core.find_macros_ns(lib);
return (((the_ns == null)) || ((the_ns.findInternedVar(sym__$1) == null)));
});
cljs.analyzer.missing_uses = (function cljs$analyzer$missing_uses(uses,env){
var cenv = cljs.core.deref(cljs.env._STAR_compiler_STAR_);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (cenv){
return (function (p__16007){
var vec__16008 = p__16007;
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16008,(0),null);
var lib = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16008,(1),null);
return cljs.analyzer.missing_use_QMARK_(lib,sym,cenv);
});})(cenv))
,uses));
});
cljs.analyzer.missing_renames = (function cljs$analyzer$missing_renames(renames,env){
var cenv = cljs.core.deref(cljs.env._STAR_compiler_STAR_);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (cenv){
return (function (p__16011){
var vec__16012 = p__16011;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16012,(0),null);
var qualified_sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16012,(1),null);
return cljs.analyzer.missing_rename_QMARK_(qualified_sym,cenv);
});})(cenv))
,renames));
});
cljs.analyzer.missing_use_macros = (function cljs$analyzer$missing_use_macros(use_macros,env){
var cenv = cljs.core.deref(cljs.env._STAR_compiler_STAR_);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (cenv){
return (function (p__16015){
var vec__16016 = p__16015;
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16016,(0),null);
var lib = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16016,(1),null);
return cljs.analyzer.missing_use_macro_QMARK_(lib,sym);
});})(cenv))
,use_macros));
});
cljs.analyzer.inferred_use_macros = (function cljs$analyzer$inferred_use_macros(use_macros,env){
var cenv = cljs.core.deref(cljs.env._STAR_compiler_STAR_);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (cenv){
return (function (p__16019){
var vec__16020 = p__16019;
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16020,(0),null);
var lib = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16020,(1),null);
return cljs.core.not(cljs.analyzer.missing_use_macro_QMARK_(lib,sym));
});})(cenv))
,use_macros));
});
cljs.analyzer.inferred_rename_macros = (function cljs$analyzer$inferred_rename_macros(rename_macros,env){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__16023){
var vec__16024 = p__16023;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16024,(0),null);
var qualified_sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16024,(1),null);
return (!(cljs.analyzer.missing_rename_macro_QMARK_(qualified_sym)));
}),rename_macros));
});
cljs.analyzer.check_uses = (function cljs$analyzer$check_uses(uses,env){
var cenv = cljs.core.deref(cljs.env._STAR_compiler_STAR_);
var seq__16027 = cljs.core.seq(uses);
var chunk__16028 = null;
var count__16029 = (0);
var i__16030 = (0);
while(true){
if((i__16030 < count__16029)){
var vec__16041 = chunk__16028.cljs$core$IIndexed$_nth$arity$2(null,i__16030);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16041,(0),null);
var lib = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16041,(1),null);
if(cljs.analyzer.missing_use_QMARK_(lib,sym,cenv)){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,(function (){var G__16044 = cljs.core.cst$kw$undeclared_DASH_ns_DASH_form;
var G__16045 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,"var",cljs.core.cst$kw$lib,lib,cljs.core.cst$kw$sym,sym], null);
return (cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2(G__16044,G__16045) : cljs.analyzer.error_message(G__16044,G__16045));
})());
} else {
}


var G__16051 = seq__16027;
var G__16052 = chunk__16028;
var G__16053 = count__16029;
var G__16054 = (i__16030 + (1));
seq__16027 = G__16051;
chunk__16028 = G__16052;
count__16029 = G__16053;
i__16030 = G__16054;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__16027);
if(temp__5735__auto__){
var seq__16027__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__16027__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__16027__$1);
var G__16055 = cljs.core.chunk_rest(seq__16027__$1);
var G__16056 = c__4550__auto__;
var G__16057 = cljs.core.count(c__4550__auto__);
var G__16058 = (0);
seq__16027 = G__16055;
chunk__16028 = G__16056;
count__16029 = G__16057;
i__16030 = G__16058;
continue;
} else {
var vec__16046 = cljs.core.first(seq__16027__$1);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16046,(0),null);
var lib = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16046,(1),null);
if(cljs.analyzer.missing_use_QMARK_(lib,sym,cenv)){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,(function (){var G__16049 = cljs.core.cst$kw$undeclared_DASH_ns_DASH_form;
var G__16050 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,"var",cljs.core.cst$kw$lib,lib,cljs.core.cst$kw$sym,sym], null);
return (cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2(G__16049,G__16050) : cljs.analyzer.error_message(G__16049,G__16050));
})());
} else {
}


var G__16059 = cljs.core.next(seq__16027__$1);
var G__16060 = null;
var G__16061 = (0);
var G__16062 = (0);
seq__16027 = G__16059;
chunk__16028 = G__16060;
count__16029 = G__16061;
i__16030 = G__16062;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.analyzer.check_use_macros = (function cljs$analyzer$check_use_macros(var_args){
var G__16064 = arguments.length;
switch (G__16064) {
case 2:
return cljs.analyzer.check_use_macros.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.analyzer.check_use_macros.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.check_use_macros.cljs$core$IFn$_invoke$arity$2 = (function (use_macros,env){
return cljs.analyzer.check_use_macros.cljs$core$IFn$_invoke$arity$3(use_macros,null,env);
});

cljs.analyzer.check_use_macros.cljs$core$IFn$_invoke$arity$3 = (function (use_macros,missing_uses,env){
var cenv = cljs.core.deref(cljs.env._STAR_compiler_STAR_);
var seq__16065_16090 = cljs.core.seq(use_macros);
var chunk__16066_16091 = null;
var count__16067_16092 = (0);
var i__16068_16093 = (0);
while(true){
if((i__16068_16093 < count__16067_16092)){
var vec__16079_16094 = chunk__16066_16091.cljs$core$IIndexed$_nth$arity$2(null,i__16068_16093);
var sym_16095 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16079_16094,(0),null);
var lib_16096 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16079_16094,(1),null);
if(cljs.core.truth_(cljs.analyzer.missing_use_macro_QMARK_(lib_16096,sym_16095))){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,(function (){var G__16082 = cljs.core.cst$kw$undeclared_DASH_ns_DASH_form;
var G__16083 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,"macro",cljs.core.cst$kw$lib,lib_16096,cljs.core.cst$kw$sym,sym_16095], null);
return (cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2(G__16082,G__16083) : cljs.analyzer.error_message(G__16082,G__16083));
})());
} else {
}


var G__16097 = seq__16065_16090;
var G__16098 = chunk__16066_16091;
var G__16099 = count__16067_16092;
var G__16100 = (i__16068_16093 + (1));
seq__16065_16090 = G__16097;
chunk__16066_16091 = G__16098;
count__16067_16092 = G__16099;
i__16068_16093 = G__16100;
continue;
} else {
var temp__5735__auto___16101 = cljs.core.seq(seq__16065_16090);
if(temp__5735__auto___16101){
var seq__16065_16102__$1 = temp__5735__auto___16101;
if(cljs.core.chunked_seq_QMARK_(seq__16065_16102__$1)){
var c__4550__auto___16103 = cljs.core.chunk_first(seq__16065_16102__$1);
var G__16104 = cljs.core.chunk_rest(seq__16065_16102__$1);
var G__16105 = c__4550__auto___16103;
var G__16106 = cljs.core.count(c__4550__auto___16103);
var G__16107 = (0);
seq__16065_16090 = G__16104;
chunk__16066_16091 = G__16105;
count__16067_16092 = G__16106;
i__16068_16093 = G__16107;
continue;
} else {
var vec__16084_16108 = cljs.core.first(seq__16065_16102__$1);
var sym_16109 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16084_16108,(0),null);
var lib_16110 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16084_16108,(1),null);
if(cljs.core.truth_(cljs.analyzer.missing_use_macro_QMARK_(lib_16110,sym_16109))){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,(function (){var G__16087 = cljs.core.cst$kw$undeclared_DASH_ns_DASH_form;
var G__16088 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,"macro",cljs.core.cst$kw$lib,lib_16110,cljs.core.cst$kw$sym,sym_16109], null);
return (cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2(G__16087,G__16088) : cljs.analyzer.error_message(G__16087,G__16088));
})());
} else {
}


var G__16111 = cljs.core.next(seq__16065_16102__$1);
var G__16112 = null;
var G__16113 = (0);
var G__16114 = (0);
seq__16065_16090 = G__16111;
chunk__16066_16091 = G__16112;
count__16067_16092 = G__16113;
i__16068_16093 = G__16114;
continue;
}
} else {
}
}
break;
}

cljs.analyzer.check_uses(cljs.analyzer.missing_use_macros(missing_uses,env),env);

return cljs.analyzer.inferred_use_macros(missing_uses,env);
});

cljs.analyzer.check_use_macros.cljs$lang$maxFixedArity = 3;

cljs.analyzer.check_use_macros_inferring_missing = (function cljs$analyzer$check_use_macros_inferring_missing(p__16118,env){
var map__16119 = p__16118;
var map__16119__$1 = (((((!((map__16119 == null))))?(((((map__16119.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16119.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16119):map__16119);
var ast = map__16119__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16119__$1,cljs.core.cst$kw$name);
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16119__$1,cljs.core.cst$kw$uses);
var use_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16119__$1,cljs.core.cst$kw$use_DASH_macros);
var missing_uses = ((((cljs.analyzer._STAR_analyze_deps_STAR_) && (cljs.core.seq(uses))))?cljs.analyzer.missing_uses(uses,env):null);
var maybe_macros = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc,uses,cljs.core.keys(missing_uses));
var remove_missing_uses = ((function (missing_uses,maybe_macros,map__16119,map__16119__$1,ast,name,uses,use_macros){
return (function (p1__16115_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc,p1__16115_SHARP_,cljs.core.keys(missing_uses));
});})(missing_uses,maybe_macros,map__16119,map__16119__$1,ast,name,uses,use_macros))
;
var ast_SINGLEQUOTE_ = cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(ast,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$use_DASH_macros], null),((function (missing_uses,maybe_macros,remove_missing_uses,map__16119,map__16119__$1,ast,name,uses,use_macros){
return (function (p1__16116_SHARP_){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([p1__16116_SHARP_,cljs.analyzer.check_use_macros.cljs$core$IFn$_invoke$arity$3(use_macros,missing_uses,env)], 0)),cljs.analyzer.inferred_use_macros(maybe_macros,env)], 0));
});})(missing_uses,maybe_macros,remove_missing_uses,map__16119,map__16119__$1,ast,name,uses,use_macros))
),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$uses], null),remove_missing_uses);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.env._STAR_compiler_STAR_,((function (missing_uses,maybe_macros,remove_missing_uses,ast_SINGLEQUOTE_,map__16119,map__16119__$1,ast,name,uses,use_macros){
return (function (p1__16117_SHARP_){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(p1__16117_SHARP_,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,name,cljs.core.cst$kw$use_DASH_macros], null),cljs.core.merge,cljs.core.cst$kw$use_DASH_macros.cljs$core$IFn$_invoke$arity$1(ast_SINGLEQUOTE_)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,name,cljs.core.cst$kw$uses], null),remove_missing_uses);
});})(missing_uses,maybe_macros,remove_missing_uses,ast_SINGLEQUOTE_,map__16119,map__16119__$1,ast,name,uses,use_macros))
);

return ast_SINGLEQUOTE_;
});
cljs.analyzer.check_rename_macros_inferring_missing = (function cljs$analyzer$check_rename_macros_inferring_missing(p__16124,env){
var map__16125 = p__16124;
var map__16125__$1 = (((((!((map__16125 == null))))?(((((map__16125.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16125.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16125):map__16125);
var ast = map__16125__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16125__$1,cljs.core.cst$kw$name);
var renames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16125__$1,cljs.core.cst$kw$renames);
var missing_renames = ((((cljs.analyzer._STAR_analyze_deps_STAR_) && (cljs.core.seq(renames))))?cljs.analyzer.missing_renames(renames,env):null);
var maybe_macros = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc,renames,cljs.core.keys(missing_renames));
var missing_rename_macros = cljs.analyzer.inferred_rename_macros(missing_renames,env);
var remove_missing_renames = ((function (missing_renames,maybe_macros,missing_rename_macros,map__16125,map__16125__$1,ast,name,renames){
return (function (p1__16121_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc,p1__16121_SHARP_,cljs.core.keys(missing_renames));
});})(missing_renames,maybe_macros,missing_rename_macros,map__16125,map__16125__$1,ast,name,renames))
;
var ast_SINGLEQUOTE_ = cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(ast,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rename_DASH_macros], null),((function (missing_renames,maybe_macros,missing_rename_macros,remove_missing_renames,map__16125,map__16125__$1,ast,name,renames){
return (function (p1__16122_SHARP_){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([p1__16122_SHARP_,missing_rename_macros], 0)),cljs.analyzer.inferred_rename_macros(maybe_macros,env)], 0));
});})(missing_renames,maybe_macros,missing_rename_macros,remove_missing_renames,map__16125,map__16125__$1,ast,name,renames))
),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$renames], null),remove_missing_renames);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.env._STAR_compiler_STAR_,((function (missing_renames,maybe_macros,missing_rename_macros,remove_missing_renames,ast_SINGLEQUOTE_,map__16125,map__16125__$1,ast,name,renames){
return (function (p1__16123_SHARP_){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(p1__16123_SHARP_,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,name,cljs.core.cst$kw$rename_DASH_macros], null),cljs.core.merge,cljs.core.cst$kw$rename_DASH_macros.cljs$core$IFn$_invoke$arity$1(ast_SINGLEQUOTE_)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,name,cljs.core.cst$kw$renames], null),remove_missing_renames);
});})(missing_renames,maybe_macros,missing_rename_macros,remove_missing_renames,ast_SINGLEQUOTE_,map__16125,map__16125__$1,ast,name,renames))
);

return ast_SINGLEQUOTE_;
});
cljs.analyzer.parse_ns_error_msg = (function cljs$analyzer$parse_ns_error_msg(spec,msg){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg),"; offending spec: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([spec], 0))].join('');
});
cljs.analyzer.basic_validate_ns_spec = (function cljs$analyzer$basic_validate_ns_spec(env,macros_QMARK_,spec){
if((((spec instanceof cljs.core.Symbol)) || (typeof spec === 'string') || (cljs.core.sequential_QMARK_(spec)))){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,cljs.analyzer.parse_ns_error_msg(spec,"Only [lib.ns & options] and lib.ns specs supported in :require / :require-macros"));
}

if(cljs.core.sequential_QMARK_(spec)){
if((((cljs.core.first(spec) instanceof cljs.core.Symbol)) || (typeof cljs.core.first(spec) === 'string'))){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,cljs.analyzer.parse_ns_error_msg(spec,"Library name must be specified as a symbol in :require / :require-macros"));
}

if(cljs.core.odd_QMARK_(cljs.core.count(spec))){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,cljs.analyzer.parse_ns_error_msg(spec,"Only :as alias, :refer (names) and :rename {from to} options supported in :require"));
}

if(cljs.core.every_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$as,null,cljs.core.cst$kw$rename,null,cljs.core.cst$kw$refer,null], null), null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),cljs.core.next(spec))))){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,cljs.analyzer.parse_ns_error_msg(spec,"Only :as, :refer and :rename options supported in :require / :require-macros"));
}

if((function (){var fs = cljs.core.frequencies(cljs.core.next(spec));
return ((((function (){var G__16131 = cljs.core.cst$kw$as;
var G__16132 = (0);
return (fs.cljs$core$IFn$_invoke$arity$2 ? fs.cljs$core$IFn$_invoke$arity$2(G__16131,G__16132) : fs(G__16131,G__16132));
})() <= (1))) && (((function (){var G__16133 = cljs.core.cst$kw$refer;
var G__16134 = (0);
return (fs.cljs$core$IFn$_invoke$arity$2 ? fs.cljs$core$IFn$_invoke$arity$2(G__16133,G__16134) : fs(G__16133,G__16134));
})() <= (1))));
})()){
return null;
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,cljs.analyzer.parse_ns_error_msg(spec,"Each of :as and :refer options may only be specified once in :require / :require-macros"));
}
} else {
return null;
}
});
cljs.analyzer.parse_ns_excludes = (function cljs$analyzer$parse_ns_excludes(env,args){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s,p__16136){
var vec__16137 = p__16136;
var seq__16138 = cljs.core.seq(vec__16137);
var first__16139 = cljs.core.first(seq__16138);
var seq__16138__$1 = cljs.core.next(seq__16138);
var k = first__16139;
var filters = seq__16138__$1;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.cst$kw$refer_DASH_clojure)){
if(cljs.core.seq(cljs.core.cst$kw$excludes.cljs$core$IFn$_invoke$arity$1(s))){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Only one :refer-clojure form is allowed per namespace definition");
} else {
}

var valid_kws = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$exclude,null,cljs.core.cst$kw$rename,null], null), null);
var xs = (function (){var fs = cljs.core.seq(filters);
var ret = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$excludes,cljs.core.PersistentHashSet.EMPTY,cljs.core.cst$kw$renames,cljs.core.PersistentArrayMap.EMPTY], null);
var err = (!(cljs.core.even_QMARK_(cljs.core.count(filters))));
while(true){
if(err === true){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Only [:refer-clojure :exclude (names)] and optionally `:rename {from to}` specs supported");
} else {
if((!((fs == null)))){
var kw = cljs.core.first(fs);
if(cljs.core.truth_((valid_kws.cljs$core$IFn$_invoke$arity$1 ? valid_kws.cljs$core$IFn$_invoke$arity$1(kw) : valid_kws(kw)))){
var refs = cljs.core.second(fs);
if((!(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kw,cljs.core.cst$kw$exclude)) && (cljs.core.sequential_QMARK_(refs)) && (cljs.core.every_QMARK_(cljs.core.symbol_QMARK_,refs)))) || (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kw,cljs.core.cst$kw$rename)) && (cljs.core.map_QMARK_(refs)) && (cljs.core.every_QMARK_(((function (fs,ret,err,refs,kw,valid_kws,vec__16137,seq__16138,first__16139,seq__16138__$1,k,filters){
return (function (p1__16135_SHARP_){
return cljs.core.every_QMARK_(cljs.core.symbol_QMARK_,p1__16135_SHARP_);
});})(fs,ret,err,refs,kw,valid_kws,vec__16137,seq__16138,first__16139,seq__16138__$1,k,filters))
,refs)))))))){
var G__16140 = fs;
var G__16141 = ret;
var G__16142 = true;
fs = G__16140;
ret = G__16141;
err = G__16142;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kw,cljs.core.cst$kw$exclude)){
var G__16143 = cljs.core.nnext(fs);
var G__16144 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(ret,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$excludes], null),cljs.core.into,refs);
var G__16145 = false;
fs = G__16143;
ret = G__16144;
err = G__16145;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kw,cljs.core.cst$kw$rename)){
var G__16146 = cljs.core.nnext(fs);
var G__16147 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(ret,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$renames], null),cljs.core.merge,refs);
var G__16148 = false;
fs = G__16146;
ret = G__16147;
err = G__16148;
continue;
} else {
return null;
}
}
}
} else {
var G__16149 = fs;
var G__16150 = ret;
var G__16151 = true;
fs = G__16149;
ret = G__16150;
err = G__16151;
continue;
}
} else {
return ret;

}
}
break;
}
})();
return cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.into,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s,xs], 0));
} else {
return s;
}
}),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$excludes,cljs.core.PersistentHashSet.EMPTY,cljs.core.cst$kw$renames,cljs.core.PersistentArrayMap.EMPTY], null),args);
});
cljs.analyzer.use__GT_require = (function cljs$analyzer$use__GT_require(env,p__16153){
var vec__16154 = p__16153;
var seq__16155 = cljs.core.seq(vec__16154);
var first__16156 = cljs.core.first(seq__16155);
var seq__16155__$1 = cljs.core.next(seq__16155);
var lib = first__16156;
var filters = seq__16155__$1;
var spec = vec__16154;
if((((lib instanceof cljs.core.Symbol)) && (cljs.core.odd_QMARK_(cljs.core.count(spec))))){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,cljs.analyzer.parse_ns_error_msg(spec,"Only [lib.ns :only (names)] and optionally `:rename {from to}` specs supported in :use / :use-macros"));
}

var fs = cljs.core.seq(filters);
var ret = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lib], null);
var err = false;
while(true){
if(err === true){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,cljs.analyzer.parse_ns_error_msg(spec,"Only [lib.ns :only (names)] and optionally `:rename {from to}` specs supported in :use / :use-macros"));
} else {
if((!((fs == null)))){
var kw = cljs.core.first(fs);
var only_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kw,cljs.core.cst$kw$only);
if(((only_QMARK_) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kw,cljs.core.cst$kw$rename)))){
if((!((cljs.core.some(cljs.core.PersistentHashSet.createAsIfByAssoc([((only_QMARK_)?cljs.core.cst$kw$refer:kw)]),ret) == null)))){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,cljs.analyzer.parse_ns_error_msg(spec,"Each of :only and :rename options may only be specified once in :use / :use-macros"));
} else {
var refs = cljs.core.second(fs);
if((!(((((only_QMARK_) && (cljs.core.sequential_QMARK_(refs)) && (cljs.core.every_QMARK_(cljs.core.symbol_QMARK_,refs)))) || (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kw,cljs.core.cst$kw$rename)) && (cljs.core.map_QMARK_(refs)) && (cljs.core.every_QMARK_(((function (fs,ret,err,refs,kw,only_QMARK_,vec__16154,seq__16155,first__16156,seq__16155__$1,lib,filters,spec){
return (function (p1__16152_SHARP_){
return cljs.core.every_QMARK_(cljs.core.symbol_QMARK_,p1__16152_SHARP_);
});})(fs,ret,err,refs,kw,only_QMARK_,vec__16154,seq__16155,first__16156,seq__16155__$1,lib,filters,spec))
,refs)))))))){
var G__16157 = fs;
var G__16158 = ret;
var G__16159 = true;
fs = G__16157;
ret = G__16158;
err = G__16159;
continue;
} else {
var G__16160 = cljs.core.nnext(fs);
var G__16161 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(ret,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((only_QMARK_)?cljs.core.cst$kw$refer:kw),refs], null));
var G__16162 = false;
fs = G__16160;
ret = G__16161;
err = G__16162;
continue;
}
}
} else {
var G__16163 = fs;
var G__16164 = ret;
var G__16165 = true;
fs = G__16163;
ret = G__16164;
err = G__16165;
continue;
}
} else {
if((!((cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$refer,null], null), null),ret) == null)))){
return ret;
} else {
var G__16166 = fs;
var G__16167 = ret;
var G__16168 = true;
fs = G__16166;
ret = G__16167;
err = G__16168;
continue;
}

}
}
break;
}
});
cljs.analyzer.parse_require_spec = (function cljs$analyzer$parse_require_spec(env,macros_QMARK_,deps,aliases,spec){
while(true){
if((((spec instanceof cljs.core.Symbol)) || (typeof spec === 'string'))){
var G__16185 = env;
var G__16186 = macros_QMARK_;
var G__16187 = deps;
var G__16188 = aliases;
var G__16189 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec], null);
env = G__16185;
macros_QMARK_ = G__16186;
deps = G__16187;
aliases = G__16188;
spec = G__16189;
continue;
} else {
cljs.analyzer.basic_validate_ns_spec(env,macros_QMARK_,spec);

var vec__16169 = spec;
var seq__16170 = cljs.core.seq(vec__16169);
var first__16171 = cljs.core.first(seq__16170);
var seq__16170__$1 = cljs.core.next(seq__16170);
var lib = first__16171;
var opts = seq__16170__$1;
var vec__16172 = (function (){var temp__5737__auto__ = cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$js_DASH_module_DASH_index,cljs.core.str.cljs$core$IFn$_invoke$arity$1(lib),cljs.core.cst$kw$name);
if((temp__5737__auto__ == null)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lib,null], null);
} else {
var js_module_name = temp__5737__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(js_module_name),lib], null);
}
})();
var lib__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16172,(0),null);
var js_module_provides = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16172,(1),null);
var map__16175 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,opts);
var map__16175__$1 = (((((!((map__16175 == null))))?(((((map__16175.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16175.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16175):map__16175);
var alias = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__16175__$1,cljs.core.cst$kw$as,((typeof lib__$1 === 'string')?cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.munge(lib__$1)):lib__$1));
var referred = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16175__$1,cljs.core.cst$kw$refer);
var renamed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16175__$1,cljs.core.cst$kw$rename);
var referred_without_renamed = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.keys(renamed)),referred));
var vec__16176 = (cljs.core.truth_(macros_QMARK_)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$require_DASH_macros,cljs.core.cst$kw$use_DASH_macros,cljs.core.cst$kw$rename_DASH_macros], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$require,cljs.core.cst$kw$use,cljs.core.cst$kw$rename], null));
var rk = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16176,(0),null);
var uk = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16176,(1),null);
var renk = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16176,(2),null);
if((((alias instanceof cljs.core.Symbol)) || ((alias == null)))){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,cljs.analyzer.parse_ns_error_msg(spec,":as must be followed by a symbol in :require / :require-macros"));
}

if((!((alias == null)))){
var alias_type_16190 = (cljs.core.truth_(macros_QMARK_)?cljs.core.cst$kw$macros:cljs.core.cst$kw$fns);
var lib_SINGLEQUOTE__16191 = (function (){var fexpr__16180 = alias_type_16190.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aliases));
return (fexpr__16180.cljs$core$IFn$_invoke$arity$1 ? fexpr__16180.cljs$core$IFn$_invoke$arity$1(alias) : fexpr__16180(alias));
})();
if((((!((lib_SINGLEQUOTE__16191 == null)))) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(lib__$1,lib_SINGLEQUOTE__16191)))){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,cljs.analyzer.parse_ns_error_msg(spec,":as alias must be unique"));
} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(aliases,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [alias_type_16190], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [alias,lib__$1], null),(cljs.core.truth_(js_module_provides)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [js_module_provides,lib__$1], null):null)], 0));
} else {
}

if(((((cljs.core.sequential_QMARK_(referred)) && (cljs.core.every_QMARK_(cljs.core.symbol_QMARK_,referred)))) || ((referred == null)))){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,cljs.analyzer.parse_ns_error_msg(spec,":refer must be followed by a sequence of symbols in :require / :require-macros"));
}

if(cljs.core.truth_(macros_QMARK_)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(deps,cljs.core.conj,lib__$1);
}

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(((!((alias == null))))?cljs.core.PersistentArrayMap.createAsIfByAssoc([rk,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.PersistentArrayMap.createAsIfByAssoc([alias,lib__$1]),cljs.core.PersistentArrayMap.createAsIfByAssoc([lib__$1,lib__$1]),(cljs.core.truth_(js_module_provides)?cljs.core.PersistentArrayMap.createAsIfByAssoc([js_module_provides,lib__$1]):null)], 0))]):null),(((!((referred_without_renamed == null))))?cljs.core.PersistentArrayMap.createAsIfByAssoc([uk,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(referred_without_renamed,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(lib__$1)))]):null),(((!((renamed == null))))?cljs.core.PersistentArrayMap.createAsIfByAssoc([renk,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (env,macros_QMARK_,deps,aliases,spec,vec__16169,seq__16170,first__16171,seq__16170__$1,lib,opts,vec__16172,lib__$1,js_module_provides,map__16175,map__16175__$1,alias,referred,renamed,referred_without_renamed,vec__16176,rk,uk,renk){
return (function (m,p__16181){
var vec__16182 = p__16181;
var original = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16182,(0),null);
var renamed__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16182,(1),null);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.createAsIfByAssoc([original]),referred))){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,["Renamed symbol ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(original)," not referred"].join(''));
}

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,renamed__$1,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(lib__$1),cljs.core.str.cljs$core$IFn$_invoke$arity$1(original)));
});})(env,macros_QMARK_,deps,aliases,spec,vec__16169,seq__16170,first__16171,seq__16170__$1,lib,opts,vec__16172,lib__$1,js_module_provides,map__16175,map__16175__$1,alias,referred,renamed,referred_without_renamed,vec__16176,rk,uk,renk))
,cljs.core.PersistentArrayMap.EMPTY,renamed)]):null)], 0));
}
break;
}
});
cljs.analyzer.parse_import_spec = (function cljs$analyzer$parse_import_spec(env,deps,spec){
if(((((cljs.core.sequential_QMARK_(spec)) && (cljs.core.every_QMARK_(cljs.core.symbol_QMARK_,spec)))) || ((((spec instanceof cljs.core.Symbol)) && ((cljs.core.namespace(spec) == null)))))){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,cljs.analyzer.parse_ns_error_msg(spec,"Only lib.ns.Ctor or [lib.ns Ctor*] spec supported in :import"));
}

var import_map = ((cljs.core.sequential_QMARK_(spec))?cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__16192_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[p1__16192_SHARP_,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(spec)),".",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__16192_SHARP_)].join(''))],null));
}),cljs.core.rest(spec))):cljs.core.PersistentArrayMap.createAsIfByAssoc([cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.last(clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(spec),/\./))),spec]));
var seq__16193_16209 = cljs.core.seq(import_map);
var chunk__16194_16210 = null;
var count__16195_16211 = (0);
var i__16196_16212 = (0);
while(true){
if((i__16196_16212 < count__16195_16211)){
var vec__16203_16213 = chunk__16194_16210.cljs$core$IIndexed$_nth$arity$2(null,i__16196_16212);
var __16214 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16203_16213,(0),null);
var spec_16215__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16203_16213,(1),null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(deps,cljs.core.conj,spec_16215__$1);


var G__16216 = seq__16193_16209;
var G__16217 = chunk__16194_16210;
var G__16218 = count__16195_16211;
var G__16219 = (i__16196_16212 + (1));
seq__16193_16209 = G__16216;
chunk__16194_16210 = G__16217;
count__16195_16211 = G__16218;
i__16196_16212 = G__16219;
continue;
} else {
var temp__5735__auto___16220 = cljs.core.seq(seq__16193_16209);
if(temp__5735__auto___16220){
var seq__16193_16221__$1 = temp__5735__auto___16220;
if(cljs.core.chunked_seq_QMARK_(seq__16193_16221__$1)){
var c__4550__auto___16222 = cljs.core.chunk_first(seq__16193_16221__$1);
var G__16223 = cljs.core.chunk_rest(seq__16193_16221__$1);
var G__16224 = c__4550__auto___16222;
var G__16225 = cljs.core.count(c__4550__auto___16222);
var G__16226 = (0);
seq__16193_16209 = G__16223;
chunk__16194_16210 = G__16224;
count__16195_16211 = G__16225;
i__16196_16212 = G__16226;
continue;
} else {
var vec__16206_16227 = cljs.core.first(seq__16193_16221__$1);
var __16228 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16206_16227,(0),null);
var spec_16229__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16206_16227,(1),null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(deps,cljs.core.conj,spec_16229__$1);


var G__16230 = cljs.core.next(seq__16193_16221__$1);
var G__16231 = null;
var G__16232 = (0);
var G__16233 = (0);
seq__16193_16209 = G__16230;
chunk__16194_16210 = G__16231;
count__16195_16211 = G__16232;
i__16196_16212 = G__16233;
continue;
}
} else {
}
}
break;
}

return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$import,import_map,cljs.core.cst$kw$require,import_map], null);
});
/**
 * Given a spec form check whether the spec namespace requires a macro file
 * of the same name. If so return true.
 */
cljs.analyzer.macro_autoload_ns_QMARK_ = (function cljs$analyzer$macro_autoload_ns_QMARK_(form){
if(cljs.analyzer._STAR_macro_infer_STAR_){
var ns = ((cljs.core.sequential_QMARK_(form))?cljs.core.first(form):form);
var map__16234 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns], null));
var map__16234__$1 = (((((!((map__16234 == null))))?(((((map__16234.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16234.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16234):map__16234);
var use_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16234__$1,cljs.core.cst$kw$use_DASH_macros);
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16234__$1,cljs.core.cst$kw$require_DASH_macros);
var or__4131__auto__ = cljs.core.some(cljs.core.PersistentHashSet.createAsIfByAssoc([ns]),cljs.core.vals(use_macros));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.some(cljs.core.PersistentHashSet.createAsIfByAssoc([ns]),cljs.core.vals(require_macros));
}
} else {
return null;
}
});
/**
 * Given a symbol that starts with clojure as the first segment return the
 * same symbol with the first segment replaced with cljs
 */
cljs.analyzer.clj_ns__GT_cljs_ns = (function cljs$analyzer$clj_ns__GT_cljs_ns(sym){
var segs = clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name(sym),/\./);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("clojure",cljs.core.first(segs))){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",cljs.core.cons("cljs",cljs.core.next(segs))));
} else {
return sym;
}
});
cljs.analyzer.canonicalize_specs = (function cljs$analyzer$canonicalize_specs(specs){
var canonicalize = (function cljs$analyzer$canonicalize_specs_$_canonicalize(quoted_spec_or_kw){
if((quoted_spec_or_kw instanceof cljs.core.Keyword)){
return quoted_spec_or_kw;
} else {
var spec = cljs.core.second(quoted_spec_or_kw);
if(((cljs.core.vector_QMARK_(spec)) || (cljs.core.map_QMARK_(spec)))){
return spec;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec], null);
}
}
});
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(canonicalize,specs);
});
cljs.analyzer.canonicalize_import_specs = (function cljs$analyzer$canonicalize_import_specs(specs){
var canonicalize = (function cljs$analyzer$canonicalize_import_specs_$_canonicalize(quoted_spec_or_kw){
if((quoted_spec_or_kw instanceof cljs.core.Keyword)){
return quoted_spec_or_kw;
} else {
return cljs.core.second(quoted_spec_or_kw);
}
});
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(canonicalize,specs);
});
/**
 * Given an original set of ns specs desugar :include-macros and :refer-macros
 * usage into only primitive spec forms - :use, :require, :use-macros,
 * :require-macros. If a library includes a macro file of with the same name
 * as the namespace will also be desugared.
 */
cljs.analyzer.desugar_ns_specs = (function cljs$analyzer$desugar_ns_specs(args){
var map__16237 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__16238){
var vec__16239 = p__16238;
var seq__16240 = cljs.core.seq(vec__16239);
var first__16241 = cljs.core.first(seq__16240);
var seq__16240__$1 = cljs.core.next(seq__16240);
var k = first__16241;
var specs = seq__16240__$1;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,specs)], null);
}),args));
var map__16237__$1 = (((((!((map__16237 == null))))?(((((map__16237.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16237.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16237):map__16237);
var indexed = map__16237__$1;
var require = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16237__$1,cljs.core.cst$kw$require);
var sugar_keys = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$include_DASH_macros,null,cljs.core.cst$kw$refer_DASH_macros,null], null), null);
var remove_from_spec = ((function (map__16237,map__16237__$1,indexed,require,sugar_keys){
return (function (pred,spec){
while(true){
if(cljs.core.not((function (){var and__4120__auto__ = cljs.core.sequential_QMARK_(spec);
if(and__4120__auto__){
return cljs.core.some(pred,spec);
} else {
return and__4120__auto__;
}
})())){
return spec;
} else {
var vec__16243 = cljs.core.split_with(cljs.core.complement(pred),spec);
var l = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16243,(0),null);
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16243,(1),null);
var G__16250 = pred;
var G__16251 = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(l,cljs.core.drop.cljs$core$IFn$_invoke$arity$2((2),r));
pred = G__16250;
spec = G__16251;
continue;
}
break;
}
});})(map__16237,map__16237__$1,indexed,require,sugar_keys))
;
var replace_refer_macros = ((function (map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec){
return (function (spec){
if((!(cljs.core.sequential_QMARK_(spec)))){
return spec;
} else {
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec){
return (function (x){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x,cljs.core.cst$kw$refer_DASH_macros)){
return cljs.core.cst$kw$refer;
} else {
return x;
}
});})(map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec))
,spec);
}
});})(map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec))
;
var reload_spec_QMARK_ = ((function (map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec,replace_refer_macros){
return (function (p1__16236_SHARP_){
var fexpr__16246 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$reload,null,cljs.core.cst$kw$reload_DASH_all,null], null), null);
return (fexpr__16246.cljs$core$IFn$_invoke$arity$1 ? fexpr__16246.cljs$core$IFn$_invoke$arity$1(p1__16236_SHARP_) : fexpr__16246(p1__16236_SHARP_));
});})(map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec,replace_refer_macros))
;
var to_macro_specs = ((function (map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec,replace_refer_macros,reload_spec_QMARK_){
return (function (specs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec,replace_refer_macros,reload_spec_QMARK_){
return (function (x){
if(cljs.core.not(reload_spec_QMARK_(x))){
return replace_refer_macros(remove_from_spec(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$rename,null], null), null),remove_from_spec(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$refer,null], null), null),remove_from_spec(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$include_DASH_macros,null], null), null),x))));
} else {
return x;
}
});})(map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec,replace_refer_macros,reload_spec_QMARK_))
,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec,replace_refer_macros,reload_spec_QMARK_){
return (function (x){
var or__4131__auto__ = (function (){var and__4120__auto__ = cljs.core.sequential_QMARK_(x);
if(and__4120__auto__){
return cljs.core.some(sugar_keys,x);
} else {
return and__4120__auto__;
}
})();
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = reload_spec_QMARK_(x);
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
return cljs.analyzer.macro_autoload_ns_QMARK_(x);
}
}
});})(map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec,replace_refer_macros,reload_spec_QMARK_))
,specs));
});})(map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec,replace_refer_macros,reload_spec_QMARK_))
;
var remove_sugar = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(remove_from_spec,sugar_keys);
var temp__5737__auto__ = cljs.core.seq(to_macro_specs(require));
if((temp__5737__auto__ == null)){
return args;
} else {
var require_specs = temp__5737__auto__;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (require_specs,temp__5737__auto__,map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec,replace_refer_macros,reload_spec_QMARK_,to_macro_specs,remove_sugar){
return (function (x){
if(cljs.core.not(reload_spec_QMARK_(x))){
var vec__16247 = x;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16247,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16247,(1),null);
return cljs.core.cons(k,cljs.core.map.cljs$core$IFn$_invoke$arity$2(remove_sugar,v));
} else {
return x;
}
});})(require_specs,temp__5737__auto__,map__16237,map__16237__$1,indexed,require,sugar_keys,remove_from_spec,replace_refer_macros,reload_spec_QMARK_,to_macro_specs,remove_sugar))
,cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(indexed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$require_DASH_macros], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.into,cljs.core.PersistentVector.EMPTY),require_specs));
}
});
cljs.analyzer.find_def_clash = (function cljs$analyzer$find_def_clash(env,ns,segments){
var to_check = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (xs){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",cljs.core.butlast(xs))),cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.last(xs))], null);
}),cljs.core.drop.cljs$core$IFn$_invoke$arity$2((2),cljs.core.reductions.cljs$core$IFn$_invoke$arity$3(cljs.core.conj,cljs.core.PersistentVector.EMPTY,segments)));
var seq__16252 = cljs.core.seq(to_check);
var chunk__16253 = null;
var count__16254 = (0);
var i__16255 = (0);
while(true){
if((i__16255 < count__16254)){
var vec__16262 = chunk__16253.cljs$core$IIndexed$_nth$arity$2(null,i__16255);
var clash_ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16262,(0),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16262,(1),null);
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,clash_ns,cljs.core.cst$kw$defs,name], null)))){
cljs.analyzer.warning(cljs.core.cst$kw$ns_DASH_var_DASH_clash,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ns,ns,cljs.core.cst$kw$var,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(clash_ns),cljs.core.str.cljs$core$IFn$_invoke$arity$1(name))], null));
} else {
}


var G__16268 = seq__16252;
var G__16269 = chunk__16253;
var G__16270 = count__16254;
var G__16271 = (i__16255 + (1));
seq__16252 = G__16268;
chunk__16253 = G__16269;
count__16254 = G__16270;
i__16255 = G__16271;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__16252);
if(temp__5735__auto__){
var seq__16252__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__16252__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__16252__$1);
var G__16272 = cljs.core.chunk_rest(seq__16252__$1);
var G__16273 = c__4550__auto__;
var G__16274 = cljs.core.count(c__4550__auto__);
var G__16275 = (0);
seq__16252 = G__16272;
chunk__16253 = G__16273;
count__16254 = G__16274;
i__16255 = G__16275;
continue;
} else {
var vec__16265 = cljs.core.first(seq__16252__$1);
var clash_ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16265,(0),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16265,(1),null);
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,clash_ns,cljs.core.cst$kw$defs,name], null)))){
cljs.analyzer.warning(cljs.core.cst$kw$ns_DASH_var_DASH_clash,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ns,ns,cljs.core.cst$kw$var,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(clash_ns),cljs.core.str.cljs$core$IFn$_invoke$arity$1(name))], null));
} else {
}


var G__16276 = cljs.core.next(seq__16252__$1);
var G__16277 = null;
var G__16278 = (0);
var G__16279 = (0);
seq__16252 = G__16276;
chunk__16253 = G__16277;
count__16254 = G__16278;
i__16255 = G__16279;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.analyzer.macro_ns_name = (function cljs$analyzer$macro_ns_name(name){
var name_str = cljs.core.str.cljs$core$IFn$_invoke$arity$1(name);
if(cljs.core.not(goog.string.endsWith(name_str,"$macros"))){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([name_str,"$macros"].join(''));
} else {
return name;
}
});
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$ns,(function (_,env,p__16282,___$1,opts){
var vec__16283 = p__16282;
var seq__16284 = cljs.core.seq(vec__16283);
var first__16285 = cljs.core.first(seq__16284);
var seq__16284__$1 = cljs.core.next(seq__16284);
var ___$2 = first__16285;
var first__16285__$1 = cljs.core.first(seq__16284__$1);
var seq__16284__$2 = cljs.core.next(seq__16284__$1);
var name = first__16285__$1;
var args = seq__16284__$2;
var form = vec__16283;
if(cljs.analyzer._STAR_allow_ns_STAR_){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Namespace declarations must appear at the top-level.");
}

if((name instanceof cljs.core.Symbol)){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Namespaces must be named by a symbol.");
}

var name__$1 = (function (){var G__16286 = name;
if(cljs.core.truth_(cljs.core.cst$kw$macros_DASH_ns.cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.analyzer.macro_ns_name(G__16286);
} else {
return G__16286;
}
})();
var segments_16322 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name(name__$1),/\./);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(segments_16322))){
cljs.analyzer.warning(cljs.core.cst$kw$single_DASH_segment_DASH_namespace,env,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,name__$1], null));
} else {
}

var segment_16323 = cljs.core.some(cljs.analyzer.js_reserved,segments_16322);
if((!((segment_16323 == null)))){
cljs.analyzer.warning(cljs.core.cst$kw$munged_DASH_namespace,env,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,name__$1], null));
} else {
}

cljs.analyzer.find_def_clash(env,name__$1,segments_16322);

var docstring = ((typeof cljs.core.first(args) === 'string')?cljs.core.first(args):null);
var mdocstr = cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(name__$1));
var args__$1 = (((!((docstring == null))))?cljs.core.next(args):args);
var metadata = ((cljs.core.map_QMARK_(cljs.core.first(args__$1)))?cljs.core.first(args__$1):null);
var args__$2 = cljs.analyzer.desugar_ns_specs((((!((metadata == null))))?cljs.core.next(args__$1):args__$1));
var name__$2 = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$3(name__$1,cljs.core.merge,metadata);
var map__16287 = cljs.analyzer.parse_ns_excludes(env,args__$2);
var map__16287__$1 = (((((!((map__16287 == null))))?(((((map__16287.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16287.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16287):map__16287);
var excludes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16287__$1,cljs.core.cst$kw$excludes);
var core_renames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16287__$1,cljs.core.cst$kw$renames);
var core_renames__$1 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form){
return (function (m,p__16293){
var vec__16294 = p__16293;
var original = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16294,(0),null);
var renamed = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16294,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,renamed,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.core",cljs.core.str.cljs$core$IFn$_invoke$arity$1(original)));
});})(docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form))
,cljs.core.PersistentArrayMap.EMPTY,core_renames);
var deps = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var aliases = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$fns,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$macros,cljs.core.PersistentArrayMap.EMPTY], null));
var spec_parsers = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$require,cljs.core.partial.cljs$core$IFn$_invoke$arity$variadic(cljs.analyzer.parse_require_spec,env,false,deps,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([aliases], 0)),cljs.core.cst$kw$require_DASH_macros,cljs.core.partial.cljs$core$IFn$_invoke$arity$variadic(cljs.analyzer.parse_require_spec,env,true,deps,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([aliases], 0)),cljs.core.cst$kw$use,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$variadic(cljs.analyzer.parse_require_spec,env,false,deps,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([aliases], 0)),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.use__GT_require,env)),cljs.core.cst$kw$use_DASH_macros,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$variadic(cljs.analyzer.parse_require_spec,env,true,deps,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([aliases], 0)),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.use__GT_require,env)),cljs.core.cst$kw$import,cljs.core.partial.cljs$core$IFn$_invoke$arity$3(cljs.analyzer.parse_import_spec,env,deps)], null);
var valid_forms = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$use_DASH_macros,null,cljs.core.cst$kw$use,null,cljs.core.cst$kw$require,null,cljs.core.cst$kw$require_DASH_macros,null,cljs.core.cst$kw$import,null], null), null));
var reload = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$use,null,cljs.core.cst$kw$require,null,cljs.core.cst$kw$use_DASH_macros,null,cljs.core.cst$kw$require_DASH_macros,null], null));
var reloads = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var map__16288 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form){
return (function (m,p__16297){
var vec__16298 = p__16297;
var seq__16299 = cljs.core.seq(vec__16298);
var first__16300 = cljs.core.first(seq__16299);
var seq__16299__$1 = cljs.core.next(seq__16299);
var k = first__16300;
var libs = seq__16299__$1;
var libspec = vec__16298;
if(cljs.core.truth_((function (){var fexpr__16301 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$use_DASH_macros,null,cljs.core.cst$kw$use,null,cljs.core.cst$kw$require,null,cljs.core.cst$kw$require_DASH_macros,null,cljs.core.cst$kw$import,null], null), null);
return (fexpr__16301.cljs$core$IFn$_invoke$arity$1 ? fexpr__16301.cljs$core$IFn$_invoke$arity$1(k) : fexpr__16301(k));
})())){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,["Only :refer-clojure, :require, :require-macros, :use, :use-macros, and :import libspecs supported. Got ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(libspec)," instead."].join(''));
}

if(cljs.core.truth_((function (){var fexpr__16302 = cljs.core.deref(valid_forms);
return (fexpr__16302.cljs$core$IFn$_invoke$arity$1 ? fexpr__16302.cljs$core$IFn$_invoke$arity$1(k) : fexpr__16302(k));
})())){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,["Only one ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)," form is allowed per namespace definition"].join(''));
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(valid_forms,cljs.core.disj,k);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$import,k)){
} else {
if((!((cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$reload,null], null), null),libs) == null)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reload,cljs.core.assoc,k,cljs.core.cst$kw$reload);
} else {
}

if((!((cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$reload_DASH_all,null], null), null),libs) == null)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reload,cljs.core.assoc,k,cljs.core.cst$kw$reload_DASH_all);
} else {
}
}

var temp__5735__auto___16324 = cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (vec__16298,seq__16299,first__16300,seq__16299__$1,k,libs,libspec,docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form){
return (function (p1__16280_SHARP_){
return cljs.core.cst$kw$reload.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(p1__16280_SHARP_));
});})(vec__16298,seq__16299,first__16300,seq__16299__$1,k,libs,libspec,docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form))
,libs));
if(temp__5735__auto___16324){
var xs_16325 = temp__5735__auto___16324;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reloads,cljs.core.assoc,k,cljs.core.zipmap(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,xs_16325),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (xs_16325,temp__5735__auto___16324,vec__16298,seq__16299,first__16300,seq__16299__$1,k,libs,libspec,docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form){
return (function (p1__16281_SHARP_){
return cljs.core.cst$kw$reload.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(p1__16281_SHARP_));
});})(xs_16325,temp__5735__auto___16324,vec__16298,seq__16299,first__16300,seq__16299__$1,k,libs,libspec,docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form))
,xs_16325)));
} else {
}

return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.merge_with,cljs.core.merge,m,cljs.core.map.cljs$core$IFn$_invoke$arity$2((spec_parsers.cljs$core$IFn$_invoke$arity$1 ? spec_parsers.cljs$core$IFn$_invoke$arity$1(k) : spec_parsers(k)),cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$reload,null,cljs.core.cst$kw$reload_DASH_all,null], null), null),libs)));
});})(docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form))
,cljs.core.PersistentArrayMap.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(((function (docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form){
return (function (p__16303){
var vec__16304 = p__16303;
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16304,(0),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(r,cljs.core.cst$kw$refer_DASH_clojure);
});})(docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form))
,args__$2));
var map__16288__$1 = (((((!((map__16288 == null))))?(((((map__16288.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16288.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16288):map__16288);
var params = map__16288__$1;
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16288__$1,cljs.core.cst$kw$use);
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16288__$1,cljs.core.cst$kw$require);
var renames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16288__$1,cljs.core.cst$kw$rename);
var use_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16288__$1,cljs.core.cst$kw$use_DASH_macros);
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16288__$1,cljs.core.cst$kw$require_DASH_macros);
var rename_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16288__$1,cljs.core.cst$kw$rename_DASH_macros);
var imports = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16288__$1,cljs.core.cst$kw$import);
var vec__16289 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,map__16288,map__16288__$1,params,uses,requires,renames,use_macros,require_macros,rename_macros,imports,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form){
return (function (spec_map){
if(cljs.core.truth_(cljs.core.cst$kw$macros_DASH_ns.cljs$core$IFn$_invoke$arity$1(opts))){
var ns = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(cljs.core.str.cljs$core$IFn$_invoke$arity$1(name__$2),(0),(cljs.core.count(cljs.core.str.cljs$core$IFn$_invoke$arity$1(name__$2)) - (7))));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (ns,docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,map__16288,map__16288__$1,params,uses,requires,renames,use_macros,require_macros,rename_macros,imports,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form){
return (function (m,p__16308){
var vec__16309 = p__16308;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16309,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16309,(1),null);
var G__16312 = m;
if((!(cljs.core.symbol_identical_QMARK_(v,ns)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16312,k,v);
} else {
return G__16312;
}
});})(ns,docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,map__16288,map__16288__$1,params,uses,requires,renames,use_macros,require_macros,rename_macros,imports,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form))
,cljs.core.PersistentArrayMap.EMPTY,spec_map);
} else {
return spec_map;
}
});})(docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,map__16288,map__16288__$1,params,uses,requires,renames,use_macros,require_macros,rename_macros,imports,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [require_macros,use_macros], null));
var require_macros__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16289,(0),null);
var use_macros__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16289,(1),null);
cljs.analyzer._STAR_cljs_ns_STAR_ = name__$2;

var ns_info = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$rename_DASH_macros,cljs.core.cst$kw$renames,cljs.core.cst$kw$use_DASH_macros,cljs.core.cst$kw$excludes,cljs.core.cst$kw$name,cljs.core.cst$kw$imports,cljs.core.cst$kw$requires,cljs.core.cst$kw$uses,cljs.core.cst$kw$require_DASH_macros,cljs.core.cst$kw$doc],[rename_macros,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([renames,core_renames__$1], 0)),use_macros__$1,excludes,name__$2,imports,requires,uses,require_macros__$1,(function (){var or__4131__auto__ = docstring;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return mdocstr;
}
})()]);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.env._STAR_compiler_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,name__$2], null),cljs.core.merge,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([ns_info], 0));

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$op,cljs.core.cst$kw$ns,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$deps,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(deps))),cljs.core.cst$kw$reload,cljs.core.deref(reload),cljs.core.cst$kw$reloads,cljs.core.deref(reloads)], null),(function (){var G__16313 = ns_info;
var G__16313__$1 = (cljs.core.truth_((function (){var G__16315 = cljs.core.cst$kw$use;
var fexpr__16314 = cljs.core.deref(reload);
return (fexpr__16314.cljs$core$IFn$_invoke$arity$1 ? fexpr__16314.cljs$core$IFn$_invoke$arity$1(G__16315) : fexpr__16314(G__16315));
})())?cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(G__16313,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$uses], null),((function (G__16313,ns_info,docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,map__16288,map__16288__$1,params,uses,requires,renames,use_macros,require_macros,rename_macros,imports,vec__16289,require_macros__$1,use_macros__$1,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form){
return (function (m){
return cljs.core.with_meta(m,cljs.core.PersistentArrayMap.createAsIfByAssoc([(function (){var G__16317 = cljs.core.cst$kw$use;
var fexpr__16316 = cljs.core.deref(reload);
return (fexpr__16316.cljs$core$IFn$_invoke$arity$1 ? fexpr__16316.cljs$core$IFn$_invoke$arity$1(G__16317) : fexpr__16316(G__16317));
})(),true]));
});})(G__16313,ns_info,docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,map__16288,map__16288__$1,params,uses,requires,renames,use_macros,require_macros,rename_macros,imports,vec__16289,require_macros__$1,use_macros__$1,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form))
):G__16313);
if(cljs.core.truth_((function (){var G__16319 = cljs.core.cst$kw$require;
var fexpr__16318 = cljs.core.deref(reload);
return (fexpr__16318.cljs$core$IFn$_invoke$arity$1 ? fexpr__16318.cljs$core$IFn$_invoke$arity$1(G__16319) : fexpr__16318(G__16319));
})())){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(G__16313__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$requires], null),((function (G__16313,G__16313__$1,ns_info,docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,map__16288,map__16288__$1,params,uses,requires,renames,use_macros,require_macros,rename_macros,imports,vec__16289,require_macros__$1,use_macros__$1,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form){
return (function (m){
return cljs.core.with_meta(m,cljs.core.PersistentArrayMap.createAsIfByAssoc([(function (){var G__16321 = cljs.core.cst$kw$require;
var fexpr__16320 = cljs.core.deref(reload);
return (fexpr__16320.cljs$core$IFn$_invoke$arity$1 ? fexpr__16320.cljs$core$IFn$_invoke$arity$1(G__16321) : fexpr__16320(G__16321));
})(),true]));
});})(G__16313,G__16313__$1,ns_info,docstring,mdocstr,args__$1,metadata,args__$2,name__$2,map__16287,map__16287__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,valid_forms,reload,reloads,map__16288,map__16288__$1,params,uses,requires,renames,use_macros,require_macros,rename_macros,imports,vec__16289,require_macros__$1,use_macros__$1,name__$1,vec__16283,seq__16284,first__16285,seq__16284__$1,___$2,first__16285__$1,seq__16284__$2,name,args,form))
);
} else {
return G__16313__$1;
}
})()], 0));
}));
cljs.analyzer.check_duplicate_aliases = (function cljs$analyzer$check_duplicate_aliases(env,old,new$){
var ns_name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(old);
var seq__16326 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$requires,cljs.core.cst$kw$require_DASH_macros], null));
var chunk__16327 = null;
var count__16328 = (0);
var i__16329 = (0);
while(true){
if((i__16329 < count__16328)){
var k = chunk__16327.cljs$core$IIndexed$_nth$arity$2(null,i__16329);
var old_aliases_16346 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(old,k);
var new_aliases_16347 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(new$,k);
var temp__5739__auto___16348 = cljs.core.some(cljs.core.set(cljs.core.keys(new_aliases_16347)),cljs.core.keys(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(((function (seq__16326,chunk__16327,count__16328,i__16329,old_aliases_16346,new_aliases_16347,k,ns_name){
return (function (p__16338){
var vec__16339 = p__16338;
var k__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16339,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16339,(1),null);
var entry = vec__16339;
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k__$1,v)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(entry,cljs.core.find(new_aliases_16347,k__$1))));
});})(seq__16326,chunk__16327,count__16328,i__16329,old_aliases_16346,new_aliases_16347,k,ns_name))
,old_aliases_16346)));
if((temp__5739__auto___16348 == null)){
} else {
var alias_16349 = temp__5739__auto___16348;
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,["Alias ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(alias_16349)," already exists in namespace ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns_name),", aliasing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(old_aliases_16346,alias_16349))].join(''));
}


var G__16350 = seq__16326;
var G__16351 = chunk__16327;
var G__16352 = count__16328;
var G__16353 = (i__16329 + (1));
seq__16326 = G__16350;
chunk__16327 = G__16351;
count__16328 = G__16352;
i__16329 = G__16353;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__16326);
if(temp__5735__auto__){
var seq__16326__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__16326__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__16326__$1);
var G__16354 = cljs.core.chunk_rest(seq__16326__$1);
var G__16355 = c__4550__auto__;
var G__16356 = cljs.core.count(c__4550__auto__);
var G__16357 = (0);
seq__16326 = G__16354;
chunk__16327 = G__16355;
count__16328 = G__16356;
i__16329 = G__16357;
continue;
} else {
var k = cljs.core.first(seq__16326__$1);
var old_aliases_16358 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(old,k);
var new_aliases_16359 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(new$,k);
var temp__5739__auto___16360 = cljs.core.some(cljs.core.set(cljs.core.keys(new_aliases_16359)),cljs.core.keys(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(((function (seq__16326,chunk__16327,count__16328,i__16329,old_aliases_16358,new_aliases_16359,k,seq__16326__$1,temp__5735__auto__,ns_name){
return (function (p__16342){
var vec__16343 = p__16342;
var k__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16343,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16343,(1),null);
var entry = vec__16343;
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k__$1,v)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(entry,cljs.core.find(new_aliases_16359,k__$1))));
});})(seq__16326,chunk__16327,count__16328,i__16329,old_aliases_16358,new_aliases_16359,k,seq__16326__$1,temp__5735__auto__,ns_name))
,old_aliases_16358)));
if((temp__5739__auto___16360 == null)){
} else {
var alias_16361 = temp__5739__auto___16360;
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,["Alias ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(alias_16361)," already exists in namespace ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns_name),", aliasing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(old_aliases_16358,alias_16361))].join(''));
}


var G__16362 = cljs.core.next(seq__16326__$1);
var G__16363 = null;
var G__16364 = (0);
var G__16365 = (0);
seq__16326 = G__16362;
chunk__16327 = G__16363;
count__16328 = G__16364;
i__16329 = G__16365;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$ns_STAR_,(function (_,env,p__16369,___$1,opts){
var vec__16370 = p__16369;
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16370,(0),null);
var quoted_specs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16370,(1),null);
var form = vec__16370;
var temp__5735__auto___16398 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(((function (vec__16370,___$2,quoted_specs,form){
return (function (p1__16366_SHARP_){
return ((cljs.core.seq_QMARK_(p1__16366_SHARP_)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$quote,cljs.core.first(p1__16366_SHARP_))));
});})(vec__16370,___$2,quoted_specs,form))
,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.keyword_QMARK_,quoted_specs)));
if(cljs.core.truth_(temp__5735__auto___16398)){
var not_quoted_16399 = temp__5735__auto___16398;
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,["Arguments to ",cljs.core.name(cljs.core.first(quoted_specs))," must be quoted. Offending spec: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(not_quoted_16399)].join(''));
} else {
}

if(cljs.analyzer._STAR_allow_ns_STAR_){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,["Calls to `",cljs.core.name(cljs.core.first(quoted_specs)),"` must appear at the top-level."].join(''));
}

var specs = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$import,cljs.core.first(quoted_specs)))?cljs.analyzer.canonicalize_import_specs(quoted_specs):cljs.analyzer.canonicalize_specs(quoted_specs));
var name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env));
var args = cljs.analyzer.desugar_ns_specs((new cljs.core.List(null,specs,null,(1),null)));
var map__16373 = cljs.analyzer.parse_ns_excludes(env,args);
var map__16373__$1 = (((((!((map__16373 == null))))?(((((map__16373.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16373.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16373):map__16373);
var excludes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16373__$1,cljs.core.cst$kw$excludes);
var core_renames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16373__$1,cljs.core.cst$kw$renames);
var core_renames__$1 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (specs,name,args,map__16373,map__16373__$1,excludes,core_renames,vec__16370,___$2,quoted_specs,form){
return (function (m,p__16376){
var vec__16377 = p__16376;
var original = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16377,(0),null);
var renamed = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16377,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,renamed,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.core",cljs.core.str.cljs$core$IFn$_invoke$arity$1(original)));
});})(specs,name,args,map__16373,map__16373__$1,excludes,core_renames,vec__16370,___$2,quoted_specs,form))
,cljs.core.PersistentArrayMap.EMPTY,core_renames);
var deps = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var aliases = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$fns,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$macros,cljs.core.PersistentArrayMap.EMPTY], null));
var spec_parsers = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$require,cljs.core.partial.cljs$core$IFn$_invoke$arity$variadic(cljs.analyzer.parse_require_spec,env,false,deps,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([aliases], 0)),cljs.core.cst$kw$require_DASH_macros,cljs.core.partial.cljs$core$IFn$_invoke$arity$variadic(cljs.analyzer.parse_require_spec,env,true,deps,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([aliases], 0)),cljs.core.cst$kw$use,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$variadic(cljs.analyzer.parse_require_spec,env,false,deps,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([aliases], 0)),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.use__GT_require,env)),cljs.core.cst$kw$use_DASH_macros,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$variadic(cljs.analyzer.parse_require_spec,env,true,deps,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([aliases], 0)),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.use__GT_require,env)),cljs.core.cst$kw$import,cljs.core.partial.cljs$core$IFn$_invoke$arity$3(cljs.analyzer.parse_import_spec,env,deps)], null);
var reload = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$use,null,cljs.core.cst$kw$require,null,cljs.core.cst$kw$use_DASH_macros,null,cljs.core.cst$kw$require_DASH_macros,null], null));
var reloads = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var map__16374 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (specs,name,args,map__16373,map__16373__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,reload,reloads,vec__16370,___$2,quoted_specs,form){
return (function (m,p__16380){
var vec__16381 = p__16380;
var seq__16382 = cljs.core.seq(vec__16381);
var first__16383 = cljs.core.first(seq__16382);
var seq__16382__$1 = cljs.core.next(seq__16382);
var k = first__16383;
var libs = seq__16382__$1;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$import,k)){
} else {
if((!((cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$reload,null], null), null),libs) == null)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reload,cljs.core.assoc,k,cljs.core.cst$kw$reload);
} else {
}

if((!((cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$reload_DASH_all,null], null), null),libs) == null)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reload,cljs.core.assoc,k,cljs.core.cst$kw$reload_DASH_all);
} else {
}
}

var temp__5739__auto___16400 = cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (vec__16381,seq__16382,first__16383,seq__16382__$1,k,libs,specs,name,args,map__16373,map__16373__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,reload,reloads,vec__16370,___$2,quoted_specs,form){
return (function (p1__16367_SHARP_){
return cljs.core.cst$kw$reload.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(p1__16367_SHARP_));
});})(vec__16381,seq__16382,first__16383,seq__16382__$1,k,libs,specs,name,args,map__16373,map__16373__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,reload,reloads,vec__16370,___$2,quoted_specs,form))
,libs));
if((temp__5739__auto___16400 == null)){
} else {
var xs_16401 = temp__5739__auto___16400;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reloads,cljs.core.assoc,k,cljs.core.zipmap(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,xs_16401),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (xs_16401,temp__5739__auto___16400,vec__16381,seq__16382,first__16383,seq__16382__$1,k,libs,specs,name,args,map__16373,map__16373__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,reload,reloads,vec__16370,___$2,quoted_specs,form){
return (function (p1__16368_SHARP_){
return cljs.core.cst$kw$reload.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(p1__16368_SHARP_));
});})(xs_16401,temp__5739__auto___16400,vec__16381,seq__16382,first__16383,seq__16382__$1,k,libs,specs,name,args,map__16373,map__16373__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,reload,reloads,vec__16370,___$2,quoted_specs,form))
,xs_16401)));
}

return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.merge_with,cljs.core.merge,m,cljs.core.map.cljs$core$IFn$_invoke$arity$2((spec_parsers.cljs$core$IFn$_invoke$arity$1 ? spec_parsers.cljs$core$IFn$_invoke$arity$1(k) : spec_parsers(k)),cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$reload,null,cljs.core.cst$kw$reload_DASH_all,null], null), null),libs)));
});})(specs,name,args,map__16373,map__16373__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,reload,reloads,vec__16370,___$2,quoted_specs,form))
,cljs.core.PersistentArrayMap.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(((function (specs,name,args,map__16373,map__16373__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,reload,reloads,vec__16370,___$2,quoted_specs,form){
return (function (p__16384){
var vec__16385 = p__16384;
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16385,(0),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(r,cljs.core.cst$kw$refer_DASH_clojure);
});})(specs,name,args,map__16373,map__16373__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,reload,reloads,vec__16370,___$2,quoted_specs,form))
,args));
var map__16374__$1 = (((((!((map__16374 == null))))?(((((map__16374.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16374.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16374):map__16374);
var params = map__16374__$1;
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16374__$1,cljs.core.cst$kw$use);
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16374__$1,cljs.core.cst$kw$require);
var renames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16374__$1,cljs.core.cst$kw$rename);
var use_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16374__$1,cljs.core.cst$kw$use_DASH_macros);
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16374__$1,cljs.core.cst$kw$require_DASH_macros);
var rename_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16374__$1,cljs.core.cst$kw$rename_DASH_macros);
var imports = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16374__$1,cljs.core.cst$kw$import);
cljs.analyzer._STAR_cljs_ns_STAR_ = name;

var require_info = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$rename_DASH_macros,cljs.core.cst$kw$renames,cljs.core.cst$kw$use_DASH_macros,cljs.core.cst$kw$excludes,cljs.core.cst$kw$name,cljs.core.cst$kw$imports,cljs.core.cst$kw$requires,cljs.core.cst$kw$uses,cljs.core.cst$kw$require_DASH_macros],[rename_macros,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([renames,core_renames__$1], 0)),use_macros,excludes,name,imports,requires,uses,require_macros]);
var ns_info = (function (){var ns_info_SINGLEQUOTE_ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,name], null));
if((cljs.core.count(ns_info_SINGLEQUOTE_) > (0))){
var merge_keys = new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$use_DASH_macros,cljs.core.cst$kw$require_DASH_macros,cljs.core.cst$kw$rename_DASH_macros,cljs.core.cst$kw$uses,cljs.core.cst$kw$requires,cljs.core.cst$kw$renames,cljs.core.cst$kw$imports], null);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([ns_info_SINGLEQUOTE_,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$excludes,excludes], null),cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.merge,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.select_keys(ns_info_SINGLEQUOTE_,merge_keys),cljs.core.select_keys(require_info,merge_keys)], 0))], 0));
} else {
return require_info;
}
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.env._STAR_compiler_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,name], null),cljs.core.merge,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([ns_info], 0));

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$op,cljs.core.cst$kw$ns_STAR_,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$deps,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(deps))),cljs.core.cst$kw$reload,cljs.core.deref(reload),cljs.core.cst$kw$reloads,cljs.core.deref(reloads)], null),(function (){var G__16389 = require_info;
var G__16389__$1 = (cljs.core.truth_((function (){var G__16391 = cljs.core.cst$kw$use;
var fexpr__16390 = cljs.core.deref(reload);
return (fexpr__16390.cljs$core$IFn$_invoke$arity$1 ? fexpr__16390.cljs$core$IFn$_invoke$arity$1(G__16391) : fexpr__16390(G__16391));
})())?cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(G__16389,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$uses], null),((function (G__16389,require_info,ns_info,specs,name,args,map__16373,map__16373__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,reload,reloads,map__16374,map__16374__$1,params,uses,requires,renames,use_macros,require_macros,rename_macros,imports,vec__16370,___$2,quoted_specs,form){
return (function (m){
return cljs.core.with_meta(m,cljs.core.PersistentArrayMap.createAsIfByAssoc([(function (){var G__16393 = cljs.core.cst$kw$use;
var fexpr__16392 = cljs.core.deref(reload);
return (fexpr__16392.cljs$core$IFn$_invoke$arity$1 ? fexpr__16392.cljs$core$IFn$_invoke$arity$1(G__16393) : fexpr__16392(G__16393));
})(),true]));
});})(G__16389,require_info,ns_info,specs,name,args,map__16373,map__16373__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,reload,reloads,map__16374,map__16374__$1,params,uses,requires,renames,use_macros,require_macros,rename_macros,imports,vec__16370,___$2,quoted_specs,form))
):G__16389);
if(cljs.core.truth_((function (){var G__16395 = cljs.core.cst$kw$require;
var fexpr__16394 = cljs.core.deref(reload);
return (fexpr__16394.cljs$core$IFn$_invoke$arity$1 ? fexpr__16394.cljs$core$IFn$_invoke$arity$1(G__16395) : fexpr__16394(G__16395));
})())){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(G__16389__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$requires], null),((function (G__16389,G__16389__$1,require_info,ns_info,specs,name,args,map__16373,map__16373__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,reload,reloads,map__16374,map__16374__$1,params,uses,requires,renames,use_macros,require_macros,rename_macros,imports,vec__16370,___$2,quoted_specs,form){
return (function (m){
return cljs.core.with_meta(m,cljs.core.PersistentArrayMap.createAsIfByAssoc([(function (){var G__16397 = cljs.core.cst$kw$require;
var fexpr__16396 = cljs.core.deref(reload);
return (fexpr__16396.cljs$core$IFn$_invoke$arity$1 ? fexpr__16396.cljs$core$IFn$_invoke$arity$1(G__16397) : fexpr__16396(G__16397));
})(),true]));
});})(G__16389,G__16389__$1,require_info,ns_info,specs,name,args,map__16373,map__16373__$1,excludes,core_renames,core_renames__$1,deps,aliases,spec_parsers,reload,reloads,map__16374,map__16374__$1,params,uses,requires,renames,use_macros,require_macros,rename_macros,imports,vec__16370,___$2,quoted_specs,form))
);
} else {
return G__16389__$1;
}
})()], 0));
}));
cljs.analyzer.parse_type = (function cljs$analyzer$parse_type(op,env,p__16402){
var vec__16403 = p__16402;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16403,(0),null);
var tsym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16403,(1),null);
var fields = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16403,(2),null);
var pmasks = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16403,(3),null);
var body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16403,(4),null);
var form = vec__16403;
var t = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$locals),tsym));
var locals = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (t,vec__16403,_,tsym,fields,pmasks,body,form){
return (function (m,fld){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,fld,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$name,cljs.core.cst$kw$field,cljs.core.cst$kw$column,cljs.core.cst$kw$unsynchronized_DASH_mutable,cljs.core.cst$kw$line,cljs.core.cst$kw$tag,cljs.core.cst$kw$mutable,cljs.core.cst$kw$volatile_DASH_mutable,cljs.core.cst$kw$shadow,cljs.core.cst$kw$local],[fld,true,cljs.analyzer.get_col(fld,env),cljs.core.cst$kw$unsynchronized_DASH_mutable.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(fld)),cljs.analyzer.get_line(fld,env),cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(fld)),cljs.core.cst$kw$mutable.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(fld)),cljs.core.cst$kw$volatile_DASH_mutable.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(fld)),(m.cljs$core$IFn$_invoke$arity$1 ? m.cljs$core$IFn$_invoke$arity$1(fld) : m(fld)),cljs.core.cst$kw$field]));
});})(t,vec__16403,_,tsym,fields,pmasks,body,form))
,cljs.core.PersistentArrayMap.EMPTY,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$defrecord,op))?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fields,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$__meta,cljs.core.cst$sym$__extmap,cljs.core.with_meta(cljs.core.cst$sym$__hash,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null)):fields));
var protocols = cljs.core.cst$kw$protocols.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(tsym));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.env._STAR_compiler_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env)),cljs.core.cst$kw$defs,tsym], null),((function (t,locals,protocols,vec__16403,_,tsym,fields,pmasks,body,form){
return (function (m){
var m__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic((function (){var or__4131__auto__ = m;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})(),cljs.core.cst$kw$name,t,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$tag,cljs.core.cst$sym$function,cljs.core.cst$kw$type,true,cljs.core.cst$kw$num_DASH_fields,cljs.core.count(fields),cljs.core.cst$kw$record,cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$defrecord,op)], 0));
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([m__$1,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.meta(tsym),cljs.core.cst$kw$protocols),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$protocols,protocols], null),cljs.analyzer.source_info.cljs$core$IFn$_invoke$arity$2(tsym,env)], 0));
});})(t,locals,protocols,vec__16403,_,tsym,fields,pmasks,body,form))
);

return cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$children,cljs.core.cst$kw$pmasks,cljs.core.cst$kw$protocols,cljs.core.cst$kw$fields,cljs.core.cst$kw$op,cljs.core.cst$kw$env,cljs.core.cst$kw$t,cljs.core.cst$kw$form,cljs.core.cst$kw$tag,cljs.core.cst$kw$body],[new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$body], null),pmasks,cljs.core.disj.cljs$core$IFn$_invoke$arity$2(protocols,cljs.core.cst$sym$cljs$core_SLASH_Object),fields,op,env,t,form,cljs.core.cst$sym$function,(function (){var G__16406 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$locals,locals);
var G__16407 = body;
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__16406,G__16407) : cljs.analyzer.analyze(G__16406,G__16407));
})()]);
});
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$deftype_STAR_,(function (_,env,form,___$1,___$2){
return cljs.analyzer.parse_type(cljs.core.cst$kw$deftype,env,form);
}));
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$defrecord_STAR_,(function (_,env,form,___$1,___$2){
return cljs.analyzer.parse_type(cljs.core.cst$kw$defrecord,env,form);
}));
cljs.analyzer.property_symbol_QMARK_ = (function cljs$analyzer$property_symbol_QMARK_(p1__16408_SHARP_){
return cljs.core.boolean$((function (){var and__4120__auto__ = (p1__16408_SHARP_ instanceof cljs.core.Symbol);
if(and__4120__auto__){
return cljs.core.re_matches(/^-.*/,cljs.core.name(p1__16408_SHARP_));
} else {
return and__4120__auto__;
}
})());
});
cljs.analyzer.classify_dot_form = (function cljs$analyzer$classify_dot_form(p__16409){
var vec__16410 = p__16409;
var target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16410,(0),null);
var member = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16410,(1),null);
var args = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16410,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(((target == null))?cljs.core.cst$kw$cljs$analyzer_SLASH_error:cljs.core.cst$kw$cljs$analyzer_SLASH_expr
),((cljs.analyzer.property_symbol_QMARK_(member))?cljs.core.cst$kw$cljs$analyzer_SLASH_property:(((member instanceof cljs.core.Symbol))?cljs.core.cst$kw$cljs$analyzer_SLASH_symbol:((cljs.core.seq_QMARK_(member))?cljs.core.cst$kw$cljs$analyzer_SLASH_list:cljs.core.cst$kw$cljs$analyzer_SLASH_error
))),(((args == null))?cljs.core.List.EMPTY:cljs.core.cst$kw$cljs$analyzer_SLASH_expr
)], null);
});
if((typeof cljs !== 'undefined') && (typeof cljs.analyzer !== 'undefined') && (typeof cljs.analyzer.build_dot_form !== 'undefined')){
} else {
cljs.analyzer.build_dot_form = (function (){var method_table__4613__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,(function (){var fexpr__16414 = cljs.core.get_global_hierarchy;
return (fexpr__16414.cljs$core$IFn$_invoke$arity$0 ? fexpr__16414.cljs$core$IFn$_invoke$arity$0() : fexpr__16414());
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.analyzer","build-dot-form"),((function (method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__,hierarchy__4617__auto__){
return (function (p1__16413_SHARP_){
return cljs.analyzer.classify_dot_form(p1__16413_SHARP_);
});})(method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__,hierarchy__4617__auto__))
,cljs.core.cst$kw$default,hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}
cljs.analyzer.build_dot_form.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_expr,cljs.core.cst$kw$cljs$analyzer_SLASH_property,cljs.core.List.EMPTY], null),(function (p__16415){
var vec__16416 = p__16415;
var target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16416,(0),null);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16416,(1),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16416,(2),null);
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$dot_DASH_action,cljs.core.cst$kw$cljs$analyzer_SLASH_access,cljs.core.cst$kw$target,target,cljs.core.cst$kw$field,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(prop).substring((1)))], null);
}));
cljs.analyzer.build_dot_form.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_expr,cljs.core.cst$kw$cljs$analyzer_SLASH_property,cljs.core.cst$kw$cljs$analyzer_SLASH_list], null),(function (p__16419){
var vec__16420 = p__16419;
var target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16420,(0),null);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16420,(1),null);
var args = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16420,(2),null);
throw (new Error(["Cannot provide arguments ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(args)," on property access ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop)].join('')));
}));
/**
 * Builds the intermediate method call map used to reason about the parsed form during
 *   compilation.
 */
cljs.analyzer.build_method_call = (function cljs$analyzer$build_method_call(target,meth,args){
if((meth instanceof cljs.core.Symbol)){
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$dot_DASH_action,cljs.core.cst$kw$cljs$analyzer_SLASH_call,cljs.core.cst$kw$target,target,cljs.core.cst$kw$method,meth,cljs.core.cst$kw$args,args], null);
} else {
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$dot_DASH_action,cljs.core.cst$kw$cljs$analyzer_SLASH_call,cljs.core.cst$kw$target,target,cljs.core.cst$kw$method,cljs.core.first(meth),cljs.core.cst$kw$args,args], null);
}
});
cljs.analyzer.build_dot_form.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_expr,cljs.core.cst$kw$cljs$analyzer_SLASH_symbol,cljs.core.cst$kw$cljs$analyzer_SLASH_expr], null),(function (p__16423){
var vec__16424 = p__16423;
var target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16424,(0),null);
var meth = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16424,(1),null);
var args = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16424,(2),null);
return cljs.analyzer.build_method_call(target,meth,args);
}));
cljs.analyzer.build_dot_form.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_expr,cljs.core.cst$kw$cljs$analyzer_SLASH_symbol,cljs.core.List.EMPTY], null),(function (p__16427){
var vec__16428 = p__16427;
var target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16428,(0),null);
var meth = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16428,(1),null);
var args = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16428,(2),null);
return cljs.analyzer.build_method_call(target,meth,args);
}));
cljs.analyzer.build_dot_form.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_expr,cljs.core.cst$kw$cljs$analyzer_SLASH_list,cljs.core.List.EMPTY], null),(function (p__16431){
var vec__16432 = p__16431;
var target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16432,(0),null);
var meth_expr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16432,(1),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16432,(2),null);
return cljs.analyzer.build_method_call(target,cljs.core.first(meth_expr),cljs.core.rest(meth_expr));
}));
cljs.analyzer.build_dot_form.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (dot_form){
throw (new Error(["Unknown dot form of ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$_DOT_,dot_form))," with classification ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.classify_dot_form(dot_form))].join('')));
}));
cljs.analyzer.analyze_dot = (function cljs$analyzer$analyze_dot(env,target,field,member_PLUS_,form){
var v = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [target,field,member_PLUS_], null);
var map__16436 = (cljs.analyzer.build_dot_form.cljs$core$IFn$_invoke$arity$1 ? cljs.analyzer.build_dot_form.cljs$core$IFn$_invoke$arity$1(v) : cljs.analyzer.build_dot_form(v));
var map__16436__$1 = (((((!((map__16436 == null))))?(((((map__16436.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16436.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16436):map__16436);
var dot_action = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16436__$1,cljs.core.cst$kw$dot_DASH_action);
var target__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16436__$1,cljs.core.cst$kw$target);
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16436__$1,cljs.core.cst$kw$method);
var field__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16436__$1,cljs.core.cst$kw$field);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16436__$1,cljs.core.cst$kw$args);
var enve = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var targetexpr = (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(enve,target__$1) : cljs.analyzer.analyze(enve,target__$1));
var form_meta = cljs.core.meta(form);
var target_tag = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(targetexpr);
var prop = (function (){var or__4131__auto__ = field__$1;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return method;
}
})();
var tag = (function (){var or__4131__auto__ = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(form_meta);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = (function (){var and__4120__auto__ = cljs.analyzer.js_tag_QMARK_(target_tag);
if(and__4120__auto__){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$5(cljs.analyzer.normalize_js_tag(target_tag),cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prefix], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$Object], null)),prop);
} else {
return and__4120__auto__;
}
})();
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
return null;
}
}
})();
if(((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$constructor,prop)) && ((!(clojure.string.starts_with_QMARK_(cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop),"cljs$")))))){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$Object,cljs.core.first(cljs.core.cst$kw$prefix.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(tag))))){
cljs.analyzer.warning(cljs.core.cst$kw$infer_DASH_warning,env,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$warn_DASH_type,cljs.core.cst$kw$object,cljs.core.cst$kw$form,form,cljs.core.cst$kw$property,prop], null));
} else {
}

if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$js,target_tag)){
if(cljs.core.truth_((function (){var or__4131__auto__ = (target_tag == null);
if(or__4131__auto__){
return or__4131__auto__;
} else {
var fexpr__16439 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$any,"null"], null), null);
return (fexpr__16439.cljs$core$IFn$_invoke$arity$1 ? fexpr__16439.cljs$core$IFn$_invoke$arity$1(target_tag) : fexpr__16439(target_tag));
}
})())){
cljs.analyzer.warning(cljs.core.cst$kw$infer_DASH_warning,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$warn_DASH_type,cljs.core.cst$kw$target,cljs.core.cst$kw$form,form], null));
} else {
}

var vec__16440_16447 = (function (){var G__16444 = cljs.core.cst$kw$prefix.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(tag));
var fexpr__16443 = cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast,cljs.core.identity);
return (fexpr__16443.cljs$core$IFn$_invoke$arity$1 ? fexpr__16443.cljs$core$IFn$_invoke$arity$1(G__16444) : fexpr__16443(G__16444));
})();
var pre_SINGLEQUOTE__16448 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16440_16447,(0),null);
var pre_16449 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16440_16447,(1),null);
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.analyzer.has_extern_QMARK_.cljs$core$IFn$_invoke$arity$1(pre_SINGLEQUOTE__16448);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.not(cljs.analyzer.has_extern_QMARK_.cljs$core$IFn$_invoke$arity$1(pre_16449));
} else {
return and__4120__auto__;
}
})())){
cljs.analyzer.warning(cljs.core.cst$kw$infer_DASH_warning,env,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$warn_DASH_type,cljs.core.cst$kw$property,cljs.core.cst$kw$form,form,cljs.core.cst$kw$type,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("js",clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",(function (){var G__16445 = pre_SINGLEQUOTE__16448;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$prototype,cljs.core.last(pre_SINGLEQUOTE__16448))){
return cljs.core.butlast(G__16445);
} else {
return G__16445;
}
})())),cljs.core.cst$kw$property,prop], null));
} else {
}
} else {
}
} else {
}

if(cljs.analyzer.js_tag_QMARK_(tag)){
var pre_16450 = cljs.core.cst$kw$prefix.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(tag));
if(cljs.core.truth_(cljs.analyzer.has_extern_QMARK_.cljs$core$IFn$_invoke$arity$1(pre_16450))){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.env._STAR_compiler_STAR_,cljs.core.update_in,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env)),cljs.core.cst$kw$externs], null),pre_16450),cljs.core.merge,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.PersistentArrayMap.EMPTY], 0));
}
} else {
}

var G__16446 = dot_action;
var G__16446__$1 = (((G__16446 instanceof cljs.core.Keyword))?G__16446.fqn:null);
switch (G__16446__$1) {
case "cljs.analyzer/access":
var children = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$target], null);
return new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$op,cljs.core.cst$kw$host_DASH_field,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$target,targetexpr,cljs.core.cst$kw$field,field__$1,cljs.core.cst$kw$children,children,cljs.core.cst$kw$tag,((cljs.analyzer.js_tag_QMARK_(tag))?(function (){var or__4131__auto__ = cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$prefix.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(tag)),cljs.core.cst$kw$tag);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return tag;
}
})():tag)], null);

break;
case "cljs.analyzer/call":
var argexprs = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (G__16446,G__16446__$1,v,map__16436,map__16436__$1,dot_action,target__$1,method,field__$1,args,enve,targetexpr,form_meta,target_tag,prop,tag){
return (function (p1__16435_SHARP_){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(enve,p1__16435_SHARP_) : cljs.analyzer.analyze(enve,p1__16435_SHARP_));
});})(G__16446,G__16446__$1,v,map__16436,map__16436__$1,dot_action,target__$1,method,field__$1,args,enve,targetexpr,form_meta,target_tag,prop,tag))
,args);
var children = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$target,cljs.core.cst$kw$args], null);
return new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$op,cljs.core.cst$kw$host_DASH_call,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$target,targetexpr,cljs.core.cst$kw$method,method,cljs.core.cst$kw$args,argexprs,cljs.core.cst$kw$children,children,cljs.core.cst$kw$tag,((cljs.analyzer.js_tag_QMARK_(tag))?(function (){var or__4131__auto__ = cljs.analyzer.js_tag.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$prefix.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(tag)),cljs.core.cst$kw$ret_DASH_tag);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.cst$sym$js;
}
})():tag)], null);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__16446__$1)].join('')));

}
});
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$_DOT_,(function (_,env,p__16452,___$1,___$2){
var vec__16453 = p__16452;
var seq__16454 = cljs.core.seq(vec__16453);
var first__16455 = cljs.core.first(seq__16454);
var seq__16454__$1 = cljs.core.next(seq__16454);
var ___$3 = first__16455;
var first__16455__$1 = cljs.core.first(seq__16454__$1);
var seq__16454__$2 = cljs.core.next(seq__16454__$1);
var target = first__16455__$1;
var vec__16456 = seq__16454__$2;
var seq__16457 = cljs.core.seq(vec__16456);
var first__16458 = cljs.core.first(seq__16457);
var seq__16457__$1 = cljs.core.next(seq__16457);
var field = first__16458;
var member_PLUS_ = seq__16457__$1;
var form = vec__16453;
var _STAR_recur_frames_STAR__orig_val__16459 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__16460 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__16460;

try{return cljs.analyzer.analyze_dot(env,target,field,member_PLUS_,form);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__16459;
}}));
cljs.analyzer.get_js_tag = (function cljs$analyzer$get_js_tag(form){
var form_meta = cljs.core.meta(form);
var temp__5737__auto__ = cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(form_meta);
if((temp__5737__auto__ == null)){
if(cljs.core.cst$kw$numeric.cljs$core$IFn$_invoke$arity$1(form_meta) === true){
return cljs.core.cst$sym$number;
} else {
return null;
}
} else {
var tag = temp__5737__auto__;
return tag;
}
});
cljs.analyzer.js_star_interp = (function cljs$analyzer$js_star_interp(env,s){
var idx = s.indexOf("~{");
if(((-1) === idx)){
return (new cljs.core.List(null,s,null,(1),null));
} else {
var end = s.indexOf("}",idx);
var inner = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_existing_var(env,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,((2) + idx),end))));
return (new cljs.core.LazySeq(null,((function (end,inner,idx){
return (function (){
return cljs.core.cons(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),idx),cljs.core.cons(inner,(function (){var G__16461 = env;
var G__16462 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(end + (1)));
return (cljs.analyzer.js_star_interp.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.js_star_interp.cljs$core$IFn$_invoke$arity$2(G__16461,G__16462) : cljs.analyzer.js_star_interp(G__16461,G__16462));
})()));
});})(end,inner,idx))
,null,null));
}
});
cljs.analyzer.js_star_seg = (function cljs$analyzer$js_star_seg(s){
var idx = s.indexOf("~{");
if(((-1) === idx)){
return (new cljs.core.List(null,s,null,(1),null));
} else {
var end = s.indexOf("}",idx);
return (new cljs.core.LazySeq(null,((function (end,idx){
return (function (){
return cljs.core.cons(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),idx),(function (){var G__16463 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(end + (1)));
return (cljs.analyzer.js_star_seg.cljs$core$IFn$_invoke$arity$1 ? cljs.analyzer.js_star_seg.cljs$core$IFn$_invoke$arity$1(G__16463) : cljs.analyzer.js_star_seg(G__16463));
})());
});})(end,idx))
,null,null));
}
});
cljs.analyzer.NUMERIC_SET = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$sym$any,"null",cljs.core.cst$sym$long,"null",cljs.core.cst$sym$double,"null",cljs.core.cst$sym$number,"null"], null), null);
cljs.analyzer.numeric_type_QMARK_ = (function cljs$analyzer$numeric_type_QMARK_(t){
if((t == null)){
return true;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$clj_DASH_nil,t)){
return true;
} else {
if(cljs.analyzer.js_tag_QMARK_(t)){
return true;
} else {
if((((t instanceof cljs.core.Symbol)) && ((!((cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.NUMERIC_SET,t) == null)))))){
return true;
} else {
if(cljs.analyzer.cljs_set_QMARK_(t)){
return ((cljs.core.contains_QMARK_(t,cljs.core.cst$sym$number)) || (cljs.core.contains_QMARK_(t,cljs.core.cst$sym$long)) || (cljs.core.contains_QMARK_(t,cljs.core.cst$sym$double)) || (cljs.core.contains_QMARK_(t,cljs.core.cst$sym$any)) || (cljs.core.contains_QMARK_(t,cljs.core.cst$sym$js)));
} else {
return null;
}
}

}
}
}
});
cljs.analyzer.array_types = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 10, [cljs.core.cst$sym$boolean,"null",cljs.core.cst$sym$floats,"null",cljs.core.cst$sym$longs,"null",cljs.core.cst$sym$objects,"null",cljs.core.cst$sym$array,"null",cljs.core.cst$sym$doubles,"null",cljs.core.cst$sym$chars,"null",cljs.core.cst$sym$ints,"null",cljs.core.cst$sym$shorts,"null",cljs.core.cst$sym$bytes,"null"], null), null);
cljs.analyzer.array_type_QMARK_ = (function cljs$analyzer$array_type_QMARK_(t){
if((t == null)){
return true;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$clj_DASH_nil,t)){
return true;
} else {
if(cljs.analyzer.js_tag_QMARK_(t)){
return true;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$any,t)){
return true;
} else {
if(cljs.core.contains_QMARK_(cljs.analyzer.array_types,t)){
return true;
} else {
return cljs.core.boolean$(((cljs.analyzer.cljs_set_QMARK_(t))?(function (){var or__4131__auto__ = cljs.core.contains_QMARK_(t,cljs.core.cst$sym$any);
if(or__4131__auto__){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = cljs.core.contains_QMARK_(t,cljs.core.cst$sym$js);
if(or__4131__auto____$1){
return or__4131__auto____$1;
} else {
return cljs.core.some(cljs.analyzer.array_types,t);
}
}
})():null));

}
}
}
}
}
});
cljs.analyzer.analyze_js_star_STAR_ = (function cljs$analyzer$analyze_js_star_STAR_(env,jsform,args,form){
var enve = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var argexprs = cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (enve){
return (function (p1__16464_SHARP_){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(enve,p1__16464_SHARP_) : cljs.analyzer.analyze(enve,p1__16464_SHARP_));
});})(enve))
,args));
var form_meta = cljs.core.meta(form);
var segs = cljs.analyzer.js_star_seg(jsform);
var tag = cljs.analyzer.get_js_tag(form);
var js_op = cljs.core.cst$kw$js_DASH_op.cljs$core$IFn$_invoke$arity$1(form_meta);
var numeric = cljs.core.cst$kw$numeric.cljs$core$IFn$_invoke$arity$1(form_meta);
var validate = ((function (enve,argexprs,form_meta,segs,tag,js_op,numeric){
return (function (warning_type,valid_types_QMARK_){
var types = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (enve,argexprs,form_meta,segs,tag,js_op,numeric){
return (function (p1__16465_SHARP_){
return cljs.analyzer.infer_tag(env,p1__16465_SHARP_);
});})(enve,argexprs,form_meta,segs,tag,js_op,numeric))
,argexprs);
if(cljs.core.truth_((valid_types_QMARK_.cljs$core$IFn$_invoke$arity$1 ? valid_types_QMARK_.cljs$core$IFn$_invoke$arity$1(types) : valid_types_QMARK_(types)))){
return null;
} else {
return cljs.analyzer.warning(warning_type,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$js_DASH_op,js_op,cljs.core.cst$kw$types,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,types)], null));
}
});})(enve,argexprs,form_meta,segs,tag,js_op,numeric))
;
var op_match_QMARK_ = ((function (enve,argexprs,form_meta,segs,tag,js_op,numeric,validate){
return (function (sym){
return cljs.core.symbol_identical_QMARK_(sym,cljs.core.cst$kw$js_DASH_op.cljs$core$IFn$_invoke$arity$1(form_meta));
});})(enve,argexprs,form_meta,segs,tag,js_op,numeric,validate))
;
if(numeric === true){
validate(cljs.core.cst$kw$invalid_DASH_arithmetic,((function (enve,argexprs,form_meta,segs,tag,js_op,numeric,validate,op_match_QMARK_){
return (function (p1__16466_SHARP_){
return cljs.core.every_QMARK_(cljs.analyzer.numeric_type_QMARK_,p1__16466_SHARP_);
});})(enve,argexprs,form_meta,segs,tag,js_op,numeric,validate,op_match_QMARK_))
);
} else {
}

return cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$args,cljs.core.cst$kw$children,cljs.core.cst$kw$numeric,cljs.core.cst$kw$segs,cljs.core.cst$kw$op,cljs.core.cst$kw$env,cljs.core.cst$kw$js_DASH_op,cljs.core.cst$kw$form,cljs.core.cst$kw$tag],[argexprs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$args], null),numeric,segs,cljs.core.cst$kw$js,env,js_op,form,tag]);
});
cljs.analyzer.analyze_js_star = (function cljs$analyzer$analyze_js_star(env,jsform,args,form){
var _STAR_recur_frames_STAR__orig_val__16467 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__16468 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__16468;

try{return cljs.analyzer.analyze_js_star_STAR_(env,jsform,args,form);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__16467;
}});
cljs.analyzer.parse.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$js_STAR_,(function (op,env,p__16469,_,___$1){
var vec__16470 = p__16469;
var seq__16471 = cljs.core.seq(vec__16470);
var first__16472 = cljs.core.first(seq__16471);
var seq__16471__$1 = cljs.core.next(seq__16471);
var ___$2 = first__16472;
var first__16472__$1 = cljs.core.first(seq__16471__$1);
var seq__16471__$2 = cljs.core.next(seq__16471__$1);
var jsform = first__16472__$1;
var args = seq__16471__$2;
var form = vec__16470;
if(typeof jsform === 'string'){
} else {
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env,"Invalid js* form");
}

if((!((args == null)))){
return cljs.analyzer.analyze_js_star(env,jsform,args,form);
} else {
var code = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.analyzer.js_star_interp(env,jsform));
var tag = cljs.analyzer.get_js_tag(form);
var form_meta = cljs.core.meta(form);
var js_op = cljs.core.cst$kw$js_DASH_op.cljs$core$IFn$_invoke$arity$1(form_meta);
var numeric = cljs.core.cst$kw$numeric.cljs$core$IFn$_invoke$arity$1(form_meta);
return new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$op,cljs.core.cst$kw$js,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$code,code,cljs.core.cst$kw$tag,tag,cljs.core.cst$kw$js_DASH_op,js_op,cljs.core.cst$kw$numeric,numeric], null);
}
}));
cljs.analyzer.unsorted_map_QMARK_ = (function cljs$analyzer$unsorted_map_QMARK_(x){
return ((cljs.core.map_QMARK_(x)) && ((!(cljs.core.sorted_QMARK_(x)))));
});
/**
 * Mark a form as being analyzed. Assumes x satisfies IMeta. Useful to suppress
 *   warnings that will have been caught by a first compiler pass.
 */
cljs.analyzer.analyzed = (function cljs$analyzer$analyzed(x){
if(cljs.analyzer.unsorted_map_QMARK_(x)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(x,cljs.core.cst$kw$cljs$analyzer_SLASH_analyzed,true);
} else {
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(x,cljs.core.assoc,cljs.core.cst$kw$cljs$analyzer_SLASH_analyzed,true);

}
});
/**
 * Returns boolean if the form has already been marked as analyzed.
 */
cljs.analyzer.analyzed_QMARK_ = (function cljs$analyzer$analyzed_QMARK_(x){
return cljs.core.boolean$(((cljs.analyzer.unsorted_map_QMARK_(x))?cljs.core.cst$kw$cljs$analyzer_SLASH_analyzed.cljs$core$IFn$_invoke$arity$1(x):cljs.core.cst$kw$cljs$analyzer_SLASH_analyzed.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(x))
));
});
cljs.analyzer.all_values_QMARK_ = (function cljs$analyzer$all_values_QMARK_(exprs){
return cljs.core.every_QMARK_((function (p1__16473_SHARP_){
return (((p1__16473_SHARP_ == null)) || ((p1__16473_SHARP_ instanceof cljs.core.Symbol)) || (typeof p1__16473_SHARP_ === 'string') || (typeof p1__16473_SHARP_ === 'number') || (p1__16473_SHARP_ === true) || (p1__16473_SHARP_ === false));
}),exprs);
});
cljs.analyzer.valid_arity_QMARK_ = (function cljs$analyzer$valid_arity_QMARK_(argc,method_params){
return cljs.core.boolean$(cljs.core.some(cljs.core.PersistentHashSet.createAsIfByAssoc([argc]),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,method_params)));
});
cljs.analyzer.parse_invoke_STAR_ = (function cljs$analyzer$parse_invoke_STAR_(env,p__16475){
var vec__16476 = p__16475;
var seq__16477 = cljs.core.seq(vec__16476);
var first__16478 = cljs.core.first(seq__16477);
var seq__16477__$1 = cljs.core.next(seq__16477);
var f = first__16478;
var args = seq__16477__$1;
var form = vec__16476;
var enve = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var fexpr = (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(enve,f) : cljs.analyzer.analyze(enve,f));
var argc = cljs.core.count(args);
var fn_var_QMARK_ = cljs.core.cst$kw$fn_DASH_var.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(fexpr));
var kw_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$cljs$core_SLASH_Keyword,cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(fexpr));
var cur_ns = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env));
var HO_invoke_QMARK_ = ((cljs.core.boolean$(cljs.analyzer._STAR_cljs_static_fns_STAR_)) && (cljs.core.not(fn_var_QMARK_)) && ((!(cljs.analyzer.js_tag_QMARK_(f)))) && ((!(kw_QMARK_))) && ((!(cljs.analyzer.analyzed_QMARK_(f)))));
var bind_f_expr_QMARK_ = ((HO_invoke_QMARK_) && ((!((f instanceof cljs.core.Symbol)))));
var bind_args_QMARK_ = ((HO_invoke_QMARK_) && ((!(cljs.analyzer.all_values_QMARK_(args)))));
if(fn_var_QMARK_){
var map__16479_16492 = cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(fexpr);
var map__16479_16493__$1 = (((((!((map__16479_16492 == null))))?(((((map__16479_16492.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16479_16492.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16479_16492):map__16479_16492);
var variadic_16494 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16479_16493__$1,cljs.core.cst$kw$variadic_QMARK_);
var max_fixed_arity_16495 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16479_16493__$1,cljs.core.cst$kw$max_DASH_fixed_DASH_arity);
var method_params_16496 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16479_16493__$1,cljs.core.cst$kw$method_DASH_params);
var name_16497 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16479_16493__$1,cljs.core.cst$kw$name);
var ns_16498 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16479_16493__$1,cljs.core.cst$kw$ns);
var macro_16499 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16479_16493__$1,cljs.core.cst$kw$macro);
if(((cljs.core.not((function (){var and__4120__auto__ = (function (){var G__16487 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cur_ns);
var G__16488 = "$macros";
return goog.string.endsWith(G__16487,G__16488);
})();
if(cljs.core.truth_(and__4120__auto__)){
return ((cljs.core.symbol_identical_QMARK_(cur_ns,ns_16498)) && (macro_16499 === true));
} else {
return and__4120__auto__;
}
})())) && ((!(cljs.analyzer.valid_arity_QMARK_(argc,method_params_16496)))) && ((((!(variadic_16494))) || (((variadic_16494) && ((argc < max_fixed_arity_16495)))))))){
cljs.analyzer.warning(cljs.core.cst$kw$fn_DASH_arity,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$name,name_16497,cljs.core.cst$kw$argc,argc], null));
} else {
}
} else {
}

if(((kw_QMARK_) && ((!(((((1) === argc)) || (((2) === argc)))))))){
cljs.analyzer.warning(cljs.core.cst$kw$fn_DASH_arity,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$name,cljs.core.first(form),cljs.core.cst$kw$argc,argc], null));
} else {
}

var deprecated_QMARK__16500 = cljs.core.cst$kw$deprecated.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(fexpr));
var no_warn_QMARK__16501 = cljs.core.cst$kw$deprecation_DASH_nowarn.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(form));
if(((cljs.core.boolean$(deprecated_QMARK__16500)) && ((!(cljs.core.boolean$(no_warn_QMARK__16501)))))){
cljs.analyzer.warning(cljs.core.cst$kw$fn_DASH_deprecated,env,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$fexpr,fexpr], null));
} else {
}

if((!((cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(fexpr)) == null)))){
cljs.analyzer.warning(cljs.core.cst$kw$invoke_DASH_ctor,env,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$fexpr,fexpr], null));
} else {
}

if(((bind_args_QMARK_) || (bind_f_expr_QMARK_))){
var arg_syms = ((bind_args_QMARK_)?cljs.core.take.cljs$core$IFn$_invoke$arity$2(argc,cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym)):null);
var f_sym = ((bind_f_expr_QMARK_)?cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("fexpr__"):null);
var bindings = (function (){var G__16489 = cljs.core.PersistentVector.EMPTY;
var G__16489__$1 = ((bind_args_QMARK_)?cljs.core.into.cljs$core$IFn$_invoke$arity$2(G__16489,cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(arg_syms,args)):G__16489);
if(bind_f_expr_QMARK_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(G__16489__$1,f_sym,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.analyzer.analyzed(f)], 0));
} else {
return G__16489__$1;
}
})();
var G__16490 = env;
var G__16491 = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,cljs.core.cst$sym$cljs$core_SLASH_let,null,(1),null)),(new cljs.core.List(null,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(bindings)))),null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,cljs.analyzer.analyzed(((bind_f_expr_QMARK_)?f_sym:f)),null,(1),null)),((bind_args_QMARK_)?arg_syms:args)))),null,(1),null))], 0))));
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__16490,G__16491) : cljs.analyzer.analyze(G__16490,G__16491));
} else {
var ana_expr = ((function (enve,fexpr,argc,fn_var_QMARK_,kw_QMARK_,cur_ns,HO_invoke_QMARK_,bind_f_expr_QMARK_,bind_args_QMARK_,vec__16476,seq__16477,first__16478,seq__16477__$1,f,args,form){
return (function (p1__16474_SHARP_){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(enve,p1__16474_SHARP_) : cljs.analyzer.analyze(enve,p1__16474_SHARP_));
});})(enve,fexpr,argc,fn_var_QMARK_,kw_QMARK_,cur_ns,HO_invoke_QMARK_,bind_f_expr_QMARK_,bind_args_QMARK_,vec__16476,seq__16477,first__16478,seq__16477__$1,f,args,form))
;
var argexprs = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(ana_expr,args);
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$env,env,cljs.core.cst$kw$op,cljs.core.cst$kw$invoke,cljs.core.cst$kw$form,form,cljs.core.cst$kw$fn,fexpr,cljs.core.cst$kw$args,argexprs,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fn,cljs.core.cst$kw$args], null)], null);
}
});
cljs.analyzer.parse_invoke = (function cljs$analyzer$parse_invoke(env,form){
var _STAR_recur_frames_STAR__orig_val__16502 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__16503 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__16503;

try{return cljs.analyzer.parse_invoke_STAR_(env,form);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__16502;
}});
cljs.analyzer.desugar_dotted_expr = (function cljs$analyzer$desugar_dotted_expr(p__16504){
var map__16505 = p__16504;
var map__16505__$1 = (((((!((map__16505 == null))))?(((((map__16505.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16505.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16505):map__16505);
var expr = map__16505__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16505__$1,cljs.core.cst$kw$op);
var G__16507 = op;
var G__16507__$1 = (((G__16507 instanceof cljs.core.Keyword))?G__16507.fqn:null);
switch (G__16507__$1) {
case "var":
case "local":
if(cljs.analyzer.dotted_symbol_QMARK_(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(expr))))){
var s = cljs.core.name(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(expr));
var idx = s.lastIndexOf(".");
var _ = ((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((idx + (1)),cljs.core.count(s)))?null:(function(){throw (new Error("Assert failed: (not= (inc idx) (count s))"))})());
var prefix = cljs.core.with_meta(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(expr)),cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),idx)),cljs.core.meta(cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(expr)));
var field = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(idx + (1))));
if(cljs.core.not(cljs.core.cst$kw$const_DASH_expr.cljs$core$IFn$_invoke$arity$1(expr))){
} else {
throw (new Error("Assert failed: (not (:const-expr expr))"));
}

return new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$op,cljs.core.cst$kw$host_DASH_field,cljs.core.cst$kw$env,cljs.core.cst$kw$env.cljs$core$IFn$_invoke$arity$1(expr),cljs.core.cst$kw$form,(new cljs.core.List(null,cljs.core.cst$sym$_DOT_,(new cljs.core.List(null,prefix,(new cljs.core.List(null,field,null,(1),null)),(2),null)),(3),null)),cljs.core.cst$kw$target,(function (){var G__16508 = cljs.core.assoc_in(cljs.core.assoc_in(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(expr,cljs.core.cst$kw$name,prefix,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$form,prefix], 0)),cljs.core.cst$kw$tag),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info,cljs.core.cst$kw$name], null),prefix),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$env,cljs.core.cst$kw$context], null),cljs.core.cst$kw$expr);
return (cljs.analyzer.desugar_dotted_expr.cljs$core$IFn$_invoke$arity$1 ? cljs.analyzer.desugar_dotted_expr.cljs$core$IFn$_invoke$arity$1(G__16508) : cljs.analyzer.desugar_dotted_expr(G__16508));
})(),cljs.core.cst$kw$field,field,cljs.core.cst$kw$tag,cljs.core.cst$kw$tag.cljs$core$IFn$_invoke$arity$1(expr),cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$target], null)], null);
} else {
return expr;
}

break;
default:
return expr;

}
});
/**
 * Finds the var associated with sym
 */
cljs.analyzer.analyze_symbol = (function cljs$analyzer$analyze_symbol(env,sym){
if(cljs.core.cst$kw$quoted_QMARK_.cljs$core$IFn$_invoke$arity$1(env)){
cljs.analyzer.register_constant_BANG_.cljs$core$IFn$_invoke$arity$2(env,sym);

var G__16510 = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$op,cljs.core.cst$kw$const,cljs.core.cst$kw$val,sym,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,sym,cljs.core.cst$kw$tag,cljs.core.cst$sym$cljs$core_SLASH_Symbol], null);
return (cljs.analyzer.analyze_wrap_meta.cljs$core$IFn$_invoke$arity$1 ? cljs.analyzer.analyze_wrap_meta.cljs$core$IFn$_invoke$arity$1(G__16510) : cljs.analyzer.analyze_wrap_meta(G__16510));
} else {
var map__16511 = cljs.core.meta(sym);
var map__16511__$1 = (((((!((map__16511 == null))))?(((((map__16511.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16511.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16511):map__16511);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16511__$1,cljs.core.cst$kw$line);
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16511__$1,cljs.core.cst$kw$column);
var env__$1 = (((!((line == null))))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$line,line):env);
var env__$2 = (((!((column == null))))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env__$1,cljs.core.cst$kw$column,column):env__$1);
var ret = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$env,env__$2,cljs.core.cst$kw$form,sym], null);
var lcls = cljs.core.cst$kw$locals.cljs$core$IFn$_invoke$arity$1(env__$2);
var temp__5737__auto__ = cljs.analyzer.handle_symbol_local(sym,cljs.core.get.cljs$core$IFn$_invoke$arity$2(lcls,sym));
if((temp__5737__auto__ == null)){
var sym_meta = cljs.core.meta(sym);
var sym_ns = cljs.core.namespace(sym);
var cur_ns = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(env__$2)));
var sym__$1 = (cljs.core.truth_((function (){var and__4120__auto__ = sym_ns;
if(cljs.core.truth_(and__4120__auto__)){
var and__4120__auto____$1 = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(sym_ns,"cljs.core");
if(and__4120__auto____$1){
var and__4120__auto____$2 = goog.string.endsWith(cur_ns,"$macros");
if(cljs.core.truth_(and__4120__auto____$2)){
return ((cljs.core.not(goog.string.endsWith(sym_ns,"$macros"))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(sym_ns,cljs.core.subs.cljs$core$IFn$_invoke$arity$3(cur_ns,(0),(cljs.core.count(cur_ns) - (7))))));
} else {
return and__4120__auto____$2;
}
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})())?cljs.core.symbol.cljs$core$IFn$_invoke$arity$2([sym_ns,"$macros"].join(''),cljs.core.name(sym)):sym);
var info = (((!(cljs.core.contains_QMARK_(sym_meta,cljs.core.cst$kw$cljs$analyzer_SLASH_analyzed))))?cljs.analyzer.resolve_existing_var(env__$2,sym__$1):cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(env__$2,sym__$1));
if(cljs.core.truth_(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(info))){
} else {
throw (new Error(["Assert failed: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(info)),"\n","(:op info)"].join('')));
}

return cljs.analyzer.desugar_dotted_expr((((!(cljs.core.cst$kw$def_DASH_var.cljs$core$IFn$_invoke$arity$1(env__$2) === true)))?cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,cljs.core.cst$kw$info,info),cljs.core.select_keys(info,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$op,cljs.core.cst$kw$name,cljs.core.cst$kw$ns,cljs.core.cst$kw$tag], null)),(function (){var temp__5735__auto__ = cljs.core.cst$kw$const_DASH_expr.cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(temp__5735__auto__)){
var const_expr = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$const_DASH_expr,const_expr], null);
} else {
return null;
}
})()], 0)):(function (){var info__$1 = cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(env__$2,sym__$1);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(ret,cljs.core.cst$kw$op,cljs.core.cst$kw$var,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$info,info__$1], 0)),cljs.core.select_keys(info__$1,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$op,cljs.core.cst$kw$name,cljs.core.cst$kw$ns,cljs.core.cst$kw$tag], null))], 0));
})()));
} else {
var lb = temp__5737__auto__;
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(ret,cljs.core.cst$kw$op,cljs.core.cst$kw$local,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$info,lb], 0)),((cljs.core.map_QMARK_(lb))?cljs.core.select_keys(lb,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$name,cljs.core.cst$kw$local,cljs.core.cst$kw$arg_DASH_id,cljs.core.cst$kw$variadic_QMARK_,cljs.core.cst$kw$init], null)):null)], 0));
}
}
});
cljs.analyzer.excluded_QMARK_ = (function cljs$analyzer$excluded_QMARK_(env,sym){
return (((!((cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$4(env,cljs.core.cst$kw$ns,cljs.core.cst$kw$excludes,sym) == null)))) || ((!((cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$ns,cljs.core.cst$kw$name),cljs.core.cst$kw$excludes,sym) == null)))));
});
cljs.analyzer.used_QMARK_ = (function cljs$analyzer$used_QMARK_(env,sym){
return (((!((cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$4(env,cljs.core.cst$kw$ns,cljs.core.cst$kw$use_DASH_macros,sym) == null)))) || ((!((cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$ns,cljs.core.cst$kw$name),cljs.core.cst$kw$use_DASH_macros,sym) == null)))));
});
cljs.analyzer.get_expander_ns = (function cljs$analyzer$get_expander_ns(env,nstr){
var res = (function (){var or__4131__auto__ = cljs.analyzer.resolve_macro_ns_alias.cljs$core$IFn$_invoke$arity$3(env,nstr,null);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.analyzer.resolve_ns_alias.cljs$core$IFn$_invoke$arity$3(env,nstr,null);
}
})();
var nstr__$1 = (((!((res == null))))?cljs.core.str.cljs$core$IFn$_invoke$arity$1(res):nstr);
if(("clojure.core" === nstr__$1)){
return cljs.core.find_macros_ns(cljs.analyzer.CLJS_CORE_MACROS_SYM);
} else {
if(("clojure.repl" === nstr__$1)){
return cljs.core.find_macros_ns(cljs.core.cst$sym$cljs$repl);
} else {
if(cljs.core.truth_(goog.string.contains(nstr__$1,"."))){
return cljs.core.find_macros_ns(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(nstr__$1));
} else {
var G__16513 = env;
var G__16513__$1 = (((G__16513 == null))?null:cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(G__16513));
var G__16513__$2 = (((G__16513__$1 == null))?null:cljs.core.cst$kw$require_DASH_macros.cljs$core$IFn$_invoke$arity$1(G__16513__$1));
var G__16513__$3 = (((G__16513__$2 == null))?null:cljs.core.get.cljs$core$IFn$_invoke$arity$2(G__16513__$2,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(nstr__$1)));
if((G__16513__$3 == null)){
return null;
} else {
return cljs.core.find_macros_ns(G__16513__$3);
}

}
}
}
});
cljs.analyzer.get_expander_STAR_ = (function cljs$analyzer$get_expander_STAR_(sym,env){
if((((!((cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$locals,sym) == null)))) || (((cljs.analyzer.excluded_QMARK_(env,sym)) && ((!(cljs.analyzer.used_QMARK_(env,sym)))))))){
return null;
} else {
var nstr = cljs.core.namespace(sym);
if((!((nstr == null)))){
var ns = cljs.analyzer.get_expander_ns(env,nstr);
if((!((ns == null)))){
return ns.findInternedVar(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(sym)));
} else {
return null;
}
} else {
if((!((cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$4(env,cljs.core.cst$kw$ns,cljs.core.cst$kw$rename_DASH_macros,sym) == null)))){
var qualified_symbol = cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$4(env,cljs.core.cst$kw$ns,cljs.core.cst$kw$rename_DASH_macros,sym);
var nsym = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace(qualified_symbol));
var sym__$1 = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(qualified_symbol));
return cljs.core.find_macros_ns(nsym).findInternedVar(sym__$1);
} else {
var nsym = cljs.analyzer.gets.cljs$core$IFn$_invoke$arity$4(env,cljs.core.cst$kw$ns,cljs.core.cst$kw$use_DASH_macros,sym);
if((((!((nsym == null)))) && ((nsym instanceof cljs.core.Symbol)))){
return cljs.core.find_macros_ns(nsym).findInternedVar(sym);
} else {
return cljs.core.find_macros_ns(cljs.analyzer.CLJS_CORE_MACROS_SYM).findInternedVar(sym);
}

}
}
}
});
/**
 * Given a sym, a symbol identifying a macro, and env, an analysis environment
 * return the corresponding Clojure macroexpander.
 */
cljs.analyzer.get_expander = (function cljs$analyzer$get_expander(sym,env){
var mvar = cljs.analyzer.get_expander_STAR_(sym,env);
if((((!((mvar == null)))) && (mvar.isMacro()))){
return mvar;
} else {
return null;
}
});
var cached_var_16514 = (new cljs.core.Delay((function (){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.ns_interns_STAR_(cljs.core.cst$sym$cljs$spec$alpha),cljs.core.cst$sym$macroexpand_DASH_check);
}),null));
cljs.analyzer.get_macroexpand_check_var = ((function (cached_var_16514){
return (function cljs$analyzer$get_macroexpand_check_var(){
if((!((cljs.core.find_ns_obj(cljs.core.cst$sym$cljs$spec$alpha) == null)))){
return cljs.core.deref(cached_var_16514);
} else {
return null;
}
});})(cached_var_16514))
;
cljs.analyzer.var__GT_sym = (function cljs$analyzer$var__GT_sym(var$){
return var$.sym;
});
cljs.analyzer.do_macroexpand_check = (function cljs$analyzer$do_macroexpand_check(env,form,mac_var){
if(cljs.core.not(cljs.core.cst$kw$spec_DASH_skip_DASH_macros.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_))))){
var mchk = cljs.analyzer.get_macroexpand_check_var();
if((!((mchk == null)))){
try{var G__16516 = mac_var;
var G__16517 = cljs.core.next(form);
return (mchk.cljs$core$IFn$_invoke$arity$2 ? mchk.cljs$core$IFn$_invoke$arity$2(G__16516,G__16517) : mchk(G__16516,G__16517));
}catch (e16515){var e = e16515;
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$3(null,cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$macro_DASH_syntax_DASH_check,cljs.analyzer.var__GT_sym(mac_var)),e);
}} else {
return null;
}
} else {
return null;
}
});
cljs.analyzer.macroexpand_1_STAR_ = (function cljs$analyzer$macroexpand_1_STAR_(env,form){
var op = cljs.core.first(form);
if(cljs.core.contains_QMARK_(cljs.analyzer.specials,op)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$ns,op)){
cljs.analyzer.do_macroexpand_check(env,form,cljs.analyzer.get_expander(cljs.core.cst$sym$cljs$core_SLASH_ns_DASH_special_DASH_form,env));
} else {
}

return form;
} else {
var temp__5737__auto__ = (((op instanceof cljs.core.Symbol))?cljs.analyzer.get_expander(op,env):null);
if((temp__5737__auto__ == null)){
if((op instanceof cljs.core.Symbol)){
var opname = cljs.core.str.cljs$core$IFn$_invoke$arity$1(op);
if(("." === opname.charAt((0)))){
var vec__16518 = cljs.core.next(form);
var seq__16519 = cljs.core.seq(vec__16518);
var first__16520 = cljs.core.first(seq__16519);
var seq__16519__$1 = cljs.core.next(seq__16519);
var target = first__16520;
var args = seq__16519__$1;
return cljs.core.with_meta(cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$4(cljs.analyzer.DOT_SYM,target,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(opname,(1))),args),cljs.core.meta(form));
} else {
if(("." === opname.charAt((opname.length - (1))))){
return cljs.core.with_meta(cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$3(cljs.analyzer.NEW_SYM,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(opname,(0),(cljs.core.count(opname) - (1)))),cljs.core.next(form)),cljs.core.meta(form));
} else {
return form;

}
}
} else {
return form;
}
} else {
var mac_var = temp__5737__auto__;
cljs.analyzer.do_macroexpand_check(env,form,mac_var);

var form_SINGLEQUOTE_ = (function (){try{return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(mac_var),form,env,cljs.core.rest(form));
}catch (e16521){var e = e16521;
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$3(null,cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$macroexpansion,cljs.analyzer.var__GT_sym(mac_var)),e);
}})();
if(cljs.analyzer.cljs_seq_QMARK_(form_SINGLEQUOTE_)){
var sym_SINGLEQUOTE_ = cljs.core.first(form_SINGLEQUOTE_);
var sym = cljs.core.first(form);
if(cljs.core.symbol_identical_QMARK_(sym_SINGLEQUOTE_,cljs.analyzer.JS_STAR_SYM)){
var sym__$1 = (((!((cljs.core.namespace(sym) == null))))?sym:cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.core",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym)));
var js_op = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$js_DASH_op,sym__$1], null);
var numeric = (function (){var mac_var_ns = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace(mac_var.sym));
var mac_var_name = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(mac_var.sym));
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,mac_var_ns,cljs.core.cst$kw$defs,mac_var_name,cljs.core.cst$kw$meta,cljs.core.cst$kw$cljs$analyzer_SLASH_numeric], null));
})();
var js_op__$1 = ((numeric === true)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(js_op,cljs.core.cst$kw$numeric,true):js_op);
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$3(form_SINGLEQUOTE_,cljs.core.merge,js_op__$1);
} else {
return form_SINGLEQUOTE_;
}
} else {
return form_SINGLEQUOTE_;
}
}
}
});
/**
 * Given a env, an analysis environment, and form, a ClojureScript form,
 * macroexpand the form once.
 */
cljs.analyzer.macroexpand_1 = (function cljs$analyzer$macroexpand_1(env,form){
try{return cljs.analyzer.macroexpand_1_STAR_(env,form);
}catch (e16522){var err__15318__auto__ = e16522;
if(cljs.analyzer.has_error_data_QMARK_(err__15318__auto__)){
throw err__15318__auto__;
} else {
if(cljs.analyzer.analysis_error_QMARK_(err__15318__auto__)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$3(null,cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$compilation),err__15318__auto__);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$3(null,cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$compilation),cljs.analyzer.error.cljs$core$IFn$_invoke$arity$3(env,err__15318__auto__.message,err__15318__auto__));

}
}
}});
cljs.analyzer.analyze_seq_STAR_ = (function cljs$analyzer$analyze_seq_STAR_(op,env,form,name,opts){
if(cljs.core.contains_QMARK_(cljs.analyzer.specials,op)){
return (cljs.analyzer.parse.cljs$core$IFn$_invoke$arity$5 ? cljs.analyzer.parse.cljs$core$IFn$_invoke$arity$5(op,env,form,name,opts) : cljs.analyzer.parse(op,env,form,name,opts));
} else {
return cljs.analyzer.parse_invoke(env,form);
}
});
cljs.analyzer.analyze_seq_STAR__wrap = (function cljs$analyzer$analyze_seq_STAR__wrap(op,env,form,name,opts){
try{return cljs.analyzer.analyze_seq_STAR_(op,env,form,name,opts);
}catch (e16523){var err__15318__auto__ = e16523;
if(cljs.analyzer.has_error_data_QMARK_(err__15318__auto__)){
throw err__15318__auto__;
} else {
if(cljs.analyzer.analysis_error_QMARK_(err__15318__auto__)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$3(null,cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$compilation),err__15318__auto__);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$3(null,cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$compilation),cljs.analyzer.error.cljs$core$IFn$_invoke$arity$3(env,err__15318__auto__.message,err__15318__auto__));

}
}
}});
cljs.analyzer.analyze_seq = (function cljs$analyzer$analyze_seq(var_args){
var G__16525 = arguments.length;
switch (G__16525) {
case 3:
return cljs.analyzer.analyze_seq.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.analyzer.analyze_seq.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.analyze_seq.cljs$core$IFn$_invoke$arity$3 = (function (env,form,name){
return cljs.analyzer.analyze_seq.cljs$core$IFn$_invoke$arity$4(env,form,name,(cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)):null));
});

cljs.analyzer.analyze_seq.cljs$core$IFn$_invoke$arity$4 = (function (env,form,name,opts){
if(cljs.core.cst$kw$quoted_QMARK_.cljs$core$IFn$_invoke$arity$1(env)){
return (cljs.analyzer.analyze_list.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze_list.cljs$core$IFn$_invoke$arity$2(env,form) : cljs.analyzer.analyze_list(env,form));
} else {
var line = cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(form));
var line__$1 = (((line == null))?cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(env):line);
var col = cljs.core.cst$kw$column.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(form));
var col__$1 = (((col == null))?cljs.core.cst$kw$column.cljs$core$IFn$_invoke$arity$1(env):col);
var env__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(env,cljs.core.cst$kw$line,line__$1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$column,col__$1], 0));
var op = cljs.core.first(form);
if((op == null)){
throw cljs.analyzer.error.cljs$core$IFn$_invoke$arity$2(env__$1,"Can't call nil");
} else {
}

var mform = cljs.analyzer.macroexpand_1(env__$1,form);
if((form === mform)){
return cljs.analyzer.analyze_seq_STAR__wrap(op,env__$1,form,name,opts);
} else {
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$4 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$4(env__$1,mform,name,opts) : cljs.analyzer.analyze(env__$1,mform,name,opts));
}
}
});

cljs.analyzer.analyze_seq.cljs$lang$maxFixedArity = 4;

cljs.analyzer.analyze_map = (function cljs$analyzer$analyze_map(env,form){
var expr_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var ks = (function (){var _STAR_recur_frames_STAR__orig_val__16529 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__16530 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__16530;

try{return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (_STAR_recur_frames_STAR__orig_val__16529,_STAR_recur_frames_STAR__temp_val__16530,expr_env){
return (function (p1__16527_SHARP_){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(expr_env,p1__16527_SHARP_) : cljs.analyzer.analyze(expr_env,p1__16527_SHARP_));
});})(_STAR_recur_frames_STAR__orig_val__16529,_STAR_recur_frames_STAR__temp_val__16530,expr_env))
,cljs.core.keys(form));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__16529;
}})();
var vs = (function (){var _STAR_recur_frames_STAR__orig_val__16531 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__16532 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__16532;

try{return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (_STAR_recur_frames_STAR__orig_val__16531,_STAR_recur_frames_STAR__temp_val__16532,expr_env,ks){
return (function (p1__16528_SHARP_){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(expr_env,p1__16528_SHARP_) : cljs.analyzer.analyze(expr_env,p1__16528_SHARP_));
});})(_STAR_recur_frames_STAR__orig_val__16531,_STAR_recur_frames_STAR__temp_val__16532,expr_env,ks))
,cljs.core.vals(form));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__16531;
}})();
var G__16533 = new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$op,cljs.core.cst$kw$map,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$keys,ks,cljs.core.cst$kw$vals,vs,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$keys,cljs.core.cst$kw$vals], null),cljs.core.cst$kw$tag,cljs.core.cst$sym$cljs$core_SLASH_IMap], null);
return (cljs.analyzer.analyze_wrap_meta.cljs$core$IFn$_invoke$arity$1 ? cljs.analyzer.analyze_wrap_meta.cljs$core$IFn$_invoke$arity$1(G__16533) : cljs.analyzer.analyze_wrap_meta(G__16533));
});
cljs.analyzer.analyze_list = (function cljs$analyzer$analyze_list(env,form){
var expr_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var items = (function (){var _STAR_recur_frames_STAR__orig_val__16535 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__16536 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__16536;

try{return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (_STAR_recur_frames_STAR__orig_val__16535,_STAR_recur_frames_STAR__temp_val__16536,expr_env){
return (function (p1__16534_SHARP_){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(expr_env,p1__16534_SHARP_) : cljs.analyzer.analyze(expr_env,p1__16534_SHARP_));
});})(_STAR_recur_frames_STAR__orig_val__16535,_STAR_recur_frames_STAR__temp_val__16536,expr_env))
,form);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__16535;
}})();
var G__16537 = new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$op,cljs.core.cst$kw$list,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$items,items,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$items], null),cljs.core.cst$kw$tag,cljs.core.cst$sym$cljs$core_SLASH_IList], null);
return (cljs.analyzer.analyze_wrap_meta.cljs$core$IFn$_invoke$arity$1 ? cljs.analyzer.analyze_wrap_meta.cljs$core$IFn$_invoke$arity$1(G__16537) : cljs.analyzer.analyze_wrap_meta(G__16537));
});
cljs.analyzer.analyze_vector = (function cljs$analyzer$analyze_vector(env,form){
var expr_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var items = (function (){var _STAR_recur_frames_STAR__orig_val__16539 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__16540 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__16540;

try{return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (_STAR_recur_frames_STAR__orig_val__16539,_STAR_recur_frames_STAR__temp_val__16540,expr_env){
return (function (p1__16538_SHARP_){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(expr_env,p1__16538_SHARP_) : cljs.analyzer.analyze(expr_env,p1__16538_SHARP_));
});})(_STAR_recur_frames_STAR__orig_val__16539,_STAR_recur_frames_STAR__temp_val__16540,expr_env))
,form);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__16539;
}})();
var G__16541 = new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$op,cljs.core.cst$kw$vector,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$items,items,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$items], null),cljs.core.cst$kw$tag,cljs.core.cst$sym$cljs$core_SLASH_IVector], null);
return (cljs.analyzer.analyze_wrap_meta.cljs$core$IFn$_invoke$arity$1 ? cljs.analyzer.analyze_wrap_meta.cljs$core$IFn$_invoke$arity$1(G__16541) : cljs.analyzer.analyze_wrap_meta(G__16541));
});
cljs.analyzer.analyze_set = (function cljs$analyzer$analyze_set(env,form){
var expr_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var items = (function (){var _STAR_recur_frames_STAR__orig_val__16543 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__16544 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__16544;

try{return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (_STAR_recur_frames_STAR__orig_val__16543,_STAR_recur_frames_STAR__temp_val__16544,expr_env){
return (function (p1__16542_SHARP_){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(expr_env,p1__16542_SHARP_) : cljs.analyzer.analyze(expr_env,p1__16542_SHARP_));
});})(_STAR_recur_frames_STAR__orig_val__16543,_STAR_recur_frames_STAR__temp_val__16544,expr_env))
,form);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__16543;
}})();
var G__16545 = new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$op,cljs.core.cst$kw$set,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$items,items,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$items], null),cljs.core.cst$kw$tag,cljs.core.cst$sym$cljs$core_SLASH_ISet], null);
return (cljs.analyzer.analyze_wrap_meta.cljs$core$IFn$_invoke$arity$1 ? cljs.analyzer.analyze_wrap_meta.cljs$core$IFn$_invoke$arity$1(G__16545) : cljs.analyzer.analyze_wrap_meta(G__16545));
});
cljs.analyzer.analyze_js_value = (function cljs$analyzer$analyze_js_value(env,form){
var val = form.val;
var expr_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
if(cljs.core.map_QMARK_(val)){
var keys = cljs.core.vec(cljs.core.keys(val));
var vals = (function (){var _STAR_recur_frames_STAR__orig_val__16548 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__16549 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__16549;

try{return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (_STAR_recur_frames_STAR__orig_val__16548,_STAR_recur_frames_STAR__temp_val__16549,keys,val,expr_env){
return (function (p1__16546_SHARP_){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(expr_env,p1__16546_SHARP_) : cljs.analyzer.analyze(expr_env,p1__16546_SHARP_));
});})(_STAR_recur_frames_STAR__orig_val__16548,_STAR_recur_frames_STAR__temp_val__16549,keys,val,expr_env))
,cljs.core.vals(val));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__16548;
}})();
return new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$op,cljs.core.cst$kw$js_DASH_object,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$keys,keys,cljs.core.cst$kw$vals,vals,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$vals], null),cljs.core.cst$kw$tag,cljs.core.cst$sym$object], null);
} else {
var items = (function (){var _STAR_recur_frames_STAR__orig_val__16550 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__16551 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__16551;

try{return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (_STAR_recur_frames_STAR__orig_val__16550,_STAR_recur_frames_STAR__temp_val__16551,val,expr_env){
return (function (p1__16547_SHARP_){
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(expr_env,p1__16547_SHARP_) : cljs.analyzer.analyze(expr_env,p1__16547_SHARP_));
});})(_STAR_recur_frames_STAR__orig_val__16550,_STAR_recur_frames_STAR__temp_val__16551,val,expr_env))
,val);
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__16550;
}})();
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$op,cljs.core.cst$kw$js_DASH_array,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$items,items,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$items], null),cljs.core.cst$kw$tag,cljs.core.cst$sym$array], null);
}
});
cljs.analyzer.record_ns_PLUS_name = (function cljs$analyzer$record_ns_PLUS_name(x){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.symbol,clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.type(x)], 0)),/\//));
});
cljs.analyzer.analyze_record = (function cljs$analyzer$analyze_record(env,x){
var _items_ = (function (){var _STAR_recur_frames_STAR__orig_val__16556 = cljs.analyzer._STAR_recur_frames_STAR_;
var _STAR_recur_frames_STAR__temp_val__16557 = cljs.core.cons(null,cljs.analyzer._STAR_recur_frames_STAR_);
cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__temp_val__16557;

try{var G__16558 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr);
var G__16559 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,x);
return (cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(G__16558,G__16559) : cljs.analyzer.analyze(G__16558,G__16559));
}finally {cljs.analyzer._STAR_recur_frames_STAR_ = _STAR_recur_frames_STAR__orig_val__16556;
}})();
var vec__16553 = cljs.analyzer.record_ns_PLUS_name(x);
var ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16553,(0),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16553,(1),null);
return new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$op,cljs.core.cst$kw$const,cljs.core.cst$kw$val,x,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,x,cljs.core.cst$kw$tag,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),cljs.core.str.cljs$core$IFn$_invoke$arity$1(name))], null);
});
cljs.analyzer.elide_reader_meta = (function cljs$analyzer$elide_reader_meta(m){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(m,cljs.core.cst$kw$file,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$line,cljs.core.cst$kw$column,cljs.core.cst$kw$end_DASH_column,cljs.core.cst$kw$end_DASH_line,cljs.core.cst$kw$source], 0));
});
cljs.analyzer.elide_analyzer_meta = (function cljs$analyzer$elide_analyzer_meta(m){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(m,cljs.core.cst$kw$cljs$analyzer_SLASH_analyzed);
});
cljs.analyzer.elide_irrelevant_meta = (function cljs$analyzer$elide_irrelevant_meta(m){
return cljs.analyzer.elide_analyzer_meta(cljs.analyzer.elide_reader_meta(m));
});
cljs.analyzer.analyze_wrap_meta = (function cljs$analyzer$analyze_wrap_meta(expr){
var form = cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(expr);
var m = cljs.analyzer.elide_irrelevant_meta(cljs.core.meta(form));
if((!((cljs.core.seq(m) == null)))){
var env = cljs.core.cst$kw$env.cljs$core$IFn$_invoke$arity$1(expr);
var expr__$1 = cljs.core.assoc_in(expr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$env,cljs.core.cst$kw$context], null),cljs.core.cst$kw$expr);
var meta_expr = cljs.analyzer.analyze_map(cljs.core.cst$kw$env.cljs$core$IFn$_invoke$arity$1(expr__$1),m);
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$op,cljs.core.cst$kw$with_DASH_meta,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form,cljs.core.cst$kw$meta,meta_expr,cljs.core.cst$kw$expr,expr__$1,cljs.core.cst$kw$children,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$meta,cljs.core.cst$kw$expr], null)], null);
} else {
return expr;
}
});
cljs.analyzer.infer_type = (function cljs$analyzer$infer_type(env,p__16561,_){
var map__16562 = p__16561;
var map__16562__$1 = (((((!((map__16562 == null))))?(((((map__16562.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16562.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16562):map__16562);
var ast = map__16562__$1;
var tag = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16562__$1,cljs.core.cst$kw$tag);
if((((tag == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$function,tag)))){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$fn,cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(ast))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(ast,cljs.core.cst$kw$methods,((function (map__16562,map__16562__$1,ast,tag){
return (function (ms){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (map__16562,map__16562__$1,ast,tag){
return (function (p1__16560_SHARP_){
return (cljs.analyzer.infer_type.cljs$core$IFn$_invoke$arity$3 ? cljs.analyzer.infer_type.cljs$core$IFn$_invoke$arity$3(env,p1__16560_SHARP_,_) : cljs.analyzer.infer_type(env,p1__16560_SHARP_,_));
});})(map__16562,map__16562__$1,ast,tag))
),ms);
});})(map__16562,map__16562__$1,ast,tag))
);
} else {
var temp__5737__auto__ = cljs.analyzer.infer_tag(env,ast);
if((temp__5737__auto__ == null)){
return ast;
} else {
var tag__$1 = temp__5737__auto__;
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ast,cljs.core.cst$kw$tag,tag__$1);
}
}
} else {
return ast;
}
});
cljs.analyzer.repl_self_require_QMARK_ = (function cljs$analyzer$repl_self_require_QMARK_(env,deps){
var and__4120__auto__ = cljs.core.cst$kw$repl_DASH_env.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.some(cljs.core.PersistentHashSet.createAsIfByAssoc([cljs.analyzer._STAR_cljs_ns_STAR_]),deps);
} else {
return and__4120__auto__;
}
});
cljs.analyzer.invoke_arg_type_validators = (function (){var aget_validator = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$valid_QMARK_,(function (p1__16564_SHARP_){
return ((cljs.analyzer.array_type_QMARK_(cljs.core.first(p1__16564_SHARP_))) && (cljs.core.every_QMARK_(cljs.analyzer.numeric_type_QMARK_,cljs.core.rest(p1__16564_SHARP_))));
}),cljs.core.cst$kw$warning_DASH_type,cljs.core.cst$kw$invalid_DASH_array_DASH_access], null);
var aset_validator = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$valid_QMARK_,((function (aget_validator){
return (function (p1__16565_SHARP_){
return ((cljs.analyzer.array_type_QMARK_(cljs.core.first(p1__16565_SHARP_))) && (cljs.core.every_QMARK_(cljs.analyzer.numeric_type_QMARK_,cljs.core.butlast(cljs.core.rest(p1__16565_SHARP_)))));
});})(aget_validator))
,cljs.core.cst$kw$warning_DASH_type,cljs.core.cst$kw$invalid_DASH_array_DASH_access], null);
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$sym$cljs$core_SLASH_checked_DASH_aget,aget_validator,cljs.core.cst$sym$cljs$core_SLASH_checked_DASH_aset,aset_validator,cljs.core.cst$sym$cljs$core_SLASH_checked_DASH_aget_SINGLEQUOTE_,aget_validator,cljs.core.cst$sym$cljs$core_SLASH_checked_DASH_aset_SINGLEQUOTE_,aset_validator], null);
})();
cljs.analyzer.check_invoke_arg_types = (function cljs$analyzer$check_invoke_arg_types(env,p__16566,opts){
var map__16567 = p__16566;
var map__16567__$1 = (((((!((map__16567 == null))))?(((((map__16567.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16567.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16567):map__16567);
var ast = map__16567__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16567__$1,cljs.core.cst$kw$op);
if((((!(cljs.analyzer.analyzed_QMARK_(ast)))) && (cljs.core.keyword_identical_QMARK_(cljs.core.cst$kw$invoke,op)))){
var temp__5739__auto___16574 = cljs.core.find(cljs.analyzer.invoke_arg_type_validators,cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$fn.cljs$core$IFn$_invoke$arity$1(ast))));
if((temp__5739__auto___16574 == null)){
} else {
var vec__16569_16575 = temp__5739__auto___16574;
var name_16576 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16569_16575,(0),null);
var map__16572_16577 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16569_16575,(1),null);
var map__16572_16578__$1 = (((((!((map__16572_16577 == null))))?(((((map__16572_16577.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16572_16577.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16572_16577):map__16572_16577);
var valid_QMARK__16579 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16572_16578__$1,cljs.core.cst$kw$valid_QMARK_);
var warning_type_16580 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16572_16578__$1,cljs.core.cst$kw$warning_DASH_type);
var types_16581 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$tag,cljs.core.cst$kw$args.cljs$core$IFn$_invoke$arity$1(ast));
if(cljs.core.truth_((valid_QMARK__16579.cljs$core$IFn$_invoke$arity$1 ? valid_QMARK__16579.cljs$core$IFn$_invoke$arity$1(types_16581) : valid_QMARK__16579(types_16581)))){
} else {
cljs.analyzer.warning(warning_type_16580,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$name,name_16576,cljs.core.cst$kw$types,types_16581], null));
}
}
} else {
}

return cljs.analyzer.analyzed(ast);
});
cljs.analyzer.analyze_form = (function cljs$analyzer$analyze_form(env,form,name,opts){
if((form instanceof cljs.core.Symbol)){
return cljs.analyzer.analyze_symbol(env,form);
} else {
if(((cljs.analyzer.cljs_seq_QMARK_(form)) && ((!((cljs.core.seq(form) == null)))))){
return cljs.analyzer.analyze_seq.cljs$core$IFn$_invoke$arity$4(env,form,name,opts);
} else {
if(cljs.core.record_QMARK_(form)){
return cljs.analyzer.analyze_record(env,form);
} else {
if(cljs.analyzer.cljs_map_QMARK_(form)){
return cljs.analyzer.analyze_map(env,form);
} else {
if(cljs.analyzer.cljs_vector_QMARK_(form)){
return cljs.analyzer.analyze_vector(env,form);
} else {
if(cljs.analyzer.cljs_set_QMARK_(form)){
return cljs.analyzer.analyze_set(env,form);
} else {
if((form instanceof cljs.core.Keyword)){
return cljs.analyzer.analyze_keyword(env,form);
} else {
if((form instanceof cljs.tagged_literals.JSValue)){
return cljs.analyzer.analyze_js_value(env,form);
} else {
var tag = (((form == null))?cljs.analyzer.CLJ_NIL_SYM:((typeof form === 'number')?cljs.analyzer.NUMBER_SYM:((typeof form === 'string')?cljs.analyzer.STRING_SYM:((form === true)?cljs.analyzer.BOOLEAN_SYM:((form === false)?cljs.analyzer.BOOLEAN_SYM:((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.List.EMPTY,form))?cljs.core.cst$sym$cljs$core_SLASH_IList:null))))));
var G__16582 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$op,cljs.core.cst$kw$const,cljs.core.cst$kw$val,form,cljs.core.cst$kw$env,env,cljs.core.cst$kw$form,form], null);
if(cljs.core.truth_(tag)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16582,cljs.core.cst$kw$tag,tag);
} else {
return G__16582;
}

}
}
}
}
}
}
}
}
});
cljs.analyzer.analyze_STAR_ = (function cljs$analyzer$analyze_STAR_(env,form,name,opts){
var passes = cljs.analyzer._STAR_passes_STAR_;
var passes__$1 = (((passes == null))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.analyzer.infer_type,cljs.analyzer.check_invoke_arg_types], null):passes);
var form__$1 = (((form instanceof cljs.core.LazySeq))?((cljs.core.seq(form))?form:cljs.core.List.EMPTY):form);
var ast = cljs.analyzer.analyze_form(env,form__$1,name,opts);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (passes,passes__$1,form__$1,ast){
return (function (ast__$1,pass){
return (pass.cljs$core$IFn$_invoke$arity$3 ? pass.cljs$core$IFn$_invoke$arity$3(env,ast__$1,opts) : pass(env,ast__$1,opts));
});})(passes,passes__$1,form__$1,ast))
,ast,passes__$1);
});
/**
 * Given an environment, a map containing {:locals (mapping of names to bindings), :context
 *   (one of :statement, :expr, :return), :ns (a symbol naming the
 *   compilation ns)}, and form, returns an expression object (a map
 *   containing at least :form, :op and :env keys). If expr has any (immediately)
 *   nested exprs, must have a :children entry. This must be a vector of keywords naming
 *   the immediately nested fields mapped to an expr or vector of exprs. This will
 *   facilitate code walking without knowing the details of the op set.
 */
cljs.analyzer.analyze = (function cljs$analyzer$analyze(var_args){
var G__16584 = arguments.length;
switch (G__16584) {
case 2:
return cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2 = (function (env,form){
return cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$3(env,form,null);
});

cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$3 = (function (env,form,name){
return cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$4(env,form,name,(cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)):null));
});

cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$4 = (function (env,form,name,opts){
try{if(cljs.analyzer.analyzed_QMARK_(form)){
var _STAR_cljs_warnings_STAR__orig_val__16586 = cljs.analyzer._STAR_cljs_warnings_STAR_;
var _STAR_cljs_warnings_STAR__temp_val__16587 = cljs.core.zipmap(cljs.core.keys(cljs.analyzer._STAR_cljs_warnings_STAR_),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(false));
cljs.analyzer._STAR_cljs_warnings_STAR_ = _STAR_cljs_warnings_STAR__temp_val__16587;

try{return cljs.analyzer.analyze_STAR_(env,form,name,opts);
}finally {cljs.analyzer._STAR_cljs_warnings_STAR_ = _STAR_cljs_warnings_STAR__orig_val__16586;
}} else {
return cljs.analyzer.analyze_STAR_(env,form,name,opts);
}
}catch (e16585){var err__15318__auto__ = e16585;
if(cljs.analyzer.has_error_data_QMARK_(err__15318__auto__)){
throw err__15318__auto__;
} else {
if(cljs.analyzer.analysis_error_QMARK_(err__15318__auto__)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$3(null,cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$compilation),err__15318__auto__);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$3(null,cljs.analyzer.error_data.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$compilation),cljs.analyzer.error.cljs$core$IFn$_invoke$arity$3(env,err__15318__auto__.message,err__15318__auto__));

}
}
}});

cljs.analyzer.analyze.cljs$lang$maxFixedArity = 4;

/**
 * Given a compiler state and a map from fully qualified symbols to constant
 *   EDN values, update the compiler state marking these vars as const to support
 *   direct substitution of these vars in source.
 */
cljs.analyzer.add_consts = (function cljs$analyzer$add_consts(compiler_state,constants_map){
return cljs.core.reduce_kv((function (compiler_state__$1,sym,value){
var ns = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace(sym));
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(compiler_state__$1,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns,cljs.core.cst$kw$defs,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(sym))], null),cljs.core.merge,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$const_DASH_expr,(function (){var _STAR_passes_STAR__orig_val__16589 = cljs.analyzer._STAR_passes_STAR_;
var _STAR_passes_STAR__temp_val__16590 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.analyzer._STAR_passes_STAR_,cljs.analyzer.replace_env_pass(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$context,cljs.core.cst$kw$expr], null)));
cljs.analyzer._STAR_passes_STAR_ = _STAR_passes_STAR__temp_val__16590;

try{return cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.empty_env(),value);
}finally {cljs.analyzer._STAR_passes_STAR_ = _STAR_passes_STAR__orig_val__16589;
}})()], null));
}),compiler_state,constants_map);
});
cljs.analyzer.resolve_symbol = (function cljs$analyzer$resolve_symbol(sym){
if(((cljs.core.not(cljs.core.namespace(sym))) && (cljs.analyzer.dotted_symbol_QMARK_(sym)))){
return sym;
} else {
return cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1((function (){var _STAR_private_var_access_nowarn_STAR__orig_val__16591 = cljs.analyzer._STAR_private_var_access_nowarn_STAR_;
var _STAR_private_var_access_nowarn_STAR__temp_val__16592 = true;
cljs.analyzer._STAR_private_var_access_nowarn_STAR_ = _STAR_private_var_access_nowarn_STAR__temp_val__16592;

try{return cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$ns,cljs.analyzer.get_namespace.cljs$core$IFn$_invoke$arity$1(cljs.analyzer._STAR_cljs_ns_STAR_)),sym);
}finally {cljs.analyzer._STAR_private_var_access_nowarn_STAR_ = _STAR_private_var_access_nowarn_STAR__orig_val__16591;
}})());
}
});
var registry_ref_16593 = (new cljs.core.Delay((function (){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.ns_interns_STAR_(cljs.core.cst$sym$cljs$spec$alpha$macros),cljs.core.cst$sym$registry_DASH_ref);
}),null));
var speced_vars_16594 = (new cljs.core.Delay(((function (registry_ref_16593){
return (function (){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.ns_interns_STAR_(cljs.core.cst$sym$cljs$spec$alpha$macros),cljs.core.cst$sym$_DASH_speced_DASH_vars);
});})(registry_ref_16593))
,null));
cljs.analyzer.get_spec_vars = ((function (registry_ref_16593,speced_vars_16594){
return (function cljs$analyzer$get_spec_vars(){
if((!((cljs.core.find_ns_obj(cljs.core.cst$sym$cljs$spec$alpha$macros) == null)))){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$registry_DASH_ref,cljs.core.deref(registry_ref_16593),cljs.core.cst$kw$speced_DASH_vars,cljs.core.deref(speced_vars_16594)], null);
} else {
return null;
}
});})(registry_ref_16593,speced_vars_16594))
;
/**
 * Dumps registered speced vars for a given namespace into the compiler
 *   environment.
 */
cljs.analyzer.dump_specs = (function cljs$analyzer$dump_specs(ns){
var spec_vars = cljs.analyzer.get_spec_vars();
var ns_str = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.env._STAR_compiler_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns], null),cljs.core.merge,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var temp__5735__auto__ = cljs.core.cst$kw$registry_DASH_ref.cljs$core$IFn$_invoke$arity$1(spec_vars);
if(cljs.core.truth_(temp__5735__auto__)){
var registry_ref = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cljs$spec_SLASH_registry_DASH_ref,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1(((function (registry_ref,temp__5735__auto__,spec_vars,ns_str){
return (function (p__16595){
var vec__16596 = p__16595;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16596,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16596,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns_str,cljs.core.namespace(k));
});})(registry_ref,temp__5735__auto__,spec_vars,ns_str))
),cljs.core.deref(cljs.core.deref(registry_ref)))], null);
} else {
return null;
}
})(),(function (){var temp__5735__auto__ = cljs.core.cst$kw$speced_DASH_vars.cljs$core$IFn$_invoke$arity$1(spec_vars);
if(cljs.core.truth_(temp__5735__auto__)){
var speced_vars = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cljs$spec_SLASH_speced_DASH_vars,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1(((function (speced_vars,temp__5735__auto__,spec_vars,ns_str){
return (function (v){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns_str,cljs.core.namespace(v))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.cst$kw$fdef_DASH_ns.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(v)))));
});})(speced_vars,temp__5735__auto__,spec_vars,ns_str))
),cljs.core.deref(cljs.core.deref(speced_vars)))], null);
} else {
return null;
}
})()], 0));
});
/**
 * Registers speced vars found in a namespace analysis cache.
 */
cljs.analyzer.register_specs = (function cljs$analyzer$register_specs(cached_ns){
var map__16599 = cljs.analyzer.get_spec_vars();
var map__16599__$1 = (((((!((map__16599 == null))))?(((((map__16599.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16599.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16599):map__16599);
var registry_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16599__$1,cljs.core.cst$kw$registry_DASH_ref);
var speced_vars = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16599__$1,cljs.core.cst$kw$speced_DASH_vars);
var temp__5735__auto___16601 = cljs.core.seq(cljs.core.cst$kw$cljs$spec_SLASH_registry_DASH_ref.cljs$core$IFn$_invoke$arity$1(cached_ns));
if(temp__5735__auto___16601){
var registry_16602 = temp__5735__auto___16601;
if(cljs.core.truth_(registry_ref)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(registry_ref),cljs.core.into,registry_16602);
} else {
}
} else {
}

var temp__5735__auto__ = cljs.core.seq(cljs.core.cst$kw$cljs$spec_SLASH_speced_DASH_vars.cljs$core$IFn$_invoke$arity$1(cached_ns));
if(temp__5735__auto__){
var vars = temp__5735__auto__;
if(cljs.core.truth_(speced_vars)){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(speced_vars),cljs.core.into,vars);
} else {
return null;
}
} else {
return null;
}
});
cljs.analyzer.analyze_form_seq = (function cljs$analyzer$analyze_form_seq(var_args){
var G__16604 = arguments.length;
switch (G__16604) {
case 1:
return cljs.analyzer.analyze_form_seq.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.analyzer.analyze_form_seq.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.analyzer.analyze_form_seq.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.analyzer.analyze_form_seq.cljs$core$IFn$_invoke$arity$1 = (function (forms){
return cljs.analyzer.analyze_form_seq.cljs$core$IFn$_invoke$arity$2(forms,(cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)):null));
});

cljs.analyzer.analyze_form_seq.cljs$core$IFn$_invoke$arity$2 = (function (forms,opts){
return cljs.analyzer.analyze_form_seq.cljs$core$IFn$_invoke$arity$3(forms,opts,false);
});

cljs.analyzer.analyze_form_seq.cljs$core$IFn$_invoke$arity$3 = (function (forms,opts,return_last_QMARK_){
var env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.analyzer.empty_env(),cljs.core.cst$kw$build_DASH_options,opts);
var _STAR_file_defs_STAR__orig_val__16605 = cljs.analyzer._STAR_file_defs_STAR_;
var _STAR_cljs_ns_STAR__orig_val__16606 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_cljs_file_STAR__orig_val__16607 = cljs.analyzer._STAR_cljs_file_STAR_;
var _STAR_alias_map_STAR__orig_val__16608 = cljs.tools.reader._STAR_alias_map_STAR_;
var _STAR_file_defs_STAR__temp_val__16609 = null;
var _STAR_cljs_ns_STAR__temp_val__16610 = cljs.core.cst$sym$cljs$user;
var _STAR_cljs_file_STAR__temp_val__16611 = null;
var _STAR_alias_map_STAR__temp_val__16612 = (function (){var or__4131__auto__ = cljs.tools.reader._STAR_alias_map_STAR_;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
cljs.analyzer._STAR_file_defs_STAR_ = _STAR_file_defs_STAR__temp_val__16609;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR__temp_val__16610;

cljs.analyzer._STAR_cljs_file_STAR_ = _STAR_cljs_file_STAR__temp_val__16611;

cljs.tools.reader._STAR_alias_map_STAR_ = _STAR_alias_map_STAR__temp_val__16612;

try{var ns = null;
var forms__$1 = forms;
var last_ast = null;
while(true){
if((!((forms__$1 == null)))){
var form = cljs.core.first(forms__$1);
var env__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$ns,cljs.analyzer.get_namespace.cljs$core$IFn$_invoke$arity$1(cljs.analyzer._STAR_cljs_ns_STAR_));
var ast = cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$4(env__$1,form,null,opts);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(ast),cljs.core.cst$kw$ns)){
var G__16614 = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(ast);
var G__16615 = cljs.core.next(forms__$1);
var G__16616 = ast;
ns = G__16614;
forms__$1 = G__16615;
last_ast = G__16616;
continue;
} else {
var G__16617 = ns;
var G__16618 = cljs.core.next(forms__$1);
var G__16619 = ast;
ns = G__16617;
forms__$1 = G__16618;
last_ast = G__16619;
continue;
}
} else {
if(cljs.core.truth_(return_last_QMARK_)){
return last_ast;
} else {
return ns;
}
}
break;
}
}finally {cljs.tools.reader._STAR_alias_map_STAR_ = _STAR_alias_map_STAR__orig_val__16608;

cljs.analyzer._STAR_cljs_file_STAR_ = _STAR_cljs_file_STAR__orig_val__16607;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR__orig_val__16606;

cljs.analyzer._STAR_file_defs_STAR_ = _STAR_file_defs_STAR__orig_val__16605;
}});

cljs.analyzer.analyze_form_seq.cljs$lang$maxFixedArity = 3;

/**
 * Ensures that a non-nil defs map exists in the compiler state for a given
 *   ns. (A non-nil defs map signifies that the namespace has been analyzed.)
 */
cljs.analyzer.ensure_defs = (function cljs$analyzer$ensure_defs(ns){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.env._STAR_compiler_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns,cljs.core.cst$kw$defs], null),(function (p1__16620_SHARP_){
var or__4131__auto__ = p1__16620_SHARP_;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
}));
});
