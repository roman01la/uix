// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('uix.core.alpha');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('uix.compiler.alpha');
goog.require('uix.compiler.aot');
goog.require('uix.lib');
goog.require('uix.hooks.alpha');
uix.core.alpha.global$module$react = goog.global["React"];
if(((goog.DEBUG) && ((typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined')))){
if((typeof uix !== 'undefined') && (typeof uix.core !== 'undefined') && (typeof uix.core.alpha !== 'undefined') && (typeof uix.core.alpha.__devtools_hook !== 'undefined')){
} else {
uix.core.alpha.__devtools_hook = (function (){var value = cljs.core.volatile_BANG_(null);
var react_type_setter = (function (v){
return cljs.core.vreset_BANG_(value,v);
});
var react_type_getter = (function (){
var temp__5733__auto__ = cljs.core.deref(value).uixf;
if(cljs.core.truth_(temp__5733__auto__)){
var uixf = temp__5733__auto__;
return uixf;
} else {
return cljs.core.deref(value);
}
});
var config = ({"get": react_type_getter, "set": react_type_setter});
return Object.defineProperty(window,"$type",config);
})();
}
} else {
}
uix.core.alpha.strict_mode = (function uix$core$alpha$strict_mode(child){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,uix.core.alpha.global$module$react.StrictMode,child], null);
});
uix.core.alpha.profiler = (function uix$core$alpha$profiler(child,p__20267){
var map__20268 = p__20267;
var map__20268__$1 = (((((!((map__20268 == null))))?(((((map__20268.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20268.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20268):map__20268);
var attrs = map__20268__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20268__$1,cljs.core.cst$kw$id);
var on_render = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20268__$1,cljs.core.cst$kw$on_DASH_render);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,uix.core.alpha.global$module$react.Profiler,attrs,child], null);
});
/**
 * Creates class based React component
 */
uix.core.alpha.create_class = (function uix$core$alpha$create_class(p__20270){
var map__20271 = p__20270;
var map__20271__$1 = (((((!((map__20271 == null))))?(((((map__20271.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20271.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20271):map__20271);
var constructor$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20271__$1,cljs.core.cst$kw$constructor);
var static$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20271__$1,cljs.core.cst$kw$static);
var prototype = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20271__$1,cljs.core.cst$kw$prototype);
var ctor = (function (props){
var this_20285 = this;
uix.core.alpha.global$module$react.Component.apply(this_20285,arguments);

if(cljs.core.truth_(constructor$)){
(constructor$.cljs$core$IFn$_invoke$arity$2 ? constructor$.cljs$core$IFn$_invoke$arity$2(this_20285,props) : constructor$(this_20285,props));
} else {
}

return null;
});
(ctor.prototype = Object.create(uix.core.alpha.global$module$react.Component.prototype));

var v__19127__auto___20286 = static$;
if(cljs.core.seq(v__19127__auto___20286)){
var x__19128__auto___20287 = cljs.core.first(v__19127__auto___20286);
var xs__19129__auto___20288 = cljs.core.next(v__19127__auto___20286);
while(true){
var vec__20276_20289 = x__19128__auto___20287;
var k_20290 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20276_20289,(0),null);
var v_20291 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20276_20289,(1),null);
(ctor[cljs.core.name(k_20290)] = v_20291);

if(cljs.core.seq(xs__19129__auto___20288)){
var G__20292 = cljs.core.first(xs__19129__auto___20288);
var G__20293 = cljs.core.next(xs__19129__auto___20288);
x__19128__auto___20287 = G__20292;
xs__19129__auto___20288 = G__20293;
continue;
} else {
}
break;
}
} else {
}

var v__19127__auto___20294 = prototype;
if(cljs.core.seq(v__19127__auto___20294)){
var x__19128__auto___20295 = cljs.core.first(v__19127__auto___20294);
var xs__19129__auto___20296 = cljs.core.next(v__19127__auto___20294);
while(true){
var vec__20282_20297 = x__19128__auto___20295;
var k_20298 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20282_20297,(0),null);
var v_20299 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20282_20297,(1),null);
(ctor.prototype[cljs.core.name(k_20298)] = v_20299);

if(cljs.core.seq(xs__19129__auto___20296)){
var G__20300 = cljs.core.first(xs__19129__auto___20296);
var G__20301 = cljs.core.next(xs__19129__auto___20296);
x__19128__auto___20295 = G__20300;
xs__19129__auto___20296 = G__20301;
continue;
} else {
}
break;
}
} else {
}

return ctor;
});
/**
 * Creates React's Error Boundary component
 * 
 *  display-name — the name of the component to be displayed in stack trace
 *  error->state — maps error object to component's state that is used in render-fn
 *  handle-catch — for side-effects, logging etc.
 *  render-fn — takes state value returned from error->state and a vector of arguments passed into error boundary
 */
uix.core.alpha.create_error_boundary = (function uix$core$alpha$create_error_boundary(p__20302,render_fn){
var map__20303 = p__20302;
var map__20303__$1 = (((((!((map__20303 == null))))?(((((map__20303.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20303.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20303):map__20303);
var display_name = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20303__$1,cljs.core.cst$kw$display_DASH_name,cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("error-boundary")));
var error__GT_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20303__$1,cljs.core.cst$kw$error_DASH__GT_state);
var handle_catch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20303__$1,cljs.core.cst$kw$handle_DASH_catch);
var constructor$ = (function (this$,_){
(this$.state = ({"argv": null}));

var x20305 = this$.state;
(x20305.cljs$core$IDeref$ = cljs.core.PROTOCOL_SENTINEL);

(x20305.cljs$core$IDeref$_deref$arity$1 = (function (o){
var o__$1 = this;
return this$.state.argv;
}));

(x20305.cljs$core$IReset$ = cljs.core.PROTOCOL_SENTINEL);

(x20305.cljs$core$IReset$_reset_BANG_$arity$2 = (function (o,new_value){
var o__$1 = this;
this$.setState(({"argv": new_value}));

return new_value;
}));

(x20305.cljs$core$ISwap$ = cljs.core.PROTOCOL_SENTINEL);

(x20305.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (o,f){
var o__$1 = this;
return cljs.core._reset_BANG_(o__$1,(function (){var G__20306 = cljs.core._deref(o__$1);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__20306) : f(G__20306));
})());
}));

(x20305.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (o,f,a){
var o__$1 = this;
return cljs.core._reset_BANG_(o__$1,(function (){var G__20307 = cljs.core._deref(o__$1);
var G__20308 = a;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__20307,G__20308) : f(G__20307,G__20308));
})());
}));

(x20305.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (o,f,a,b){
var o__$1 = this;
return cljs.core._reset_BANG_(o__$1,(function (){var G__20309 = cljs.core._deref(o__$1);
var G__20310 = a;
var G__20311 = b;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__20309,G__20310,G__20311) : f(G__20309,G__20310,G__20311));
})());
}));

