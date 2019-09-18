// Compiled by ClojureScript 1.10.520 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('uix.compiler.alpha');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('goog.object');
goog.require('uix.hooks.alpha');
goog.require('clojure.string');
goog.require('cljs_bean.core');
uix.compiler.alpha.global$module$react = goog.global["React"];
uix.compiler.alpha.unwrap_ref = (function uix$compiler$alpha$unwrap_ref(_ref){
if((((!((_ref == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === _ref.uix$hooks$alpha$IRef$))))?true:false):false)){
return _ref.uix$hooks$alpha$IRef$unwrap$arity$1(null);
} else {
return _ref;
}
});
uix.compiler.alpha.js_val_QMARK_ = (function uix$compiler$alpha$js_val_QMARK_(x){
return (!(("object" === goog.typeOf(x))));
});
uix.compiler.alpha.named_QMARK_ = (function uix$compiler$alpha$named_QMARK_(x){
return (((x instanceof cljs.core.Keyword)) || ((x instanceof cljs.core.Symbol)));
});
uix.compiler.alpha.hiccup_tag_QMARK_ = (function uix$compiler$alpha$hiccup_tag_QMARK_(x){
return ((uix.compiler.alpha.named_QMARK_(x)) || (typeof x === 'string'));
});
uix.compiler.alpha.prop_name_cache = ({"class": "className", "for": "htmlFor", "charset": "charSet"});
uix.compiler.alpha.custom_prop_name_cache = ({});
uix.compiler.alpha.tag_name_cache = ({});
uix.compiler.alpha.transform_fns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY);
uix.compiler.alpha.add_transform_fn = (function uix$compiler$alpha$add_transform_fn(f){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(uix.compiler.alpha.transform_fns,cljs.core.conj,f);
});
uix.compiler.alpha.capitalize = (function uix$compiler$alpha$capitalize(s){
if((s.length < (2))){
return clojure.string.upper_case(s);
} else {
return [clojure.string.upper_case(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),(1))),cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(1))].join('');
}
});
uix.compiler.alpha.dash_to_camel = (function uix$compiler$alpha$dash_to_camel(dashed){
var name_str = cljs.core._name(dashed);
var parts = name_str.split(/-/);
var start = (parts[(0)]);
var parts__$1 = parts.slice((1));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(start,"aria")) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(start,"data")))){
return name_str;
} else {
return [start,cljs.core.array_reduce.cljs$core$IFn$_invoke$arity$3(parts__$1,((function (name_str,parts,start,parts__$1){
return (function (a,p){
a.push(uix.compiler.alpha.capitalize(p));

return a;
});})(name_str,parts,start,parts__$1))
,[]).join("")].join('');
}
});
uix.compiler.alpha.cached_prop_name = (function uix$compiler$alpha$cached_prop_name(k){
if(uix.compiler.alpha.named_QMARK_(k)){
var temp__5737__auto__ = (uix.compiler.alpha.prop_name_cache[cljs.core._name(k)]);
if((temp__5737__auto__ == null)){
var v = uix.compiler.alpha.dash_to_camel(k);
var G__19315_19318 = uix.compiler.alpha.prop_name_cache;
var G__19316_19319 = cljs.core._name(k);
var G__19317_19320 = v;
goog.object.set(G__19315_19318,G__19316_19319,G__19317_19320);

return v;
} else {
var k_SINGLEQUOTE_ = temp__5737__auto__;
return k_SINGLEQUOTE_;
}
} else {
return k;
}
});
uix.compiler.alpha.cached_custom_prop_name = (function uix$compiler$alpha$cached_custom_prop_name(k){
if(uix.compiler.alpha.named_QMARK_(k)){
var temp__5737__auto__ = (uix.compiler.alpha.custom_prop_name_cache[cljs.core._name(k)]);
if((temp__5737__auto__ == null)){
var v = uix.compiler.alpha.dash_to_camel(k);
var G__19321_19324 = uix.compiler.alpha.custom_prop_name_cache;
var G__19322_19325 = cljs.core._name(k);
var G__19323_19326 = v;
goog.object.set(G__19321_19324,G__19322_19325,G__19323_19326);

return v;
} else {
var k_SINGLEQUOTE_ = temp__5737__auto__;
return k_SINGLEQUOTE_;
}
} else {
return k;
}
});
uix.compiler.alpha.convert_interop_prop_value = (function uix$compiler$alpha$convert_interop_prop_value(k,v){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.cst$kw$style)){
if(cljs.core.vector_QMARK_(v)){
return v.cljs$core$IReduce$_reduce$arity$3(null,(function (a,v__$1){
a.push((uix.compiler.alpha.convert_prop_value_shallow.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.convert_prop_value_shallow.cljs$core$IFn$_invoke$arity$1(v__$1) : uix.compiler.alpha.convert_prop_value_shallow(v__$1)));

return a;
}),[]);
} else {
return (uix.compiler.alpha.convert_prop_value_shallow.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.convert_prop_value_shallow.cljs$core$IFn$_invoke$arity$1(v) : uix.compiler.alpha.convert_prop_value_shallow(v));
}
} else {
if(uix.compiler.alpha.named_QMARK_(v)){
return cljs.core._name(v);
} else {
return v;

}
}
});
uix.compiler.alpha.kv_conv = (function uix$compiler$alpha$kv_conv(o,k,v){
var G__19327_19330 = o;
var G__19328_19331 = uix.compiler.alpha.cached_prop_name(k);
var G__19329_19332 = (uix.compiler.alpha.convert_prop_value.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.convert_prop_value.cljs$core$IFn$_invoke$arity$1(v) : uix.compiler.alpha.convert_prop_value(v));
goog.object.set(G__19327_19330,G__19328_19331,G__19329_19332);

return o;
});
uix.compiler.alpha.kv_conv_shallow = (function uix$compiler$alpha$kv_conv_shallow(o,k,v){
var G__19333_19336 = o;
var G__19334_19337 = uix.compiler.alpha.cached_prop_name(k);
var G__19335_19338 = uix.compiler.alpha.convert_interop_prop_value(k,v);
goog.object.set(G__19333_19336,G__19334_19337,G__19335_19338);

return o;
});
uix.compiler.alpha.custom_kv_conv = (function uix$compiler$alpha$custom_kv_conv(o,k,v){
var G__19339_19342 = o;
var G__19340_19343 = uix.compiler.alpha.cached_custom_prop_name(k);
var G__19341_19344 = (uix.compiler.alpha.convert_prop_value.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.convert_prop_value.cljs$core$IFn$_invoke$arity$1(v) : uix.compiler.alpha.convert_prop_value(v));
goog.object.set(G__19339_19342,G__19340_19343,G__19341_19344);

return o;
});
uix.compiler.alpha.try_get_key = (function uix$compiler$alpha$try_get_key(x){
try{return cljs.core.get.cljs$core$IFn$_invoke$arity$2(x,cljs.core.cst$kw$key);
}catch (e19345){var e = e19345;
return null;
}});
uix.compiler.alpha.get_key = (function uix$compiler$alpha$get_key(x){
if(cljs.core.map_QMARK_(x)){
return uix.compiler.alpha.try_get_key(x);
} else {
return null;
}
});
uix.compiler.alpha.convert_prop_value = (function uix$compiler$alpha$convert_prop_value(x){
if(uix.compiler.alpha.js_val_QMARK_(x)){
return x;
} else {
if(uix.compiler.alpha.named_QMARK_(x)){
return cljs.core._name(x);
} else {
if(cljs.core.map_QMARK_(x)){
return cljs.core.reduce_kv(uix.compiler.alpha.kv_conv,({}),x);
} else {
if(cljs.core.coll_QMARK_(x)){
return cljs.core.clj__GT_js(x);
} else {
if(cljs.core.ifn_QMARK_(x)){
return (function() { 
var G__19347__delegate = function (rest__19346_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(x,rest__19346_SHARP_);
};
var G__19347 = function (var_args){
var rest__19346_SHARP_ = null;
if (arguments.length > 0) {
var G__19348__i = 0, G__19348__a = new Array(arguments.length -  0);
while (G__19348__i < G__19348__a.length) {G__19348__a[G__19348__i] = arguments[G__19348__i + 0]; ++G__19348__i;}
  rest__19346_SHARP_ = new cljs.core.IndexedSeq(G__19348__a,0,null);
} 
return G__19347__delegate.call(this,rest__19346_SHARP_);};
G__19347.cljs$lang$maxFixedArity = 0;
G__19347.cljs$lang$applyTo = (function (arglist__19349){
var rest__19346_SHARP_ = cljs.core.seq(arglist__19349);
return G__19347__delegate(rest__19346_SHARP_);
});
G__19347.cljs$core$IFn$_invoke$arity$variadic = G__19347__delegate;
return G__19347;
})()
;
} else {
return cljs.core.clj__GT_js(x);

}
}
}
}
}
});
uix.compiler.alpha.convert_prop_value_shallow = (function uix$compiler$alpha$convert_prop_value_shallow(x){
if(cljs.core.map_QMARK_(x)){
return cljs.core.reduce_kv(uix.compiler.alpha.kv_conv_shallow,({}),x);
} else {
return x;
}
});
uix.compiler.alpha.convert_custom_prop_value = (function uix$compiler$alpha$convert_custom_prop_value(x){
if(uix.compiler.alpha.js_val_QMARK_(x)){
return x;
} else {
if(uix.compiler.alpha.named_QMARK_(x)){
return cljs.core._name(x);
} else {
if(cljs.core.map_QMARK_(x)){
return cljs.core.reduce_kv(uix.compiler.alpha.custom_kv_conv,({}),x);
} else {
if(cljs.core.coll_QMARK_(x)){
return cljs.core.clj__GT_js(x);
} else {
if(cljs.core.ifn_QMARK_(x)){
return (function() { 
var G__19351__delegate = function (rest__19350_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(x,rest__19350_SHARP_);
};
var G__19351 = function (var_args){
var rest__19350_SHARP_ = null;
if (arguments.length > 0) {
var G__19352__i = 0, G__19352__a = new Array(arguments.length -  0);
while (G__19352__i < G__19352__a.length) {G__19352__a[G__19352__i] = arguments[G__19352__i + 0]; ++G__19352__i;}
  rest__19350_SHARP_ = new cljs.core.IndexedSeq(G__19352__a,0,null);
} 
return G__19351__delegate.call(this,rest__19350_SHARP_);};
G__19351.cljs$lang$maxFixedArity = 0;
G__19351.cljs$lang$applyTo = (function (arglist__19353){
var rest__19350_SHARP_ = cljs.core.seq(arglist__19353);
return G__19351__delegate(rest__19350_SHARP_);
});
G__19351.cljs$core$IFn$_invoke$arity$variadic = G__19351__delegate;
return G__19351;
})()
;
} else {
return cljs.core.clj__GT_js(x);

}
}
}
}
}
});
uix.compiler.alpha.class_names = (function uix$compiler$alpha$class_names(var_args){
var G__19358 = arguments.length;
switch (G__19358) {
case 0:
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__4751__auto__ = [];
var len__4730__auto___19360 = arguments.length;
var i__4731__auto___19361 = (0);
while(true){
if((i__4731__auto___19361 < len__4730__auto___19360)){
args_arr__4751__auto__.push((arguments[i__4731__auto___19361]));

var G__19362 = (i__4731__auto___19361 + (1));
i__4731__auto___19361 = G__19362;
continue;
} else {
}
break;
}

var argseq__4752__auto__ = (new cljs.core.IndexedSeq(args_arr__4751__auto__.slice((2)),(0),null));
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4752__auto__);

}
});

uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
});

uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1 = (function (class$){
if(cljs.core.coll_QMARK_(class$)){
var classes = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (a,c){
if(c){
a.push(((uix.compiler.alpha.named_QMARK_(c))?cljs.core._name(c):c));
} else {
}

return a;
}),[],class$);
if((classes.length > (0))){
return classes.join(" ");
} else {
return null;
}
} else {
if(uix.compiler.alpha.named_QMARK_(class$)){
return cljs.core._name(class$);
} else {
return class$;

}
}
});

uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
if(a){
if(b){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(a))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(b))].join('');
} else {
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(a);
}
} else {
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(b);
}
});

uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,rst){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(uix.compiler.alpha.class_names,uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$2(a,b),rst);
});

/** @this {Function} */
uix.compiler.alpha.class_names.cljs$lang$applyTo = (function (seq19355){
var G__19356 = cljs.core.first(seq19355);
var seq19355__$1 = cljs.core.next(seq19355);
var G__19357 = cljs.core.first(seq19355__$1);
var seq19355__$2 = cljs.core.next(seq19355__$1);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__19356,G__19357,seq19355__$2);
});

uix.compiler.alpha.class_names.cljs$lang$maxFixedArity = (2);

/**
 * Takes the id and class from tag keyword, and adds them to the
 *   other props. Parsed tag is JS object with :id and :class properties.
 */
