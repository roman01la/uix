// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('uix.compiler.alpha');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('goog.object');
goog.require('uix.hooks.alpha');
goog.require('clojure.string');
goog.require('cljs_bean.core');
goog.require('uix.lib');
uix.compiler.alpha.global$module$react = goog.global["React"];
uix.compiler.alpha._STAR_default_compare_args_STAR_ = (function uix$compiler$alpha$_STAR_default_compare_args_STAR_(p1__19310_SHARP_,p2__19311_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__19310_SHARP_.argv,p2__19311_SHARP_.argv);
});
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
return (x instanceof cljs.core.Keyword);
});
uix.compiler.alpha.prop_name_cache = ({"class": "className", "for": "htmlFor", "charset": "charSet"});
uix.compiler.alpha.custom_prop_name_cache = ({});
uix.compiler.alpha.tag_name_cache = ({});
uix.compiler.alpha.transform_fns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY);
uix.compiler.alpha.add_transform_fn = (function uix$compiler$alpha$add_transform_fn(f){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(uix.compiler.alpha.transform_fns,cljs.core.conj,f);
});
uix.compiler.alpha.cc_regexp = (new RegExp("-(\\w)","g"));
uix.compiler.alpha.cc_fn = (function uix$compiler$alpha$cc_fn(s){
return clojure.string.upper_case((s[(1)]));
});
uix.compiler.alpha.dash_to_camel = (function uix$compiler$alpha$dash_to_camel(name_str){
if(((clojure.string.starts_with_QMARK_(name_str,"aria-")) || (clojure.string.starts_with_QMARK_(name_str,"data-")))){
return name_str;
} else {
return name_str.replace(uix.compiler.alpha.cc_regexp,uix.compiler.alpha.cc_fn);
}
});
uix.compiler.alpha.cached_prop_name = (function uix$compiler$alpha$cached_prop_name(k){
if(uix.compiler.alpha.named_QMARK_(k)){
var name_str = k.cljs$core$INamed$_name$arity$1(null);
var temp__5737__auto__ = (uix.compiler.alpha.prop_name_cache[name_str]);
if((temp__5737__auto__ == null)){
var v = uix.compiler.alpha.dash_to_camel(name_str);
(uix.compiler.alpha.prop_name_cache[name_str] = v);

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
var name_str = k.cljs$core$INamed$_name$arity$1(null);
var temp__5737__auto__ = (uix.compiler.alpha.custom_prop_name_cache[name_str]);
if((temp__5737__auto__ == null)){
var v = uix.compiler.alpha.dash_to_camel(name_str);
(uix.compiler.alpha.custom_prop_name_cache[name_str] = v);

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
if((v instanceof cljs.core.Keyword)){
return v.cljs$core$INamed$_name$arity$1(null);
} else {
return v;

}
}
});
uix.compiler.alpha.kv_conv = (function uix$compiler$alpha$kv_conv(o,k,v){
goog.object.set(o,uix.compiler.alpha.cached_prop_name(k),(uix.compiler.alpha.convert_prop_value.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.convert_prop_value.cljs$core$IFn$_invoke$arity$1(v) : uix.compiler.alpha.convert_prop_value(v)));

return o;
});
uix.compiler.alpha.kv_conv_shallow = (function uix$compiler$alpha$kv_conv_shallow(o,k,v){
goog.object.set(o,uix.compiler.alpha.cached_prop_name(k),uix.compiler.alpha.convert_interop_prop_value(k,v));

return o;
});
uix.compiler.alpha.custom_kv_conv = (function uix$compiler$alpha$custom_kv_conv(o,k,v){
goog.object.set(o,uix.compiler.alpha.cached_custom_prop_name(k),(uix.compiler.alpha.convert_prop_value.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.convert_prop_value.cljs$core$IFn$_invoke$arity$1(v) : uix.compiler.alpha.convert_prop_value(v)));

return o;
});
uix.compiler.alpha.try_get_key = (function uix$compiler$alpha$try_get_key(x){
try{return cljs.core.get.cljs$core$IFn$_invoke$arity$2(x,cljs.core.cst$kw$key);
}catch (e19313){var e = e19313;
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
if((x instanceof cljs.core.Keyword)){
return x.cljs$core$INamed$_name$arity$1(null);
} else {
if(cljs.core.map_QMARK_(x)){
return cljs.core.reduce_kv(uix.compiler.alpha.kv_conv,({}),x);
} else {
if(cljs.core.coll_QMARK_(x)){
return cljs.core.clj__GT_js(x);
} else {
if(cljs.core.ifn_QMARK_(x)){
return (function() { 
var G__19315__delegate = function (rest__19314_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(x,rest__19314_SHARP_);
};
var G__19315 = function (var_args){
var rest__19314_SHARP_ = null;
if (arguments.length > 0) {
var G__19316__i = 0, G__19316__a = new Array(arguments.length -  0);
while (G__19316__i < G__19316__a.length) {G__19316__a[G__19316__i] = arguments[G__19316__i + 0]; ++G__19316__i;}
  rest__19314_SHARP_ = new cljs.core.IndexedSeq(G__19316__a,0,null);
} 
return G__19315__delegate.call(this,rest__19314_SHARP_);};
G__19315.cljs$lang$maxFixedArity = 0;
G__19315.cljs$lang$applyTo = (function (arglist__19317){
var rest__19314_SHARP_ = cljs.core.seq(arglist__19317);
return G__19315__delegate(rest__19314_SHARP_);
});
G__19315.cljs$core$IFn$_invoke$arity$variadic = G__19315__delegate;
return G__19315;
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
if((x instanceof cljs.core.Keyword)){
return x.cljs$core$INamed$_name$arity$1(null);
} else {
if(cljs.core.map_QMARK_(x)){
return cljs.core.reduce_kv(uix.compiler.alpha.custom_kv_conv,({}),x);
} else {
if(cljs.core.coll_QMARK_(x)){
return cljs.core.clj__GT_js(x);
} else {
if(cljs.core.ifn_QMARK_(x)){
return (function() { 
var G__19319__delegate = function (rest__19318_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(x,rest__19318_SHARP_);
};
var G__19319 = function (var_args){
var rest__19318_SHARP_ = null;
if (arguments.length > 0) {
var G__19320__i = 0, G__19320__a = new Array(arguments.length -  0);
while (G__19320__i < G__19320__a.length) {G__19320__a[G__19320__i] = arguments[G__19320__i + 0]; ++G__19320__i;}
  rest__19318_SHARP_ = new cljs.core.IndexedSeq(G__19320__a,0,null);
} 
return G__19319__delegate.call(this,rest__19318_SHARP_);};
G__19319.cljs$lang$maxFixedArity = 0;
G__19319.cljs$lang$applyTo = (function (arglist__19321){
var rest__19318_SHARP_ = cljs.core.seq(arglist__19321);
return G__19319__delegate(rest__19318_SHARP_);
});
G__19319.cljs$core$IFn$_invoke$arity$variadic = G__19319__delegate;
return G__19319;
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
uix.compiler.alpha.class_names_coll = (function uix$compiler$alpha$class_names_coll(class$){
var classes = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (a,c){
if(c){
a.push((((c instanceof cljs.core.Keyword))?c.cljs$core$INamed$_name$arity$1(null):c));
} else {
}

return a;
}),[],class$);
if((classes.length > (0))){
return classes.join(" ");
} else {
return null;
}
});
uix.compiler.alpha.class_names_map = (function uix$compiler$alpha$class_names_map(class$){
var classes = cljs.core.reduce_kv((function (a,b,c){
if(c){
a.push((((b instanceof cljs.core.Keyword))?b.cljs$core$INamed$_name$arity$1(null):b));
} else {
}

return a;
}),[],class$);
if((classes.length > (0))){
return classes.join(" ");
} else {
return null;
}
});
uix.compiler.alpha.class_names = (function uix$compiler$alpha$class_names(var_args){
var G__19326 = arguments.length;
switch (G__19326) {
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
var len__4730__auto___19328 = arguments.length;
var i__4731__auto___19329 = (0);
while(true){
if((i__4731__auto___19329 < len__4730__auto___19328)){
args_arr__4751__auto__.push((arguments[i__4731__auto___19329]));

var G__19330 = (i__4731__auto___19329 + (1));
i__4731__auto___19329 = G__19330;
continue;
} else {
}
break;
}

var argseq__4752__auto__ = (new cljs.core.IndexedSeq(args_arr__4751__auto__.slice((2)),(0),null));
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4752__auto__);

}
});

(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
}));

(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1 = (function (class$){
if(cljs.core.map_QMARK_(class$)){
return uix.compiler.alpha.class_names_map(class$);
} else {
if(((cljs.core.array_QMARK_(class$)) || (cljs.core.coll_QMARK_(class$)))){
return uix.compiler.alpha.class_names_coll(class$);
} else {
if((class$ instanceof cljs.core.Keyword)){
return class$.cljs$core$INamed$_name$arity$1(null);
} else {
return class$;

}
}
}
}));

(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
if(a){
if(b){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(a))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(b))].join('');
} else {
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(a);
}
} else {
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(b);
}
}));

(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,rst){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(uix.compiler.alpha.class_names,uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$2(a,b),rst);
}));

/** @this {Function} */
(uix.compiler.alpha.class_names.cljs$lang$applyTo = (function (seq19323){
var G__19324 = cljs.core.first(seq19323);
var seq19323__$1 = cljs.core.next(seq19323);
var G__19325 = cljs.core.first(seq19323__$1);
var seq19323__$2 = cljs.core.next(seq19323__$1);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__19324,G__19325,seq19323__$2);
}));

(uix.compiler.alpha.class_names.cljs$lang$maxFixedArity = (2));

/**
 * Takes the id and class from tag keyword, and adds them to the
 *   other props. Parsed tag is JS object with :id and :class properties.
 */
uix.compiler.alpha.set_id_class = (function uix$compiler$alpha$set_id_class(props,id_class){
var id = (id_class[(1)]);
var classes = (id_class[(2)]);
var G__19331 = props;
var G__19331__$1 = (((((!((id == null)))) && ((cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,cljs.core.cst$kw$id) == null))))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__19331,cljs.core.cst$kw$id,id):G__19331);
if((((!((classes == null)))) && ((classes.length > (0))))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__19331__$1,cljs.core.cst$kw$class,uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$2(classes,cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,cljs.core.cst$kw$class)));
} else {
return G__19331__$1;
}
});
uix.compiler.alpha.convert_props = (function uix$compiler$alpha$convert_props(props,id_class,shallow_QMARK_){
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,cljs.core.cst$kw$class);
var props__$1 = uix.compiler.alpha.set_id_class((function (){var G__19332 = props;
if(cljs.core.truth_(class$)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__19332,cljs.core.cst$kw$class,uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(class$));
} else {
return G__19332;
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
var matches = uix.lib.re_seq_STAR_(uix.compiler.alpha.re_tag,tag);
var tag__$1 = "div";
var id = null;
var classes = [];
while(true){
var val = (matches[(0)]);
var nval = matches.slice((1));
if(val){
if(((val[(0)]) === "#")){
var G__19333 = nval;
var G__19334 = tag__$1;
var G__19335 = val.slice((1));
var G__19336 = classes;
matches = G__19333;
tag__$1 = G__19334;
id = G__19335;
classes = G__19336;
continue;
} else {
if(((val[(0)]) === ".")){
var G__19337 = nval;
var G__19338 = tag__$1;
var G__19339 = id;
var G__19340 = classes.concat([val.slice((1))]);
matches = G__19337;
tag__$1 = G__19338;
id = G__19339;
classes = G__19340;
continue;
} else {
var G__19341 = nval;
var G__19342 = val;
var G__19343 = id;
var G__19344 = classes;
matches = G__19341;
tag__$1 = G__19342;
id = G__19343;
classes = G__19344;
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
(uix.compiler.alpha.tag_name_cache[x] = v);

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
var props__$1 = ((props_QMARK_)?cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p,f){
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(p) : f(p));
}),props,cljs.core.deref(uix.compiler.alpha.transform_fns)):props);
var js_props = (function (){var or__4120__auto__ = uix.compiler.alpha.convert_props(((props_QMARK_)?props__$1:null),parsed,false);
if(or__4120__auto__){
return or__4120__auto__;
} else {
return ({});
}
})();
var first_child = (first_el + ((props_QMARK_)?(1):(0)));
var temp__5739__auto___19345 = uix.compiler.alpha.get_key(argv.cljs$core$IMeta$_meta$arity$1(null));
if((temp__5739__auto___19345 == null)){
} else {
var key_19346 = temp__5739__auto___19345;
goog.object.set(js_props,"key",key_19346);
}

var temp__5739__auto___19347 = uix.compiler.alpha.unwrap_ref(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props__$1,cljs.core.cst$kw$ref));
if((temp__5739__auto___19347 == null)){
} else {
var _ref_19348 = temp__5739__auto___19347;
goog.object.set(js_props,"ref",_ref_19348);
}

return (uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4 ? uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4(argv,component,js_props,first_child) : uix.compiler.alpha.make_element(argv,component,js_props,first_child));
});
uix.compiler.alpha.fragment_element = (function uix$compiler$alpha$fragment_element(argv){
var props = argv.cljs$core$IIndexed$_nth$arity$3(null,(1),null);
var props_QMARK_ = (((props == null)) || (cljs.core.map_QMARK_(props)));
var js_props = (function (){var or__4120__auto__ = uix.compiler.alpha.convert_prop_value(((props_QMARK_)?props:null));
if(or__4120__auto__){
return or__4120__auto__;
} else {
return ({});
}
})();
var first_child = ((1) + ((props_QMARK_)?(1):(0)));
var temp__5739__auto___19349 = uix.compiler.alpha.key_from_vec(argv);
if((temp__5739__auto___19349 == null)){
} else {
var key_19350 = temp__5739__auto___19349;
goog.object.set(js_props,"key",key_19350);
}

return (uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4 ? uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4(argv,uix.compiler.alpha.global$module$react.Fragment,js_props,first_child) : uix.compiler.alpha.make_element(argv,uix.compiler.alpha.global$module$react.Fragment,js_props,first_child));
});
uix.compiler.alpha.suspense_element = (function uix$compiler$alpha$suspense_element(argv){
var props = argv.cljs$core$IIndexed$_nth$arity$3(null,(1),null);
var props_QMARK_ = (((props == null)) || (cljs.core.map_QMARK_(props)));
var vec__19351 = ((props_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__19354 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,cljs.core.cst$kw$fallback);
return (uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__19354) : uix.compiler.alpha.as_element(G__19354));
})(),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,cljs.core.cst$kw$fallback)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,props], null));
var fallback = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19351,(0),null);
var props__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19351,(1),null);
var js_props = (function (){var or__4120__auto__ = uix.compiler.alpha.convert_prop_value(((props_QMARK_)?props__$1:null));
if(or__4120__auto__){
return or__4120__auto__;
} else {
return ({});
}
})();
var first_child = ((1) + ((props_QMARK_)?(1):(0)));
if(fallback){
goog.object.set(js_props,"fallback",fallback);
} else {
}