(x20305.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (o,f,a,b,xs){
var o__$1 = this;
return cljs.core._reset_BANG_(o__$1,cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,cljs.core._deref(o__$1),a,b,xs));
}));

return x20305;
});
var derive_state = (function (error){
return ({"argv": (error__GT_state.cljs$core$IFn$_invoke$arity$1 ? error__GT_state.cljs$core$IFn$_invoke$arity$1(error) : error__GT_state(error))});
});
var render = (function (){
var this$ = this;
var args = this$.props.argv;
var state = this$.state;
var G__20312 = (render_fn.cljs$core$IFn$_invoke$arity$2 ? render_fn.cljs$core$IFn$_invoke$arity$2(state,args) : render_fn(state,args));
return (uix.core.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.core.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__20312) : uix.core.alpha.as_element(G__20312));
});
var klass = uix.core.alpha.create_class(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$constructor,constructor$,cljs.core.cst$kw$static,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$displayName,display_name,cljs.core.cst$kw$getDerivedStateFromError,derive_state], null),cljs.core.cst$kw$prototype,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$componentDidCatch,handle_catch,cljs.core.cst$kw$render,render], null)], null));
return (function() { 
var G__20315__delegate = function (args){
var G__20313 = klass;
var G__20314 = ({"argv": args});
return uix.core.alpha.global$module$react.createElement(G__20313,G__20314);
};
var G__20315 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__20316__i = 0, G__20316__a = new Array(arguments.length -  0);
while (G__20316__i < G__20316__a.length) {G__20316__a[G__20316__i] = arguments[G__20316__i + 0]; ++G__20316__i;}
  args = new cljs.core.IndexedSeq(G__20316__a,0,null);
} 
return G__20315__delegate.call(this,args);};
G__20315.cljs$lang$maxFixedArity = 0;
G__20315.cljs$lang$applyTo = (function (arglist__20317){
var args = cljs.core.seq(arglist__20317);
return G__20315__delegate(args);
});
G__20315.cljs$core$IFn$_invoke$arity$variadic = G__20315__delegate;
return G__20315;
})()
;
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
(uix.core.alpha.ReactRef.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return cljs.core._equiv(this$,other);
}));

