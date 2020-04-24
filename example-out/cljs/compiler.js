// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('goog.string');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.tools.reader');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('cljs.source_map');
goog.require('goog.string.StringBuffer');
cljs.compiler.js_reserved = cljs.analyzer.js_reserved;
cljs.compiler.es5_GT__EQ_ = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (lang){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lang,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(clojure.string.replace(cljs.core.name(lang),/^ecmascript/,"es"))], null);
}))),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ecmascript5,cljs.core.cst$kw$ecmascript5_DASH_strict,cljs.core.cst$kw$ecmascript6,cljs.core.cst$kw$ecmascript6_DASH_strict,cljs.core.cst$kw$ecmascript_DASH_2015,cljs.core.cst$kw$ecmascript6_DASH_typed,cljs.core.cst$kw$ecmascript_DASH_2016,cljs.core.cst$kw$ecmascript_DASH_2017,cljs.core.cst$kw$ecmascript_DASH_next], null));
cljs.compiler._STAR_recompiled_STAR_ = null;
cljs.compiler._STAR_inputs_STAR_ = null;
cljs.compiler._STAR_source_map_data_STAR_ = null;
cljs.compiler._STAR_source_map_data_gen_col_STAR_ = null;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.PersistentArrayMap.EMPTY;
cljs.compiler.cljs_reserved_file_names = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["deps.cljs",null], null), null);
/**
 * Gets the part up to the first `.` of a namespace.
 * Returns the empty string for nil.
 * Returns the entire string if no `.` in namespace
 */
cljs.compiler.get_first_ns_segment = (function cljs$compiler$get_first_ns_segment(ns){
var ns__$1 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
var idx = ns__$1.indexOf(".");
if(((-1) === idx)){
return ns__$1;
} else {
return cljs.core.subs.cljs$core$IFn$_invoke$arity$3(ns__$1,(0),idx);
}
});
cljs.compiler.find_ns_starts_with = (function cljs$compiler$find_ns_starts_with(needle){
return cljs.core.reduce_kv((function (xs,ns,_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(needle,cljs.compiler.get_first_ns_segment(ns))){
return cljs.core.reduced(needle);
} else {
return null;
}
}),null,cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)));
});
cljs.compiler.shadow_depth = (function cljs$compiler$shadow_depth(s){
var map__17694 = s;
var map__17694__$1 = (((((!((map__17694 == null))))?(((((map__17694.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17694.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17694):map__17694);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17694__$1,cljs.core.cst$kw$name);
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17694__$1,cljs.core.cst$kw$info);
var d = (0);
var G__17697 = info;
var map__17698 = G__17697;
var map__17698__$1 = (((((!((map__17698 == null))))?(((((map__17698.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17698.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17698):map__17698);
var shadow = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17698__$1,cljs.core.cst$kw$shadow);
var d__$1 = d;
var G__17697__$1 = G__17697;
while(true){
var d__$2 = d__$1;
var map__17702 = G__17697__$1;
var map__17702__$1 = (((((!((map__17702 == null))))?(((((map__17702.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17702.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17702):map__17702);
var shadow__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17702__$1,cljs.core.cst$kw$shadow);
if(cljs.core.truth_(shadow__$1)){
var G__17704 = (d__$2 + (1));
var G__17705 = shadow__$1;
d__$1 = G__17704;
G__17697__$1 = G__17705;
continue;
} else {
if(cljs.core.truth_((cljs.compiler.find_ns_starts_with.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.find_ns_starts_with.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)) : cljs.compiler.find_ns_starts_with(cljs.core.str.cljs$core$IFn$_invoke$arity$1(name))))){
return (d__$2 + (1));
} else {
return d__$2;

}
}
break;
}
});
cljs.compiler.hash_scope = (function cljs$compiler$hash_scope(s){
return cljs.core.hash_combine(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(s).cljs$core$IHash$_hash$arity$1(null),cljs.compiler.shadow_depth(s));
});
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__17706){
var map__17707 = p__17706;
var map__17707__$1 = (((((!((map__17707 == null))))?(((((map__17707.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17707.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17707):map__17707);
var name_var = map__17707__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17707__$1,cljs.core.cst$kw$name);
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17707__$1,cljs.core.cst$kw$info);
var name__$1 = clojure.string.replace(cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"..","_DOT__DOT_");
var map__17709 = info;
var map__17709__$1 = (((((!((map__17709 == null))))?(((((map__17709.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17709.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17709):map__17709);
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17709__$1,cljs.core.cst$kw$ns);
var fn_scope = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17709__$1,cljs.core.cst$kw$fn_DASH_scope);
var scoped_name = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2("_$_",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.cst$kw$name),fn_scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null))));
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((function (){var G__17711 = [clojure.string.replace(cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),".","$"),"$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(scoped_name)].join('');
return (cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(G__17711) : cljs.compiler.munge(G__17711));
})());
});
cljs.compiler.munge_reserved = (function cljs$compiler$munge_reserved(reserved){
return (function (s){
if((!((cljs.core.get.cljs$core$IFn$_invoke$arity$2(reserved,s) == null)))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),"$"].join('');
} else {
return s;
}
});
});
cljs.compiler.munge = (function cljs$compiler$munge(var_args){
var G__17713 = arguments.length;
switch (G__17713) {
case 1:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(s,cljs.compiler.js_reserved);
}));

(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2 = (function (s,reserved){
if(cljs.analyzer.cljs_map_QMARK_(s)){
var name_var = s;
var name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(name_var);
var field = cljs.core.cst$kw$field.cljs$core$IFn$_invoke$arity$1(name_var);
var info = cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(name_var);
if((!((cljs.core.cst$kw$fn_DASH_self_DASH_name.cljs$core$IFn$_invoke$arity$1(info) == null)))){
return cljs.compiler.fn_self_name(s);
} else {
var depth = cljs.compiler.shadow_depth(s);
var code = cljs.compiler.hash_scope(s);
var renamed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_lexical_renames_STAR_,code);
var name__$1 = ((field === true)?["self__.",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''):(((!((renamed == null))))?renamed:name
));
var munged_name = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(name__$1,reserved);
if(((field === true) || ((depth === (0))))){
return munged_name;
} else {
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(munged_name),"__$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(depth)].join(''));
}
}
} else {
var ss = clojure.string.replace(cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),"..","_DOT__DOT_");
var ss__$1 = clojure.string.replace(ss,(new RegExp("\\/(.)")),".$1");
var rf = cljs.compiler.munge_reserved(reserved);
var ss__$2 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(rf,clojure.string.split.cljs$core$IFn$_invoke$arity$2(ss__$1,/\./));
var ss__$3 = clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",ss__$2);
var ms = (function (){var fexpr__17714 = new cljs.core.Var(function(){return cljs.core.munge_str;},cljs.core.cst$sym$cljs$core_SLASH_munge_DASH_str,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$private,cljs.core.cst$kw$ns,cljs.core.cst$kw$name,cljs.core.cst$kw$file,cljs.core.cst$kw$end_DASH_column,cljs.core.cst$kw$column,cljs.core.cst$kw$line,cljs.core.cst$kw$end_DASH_line,cljs.core.cst$kw$tag,cljs.core.cst$kw$arglists,cljs.core.cst$kw$doc,cljs.core.cst$kw$test],[true,cljs.core.cst$sym$cljs$core,cljs.core.cst$sym$munge_DASH_str,"cljs/core.cljs",25,1,11500,11500,cljs.core.cst$sym$string,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$name], null)),null,(cljs.core.truth_(cljs.core.munge_str)?cljs.core.munge_str.cljs$lang$test:null)]));
return (fexpr__17714.cljs$core$IFn$_invoke$arity$1 ? fexpr__17714.cljs$core$IFn$_invoke$arity$1(ss__$3) : fexpr__17714(ss__$3));
})();
if((s instanceof cljs.core.Symbol)){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(ms);
} else {
return ms;
}
}
}));

(cljs.compiler.munge.cljs$lang$maxFixedArity = 2);

cljs.compiler.comma_sep = (function cljs$compiler$comma_sep(xs){
return cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(",",xs);
});
cljs.compiler.escape_char = (function cljs$compiler$escape_char(c){
var cp = goog.string.hashCode(c);
var G__17716 = cp;
switch (G__17716) {
case (34):
return "\\\"";

break;
case (92):
return "\\\\";

break;
case (8):
return "\\b";

break;
case (12):
return "\\f";

break;
case (10):
return "\\n";

break;
case (13):
return "\\r";

break;
case (9):
return "\\t";

break;
default:
if(((((31) < cp)) && ((cp < (127))))){
return c;
} else {
var unpadded = cp.toString((16));
var pad = cljs.core.subs.cljs$core$IFn$_invoke$arity$2("0000",unpadded.length);
return ["\\u",pad,cljs.core.str.cljs$core$IFn$_invoke$arity$1(unpadded)].join('');
}

}
});
cljs.compiler.escape_string = (function cljs$compiler$escape_string(s){
var sb = (new goog.string.StringBuffer());
var seq__17718_17722 = cljs.core.seq(s);
var chunk__17719_17723 = null;
var count__17720_17724 = (0);
var i__17721_17725 = (0);
while(true){
if((i__17721_17725 < count__17720_17724)){
var c_17726 = chunk__17719_17723.cljs$core$IIndexed$_nth$arity$2(null,i__17721_17725);
sb.append(cljs.compiler.escape_char(c_17726));


var G__17727 = seq__17718_17722;
var G__17728 = chunk__17719_17723;
var G__17729 = count__17720_17724;
var G__17730 = (i__17721_17725 + (1));
seq__17718_17722 = G__17727;
chunk__17719_17723 = G__17728;
count__17720_17724 = G__17729;
i__17721_17725 = G__17730;
continue;
} else {
var temp__5735__auto___17731 = cljs.core.seq(seq__17718_17722);
if(temp__5735__auto___17731){
var seq__17718_17732__$1 = temp__5735__auto___17731;
if(cljs.core.chunked_seq_QMARK_(seq__17718_17732__$1)){
var c__4550__auto___17733 = cljs.core.chunk_first(seq__17718_17732__$1);
var G__17734 = cljs.core.chunk_rest(seq__17718_17732__$1);
var G__17735 = c__4550__auto___17733;
var G__17736 = cljs.core.count(c__4550__auto___17733);
var G__17737 = (0);
seq__17718_17722 = G__17734;
chunk__17719_17723 = G__17735;
count__17720_17724 = G__17736;
i__17721_17725 = G__17737;
continue;
} else {
var c_17738 = cljs.core.first(seq__17718_17732__$1);
sb.append(cljs.compiler.escape_char(c_17738));


var G__17739 = cljs.core.next(seq__17718_17732__$1);
var G__17740 = null;
var G__17741 = (0);
var G__17742 = (0);
seq__17718_17722 = G__17739;
chunk__17719_17723 = G__17740;
count__17720_17724 = G__17741;
i__17721_17725 = G__17742;
continue;
}
} else {
}
}
break;
}

return sb.toString();
});
cljs.compiler.wrap_in_double_quotes = (function cljs$compiler$wrap_in_double_quotes(x){
return ["\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),"\""].join('');
});
if((typeof cljs !== 'undefined') && (typeof cljs.compiler !== 'undefined') && (typeof cljs.compiler.emit_STAR_ !== 'undefined')){
} else {
cljs.compiler.emit_STAR_ = (function (){var method_table__4613__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,(function (){var fexpr__17743 = cljs.core.get_global_hierarchy;
return (fexpr__17743.cljs$core$IFn$_invoke$arity$0 ? fexpr__17743.cljs$core$IFn$_invoke$arity$0() : fexpr__17743());
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.compiler","emit*"),cljs.core.cst$kw$op,cljs.core.cst$kw$default,hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}
cljs.compiler.emit = (function cljs$compiler$emit(ast){
if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__17744_17751 = ast;
var map__17744_17752__$1 = (((((!((map__17744_17751 == null))))?(((((map__17744_17751.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17744_17751.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17744_17751):map__17744_17751);
var env_17753 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17744_17752__$1,cljs.core.cst$kw$env);
if(cljs.core.truth_(cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(env_17753))){
var map__17746_17754 = env_17753;
var map__17746_17755__$1 = (((((!((map__17746_17754 == null))))?(((((map__17746_17754.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17746_17754.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17746_17754):map__17746_17754);
var line_17756 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17746_17755__$1,cljs.core.cst$kw$line);
var column_17757 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17746_17755__$1,cljs.core.cst$kw$column);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,(function (m){
var minfo = (function (){var G__17748 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$gcol,cljs.core.cst$kw$gen_DASH_col.cljs$core$IFn$_invoke$arity$1(m),cljs.core.cst$kw$gline,cljs.core.cst$kw$gen_DASH_line.cljs$core$IFn$_invoke$arity$1(m)], null);
if(cljs.core.truth_((function (){var G__17750 = cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(ast);
var fexpr__17749 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$binding,null,cljs.core.cst$kw$var,null,cljs.core.cst$kw$js_DASH_var,null,cljs.core.cst$kw$local,null], null), null);
return (fexpr__17749.cljs$core$IFn$_invoke$arity$1 ? fexpr__17749.cljs$core$IFn$_invoke$arity$1(G__17750) : fexpr__17749(G__17750));
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__17748,cljs.core.cst$kw$name,cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(ast))));
} else {
return G__17748;
}
})();
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$source_DASH_map,(line_17756 - (1))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (line__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_17757)?(column_17757 - (1)):(0))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (column__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(column__$1,minfo);
}),cljs.core.PersistentVector.EMPTY));
}),cljs.core.sorted_map()));
}));
} else {
}
} else {
}

return (cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1(ast) : cljs.compiler.emit_STAR_(ast));
});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var G__17766 = arguments.length;
switch (G__17766) {
case 0:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var args_arr__4751__auto__ = [];
var len__4730__auto___17773 = arguments.length;
var i__4731__auto___17774 = (0);
while(true){
if((i__4731__auto___17774 < len__4730__auto___17773)){
args_arr__4751__auto__.push((arguments[i__4731__auto___17774]));

var G__17775 = (i__4731__auto___17774 + (1));
i__4731__auto___17774 = G__17775;
continue;
} else {
}
break;
}

var argseq__4752__auto__ = (new cljs.core.IndexedSeq(args_arr__4751__auto__.slice((5)),(0),null));
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__4752__auto__);

}
});

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1 = (function (a){
if((a == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_(a)){
cljs.compiler.emit(a);
} else {
if(cljs.analyzer.cljs_seq_QMARK_(a)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,a);
} else {
if(goog.isFunction(a)){
(a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a());
} else {
var s_17776 = (function (){var G__17767 = a;
if((!(typeof a === 'string'))){
return G__17767.toString();
} else {
return G__17767;
}
})();
var temp__5739__auto___17777 = cljs.compiler._STAR_source_map_data_STAR_;
if((temp__5739__auto___17777 == null)){
} else {
var sm_data_17778 = temp__5739__auto___17777;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(sm_data_17778,cljs.core.update,cljs.core.cst$kw$gen_DASH_col,(function (p1__17758_SHARP_){
return (p1__17758_SHARP_ + s_17776.length);
}));
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s_17776], 0));

}
}
}
}

return null;
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(e);
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(e);

var seq__17768 = cljs.core.seq(xs);
var chunk__17769 = null;
var count__17770 = (0);
var i__17771 = (0);
while(true){
if((i__17771 < count__17770)){
var x = chunk__17769.cljs$core$IIndexed$_nth$arity$2(null,i__17771);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(x);


var G__17779 = seq__17768;
var G__17780 = chunk__17769;
var G__17781 = count__17770;
var G__17782 = (i__17771 + (1));
seq__17768 = G__17779;
chunk__17769 = G__17780;
count__17770 = G__17781;
i__17771 = G__17782;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__17768);
if(temp__5735__auto__){
var seq__17768__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__17768__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__17768__$1);
var G__17783 = cljs.core.chunk_rest(seq__17768__$1);
var G__17784 = c__4550__auto__;
var G__17785 = cljs.core.count(c__4550__auto__);
var G__17786 = (0);
seq__17768 = G__17783;
chunk__17769 = G__17784;
count__17770 = G__17785;
i__17771 = G__17786;
continue;
} else {
var x = cljs.core.first(seq__17768__$1);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(x);


var G__17787 = cljs.core.next(seq__17768__$1);
var G__17788 = null;
var G__17789 = (0);
var G__17790 = (0);
seq__17768 = G__17787;
chunk__17769 = G__17788;
count__17770 = G__17789;
i__17771 = G__17790;
continue;
}
} else {
return null;
}
}
break;
}
}));

/** @this {Function} */
(cljs.compiler.emits.cljs$lang$applyTo = (function (seq17760){
var G__17761 = cljs.core.first(seq17760);
var seq17760__$1 = cljs.core.next(seq17760);
var G__17762 = cljs.core.first(seq17760__$1);
var seq17760__$2 = cljs.core.next(seq17760__$1);
var G__17763 = cljs.core.first(seq17760__$2);
var seq17760__$3 = cljs.core.next(seq17760__$2);
var G__17764 = cljs.core.first(seq17760__$3);
var seq17760__$4 = cljs.core.next(seq17760__$3);
var G__17765 = cljs.core.first(seq17760__$4);
var seq17760__$5 = cljs.core.next(seq17760__$4);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__17761,G__17762,G__17763,G__17764,G__17765,seq17760__$5);
}));

(cljs.compiler.emits.cljs$lang$maxFixedArity = (5));

