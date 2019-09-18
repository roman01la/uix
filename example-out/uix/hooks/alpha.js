// Compiled by ClojureScript 1.10.520 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('uix.hooks.alpha');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('goog.object');
uix.hooks.alpha.global$module$react = goog.global["React"];

/**
* @constructor
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {uix.hooks.alpha.Object}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
*/
uix.hooks.alpha.StateHook = (function (value,set_value){
this.value = value;
this.set_value = set_value;
this.cljs$lang$protocol_mask$partition0$ = 2151710720;
this.cljs$lang$protocol_mask$partition1$ = 98304;
});
uix.hooks.alpha.StateHook.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return cljs.core._equiv(this$,other);
});

uix.hooks.alpha.StateHook.prototype.cljs$core$IHash$_hash$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return goog.getUid(o__$1);
});

uix.hooks.alpha.StateHook.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return self__.value;
});

uix.hooks.alpha.StateHook.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (o,new_value){
var self__ = this;
var o__$1 = this;
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(new_value) : self__.set_value(new_value));
});

uix.hooks.alpha.StateHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (o,f){
var self__ = this;
var o__$1 = this;
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(f) : self__.set_value(f));
});

uix.hooks.alpha.StateHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (o,f,a){
var self__ = this;
var o__$1 = this;
var G__19277 = ((function (o__$1){
return (function (p1__19274_SHARP_){
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(p1__19274_SHARP_,a) : f(p1__19274_SHARP_,a));
});})(o__$1))
;
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(G__19277) : self__.set_value(G__19277));
});

uix.hooks.alpha.StateHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (o,f,a,b){
var self__ = this;
var o__$1 = this;
var G__19278 = ((function (o__$1){
return (function (p1__19275_SHARP_){
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(p1__19275_SHARP_,a,b) : f(p1__19275_SHARP_,a,b));
});})(o__$1))
;
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(G__19278) : self__.set_value(G__19278));
});

uix.hooks.alpha.StateHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (o,f,a,b,xs){
var self__ = this;
var o__$1 = this;
var G__19279 = ((function (o__$1){
return (function (p1__19276_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,p1__19276_SHARP_,a,b,xs);
});})(o__$1))
;
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(G__19279) : self__.set_value(G__19279));
});

uix.hooks.alpha.StateHook.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (o,writer,opts){
var self__ = this;
var o__$1 = this;
cljs.core._write(writer,"#object [uix.hooks.alpha.StateHook ");

cljs.core.pr_writer(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$val,self__.value], null),writer,opts);

return cljs.core._write(writer,"]");
});

uix.hooks.alpha.StateHook.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$value,cljs.core.cst$sym$set_DASH_value], null);
});

uix.hooks.alpha.StateHook.cljs$lang$type = true;

uix.hooks.alpha.StateHook.cljs$lang$ctorStr = "uix.hooks.alpha/StateHook";

uix.hooks.alpha.StateHook.cljs$lang$ctorPrWriter = (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write(writer__4375__auto__,"uix.hooks.alpha/StateHook");
});

/**
 * Positional factory function for uix.hooks.alpha/StateHook.
 */
uix.hooks.alpha.__GT_StateHook = (function uix$hooks$alpha$__GT_StateHook(value,set_value){
return (new uix.hooks.alpha.StateHook(value,set_value));
});

/**
 * Takes initial value and returns an instance of StateHook.
 */
uix.hooks.alpha.state = (function uix$hooks$alpha$state(value){
var vec__19280 = (uix.hooks.alpha.global$module$react.useState.cljs$core$IFn$_invoke$arity$1 ? uix.hooks.alpha.global$module$react.useState.cljs$core$IFn$_invoke$arity$1(value) : uix.hooks.alpha.global$module$react.useState(value));
var value__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19280,(0),null);
var set_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19280,(1),null);
return (new uix.hooks.alpha.StateHook(value__$1,set_value));
});

/**
 * @interface
 */
uix.hooks.alpha.IRef = function(){};