(uix.core.alpha.ReactRef.prototype.cljs$core$IHash$_hash$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return goog.getUid(o__$1);
}));

(uix.core.alpha.ReactRef.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return self__.current;
}));

(uix.core.alpha.ReactRef.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (o,writer,opts){
var self__ = this;
var o__$1 = this;
cljs.core._write(writer,"#object [uix.core.alpha.ReactRef ");

cljs.core.pr_writer(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$val,o__$1.cljs$core$IDeref$_deref$arity$1(null)], null),writer,opts);

return cljs.core._write(writer,"]");
}));

(uix.core.alpha.ReactRef.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$current], null);
}));

(uix.core.alpha.ReactRef.cljs$lang$type = true);

(uix.core.alpha.ReactRef.cljs$lang$ctorStr = "uix.core.alpha/ReactRef");

(uix.core.alpha.ReactRef.cljs$lang$ctorPrWriter = (function (this__4363__auto__,writer__4364__auto__,opt__4365__auto__){
return cljs.core._write(writer__4364__auto__,"uix.core.alpha/ReactRef");
}));

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
var G__20319 = arguments.length;
switch (G__20319) {
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

(uix.core.alpha.create_ref.cljs$core$IFn$_invoke$arity$0 = (function (){
return uix.core.alpha.create_ref.cljs$core$IFn$_invoke$arity$1(null);
}));

(uix.core.alpha.create_ref.cljs$core$IFn$_invoke$arity$1 = (function (v){
return (new uix.core.alpha.ReactRef(v));
}));

(uix.core.alpha.create_ref.cljs$lang$maxFixedArity = 1);

/**
 * Takes component `f` and comparator function `should-update?`
 *   that takes previous and next props of the component.
 *   Returns memoized `f`.
 * 
 *   When `should-update?` is not provided uses default comparator
 *   that compares props with clojure.core/=
 * 
 *   UIx components are memoized by default
 */
uix.core.alpha.memoize = (function uix$core$alpha$memoize(var_args){
var G__20323 = arguments.length;
switch (G__20323) {
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

(uix.core.alpha.memoize.cljs$core$IFn$_invoke$arity$1 = (function (f){
return uix.core.alpha.memoize.cljs$core$IFn$_invoke$arity$2(f,uix.compiler.alpha._STAR_default_compare_args_STAR_);
}));

(uix.core.alpha.memoize.cljs$core$IFn$_invoke$arity$2 = (function (f,should_update_QMARK_){
var G__20324 = (function (p1__20321_SHARP_){
return uix.compiler.alpha.as_element(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,cljs.core.next(p1__20321_SHARP_.argv)));
});
var G__20325 = should_update_QMARK_;
return uix.core.alpha.global$module$react.memo(G__20324,G__20325);
}));

(uix.core.alpha.memoize.cljs$lang$maxFixedArity = 2);

/**
 * Disables memoization of the `f` component
 */
uix.core.alpha.no_memoize_BANG_ = (function uix$core$alpha$no_memoize_BANG_(f){
return (f.uix_no_memo = true);
});
/**
 * Takes initial value and returns React's state hook wrapped in atom-like type.
 */
uix.core.alpha.state = (function uix$core$alpha$state(value){
return uix.hooks.alpha.state(value);
});
/**
 * Takes ref type value and path vector and returns ref type cursor value watching into original ref
 */
uix.core.alpha.cursor_in = (function uix$core$alpha$cursor_in(ref,path){
return uix.hooks.alpha.cursor_in(ref,path);
});
/**
 * Takes a function to be executed in an effect and optional vector of dependencies.
 * 
 *   See: https://reactjs.org/docs/hooks-reference.html#useeffect
 */
uix.core.alpha.effect_BANG_ = (function uix$core$alpha$effect_BANG_(var_args){
var G__20328 = arguments.length;
switch (G__20328) {
case 1:
return uix.core.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.core.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.core.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (setup_fn){
return uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$1(setup_fn);
}));

(uix.core.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (setup_fn,deps){
return uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2(setup_fn,deps);
}));

(uix.core.alpha.effect_BANG_.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function to be executed in a layout effect and optional vector of dependencies.
 * 
 *   See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */
uix.core.alpha.layout_effect_BANG_ = (function uix$core$alpha$layout_effect_BANG_(var_args){
var G__20331 = arguments.length;
switch (G__20331) {
case 1:
return uix.core.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.core.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.core.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (setup_fn){
return uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$1(setup_fn);
}));

(uix.core.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (setup_fn,deps){
return uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$2(setup_fn,deps);
}));

(uix.core.alpha.layout_effect_BANG_.cljs$lang$maxFixedArity = 2);

/**
 * Takes function f and optional vector of dependencies, and returns memoized f.
 */
uix.core.alpha.memo = (function uix$core$alpha$memo(var_args){
var G__20334 = arguments.length;
switch (G__20334) {
case 1:
return uix.core.alpha.memo.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.core.alpha.memo.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.core.alpha.memo.cljs$core$IFn$_invoke$arity$1 = (function (f){
return uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$1(f);
}));

(uix.core.alpha.memo.cljs$core$IFn$_invoke$arity$2 = (function (f,deps){
return uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$2(f,deps);
}));

(uix.core.alpha.memo.cljs$lang$maxFixedArity = 2);

/**
 * Takes optional initial value and returns React's ref hook wrapped in atom-like type.
 */
uix.core.alpha.ref = (function uix$core$alpha$ref(var_args){
var G__20337 = arguments.length;
switch (G__20337) {
case 0:
return uix.core.alpha.ref.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return uix.core.alpha.ref.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.core.alpha.ref.cljs$core$IFn$_invoke$arity$0 = (function (){
return uix.hooks.alpha.ref(null);
}));

(uix.core.alpha.ref.cljs$core$IFn$_invoke$arity$1 = (function (value){
return uix.hooks.alpha.ref(value);
}));

(uix.core.alpha.ref.cljs$lang$maxFixedArity = 1);

/**
 * Takes function f and optional vector of dependencies, and returns f.
 */
uix.core.alpha.callback = (function uix$core$alpha$callback(var_args){
var G__20340 = arguments.length;
switch (G__20340) {
case 1:
return uix.core.alpha.callback.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.core.alpha.callback.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.core.alpha.callback.cljs$core$IFn$_invoke$arity$1 = (function (f){
return uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$1(f);
}));

(uix.core.alpha.callback.cljs$core$IFn$_invoke$arity$2 = (function (f,deps){
return uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$2(f,deps);
}));

(uix.core.alpha.callback.cljs$lang$maxFixedArity = 2);

/**
 * subscribe - fn, takes callback, sets up a listener on external event emitter
 *             which calls the callback and returns a function that unsets the listener.
 * 
 *   get-current-value - fn, returns current state of the external event emitter
 */
uix.core.alpha.subscribe = (function uix$core$alpha$subscribe(p__20342){
var map__20343 = p__20342;
var map__20343__$1 = (((((!((map__20343 == null))))?(((((map__20343.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20343.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20343):map__20343);
var subscription = map__20343__$1;
var get_current_value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20343__$1,cljs.core.cst$kw$get_DASH_current_DASH_value);
var subscribe = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20343__$1,cljs.core.cst$kw$subscribe);
return uix.hooks.alpha.subscribe(subscription);
});
uix.core.alpha.create_context = (function uix$core$alpha$create_context(v){
return uix.core.alpha.global$module$react.createContext(v);
});
/**
 * Takes React context and returns its current value
 */
uix.core.alpha.context = (function uix$core$alpha$context(v){
return uix.hooks.alpha.context(v);
});
uix.core.alpha.as_element = (function uix$core$alpha$as_element(x){

return uix.compiler.alpha.as_element(x);
});
/**
 * Interop with React components. Takes UIx component function and returns same component wrapped into interop layer.
 */
uix.core.alpha.as_react = (function uix$core$alpha$as_react(f){
return uix.compiler.alpha.as_react(f);
});
uix.core.alpha.add_transform_fn = (function uix$core$alpha$add_transform_fn(f){

return uix.compiler.alpha.add_transform_fn(f);
});