cljs.compiler._emitln = (function cljs$compiler$_emitln(){
cljs.core.newline.cljs$core$IFn$_invoke$arity$0();

if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,(function (p__17791){
var map__17792 = p__17791;
var map__17792__$1 = (((((!((map__17792 == null))))?(((((map__17792.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17792.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17792):map__17792);
var m = map__17792__$1;
var gen_line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17792__$1,cljs.core.cst$kw$gen_DASH_line);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,cljs.core.cst$kw$gen_DASH_line,(gen_line + (1)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$gen_DASH_col,(0)], 0));
}));
} else {
}

return null;
});
cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var G__17801 = arguments.length;
switch (G__17801) {
case 0:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var args_arr__4751__auto__ = [];
var len__4730__auto___17807 = arguments.length;
var i__4731__auto___17808 = (0);
while(true){
if((i__4731__auto___17808 < len__4730__auto___17807)){
args_arr__4751__auto__.push((arguments[i__4731__auto___17808]));

var G__17809 = (i__4731__auto___17808 + (1));
i__4731__auto___17808 = G__17809;
continue;
} else {
}
break;
}

var argseq__4752__auto__ = (new cljs.core.IndexedSeq(args_arr__4751__auto__.slice((5)),(0),null));
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__4752__auto__);

}
});

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.compiler._emitln();
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1 = (function (a){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

return cljs.compiler._emitln();
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

return cljs.compiler._emitln();
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

return cljs.compiler._emitln();
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

return cljs.compiler._emitln();
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(e);

return cljs.compiler._emitln();
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(e);

var seq__17802_17810 = cljs.core.seq(xs);
var chunk__17803_17811 = null;
var count__17804_17812 = (0);
var i__17805_17813 = (0);
while(true){
if((i__17805_17813 < count__17804_17812)){
var x_17814 = chunk__17803_17811.cljs$core$IIndexed$_nth$arity$2(null,i__17805_17813);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(x_17814);


var G__17815 = seq__17802_17810;
var G__17816 = chunk__17803_17811;
var G__17817 = count__17804_17812;
var G__17818 = (i__17805_17813 + (1));
seq__17802_17810 = G__17815;
chunk__17803_17811 = G__17816;
count__17804_17812 = G__17817;
i__17805_17813 = G__17818;
continue;
} else {
var temp__5735__auto___17819 = cljs.core.seq(seq__17802_17810);
if(temp__5735__auto___17819){
var seq__17802_17820__$1 = temp__5735__auto___17819;
if(cljs.core.chunked_seq_QMARK_(seq__17802_17820__$1)){
var c__4550__auto___17821 = cljs.core.chunk_first(seq__17802_17820__$1);
var G__17822 = cljs.core.chunk_rest(seq__17802_17820__$1);
var G__17823 = c__4550__auto___17821;
var G__17824 = cljs.core.count(c__4550__auto___17821);
var G__17825 = (0);
seq__17802_17810 = G__17822;
chunk__17803_17811 = G__17823;
count__17804_17812 = G__17824;
i__17805_17813 = G__17825;
continue;
} else {
var x_17826 = cljs.core.first(seq__17802_17820__$1);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(x_17826);


var G__17827 = cljs.core.next(seq__17802_17820__$1);
var G__17828 = null;
var G__17829 = (0);
var G__17830 = (0);
seq__17802_17810 = G__17827;
chunk__17803_17811 = G__17828;
count__17804_17812 = G__17829;
i__17805_17813 = G__17830;
continue;
}
} else {
}
}
break;
}

return cljs.compiler._emitln();
}));

/** @this {Function} */
(cljs.compiler.emitln.cljs$lang$applyTo = (function (seq17795){
var G__17796 = cljs.core.first(seq17795);
var seq17795__$1 = cljs.core.next(seq17795);
var G__17797 = cljs.core.first(seq17795__$1);
var seq17795__$2 = cljs.core.next(seq17795__$1);
var G__17798 = cljs.core.first(seq17795__$2);
var seq17795__$3 = cljs.core.next(seq17795__$2);
var G__17799 = cljs.core.first(seq17795__$3);
var seq17795__$4 = cljs.core.next(seq17795__$3);
var G__17800 = cljs.core.first(seq17795__$4);
var seq17795__$5 = cljs.core.next(seq17795__$4);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__17796,G__17797,G__17798,G__17799,G__17800,seq17795__$5);
}));

(cljs.compiler.emitln.cljs$lang$maxFixedArity = (5));

cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__4661__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__17831_17835 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__17832_17836 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__17833_17837 = true;
var _STAR_print_fn_STAR__temp_val__17834_17838 = (function (x__4662__auto__){
return sb__4661__auto__.append(x__4662__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__17833_17837);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__17834_17838);

try{cljs.compiler.emit(expr);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__17832_17836);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__17831_17835);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4661__auto__);
});
if((typeof cljs !== 'undefined') && (typeof cljs.compiler !== 'undefined') && (typeof cljs.compiler.emit_constant_STAR_ !== 'undefined')){
} else {
cljs.compiler.emit_constant_STAR_ = (function (){var method_table__4613__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,(function (){var fexpr__17839 = cljs.core.get_global_hierarchy;
return (fexpr__17839.cljs$core$IFn$_invoke$arity$0 ? fexpr__17839.cljs$core$IFn$_invoke$arity$0() : fexpr__17839());
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.compiler","emit-constant*"),cljs.core.type,cljs.core.cst$kw$default,hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}









cljs.compiler.all_distinct_QMARK_ = (function cljs$compiler$all_distinct_QMARK_(xs){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.distinct_QMARK_,xs);
});
cljs.compiler.emit_constant_no_meta = (function cljs$compiler$emit_constant_no_meta(x){
if(cljs.analyzer.cljs_seq_QMARK_(x)){
return (cljs.compiler.emit_list.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.emit_list.cljs$core$IFn$_invoke$arity$2(x,cljs.compiler.emit_constants_comma_sep) : cljs.compiler.emit_list(x,cljs.compiler.emit_constants_comma_sep));
} else {
if(cljs.core.record_QMARK_(x)){
var vec__17840 = cljs.analyzer.record_ns_PLUS_name(x);
var ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17840,(0),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17840,(1),null);
var G__17843 = ns;
var G__17844 = name;
var G__17845 = (function (){
var G__17846 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,x);
return (cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__17846) : cljs.compiler.emit_constant(G__17846));
});
return (cljs.compiler.emit_record_value.cljs$core$IFn$_invoke$arity$3 ? cljs.compiler.emit_record_value.cljs$core$IFn$_invoke$arity$3(G__17843,G__17844,G__17845) : cljs.compiler.emit_record_value(G__17843,G__17844,G__17845));
} else {
if(cljs.analyzer.cljs_map_QMARK_(x)){
var G__17847 = cljs.core.keys(x);
var G__17848 = cljs.core.vals(x);
var G__17849 = cljs.compiler.emit_constants_comma_sep;
var G__17850 = cljs.compiler.all_distinct_QMARK_;
return (cljs.compiler.emit_map.cljs$core$IFn$_invoke$arity$4 ? cljs.compiler.emit_map.cljs$core$IFn$_invoke$arity$4(G__17847,G__17848,G__17849,G__17850) : cljs.compiler.emit_map(G__17847,G__17848,G__17849,G__17850));
} else {
if(cljs.analyzer.cljs_vector_QMARK_(x)){
return (cljs.compiler.emit_vector.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.emit_vector.cljs$core$IFn$_invoke$arity$2(x,cljs.compiler.emit_constants_comma_sep) : cljs.compiler.emit_vector(x,cljs.compiler.emit_constants_comma_sep));
} else {
if(cljs.analyzer.cljs_set_QMARK_(x)){
return (cljs.compiler.emit_set.cljs$core$IFn$_invoke$arity$3 ? cljs.compiler.emit_set.cljs$core$IFn$_invoke$arity$3(x,cljs.compiler.emit_constants_comma_sep,cljs.compiler.all_distinct_QMARK_) : cljs.compiler.emit_set(x,cljs.compiler.emit_constants_comma_sep,cljs.compiler.all_distinct_QMARK_));
} else {
return (cljs.compiler.emit_constant_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant_STAR_.cljs$core$IFn$_invoke$arity$1(x) : cljs.compiler.emit_constant_STAR_(x));

}
}
}
}
}
});
cljs.compiler.emit_constant = (function cljs$compiler$emit_constant(v){
var m = cljs.analyzer.elide_irrelevant_meta(cljs.core.meta(v));
if((!((cljs.core.seq(m) == null)))){
var G__17851 = (function (){
return cljs.compiler.emit_constant_no_meta(v);
});
var G__17852 = (function (){
return cljs.compiler.emit_constant_no_meta(m);
});
return (cljs.compiler.emit_with_meta.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.emit_with_meta.cljs$core$IFn$_invoke$arity$2(G__17851,G__17852) : cljs.compiler.emit_with_meta(G__17851,G__17852));
} else {
return cljs.compiler.emit_constant_no_meta(v);
}
});
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (x){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["failed compiling constant: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),"; ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.type(x)], 0))," is not a valid ClojureScript constant."].join(''),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$constant,x,cljs.core.cst$kw$type,cljs.core.type(x),cljs.core.cst$kw$clojure$error_SLASH_phase,cljs.core.cst$kw$compilation], null));
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,null,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("null");
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,Number,(function (x){
if(cljs.core.truth_(isNaN(x))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("NaN");
} else {
if(cljs.core.not(isFinite(x))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1((((x > (0)))?"Infinity":"-Infinity"));
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("(",x,")");

}
}
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,String,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(cljs.compiler.wrap_in_double_quotes(cljs.compiler.escape_string(x)));
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,Boolean,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(x)?"true":"false"));
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,RegExp,(function (x){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("(new RegExp(\"\"))");
} else {
var vec__17853 = cljs.core.re_find(/^(?:\(\?([idmsux]*)\))?(.*)/,cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17853,(0),null);
var flags = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17853,(1),null);
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17853,(2),null);
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(pattern);
}
}));
cljs.compiler.emits_keyword = (function cljs$compiler$emits_keyword(kw){
var ns = cljs.core.namespace(kw);
var name = cljs.core.name(kw);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("new cljs.core.Keyword(");

cljs.compiler.emit_constant(ns);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant(name);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant((cljs.core.truth_(ns)?[ns,"/",name].join(''):name));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant(cljs.core.hash(kw));

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(")");
});
cljs.compiler.emits_symbol = (function cljs$compiler$emits_symbol(sym){
var ns = cljs.core.namespace(sym);
var name = cljs.core.name(sym);
var symstr = (((!((ns == null))))?[ns,"/",name].join(''):name);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("new cljs.core.Symbol(");

cljs.compiler.emit_constant(ns);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant(name);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant(symstr);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant(cljs.core.hash(sym));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant(null);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(")");
});
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.Keyword,(function (x){
var temp__5733__auto__ = (function (){var and__4109__auto__ = cljs.core.cst$kw$emit_DASH_constants.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__4109__auto__)){
var G__17856 = cljs.core.cst$kw$cljs$analyzer_SLASH_constant_DASH_table.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__17856) : x(G__17856));
} else {
return and__4109__auto__;
}
})();
if(cljs.core.truth_(temp__5733__auto__)){
var value = temp__5733__auto__;
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2("cljs.core.",value);
} else {
return cljs.compiler.emits_keyword(x);
}
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.Symbol,(function (x){
var temp__5733__auto__ = (function (){var and__4109__auto__ = cljs.core.cst$kw$emit_DASH_constants.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__4109__auto__)){
var G__17857 = cljs.core.cst$kw$cljs$analyzer_SLASH_constant_DASH_table.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__17857) : x(G__17857));
} else {
return and__4109__auto__;
}
})();
if(cljs.core.truth_(temp__5733__auto__)){
var value = temp__5733__auto__;
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2("cljs.core.",value);
} else {
return cljs.compiler.emits_symbol(x);
}
}));
cljs.compiler.emit_constants_comma_sep = (function cljs$compiler$emit_constants_comma_sep(cs){
return (function (){
return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,m){
if(cljs.core.even_QMARK_(i)){
return cljs.compiler.emit_constant(m);
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(m);
}
}),cljs.compiler.comma_sep(cs)));
});
});
cljs.compiler.array_map_threshold = (8);
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,Date,(function (date){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("new Date(",date.getTime(),")");
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.UUID,(function (uuid){
var uuid_str = uuid.toString();
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("new cljs.core.UUID(\"",uuid_str,"\", ",cljs.core.hash(uuid_str),")");
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.tagged_literals.JSValue,(function (v){
var items = v.val;
if(cljs.core.map_QMARK_(items)){
var G__17859 = items;
var G__17860 = (function (p1__17858_SHARP_){
return (function (){
return cljs.compiler.emit_constant(p1__17858_SHARP_);
});
});
return (cljs.compiler.emit_js_object.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.emit_js_object.cljs$core$IFn$_invoke$arity$2(G__17859,G__17860) : cljs.compiler.emit_js_object(G__17859,G__17860));
} else {
return (cljs.compiler.emit_js_array.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.emit_js_array.cljs$core$IFn$_invoke$arity$2(items,cljs.compiler.emit_constants_comma_sep) : cljs.compiler.emit_js_array(items,cljs.compiler.emit_constants_comma_sep));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$no_DASH_op,(function (m){
return null;
}));
cljs.compiler.emit_var = (function cljs$compiler$emit_var(p__17862){
var map__17863 = p__17862;
var map__17863__$1 = (((((!((map__17863 == null))))?(((((map__17863.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17863.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17863):map__17863);
var ast = map__17863__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17863__$1,cljs.core.cst$kw$info);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17863__$1,cljs.core.cst$kw$env);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17863__$1,cljs.core.cst$kw$form);
var temp__5733__auto__ = cljs.core.cst$kw$const_DASH_expr.cljs$core$IFn$_invoke$arity$1(ast);
if(cljs.core.truth_(temp__5733__auto__)){
var const_expr = temp__5733__auto__;
return cljs.compiler.emit(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(const_expr,cljs.core.cst$kw$env,env));
} else {
var map__17865 = cljs.core.deref(cljs.env._STAR_compiler_STAR_);
var map__17865__$1 = (((((!((map__17865 == null))))?(((((map__17865.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17865.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17865):map__17865);
var cenv = map__17865__$1;
var options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17865__$1,cljs.core.cst$kw$options);
var var_name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info);
var info__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(var_name),"js"))?(function (){var js_module_name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cenv,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$js_DASH_module_DASH_index,cljs.core.name(var_name),cljs.core.cst$kw$name], null));
var or__4120__auto__ = js_module_name;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.core.name(var_name);
}
})():info);
if(cljs.core.truth_(cljs.core.cst$kw$binding_DASH_form_QMARK_.cljs$core$IFn$_invoke$arity$1(ast))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(ast));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var reserved = (function (){var G__17867 = cljs.compiler.js_reserved;
if(cljs.core.truth_((function (){var and__4109__auto__ = (function (){var G__17870 = cljs.core.cst$kw$language_DASH_out.cljs$core$IFn$_invoke$arity$1(options);
return (cljs.compiler.es5_GT__EQ_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.es5_GT__EQ_.cljs$core$IFn$_invoke$arity$1(G__17870) : cljs.compiler.es5_GT__EQ_(G__17870));
})();
if(cljs.core.truth_(and__4109__auto__)){
return (!((cljs.core.namespace(var_name) == null)));
} else {
return and__4109__auto__;
}
})())){
return clojure.set.difference.cljs$core$IFn$_invoke$arity$2(G__17867,cljs.analyzer.es5_allowed);
} else {
return G__17867;
}
})();
var js_module = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cenv,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$js_DASH_namespaces,(function (){var or__4120__auto__ = cljs.core.namespace(var_name);
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.core.name(var_name);
}
})()], null));
var info__$2 = (function (){var G__17871 = info__$1;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(form,cljs.core.cst$sym$js_SLASH__DASH_Infinity)){
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(G__17871,reserved);
} else {
return G__17871;
}
})();
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

var G__17872_17873 = cljs.core.cst$kw$module_DASH_type.cljs$core$IFn$_invoke$arity$1(js_module);
var G__17872_17874__$1 = (((G__17872_17873 instanceof cljs.core.Keyword))?G__17872_17873.fqn:null);
switch (G__17872_17874__$1) {
case "commonjs":
if(cljs.core.truth_(cljs.core.namespace(var_name))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(var_name),reserved),"[\"default\"].",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(cljs.core.name(var_name),reserved));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(cljs.core.name(var_name),reserved),"[\"default\"]");
}

break;
case "es6":
if(cljs.core.truth_((function (){var and__4109__auto__ = cljs.core.namespace(var_name);
if(cljs.core.truth_(and__4109__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("default",cljs.core.name(var_name));
} else {
return and__4109__auto__;
}
})())){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(var_name),reserved),"[\"default\"]");
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(info__$2);
}

break;
default:
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(info__$2);

}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}
}
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$var,(function (expr){
return cljs.compiler.emit_var(expr);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$binding,(function (expr){
return cljs.compiler.emit_var(expr);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$js_DASH_var,(function (expr){
return cljs.compiler.emit_var(expr);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$local,(function (expr){
return cljs.compiler.emit_var(expr);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$the_DASH_var,(function (p__17876){
var map__17877 = p__17876;
var map__17877__$1 = (((((!((map__17877 == null))))?(((((map__17877.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17877.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17877):map__17877);
var arg = map__17877__$1;
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17877__$1,cljs.core.cst$kw$env);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17877__$1,cljs.core.cst$kw$var);
var sym = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17877__$1,cljs.core.cst$kw$sym);
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17877__$1,cljs.core.cst$kw$meta);
if(cljs.analyzer.ast_QMARK_(sym)){
} else {
throw (new Error("Assert failed: (ana/ast? sym)"));
}

if(cljs.analyzer.ast_QMARK_(meta)){
} else {
throw (new Error("Assert failed: (ana/ast? meta)"));
}

var map__17879 = cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(var$);
var map__17879__$1 = (((((!((map__17879 == null))))?(((((map__17879.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17879.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17879):map__17879);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17879__$1,cljs.core.cst$kw$name);
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic("new cljs.core.Var(function(){return ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),";},",sym,",",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([meta,")"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_with_meta = (function cljs$compiler$emit_with_meta(expr,meta){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("cljs.core.with_meta(",expr,",",meta,")");
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$with_DASH_meta,(function (p__17881){
var map__17882 = p__17881;
var map__17882__$1 = (((((!((map__17882 == null))))?(((((map__17882.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17882.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17882):map__17882);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17882__$1,cljs.core.cst$kw$expr);
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17882__$1,cljs.core.cst$kw$meta);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17882__$1,cljs.core.cst$kw$env);
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_with_meta(expr,meta);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
var keys__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.unwrap_quote,keys);
return ((cljs.core.every_QMARK_((function (p1__17884_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(p1__17884_SHARP_),cljs.core.cst$kw$const);
}),keys__$1)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,keys__$1)),cljs.core.count(keys__$1))));
});
cljs.compiler.emit_map = (function cljs$compiler$emit_map(keys,vals,comma_sep,distinct_keys_QMARK_){
if((cljs.core.count(keys) === (0))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("cljs.core.PersistentArrayMap.EMPTY");
} else {
if((cljs.core.count(keys) <= cljs.compiler.array_map_threshold)){
if(cljs.core.truth_((distinct_keys_QMARK_.cljs$core$IFn$_invoke$arity$1 ? distinct_keys_QMARK_.cljs$core$IFn$_invoke$arity$1(keys) : distinct_keys_QMARK_(keys)))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("new cljs.core.PersistentArrayMap(null, ",cljs.core.count(keys),", [",(function (){var G__17885 = cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(keys,vals);
return (comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(G__17885) : comma_sep(G__17885));
})(),"], null)");
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.PersistentArrayMap.createAsIfByAssoc([",(function (){var G__17886 = cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(keys,vals);
return (comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(G__17886) : comma_sep(G__17886));
})(),"])");
}
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("cljs.core.PersistentHashMap.fromArrays([",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(keys) : comma_sep(keys)),"],[",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(vals) : comma_sep(vals)),"])");

}
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$map,(function (p__17887){
var map__17888 = p__17887;
var map__17888__$1 = (((((!((map__17888 == null))))?(((((map__17888.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17888.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17888):map__17888);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17888__$1,cljs.core.cst$kw$env);
var keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17888__$1,cljs.core.cst$kw$keys);
var vals = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17888__$1,cljs.core.cst$kw$vals);
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_map(keys,vals,cljs.compiler.comma_sep,cljs.compiler.distinct_keys_QMARK_);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_list = (function cljs$compiler$emit_list(items,comma_sep){
if(cljs.core.empty_QMARK_(items)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("cljs.core.List.EMPTY");
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.list(",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(items) : comma_sep(items)),")");
}
});
cljs.compiler.emit_vector = (function cljs$compiler$emit_vector(items,comma_sep){
if(cljs.core.empty_QMARK_(items)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("cljs.core.PersistentVector.EMPTY");
} else {
var cnt = cljs.core.count(items);
if((cnt < (32))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("new cljs.core.PersistentVector(null, ",cnt,", 5, cljs.core.PersistentVector.EMPTY_NODE, [",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(items) : comma_sep(items)),"], null)");
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.PersistentVector.fromArray([",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(items) : comma_sep(items)),"], true)");
}
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$vector,(function (p__17890){
var map__17891 = p__17890;
var map__17891__$1 = (((((!((map__17891 == null))))?(((((map__17891.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17891.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17891):map__17891);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17891__$1,cljs.core.cst$kw$items);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17891__$1,cljs.core.cst$kw$env);
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_vector(items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
var items__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.unwrap_quote,items);
return ((cljs.core.every_QMARK_((function (p1__17893_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(p1__17893_SHARP_),cljs.core.cst$kw$const);
}),items__$1)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,items__$1)),cljs.core.count(items__$1))));
});
cljs.compiler.emit_set = (function cljs$compiler$emit_set(items,comma_sep,distinct_constants_QMARK_){
if(cljs.core.empty_QMARK_(items)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("cljs.core.PersistentHashSet.EMPTY");
} else {
if(cljs.core.truth_((distinct_constants_QMARK_.cljs$core$IFn$_invoke$arity$1 ? distinct_constants_QMARK_.cljs$core$IFn$_invoke$arity$1(items) : distinct_constants_QMARK_(items)))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, ",cljs.core.count(items),", [",(function (){var G__17894 = cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(items,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1("null"));
return (comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(G__17894) : comma_sep(G__17894));
})(),"], null), null)");
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.PersistentHashSet.createAsIfByAssoc([",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(items) : comma_sep(items)),"])");

}
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$set,(function (p__17895){
var map__17896 = p__17895;
var map__17896__$1 = (((((!((map__17896 == null))))?(((((map__17896.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17896.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17896):map__17896);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17896__$1,cljs.core.cst$kw$items);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17896__$1,cljs.core.cst$kw$env);
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_set(items,cljs.compiler.comma_sep,cljs.compiler.distinct_constants_QMARK_);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_js_object = (function cljs$compiler$emit_js_object(items,emit_js_object_val){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("({");

var temp__5735__auto___17920 = cljs.core.seq(items);
if(temp__5735__auto___17920){
var items_17921__$1 = temp__5735__auto___17920;
var vec__17898_17922 = items_17921__$1;
var seq__17899_17923 = cljs.core.seq(vec__17898_17922);
var first__17900_17924 = cljs.core.first(seq__17899_17923);
var seq__17899_17925__$1 = cljs.core.next(seq__17899_17923);
var vec__17901_17926 = first__17900_17924;
var k_17927 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17901_17926,(0),null);
var v_17928 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17901_17926,(1),null);
var r_17929 = seq__17899_17925__$1;
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4("\"",cljs.core.name(k_17927),"\": ",(emit_js_object_val.cljs$core$IFn$_invoke$arity$1 ? emit_js_object_val.cljs$core$IFn$_invoke$arity$1(v_17928) : emit_js_object_val(v_17928)));

var seq__17904_17930 = cljs.core.seq(r_17929);
var chunk__17905_17931 = null;
var count__17906_17932 = (0);
var i__17907_17933 = (0);
while(true){
if((i__17907_17933 < count__17906_17932)){
var vec__17914_17934 = chunk__17905_17931.cljs$core$IIndexed$_nth$arity$2(null,i__17907_17933);
var k_17935__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17914_17934,(0),null);
var v_17936__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17914_17934,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4(", \"",cljs.core.name(k_17935__$1),"\": ",(emit_js_object_val.cljs$core$IFn$_invoke$arity$1 ? emit_js_object_val.cljs$core$IFn$_invoke$arity$1(v_17936__$1) : emit_js_object_val(v_17936__$1)));


var G__17937 = seq__17904_17930;
var G__17938 = chunk__17905_17931;
var G__17939 = count__17906_17932;
var G__17940 = (i__17907_17933 + (1));
seq__17904_17930 = G__17937;
chunk__17905_17931 = G__17938;
count__17906_17932 = G__17939;
i__17907_17933 = G__17940;
continue;
} else {
var temp__5735__auto___17941__$1 = cljs.core.seq(seq__17904_17930);
if(temp__5735__auto___17941__$1){
var seq__17904_17942__$1 = temp__5735__auto___17941__$1;
if(cljs.core.chunked_seq_QMARK_(seq__17904_17942__$1)){
var c__4550__auto___17943 = cljs.core.chunk_first(seq__17904_17942__$1);
var G__17944 = cljs.core.chunk_rest(seq__17904_17942__$1);
var G__17945 = c__4550__auto___17943;
var G__17946 = cljs.core.count(c__4550__auto___17943);
var G__17947 = (0);
seq__17904_17930 = G__17944;
chunk__17905_17931 = G__17945;
count__17906_17932 = G__17946;
i__17907_17933 = G__17947;
continue;
} else {
var vec__17917_17948 = cljs.core.first(seq__17904_17942__$1);
var k_17949__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17917_17948,(0),null);
var v_17950__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17917_17948,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4(", \"",cljs.core.name(k_17949__$1),"\": ",(emit_js_object_val.cljs$core$IFn$_invoke$arity$1 ? emit_js_object_val.cljs$core$IFn$_invoke$arity$1(v_17950__$1) : emit_js_object_val(v_17950__$1)));


var G__17951 = cljs.core.next(seq__17904_17942__$1);
var G__17952 = null;
var G__17953 = (0);
var G__17954 = (0);
seq__17904_17930 = G__17951;
chunk__17905_17931 = G__17952;
count__17906_17932 = G__17953;
i__17907_17933 = G__17954;
continue;
}
} else {
}
}
break;
}
} else {
}

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("})");
});
cljs.compiler.emit_js_array = (function cljs$compiler$emit_js_array(items,comma_sep){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("[",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(items) : comma_sep(items)),"]");
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$js_DASH_object,(function (p__17955){
var map__17956 = p__17955;
var map__17956__$1 = (((((!((map__17956 == null))))?(((((map__17956.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17956.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17956):map__17956);
var keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17956__$1,cljs.core.cst$kw$keys);
var vals = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17956__$1,cljs.core.cst$kw$vals);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17956__$1,cljs.core.cst$kw$env);
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_js_object(cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,keys,vals),cljs.core.identity);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$js_DASH_array,(function (p__17958){
var map__17959 = p__17958;
var map__17959__$1 = (((((!((map__17959 == null))))?(((((map__17959.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17959.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17959):map__17959);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17959__$1,cljs.core.cst$kw$items);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17959__$1,cljs.core.cst$kw$env);
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_js_array(items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_record_value = (function cljs$compiler$emit_record_value(ns,name,items){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(ns,".map__GT_",name,"(",items,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([")"], 0));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$quote,(function (p__17961){
var map__17962 = p__17961;
var map__17962__$1 = (((((!((map__17962 == null))))?(((((map__17962.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17962.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17962):map__17962);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17962__$1,cljs.core.cst$kw$expr);
return cljs.compiler.emit(expr);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$const,(function (p__17964){
var map__17965 = p__17964;
var map__17965__$1 = (((((!((map__17965 == null))))?(((((map__17965.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17965.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17965):map__17965);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17965__$1,cljs.core.cst$kw$form);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17965__$1,cljs.core.cst$kw$env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_constant(form);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(expr){
var map__17967 = cljs.analyzer.unwrap_quote(expr);
var map__17967__$1 = (((((!((map__17967 == null))))?(((((map__17967.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17967.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17967):map__17967);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17967__$1,cljs.core.cst$kw$op);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17967__$1,cljs.core.cst$kw$form);
var const_expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17967__$1,cljs.core.cst$kw$const_DASH_expr);
var or__4120__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,cljs.core.cst$kw$const))?(function (){var and__4109__auto__ = form;
if(cljs.core.truth_(and__4109__auto__)){
return (!(((((typeof form === 'string') && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(form,"")))) || (((typeof form === 'number') && ((form === (0))))))));
} else {
return and__4109__auto__;
}
})():false);
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
if((!((const_expr == null)))){
return (cljs.compiler.truthy_constant_QMARK_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.truthy_constant_QMARK_.cljs$core$IFn$_invoke$arity$1(const_expr) : cljs.compiler.truthy_constant_QMARK_(const_expr));
} else {
return false;
}
}
});
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(expr){
var map__17969 = cljs.analyzer.unwrap_quote(expr);
var map__17969__$1 = (((((!((map__17969 == null))))?(((((map__17969.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17969.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17969):map__17969);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17969__$1,cljs.core.cst$kw$op);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17969__$1,cljs.core.cst$kw$form);
var const_expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17969__$1,cljs.core.cst$kw$const_DASH_expr);
var or__4120__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,cljs.core.cst$kw$const)) && (((form === false) || ((form == null)))));
if(or__4120__auto__){
return or__4120__auto__;
} else {
if((!((const_expr == null)))){
return (cljs.compiler.falsey_constant_QMARK_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.falsey_constant_QMARK_.cljs$core$IFn$_invoke$arity$1(const_expr) : cljs.compiler.falsey_constant_QMARK_(const_expr));
} else {
return false;
}
}
});
cljs.compiler.safe_test_QMARK_ = (function cljs$compiler$safe_test_QMARK_(env,e){
var tag = cljs.analyzer.infer_tag(env,e);
var or__4120__auto__ = (function (){var fexpr__17972 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$seq,null,cljs.core.cst$sym$boolean,null], null), null);
return (fexpr__17972.cljs$core$IFn$_invoke$arity$1 ? fexpr__17972.cljs$core$IFn$_invoke$arity$1(tag) : fexpr__17972(tag));
})();
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.compiler.truthy_constant_QMARK_(e);
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$if,(function (p__17973){
var map__17974 = p__17973;
var map__17974__$1 = (((((!((map__17974 == null))))?(((((map__17974.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17974.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17974):map__17974);
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17974__$1,cljs.core.cst$kw$test);
var then = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17974__$1,cljs.core.cst$kw$then);
var else$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17974__$1,cljs.core.cst$kw$else);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17974__$1,cljs.core.cst$kw$env);
var unchecked = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17974__$1,cljs.core.cst$kw$unchecked);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
var checked = cljs.core.not((function (){var or__4120__auto__ = unchecked;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.compiler.safe_test_QMARK_(env,test);
}
})());
if(cljs.core.truth_(cljs.compiler.truthy_constant_QMARK_(test))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(then);
} else {
if(cljs.core.truth_(cljs.compiler.falsey_constant_QMARK_(test))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(else$);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic("(",((checked)?"cljs.core.truth_":null),"(",test,")?",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([then,":",else$,")"], 0));
} else {
if(checked){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if(cljs.core.truth_(",test,")){");
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if(",test,"){");
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(then,"} else {");

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(else$,"}");
}

}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$case,(function (p__17976){
var map__17977 = p__17976;
var map__17977__$1 = (((((!((map__17977 == null))))?(((((map__17977.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17977.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17977):map__17977);
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17977__$1,cljs.core.cst$kw$test);
var nodes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17977__$1,cljs.core.cst$kw$nodes);
var default$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17977__$1,cljs.core.cst$kw$default);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17977__$1,cljs.core.cst$kw$env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env),cljs.core.cst$kw$expr)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("(function(){");
} else {
}

var gs = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("caseval__");
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",gs,";");
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("switch (",v,") {");

var seq__17979_18015 = cljs.core.seq(nodes);
var chunk__17980_18016 = null;
var count__17981_18017 = (0);
var i__17982_18018 = (0);
while(true){
if((i__17982_18018 < count__17981_18017)){
var map__17999_18019 = chunk__17980_18016.cljs$core$IIndexed$_nth$arity$2(null,i__17982_18018);
var map__17999_18020__$1 = (((((!((map__17999_18019 == null))))?(((((map__17999_18019.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17999_18019.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17999_18019):map__17999_18019);
var ts_18021 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17999_18020__$1,cljs.core.cst$kw$tests);
var map__18000_18022 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17999_18020__$1,cljs.core.cst$kw$then);
var map__18000_18023__$1 = (((((!((map__18000_18022 == null))))?(((((map__18000_18022.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18000_18022.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18000_18022):map__18000_18022);
var then_18024 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18000_18023__$1,cljs.core.cst$kw$then);
var seq__18003_18025 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$test,ts_18021));
var chunk__18004_18026 = null;
var count__18005_18027 = (0);
var i__18006_18028 = (0);
while(true){
if((i__18006_18028 < count__18005_18027)){
var test_18029 = chunk__18004_18026.cljs$core$IIndexed$_nth$arity$2(null,i__18006_18028);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",test_18029,":");


var G__18030 = seq__18003_18025;
var G__18031 = chunk__18004_18026;
var G__18032 = count__18005_18027;
var G__18033 = (i__18006_18028 + (1));
seq__18003_18025 = G__18030;
chunk__18004_18026 = G__18031;
count__18005_18027 = G__18032;
i__18006_18028 = G__18033;
continue;
} else {
var temp__5735__auto___18034 = cljs.core.seq(seq__18003_18025);
if(temp__5735__auto___18034){
var seq__18003_18035__$1 = temp__5735__auto___18034;
if(cljs.core.chunked_seq_QMARK_(seq__18003_18035__$1)){
var c__4550__auto___18036 = cljs.core.chunk_first(seq__18003_18035__$1);
var G__18037 = cljs.core.chunk_rest(seq__18003_18035__$1);
var G__18038 = c__4550__auto___18036;
var G__18039 = cljs.core.count(c__4550__auto___18036);
var G__18040 = (0);
seq__18003_18025 = G__18037;
chunk__18004_18026 = G__18038;
count__18005_18027 = G__18039;
i__18006_18028 = G__18040;
continue;
} else {
var test_18041 = cljs.core.first(seq__18003_18035__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",test_18041,":");


var G__18042 = cljs.core.next(seq__18003_18035__$1);
var G__18043 = null;
var G__18044 = (0);
var G__18045 = (0);
seq__18003_18025 = G__18042;
chunk__18004_18026 = G__18043;
count__18005_18027 = G__18044;
i__18006_18028 = G__18045;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(gs,"=",then_18024);
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(then_18024);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("break;");


var G__18046 = seq__17979_18015;
var G__18047 = chunk__17980_18016;
var G__18048 = count__17981_18017;
var G__18049 = (i__17982_18018 + (1));
seq__17979_18015 = G__18046;
chunk__17980_18016 = G__18047;
count__17981_18017 = G__18048;
i__17982_18018 = G__18049;
continue;
} else {
var temp__5735__auto___18050 = cljs.core.seq(seq__17979_18015);
if(temp__5735__auto___18050){
var seq__17979_18051__$1 = temp__5735__auto___18050;
if(cljs.core.chunked_seq_QMARK_(seq__17979_18051__$1)){
var c__4550__auto___18052 = cljs.core.chunk_first(seq__17979_18051__$1);
var G__18053 = cljs.core.chunk_rest(seq__17979_18051__$1);
var G__18054 = c__4550__auto___18052;
var G__18055 = cljs.core.count(c__4550__auto___18052);
var G__18056 = (0);
seq__17979_18015 = G__18053;
chunk__17980_18016 = G__18054;
count__17981_18017 = G__18055;
i__17982_18018 = G__18056;
continue;
} else {
var map__18007_18057 = cljs.core.first(seq__17979_18051__$1);
var map__18007_18058__$1 = (((((!((map__18007_18057 == null))))?(((((map__18007_18057.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18007_18057.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18007_18057):map__18007_18057);
var ts_18059 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18007_18058__$1,cljs.core.cst$kw$tests);
var map__18008_18060 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18007_18058__$1,cljs.core.cst$kw$then);
var map__18008_18061__$1 = (((((!((map__18008_18060 == null))))?(((((map__18008_18060.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18008_18060.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18008_18060):map__18008_18060);
var then_18062 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18008_18061__$1,cljs.core.cst$kw$then);
var seq__18011_18063 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$test,ts_18059));
var chunk__18012_18064 = null;
var count__18013_18065 = (0);
var i__18014_18066 = (0);
while(true){
if((i__18014_18066 < count__18013_18065)){
var test_18067 = chunk__18012_18064.cljs$core$IIndexed$_nth$arity$2(null,i__18014_18066);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",test_18067,":");


var G__18068 = seq__18011_18063;
var G__18069 = chunk__18012_18064;
var G__18070 = count__18013_18065;
var G__18071 = (i__18014_18066 + (1));
seq__18011_18063 = G__18068;
chunk__18012_18064 = G__18069;
count__18013_18065 = G__18070;
i__18014_18066 = G__18071;
continue;
} else {
var temp__5735__auto___18072__$1 = cljs.core.seq(seq__18011_18063);
if(temp__5735__auto___18072__$1){
var seq__18011_18073__$1 = temp__5735__auto___18072__$1;
if(cljs.core.chunked_seq_QMARK_(seq__18011_18073__$1)){
var c__4550__auto___18074 = cljs.core.chunk_first(seq__18011_18073__$1);
var G__18075 = cljs.core.chunk_rest(seq__18011_18073__$1);
var G__18076 = c__4550__auto___18074;
var G__18077 = cljs.core.count(c__4550__auto___18074);
var G__18078 = (0);
seq__18011_18063 = G__18075;
chunk__18012_18064 = G__18076;
count__18013_18065 = G__18077;
i__18014_18066 = G__18078;
continue;
} else {
var test_18079 = cljs.core.first(seq__18011_18073__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",test_18079,":");


var G__18080 = cljs.core.next(seq__18011_18073__$1);
var G__18081 = null;
var G__18082 = (0);
var G__18083 = (0);
seq__18011_18063 = G__18080;
chunk__18012_18064 = G__18081;
count__18013_18065 = G__18082;
i__18014_18066 = G__18083;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(gs,"=",then_18062);
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(then_18062);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("break;");


var G__18084 = cljs.core.next(seq__17979_18051__$1);
var G__18085 = null;
var G__18086 = (0);
var G__18087 = (0);
seq__17979_18015 = G__18084;
chunk__17980_18016 = G__18085;
count__17981_18017 = G__18086;
i__17982_18018 = G__18087;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(default$)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("default:");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(gs,"=",default$);
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(default$);
}
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("return ",gs,";})()");
} else {
return null;
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$throw,(function (p__18088){
var map__18089 = p__18088;
var map__18089__$1 = (((((!((map__18089 == null))))?(((((map__18089.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18089.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18089):map__18089);
var throw$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18089__$1,cljs.core.cst$kw$exception);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18089__$1,cljs.core.cst$kw$env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("(function(){throw ",throw$,"})()");
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("throw ",throw$,";");
}
}));
cljs.compiler.base_types = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 15, ["boolean",null,"object",null,"*",null,"string",null,"Object",null,"Number",null,"null",null,"Date",null,"number",null,"String",null,"RegExp",null,"...*",null,"Array",null,"array",null,"Boolean",null], null), null);
cljs.compiler.mapped_types = new cljs.core.PersistentArrayMap(null, 1, ["nil","null"], null);
cljs.compiler.resolve_type = (function cljs$compiler$resolve_type(env,t){
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.base_types,t))){
return t;
} else {
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.mapped_types,t))){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.mapped_types,t);
} else {
if(goog.string.startsWith(t,"!")){
return ["!",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__18094 = env;
var G__18095 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(t,(1));
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(G__18094,G__18095) : cljs.compiler.resolve_type(G__18094,G__18095));
})())].join('');
} else {
if(goog.string.startsWith(t,"{")){
return t;
} else {
if(goog.string.startsWith(t,"function")){
var idx = t.lastIndexOf(":");
var vec__18096 = (((!(((-1) === idx))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(0),idx),cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(idx + (1)),cljs.core.count(t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18096,(0),null);
var rstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18096,(1),null);
var ret_t = (cljs.core.truth_(rstr)?(cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(env,rstr) : cljs.compiler.resolve_type(env,rstr)):null);
var axstr = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(fstr,(9),(cljs.core.count(fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_(axstr))?null:cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2((function (p1__18091_SHARP_){
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(env,p1__18091_SHARP_) : cljs.compiler.resolve_type(env,p1__18091_SHARP_));
}),clojure.string.trim),clojure.string.split.cljs$core$IFn$_invoke$arity$2(axstr,/,/)));
var G__18099 = ["function(",clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",args_ts),")"].join('');
if(cljs.core.truth_(ret_t)){
return [G__18099,":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ret_t)].join('');
} else {
return G__18099;
}
} else {
if(goog.string.endsWith(t,"=")){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__18102 = env;
var G__18103 = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(0),(cljs.core.count(t) - (1)));
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(G__18102,G__18103) : cljs.compiler.resolve_type(G__18102,G__18103));
})()),"="].join('');
} else {
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(env,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(t)))));

}
}
}
}
}
}
});
cljs.compiler.resolve_types = (function cljs$compiler$resolve_types(env,ts){
var ts__$1 = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(clojure.string.trim(ts),(1),(cljs.core.count(ts) - (1)));
var xs = clojure.string.split.cljs$core$IFn$_invoke$arity$2(ts__$1,/\|/);
return ["{",clojure.string.join.cljs$core$IFn$_invoke$arity$2("|",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__18104_SHARP_){
return cljs.compiler.resolve_type(env,p1__18104_SHARP_);
}),xs)),"}"].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find(/@param/,line))){
var vec__18105 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var seq__18106 = cljs.core.seq(vec__18105);
var first__18107 = cljs.core.first(seq__18106);
var seq__18106__$1 = cljs.core.next(seq__18106);
var p = first__18107;
var first__18107__$1 = cljs.core.first(seq__18106__$1);
var seq__18106__$2 = cljs.core.next(seq__18106__$1);
var ts = first__18107__$1;
var first__18107__$2 = cljs.core.first(seq__18106__$2);
var seq__18106__$3 = cljs.core.next(seq__18106__$2);
var n = first__18107__$2;
var xs = seq__18106__$3;
if(cljs.core.truth_(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@param",p))?(function (){var and__4109__auto__ = ts;
if(cljs.core.truth_(and__4109__auto__)){
return goog.string.startsWith(ts,"{");
} else {
return and__4109__auto__;
}
})():false))){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types(env,ts),cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(n)], null),xs));
} else {
return line;
}
} else {
if(cljs.core.truth_(cljs.core.re_find(/@return/,line))){
var vec__18108 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var seq__18109 = cljs.core.seq(vec__18108);
var first__18110 = cljs.core.first(seq__18109);
var seq__18109__$1 = cljs.core.next(seq__18109);
var p = first__18110;
var first__18110__$1 = cljs.core.first(seq__18109__$1);
var seq__18109__$2 = cljs.core.next(seq__18109__$1);
var ts = first__18110__$1;
var xs = seq__18109__$2;
if(cljs.core.truth_(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@return",p))?(function (){var and__4109__auto__ = ts;
if(cljs.core.truth_(and__4109__auto__)){
return goog.string.startsWith(ts,"{");
} else {
return and__4109__auto__;
}
})():false))){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types(env,ts)], null),xs));
} else {
return line;
}
} else {
return line;

}
}
});
cljs.compiler.checking_types_QMARK_ = (function cljs$compiler$checking_types_QMARK_(){
var G__18112 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$options,cljs.core.cst$kw$closure_DASH_warnings,cljs.core.cst$kw$check_DASH_types], null));
var fexpr__18111 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$warning,null,cljs.core.cst$kw$error,null], null), null);
return (fexpr__18111.cljs$core$IFn$_invoke$arity$1 ? fexpr__18111.cljs$core$IFn$_invoke$arity$1(G__18112) : fexpr__18111(G__18112));
});
/**
 * Emit a nicely formatted comment string.
 */
cljs.compiler.emit_comment = (function cljs$compiler$emit_comment(var_args){
var G__18115 = arguments.length;
switch (G__18115) {
case 2:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2 = (function (doc,jsdoc){
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3(null,doc,jsdoc);
}));

(cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3 = (function (env,doc,jsdoc){
var docs = (cljs.core.truth_(doc)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [doc], null):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = (function cljs$compiler$print_comment_lines(e){
var vec__18123 = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__18113_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_())){
return cljs.compiler.munge_param_return(env,p1__18113_SHARP_);
} else {
return p1__18113_SHARP_;
}
}),clojure.string.split_lines(e));
var seq__18124 = cljs.core.seq(vec__18123);
var first__18125 = cljs.core.first(seq__18124);
var seq__18124__$1 = cljs.core.next(seq__18124);
var x = first__18125;
var ys = seq__18124__$1;
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(" * ",clojure.string.replace(x,"*/","* /"));

var seq__18126 = cljs.core.seq(ys);
var chunk__18127 = null;
var count__18128 = (0);
var i__18129 = (0);
while(true){
if((i__18129 < count__18128)){
var next_line = chunk__18127.cljs$core$IIndexed$_nth$arity$2(null,i__18129);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /"));


var G__18135 = seq__18126;
var G__18136 = chunk__18127;
var G__18137 = count__18128;
var G__18138 = (i__18129 + (1));
seq__18126 = G__18135;
chunk__18127 = G__18136;
count__18128 = G__18137;
i__18129 = G__18138;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__18126);
if(temp__5735__auto__){
var seq__18126__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18126__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__18126__$1);
var G__18139 = cljs.core.chunk_rest(seq__18126__$1);
var G__18140 = c__4550__auto__;
var G__18141 = cljs.core.count(c__4550__auto__);
var G__18142 = (0);
seq__18126 = G__18139;
chunk__18127 = G__18140;
count__18128 = G__18141;
i__18129 = G__18142;
continue;
} else {
var next_line = cljs.core.first(seq__18126__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /"));


var G__18143 = cljs.core.next(seq__18126__$1);
var G__18144 = null;
var G__18145 = (0);
var G__18146 = (0);
seq__18126 = G__18143;
chunk__18127 = G__18144;
count__18128 = G__18145;
i__18129 = G__18146;
continue;
}
} else {
return null;
}
}
break;
}
});
if(cljs.core.seq(docs__$2)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("/**");

var seq__18130_18147 = cljs.core.seq(docs__$2);
var chunk__18131_18148 = null;
var count__18132_18149 = (0);
var i__18133_18150 = (0);
while(true){
if((i__18133_18150 < count__18132_18149)){
var e_18151 = chunk__18131_18148.cljs$core$IIndexed$_nth$arity$2(null,i__18133_18150);
if(cljs.core.truth_(e_18151)){
print_comment_lines(e_18151);
} else {
}


var G__18152 = seq__18130_18147;
var G__18153 = chunk__18131_18148;
var G__18154 = count__18132_18149;
var G__18155 = (i__18133_18150 + (1));
seq__18130_18147 = G__18152;
chunk__18131_18148 = G__18153;
count__18132_18149 = G__18154;
i__18133_18150 = G__18155;
continue;
} else {
var temp__5735__auto___18156 = cljs.core.seq(seq__18130_18147);
if(temp__5735__auto___18156){
var seq__18130_18157__$1 = temp__5735__auto___18156;
if(cljs.core.chunked_seq_QMARK_(seq__18130_18157__$1)){
var c__4550__auto___18158 = cljs.core.chunk_first(seq__18130_18157__$1);
var G__18159 = cljs.core.chunk_rest(seq__18130_18157__$1);
var G__18160 = c__4550__auto___18158;
var G__18161 = cljs.core.count(c__4550__auto___18158);
var G__18162 = (0);
seq__18130_18147 = G__18159;
chunk__18131_18148 = G__18160;
count__18132_18149 = G__18161;
i__18133_18150 = G__18162;
continue;
} else {
var e_18163 = cljs.core.first(seq__18130_18157__$1);
if(cljs.core.truth_(e_18163)){
print_comment_lines(e_18163);
} else {
}


var G__18164 = cljs.core.next(seq__18130_18157__$1);
var G__18165 = null;
var G__18166 = (0);
var G__18167 = (0);
seq__18130_18147 = G__18164;
chunk__18131_18148 = G__18165;
count__18132_18149 = G__18166;
i__18133_18150 = G__18167;
continue;
}
} else {
}
}
break;
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(" */");
} else {
return null;
}
}));

(cljs.compiler.emit_comment.cljs$lang$maxFixedArity = 3);

cljs.compiler.valid_define_value_QMARK_ = (function cljs$compiler$valid_define_value_QMARK_(x){
return ((typeof x === 'string') || (x === true) || (x === false) || (typeof x === 'number'));
});
cljs.compiler.get_define = (function cljs$compiler$get_define(mname,jsdoc){
var opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$options);
var and__4109__auto__ = cljs.core.some((function (p1__18169_SHARP_){
return goog.string.startsWith(p1__18169_SHARP_,"@define");
}),jsdoc);
if(cljs.core.truth_(and__4109__auto__)){
var and__4109__auto____$1 = opts;
if(cljs.core.truth_(and__4109__auto____$1)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$optimizations.cljs$core$IFn$_invoke$arity$1(opts),cljs.core.cst$kw$none)){
var define = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$closure_DASH_defines,cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname)], null));
if(cljs.compiler.valid_define_value_QMARK_(define)){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([define], 0));
} else {
return null;
}
} else {
return false;
}
} else {
return and__4109__auto____$1;
}
} else {
return and__4109__auto__;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$def,(function (p__18170){
var map__18171 = p__18170;
var map__18171__$1 = (((((!((map__18171 == null))))?(((((map__18171.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18171.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18171):map__18171);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18171__$1,cljs.core.cst$kw$doc);
var jsdoc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18171__$1,cljs.core.cst$kw$jsdoc);
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18171__$1,cljs.core.cst$kw$test);
var goog_define = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18171__$1,cljs.core.cst$kw$goog_DASH_define);
var init = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18171__$1,cljs.core.cst$kw$init);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18171__$1,cljs.core.cst$kw$name);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18171__$1,cljs.core.cst$kw$env);
var export$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18171__$1,cljs.core.cst$kw$export);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18171__$1,cljs.core.cst$kw$var);
var var_ast = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18171__$1,cljs.core.cst$kw$var_DASH_ast);
if(cljs.core.truth_((function (){var or__4120__auto__ = init;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.core.cst$kw$def_DASH_emits_DASH_var.cljs$core$IFn$_invoke$arity$1(env);
}
})())){
var mname = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name);
cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3(env,doc,cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((cljs.core.truth_(goog_define)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["@define {",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog_define),"}"].join('')], null):null),jsdoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$jsdoc.cljs$core$IFn$_invoke$arity$1(init)], 0)));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("return (");
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$def_DASH_emits_DASH_var.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("(function (){");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(var$);

if(cljs.core.truth_(init)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2(" = ",(function (){var temp__5733__auto__ = cljs.compiler.get_define(mname,jsdoc);
if(cljs.core.truth_(temp__5733__auto__)){
var define = temp__5733__auto__;
return define;
} else {
return init;
}
})());
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$def_DASH_emits_DASH_var.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("; return (");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$op,cljs.core.cst$kw$the_DASH_var,cljs.core.cst$kw$env,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr)], null),var_ast], 0)));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(");})()");
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(")");
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}

if(cljs.core.truth_(export$)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("goog.exportSymbol('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(export$),"', ",mname,");");
} else {
}

if(cljs.core.truth_((function (){var and__4109__auto__ = cljs.analyzer._STAR_load_tests_STAR_;
if(cljs.core.truth_(and__4109__auto__)){
return test;
} else {
return and__4109__auto__;
}
})())){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
} else {
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(var$,".cljs$lang$test = ",test,";");
} else {
return null;
}
} else {
return null;
}
}));
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__18173){
var map__18174 = p__18173;
var map__18174__$1 = (((((!((map__18174 == null))))?(((((map__18174.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18174.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18174):map__18174);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18174__$1,cljs.core.cst$kw$name);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18174__$1,cljs.core.cst$kw$params);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18174__$1,cljs.core.cst$kw$env);
var arglist = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("arglist__");
var delegate_name = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name)),"__delegate"].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("(function (",arglist,"){");

var seq__18176_18200 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,cljs.core.drop_last.cljs$core$IFn$_invoke$arity$2((2),params)));
var chunk__18177_18201 = null;
var count__18178_18202 = (0);
var i__18179_18203 = (0);
while(true){
if((i__18179_18203 < count__18178_18202)){
var vec__18186_18204 = chunk__18177_18201.cljs$core$IIndexed$_nth$arity$2(null,i__18179_18203);
var i_18205 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18186_18204,(0),null);
var param_18206 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18186_18204,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(param_18206);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(" = cljs.core.first(");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(arglist,");");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(arglist," = cljs.core.next(",arglist,");");


var G__18207 = seq__18176_18200;
var G__18208 = chunk__18177_18201;
var G__18209 = count__18178_18202;
var G__18210 = (i__18179_18203 + (1));
seq__18176_18200 = G__18207;
chunk__18177_18201 = G__18208;
count__18178_18202 = G__18209;
i__18179_18203 = G__18210;
continue;
} else {
var temp__5735__auto___18211 = cljs.core.seq(seq__18176_18200);
if(temp__5735__auto___18211){
var seq__18176_18212__$1 = temp__5735__auto___18211;
if(cljs.core.chunked_seq_QMARK_(seq__18176_18212__$1)){
var c__4550__auto___18213 = cljs.core.chunk_first(seq__18176_18212__$1);
var G__18214 = cljs.core.chunk_rest(seq__18176_18212__$1);
var G__18215 = c__4550__auto___18213;
var G__18216 = cljs.core.count(c__4550__auto___18213);
var G__18217 = (0);
seq__18176_18200 = G__18214;
chunk__18177_18201 = G__18215;
count__18178_18202 = G__18216;
i__18179_18203 = G__18217;
continue;
} else {
var vec__18189_18218 = cljs.core.first(seq__18176_18212__$1);
var i_18219 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18189_18218,(0),null);
var param_18220 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18189_18218,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(param_18220);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(" = cljs.core.first(");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(arglist,");");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(arglist," = cljs.core.next(",arglist,");");


var G__18221 = cljs.core.next(seq__18176_18212__$1);
var G__18222 = null;
var G__18223 = (0);
var G__18224 = (0);
seq__18176_18200 = G__18221;
chunk__18177_18201 = G__18222;
count__18178_18202 = G__18223;
i__18179_18203 = G__18224;
continue;
}
} else {
}
}
break;
}

if(((1) < cljs.core.count(params))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(cljs.core.last(cljs.core.butlast(params)));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" = cljs.core.first(",arglist,");");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" = cljs.core.rest(",arglist,");");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("return ",delegate_name,"(");

var seq__18192_18225 = cljs.core.seq(params);
var chunk__18193_18226 = null;
var count__18194_18227 = (0);
var i__18195_18228 = (0);
while(true){
if((i__18195_18228 < count__18194_18227)){
var param_18229 = chunk__18193_18226.cljs$core$IIndexed$_nth$arity$2(null,i__18195_18228);
cljs.compiler.emit(param_18229);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18229,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18230 = seq__18192_18225;
var G__18231 = chunk__18193_18226;
var G__18232 = count__18194_18227;
var G__18233 = (i__18195_18228 + (1));
seq__18192_18225 = G__18230;
chunk__18193_18226 = G__18231;
count__18194_18227 = G__18232;
i__18195_18228 = G__18233;
continue;
} else {
var temp__5735__auto___18234 = cljs.core.seq(seq__18192_18225);
if(temp__5735__auto___18234){
var seq__18192_18235__$1 = temp__5735__auto___18234;
if(cljs.core.chunked_seq_QMARK_(seq__18192_18235__$1)){
var c__4550__auto___18236 = cljs.core.chunk_first(seq__18192_18235__$1);
var G__18237 = cljs.core.chunk_rest(seq__18192_18235__$1);
var G__18238 = c__4550__auto___18236;
var G__18239 = cljs.core.count(c__4550__auto___18236);
var G__18240 = (0);
seq__18192_18225 = G__18237;
chunk__18193_18226 = G__18238;
count__18194_18227 = G__18239;
i__18195_18228 = G__18240;
continue;
} else {
var param_18241 = cljs.core.first(seq__18192_18235__$1);
cljs.compiler.emit(param_18241);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18241,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18242 = cljs.core.next(seq__18192_18235__$1);
var G__18243 = null;
var G__18244 = (0);
var G__18245 = (0);
seq__18192_18225 = G__18242;
chunk__18193_18226 = G__18243;
count__18194_18227 = G__18244;
i__18195_18228 = G__18245;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(");");
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" = cljs.core.seq(",arglist,");");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("return ",delegate_name,"(");

var seq__18196_18246 = cljs.core.seq(params);
var chunk__18197_18247 = null;
var count__18198_18248 = (0);
var i__18199_18249 = (0);
while(true){
if((i__18199_18249 < count__18198_18248)){
var param_18250 = chunk__18197_18247.cljs$core$IIndexed$_nth$arity$2(null,i__18199_18249);
cljs.compiler.emit(param_18250);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18250,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18251 = seq__18196_18246;
var G__18252 = chunk__18197_18247;
var G__18253 = count__18198_18248;
var G__18254 = (i__18199_18249 + (1));
seq__18196_18246 = G__18251;
chunk__18197_18247 = G__18252;
count__18198_18248 = G__18253;
i__18199_18249 = G__18254;
continue;
} else {
var temp__5735__auto___18255 = cljs.core.seq(seq__18196_18246);
if(temp__5735__auto___18255){
var seq__18196_18256__$1 = temp__5735__auto___18255;
if(cljs.core.chunked_seq_QMARK_(seq__18196_18256__$1)){
var c__4550__auto___18257 = cljs.core.chunk_first(seq__18196_18256__$1);
var G__18258 = cljs.core.chunk_rest(seq__18196_18256__$1);
var G__18259 = c__4550__auto___18257;
var G__18260 = cljs.core.count(c__4550__auto___18257);
var G__18261 = (0);
seq__18196_18246 = G__18258;
chunk__18197_18247 = G__18259;
count__18198_18248 = G__18260;
i__18199_18249 = G__18261;
continue;
} else {
var param_18262 = cljs.core.first(seq__18196_18256__$1);
cljs.compiler.emit(param_18262);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18262,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18263 = cljs.core.next(seq__18196_18256__$1);
var G__18264 = null;
var G__18265 = (0);
var G__18266 = (0);
seq__18196_18246 = G__18263;
chunk__18197_18247 = G__18264;
count__18198_18248 = G__18265;
i__18199_18249 = G__18266;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(");");
}

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("})");
});
cljs.compiler.emit_fn_params = (function cljs$compiler$emit_fn_params(params){
var seq__18267 = cljs.core.seq(params);
var chunk__18268 = null;
var count__18269 = (0);
var i__18270 = (0);
while(true){
if((i__18270 < count__18269)){
var param = chunk__18268.cljs$core$IIndexed$_nth$arity$2(null,i__18270);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18271 = seq__18267;
var G__18272 = chunk__18268;
var G__18273 = count__18269;
var G__18274 = (i__18270 + (1));
seq__18267 = G__18271;
chunk__18268 = G__18272;
count__18269 = G__18273;
i__18270 = G__18274;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__18267);
if(temp__5735__auto__){
var seq__18267__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18267__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__18267__$1);
var G__18275 = cljs.core.chunk_rest(seq__18267__$1);
var G__18276 = c__4550__auto__;
var G__18277 = cljs.core.count(c__4550__auto__);
var G__18278 = (0);
seq__18267 = G__18275;
chunk__18268 = G__18276;
count__18269 = G__18277;
i__18270 = G__18278;
continue;
} else {
var param = cljs.core.first(seq__18267__$1);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18279 = cljs.core.next(seq__18267__$1);
var G__18280 = null;
var G__18281 = (0);
var G__18282 = (0);
seq__18267 = G__18279;
chunk__18268 = G__18280;
count__18269 = G__18281;
i__18270 = G__18282;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__18283){
var map__18284 = p__18283;
var map__18284__$1 = (((((!((map__18284 == null))))?(((((map__18284.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18284.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18284):map__18284);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18284__$1,cljs.core.cst$kw$body);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18284__$1,cljs.core.cst$kw$type);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18284__$1,cljs.core.cst$kw$name);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18284__$1,cljs.core.cst$kw$params);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18284__$1,cljs.core.cst$kw$env);
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18284__$1,cljs.core.cst$kw$recurs);
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("(function ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"(");

cljs.compiler.emit_fn_params(params);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("while(true){");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("break;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("})");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
});
/**
 * Emit code that copies function arguments into an array starting at an index.
 *   Returns name of var holding the array.
 */
cljs.compiler.emit_arguments_to_array = (function cljs$compiler$emit_arguments_to_array(startslice){
if((((startslice >= (0))) && (cljs.core.integer_QMARK_(startslice)))){
} else {
throw (new Error("Assert failed: (and (>= startslice 0) (integer? startslice))"));
}

var mname = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
var i = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),"__i"].join('');
var a = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),"__a"].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic("var ",i," = 0, ",a," = new Array(arguments.length -  ",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([startslice,");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic("while (",i," < ",a,".length) {",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([a,"[",i,"] = arguments[",i," + ",startslice,"]; ++",i,";}"], 0));

return a;
});
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__18286){
var map__18287 = p__18286;
var map__18287__$1 = (((((!((map__18287 == null))))?(((((map__18287.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18287.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18287):map__18287);
var f = map__18287__$1;
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18287__$1,cljs.core.cst$kw$body);
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18287__$1,cljs.core.cst$kw$fixed_DASH_arity);
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18287__$1,cljs.core.cst$kw$variadic_QMARK_);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18287__$1,cljs.core.cst$kw$type);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18287__$1,cljs.core.cst$kw$name);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18287__$1,cljs.core.cst$kw$params);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18287__$1,cljs.core.cst$kw$env);
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18287__$1,cljs.core.cst$kw$recurs);
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

var name_18297__$1 = (function (){var or__4120__auto__ = name;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_18298 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_18297__$1);
var delegate_name_18299 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_18298),"__delegate"].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("(function() { ");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("var ",delegate_name_18299," = function (");

var seq__18289_18300 = cljs.core.seq(params);
var chunk__18290_18301 = null;
var count__18291_18302 = (0);
var i__18292_18303 = (0);
while(true){
if((i__18292_18303 < count__18291_18302)){
var param_18304 = chunk__18290_18301.cljs$core$IIndexed$_nth$arity$2(null,i__18292_18303);
cljs.compiler.emit(param_18304);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18304,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18305 = seq__18289_18300;
var G__18306 = chunk__18290_18301;
var G__18307 = count__18291_18302;
var G__18308 = (i__18292_18303 + (1));
seq__18289_18300 = G__18305;
chunk__18290_18301 = G__18306;
count__18291_18302 = G__18307;
i__18292_18303 = G__18308;
continue;
} else {
var temp__5735__auto___18309 = cljs.core.seq(seq__18289_18300);
if(temp__5735__auto___18309){
var seq__18289_18310__$1 = temp__5735__auto___18309;
if(cljs.core.chunked_seq_QMARK_(seq__18289_18310__$1)){
var c__4550__auto___18311 = cljs.core.chunk_first(seq__18289_18310__$1);
var G__18312 = cljs.core.chunk_rest(seq__18289_18310__$1);
var G__18313 = c__4550__auto___18311;
var G__18314 = cljs.core.count(c__4550__auto___18311);
var G__18315 = (0);
seq__18289_18300 = G__18312;
chunk__18290_18301 = G__18313;
count__18291_18302 = G__18314;
i__18292_18303 = G__18315;
continue;
} else {
var param_18316 = cljs.core.first(seq__18289_18310__$1);
cljs.compiler.emit(param_18316);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18316,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18317 = cljs.core.next(seq__18289_18310__$1);
var G__18318 = null;
var G__18319 = (0);
var G__18320 = (0);
seq__18289_18300 = G__18317;
chunk__18290_18301 = G__18318;
count__18291_18302 = G__18319;
i__18292_18303 = G__18320;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("while(true){");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("break;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("};");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("var ",mname_18298," = function (",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$var_args], null)):params)),"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("var self__ = this;");
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(" = null;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if (arguments.length > ",(cljs.core.count(params) - (1)),") {");

var a_18321 = cljs.compiler.emit_arguments_to_array((cljs.core.count(params) - (1)));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("  ",cljs.core.last(params)," = new cljs.core.IndexedSeq(",a_18321,",0,null);");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("} ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("return ",delegate_name_18299,".call(this,");

var seq__18293_18322 = cljs.core.seq(params);
var chunk__18294_18323 = null;
var count__18295_18324 = (0);
var i__18296_18325 = (0);
while(true){
if((i__18296_18325 < count__18295_18324)){
var param_18326 = chunk__18294_18323.cljs$core$IIndexed$_nth$arity$2(null,i__18296_18325);
cljs.compiler.emit(param_18326);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18326,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18327 = seq__18293_18322;
var G__18328 = chunk__18294_18323;
var G__18329 = count__18295_18324;
var G__18330 = (i__18296_18325 + (1));
seq__18293_18322 = G__18327;
chunk__18294_18323 = G__18328;
count__18295_18324 = G__18329;
i__18296_18325 = G__18330;
continue;
} else {
var temp__5735__auto___18331 = cljs.core.seq(seq__18293_18322);
if(temp__5735__auto___18331){
var seq__18293_18332__$1 = temp__5735__auto___18331;
if(cljs.core.chunked_seq_QMARK_(seq__18293_18332__$1)){
var c__4550__auto___18333 = cljs.core.chunk_first(seq__18293_18332__$1);
var G__18334 = cljs.core.chunk_rest(seq__18293_18332__$1);
var G__18335 = c__4550__auto___18333;
var G__18336 = cljs.core.count(c__4550__auto___18333);
var G__18337 = (0);
seq__18293_18322 = G__18334;
chunk__18294_18323 = G__18335;
count__18295_18324 = G__18336;
i__18296_18325 = G__18337;
continue;
} else {
var param_18338 = cljs.core.first(seq__18293_18332__$1);
cljs.compiler.emit(param_18338);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18338,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18339 = cljs.core.next(seq__18293_18332__$1);
var G__18340 = null;
var G__18341 = (0);
var G__18342 = (0);
seq__18293_18322 = G__18339;
chunk__18294_18323 = G__18340;
count__18295_18324 = G__18341;
i__18296_18325 = G__18342;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(");");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("};");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18298,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2(mname_18298,".cljs$lang$applyTo = ");

cljs.compiler.emit_apply_to(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(f,cljs.core.cst$kw$name,name_18297__$1));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18298,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_18299,";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("return ",mname_18298,";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("})()");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$fn,(function (p__18346){
var map__18347 = p__18346;
var map__18347__$1 = (((((!((map__18347 == null))))?(((((map__18347.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18347.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18347):map__18347);
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18347__$1,cljs.core.cst$kw$variadic_QMARK_);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18347__$1,cljs.core.cst$kw$name);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18347__$1,cljs.core.cst$kw$env);
var methods$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18347__$1,cljs.core.cst$kw$methods);
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18347__$1,cljs.core.cst$kw$max_DASH_fixed_DASH_arity);
var recur_frames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18347__$1,cljs.core.cst$kw$recur_DASH_frames);
var in_loop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18347__$1,cljs.core.cst$kw$in_DASH_loop);
var loop_lets = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18347__$1,cljs.core.cst$kw$loop_DASH_lets);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var recur_params = cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$params,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__18343_SHARP_){
var and__4109__auto__ = p1__18343_SHARP_;
if(cljs.core.truth_(and__4109__auto__)){
return cljs.core.deref(cljs.core.cst$kw$flag.cljs$core$IFn$_invoke$arity$1(p1__18343_SHARP_));
} else {
return and__4109__auto__;
}
}),recur_frames)], 0));
var loop_locals = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(recur_params,(cljs.core.truth_((function (){var or__4120__auto__ = in_loop;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.core.seq(recur_params);
}
})())?cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$params,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([loop_lets], 0)):null))));
if(loop_locals){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("((function (",cljs.compiler.comma_sep(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,loop_locals)),"){");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
}
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(methods$))){
if(cljs.core.truth_(variadic)){
cljs.compiler.emit_variadic_fn_method(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.first(methods$),cljs.core.cst$kw$name,name));
} else {
cljs.compiler.emit_fn_method(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.first(methods$),cljs.core.cst$kw$name,name));
}
} else {
var name_18400__$1 = (function (){var or__4120__auto__ = name;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_18401 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_18400__$1);
var maxparams_18402 = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,cljs.core.count,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$params,methods$));
var mmap_18403 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_18401),"__",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
}),methods$));
var ms_18404 = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2((function (p1__18344_SHARP_){
return cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__18344_SHARP_)));
}),cljs.core.seq(mmap_18403));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("(function() {");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",mname_18401," = null;");

