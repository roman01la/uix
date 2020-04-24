// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
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
(uix.hooks.alpha.StateHook.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return cljs.core._equiv(this$,other);
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$IHash$_hash$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return goog.getUid(o__$1);
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return self__.value;
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (o,new_value){
var self__ = this;
var o__$1 = this;
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(new_value) : self__.set_value(new_value));
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (o,f){
var self__ = this;
var o__$1 = this;
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(f) : self__.set_value(f));
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (o,f,a){
var self__ = this;
var o__$1 = this;
var G__19238 = (function (p1__19235_SHARP_){
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(p1__19235_SHARP_,a) : f(p1__19235_SHARP_,a));
});
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(G__19238) : self__.set_value(G__19238));
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (o,f,a,b){
var self__ = this;
var o__$1 = this;
var G__19239 = (function (p1__19236_SHARP_){
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(p1__19236_SHARP_,a,b) : f(p1__19236_SHARP_,a,b));
});
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(G__19239) : self__.set_value(G__19239));
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (o,f,a,b,xs){
var self__ = this;
var o__$1 = this;
var G__19240 = (function (p1__19237_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,p1__19237_SHARP_,a,b,xs);
});
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(G__19240) : self__.set_value(G__19240));
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (o,writer,opts){
var self__ = this;
var o__$1 = this;
cljs.core._write(writer,"#object [uix.hooks.alpha.StateHook ");

cljs.core.pr_writer(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$val,self__.value], null),writer,opts);

return cljs.core._write(writer,"]");
}));

(uix.hooks.alpha.StateHook.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$value,cljs.core.cst$sym$set_DASH_value], null);
}));

(uix.hooks.alpha.StateHook.cljs$lang$type = true);

(uix.hooks.alpha.StateHook.cljs$lang$ctorStr = "uix.hooks.alpha/StateHook");

(uix.hooks.alpha.StateHook.cljs$lang$ctorPrWriter = (function (this__4363__auto__,writer__4364__auto__,opt__4365__auto__){
return cljs.core._write(writer__4364__auto__,"uix.hooks.alpha/StateHook");
}));

/**
 * Positional factory function for uix.hooks.alpha/StateHook.
 */
uix.hooks.alpha.__GT_StateHook = (function uix$hooks$alpha$__GT_StateHook(value,set_value){
return (new uix.hooks.alpha.StateHook(value,set_value));
});

uix.hooks.alpha.state = (function uix$hooks$alpha$state(value){
var vec__19241 = uix.hooks.alpha.global$module$react.useState(value);
var value__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19241,(0),null);
var set_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19241,(1),null);
var sh = (function (){var G__19244 = (function (){
return (new uix.hooks.alpha.StateHook(value__$1,set_value));
});
var G__19245 = [];
return uix.hooks.alpha.global$module$react.useMemo(G__19244,G__19245);
})();
var G__19246 = (function (){
(sh.value = value__$1);

(sh.set_value = set_value);

return sh;
});
var G__19247 = [value__$1,set_value];
return uix.hooks.alpha.global$module$react.useMemo(G__19246,G__19247);
});

/**
 * @interface
 */
uix.hooks.alpha.IRef = function(){};

var uix$hooks$alpha$IRef$unwrap$dyn_19248 = (function (this$){
var x__4422__auto__ = (((this$ == null))?null:this$);
var m__4423__auto__ = (uix.hooks.alpha.unwrap[goog.typeOf(x__4422__auto__)]);
if((!((m__4423__auto__ == null)))){
return (m__4423__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4423__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4423__auto__(this$));
} else {
var m__4420__auto__ = (uix.hooks.alpha.unwrap["_"]);
if((!((m__4420__auto__ == null)))){
return (m__4420__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4420__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4420__auto__(this$));
} else {
throw cljs.core.missing_protocol("IRef.unwrap",this$);
}
}
});
uix.hooks.alpha.unwrap = (function uix$hooks$alpha$unwrap(this$){
if((((!((this$ == null)))) && ((!((this$.uix$hooks$alpha$IRef$unwrap$arity$1 == null)))))){
return this$.uix$hooks$alpha$IRef$unwrap$arity$1(this$);
} else {
return uix$hooks$alpha$IRef$unwrap$dyn_19248(this$);
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
(uix.hooks.alpha.RefHook.prototype.uix$hooks$alpha$IRef$ = cljs.core.PROTOCOL_SENTINEL);

(uix.hooks.alpha.RefHook.prototype.uix$hooks$alpha$IRef$unwrap$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.rref;
}));

(uix.hooks.alpha.RefHook.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return cljs.core._equiv(this$,other);
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$IHash$_hash$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return goog.getUid(o__$1);
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return goog.object.get(self__.rref,"current");
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (o,new_value){
var self__ = this;
var o__$1 = this;
goog.object.set(self__.rref,"current",new_value);

return new_value;
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (o,f){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__19249 = o__$1.cljs$core$IDeref$_deref$arity$1(null);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__19249) : f(G__19249));
})());
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (o,f,a){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__19250 = o__$1.cljs$core$IDeref$_deref$arity$1(null);
var G__19251 = a;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__19250,G__19251) : f(G__19250,G__19251));
})());
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (o,f,a,b){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__19252 = o__$1.cljs$core$IDeref$_deref$arity$1(null);
var G__19253 = a;
var G__19254 = b;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__19252,G__19253,G__19254) : f(G__19252,G__19253,G__19254));
})());
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (o,f,a,b,xs){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,o__$1.cljs$core$IDeref$_deref$arity$1(null),a,b,xs));
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (o,writer,opts){
var self__ = this;
var o__$1 = this;
cljs.core._write(writer,"#object [uix.hooks.alpha.RefHook ");

cljs.core.pr_writer(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$val,o__$1.cljs$core$IDeref$_deref$arity$1(null)], null),writer,opts);