uix.compiler.alpha.set_id_class = (function uix$compiler$alpha$set_id_class(props,id_class){
var id = (id_class[(1)]);
var classes = (id_class[(2)]);
var classes__$1 = ((classes)?cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(classes):null);
var G__19363 = props;
var G__19363__$1 = (((((!((id == null)))) && ((cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,cljs.core.cst$kw$id) == null))))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__19363,cljs.core.cst$kw$id,id):G__19363);
if((!((classes__$1 == null)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__19363__$1,cljs.core.cst$kw$class,uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$2(classes__$1,cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,cljs.core.cst$kw$class)));
} else {
return G__19363__$1;
}
});
uix.compiler.alpha.convert_props = (function uix$compiler$alpha$convert_props(props,id_class,shallow_QMARK_){
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,cljs.core.cst$kw$class);
var props__$1 = uix.compiler.alpha.set_id_class((function (){var G__19364 = props;
if(cljs.core.truth_(class$)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__19364,cljs.core.cst$kw$class,uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(class$));
} else {
return G__19364;
}
})(),id_class);
if(cljs.core.truth_((id_class[(3)]))){
return uix.compiler.alpha.convert_custom_prop_value(props__$1);
} else {
if(shallow_QMARK_){
return uix.compiler.alpha.convert_prop_value_shallow(props__$1);
} else {
return uix.compiler.alpha.convert_prop_value(props__$1);

}
}
});
uix.compiler.alpha.re_tag = /[#.]?[^#.]+/;
uix.compiler.alpha.parse_tag = (function uix$compiler$alpha$parse_tag(tag){
var matches = cljs.core.re_seq(uix.compiler.alpha.re_tag,tag);
var tag__$1 = "div";
var id = null;
var classes = [];
while(true){
var val = cljs.core.first(matches);
var nval = cljs.core.next(matches);
if(val){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((val[(0)]),"#")){
var G__19365 = nval;
var G__19366 = tag__$1;
var G__19367 = val.slice((1));
var G__19368 = classes;
matches = G__19365;
tag__$1 = G__19366;
id = G__19367;
classes = G__19368;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((val[(0)]),".")){
var G__19369 = nval;
var G__19370 = tag__$1;
var G__19371 = id;
var G__19372 = classes.concat([val.slice((1))]);
matches = G__19369;
tag__$1 = G__19370;
id = G__19371;
classes = G__19372;
continue;
} else {
var G__19373 = nval;
var G__19374 = val;
var G__19375 = id;
var G__19376 = classes;
matches = G__19373;
tag__$1 = G__19374;
id = G__19375;
classes = G__19376;
continue;
}
}
} else {
return [tag__$1,id,classes,clojure.string.includes_QMARK_(tag__$1,"-")];
}
break;
}
});
uix.compiler.alpha.cached_parse = (function uix$compiler$alpha$cached_parse(x){
var temp__5737__auto__ = (uix.compiler.alpha.tag_name_cache[x]);
if((temp__5737__auto__ == null)){
var v = uix.compiler.alpha.parse_tag(x);
goog.object.set(uix.compiler.alpha.tag_name_cache,x,v);

return v;
} else {
var s = temp__5737__auto__;
return s;
}
});
uix.compiler.alpha.key_from_vec = (function uix$compiler$alpha$key_from_vec(v){
var temp__5737__auto__ = uix.compiler.alpha.get_key(cljs.core._meta(v));
if((temp__5737__auto__ == null)){
return uix.compiler.alpha.get_key(cljs.core._nth.cljs$core$IFn$_invoke$arity$3(v,(1),null));
} else {
var k = temp__5737__auto__;
return k;
}
});
uix.compiler.alpha.native_element = (function uix$compiler$alpha$native_element(parsed,argv,first_el){
var component = (parsed[(0)]);
var props = argv.cljs$core$IIndexed$_nth$arity$3(null,first_el,null);
var props_QMARK_ = (((props == null)) || (cljs.core.map_QMARK_(props)));
var props__$1 = ((props_QMARK_)?cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (component,props,props_QMARK_){
return (function (p,f){
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(p) : f(p));
});})(component,props,props_QMARK_))
,props,cljs.core.deref(uix.compiler.alpha.transform_fns)):props);
var js_props = (function (){var or__4131__auto__ = uix.compiler.alpha.convert_props(((props_QMARK_)?props__$1:null),parsed,false);
if(or__4131__auto__){
return or__4131__auto__;
} else {
return ({});
}
})();
var first_child = (first_el + ((props_QMARK_)?(1):(0)));
var temp__5739__auto___19377 = uix.compiler.alpha.get_key(argv.cljs$core$IMeta$_meta$arity$1(null));
if((temp__5739__auto___19377 == null)){
} else {
var key_19378 = temp__5739__auto___19377;
goog.object.set(js_props,"key",key_19378);
}