var seq__18349_18405 = cljs.core.seq(ms_18404);
var chunk__18350_18406 = null;
var count__18351_18407 = (0);
var i__18352_18408 = (0);
while(true){
if((i__18352_18408 < count__18351_18407)){
var vec__18359_18409 = chunk__18350_18406.cljs$core$IIndexed$_nth$arity$2(null,i__18352_18408);
var n_18410 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18359_18409,(0),null);
var meth_18411 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18359_18409,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("var ",n_18410," = ");

if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(meth_18411))){
cljs.compiler.emit_variadic_fn_method(meth_18411);
} else {
cljs.compiler.emit_fn_method(meth_18411);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");


var G__18412 = seq__18349_18405;
var G__18413 = chunk__18350_18406;
var G__18414 = count__18351_18407;
var G__18415 = (i__18352_18408 + (1));
seq__18349_18405 = G__18412;
chunk__18350_18406 = G__18413;
count__18351_18407 = G__18414;
i__18352_18408 = G__18415;
continue;
} else {
var temp__5735__auto___18416 = cljs.core.seq(seq__18349_18405);
if(temp__5735__auto___18416){
var seq__18349_18417__$1 = temp__5735__auto___18416;
if(cljs.core.chunked_seq_QMARK_(seq__18349_18417__$1)){
var c__4550__auto___18418 = cljs.core.chunk_first(seq__18349_18417__$1);
var G__18419 = cljs.core.chunk_rest(seq__18349_18417__$1);
var G__18420 = c__4550__auto___18418;
var G__18421 = cljs.core.count(c__4550__auto___18418);
var G__18422 = (0);
seq__18349_18405 = G__18419;
chunk__18350_18406 = G__18420;
count__18351_18407 = G__18421;
i__18352_18408 = G__18422;
continue;
} else {
var vec__18362_18423 = cljs.core.first(seq__18349_18417__$1);
var n_18424 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18362_18423,(0),null);
var meth_18425 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18362_18423,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("var ",n_18424," = ");

if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(meth_18425))){
cljs.compiler.emit_variadic_fn_method(meth_18425);
} else {
cljs.compiler.emit_fn_method(meth_18425);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");


var G__18426 = cljs.core.next(seq__18349_18417__$1);
var G__18427 = null;
var G__18428 = (0);
var G__18429 = (0);
seq__18349_18405 = G__18426;
chunk__18350_18406 = G__18427;
count__18351_18407 = G__18428;
i__18352_18408 = G__18429;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18401," = function(",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(maxparams_18402),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$var_args], null)):maxparams_18402)),"){");

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(cljs.core.last(maxparams_18402));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(" = var_args;");
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("switch(arguments.length){");