var temp__5739__auto___19355 = uix.compiler.alpha.key_from_vec(argv);
if((temp__5739__auto___19355 == null)){
} else {
var key_19356 = temp__5739__auto___19355;
goog.object.set(js_props,"key",key_19356);
}

return (uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4 ? uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4(argv,uix.compiler.alpha.global$module$react.Suspense,js_props,first_child) : uix.compiler.alpha.make_element(argv,uix.compiler.alpha.global$module$react.Suspense,js_props,first_child));
});
uix.compiler.alpha.portal_element = (function uix$compiler$alpha$portal_element(argv){
console.warn("React portal Hiccup syntax :-> is deprecated, use uix.dom.alpha/create-portal instead");

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
var props__$1 = ((props_QMARK_)?cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p,f){
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(p) : f(p));
}),props,cljs.core.deref(uix.compiler.alpha.transform_fns)):props);
var js_props = (function (){var or__4120__auto__ = uix.compiler.alpha.convert_props(((props_QMARK_)?props__$1:null),parsed,true);
if(or__4120__auto__){
return or__4120__auto__;
} else {
return ({});
}
})();
var first_child = (first_el + ((props_QMARK_)?(1):(0)));
var temp__5739__auto___19357 = uix.compiler.alpha.get_key(argv.cljs$core$IMeta$_meta$arity$1(null));
if((temp__5739__auto___19357 == null)){
} else {
var key_19358 = temp__5739__auto___19357;
goog.object.set(js_props,"key",key_19358);
}