var temp__5739__auto___19379 = uix.compiler.alpha.unwrap_ref(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props__$1,cljs.core.cst$kw$ref));
if((temp__5739__auto___19379 == null)){
} else {
var _ref_19380 = temp__5739__auto___19379;
goog.object.set(js_props,"ref",_ref_19380);
}

var temp__5739__auto___19381 = uix.compiler.alpha.unwrap_ref(cljs.core.get.cljs$core$IFn$_invoke$arity$2(argv.cljs$core$IMeta$_meta$arity$1(null),cljs.core.cst$kw$ref));
if((temp__5739__auto___19381 == null)){
} else {
var _ref_19382 = temp__5739__auto___19381;
goog.object.set(js_props,"ref",_ref_19382);
}

return (uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4 ? uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4(argv,component,js_props,first_child) : uix.compiler.alpha.make_element(argv,component,js_props,first_child));
});
uix.compiler.alpha.fragment_element = (function uix$compiler$alpha$fragment_element(argv){
var props = argv.cljs$core$IIndexed$_nth$arity$3(null,(1),null);
var props_QMARK_ = (((props == null)) || (cljs.core.map_QMARK_(props)));
var js_props = (function (){var or__4131__auto__ = uix.compiler.alpha.convert_prop_value(((props_QMARK_)?props:null));
if(or__4131__auto__){
return or__4131__auto__;
} else {
return ({});
}
})();
var first_child = ((1) + ((props_QMARK_)?(1):(0)));
var temp__5739__auto___19383 = uix.compiler.alpha.key_from_vec(argv);
if((temp__5739__auto___19383 == null)){
} else {
var key_19384 = temp__5739__auto___19383;
goog.object.set(js_props,"key",key_19384);
}

return (uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4 ? uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4(argv,uix.compiler.alpha.global$module$react.Fragment,js_props,first_child) : uix.compiler.alpha.make_element(argv,uix.compiler.alpha.global$module$react.Fragment,js_props,first_child));
});
uix.compiler.alpha.suspense_element = (function uix$compiler$alpha$suspense_element(argv){
var props = argv.cljs$core$IIndexed$_nth$arity$3(null,(1),null);
var props_QMARK_ = (((props == null)) || (cljs.core.map_QMARK_(props)));
var vec__19385 = ((props_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__19388 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,cljs.core.cst$kw$fallback);
return (uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__19388) : uix.compiler.alpha.as_element(G__19388));
})(),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,cljs.core.cst$kw$fallback)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,props], null));
var fallback = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19385,(0),null);
var props__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19385,(1),null);
var js_props = (function (){var or__4131__auto__ = uix.compiler.alpha.convert_prop_value(((props_QMARK_)?props__$1:null));
if(or__4131__auto__){
return or__4131__auto__;
} else {
return ({});
}
})();
var first_child = ((1) + ((props_QMARK_)?(1):(0)));
if(fallback){
goog.object.set(js_props,"fallback",fallback);
} else {
}