return cljs.core._write(writer,"]");
}));

(uix.hooks.alpha.RefHook.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$rref], null);
}));

(uix.hooks.alpha.RefHook.cljs$lang$type = true);

(uix.hooks.alpha.RefHook.cljs$lang$ctorStr = "uix.hooks.alpha/RefHook");

(uix.hooks.alpha.RefHook.cljs$lang$ctorPrWriter = (function (this__4363__auto__,writer__4364__auto__,opt__4365__auto__){
return cljs.core._write(writer__4364__auto__,"uix.hooks.alpha/RefHook");
}));

/**
 * Positional factory function for uix.hooks.alpha/RefHook.
 */
uix.hooks.alpha.__GT_RefHook = (function uix$hooks$alpha$__GT_RefHook(rref){
return (new uix.hooks.alpha.RefHook(rref));
});

uix.hooks.alpha.ref = (function uix$hooks$alpha$ref(value){
var vref = uix.hooks.alpha.global$module$react.useRef(value);
var G__19255 = (function (){
return (new uix.hooks.alpha.RefHook(vref));
});
var G__19256 = [];
return uix.hooks.alpha.global$module$react.useMemo(G__19255,G__19256);
});
uix.hooks.alpha.effect_BANG_ = (function uix$hooks$alpha$effect_BANG_(var_args){
var G__19258 = arguments.length;
switch (G__19258) {
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

(uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (setup_fn){
var G__19259 = (function (){
var ret = (setup_fn.cljs$core$IFn$_invoke$arity$0 ? setup_fn.cljs$core$IFn$_invoke$arity$0() : setup_fn());
if(cljs.core.fn_QMARK_(ret)){
return ret;
} else {
return undefined;
}
});
return uix.hooks.alpha.global$module$react.useEffect(G__19259);
}));

(uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (setup_fn,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__19260 = (function (){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);

var ret = (setup_fn.cljs$core$IFn$_invoke$arity$0 ? setup_fn.cljs$core$IFn$_invoke$arity$0() : setup_fn());
if(cljs.core.fn_QMARK_(ret)){
return ret;
} else {
return undefined;
}
});
var G__19261 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return uix.hooks.alpha.global$module$react.useEffect(G__19260,G__19261);
}));

(uix.hooks.alpha.effect_BANG_.cljs$lang$maxFixedArity = 2);

uix.hooks.alpha.layout_effect_BANG_ = (function uix$hooks$alpha$layout_effect_BANG_(var_args){
var G__19264 = arguments.length;
switch (G__19264) {
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

(uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (setup_fn){
var G__19265 = (function (){
var ret = (setup_fn.cljs$core$IFn$_invoke$arity$0 ? setup_fn.cljs$core$IFn$_invoke$arity$0() : setup_fn());
if(cljs.core.fn_QMARK_(ret)){
return ret;
} else {
return undefined;
}
});
return uix.hooks.alpha.global$module$react.useLayoutEffect(G__19265);
}));

(uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (setup_fn,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__19266 = (function (){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);

var ret = (setup_fn.cljs$core$IFn$_invoke$arity$0 ? setup_fn.cljs$core$IFn$_invoke$arity$0() : setup_fn());
if(cljs.core.fn_QMARK_(ret)){
return ret;
} else {
return undefined;
}
});
var G__19267 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return uix.hooks.alpha.global$module$react.useLayoutEffect(G__19266,G__19267);
}));

(uix.hooks.alpha.layout_effect_BANG_.cljs$lang$maxFixedArity = 2);

