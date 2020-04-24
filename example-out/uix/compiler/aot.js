// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('uix.compiler.aot');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('uix.compiler.alpha');
uix.compiler.aot.global$module$react = goog.global["React"];
uix.compiler.aot._GT_el = uix.compiler.aot.global$module$react.createElement;
uix.compiler.aot.suspense = uix.compiler.aot.global$module$react.Suspense;
uix.compiler.aot.fragment = uix.compiler.aot.global$module$react.Fragment;
uix.compiler.aot.fn_to_react_fn = (function uix$compiler$aot$fn_to_react_fn(f){
var rf = (function uix$compiler$aot$fn_to_react_fn_$__rf(props){
var ret = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,props.argv);
if(cljs.core.vector_QMARK_(ret)){
return uix.compiler.alpha.as_element(ret);
} else {
return ret;
}
});
var rf_memo = (((!(f.uix_no_memo)))?uix.compiler.aot.global$module$react.memo(rf,uix.compiler.alpha._STAR_default_compare_args_STAR_):rf);
if(((goog.DEBUG) && ((typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined')))){
(rf.uixf = f);
} else {
}

if(goog.DEBUG){
uix.compiler.alpha.with_name(f,rf,rf_memo);
} else {
}

uix.compiler.alpha.cache_react_fn(f,rf_memo);

return rf_memo;
});
uix.compiler.aot.as_component = (function uix$compiler$aot$as_component(tag){
var temp__5737__auto__ = uix.compiler.alpha.cached_react_fn(tag);
if((temp__5737__auto__ == null)){
return uix.compiler.aot.fn_to_react_fn(tag);
} else {
var cached_fn = temp__5737__auto__;
return cached_fn;
}
});
uix.compiler.aot.component_element = (function uix$compiler$aot$component_element(tag,attrs,args){
var js_props = (function (){var or__4120__auto__ = attrs;
if(or__4120__auto__){
return or__4120__auto__;
} else {
return ({});
}
})();
var el = uix.compiler.aot.as_component(tag);
(js_props.argv = args);

return (uix.compiler.aot._GT_el.cljs$core$IFn$_invoke$arity$2 ? uix.compiler.aot._GT_el.cljs$core$IFn$_invoke$arity$2(el,js_props) : uix.compiler.aot._GT_el(el,js_props));
});