var seq__18365_18430 = cljs.core.seq(ms_18404);
var chunk__18366_18431 = null;
var count__18367_18432 = (0);
var i__18368_18433 = (0);
while(true){
if((i__18368_18433 < count__18367_18432)){
var vec__18375_18434 = chunk__18366_18431.cljs$core$IIndexed$_nth$arity$2(null,i__18368_18433);
var n_18435 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18375_18434,(0),null);
var meth_18436 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18375_18434,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(meth_18436))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("default:");

var restarg_18437 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",restarg_18437," = null;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if (arguments.length > ",max_fixed_arity,") {");

var a_18438 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(restarg_18437," = new cljs.core.IndexedSeq(",a_18438,",0,null);");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic("return ",n_18435,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_18402)),(((cljs.core.count(maxparams_18402) > (1)))?", ":null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([restarg_18437,");"], 0));
} else {
var pcnt_18439 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_18436));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",pcnt_18439,":");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("return ",n_18435,".call(this",(((pcnt_18439 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_18439,maxparams_18402)),null,(1),null)),(2),null))),");");
}


var G__18440 = seq__18365_18430;
var G__18441 = chunk__18366_18431;
var G__18442 = count__18367_18432;
var G__18443 = (i__18368_18433 + (1));
seq__18365_18430 = G__18440;
chunk__18366_18431 = G__18441;
count__18367_18432 = G__18442;
i__18368_18433 = G__18443;
continue;
} else {
var temp__5735__auto___18444 = cljs.core.seq(seq__18365_18430);
if(temp__5735__auto___18444){
var seq__18365_18445__$1 = temp__5735__auto___18444;
if(cljs.core.chunked_seq_QMARK_(seq__18365_18445__$1)){
var c__4550__auto___18446 = cljs.core.chunk_first(seq__18365_18445__$1);
var G__18447 = cljs.core.chunk_rest(seq__18365_18445__$1);
var G__18448 = c__4550__auto___18446;
var G__18449 = cljs.core.count(c__4550__auto___18446);
var G__18450 = (0);
seq__18365_18430 = G__18447;
chunk__18366_18431 = G__18448;
count__18367_18432 = G__18449;
i__18368_18433 = G__18450;
continue;
} else {
var vec__18378_18451 = cljs.core.first(seq__18365_18445__$1);
var n_18452 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18378_18451,(0),null);
var meth_18453 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18378_18451,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(meth_18453))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("default:");

var restarg_18454 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",restarg_18454," = null;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if (arguments.length > ",max_fixed_arity,") {");

var a_18455 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(restarg_18454," = new cljs.core.IndexedSeq(",a_18455,",0,null);");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic("return ",n_18452,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_18402)),(((cljs.core.count(maxparams_18402) > (1)))?", ":null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([restarg_18454,");"], 0));
} else {
var pcnt_18456 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_18453));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",pcnt_18456,":");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("return ",n_18452,".call(this",(((pcnt_18456 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_18456,maxparams_18402)),null,(1),null)),(2),null))),");");
}


var G__18457 = cljs.core.next(seq__18365_18445__$1);
var G__18458 = null;
var G__18459 = (0);
var G__18460 = (0);
seq__18365_18430 = G__18457;
chunk__18366_18431 = G__18458;
count__18367_18432 = G__18459;
i__18368_18433 = G__18460;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");