uix.hooks.alpha.unwrap = (function uix$hooks$alpha$unwrap(this$){
if((((!((this$ == null)))) && ((!((this$.uix$hooks$alpha$IRef$unwrap$arity$1 == null)))))){
return this$.uix$hooks$alpha$IRef$unwrap$arity$1(this$);
} else {
var x__4433__auto__ = (((this$ == null))?null:this$);
var m__4434__auto__ = (uix.hooks.alpha.unwrap[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return (m__4434__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4434__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4434__auto__(this$));
} else {
var m__4431__auto__ = (uix.hooks.alpha.unwrap["_"]);
if((!((m__4431__auto__ == null)))){
return (m__4431__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4431__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4431__auto__(this$));
} else {
throw cljs.core.missing_protocol("IRef.unwrap",this$);
}
}
}
});


/**
* @constructor
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {uix.hooks.alpha.Object}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {uix.hooks.alpha.IRef}
*/
uix.hooks.alpha.RefHook = (function (rref){
this.rref = rref;
this.cljs$lang$protocol_mask$partition0$ = 2151710720;
this.cljs$lang$protocol_mask$partition1$ = 98304;
});
uix.hooks.alpha.RefHook.prototype.uix$hooks$alpha$IRef$ = cljs.core.PROTOCOL_SENTINEL;

uix.hooks.alpha.RefHook.prototype.uix$hooks$alpha$IRef$unwrap$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.rref;
});

uix.hooks.alpha.RefHook.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return cljs.core._equiv(this$,other);
});

uix.hooks.alpha.RefHook.prototype.cljs$core$IHash$_hash$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return goog.getUid(o__$1);
});

uix.hooks.alpha.RefHook.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return goog.object.get(self__.rref,"current");
});

uix.hooks.alpha.RefHook.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (o,new_value){
var self__ = this;
var o__$1 = this;
goog.object.set(self__.rref,"current",new_value);

return new_value;
});

uix.hooks.alpha.RefHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (o,f){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__19283 = o__$1.cljs$core$IDeref$_deref$arity$1(null);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__19283) : f(G__19283));
})());
});

uix.hooks.alpha.RefHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (o,f,a){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__19284 = o__$1.cljs$core$IDeref$_deref$arity$1(null);
var G__19285 = a;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__19284,G__19285) : f(G__19284,G__19285));
})());
});

uix.hooks.alpha.RefHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (o,f,a,b){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__19286 = o__$1.cljs$core$IDeref$_deref$arity$1(null);
var G__19287 = a;
var G__19288 = b;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__19286,G__19287,G__19288) : f(G__19286,G__19287,G__19288));
})());
});

uix.hooks.alpha.RefHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (o,f,a,b,xs){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,o__$1.cljs$core$IDeref$_deref$arity$1(null),a,b,xs));
});

uix.hooks.alpha.RefHook.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (o,writer,opts){
var self__ = this;
var o__$1 = this;
cljs.core._write(writer,"#object [uix.hooks.alpha.RefHook ");

cljs.core.pr_writer(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$val,o__$1.cljs$core$IDeref$_deref$arity$1(null)], null),writer,opts);

return cljs.core._write(writer,"]");
});

uix.hooks.alpha.RefHook.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$rref], null);
});

uix.hooks.alpha.RefHook.cljs$lang$type = true;

uix.hooks.alpha.RefHook.cljs$lang$ctorStr = "uix.hooks.alpha/RefHook";

uix.hooks.alpha.RefHook.cljs$lang$ctorPrWriter = (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write(writer__4375__auto__,"uix.hooks.alpha/RefHook");
});

/**
 * Positional factory function for uix.hooks.alpha/RefHook.
 */
uix.hooks.alpha.__GT_RefHook = (function uix$hooks$alpha$__GT_RefHook(rref){
return (new uix.hooks.alpha.RefHook(rref));
});

/**
 * Takes optional initial value and returns an instance of RefHook.
 */