var temp__5739__auto___19389 = uix.compiler.alpha.key_from_vec(argv);
if((temp__5739__auto___19389 == null)){
} else {
var key_19390 = temp__5739__auto___19389;
goog.object.set(js_props,"key",key_19390);
}

return (uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4 ? uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4(argv,uix.compiler.alpha.global$module$react.Suspense,js_props,first_child) : uix.compiler.alpha.make_element(argv,uix.compiler.alpha.global$module$react.Suspense,js_props,first_child));
});
uix.compiler.alpha.portal_element = (function uix$compiler$alpha$portal_element(argv){
var child = argv.cljs$core$IIndexed$_nth$arity$3(null,(1),null);
var target = argv.cljs$core$IIndexed$_nth$arity$3(null,(2),null);
var node = ((((typeof target === 'string') || ((target instanceof cljs.core.Keyword))))?document.querySelector(cljs.core.name(target)):target);
return ReactDOM.createPortal((uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(child) : uix.compiler.alpha.as_element(child)),node);
});
uix.compiler.alpha.interop_element = (function uix$compiler$alpha$interop_element(argv){
var tag = argv.cljs$core$IIndexed$_nth$arity$3(null,(1),null);
var parsed = [tag,null,null];
var first_el = (2);
var props = argv.cljs$core$IIndexed$_nth$arity$3(null,first_el,null);
var props_QMARK_ = (((props == null)) || (cljs.core.map_QMARK_(props)));
var props__$1 = ((props_QMARK_)?cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (tag,parsed,first_el,props,props_QMARK_){
return (function (p,f){
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(p) : f(p));
});})(tag,parsed,first_el,props,props_QMARK_))
,props,cljs.core.deref(uix.compiler.alpha.transform_fns)):props);
var js_props = (function (){var or__4131__auto__ = uix.compiler.alpha.convert_props(((props_QMARK_)?props__$1:null),parsed,true);
if(or__4131__auto__){
return or__4131__auto__;
} else {
return ({});
}
})();
var first_child = (first_el + ((props_QMARK_)?(1):(0)));
var temp__5739__auto___19391 = uix.compiler.alpha.get_key(argv.cljs$core$IMeta$_meta$arity$1(null));
if((temp__5739__auto___19391 == null)){
} else {
var key_19392 = temp__5739__auto___19391;
goog.object.set(js_props,"key",key_19392);
}

