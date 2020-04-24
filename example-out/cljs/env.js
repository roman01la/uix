// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('cljs.env');
goog.require('cljs.core');
goog.require('cljs.core.constants');
cljs.env._STAR_compiler_STAR_ = null;
cljs.env.default_compiler_env_STAR_ = (function cljs$env$default_compiler_env_STAR_(options){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$cljs$user,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,cljs.core.cst$sym$cljs$user], null)], null),cljs.core.cst$kw$cljs$analyzer_SLASH_constant_DASH_table,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$cljs$analyzer_SLASH_data_DASH_readers,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$cljs$analyzer_SLASH_externs,null,cljs.core.cst$kw$options,options], null)], 0));
});
cljs.env.default_compiler_env = (function cljs$env$default_compiler_env(var_args){
var G__16130 = arguments.length;
switch (G__16130) {
case 0:
return cljs.env.default_compiler_env.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.env.default_compiler_env.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.env.default_compiler_env.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.env.default_compiler_env.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.env.default_compiler_env.cljs$core$IFn$_invoke$arity$1 = (function (options){
return cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.env.default_compiler_env_STAR_(options));
}));

(cljs.env.default_compiler_env.cljs$lang$maxFixedArity = 1);

