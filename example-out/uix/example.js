// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('uix.example');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('cljs.js');
goog.require('uix.core.alpha');
goog.require('uix.dom.alpha');
uix.example.st = cljs.js.empty_state.cljs$core$IFn$_invoke$arity$0();
uix.example.eval_handler = (function uix$example$eval_handler(p__23457){
var map__23458 = p__23457;
var map__23458__$1 = (((((!((map__23458 == null))))?(((((map__23458.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23458.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23458):map__23458);
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23458__$1,cljs.core.cst$kw$error);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23458__$1,cljs.core.cst$kw$value);
if(cljs.core.truth_(error)){
throw cljs.core.str.cljs$core$IFn$_invoke$arity$1(error);
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([value], 0));
}
});
uix.example.browser_load = (function uix$example$browser_load(p__23462,cb){
var map__23463 = p__23462;
var map__23463__$1 = (((((!((map__23463 == null))))?(((((map__23463.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23463.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23463):map__23463);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23463__$1,cljs.core.cst$kw$name);
var macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23463__$1,cljs.core.cst$kw$macros);
var url = ["example-out/",cljs.js.ns__GT_relpath(name),".js"].join('');
return fetch(url).then((function (p1__23460_SHARP_){
return p1__23460_SHARP_.text();
})).then((function (p1__23461_SHARP_){
var G__23465 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$lang,cljs.core.cst$kw$js,cljs.core.cst$kw$source,p1__23461_SHARP_], null);
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__23465) : cb(G__23465));
}));
});
uix.example.eval_string = (function uix$example$eval_string(s){
return cljs.js.eval_str.cljs$core$IFn$_invoke$arity$5(uix.example.st,s,null,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$eval,cljs.js.js_eval,cljs.core.cst$kw$load,uix.example.browser_load], null),uix.example.eval_handler);
});
uix.example.create_editor = (function uix$example$create_editor(node,value){
return CodeMirror(node,({"lineNumbers": true, "autoCloseBrackets": true, "matchBrackets": true, "mode": "text/x-clojure", "value": value}));
});
uix.example.editor = (function uix$example$editor(p__23467){
var map__23468 = p__23467;
var map__23468__$1 = (((((!((map__23468 == null))))?(((((map__23468.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23468.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23468):map__23468);
var init_value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23468__$1,cljs.core.cst$kw$init_DASH_value);
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23468__$1,cljs.core.cst$kw$on_DASH_change);
var on_eval = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23468__$1,cljs.core.cst$kw$on_DASH_eval);
var editor_ref = uix.core.alpha.ref.cljs$core$IFn$_invoke$arity$0();
var _ = uix.core.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2((function (){
var editor = uix.example.create_editor(cljs.core.deref(editor_ref),init_value);
return editor.on("change",(function (p1__23466_SHARP_){
var G__23470 = p1__23466_SHARP_.getValue();
return (on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1(G__23470) : on_change(G__23470));
}));
}),cljs.core.PersistentVector.EMPTY);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$flex,(1)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div_SHARP_editor,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$ref,editor_ref], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$on_DASH_click,on_eval,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$margin_DASH_top,(16),cljs.core.cst$kw$padding,"8px 12px",cljs.core.cst$kw$border_DASH_radius,"3px",cljs.core.cst$kw$background_DASH_color,cljs.core.cst$kw$blue,cljs.core.cst$kw$text_DASH_transform,cljs.core.cst$kw$uppercase,cljs.core.cst$kw$font_DASH_weight,(600),cljs.core.cst$kw$color,cljs.core.cst$kw$white,cljs.core.cst$kw$border,cljs.core.cst$kw$none], null)], null),"Evaluate"], null)], null);
});
uix.example.view = (function uix$example$view(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$flex,(1),cljs.core.cst$kw$margin_DASH_left,(16)], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div_SHARP_viewRoot], null)], null);
});
uix.example.root = (function uix$example$root(initial_code){
var code = uix.core.alpha.state(initial_code);
var handle_change = (function (p1__23471_SHARP_){
return cljs.core.reset_BANG_(code,p1__23471_SHARP_);
});
uix.core.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2((function (){
return uix.example.eval_string(initial_code);
}),cljs.core.PersistentVector.EMPTY);

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$height,"90%",cljs.core.cst$kw$display,cljs.core.cst$kw$flex,cljs.core.cst$kw$flex_DASH_direction,cljs.core.cst$kw$column,cljs.core.cst$kw$padding,(16)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$header,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$img,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$src,"logo.png",cljs.core.cst$kw$width,(125)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$display,cljs.core.cst$kw$flex,cljs.core.cst$kw$flex,(1)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [uix.example.editor,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$init_DASH_value,initial_code,cljs.core.cst$kw$on_DASH_change,handle_change,cljs.core.cst$kw$on_DASH_eval,(function (){
return uix.example.eval_string(cljs.core.deref(code));
})], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [uix.example.view], null)], null)], null);
});
fetch("init.cljs").then((function (p1__23472_SHARP_){
return p1__23472_SHARP_.text();
})).then((function (p1__23473_SHARP_){
return uix.dom.alpha.render(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [uix.example.root,p1__23473_SHARP_], null),window.root);
}));