var arg_count_js_18461 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$self__,cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.first(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(cljs.core.val(cljs.core.first(ms_18404)))))))?"(arguments.length - 1)":"arguments.length");
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("throw(new Error('Invalid arity: ' + ",arg_count_js_18461,"));");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("};");

if(cljs.core.truth_(variadic)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18401,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18401,".cljs$lang$applyTo = ",cljs.core.some((function (p1__18345_SHARP_){
var vec__18381 = p1__18345_SHARP_;
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18381,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18381,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
}),ms_18404),".cljs$lang$applyTo;");
} else {
}

var seq__18384_18462 = cljs.core.seq(ms_18404);
var chunk__18385_18463 = null;
var count__18386_18464 = (0);
var i__18387_18465 = (0);
while(true){
if((i__18387_18465 < count__18386_18464)){
var vec__18394_18466 = chunk__18385_18463.cljs$core$IIndexed$_nth$arity$2(null,i__18387_18465);
var n_18467 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18394_18466,(0),null);
var meth_18468 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18394_18466,(1),null);
var c_18469 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_18468));
if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(meth_18468))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18401,".cljs$core$IFn$_invoke$arity$variadic = ",n_18467,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(mname_18401,".cljs$core$IFn$_invoke$arity$",c_18469," = ",n_18467,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([";"], 0));
}


var G__18470 = seq__18384_18462;
var G__18471 = chunk__18385_18463;
var G__18472 = count__18386_18464;
var G__18473 = (i__18387_18465 + (1));
seq__18384_18462 = G__18470;
chunk__18385_18463 = G__18471;
count__18386_18464 = G__18472;
i__18387_18465 = G__18473;
continue;
} else {
var temp__5735__auto___18474 = cljs.core.seq(seq__18384_18462);
if(temp__5735__auto___18474){
var seq__18384_18475__$1 = temp__5735__auto___18474;
if(cljs.core.chunked_seq_QMARK_(seq__18384_18475__$1)){
var c__4550__auto___18476 = cljs.core.chunk_first(seq__18384_18475__$1);
var G__18477 = cljs.core.chunk_rest(seq__18384_18475__$1);
var G__18478 = c__4550__auto___18476;
var G__18479 = cljs.core.count(c__4550__auto___18476);
var G__18480 = (0);
seq__18384_18462 = G__18477;
chunk__18385_18463 = G__18478;
count__18386_18464 = G__18479;
i__18387_18465 = G__18480;
continue;
} else {
var vec__18397_18481 = cljs.core.first(seq__18384_18475__$1);
var n_18482 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18397_18481,(0),null);
var meth_18483 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18397_18481,(1),null);
var c_18484 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_18483));
if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(meth_18483))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18401,".cljs$core$IFn$_invoke$arity$variadic = ",n_18482,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(mname_18401,".cljs$core$IFn$_invoke$arity$",c_18484," = ",n_18482,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([";"], 0));
}


var G__18485 = cljs.core.next(seq__18384_18475__$1);
var G__18486 = null;
var G__18487 = (0);
var G__18488 = (0);
seq__18384_18462 = G__18485;
chunk__18385_18463 = G__18486;
count__18386_18464 = G__18487;
i__18387_18465 = G__18488;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("return ",mname_18401,";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("})()");
}

if(loop_locals){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(";})(",cljs.compiler.comma_sep(loop_locals),"))");
} else {
return null;
}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$do,(function (p__18489){
var map__18490 = p__18489;
var map__18490__$1 = (((((!((map__18490 == null))))?(((((map__18490.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18490.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18490):map__18490);
var statements = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18490__$1,cljs.core.cst$kw$statements);
var ret = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18490__$1,cljs.core.cst$kw$ret);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18490__$1,cljs.core.cst$kw$env);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(((cljs.core.seq(statements)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("(function (){");
} else {
}

var seq__18492_18496 = cljs.core.seq(statements);
var chunk__18493_18497 = null;
var count__18494_18498 = (0);
var i__18495_18499 = (0);
while(true){
if((i__18495_18499 < count__18494_18498)){
var s_18500 = chunk__18493_18497.cljs$core$IIndexed$_nth$arity$2(null,i__18495_18499);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(s_18500);


var G__18501 = seq__18492_18496;
var G__18502 = chunk__18493_18497;
var G__18503 = count__18494_18498;
var G__18504 = (i__18495_18499 + (1));
seq__18492_18496 = G__18501;
chunk__18493_18497 = G__18502;
count__18494_18498 = G__18503;
i__18495_18499 = G__18504;
continue;
} else {
var temp__5735__auto___18505 = cljs.core.seq(seq__18492_18496);
if(temp__5735__auto___18505){
var seq__18492_18506__$1 = temp__5735__auto___18505;
if(cljs.core.chunked_seq_QMARK_(seq__18492_18506__$1)){
var c__4550__auto___18507 = cljs.core.chunk_first(seq__18492_18506__$1);
var G__18508 = cljs.core.chunk_rest(seq__18492_18506__$1);
var G__18509 = c__4550__auto___18507;
var G__18510 = cljs.core.count(c__4550__auto___18507);
var G__18511 = (0);
seq__18492_18496 = G__18508;
chunk__18493_18497 = G__18509;
count__18494_18498 = G__18510;
i__18495_18499 = G__18511;
continue;
} else {
var s_18512 = cljs.core.first(seq__18492_18506__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(s_18512);


var G__18513 = cljs.core.next(seq__18492_18506__$1);
var G__18514 = null;
var G__18515 = (0);
var G__18516 = (0);
seq__18492_18496 = G__18513;
chunk__18493_18497 = G__18514;
count__18494_18498 = G__18515;
i__18495_18499 = G__18516;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emit(ret);

if(((cljs.core.seq(statements)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("})()");
} else {
return null;
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$try,(function (p__18517){
var map__18518 = p__18517;
var map__18518__$1 = (((((!((map__18518 == null))))?(((((map__18518.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18518.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18518):map__18518);
var try$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18518__$1,cljs.core.cst$kw$body);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18518__$1,cljs.core.cst$kw$env);
var catch$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18518__$1,cljs.core.cst$kw$catch);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18518__$1,cljs.core.cst$kw$name);
var finally$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18518__$1,cljs.core.cst$kw$finally);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var or__4120__auto__ = name;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return finally$;
}
})())){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("(function (){");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("try{",try$,"}");

if(cljs.core.truth_(name)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("catch (",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"){",catch$,"}");
} else {
}

if(cljs.core.truth_(finally$)){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$const,cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.unwrap_quote(finally$)))){
} else {
throw (new Error(["Assert failed: ","finally block cannot contain constant","\n","(not= :const (:op (ana/unwrap-quote finally)))"].join('')));
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("finally {",finally$,"}");
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("})()");
} else {
return null;
}
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(try$);
}
}));
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__18520,is_loop){
var map__18521 = p__18520;
var map__18521__$1 = (((((!((map__18521 == null))))?(((((map__18521.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18521.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18521):map__18521);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18521__$1,cljs.core.cst$kw$body);
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18521__$1,cljs.core.cst$kw$bindings);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18521__$1,cljs.core.cst$kw$env);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("(function (){");
} else {
}

var _STAR_lexical_renames_STAR__orig_val__18523_18537 = cljs.compiler._STAR_lexical_renames_STAR_;
var _STAR_lexical_renames_STAR__temp_val__18524_18538 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,context))?cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (binding){
var name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope(binding),cljs.core.gensym.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"-"].join(''))],null));
}),bindings):null));
(cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__temp_val__18524_18538);

try{var seq__18525_18539 = cljs.core.seq(bindings);
var chunk__18526_18540 = null;
var count__18527_18541 = (0);
var i__18528_18542 = (0);
while(true){
if((i__18528_18542 < count__18527_18541)){
var map__18533_18543 = chunk__18526_18540.cljs$core$IIndexed$_nth$arity$2(null,i__18528_18542);
var map__18533_18544__$1 = (((((!((map__18533_18543 == null))))?(((((map__18533_18543.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18533_18543.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18533_18543):map__18533_18543);
var binding_18545 = map__18533_18544__$1;
var init_18546 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18533_18544__$1,cljs.core.cst$kw$init);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(binding_18545);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" = ",init_18546,";");


var G__18547 = seq__18525_18539;
var G__18548 = chunk__18526_18540;
var G__18549 = count__18527_18541;
var G__18550 = (i__18528_18542 + (1));
seq__18525_18539 = G__18547;
chunk__18526_18540 = G__18548;
count__18527_18541 = G__18549;
i__18528_18542 = G__18550;
continue;
} else {
var temp__5735__auto___18551 = cljs.core.seq(seq__18525_18539);
if(temp__5735__auto___18551){
var seq__18525_18552__$1 = temp__5735__auto___18551;
if(cljs.core.chunked_seq_QMARK_(seq__18525_18552__$1)){
var c__4550__auto___18553 = cljs.core.chunk_first(seq__18525_18552__$1);
var G__18554 = cljs.core.chunk_rest(seq__18525_18552__$1);
var G__18555 = c__4550__auto___18553;
var G__18556 = cljs.core.count(c__4550__auto___18553);
var G__18557 = (0);
seq__18525_18539 = G__18554;
chunk__18526_18540 = G__18555;
count__18527_18541 = G__18556;
i__18528_18542 = G__18557;
continue;
} else {
var map__18535_18558 = cljs.core.first(seq__18525_18552__$1);
var map__18535_18559__$1 = (((((!((map__18535_18558 == null))))?(((((map__18535_18558.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18535_18558.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18535_18558):map__18535_18558);
var binding_18560 = map__18535_18559__$1;
var init_18561 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18535_18559__$1,cljs.core.cst$kw$init);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(binding_18560);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" = ",init_18561,";");


var G__18562 = cljs.core.next(seq__18525_18552__$1);
var G__18563 = null;
var G__18564 = (0);
var G__18565 = (0);
seq__18525_18539 = G__18562;
chunk__18526_18540 = G__18563;
count__18527_18541 = G__18564;
i__18528_18542 = G__18565;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("while(true){");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(expr);

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("break;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");
} else {
}
}finally {(cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__orig_val__18523_18537);
}
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("})()");
} else {
return null;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$let,(function (ast){
return cljs.compiler.emit_let(ast,false);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$loop,(function (ast){
return cljs.compiler.emit_let(ast,true);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$recur,(function (p__18566){
var map__18567 = p__18566;
var map__18567__$1 = (((((!((map__18567 == null))))?(((((map__18567.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18567.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18567):map__18567);
var frame = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18567__$1,cljs.core.cst$kw$frame);
var exprs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18567__$1,cljs.core.cst$kw$exprs);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18567__$1,cljs.core.cst$kw$env);
var temps = cljs.core.vec(cljs.core.take.cljs$core$IFn$_invoke$arity$2(cljs.core.count(exprs),cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym)));
var params = cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(frame);
var n__4607__auto___18569 = cljs.core.count(exprs);
var i_18570 = (0);
while(true){
if((i_18570 < n__4607__auto___18569)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("var ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_18570) : temps(i_18570))," = ",(exprs.cljs$core$IFn$_invoke$arity$1 ? exprs.cljs$core$IFn$_invoke$arity$1(i_18570) : exprs(i_18570)),";");

var G__18571 = (i_18570 + (1));
i_18570 = G__18571;
continue;
} else {
}
break;
}

var n__4607__auto___18572 = cljs.core.count(exprs);
var i_18573 = (0);
while(true){
if((i_18573 < n__4607__auto___18572)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((params.cljs$core$IFn$_invoke$arity$1 ? params.cljs$core$IFn$_invoke$arity$1(i_18573) : params(i_18573)))," = ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_18573) : temps(i_18573)),";");

var G__18574 = (i_18573 + (1));
i_18573 = G__18574;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("continue;");
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$letfn,(function (p__18575){
var map__18576 = p__18575;
var map__18576__$1 = (((((!((map__18576 == null))))?(((((map__18576.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18576.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18576):map__18576);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18576__$1,cljs.core.cst$kw$body);
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18576__$1,cljs.core.cst$kw$bindings);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18576__$1,cljs.core.cst$kw$env);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("(function (){");
} else {
}

var seq__18578_18590 = cljs.core.seq(bindings);
var chunk__18579_18591 = null;
var count__18580_18592 = (0);
var i__18581_18593 = (0);
while(true){
if((i__18581_18593 < count__18580_18592)){
var map__18586_18594 = chunk__18579_18591.cljs$core$IIndexed$_nth$arity$2(null,i__18581_18593);
var map__18586_18595__$1 = (((((!((map__18586_18594 == null))))?(((((map__18586_18594.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18586_18594.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18586_18594):map__18586_18594);
var binding_18596 = map__18586_18595__$1;
var init_18597 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18586_18595__$1,cljs.core.cst$kw$init);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_18596)," = ",init_18597,";");


var G__18598 = seq__18578_18590;
var G__18599 = chunk__18579_18591;
var G__18600 = count__18580_18592;
var G__18601 = (i__18581_18593 + (1));
seq__18578_18590 = G__18598;
chunk__18579_18591 = G__18599;
count__18580_18592 = G__18600;
i__18581_18593 = G__18601;
continue;
} else {
var temp__5735__auto___18602 = cljs.core.seq(seq__18578_18590);
if(temp__5735__auto___18602){
var seq__18578_18603__$1 = temp__5735__auto___18602;
if(cljs.core.chunked_seq_QMARK_(seq__18578_18603__$1)){
var c__4550__auto___18604 = cljs.core.chunk_first(seq__18578_18603__$1);
var G__18605 = cljs.core.chunk_rest(seq__18578_18603__$1);
var G__18606 = c__4550__auto___18604;
var G__18607 = cljs.core.count(c__4550__auto___18604);
var G__18608 = (0);
seq__18578_18590 = G__18605;
chunk__18579_18591 = G__18606;
count__18580_18592 = G__18607;
i__18581_18593 = G__18608;
continue;
} else {
var map__18588_18609 = cljs.core.first(seq__18578_18603__$1);
var map__18588_18610__$1 = (((((!((map__18588_18609 == null))))?(((((map__18588_18609.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18588_18609.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18588_18609):map__18588_18609);
var binding_18611 = map__18588_18610__$1;
var init_18612 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18588_18610__$1,cljs.core.cst$kw$init);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_18611)," = ",init_18612,";");


var G__18613 = cljs.core.next(seq__18578_18603__$1);
var G__18614 = null;
var G__18615 = (0);
var G__18616 = (0);
seq__18578_18590 = G__18613;
chunk__18579_18591 = G__18614;
count__18580_18592 = G__18615;
i__18581_18593 = G__18616;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(expr);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("})()");
} else {
return null;
}
}));
cljs.compiler.protocol_prefix = (function cljs$compiler$protocol_prefix(psym){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(psym).replace((new RegExp("\\.","g")),"$").replace("/","$")),"$"].join(''));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$invoke,(function (p__18619){
var map__18620 = p__18619;
var map__18620__$1 = (((((!((map__18620 == null))))?(((((map__18620.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18620.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18620):map__18620);
var expr = map__18620__$1;
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18620__$1,cljs.core.cst$kw$fn);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18620__$1,cljs.core.cst$kw$args);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18620__$1,cljs.core.cst$kw$env);
var info = cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(f);
var fn_QMARK_ = (function (){var and__4109__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__4109__auto__)){
if(cljs.core.not(cljs.core.cst$kw$dynamic.cljs$core$IFn$_invoke$arity$1(info))){
return cljs.core.cst$kw$fn_DASH_var.cljs$core$IFn$_invoke$arity$1(info);
} else {
return false;
}
} else {
return and__4109__auto__;
}
})();
var protocol = cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(info);
var tag = cljs.analyzer.infer_tag(env,cljs.core.first(cljs.core.cst$kw$args.cljs$core$IFn$_invoke$arity$1(expr)));
var proto_QMARK_ = (function (){var and__4109__auto__ = protocol;
if(cljs.core.truth_(and__4109__auto__)){
var and__4109__auto____$1 = tag;
if(cljs.core.truth_(and__4109__auto____$1)){
var or__4120__auto__ = (function (){var and__4109__auto____$2 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__4109__auto____$2)){
var and__4109__auto____$3 = protocol;
if(cljs.core.truth_(and__4109__auto____$3)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(tag,cljs.core.cst$sym$not_DASH_native);
} else {
return and__4109__auto____$3;
}
} else {
return and__4109__auto____$2;
}
})();
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
var and__4109__auto____$2 = (function (){var or__4120__auto____$1 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(or__4120__auto____$1)){
return or__4120__auto____$1;
} else {
return cljs.core.cst$kw$protocol_DASH_inline.cljs$core$IFn$_invoke$arity$1(env);
}
})();
if(cljs.core.truth_(and__4109__auto____$2)){
var or__4120__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(protocol,tag);
if(or__4120__auto____$1){
return or__4120__auto____$1;
} else {
if((!(cljs.core.set_QMARK_(tag)))){
if(cljs.core.not((function (){var fexpr__18632 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [cljs.core.cst$sym$clj,"null",cljs.core.cst$sym$boolean,"null",cljs.core.cst$sym$object,"null",cljs.core.cst$sym$any,"null",cljs.core.cst$sym$js,"null",cljs.core.cst$sym$number,"null",cljs.core.cst$sym$clj_DASH_or_DASH_nil,"null",cljs.core.cst$sym$array,"null",cljs.core.cst$sym$string,"null",cljs.core.cst$sym$function,"null",cljs.core.cst$sym$clj_DASH_nil,"null"], null), null);
return (fexpr__18632.cljs$core$IFn$_invoke$arity$1 ? fexpr__18632.cljs$core$IFn$_invoke$arity$1(tag) : fexpr__18632(tag));
})())){
var temp__5735__auto__ = cljs.core.cst$kw$protocols.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_existing_var(env,tag));
if(cljs.core.truth_(temp__5735__auto__)){
var ps = temp__5735__auto__;
return (ps.cljs$core$IFn$_invoke$arity$1 ? ps.cljs$core$IFn$_invoke$arity$1(protocol) : ps(protocol));
} else {
return null;
}
} else {
return false;
}
} else {
return false;
}
}
} else {
return and__4109__auto____$2;
}
}
} else {
return and__4109__auto____$1;
}
} else {
return and__4109__auto__;
}
})();
var first_arg_tag = cljs.analyzer.infer_tag(env,cljs.core.first(cljs.core.cst$kw$args.cljs$core$IFn$_invoke$arity$1(expr)));
var opt_not_QMARK_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info),cljs.core.cst$sym$cljs$core_SLASH_not)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(first_arg_tag,cljs.core.cst$sym$boolean)));
var opt_count_QMARK_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info),cljs.core.cst$sym$cljs$core_SLASH_count)) && (cljs.core.boolean$((function (){var fexpr__18634 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$array,"null",cljs.core.cst$sym$string,"null"], null), null);
return (fexpr__18634.cljs$core$IFn$_invoke$arity$1 ? fexpr__18634.cljs$core$IFn$_invoke$arity$1(first_arg_tag) : fexpr__18634(first_arg_tag));
})())));
var ns = cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(info);
var ftag = cljs.analyzer.infer_tag(env,f);
var js_QMARK_ = (function (){var or__4120__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.cst$sym$js);
if(or__4120__auto__){
return or__4120__auto__;
} else {
var or__4120__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.cst$sym$Math);
if(or__4120__auto____$1){
return or__4120__auto____$1;
} else {
return cljs.core.cst$kw$foreign.cljs$core$IFn$_invoke$arity$1(info);
}
}
})();
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__4120__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.cst$sym$goog);
if(or__4120__auto__){
return or__4120__auto__;
} else {
var or__4120__auto____$1 = (function (){var temp__5735__auto__ = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
if(cljs.core.truth_(temp__5735__auto__)){
var ns_str = temp__5735__auto__;
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.string.split.cljs$core$IFn$_invoke$arity$2(ns_str,/\./),(0),null),"goog");
} else {
return null;
}
})();
if(cljs.core.truth_(or__4120__auto____$1)){
return or__4120__auto____$1;
} else {
return (!(cljs.core.contains_QMARK_(cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)),ns)));
}
}
})():null);
var keyword_QMARK_ = (function (){var or__4120__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$cljs$core_SLASH_Keyword,ftag);
if(or__4120__auto__){
return or__4120__auto__;
} else {
var f__$1 = cljs.analyzer.unwrap_quote(f);
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(f__$1),cljs.core.cst$kw$const)) && ((cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(f__$1) instanceof cljs.core.Keyword)));
}
})();
var vec__18622 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count(args);
var variadic_QMARK_ = cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(info);
var mps = cljs.core.cst$kw$method_DASH_params.cljs$core$IFn$_invoke$arity$1(info);
var mfa = cljs.core.cst$kw$max_DASH_fixed_DASH_arity.cljs$core$IFn$_invoke$arity$1(info);
if(((cljs.core.not(variadic_QMARK_)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(mps),(1))))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
} else {
if(cljs.core.truth_((function (){var and__4109__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__4109__auto__)){
return (arity > mfa);
} else {
return and__4109__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),(function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),".cljs$core$IFn$_invoke$arity$variadic"].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),(function (p1__18617_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__18617_SHARP_,cljs.core.cst$kw$shadow),cljs.core.cst$kw$fn_DASH_self_DASH_name);
}));
})),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$max_DASH_fixed_DASH_arity,mfa], null)], null);
} else {
var arities = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.createAsIfByAssoc([arity]),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),(function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),(function (p1__18618_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__18618_SHARP_,cljs.core.cst$kw$shadow),cljs.core.cst$kw$fn_DASH_self_DASH_name);
}));
})),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18622,(0),null);
var variadic_invoke = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18622,(1),null);
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("(!(",cljs.core.first(args),"))");
} else {
if(opt_count_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("((",cljs.core.first(args),").length)");
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_18637 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.compiler.protocol_prefix(protocol))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.name(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info)))),"$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(args))].join('');
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.first(args),".",pimpl_18637,"(",cljs.compiler.comma_sep(cljs.core.cons("null",cljs.core.rest(args))),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([")"], 0));
} else {
if(keyword_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count(args),"(",cljs.compiler.comma_sep(args),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([")"], 0));
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_18638 = cljs.core.cst$kw$max_DASH_fixed_DASH_arity.cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(f__$1,"(",cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(mfa_18638,args)),(((mfa_18638 === (0)))?null:","),"cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.compiler.comma_sep(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(mfa_18638,args)),"], 0))"], 0));
} else {
if(cljs.core.truth_((function (){var or__4120__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
var or__4120__auto____$1 = js_QMARK_;
if(cljs.core.truth_(or__4120__auto____$1)){
return or__4120__auto____$1;
} else {
return goog_QMARK_;
}
}
})())){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4(f__$1,"(",cljs.compiler.comma_sep(args),")");
} else {
if(cljs.core.truth_((function (){var and__4109__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__4109__auto__)){
var G__18636 = cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(f__$1);
var fexpr__18635 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$var,null,cljs.core.cst$kw$js_DASH_var,null,cljs.core.cst$kw$local,null], null), null);
return (fexpr__18635.cljs$core$IFn$_invoke$arity$1 ? fexpr__18635.cljs$core$IFn$_invoke$arity$1(G__18636) : fexpr__18635(G__18636));
} else {
return and__4109__auto__;
}
})())){
var fprop_18639 = [".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(args))].join('');
if(cljs.core.truth_(cljs.analyzer._STAR_fn_invoke_direct_STAR_)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic("(",f__$1,fprop_18639," ? ",f__$1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([fprop_18639,"(",cljs.compiler.comma_sep(args),") : ",f__$1,"(",cljs.compiler.comma_sep(args),"))"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic("(",f__$1,fprop_18639," ? ",f__$1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([fprop_18639,"(",cljs.compiler.comma_sep(args),") : ",f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),"))"], 0));
}
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4(f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),")");
}

}
}
}
}
}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$new,(function (p__18640){
var map__18641 = p__18640;
var map__18641__$1 = (((((!((map__18641 == null))))?(((((map__18641.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18641.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18641):map__18641);
var ctor = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18641__$1,cljs.core.cst$kw$class);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18641__$1,cljs.core.cst$kw$args);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18641__$1,cljs.core.cst$kw$env);
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("(new ",ctor,"(",cljs.compiler.comma_sep(args),"))");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$set_BANG_,(function (p__18643){
var map__18644 = p__18643;
var map__18644__$1 = (((((!((map__18644 == null))))?(((((map__18644.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18644.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18644):map__18644);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18644__$1,cljs.core.cst$kw$target);
var val = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18644__$1,cljs.core.cst$kw$val);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18644__$1,cljs.core.cst$kw$env);
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("(",target," = ",val,")");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_global_export = (function cljs$compiler$emit_global_export(ns_name,global_exports,lib){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(ns_name),".",cljs.analyzer.munge_global_export(lib)," = goog.global",cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (prop){
return ["[\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop),"\"]"].join('');
}),clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name((function (){var or__4120__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(global_exports,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(lib));
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(global_exports,cljs.core.name(lib));
}
})()),/\./))),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([";"], 0));
});
cljs.compiler.load_libs = (function cljs$compiler$load_libs(libs,seen,reloads,deps,ns_name){
var map__18646 = cljs.core.deref(cljs.env._STAR_compiler_STAR_);
var map__18646__$1 = (((((!((map__18646 == null))))?(((((map__18646.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18646.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18646):map__18646);
var options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18646__$1,cljs.core.cst$kw$options);
var js_dependency_index = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18646__$1,cljs.core.cst$kw$js_DASH_dependency_DASH_index);
var map__18647 = options;
var map__18647__$1 = (((((!((map__18647 == null))))?(((((map__18647.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18647.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18647):map__18647);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18647__$1,cljs.core.cst$kw$target);
var optimizations = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18647__$1,cljs.core.cst$kw$optimizations);
var loaded_libs = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$sym$cljs$core$_STAR_loaded_DASH_libs_STAR_);
var loaded_libs_temp = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$sym$cljs$core$_STAR_loaded_DASH_libs_STAR_));
var vec__18648 = (function (){var libs__$1 = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.vals(seen)),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.vals(libs)),deps));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$nodejs,target)){
var map__18653 = cljs.core.group_by(cljs.analyzer.node_module_dep_QMARK_,libs__$1);
var map__18653__$1 = (((((!((map__18653 == null))))?(((((map__18653.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18653.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18653):map__18653);
var node_libs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18653__$1,true);
var libs_to_load = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18653__$1,false);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node_libs,libs_to_load], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,libs__$1], null);
}
})();
var node_libs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18648,(0),null);
var libs_to_load = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18648,(1),null);
var global_exports_libs = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.dep_has_global_exports_QMARK_,libs_to_load);
if(cljs.core.truth_(cljs.core.cst$kw$reload_DASH_all.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs)))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("if(!COMPILED) ",loaded_libs_temp," = ",loaded_libs," || cljs.core.set([\"cljs.core\"]);");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if(!COMPILED) ",loaded_libs," = cljs.core.set([\"cljs.core\"]);");
} else {
}

var seq__18655_18675 = cljs.core.seq(libs_to_load);
var chunk__18656_18676 = null;
var count__18657_18677 = (0);
var i__18658_18678 = (0);
while(true){
if((i__18658_18678 < count__18657_18677)){
var lib_18679 = chunk__18656_18676.cljs$core$IIndexed$_nth$arity$2(null,i__18658_18678);
if(((cljs.analyzer.foreign_dep_QMARK_(lib_18679)) && ((!(cljs.core.keyword_identical_QMARK_(optimizations,cljs.core.cst$kw$none)))))){
} else {
if(cljs.core.truth_((function (){var or__4120__auto__ = cljs.core.cst$kw$reload.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_18679),cljs.core.cst$kw$reload);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_18679),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__4120__auto__ = cljs.core.cst$kw$reload_DASH_all.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_18679),cljs.core.cst$kw$reload_DASH_all);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_18679),"', 'reload-all');");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(lib_18679,cljs.core.cst$sym$goog)){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_18679),"');");
}

}
}
}