var temp__5739__auto___19393 = uix.compiler.alpha.unwrap_ref(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props__$1,cljs.core.cst$kw$ref));
if((temp__5739__auto___19393 == null)){
} else {
var _ref_19394 = temp__5739__auto___19393;
goog.object.set(js_props,"ref",_ref_19394);
}

var temp__5739__auto___19395 = uix.compiler.alpha.unwrap_ref(cljs.core.get.cljs$core$IFn$_invoke$arity$2(argv.cljs$core$IMeta$_meta$arity$1(null),cljs.core.cst$kw$ref));
if((temp__5739__auto___19395 == null)){
} else {
var _ref_19396 = temp__5739__auto___19395;
goog.object.set(js_props,"ref",_ref_19396);
}

return (uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4 ? uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4(argv,tag,js_props,first_child) : uix.compiler.alpha.make_element(argv,tag,js_props,first_child));
});
uix.compiler.alpha.cached_react_fn = (function uix$compiler$alpha$cached_react_fn(f){
return f.cljsReact;
});
uix.compiler.alpha.cache_react_fn = (function uix$compiler$alpha$cache_react_fn(f,rf){
return f.cljsReact = rf;
});
uix.compiler.alpha.symbol_for = (function uix$compiler$alpha$symbol_for(s){
return cljs.core.js_invoke.cljs$core$IFn$_invoke$arity$variadic(Symbol,"for",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0));
});
uix.compiler.alpha.lazy_sym = uix.compiler.alpha.symbol_for("react.lazy");
uix.compiler.alpha.memo_sym = uix.compiler.alpha.symbol_for("react.memo");
uix.compiler.alpha.lazy_QMARK_ = (function uix$compiler$alpha$lazy_QMARK_(t){
return (uix.compiler.alpha.lazy_sym === (t["$$typeof"]));
});
uix.compiler.alpha.memo_QMARK_ = (function uix$compiler$alpha$memo_QMARK_(t){
return (uix.compiler.alpha.memo_sym === (t["$$typeof"]));
});
uix.compiler.alpha.react_type_QMARK_ = (function uix$compiler$alpha$react_type_QMARK_(t){
return ((uix.compiler.alpha.lazy_QMARK_(t)) || (uix.compiler.alpha.memo_QMARK_(t)));
});
uix.compiler.alpha.fmt_dash_regex = (new RegExp("_","g"));
uix.compiler.alpha.fmt_qmark_regex = (new RegExp("_QMARK_","g"));
uix.compiler.alpha.fmt_bang_regex = (new RegExp("_BANG_","g"));
uix.compiler.alpha.fmt_star_regex = (new RegExp("_STAR_","g"));
uix.compiler.alpha.format_display_name = (function uix$compiler$alpha$format_display_name(s){
var parts = s.split(/\$/);
var ns_parts = parts.slice((0),(parts.length - (1)));
var name_part = parts.slice((parts.length - (1)));
return [ns_parts.join("."),"/",name_part].join('').replace(uix.compiler.alpha.fmt_qmark_regex,"?").replace(uix.compiler.alpha.fmt_bang_regex,"!").replace(uix.compiler.alpha.fmt_star_regex,"*").replace(uix.compiler.alpha.fmt_dash_regex,"-");
});
uix.compiler.alpha.with_name = (function uix$compiler$alpha$with_name(f,rf){
if(typeof f.name === 'string'){
return rf.displayName = uix.compiler.alpha.format_display_name(f.name);
} else {
return null;
}
});
uix.compiler.alpha.fn_to_react_fn = (function uix$compiler$alpha$fn_to_react_fn(f){
if(uix.compiler.alpha.react_type_QMARK_(f)){
return f;
} else {
var rf = (function (p1__19397_SHARP_){
var argv = p1__19397_SHARP_.argv;
var tag = argv.cljs$core$IIndexed$_nth$arity$2(null,(0));
var args = cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(argv,(1));
var G__19398 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(tag,args);
return (uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__19398) : uix.compiler.alpha.as_element(G__19398));
});
if(goog.DEBUG){
uix.compiler.alpha.with_name(f,rf);
} else {
}

uix.compiler.alpha.cache_react_fn(f,rf);

return rf;
}
});
uix.compiler.alpha.as_lazy_component = (function uix$compiler$alpha$as_lazy_component(f){
var temp__5737__auto__ = uix.compiler.alpha.cached_react_fn(f);
if((temp__5737__auto__ == null)){
var rf = ((function (temp__5737__auto__){
return (function (p1__19399_SHARP_){
var G__19400 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,cljs.core.rest(p1__19399_SHARP_.argv));
return (uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__19400) : uix.compiler.alpha.as_element(G__19400));
});})(temp__5737__auto__))
;
if(goog.DEBUG){
uix.compiler.alpha.with_name(f,rf);
} else {
}

uix.compiler.alpha.cache_react_fn(f,rf);

return rf;
} else {
var cached_fn = temp__5737__auto__;
return cached_fn;
}
});
uix.compiler.alpha.as_component = (function uix$compiler$alpha$as_component(tag){
var temp__5737__auto__ = uix.compiler.alpha.cached_react_fn(tag);
if((temp__5737__auto__ == null)){
return uix.compiler.alpha.fn_to_react_fn(tag);
} else {
var cached_fn = temp__5737__auto__;
return cached_fn;
}
});
uix.compiler.alpha.as_react = (function uix$compiler$alpha$as_react(f){
return (function (p1__19401_SHARP_){
var G__19402 = (function (){var G__19403 = cljs_bean.core.bean.cljs$core$IFn$_invoke$arity$1(p1__19401_SHARP_);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__19403) : f(G__19403));
})();
return (uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__19402) : uix.compiler.alpha.as_element(G__19402));
});
});
uix.compiler.alpha.component_element = (function uix$compiler$alpha$component_element(tag,v){
var js_props = ({});
var el = uix.compiler.alpha.as_component(tag);
js_props.argv = v;

var temp__5739__auto___19404 = uix.compiler.alpha.key_from_vec(v);
if((temp__5739__auto___19404 == null)){
} else {
var key_19405 = temp__5739__auto___19404;
goog.object.set(js_props,"key",key_19405);
}

var temp__5739__auto___19406 = uix.compiler.alpha.unwrap_ref(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core._meta(v),cljs.core.cst$kw$ref));
if((temp__5739__auto___19406 == null)){
} else {
var _ref_19407 = temp__5739__auto___19406;
goog.object.set(js_props,"ref",_ref_19407);
}

return (uix.compiler.alpha.global$module$react.createElement.cljs$core$IFn$_invoke$arity$2 ? uix.compiler.alpha.global$module$react.createElement.cljs$core$IFn$_invoke$arity$2(el,js_props) : uix.compiler.alpha.global$module$react.createElement(el,js_props));
});
uix.compiler.alpha.vec_to_elem = (function uix$compiler$alpha$vec_to_elem(v){
var tag = v.cljs$core$IIndexed$_nth$arity$3(null,(0),null);
if(cljs.core.keyword_identical_QMARK_(cljs.core.cst$kw$_LT__GT_,tag)){
return uix.compiler.alpha.fragment_element(v);
} else {
if(cljs.core.keyword_identical_QMARK_(cljs.core.cst$kw$_SHARP_,tag)){
return uix.compiler.alpha.suspense_element(v);
} else {
if(cljs.core.keyword_identical_QMARK_(cljs.core.cst$kw$_DASH__GT_,tag)){
return uix.compiler.alpha.portal_element(v);
} else {
if(cljs.core.keyword_identical_QMARK_(cljs.core.cst$kw$_GT_,tag)){
return uix.compiler.alpha.interop_element(v);
} else {
if(uix.compiler.alpha.hiccup_tag_QMARK_(tag)){
return uix.compiler.alpha.native_element(uix.compiler.alpha.cached_parse(cljs.core.name(tag)),v,(1));
} else {
return uix.compiler.alpha.component_element(tag,v);

}
}
}
}
}
});
uix.compiler.alpha.as_element = (function uix$compiler$alpha$as_element(x){
if(uix.compiler.alpha.js_val_QMARK_(x)){
return x;
} else {
if(cljs.core.vector_QMARK_(x)){
return uix.compiler.alpha.vec_to_elem(x);
} else {
if(cljs.core.seq_QMARK_(x)){
return (uix.compiler.alpha.expand_seq.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.expand_seq.cljs$core$IFn$_invoke$arity$1(x) : uix.compiler.alpha.expand_seq(x));
} else {
if(uix.compiler.alpha.named_QMARK_(x)){
return cljs.core._name(x);
} else {
if((((!((x == null))))?(((((x.cljs$lang$protocol_mask$partition0$ & (2147483648))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$IPrintWithWriter$))))?true:(((!x.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IPrintWithWriter,x):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IPrintWithWriter,x))){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([x], 0));
} else {
return x;

}
}
}
}
}
});
uix.compiler.alpha.expand_seq = (function uix$compiler$alpha$expand_seq(s){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(uix.compiler.alpha.as_element,s);
});
uix.compiler.alpha.make_element = (function uix$compiler$alpha$make_element(argv,component,js_props,first_child){
var G__19409 = (argv.cljs$core$ICounted$_count$arity$1(null) - first_child);
switch (G__19409) {
case (0):
return (uix.compiler.alpha.global$module$react.createElement.cljs$core$IFn$_invoke$arity$2 ? uix.compiler.alpha.global$module$react.createElement.cljs$core$IFn$_invoke$arity$2(component,js_props) : uix.compiler.alpha.global$module$react.createElement(component,js_props));

break;
case (1):
var G__19410 = component;
var G__19411 = js_props;
var G__19412 = uix.compiler.alpha.as_element(argv.cljs$core$IIndexed$_nth$arity$3(null,first_child,null));
return (uix.compiler.alpha.global$module$react.createElement.cljs$core$IFn$_invoke$arity$3 ? uix.compiler.alpha.global$module$react.createElement.cljs$core$IFn$_invoke$arity$3(G__19410,G__19411,G__19412) : uix.compiler.alpha.global$module$react.createElement(G__19410,G__19411,G__19412));

break;
default:
return uix.compiler.alpha.global$module$react.createElement.apply(null,cljs.core.reduce_kv(((function (G__19409){
return (function (a,k,v){
if((k >= first_child)){
a.push(uix.compiler.alpha.as_element(v));
} else {
}

return a;
});})(G__19409))
,[component,js_props],argv));

}
});