uix.hooks.alpha.ref = (function uix$hooks$alpha$ref(var_args){
var G__19290 = arguments.length;
switch (G__19290) {
case 0:
return uix.hooks.alpha.ref.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return uix.hooks.alpha.ref.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

uix.hooks.alpha.ref.cljs$core$IFn$_invoke$arity$0 = (function (){
return uix.hooks.alpha.ref.cljs$core$IFn$_invoke$arity$1(null);
});

uix.hooks.alpha.ref.cljs$core$IFn$_invoke$arity$1 = (function (value){
return (new uix.hooks.alpha.RefHook((uix.hooks.alpha.global$module$react.useRef.cljs$core$IFn$_invoke$arity$1 ? uix.hooks.alpha.global$module$react.useRef.cljs$core$IFn$_invoke$arity$1(value) : uix.hooks.alpha.global$module$react.useRef(value))));
});

uix.hooks.alpha.ref.cljs$lang$maxFixedArity = 1;

/**
 * Takes a function to be executed in an effect and optional vector of dependencies.
 * 
 *   See: https://reactjs.org/docs/hooks-reference.html#useeffect
 */
uix.hooks.alpha.effect_BANG_ = (function uix$hooks$alpha$effect_BANG_(var_args){
var G__19293 = arguments.length;
switch (G__19293) {
case 1:
return uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (setup_fn){
return uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2(setup_fn,undefined);
});

uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (setup_fn,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref.cljs$core$IFn$_invoke$arity$1(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__19294 = ((function (prev_deps_STAR_){
return (function (){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);

var ret = (setup_fn.cljs$core$IFn$_invoke$arity$0 ? setup_fn.cljs$core$IFn$_invoke$arity$0() : setup_fn());
if(cljs.core.fn_QMARK_(ret)){
return ret;
} else {
return undefined;
}
});})(prev_deps_STAR_))
;
var G__19295 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return (uix.hooks.alpha.global$module$react.useEffect.cljs$core$IFn$_invoke$arity$2 ? uix.hooks.alpha.global$module$react.useEffect.cljs$core$IFn$_invoke$arity$2(G__19294,G__19295) : uix.hooks.alpha.global$module$react.useEffect(G__19294,G__19295));
});

uix.hooks.alpha.effect_BANG_.cljs$lang$maxFixedArity = 2;

/**
 * Takes a function to be executed in a layout effect and optional vector of dependencies.
 * 
 *   See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */
uix.hooks.alpha.layout_effect_BANG_ = (function uix$hooks$alpha$layout_effect_BANG_(var_args){
var G__19298 = arguments.length;
switch (G__19298) {
case 1:
return uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (setup_fn){
return uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$2(setup_fn,undefined);
});

uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (setup_fn,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref.cljs$core$IFn$_invoke$arity$1(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__19299 = ((function (prev_deps_STAR_){
return (function (){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);

var ret = (setup_fn.cljs$core$IFn$_invoke$arity$0 ? setup_fn.cljs$core$IFn$_invoke$arity$0() : setup_fn());
if(cljs.core.fn_QMARK_(ret)){
return ret;
} else {
return undefined;
}
});})(prev_deps_STAR_))
;
var G__19300 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return (uix.hooks.alpha.global$module$react.useLayoutEffect.cljs$core$IFn$_invoke$arity$2 ? uix.hooks.alpha.global$module$react.useLayoutEffect.cljs$core$IFn$_invoke$arity$2(G__19299,G__19300) : uix.hooks.alpha.global$module$react.useLayoutEffect(G__19299,G__19300));
});

uix.hooks.alpha.layout_effect_BANG_.cljs$lang$maxFixedArity = 2;

/**
 * Takes function f and optional vector of dependencies, and returns f.
 */
uix.hooks.alpha.callback = (function uix$hooks$alpha$callback(var_args){
var G__19303 = arguments.length;
switch (G__19303) {
case 1:
return uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$1 = (function (f){
return uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$2(f,null);
});

uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$2 = (function (f,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref.cljs$core$IFn$_invoke$arity$1(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__19304 = f;
var G__19305 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return (uix.hooks.alpha.global$module$react.useCallback.cljs$core$IFn$_invoke$arity$2 ? uix.hooks.alpha.global$module$react.useCallback.cljs$core$IFn$_invoke$arity$2(G__19304,G__19305) : uix.hooks.alpha.global$module$react.useCallback(G__19304,G__19305));
});

uix.hooks.alpha.callback.cljs$lang$maxFixedArity = 2;

/**
 * Takes function f and optional vector of dependencies, and returns memoized f.
 */
uix.hooks.alpha.memo = (function uix$hooks$alpha$memo(var_args){
var G__19308 = arguments.length;
switch (G__19308) {
case 1:
return uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$1 = (function (f){
return uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$2(f,null);
});

uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$2 = (function (f,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref.cljs$core$IFn$_invoke$arity$1(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__19309 = f;
var G__19310 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return (uix.hooks.alpha.global$module$react.useMemo.cljs$core$IFn$_invoke$arity$2 ? uix.hooks.alpha.global$module$react.useMemo.cljs$core$IFn$_invoke$arity$2(G__19309,G__19310) : uix.hooks.alpha.global$module$react.useMemo(G__19309,G__19310));
});

uix.hooks.alpha.memo.cljs$lang$maxFixedArity = 2;