var G__18680 = seq__18655_18675;
var G__18681 = chunk__18656_18676;
var G__18682 = count__18657_18677;
var G__18683 = (i__18658_18678 + (1));
seq__18655_18675 = G__18680;
chunk__18656_18676 = G__18681;
count__18657_18677 = G__18682;
i__18658_18678 = G__18683;
continue;
} else {
var temp__5735__auto___18684 = cljs.core.seq(seq__18655_18675);
if(temp__5735__auto___18684){
var seq__18655_18685__$1 = temp__5735__auto___18684;
if(cljs.core.chunked_seq_QMARK_(seq__18655_18685__$1)){
var c__4550__auto___18686 = cljs.core.chunk_first(seq__18655_18685__$1);
var G__18687 = cljs.core.chunk_rest(seq__18655_18685__$1);
var G__18688 = c__4550__auto___18686;
var G__18689 = cljs.core.count(c__4550__auto___18686);
var G__18690 = (0);
seq__18655_18675 = G__18687;
chunk__18656_18676 = G__18688;
count__18657_18677 = G__18689;
i__18658_18678 = G__18690;
continue;
} else {
var lib_18691 = cljs.core.first(seq__18655_18685__$1);
if(((cljs.analyzer.foreign_dep_QMARK_(lib_18691)) && ((!(cljs.core.keyword_identical_QMARK_(optimizations,cljs.core.cst$kw$none)))))){
} else {
if(cljs.core.truth_((function (){var or__4120__auto__ = cljs.core.cst$kw$reload.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_18691),cljs.core.cst$kw$reload);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_18691),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__4120__auto__ = cljs.core.cst$kw$reload_DASH_all.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_18691),cljs.core.cst$kw$reload_DASH_all);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_18691),"', 'reload-all');");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(lib_18691,cljs.core.cst$sym$goog)){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_18691),"');");
}

}
}
}


var G__18692 = cljs.core.next(seq__18655_18685__$1);
var G__18693 = null;
var G__18694 = (0);
var G__18695 = (0);
seq__18655_18675 = G__18692;
chunk__18656_18676 = G__18693;
count__18657_18677 = G__18694;
i__18658_18678 = G__18695;
continue;
}
} else {
}
}
break;
}

var seq__18659_18696 = cljs.core.seq(node_libs);
var chunk__18660_18697 = null;
var count__18661_18698 = (0);
var i__18662_18699 = (0);
while(true){
if((i__18662_18699 < count__18661_18698)){
var lib_18700 = chunk__18660_18697.cljs$core$IIndexed$_nth$arity$2(null,i__18662_18699);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(ns_name),".",cljs.analyzer.munge_node_lib(lib_18700)," = require('",lib_18700,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["');"], 0));


var G__18701 = seq__18659_18696;
var G__18702 = chunk__18660_18697;
var G__18703 = count__18661_18698;
var G__18704 = (i__18662_18699 + (1));
seq__18659_18696 = G__18701;
chunk__18660_18697 = G__18702;
count__18661_18698 = G__18703;
i__18662_18699 = G__18704;
continue;
} else {
var temp__5735__auto___18705 = cljs.core.seq(seq__18659_18696);
if(temp__5735__auto___18705){
var seq__18659_18706__$1 = temp__5735__auto___18705;
if(cljs.core.chunked_seq_QMARK_(seq__18659_18706__$1)){
var c__4550__auto___18707 = cljs.core.chunk_first(seq__18659_18706__$1);
var G__18708 = cljs.core.chunk_rest(seq__18659_18706__$1);
var G__18709 = c__4550__auto___18707;
var G__18710 = cljs.core.count(c__4550__auto___18707);
var G__18711 = (0);
seq__18659_18696 = G__18708;
chunk__18660_18697 = G__18709;
count__18661_18698 = G__18710;
i__18662_18699 = G__18711;
continue;
} else {
var lib_18712 = cljs.core.first(seq__18659_18706__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(ns_name),".",cljs.analyzer.munge_node_lib(lib_18712)," = require('",lib_18712,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["');"], 0));


var G__18713 = cljs.core.next(seq__18659_18706__$1);
var G__18714 = null;
var G__18715 = (0);
var G__18716 = (0);
seq__18659_18696 = G__18713;
chunk__18660_18697 = G__18714;
count__18661_18698 = G__18715;
i__18662_18699 = G__18716;
continue;
}
} else {
}
}
break;
}