var temp__5739__auto___19359 = uix.compiler.alpha.unwrap_ref(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props__$1,cljs.core.cst$kw$ref));
if((temp__5739__auto___19359 == null)){
} else {
var _ref_19360 = temp__5739__auto___19359;
goog.object.set(js_props,"ref",_ref_19360);
}

return (uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4 ? uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4(argv,tag,js_props,first_child) : uix.compiler.alpha.make_element(argv,tag,js_props,first_child));
});
uix.compiler.alpha.cached_react_fn = (function uix$compiler$alpha$cached_react_fn(f){
if(f.compiled_QMARK_){
return f.cljsReactCompiled;
} else {
return f.cljsReact;
}
});
uix.compiler.alpha.cache_react_fn = (function uix$compiler$alpha$cache_react_fn(f,rf){
if(f.compiled_QMARK_){
return (f.cljsReactCompiled = rf);
} else {
return (f.cljsReact = rf);
}
});
uix.compiler.alpha.symbol_for = (function uix$compiler$alpha$symbol_for(s){
return Symbol.for(s);
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
uix.compiler.alpha.default_format_display_name = (function uix$compiler$alpha$default_format_display_name(s){
var parts = s.split(/\$/);
var last_idx = (parts.length - (1));
var name_part = (parts[last_idx]);
if(((1) === parts.length)){
return cljs.core.demunge(name_part);
} else {
return cljs.core.demunge([parts.slice((0),last_idx).join("."),"/",name_part].join(''));
}
});
uix.compiler.alpha._STAR_format_display_name_STAR_ = uix.compiler.alpha.default_format_display_name;
uix.compiler.alpha.format_display_name = (function uix$compiler$alpha$format_display_name(s){
if(cljs.core.fn_QMARK_(uix.compiler.alpha._STAR_format_display_name_STAR_)){
return (uix.compiler.alpha._STAR_format_display_name_STAR_.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha._STAR_format_display_name_STAR_.cljs$core$IFn$_invoke$arity$1(s) : uix.compiler.alpha._STAR_format_display_name_STAR_(s));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("unexpected uix.compiler.alpha/*format-display-name* is not bound to a function",new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$bound_DASH_value,uix.compiler.alpha._STAR_format_display_name_STAR_,cljs.core.cst$kw$value_DASH_type,goog.typeOf(uix.compiler.alpha._STAR_format_display_name_STAR_)], null));
}
});
uix.compiler.alpha.effective_component_name = (function uix$compiler$alpha$effective_component_name(f){
var or__4120__auto__ = (function (){var temp__5739__auto__ = f.displayName;
if((temp__5739__auto__ == null)){
return null;
} else {
var display_name = temp__5739__auto__;
if(typeof display_name === 'string'){
return display_name;
} else {
return null;
}
}
})();
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
var temp__5739__auto__ = f.name;
if((temp__5739__auto__ == null)){
return null;
} else {
var name = temp__5739__auto__;
if(typeof name === 'string'){
return name;
} else {
return null;
}
}
}
});
uix.compiler.alpha.with_name = (function uix$compiler$alpha$with_name(f,rf,rf_memo){
var temp__5735__auto__ = uix.compiler.alpha.effective_component_name(f);
if(cljs.core.truth_(temp__5735__auto__)){
var component_name = temp__5735__auto__;
var temp__5739__auto__ = uix.compiler.alpha.format_display_name(component_name);
if((temp__5739__auto__ == null)){
return null;
} else {
var display_name = temp__5739__auto__;
(rf.displayName = display_name);

if(f.uix_no_memo){
return null;
} else {
return (rf_memo.displayName = ["memo(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(display_name),")"].join(''));
}
}
} else {
return null;
}
});
uix.compiler.alpha.fn_to_react_fn = (function uix$compiler$alpha$fn_to_react_fn(f){
if(uix.compiler.alpha.react_type_QMARK_(f)){
return f;
} else {
var rf = (function (p1__19361_SHARP_){
var argv = p1__19361_SHARP_.argv;
var G__19362 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(argv.cljs$core$IIndexed$_nth$arity$2(null,(0)),cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(argv,(1)));
return (uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__19362) : uix.compiler.alpha.as_element(G__19362));
});
var rf_memo = (((!(f.uix_no_memo)))?uix.compiler.alpha.global$module$react.memo(rf,uix.compiler.alpha._STAR_default_compare_args_STAR_):rf);
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
}
});
uix.compiler.alpha.as_lazy_component = (function uix$compiler$alpha$as_lazy_component(f){
var temp__5737__auto__ = uix.compiler.alpha.cached_react_fn(f);
if((temp__5737__auto__ == null)){
var rf = (function (p1__19363_SHARP_){
var G__19364 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(p1__19363_SHARP_.argv,(1)));
return (uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__19364) : uix.compiler.alpha.as_element(G__19364));
});
var rf_memo = (((!(f.uix_no_memo)))?uix.compiler.alpha.global$module$react.memo(rf,uix.compiler.alpha._STAR_default_compare_args_STAR_):rf);
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
return (function (p1__19365_SHARP_){
var G__19366 = (function (){var G__19367 = cljs_bean.core.bean.cljs$core$IFn$_invoke$arity$1(p1__19365_SHARP_);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__19367) : f(G__19367));
})();
return (uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__19366) : uix.compiler.alpha.as_element(G__19366));
});
});
uix.compiler.alpha.component_element = (function uix$compiler$alpha$component_element(tag,v){
var js_props = ({});
(js_props.argv = v);

var temp__5739__auto___19370 = uix.compiler.alpha.key_from_vec(v);
if((temp__5739__auto___19370 == null)){
} else {
var key_19371 = temp__5739__auto___19370;
goog.object.set(js_props,"key",key_19371);
}

var G__19368 = uix.compiler.alpha.as_component(tag);
var G__19369 = js_props;
return uix.compiler.alpha.global$module$react.createElement(G__19368,G__19369);
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
return uix.compiler.alpha.native_element(uix.compiler.alpha.cached_parse(tag.cljs$core$INamed$_name$arity$1(null)),v,(1));
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
if((x instanceof cljs.core.Keyword)){
return x.cljs$core$INamed$_name$arity$1(null);
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
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret,e){
ret.push(uix.compiler.alpha.as_element(e));

return ret;
}),[],s);
});
uix.compiler.alpha.make_element = (function uix$compiler$alpha$make_element(argv,component,js_props,first_child){
var G__19373 = (argv.cljs$core$ICounted$_count$arity$1(null) - first_child);
switch (G__19373) {
case (0):
return uix.compiler.alpha.global$module$react.createElement(component,js_props);

break;
case (1):
var G__19374 = component;
var G__19375 = js_props;
var G__19376 = uix.compiler.alpha.as_element(argv.cljs$core$IIndexed$_nth$arity$3(null,first_child,null));
return uix.compiler.alpha.global$module$react.createElement(G__19374,G__19375,G__19376);

break;
default:
return uix.compiler.alpha.global$module$react.createElement.apply(null,cljs.core.reduce_kv((function (a,k,v){
if((k >= first_child)){
a.push(uix.compiler.alpha.as_element(v));
} else {
}

return a;
}),[component,js_props],argv));

}
});