uix.hooks.alpha.callback = (function uix$hooks$alpha$callback(var_args){
var G__19270 = arguments.length;
switch (G__19270) {
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

(uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$1 = (function (f){
return uix.hooks.alpha.global$module$react.useCallback(f);
}));

(uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$2 = (function (f,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__19271 = f;
var G__19272 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return uix.hooks.alpha.global$module$react.useCallback(G__19271,G__19272);
}));

(uix.hooks.alpha.callback.cljs$lang$maxFixedArity = 2);

uix.hooks.alpha.memo = (function uix$hooks$alpha$memo(var_args){
var G__19275 = arguments.length;
switch (G__19275) {
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

(uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$1 = (function (f){
return uix.hooks.alpha.global$module$react.useMemo(f);
}));

(uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$2 = (function (f,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__19276 = f;
var G__19277 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return uix.hooks.alpha.global$module$react.useMemo(G__19276,G__19277);
}));

(uix.hooks.alpha.memo.cljs$lang$maxFixedArity = 2);

uix.hooks.alpha.context = (function uix$hooks$alpha$context(v){
return uix.hooks.alpha.global$module$react.useContext(v);
});
uix.hooks.alpha.imperative_handle = (function uix$hooks$alpha$imperative_handle(ref,create_handle,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__19279 = ref;
var G__19280 = create_handle;
var G__19281 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return uix.hooks.alpha.global$module$react.useImperativeHandle(G__19279,G__19280,G__19281);
});
uix.hooks.alpha.debug = (function uix$hooks$alpha$debug(var_args){
var G__19283 = arguments.length;
switch (G__19283) {
case 1:
return uix.hooks.alpha.debug.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.hooks.alpha.debug.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.hooks.alpha.debug.cljs$core$IFn$_invoke$arity$1 = (function (v){
return uix.hooks.alpha.debug.cljs$core$IFn$_invoke$arity$2(v,null);
}));

(uix.hooks.alpha.debug.cljs$core$IFn$_invoke$arity$2 = (function (v,fmt){
return uix.hooks.alpha.global$module$react.useDebugValue(v,fmt);
}));

(uix.hooks.alpha.debug.cljs$lang$maxFixedArity = 2);

uix.hooks.alpha.batched_update = (((typeof ReactDOM !== 'undefined'))?ReactDOM.unstable_batchedUpdates:(function (f){
return (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f());
}));
uix.hooks.alpha.subscribe = (function uix$hooks$alpha$subscribe(p__19286){
var map__19287 = p__19286;
var map__19287__$1 = (((((!((map__19287 == null))))?(((((map__19287.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19287.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19287):map__19287);
var get_current_value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19287__$1,cljs.core.cst$kw$get_DASH_current_DASH_value);
var subscribe = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19287__$1,cljs.core.cst$kw$subscribe);
var get_initial_state = (function (){var G__19292 = (function (){
return ({"get-current-value": get_current_value, "subscribe": subscribe, "value": (get_current_value.cljs$core$IFn$_invoke$arity$0 ? get_current_value.cljs$core$IFn$_invoke$arity$0() : get_current_value())});
});
var G__19293 = [get_current_value,subscribe];
return uix.hooks.alpha.global$module$react.useCallback(G__19292,G__19293);
})();
var vec__19289 = uix.hooks.alpha.global$module$react.useState(get_initial_state);
var state = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19289,(0),null);
var set_state = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19289,(1),null);
var ret_value = (((((!((goog.object.get(state,"get-current-value") === get_current_value)))) || ((!((goog.object.get(state,"subscribe") === subscribe))))))?(function (){var ret_val = (get_current_value.cljs$core$IFn$_invoke$arity$0 ? get_current_value.cljs$core$IFn$_invoke$arity$0() : get_current_value());
var G__19294_19299 = ({"get-current-value": get_current_value, "subscribe": subscribe, "value": ret_val});
(set_state.cljs$core$IFn$_invoke$arity$1 ? set_state.cljs$core$IFn$_invoke$arity$1(G__19294_19299) : set_state(G__19294_19299));

return ret_val;
})():goog.object.get(state,"value"));
uix.hooks.alpha.global$module$react.useDebugValue(ret_value);

var G__19295_19300 = (function (){
var did_unsubscribe_QMARK_ = cljs.core.volatile_BANG_(false);
var check_for_updates = (function (){
if(cljs.core.deref(did_unsubscribe_QMARK_)){
return null;
} else {
var value = (get_current_value.cljs$core$IFn$_invoke$arity$0 ? get_current_value.cljs$core$IFn$_invoke$arity$0() : get_current_value());
var G__19297 = (function (){
var G__19298 = (function (p1__19285_SHARP_){
if((((!((goog.object.get(p1__19285_SHARP_,"get-current-value") === get_current_value)))) || ((!((goog.object.get(p1__19285_SHARP_,"subscribe") === subscribe)))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(goog.object.get(p1__19285_SHARP_,"value"),value)))){
return p1__19285_SHARP_;
} else {
return Object.assign(({}),p1__19285_SHARP_,({"value": value}));
}
});
return (set_state.cljs$core$IFn$_invoke$arity$1 ? set_state.cljs$core$IFn$_invoke$arity$1(G__19298) : set_state(G__19298));
});
return (uix.hooks.alpha.batched_update.cljs$core$IFn$_invoke$arity$1 ? uix.hooks.alpha.batched_update.cljs$core$IFn$_invoke$arity$1(G__19297) : uix.hooks.alpha.batched_update(G__19297));
}
});
var unsubscribe = (subscribe.cljs$core$IFn$_invoke$arity$1 ? subscribe.cljs$core$IFn$_invoke$arity$1(check_for_updates) : subscribe(check_for_updates));
check_for_updates();

return (function (){
cljs.core.vreset_BANG_(did_unsubscribe_QMARK_,true);

return (unsubscribe.cljs$core$IFn$_invoke$arity$0 ? unsubscribe.cljs$core$IFn$_invoke$arity$0() : unsubscribe());
});
});
var G__19296_19301 = [get_current_value,subscribe];
uix.hooks.alpha.global$module$react.useEffect(G__19295_19300,G__19296_19301);

return ret_value;
});

/**
* @constructor
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {uix.hooks.alpha.Object}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
*/
uix.hooks.alpha.Cursor = (function (ref,path){
this.ref = ref;
this.path = path;
this.cljs$lang$protocol_mask$partition0$ = 2151710720;
this.cljs$lang$protocol_mask$partition1$ = 98304;
});
(uix.hooks.alpha.Cursor.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return cljs.core._equiv(this$,other);
}));

(uix.hooks.alpha.Cursor.prototype.cljs$core$IHash$_hash$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return goog.getUid(o__$1);
}));

(uix.hooks.alpha.Cursor.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.ref),self__.path);
}));

(uix.hooks.alpha.Cursor.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (o,new_value){
var self__ = this;
var o__$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.ref,cljs.core.update_in,self__.path,cljs.core.constantly(new_value));
}));