var seq__18663_18717 = cljs.core.seq(global_exports_libs);
var chunk__18664_18718 = null;
var count__18665_18719 = (0);
var i__18666_18720 = (0);
while(true){
if((i__18666_18720 < count__18665_18719)){
var lib_18721 = chunk__18664_18718.cljs$core$IIndexed$_nth$arity$2(null,i__18666_18720);
var map__18671_18722 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(js_dependency_index,cljs.core.name(lib_18721));
var map__18671_18723__$1 = (((((!((map__18671_18722 == null))))?(((((map__18671_18722.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18671_18722.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18671_18722):map__18671_18722);
var global_exports_18724 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18671_18723__$1,cljs.core.cst$kw$global_DASH_exports);
cljs.compiler.emit_global_export(ns_name,global_exports_18724,lib_18721);


var G__18725 = seq__18663_18717;
var G__18726 = chunk__18664_18718;
var G__18727 = count__18665_18719;
var G__18728 = (i__18666_18720 + (1));
seq__18663_18717 = G__18725;
chunk__18664_18718 = G__18726;
count__18665_18719 = G__18727;
i__18666_18720 = G__18728;
continue;
} else {
var temp__5735__auto___18729 = cljs.core.seq(seq__18663_18717);
if(temp__5735__auto___18729){
var seq__18663_18730__$1 = temp__5735__auto___18729;
if(cljs.core.chunked_seq_QMARK_(seq__18663_18730__$1)){
var c__4550__auto___18731 = cljs.core.chunk_first(seq__18663_18730__$1);
var G__18732 = cljs.core.chunk_rest(seq__18663_18730__$1);
var G__18733 = c__4550__auto___18731;
var G__18734 = cljs.core.count(c__4550__auto___18731);
var G__18735 = (0);
seq__18663_18717 = G__18732;
chunk__18664_18718 = G__18733;
count__18665_18719 = G__18734;
i__18666_18720 = G__18735;
continue;
} else {
var lib_18736 = cljs.core.first(seq__18663_18730__$1);
var map__18673_18737 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(js_dependency_index,cljs.core.name(lib_18736));
var map__18673_18738__$1 = (((((!((map__18673_18737 == null))))?(((((map__18673_18737.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18673_18737.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18673_18737):map__18673_18737);
var global_exports_18739 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18673_18738__$1,cljs.core.cst$kw$global_DASH_exports);
cljs.compiler.emit_global_export(ns_name,global_exports_18739,lib_18736);


var G__18740 = cljs.core.next(seq__18663_18730__$1);
var G__18741 = null;
var G__18742 = (0);
var G__18743 = (0);
seq__18663_18717 = G__18740;
chunk__18664_18718 = G__18741;
count__18665_18719 = G__18742;
i__18666_18720 = G__18743;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cljs.core.cst$kw$reload_DASH_all.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs)))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic("if(!COMPILED) ",loaded_libs," = cljs.core.into(",loaded_libs_temp,", ",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([loaded_libs,");"], 0));
} else {
return null;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$ns_STAR_,(function (p__18744){
var map__18745 = p__18744;
var map__18745__$1 = (((((!((map__18745 == null))))?(((((map__18745.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18745.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18745):map__18745);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18745__$1,cljs.core.cst$kw$name);
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18745__$1,cljs.core.cst$kw$requires);
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18745__$1,cljs.core.cst$kw$uses);
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18745__$1,cljs.core.cst$kw$require_DASH_macros);
var reloads = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18745__$1,cljs.core.cst$kw$reloads);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18745__$1,cljs.core.cst$kw$env);
var deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18745__$1,cljs.core.cst$kw$deps);
cljs.compiler.load_libs(requires,null,cljs.core.cst$kw$require.cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

cljs.compiler.load_libs(uses,requires,cljs.core.cst$kw$use.cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

if(cljs.core.truth_(cljs.core.cst$kw$repl_DASH_env.cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("'nil';");
} else {
return null;
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$ns,(function (p__18747){
var map__18748 = p__18747;
var map__18748__$1 = (((((!((map__18748 == null))))?(((((map__18748.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18748.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18748):map__18748);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18748__$1,cljs.core.cst$kw$name);
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18748__$1,cljs.core.cst$kw$requires);
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18748__$1,cljs.core.cst$kw$uses);
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18748__$1,cljs.core.cst$kw$require_DASH_macros);
var reloads = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18748__$1,cljs.core.cst$kw$reloads);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18748__$1,cljs.core.cst$kw$env);
var deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18748__$1,cljs.core.cst$kw$deps);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.provide('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"');");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,cljs.core.cst$sym$cljs$core)){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("goog.require('cljs.core');");

if(cljs.core.truth_(cljs.core.cst$kw$emit_DASH_constants.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_))))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.constants_ns_sym),"');");
} else {
}
}

cljs.compiler.load_libs(requires,null,cljs.core.cst$kw$require.cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

return cljs.compiler.load_libs(uses,requires,cljs.core.cst$kw$use.cljs$core$IFn$_invoke$arity$1(reloads),deps,name);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$deftype,(function (p__18750){
var map__18751 = p__18750;
var map__18751__$1 = (((((!((map__18751 == null))))?(((((map__18751.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18751.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18751):map__18751);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18751__$1,cljs.core.cst$kw$t);
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18751__$1,cljs.core.cst$kw$fields);
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18751__$1,cljs.core.cst$kw$pmasks);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18751__$1,cljs.core.cst$kw$body);
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18751__$1,cljs.core.cst$kw$protocols);
var fields__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("/**");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("* @constructor");

var seq__18753_18777 = cljs.core.seq(protocols);
var chunk__18754_18778 = null;
var count__18755_18779 = (0);
var i__18756_18780 = (0);
while(true){
if((i__18756_18780 < count__18755_18779)){
var protocol_18781 = chunk__18754_18778.cljs$core$IIndexed$_nth$arity$2(null,i__18756_18780);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_18781)),"}");


var G__18782 = seq__18753_18777;
var G__18783 = chunk__18754_18778;
var G__18784 = count__18755_18779;
var G__18785 = (i__18756_18780 + (1));
seq__18753_18777 = G__18782;
chunk__18754_18778 = G__18783;
count__18755_18779 = G__18784;
i__18756_18780 = G__18785;
continue;
} else {
var temp__5735__auto___18786 = cljs.core.seq(seq__18753_18777);
if(temp__5735__auto___18786){
var seq__18753_18787__$1 = temp__5735__auto___18786;
if(cljs.core.chunked_seq_QMARK_(seq__18753_18787__$1)){
var c__4550__auto___18788 = cljs.core.chunk_first(seq__18753_18787__$1);
var G__18789 = cljs.core.chunk_rest(seq__18753_18787__$1);
var G__18790 = c__4550__auto___18788;
var G__18791 = cljs.core.count(c__4550__auto___18788);
var G__18792 = (0);
seq__18753_18777 = G__18789;
chunk__18754_18778 = G__18790;
count__18755_18779 = G__18791;
i__18756_18780 = G__18792;
continue;
} else {
var protocol_18793 = cljs.core.first(seq__18753_18787__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_18793)),"}");


var G__18794 = cljs.core.next(seq__18753_18787__$1);
var G__18795 = null;
var G__18796 = (0);
var G__18797 = (0);
seq__18753_18777 = G__18794;
chunk__18754_18778 = G__18795;
count__18755_18779 = G__18796;
i__18756_18780 = G__18797;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("*/");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){");

var seq__18757_18798 = cljs.core.seq(fields__$1);
var chunk__18758_18799 = null;
var count__18759_18800 = (0);
var i__18760_18801 = (0);
while(true){
if((i__18760_18801 < count__18759_18800)){
var fld_18802 = chunk__18758_18799.cljs$core$IIndexed$_nth$arity$2(null,i__18760_18801);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.",fld_18802," = ",fld_18802,";");


var G__18803 = seq__18757_18798;
var G__18804 = chunk__18758_18799;
var G__18805 = count__18759_18800;
var G__18806 = (i__18760_18801 + (1));
seq__18757_18798 = G__18803;
chunk__18758_18799 = G__18804;
count__18759_18800 = G__18805;
i__18760_18801 = G__18806;
continue;
} else {
var temp__5735__auto___18807 = cljs.core.seq(seq__18757_18798);
if(temp__5735__auto___18807){
var seq__18757_18808__$1 = temp__5735__auto___18807;
if(cljs.core.chunked_seq_QMARK_(seq__18757_18808__$1)){
var c__4550__auto___18809 = cljs.core.chunk_first(seq__18757_18808__$1);
var G__18810 = cljs.core.chunk_rest(seq__18757_18808__$1);
var G__18811 = c__4550__auto___18809;
var G__18812 = cljs.core.count(c__4550__auto___18809);
var G__18813 = (0);
seq__18757_18798 = G__18810;
chunk__18758_18799 = G__18811;
count__18759_18800 = G__18812;
i__18760_18801 = G__18813;
continue;
} else {
var fld_18814 = cljs.core.first(seq__18757_18808__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.",fld_18814," = ",fld_18814,";");


var G__18815 = cljs.core.next(seq__18757_18808__$1);
var G__18816 = null;
var G__18817 = (0);
var G__18818 = (0);
seq__18757_18798 = G__18815;
chunk__18758_18799 = G__18816;
count__18759_18800 = G__18817;
i__18760_18801 = G__18818;
continue;
}
} else {
}
}
break;
}

var seq__18761_18819 = cljs.core.seq(pmasks);
var chunk__18762_18820 = null;
var count__18763_18821 = (0);
var i__18764_18822 = (0);
while(true){
if((i__18764_18822 < count__18763_18821)){
var vec__18771_18823 = chunk__18762_18820.cljs$core$IIndexed$_nth$arity$2(null,i__18764_18822);
var pno_18824 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18771_18823,(0),null);
var pmask_18825 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18771_18823,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.cljs$lang$protocol_mask$partition",pno_18824,"$ = ",pmask_18825,";");


var G__18826 = seq__18761_18819;
var G__18827 = chunk__18762_18820;
var G__18828 = count__18763_18821;
var G__18829 = (i__18764_18822 + (1));
seq__18761_18819 = G__18826;
chunk__18762_18820 = G__18827;
count__18763_18821 = G__18828;
i__18764_18822 = G__18829;
continue;
} else {
var temp__5735__auto___18830 = cljs.core.seq(seq__18761_18819);
if(temp__5735__auto___18830){
var seq__18761_18831__$1 = temp__5735__auto___18830;
if(cljs.core.chunked_seq_QMARK_(seq__18761_18831__$1)){
var c__4550__auto___18832 = cljs.core.chunk_first(seq__18761_18831__$1);
var G__18833 = cljs.core.chunk_rest(seq__18761_18831__$1);
var G__18834 = c__4550__auto___18832;
var G__18835 = cljs.core.count(c__4550__auto___18832);
var G__18836 = (0);
seq__18761_18819 = G__18833;
chunk__18762_18820 = G__18834;
count__18763_18821 = G__18835;
i__18764_18822 = G__18836;
continue;
} else {
var vec__18774_18837 = cljs.core.first(seq__18761_18831__$1);
var pno_18838 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18774_18837,(0),null);
var pmask_18839 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18774_18837,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.cljs$lang$protocol_mask$partition",pno_18838,"$ = ",pmask_18839,";");


var G__18840 = cljs.core.next(seq__18761_18831__$1);
var G__18841 = null;
var G__18842 = (0);
var G__18843 = (0);
seq__18761_18819 = G__18840;
chunk__18762_18820 = G__18841;
count__18763_18821 = G__18842;
i__18764_18822 = G__18843;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("});");

return cljs.compiler.emit(body);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$defrecord,(function (p__18844){
var map__18845 = p__18844;
var map__18845__$1 = (((((!((map__18845 == null))))?(((((map__18845.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18845.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18845):map__18845);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18845__$1,cljs.core.cst$kw$t);
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18845__$1,cljs.core.cst$kw$fields);
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18845__$1,cljs.core.cst$kw$pmasks);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18845__$1,cljs.core.cst$kw$body);
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18845__$1,cljs.core.cst$kw$protocols);
var fields__$1 = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$__meta,cljs.core.cst$sym$__extmap,cljs.core.cst$sym$__hash], null));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("/**");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("* @constructor");

var seq__18847_18871 = cljs.core.seq(protocols);
var chunk__18848_18872 = null;
var count__18849_18873 = (0);
var i__18850_18874 = (0);
while(true){
if((i__18850_18874 < count__18849_18873)){
var protocol_18875 = chunk__18848_18872.cljs$core$IIndexed$_nth$arity$2(null,i__18850_18874);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_18875)),"}");


var G__18876 = seq__18847_18871;
var G__18877 = chunk__18848_18872;
var G__18878 = count__18849_18873;
var G__18879 = (i__18850_18874 + (1));
seq__18847_18871 = G__18876;
chunk__18848_18872 = G__18877;
count__18849_18873 = G__18878;
i__18850_18874 = G__18879;
continue;
} else {
var temp__5735__auto___18880 = cljs.core.seq(seq__18847_18871);
if(temp__5735__auto___18880){
var seq__18847_18881__$1 = temp__5735__auto___18880;
if(cljs.core.chunked_seq_QMARK_(seq__18847_18881__$1)){
var c__4550__auto___18882 = cljs.core.chunk_first(seq__18847_18881__$1);
var G__18883 = cljs.core.chunk_rest(seq__18847_18881__$1);
var G__18884 = c__4550__auto___18882;
var G__18885 = cljs.core.count(c__4550__auto___18882);
var G__18886 = (0);
seq__18847_18871 = G__18883;
chunk__18848_18872 = G__18884;
count__18849_18873 = G__18885;
i__18850_18874 = G__18886;
continue;
} else {
var protocol_18887 = cljs.core.first(seq__18847_18881__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_18887)),"}");


var G__18888 = cljs.core.next(seq__18847_18881__$1);
var G__18889 = null;
var G__18890 = (0);
var G__18891 = (0);
seq__18847_18871 = G__18888;
chunk__18848_18872 = G__18889;
count__18849_18873 = G__18890;
i__18850_18874 = G__18891;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("*/");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){");

var seq__18851_18892 = cljs.core.seq(fields__$1);
var chunk__18852_18893 = null;
var count__18853_18894 = (0);
var i__18854_18895 = (0);
while(true){
if((i__18854_18895 < count__18853_18894)){
var fld_18896 = chunk__18852_18893.cljs$core$IIndexed$_nth$arity$2(null,i__18854_18895);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.",fld_18896," = ",fld_18896,";");


var G__18897 = seq__18851_18892;
var G__18898 = chunk__18852_18893;
var G__18899 = count__18853_18894;
var G__18900 = (i__18854_18895 + (1));
seq__18851_18892 = G__18897;
chunk__18852_18893 = G__18898;
count__18853_18894 = G__18899;
i__18854_18895 = G__18900;
continue;
} else {
var temp__5735__auto___18901 = cljs.core.seq(seq__18851_18892);
if(temp__5735__auto___18901){
var seq__18851_18902__$1 = temp__5735__auto___18901;
if(cljs.core.chunked_seq_QMARK_(seq__18851_18902__$1)){
var c__4550__auto___18903 = cljs.core.chunk_first(seq__18851_18902__$1);
var G__18904 = cljs.core.chunk_rest(seq__18851_18902__$1);
var G__18905 = c__4550__auto___18903;
var G__18906 = cljs.core.count(c__4550__auto___18903);
var G__18907 = (0);
seq__18851_18892 = G__18904;
chunk__18852_18893 = G__18905;
count__18853_18894 = G__18906;
i__18854_18895 = G__18907;
continue;
} else {
var fld_18908 = cljs.core.first(seq__18851_18902__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.",fld_18908," = ",fld_18908,";");


var G__18909 = cljs.core.next(seq__18851_18902__$1);
var G__18910 = null;
var G__18911 = (0);
var G__18912 = (0);
seq__18851_18892 = G__18909;
chunk__18852_18893 = G__18910;
count__18853_18894 = G__18911;
i__18854_18895 = G__18912;
continue;
}
} else {
}
}
break;
}

var seq__18855_18913 = cljs.core.seq(pmasks);
var chunk__18856_18914 = null;
var count__18857_18915 = (0);
var i__18858_18916 = (0);
while(true){
if((i__18858_18916 < count__18857_18915)){
var vec__18865_18917 = chunk__18856_18914.cljs$core$IIndexed$_nth$arity$2(null,i__18858_18916);
var pno_18918 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18865_18917,(0),null);
var pmask_18919 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18865_18917,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.cljs$lang$protocol_mask$partition",pno_18918,"$ = ",pmask_18919,";");


var G__18920 = seq__18855_18913;
var G__18921 = chunk__18856_18914;
var G__18922 = count__18857_18915;
var G__18923 = (i__18858_18916 + (1));
seq__18855_18913 = G__18920;
chunk__18856_18914 = G__18921;
count__18857_18915 = G__18922;
i__18858_18916 = G__18923;
continue;
} else {
var temp__5735__auto___18924 = cljs.core.seq(seq__18855_18913);
if(temp__5735__auto___18924){
var seq__18855_18925__$1 = temp__5735__auto___18924;
if(cljs.core.chunked_seq_QMARK_(seq__18855_18925__$1)){
var c__4550__auto___18926 = cljs.core.chunk_first(seq__18855_18925__$1);
var G__18927 = cljs.core.chunk_rest(seq__18855_18925__$1);
var G__18928 = c__4550__auto___18926;
var G__18929 = cljs.core.count(c__4550__auto___18926);
var G__18930 = (0);
seq__18855_18913 = G__18927;
chunk__18856_18914 = G__18928;
count__18857_18915 = G__18929;
i__18858_18916 = G__18930;
continue;
} else {
var vec__18868_18931 = cljs.core.first(seq__18855_18925__$1);
var pno_18932 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18868_18931,(0),null);
var pmask_18933 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18868_18931,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.cljs$lang$protocol_mask$partition",pno_18932,"$ = ",pmask_18933,";");


var G__18934 = cljs.core.next(seq__18855_18925__$1);
var G__18935 = null;
var G__18936 = (0);
var G__18937 = (0);
seq__18855_18913 = G__18934;
chunk__18856_18914 = G__18935;
count__18857_18915 = G__18936;
i__18858_18916 = G__18937;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("});");

return cljs.compiler.emit(body);
}));
cljs.compiler.emit_dot = (function cljs$compiler$emit_dot(p__18938){
var map__18939 = p__18938;
var map__18939__$1 = (((((!((map__18939 == null))))?(((((map__18939.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18939.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18939):map__18939);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18939__$1,cljs.core.cst$kw$target);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18939__$1,cljs.core.cst$kw$field);
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18939__$1,cljs.core.cst$kw$method);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18939__$1,cljs.core.cst$kw$args);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18939__$1,cljs.core.cst$kw$env);
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3(target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(field,cljs.core.PersistentHashSet.EMPTY));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep(args),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([")"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$host_DASH_field,(function (ast){
return cljs.compiler.emit_dot(ast);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$host_DASH_call,(function (ast){
return cljs.compiler.emit_dot(ast);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$js,(function (p__18941){
var map__18942 = p__18941;
var map__18942__$1 = (((((!((map__18942 == null))))?(((((map__18942.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18942.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18942):map__18942);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18942__$1,cljs.core.cst$kw$op);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18942__$1,cljs.core.cst$kw$env);
var code = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18942__$1,cljs.core.cst$kw$code);
var segs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18942__$1,cljs.core.cst$kw$segs);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18942__$1,cljs.core.cst$kw$args);
if(cljs.core.truth_((function (){var and__4109__auto__ = code;
if(cljs.core.truth_(and__4109__auto__)){
return goog.string.startsWith(clojure.string.trim(code),"/*");
} else {
return and__4109__auto__;
}
})())){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(code);
} else {
var env__17686__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(code);
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null))));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17686__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}
}));
cljs.compiler.emit_constants_table = (function cljs$compiler$emit_constants_table(table){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.provide('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.constants_ns_sym),"');");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("goog.require('cljs.core');");

var seq__18948 = cljs.core.seq(table);
var chunk__18949 = null;
var count__18950 = (0);
var i__18951 = (0);
while(true){
if((i__18951 < count__18950)){
var vec__18958 = chunk__18949.cljs$core$IIndexed$_nth$arity$2(null,i__18951);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18958,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18958,(1),null);
var ns_18964 = cljs.core.namespace(sym);
var name_18965 = cljs.core.name(sym);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword(sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol(sym);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Cannot emit constant for type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(sym))].join(''),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$error,cljs.core.cst$kw$invalid_DASH_constant_DASH_type,cljs.core.cst$kw$clojure$error_SLASH_phase,cljs.core.cst$kw$compilation], null));

}
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(";\n");


var G__18966 = seq__18948;
var G__18967 = chunk__18949;
var G__18968 = count__18950;
var G__18969 = (i__18951 + (1));
seq__18948 = G__18966;
chunk__18949 = G__18967;
count__18950 = G__18968;
i__18951 = G__18969;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__18948);
if(temp__5735__auto__){
var seq__18948__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18948__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__18948__$1);
var G__18970 = cljs.core.chunk_rest(seq__18948__$1);
var G__18971 = c__4550__auto__;
var G__18972 = cljs.core.count(c__4550__auto__);
var G__18973 = (0);
seq__18948 = G__18970;
chunk__18949 = G__18971;
count__18950 = G__18972;
i__18951 = G__18973;
continue;
} else {
var vec__18961 = cljs.core.first(seq__18948__$1);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18961,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18961,(1),null);
var ns_18974 = cljs.core.namespace(sym);
var name_18975 = cljs.core.name(sym);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword(sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol(sym);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Cannot emit constant for type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(sym))].join(''),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$error,cljs.core.cst$kw$invalid_DASH_constant_DASH_type,cljs.core.cst$kw$clojure$error_SLASH_phase,cljs.core.cst$kw$compilation], null));

}
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(";\n");


var G__18976 = cljs.core.next(seq__18948__$1);
var G__18977 = null;
var G__18978 = (0);
var G__18979 = (0);
seq__18948 = G__18976;
chunk__18949 = G__18977;
count__18950 = G__18978;
i__18951 = G__18979;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_externs = (function cljs$compiler$emit_externs(var_args){
var G__18981 = arguments.length;
switch (G__18981) {
case 1:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 4:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1 = (function (externs){
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4(cljs.core.PersistentVector.EMPTY,externs,cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY),(cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?cljs.analyzer.get_externs():null));
}));

(cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4 = (function (prefix,externs,top_level,known_externs){
var ks = cljs.core.seq(cljs.core.keys(externs));
while(true){
if(ks){
var k_18986 = cljs.core.first(ks);
var vec__18982_18987 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(prefix,k_18986);
var top_18988 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18982_18987,(0),null);
var prefix_SINGLEQUOTE__18989 = vec__18982_18987;
if(((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$prototype,k_18986)) && ((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(known_externs,prefix_SINGLEQUOTE__18989) == null)))){
if((!(((cljs.core.contains_QMARK_(cljs.core.deref(top_level),top_18988)) || (cljs.core.contains_QMARK_(known_externs,top_18988)))))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,prefix_SINGLEQUOTE__18989)),";");

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(top_level,cljs.core.conj,top_18988);
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,prefix_SINGLEQUOTE__18989)),";");
}
} else {
}

var m_18990 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(externs,k_18986);
if(cljs.core.empty_QMARK_(m_18990)){
} else {
cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4(prefix_SINGLEQUOTE__18989,m_18990,top_level,known_externs);
}

var G__18991 = cljs.core.next(ks);
ks = G__18991;
continue;
} else {
return null;
}
break;
}
}));

(cljs.compiler.emit_externs.cljs$lang$maxFixedArity = 4);

