// Compiled by ClojureScript 1.10.520 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('uix.core.alpha');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('uix.compiler.alpha');
goog.require('uix.compiler.react');
goog.require('uix.hooks.alpha');
uix.core.alpha.global$module$react = goog.global["React"];
uix.core.alpha.strict_mode = (function uix$core$alpha$strict_mode(child){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,uix.core.alpha.global$module$react.StrictMode,child], null);
});

/**
* @constructor
 * @implements {cljs.core.IHash}
 * @implements {uix.core.alpha.Object}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
*/
uix.core.alpha.ReactRef = (function (current){
this.current = current;
this.cljs$lang$protocol_mask$partition0$ = 2151710720;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
uix.core.alpha.ReactRef.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return cljs.core._equiv(this$,other);
});

uix.core.alpha.ReactRef.prototype.cljs$core$IHash$_hash$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return goog.getUid(o__$1);
});

uix.core.alpha.ReactRef.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return self__.current;
});

uix.core.alpha.ReactRef.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (o,writer,opts){
var self__ = this;
var o__$1 = this;
cljs.core._write(writer,"#object [uix.core.alpha.ReactRef ");

cljs.core.pr_writer(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$val,o__$1.cljs$core$IDeref$_deref$arity$1(null)], null),writer,opts);

return cljs.core._write(writer,"]");
});

uix.core.alpha.ReactRef.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$current], null);
});

uix.core.alpha.ReactRef.cljs$lang$type = true;

uix.core.alpha.ReactRef.cljs$lang$ctorStr = "uix.core.alpha/ReactRef";

uix.core.alpha.ReactRef.cljs$lang$ctorPrWriter = (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write(writer__4375__auto__,"uix.core.alpha/ReactRef");
});

/**
 * Positional factory function for uix.core.alpha/ReactRef.
 */
uix.core.alpha.__GT_ReactRef = (function uix$core$alpha$__GT_ReactRef(current){
return (new uix.core.alpha.ReactRef(current));
});

/**
 * Creates React's ref type object.
 */
uix.core.alpha.create_ref = (function uix$core$alpha$create_ref(var_args){
var G__19420 = arguments.length;
switch (G__19420) {
case 0:
return uix.core.alpha.create_ref.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return uix.core.alpha.create_ref.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

uix.core.alpha.create_ref.cljs$core$IFn$_invoke$arity$0 = (function (){
return uix.core.alpha.create_ref.cljs$core$IFn$_invoke$arity$1(null);
});

uix.core.alpha.create_ref.cljs$core$IFn$_invoke$arity$1 = (function (v){
return (new uix.core.alpha.ReactRef(v));
});

uix.core.alpha.create_ref.cljs$lang$maxFixedArity = 1;

uix.core.alpha.default_compare_args = (function uix$core$alpha$default_compare_args(a,b){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a.argv,b.argv);
});
/**
 * Takes component `f` and comparator function `should-update?`
 *   that takes previous and next props of the component.
 *   Returns memoized `f`.
 * 
 *   When `should-update?` is not provided uses default comparator
 *   that compares props with clojure.core/=
 */
uix.core.alpha.memoize = (function uix$core$alpha$memoize(var_args){
var G__19423 = arguments.length;
switch (G__19423) {
case 1:
return uix.core.alpha.memoize.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.core.alpha.memoize.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

uix.core.alpha.memoize.cljs$core$IFn$_invoke$arity$1 = (function (f){
return uix.core.alpha.memoize.cljs$core$IFn$_invoke$arity$2(f,uix.core.alpha.default_compare_args);
});

uix.core.alpha.memoize.cljs$core$IFn$_invoke$arity$2 = (function (f,should_update_QMARK_){
return (uix.core.alpha.global$module$react.memo.cljs$core$IFn$_invoke$arity$2 ? uix.core.alpha.global$module$react.memo.cljs$core$IFn$_invoke$arity$2(f,should_update_QMARK_) : uix.core.alpha.global$module$react.memo(f,should_update_QMARK_));
});

uix.core.alpha.memoize.cljs$lang$maxFixedArity = 2;

/**
 * Returns React's state hook wrapped in atom-like type.
 */
uix.core.alpha.state = uix.hooks.alpha.state;
/**
 * React's effect hook. Takes callback and deps.
 */
uix.core.alpha.effect_BANG_ = uix.hooks.alpha.effect_BANG_;
/**
 * React's layout effect hook. Takes callback and deps.
 */
uix.core.alpha.layout_effect_BANG_ = uix.hooks.alpha.layout_effect_BANG_;
/**
 * React's memo hook. Takes callback and deps.
 */
uix.core.alpha.memo = uix.hooks.alpha.memo;
/**
 * Returns React's ref hook wrapped in atom-like type. Takes optional initial value.
 */
uix.core.alpha.ref = uix.hooks.alpha.ref;
/**
 * React's callback hook. Takes callback and deps.
 */
uix.core.alpha.callback = uix.hooks.alpha.callback;
uix.core.alpha.as_element = (function uix$core$alpha$as_element(x){

return uix.compiler.alpha.as_element(x);
});
uix.core.alpha.as_react = (function uix$core$alpha$as_react(f){
return uix.compiler.alpha.as_react(f);
});
/**
 * Injects attributes transforming function for Hiccup elements pre-transformations
 */
uix.core.alpha.add_transform_fn = uix.compiler.alpha.add_transform_fn;