(uix.hooks.alpha.Cursor.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (o,f){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__19302 = o__$1.cljs$core$IDeref$_deref$arity$1(null);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__19302) : f(G__19302));
})());
}));

(uix.hooks.alpha.Cursor.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (o,f,a){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__19303 = o__$1.cljs$core$IDeref$_deref$arity$1(null);
var G__19304 = a;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__19303,G__19304) : f(G__19303,G__19304));
})());
}));

(uix.hooks.alpha.Cursor.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (o,f,a,b){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__19305 = o__$1.cljs$core$IDeref$_deref$arity$1(null);
var G__19306 = a;
var G__19307 = b;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__19305,G__19306,G__19307) : f(G__19305,G__19306,G__19307));
})());
}));

(uix.hooks.alpha.Cursor.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (o,f,a,b,xs){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,o__$1.cljs$core$IDeref$_deref$arity$1(null),a,b,xs));
}));

(uix.hooks.alpha.Cursor.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (o,writer,opts){
var self__ = this;
var o__$1 = this;
cljs.core._write(writer,"#object [uix.hooks.alpha.Cursor ");

cljs.core.pr_writer(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$val,o__$1.cljs$core$IDeref$_deref$arity$1(null)], null),writer,opts);

return cljs.core._write(writer,"]");
}));

(uix.hooks.alpha.Cursor.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$ref,cljs.core.cst$sym$path], null);
}));

(uix.hooks.alpha.Cursor.cljs$lang$type = true);

(uix.hooks.alpha.Cursor.cljs$lang$ctorStr = "uix.hooks.alpha/Cursor");

(uix.hooks.alpha.Cursor.cljs$lang$ctorPrWriter = (function (this__4363__auto__,writer__4364__auto__,opt__4365__auto__){
return cljs.core._write(writer__4364__auto__,"uix.hooks.alpha/Cursor");
}));

/**
 * Positional factory function for uix.hooks.alpha/Cursor.
 */
uix.hooks.alpha.__GT_Cursor = (function uix$hooks$alpha$__GT_Cursor(ref,path){
return (new uix.hooks.alpha.Cursor(ref,path));
});

uix.hooks.alpha.cursor_in = (function uix$hooks$alpha$cursor_in(ref,path){
return uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$2((function (){
return (new uix.hooks.alpha.Cursor(ref,path));
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ref,path], null));
});
