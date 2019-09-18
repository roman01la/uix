// Compiled by ClojureScript 1.10.520 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('uix.compiler.react');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('uix.compiler.alpha');
uix.compiler.react.global$module$react = goog.global["React"];
uix.compiler.react._GT_el = uix.compiler.react.global$module$react.createElement;
uix.compiler.react.suspense = uix.compiler.react.global$module$react.Suspense;
uix.compiler.react.fragment = uix.compiler.react.global$module$react.Fragment;
uix.compiler.react.fn_to_react_fn = (function uix$compiler$react$fn_to_react_fn(f){
var rf = (function (p1__19416_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,p1__19416_SHARP_.argv);
});
if(goog.DEBUG){
uix.compiler.alpha.with_name(f,rf);
} else {
}

uix.compiler.alpha.cache_react_fn(f,rf);

return rf;
});
uix.compiler.react.as_component = (function uix$compiler$react$as_component(tag){
var temp__5737__auto__ = uix.compiler.alpha.cached_react_fn(tag);
if((temp__5737__auto__ == null)){
return uix.compiler.react.fn_to_react_fn(tag);
} else {
var cached_fn = temp__5737__auto__;
return cached_fn;
}
});
uix.compiler.react.component_element = (function uix$compiler$react$component_element(tag,attrs,args){
var js_props = (function (){var or__4131__auto__ = attrs;
if(or__4131__auto__){
return or__4131__auto__;
} else {
return ({});
}
})();
var el = uix.compiler.react.as_component(tag);
js_props.argv = args;

return (uix.compiler.react._GT_el.cljs$core$IFn$_invoke$arity$2 ? uix.compiler.react._GT_el.cljs$core$IFn$_invoke$arity$2(el,js_props) : uix.compiler.react._GT_el(el,js_props));
});
