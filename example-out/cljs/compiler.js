// Compiled by ClojureScript 1.10.520 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
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
var map__17739 = s;
var map__17739__$1 = (((((!((map__17739 == null))))?(((((map__17739.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17739.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17739):map__17739);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17739__$1,cljs.core.cst$kw$name);
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17739__$1,cljs.core.cst$kw$info);
var d = (0);
var G__17742 = info;
var map__17743 = G__17742;
var map__17743__$1 = (((((!((map__17743 == null))))?(((((map__17743.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17743.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17743):map__17743);
var shadow = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17743__$1,cljs.core.cst$kw$shadow);
var d__$1 = d;
var G__17742__$1 = G__17742;
while(true){
var d__$2 = d__$1;
var map__17747 = G__17742__$1;
var map__17747__$1 = (((((!((map__17747 == null))))?(((((map__17747.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17747.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17747):map__17747);
var shadow__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17747__$1,cljs.core.cst$kw$shadow);
if(cljs.core.truth_(shadow__$1)){
var G__17749 = (d__$2 + (1));
var G__17750 = shadow__$1;
d__$1 = G__17749;
G__17742__$1 = G__17750;
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
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__17751){
var map__17752 = p__17751;
var map__17752__$1 = (((((!((map__17752 == null))))?(((((map__17752.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17752.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17752):map__17752);
var name_var = map__17752__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17752__$1,cljs.core.cst$kw$name);
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17752__$1,cljs.core.cst$kw$info);
var name__$1 = clojure.string.replace(cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"..","_DOT__DOT_");
var map__17754 = info;
var map__17754__$1 = (((((!((map__17754 == null))))?(((((map__17754.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17754.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17754):map__17754);
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17754__$1,cljs.core.cst$kw$ns);
var fn_scope = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17754__$1,cljs.core.cst$kw$fn_DASH_scope);
var scoped_name = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2("_$_",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.cst$kw$name),fn_scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null))));
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((function (){var G__17756 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.replace(cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),".","$")),"$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(scoped_name)].join('');
return (cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(G__17756) : cljs.compiler.munge(G__17756));
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
var G__17758 = arguments.length;
switch (G__17758) {
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

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(s,cljs.compiler.js_reserved);
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2 = (function (s,reserved){
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
var ms = (function (){var fexpr__17759 = new cljs.core.Var(function(){return cljs.core.munge_str;},cljs.core.cst$sym$cljs$core_SLASH_munge_DASH_str,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$private,cljs.core.cst$kw$ns,cljs.core.cst$kw$name,cljs.core.cst$kw$file,cljs.core.cst$kw$end_DASH_column,cljs.core.cst$kw$column,cljs.core.cst$kw$line,cljs.core.cst$kw$end_DASH_line,cljs.core.cst$kw$arglists,cljs.core.cst$kw$doc,cljs.core.cst$kw$test],[true,cljs.core.cst$sym$cljs$core,cljs.core.cst$sym$munge_DASH_str,"cljs/core.cljs",17,1,11478,11478,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$name], null)),null,(cljs.core.truth_(cljs.core.munge_str)?cljs.core.munge_str.cljs$lang$test:null)]));
return (fexpr__17759.cljs$core$IFn$_invoke$arity$1 ? fexpr__17759.cljs$core$IFn$_invoke$arity$1(ss__$3) : fexpr__17759(ss__$3));
})();
if((s instanceof cljs.core.Symbol)){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(ms);
} else {
return ms;
}
}
});

cljs.compiler.munge.cljs$lang$maxFixedArity = 2;

cljs.compiler.comma_sep = (function cljs$compiler$comma_sep(xs){
return cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(",",xs);
});
cljs.compiler.escape_char = (function cljs$compiler$escape_char(c){
var cp = goog.string.hashCode(c);
var G__17761 = cp;
switch (G__17761) {
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
return ["\\u",cljs.core.str.cljs$core$IFn$_invoke$arity$1(pad),cljs.core.str.cljs$core$IFn$_invoke$arity$1(unpadded)].join('');
}

}
});
cljs.compiler.escape_string = (function cljs$compiler$escape_string(s){
var sb = (new goog.string.StringBuffer());
var seq__17763_17767 = cljs.core.seq(s);
var chunk__17764_17768 = null;
var count__17765_17769 = (0);
var i__17766_17770 = (0);
while(true){
if((i__17766_17770 < count__17765_17769)){
var c_17771 = chunk__17764_17768.cljs$core$IIndexed$_nth$arity$2(null,i__17766_17770);
sb.append(cljs.compiler.escape_char(c_17771));


var G__17772 = seq__17763_17767;
var G__17773 = chunk__17764_17768;
var G__17774 = count__17765_17769;
var G__17775 = (i__17766_17770 + (1));
seq__17763_17767 = G__17772;
chunk__17764_17768 = G__17773;
count__17765_17769 = G__17774;
i__17766_17770 = G__17775;
continue;
} else {
var temp__5735__auto___17776 = cljs.core.seq(seq__17763_17767);
if(temp__5735__auto___17776){
var seq__17763_17777__$1 = temp__5735__auto___17776;
if(cljs.core.chunked_seq_QMARK_(seq__17763_17777__$1)){
var c__4550__auto___17778 = cljs.core.chunk_first(seq__17763_17777__$1);
var G__17779 = cljs.core.chunk_rest(seq__17763_17777__$1);
var G__17780 = c__4550__auto___17778;
var G__17781 = cljs.core.count(c__4550__auto___17778);
var G__17782 = (0);
seq__17763_17767 = G__17779;
chunk__17764_17768 = G__17780;
count__17765_17769 = G__17781;
i__17766_17770 = G__17782;
continue;
} else {
var c_17783 = cljs.core.first(seq__17763_17777__$1);
sb.append(cljs.compiler.escape_char(c_17783));


var G__17784 = cljs.core.next(seq__17763_17777__$1);
var G__17785 = null;
var G__17786 = (0);
var G__17787 = (0);
seq__17763_17767 = G__17784;
chunk__17764_17768 = G__17785;
count__17765_17769 = G__17786;
i__17766_17770 = G__17787;
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
var hierarchy__4617__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,(function (){var fexpr__17788 = cljs.core.get_global_hierarchy;
return (fexpr__17788.cljs$core$IFn$_invoke$arity$0 ? fexpr__17788.cljs$core$IFn$_invoke$arity$0() : fexpr__17788());
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.compiler","emit*"),cljs.core.cst$kw$op,cljs.core.cst$kw$default,hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}
cljs.compiler.emit = (function cljs$compiler$emit(ast){
if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__17789_17796 = ast;
var map__17789_17797__$1 = (((((!((map__17789_17796 == null))))?(((((map__17789_17796.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17789_17796.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17789_17796):map__17789_17796);
var env_17798 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17789_17797__$1,cljs.core.cst$kw$env);
if(cljs.core.truth_(cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(env_17798))){
var map__17791_17799 = env_17798;
var map__17791_17800__$1 = (((((!((map__17791_17799 == null))))?(((((map__17791_17799.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17791_17799.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17791_17799):map__17791_17799);
var line_17801 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17791_17800__$1,cljs.core.cst$kw$line);
var column_17802 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17791_17800__$1,cljs.core.cst$kw$column);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,((function (map__17791_17799,map__17791_17800__$1,line_17801,column_17802,map__17789_17796,map__17789_17797__$1,env_17798){
return (function (m){
var minfo = (function (){var G__17793 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$gcol,cljs.core.cst$kw$gen_DASH_col.cljs$core$IFn$_invoke$arity$1(m),cljs.core.cst$kw$gline,cljs.core.cst$kw$gen_DASH_line.cljs$core$IFn$_invoke$arity$1(m)], null);
if(cljs.core.truth_((function (){var G__17795 = cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(ast);
var fexpr__17794 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$binding,null,cljs.core.cst$kw$var,null,cljs.core.cst$kw$js_DASH_var,null,cljs.core.cst$kw$local,null], null), null);
return (fexpr__17794.cljs$core$IFn$_invoke$arity$1 ? fexpr__17794.cljs$core$IFn$_invoke$arity$1(G__17795) : fexpr__17794(G__17795));
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__17793,cljs.core.cst$kw$name,cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(ast))));
} else {
return G__17793;
}
})();
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$source_DASH_map,(line_17801 - (1))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (minfo,map__17791_17799,map__17791_17800__$1,line_17801,column_17802,map__17789_17796,map__17789_17797__$1,env_17798){
return (function (line__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_17802)?(column_17802 - (1)):(0))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (minfo,map__17791_17799,map__17791_17800__$1,line_17801,column_17802,map__17789_17796,map__17789_17797__$1,env_17798){
return (function (column__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(column__$1,minfo);
});})(minfo,map__17791_17799,map__17791_17800__$1,line_17801,column_17802,map__17789_17796,map__17789_17797__$1,env_17798))
,cljs.core.PersistentVector.EMPTY));
});})(minfo,map__17791_17799,map__17791_17800__$1,line_17801,column_17802,map__17789_17796,map__17789_17797__$1,env_17798))
,cljs.core.sorted_map()));
});})(map__17791_17799,map__17791_17800__$1,line_17801,column_17802,map__17789_17796,map__17789_17797__$1,env_17798))
);
} else {
}
} else {
}

return (cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1(ast) : cljs.compiler.emit_STAR_(ast));
});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var G__17811 = arguments.length;
switch (G__17811) {
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
var len__4730__auto___17818 = arguments.length;
var i__4731__auto___17819 = (0);
while(true){
if((i__4731__auto___17819 < len__4730__auto___17818)){
args_arr__4751__auto__.push((arguments[i__4731__auto___17819]));

var G__17820 = (i__4731__auto___17819 + (1));
i__4731__auto___17819 = G__17820;
continue;
} else {
}
break;
}

var argseq__4752__auto__ = (new cljs.core.IndexedSeq(args_arr__4751__auto__.slice((5)),(0),null));
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__4752__auto__);

}
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1 = (function (a){
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
var s_17821 = (function (){var G__17812 = a;
if((!(typeof a === 'string'))){
return G__17812.toString();
} else {
return G__17812;
}
})();
var temp__5739__auto___17822 = cljs.compiler._STAR_source_map_data_STAR_;
if((temp__5739__auto___17822 == null)){
} else {
var sm_data_17823 = temp__5739__auto___17822;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(sm_data_17823,cljs.core.update,cljs.core.cst$kw$gen_DASH_col,((function (sm_data_17823,temp__5739__auto___17822,s_17821){
return (function (p1__17803_SHARP_){
return (p1__17803_SHARP_ + s_17821.length);
});})(sm_data_17823,temp__5739__auto___17822,s_17821))
);
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s_17821], 0));

}
}
}
}

return null;
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(e);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(e);

var seq__17813 = cljs.core.seq(xs);
var chunk__17814 = null;
var count__17815 = (0);
var i__17816 = (0);
while(true){
if((i__17816 < count__17815)){
var x = chunk__17814.cljs$core$IIndexed$_nth$arity$2(null,i__17816);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(x);


var G__17824 = seq__17813;
var G__17825 = chunk__17814;
var G__17826 = count__17815;
var G__17827 = (i__17816 + (1));
seq__17813 = G__17824;
chunk__17814 = G__17825;
count__17815 = G__17826;
i__17816 = G__17827;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__17813);
if(temp__5735__auto__){
var seq__17813__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__17813__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__17813__$1);
var G__17828 = cljs.core.chunk_rest(seq__17813__$1);
var G__17829 = c__4550__auto__;
var G__17830 = cljs.core.count(c__4550__auto__);
var G__17831 = (0);
seq__17813 = G__17828;
chunk__17814 = G__17829;
count__17815 = G__17830;
i__17816 = G__17831;
continue;
} else {
var x = cljs.core.first(seq__17813__$1);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(x);


var G__17832 = cljs.core.next(seq__17813__$1);
var G__17833 = null;
var G__17834 = (0);
var G__17835 = (0);
seq__17813 = G__17832;
chunk__17814 = G__17833;
count__17815 = G__17834;
i__17816 = G__17835;
continue;
}
} else {
return null;
}
}
break;
}
});

/** @this {Function} */
cljs.compiler.emits.cljs$lang$applyTo = (function (seq17805){
var G__17806 = cljs.core.first(seq17805);
var seq17805__$1 = cljs.core.next(seq17805);
var G__17807 = cljs.core.first(seq17805__$1);
var seq17805__$2 = cljs.core.next(seq17805__$1);
var G__17808 = cljs.core.first(seq17805__$2);
var seq17805__$3 = cljs.core.next(seq17805__$2);
var G__17809 = cljs.core.first(seq17805__$3);
var seq17805__$4 = cljs.core.next(seq17805__$3);
var G__17810 = cljs.core.first(seq17805__$4);
var seq17805__$5 = cljs.core.next(seq17805__$4);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__17806,G__17807,G__17808,G__17809,G__17810,seq17805__$5);
});

cljs.compiler.emits.cljs$lang$maxFixedArity = (5);

cljs.compiler._emitln = (function cljs$compiler$_emitln(){
cljs.core.newline.cljs$core$IFn$_invoke$arity$0();

if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,(function (p__17836){
var map__17837 = p__17836;
var map__17837__$1 = (((((!((map__17837 == null))))?(((((map__17837.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17837.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17837):map__17837);
var m = map__17837__$1;
var gen_line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17837__$1,cljs.core.cst$kw$gen_DASH_line);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,cljs.core.cst$kw$gen_DASH_line,(gen_line + (1)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$gen_DASH_col,(0)], 0));
}));
} else {
}

return null;
});
cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var G__17846 = arguments.length;
switch (G__17846) {
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
var len__4730__auto___17852 = arguments.length;
var i__4731__auto___17853 = (0);
while(true){
if((i__4731__auto___17853 < len__4730__auto___17852)){
args_arr__4751__auto__.push((arguments[i__4731__auto___17853]));

var G__17854 = (i__4731__auto___17853 + (1));
i__4731__auto___17853 = G__17854;
continue;
} else {
}
break;
}

var argseq__4752__auto__ = (new cljs.core.IndexedSeq(args_arr__4751__auto__.slice((5)),(0),null));
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__4752__auto__);

}
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.compiler._emitln();
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1 = (function (a){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

return cljs.compiler._emitln();
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

return cljs.compiler._emitln();
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

return cljs.compiler._emitln();
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

return cljs.compiler._emitln();
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(e);

return cljs.compiler._emitln();
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(e);

var seq__17847_17855 = cljs.core.seq(xs);
var chunk__17848_17856 = null;
var count__17849_17857 = (0);
var i__17850_17858 = (0);
while(true){
if((i__17850_17858 < count__17849_17857)){
var x_17859 = chunk__17848_17856.cljs$core$IIndexed$_nth$arity$2(null,i__17850_17858);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(x_17859);


var G__17860 = seq__17847_17855;
var G__17861 = chunk__17848_17856;
var G__17862 = count__17849_17857;
var G__17863 = (i__17850_17858 + (1));
seq__17847_17855 = G__17860;
chunk__17848_17856 = G__17861;
count__17849_17857 = G__17862;
i__17850_17858 = G__17863;
continue;
} else {
var temp__5735__auto___17864 = cljs.core.seq(seq__17847_17855);
if(temp__5735__auto___17864){
var seq__17847_17865__$1 = temp__5735__auto___17864;
if(cljs.core.chunked_seq_QMARK_(seq__17847_17865__$1)){
var c__4550__auto___17866 = cljs.core.chunk_first(seq__17847_17865__$1);
var G__17867 = cljs.core.chunk_rest(seq__17847_17865__$1);
var G__17868 = c__4550__auto___17866;
var G__17869 = cljs.core.count(c__4550__auto___17866);
var G__17870 = (0);
seq__17847_17855 = G__17867;
chunk__17848_17856 = G__17868;
count__17849_17857 = G__17869;
i__17850_17858 = G__17870;
continue;
} else {
var x_17871 = cljs.core.first(seq__17847_17865__$1);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(x_17871);


var G__17872 = cljs.core.next(seq__17847_17865__$1);
var G__17873 = null;
var G__17874 = (0);
var G__17875 = (0);
seq__17847_17855 = G__17872;
chunk__17848_17856 = G__17873;
count__17849_17857 = G__17874;
i__17850_17858 = G__17875;
continue;
}
} else {
}
}
break;
}

return cljs.compiler._emitln();
});

/** @this {Function} */
cljs.compiler.emitln.cljs$lang$applyTo = (function (seq17840){
var G__17841 = cljs.core.first(seq17840);
var seq17840__$1 = cljs.core.next(seq17840);
var G__17842 = cljs.core.first(seq17840__$1);
var seq17840__$2 = cljs.core.next(seq17840__$1);
var G__17843 = cljs.core.first(seq17840__$2);
var seq17840__$3 = cljs.core.next(seq17840__$2);
var G__17844 = cljs.core.first(seq17840__$3);
var seq17840__$4 = cljs.core.next(seq17840__$3);
var G__17845 = cljs.core.first(seq17840__$4);
var seq17840__$5 = cljs.core.next(seq17840__$4);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__17841,G__17842,G__17843,G__17844,G__17845,seq17840__$5);
});

cljs.compiler.emitln.cljs$lang$maxFixedArity = (5);

cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__4661__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__17876_17880 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__17877_17881 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__17878_17882 = true;
var _STAR_print_fn_STAR__temp_val__17879_17883 = ((function (_STAR_print_newline_STAR__orig_val__17876_17880,_STAR_print_fn_STAR__orig_val__17877_17881,_STAR_print_newline_STAR__temp_val__17878_17882,sb__4661__auto__){
return (function (x__4662__auto__){
return sb__4661__auto__.append(x__4662__auto__);
});})(_STAR_print_newline_STAR__orig_val__17876_17880,_STAR_print_fn_STAR__orig_val__17877_17881,_STAR_print_newline_STAR__temp_val__17878_17882,sb__4661__auto__))
;
cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__17878_17882;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__17879_17883;

try{cljs.compiler.emit(expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__17877_17881;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__17876_17880;
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4661__auto__);
});
if((typeof cljs !== 'undefined') && (typeof cljs.compiler !== 'undefined') && (typeof cljs.compiler.emit_constant_STAR_ !== 'undefined')){
} else {
cljs.compiler.emit_constant_STAR_ = (function (){var method_table__4613__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,(function (){var fexpr__17884 = cljs.core.get_global_hierarchy;
return (fexpr__17884.cljs$core$IFn$_invoke$arity$0 ? fexpr__17884.cljs$core$IFn$_invoke$arity$0() : fexpr__17884());
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
var vec__17885 = cljs.analyzer.record_ns_PLUS_name(x);
var ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17885,(0),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17885,(1),null);
var G__17888 = ns;
var G__17889 = name;
var G__17890 = ((function (G__17888,G__17889,vec__17885,ns,name){
return (function (){
var G__17891 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,x);
return (cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__17891) : cljs.compiler.emit_constant(G__17891));
});})(G__17888,G__17889,vec__17885,ns,name))
;
return (cljs.compiler.emit_record_value.cljs$core$IFn$_invoke$arity$3 ? cljs.compiler.emit_record_value.cljs$core$IFn$_invoke$arity$3(G__17888,G__17889,G__17890) : cljs.compiler.emit_record_value(G__17888,G__17889,G__17890));
} else {
if(cljs.analyzer.cljs_map_QMARK_(x)){
var G__17892 = cljs.core.keys(x);
var G__17893 = cljs.core.vals(x);
var G__17894 = cljs.compiler.emit_constants_comma_sep;
var G__17895 = cljs.compiler.all_distinct_QMARK_;
return (cljs.compiler.emit_map.cljs$core$IFn$_invoke$arity$4 ? cljs.compiler.emit_map.cljs$core$IFn$_invoke$arity$4(G__17892,G__17893,G__17894,G__17895) : cljs.compiler.emit_map(G__17892,G__17893,G__17894,G__17895));
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
var G__17896 = ((function (m){
return (function (){
return cljs.compiler.emit_constant_no_meta(v);
});})(m))
;
var G__17897 = ((function (G__17896,m){
return (function (){
return cljs.compiler.emit_constant_no_meta(m);
});})(G__17896,m))
;
return (cljs.compiler.emit_with_meta.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.emit_with_meta.cljs$core$IFn$_invoke$arity$2(G__17896,G__17897) : cljs.compiler.emit_with_meta(G__17896,G__17897));
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
var vec__17898 = cljs.core.re_find(/^(?:\(\?([idmsux]*)\))?(.*)/,cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17898,(0),null);
var flags = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17898,(1),null);
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17898,(2),null);
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
var temp__5733__auto__ = (function (){var and__4120__auto__ = cljs.core.cst$kw$emit_DASH_constants.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__4120__auto__)){
var G__17901 = cljs.core.cst$kw$cljs$analyzer_SLASH_constant_DASH_table.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__17901) : x(G__17901));
} else {
return and__4120__auto__;
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
var temp__5733__auto__ = (function (){var and__4120__auto__ = cljs.core.cst$kw$emit_DASH_constants.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__4120__auto__)){
var G__17902 = cljs.core.cst$kw$cljs$analyzer_SLASH_constant_DASH_table.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__17902) : x(G__17902));
} else {
return and__4120__auto__;
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
var G__17904 = items;
var G__17905 = ((function (G__17904,items){
return (function (p1__17903_SHARP_){
return ((function (G__17904,items){
return (function (){
return cljs.compiler.emit_constant(p1__17903_SHARP_);
});
;})(G__17904,items))
});})(G__17904,items))
;
return (cljs.compiler.emit_js_object.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.emit_js_object.cljs$core$IFn$_invoke$arity$2(G__17904,G__17905) : cljs.compiler.emit_js_object(G__17904,G__17905));
} else {
return (cljs.compiler.emit_js_array.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.emit_js_array.cljs$core$IFn$_invoke$arity$2(items,cljs.compiler.emit_constants_comma_sep) : cljs.compiler.emit_js_array(items,cljs.compiler.emit_constants_comma_sep));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$no_DASH_op,(function (m){
return null;
}));
cljs.compiler.emit_var = (function cljs$compiler$emit_var(p__17907){
var map__17908 = p__17907;
var map__17908__$1 = (((((!((map__17908 == null))))?(((((map__17908.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17908.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17908):map__17908);
var ast = map__17908__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17908__$1,cljs.core.cst$kw$info);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17908__$1,cljs.core.cst$kw$env);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17908__$1,cljs.core.cst$kw$form);
var temp__5733__auto__ = cljs.core.cst$kw$const_DASH_expr.cljs$core$IFn$_invoke$arity$1(ast);
if(cljs.core.truth_(temp__5733__auto__)){
var const_expr = temp__5733__auto__;
return cljs.compiler.emit(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(const_expr,cljs.core.cst$kw$env,env));
} else {
var map__17910 = cljs.core.deref(cljs.env._STAR_compiler_STAR_);
var map__17910__$1 = (((((!((map__17910 == null))))?(((((map__17910.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17910.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17910):map__17910);
var cenv = map__17910__$1;
var options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17910__$1,cljs.core.cst$kw$options);
var var_name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info);
var info__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(var_name),"js"))?(function (){var js_module_name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cenv,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$js_DASH_module_DASH_index,cljs.core.name(var_name),cljs.core.cst$kw$name], null));
var or__4131__auto__ = js_module_name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
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
var reserved = (function (){var G__17912 = cljs.compiler.js_reserved;
if(cljs.core.truth_((function (){var and__4120__auto__ = (function (){var G__17914 = cljs.core.cst$kw$language_DASH_out.cljs$core$IFn$_invoke$arity$1(options);
return (cljs.compiler.es5_GT__EQ_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.es5_GT__EQ_.cljs$core$IFn$_invoke$arity$1(G__17914) : cljs.compiler.es5_GT__EQ_(G__17914));
})();
if(cljs.core.truth_(and__4120__auto__)){
return (!((cljs.core.namespace(var_name) == null)));
} else {
return and__4120__auto__;
}
})())){
return clojure.set.difference.cljs$core$IFn$_invoke$arity$2(G__17912,cljs.analyzer.es5_allowed);
} else {
return G__17912;
}
})();
var js_module = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cenv,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$js_DASH_namespaces,(function (){var or__4131__auto__ = cljs.core.namespace(var_name);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.name(var_name);
}
})()], null));
var info__$2 = (function (){var G__17915 = info__$1;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(form,cljs.core.cst$sym$js_SLASH__DASH_Infinity)){
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(G__17915,reserved);
} else {
return G__17915;
}
})();
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

var G__17916_17917 = cljs.core.cst$kw$module_DASH_type.cljs$core$IFn$_invoke$arity$1(js_module);
var G__17916_17918__$1 = (((G__17916_17917 instanceof cljs.core.Keyword))?G__17916_17917.fqn:null);
switch (G__17916_17918__$1) {
case "commonjs":
if(cljs.core.truth_(cljs.core.namespace(var_name))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(var_name),reserved),"[\"default\"].",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(cljs.core.name(var_name),reserved));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(cljs.core.name(var_name),reserved),"[\"default\"]");
}

break;
case "es6":
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core.namespace(var_name);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("default",cljs.core.name(var_name));
} else {
return and__4120__auto__;
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

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$the_DASH_var,(function (p__17920){
var map__17921 = p__17920;
var map__17921__$1 = (((((!((map__17921 == null))))?(((((map__17921.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17921.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17921):map__17921);
var arg = map__17921__$1;
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17921__$1,cljs.core.cst$kw$env);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17921__$1,cljs.core.cst$kw$var);
var sym = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17921__$1,cljs.core.cst$kw$sym);
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17921__$1,cljs.core.cst$kw$meta);
if(cljs.analyzer.ast_QMARK_(sym)){
} else {
throw (new Error("Assert failed: (ana/ast? sym)"));
}

if(cljs.analyzer.ast_QMARK_(meta)){
} else {
throw (new Error("Assert failed: (ana/ast? meta)"));
}

var map__17923 = cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(var$);
var map__17923__$1 = (((((!((map__17923 == null))))?(((((map__17923.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17923.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17923):map__17923);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17923__$1,cljs.core.cst$kw$name);
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic("new cljs.core.Var(function(){return ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),";},",sym,",",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([meta,")"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_with_meta = (function cljs$compiler$emit_with_meta(expr,meta){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("cljs.core.with_meta(",expr,",",meta,")");
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$with_DASH_meta,(function (p__17925){
var map__17926 = p__17925;
var map__17926__$1 = (((((!((map__17926 == null))))?(((((map__17926.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17926.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17926):map__17926);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17926__$1,cljs.core.cst$kw$expr);
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17926__$1,cljs.core.cst$kw$meta);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17926__$1,cljs.core.cst$kw$env);
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_with_meta(expr,meta);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
var keys__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.unwrap_quote,keys);
return ((cljs.core.every_QMARK_(((function (keys__$1){
return (function (p1__17928_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(p1__17928_SHARP_),cljs.core.cst$kw$const);
});})(keys__$1))
,keys__$1)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,keys__$1)),cljs.core.count(keys__$1))));
});
cljs.compiler.emit_map = (function cljs$compiler$emit_map(keys,vals,comma_sep,distinct_keys_QMARK_){
if((cljs.core.count(keys) === (0))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("cljs.core.PersistentArrayMap.EMPTY");
} else {
if((cljs.core.count(keys) <= cljs.compiler.array_map_threshold)){
if(cljs.core.truth_((distinct_keys_QMARK_.cljs$core$IFn$_invoke$arity$1 ? distinct_keys_QMARK_.cljs$core$IFn$_invoke$arity$1(keys) : distinct_keys_QMARK_(keys)))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("new cljs.core.PersistentArrayMap(null, ",cljs.core.count(keys),", [",(function (){var G__17929 = cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(keys,vals);
return (comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(G__17929) : comma_sep(G__17929));
})(),"], null)");
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.PersistentArrayMap.createAsIfByAssoc([",(function (){var G__17930 = cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(keys,vals);
return (comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(G__17930) : comma_sep(G__17930));
})(),"])");
}
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("cljs.core.PersistentHashMap.fromArrays([",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(keys) : comma_sep(keys)),"],[",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(vals) : comma_sep(vals)),"])");

}
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$map,(function (p__17931){
var map__17932 = p__17931;
var map__17932__$1 = (((((!((map__17932 == null))))?(((((map__17932.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17932.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17932):map__17932);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17932__$1,cljs.core.cst$kw$env);
var keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17932__$1,cljs.core.cst$kw$keys);
var vals = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17932__$1,cljs.core.cst$kw$vals);
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_map(keys,vals,cljs.compiler.comma_sep,cljs.compiler.distinct_keys_QMARK_);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$vector,(function (p__17934){
var map__17935 = p__17934;
var map__17935__$1 = (((((!((map__17935 == null))))?(((((map__17935.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17935.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17935):map__17935);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17935__$1,cljs.core.cst$kw$items);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17935__$1,cljs.core.cst$kw$env);
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_vector(items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
var items__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.unwrap_quote,items);
return ((cljs.core.every_QMARK_(((function (items__$1){
return (function (p1__17937_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(p1__17937_SHARP_),cljs.core.cst$kw$const);
});})(items__$1))
,items__$1)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,items__$1)),cljs.core.count(items__$1))));
});
cljs.compiler.emit_set = (function cljs$compiler$emit_set(items,comma_sep,distinct_constants_QMARK_){
if(cljs.core.empty_QMARK_(items)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("cljs.core.PersistentHashSet.EMPTY");
} else {
if(cljs.core.truth_((distinct_constants_QMARK_.cljs$core$IFn$_invoke$arity$1 ? distinct_constants_QMARK_.cljs$core$IFn$_invoke$arity$1(items) : distinct_constants_QMARK_(items)))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, ",cljs.core.count(items),", [",(function (){var G__17938 = cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(items,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1("null"));
return (comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(G__17938) : comma_sep(G__17938));
})(),"], null), null)");
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.PersistentHashSet.createAsIfByAssoc([",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(items) : comma_sep(items)),"])");

}
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$set,(function (p__17939){
var map__17940 = p__17939;
var map__17940__$1 = (((((!((map__17940 == null))))?(((((map__17940.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17940.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17940):map__17940);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17940__$1,cljs.core.cst$kw$items);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17940__$1,cljs.core.cst$kw$env);
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_set(items,cljs.compiler.comma_sep,cljs.compiler.distinct_constants_QMARK_);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_js_object = (function cljs$compiler$emit_js_object(items,emit_js_object_val){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("({");

var temp__5735__auto___17964 = cljs.core.seq(items);
if(temp__5735__auto___17964){
var items_17965__$1 = temp__5735__auto___17964;
var vec__17942_17966 = items_17965__$1;
var seq__17943_17967 = cljs.core.seq(vec__17942_17966);
var first__17944_17968 = cljs.core.first(seq__17943_17967);
var seq__17943_17969__$1 = cljs.core.next(seq__17943_17967);
var vec__17945_17970 = first__17944_17968;
var k_17971 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17945_17970,(0),null);
var v_17972 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17945_17970,(1),null);
var r_17973 = seq__17943_17969__$1;
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4("\"",cljs.core.name(k_17971),"\": ",(emit_js_object_val.cljs$core$IFn$_invoke$arity$1 ? emit_js_object_val.cljs$core$IFn$_invoke$arity$1(v_17972) : emit_js_object_val(v_17972)));

var seq__17948_17974 = cljs.core.seq(r_17973);
var chunk__17949_17975 = null;
var count__17950_17976 = (0);
var i__17951_17977 = (0);
while(true){
if((i__17951_17977 < count__17950_17976)){
var vec__17958_17978 = chunk__17949_17975.cljs$core$IIndexed$_nth$arity$2(null,i__17951_17977);
var k_17979__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17958_17978,(0),null);
var v_17980__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17958_17978,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4(", \"",cljs.core.name(k_17979__$1),"\": ",(emit_js_object_val.cljs$core$IFn$_invoke$arity$1 ? emit_js_object_val.cljs$core$IFn$_invoke$arity$1(v_17980__$1) : emit_js_object_val(v_17980__$1)));


var G__17981 = seq__17948_17974;
var G__17982 = chunk__17949_17975;
var G__17983 = count__17950_17976;
var G__17984 = (i__17951_17977 + (1));
seq__17948_17974 = G__17981;
chunk__17949_17975 = G__17982;
count__17950_17976 = G__17983;
i__17951_17977 = G__17984;
continue;
} else {
var temp__5735__auto___17985__$1 = cljs.core.seq(seq__17948_17974);
if(temp__5735__auto___17985__$1){
var seq__17948_17986__$1 = temp__5735__auto___17985__$1;
if(cljs.core.chunked_seq_QMARK_(seq__17948_17986__$1)){
var c__4550__auto___17987 = cljs.core.chunk_first(seq__17948_17986__$1);
var G__17988 = cljs.core.chunk_rest(seq__17948_17986__$1);
var G__17989 = c__4550__auto___17987;
var G__17990 = cljs.core.count(c__4550__auto___17987);
var G__17991 = (0);
seq__17948_17974 = G__17988;
chunk__17949_17975 = G__17989;
count__17950_17976 = G__17990;
i__17951_17977 = G__17991;
continue;
} else {
var vec__17961_17992 = cljs.core.first(seq__17948_17986__$1);
var k_17993__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17961_17992,(0),null);
var v_17994__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17961_17992,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4(", \"",cljs.core.name(k_17993__$1),"\": ",(emit_js_object_val.cljs$core$IFn$_invoke$arity$1 ? emit_js_object_val.cljs$core$IFn$_invoke$arity$1(v_17994__$1) : emit_js_object_val(v_17994__$1)));


var G__17995 = cljs.core.next(seq__17948_17986__$1);
var G__17996 = null;
var G__17997 = (0);
var G__17998 = (0);
seq__17948_17974 = G__17995;
chunk__17949_17975 = G__17996;
count__17950_17976 = G__17997;
i__17951_17977 = G__17998;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$js_DASH_object,(function (p__17999){
var map__18000 = p__17999;
var map__18000__$1 = (((((!((map__18000 == null))))?(((((map__18000.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18000.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18000):map__18000);
var keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18000__$1,cljs.core.cst$kw$keys);
var vals = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18000__$1,cljs.core.cst$kw$vals);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18000__$1,cljs.core.cst$kw$env);
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_js_object(cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,keys,vals),cljs.core.identity);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$js_DASH_array,(function (p__18002){
var map__18003 = p__18002;
var map__18003__$1 = (((((!((map__18003 == null))))?(((((map__18003.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18003.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18003):map__18003);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18003__$1,cljs.core.cst$kw$items);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18003__$1,cljs.core.cst$kw$env);
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_js_array(items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_record_value = (function cljs$compiler$emit_record_value(ns,name,items){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(ns,".map__GT_",name,"(",items,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([")"], 0));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$quote,(function (p__18005){
var map__18006 = p__18005;
var map__18006__$1 = (((((!((map__18006 == null))))?(((((map__18006.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18006.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18006):map__18006);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18006__$1,cljs.core.cst$kw$expr);
return cljs.compiler.emit(expr);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$const,(function (p__18008){
var map__18009 = p__18008;
var map__18009__$1 = (((((!((map__18009 == null))))?(((((map__18009.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18009.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18009):map__18009);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18009__$1,cljs.core.cst$kw$form);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18009__$1,cljs.core.cst$kw$env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_constant(form);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(expr){
var map__18011 = cljs.analyzer.unwrap_quote(expr);
var map__18011__$1 = (((((!((map__18011 == null))))?(((((map__18011.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18011.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18011):map__18011);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18011__$1,cljs.core.cst$kw$op);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18011__$1,cljs.core.cst$kw$form);
var const_expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18011__$1,cljs.core.cst$kw$const_DASH_expr);
var or__4131__auto__ = (function (){var and__4120__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,cljs.core.cst$kw$const);
if(and__4120__auto__){
var and__4120__auto____$1 = form;
if(cljs.core.truth_(and__4120__auto____$1)){
return (!(((((typeof form === 'string') && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(form,"")))) || (((typeof form === 'number') && ((form === (0))))))));
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})();
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var and__4120__auto__ = (!((const_expr == null)));
if(and__4120__auto__){
return (cljs.compiler.truthy_constant_QMARK_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.truthy_constant_QMARK_.cljs$core$IFn$_invoke$arity$1(const_expr) : cljs.compiler.truthy_constant_QMARK_(const_expr));
} else {
return and__4120__auto__;
}
}
});
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(expr){
var map__18013 = cljs.analyzer.unwrap_quote(expr);
var map__18013__$1 = (((((!((map__18013 == null))))?(((((map__18013.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18013.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18013):map__18013);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18013__$1,cljs.core.cst$kw$op);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18013__$1,cljs.core.cst$kw$form);
var const_expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18013__$1,cljs.core.cst$kw$const_DASH_expr);
var or__4131__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,cljs.core.cst$kw$const)) && (((form === false) || ((form == null)))));
if(or__4131__auto__){
return or__4131__auto__;
} else {
var and__4120__auto__ = (!((const_expr == null)));
if(and__4120__auto__){
return (cljs.compiler.falsey_constant_QMARK_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.falsey_constant_QMARK_.cljs$core$IFn$_invoke$arity$1(const_expr) : cljs.compiler.falsey_constant_QMARK_(const_expr));
} else {
return and__4120__auto__;
}
}
});
cljs.compiler.safe_test_QMARK_ = (function cljs$compiler$safe_test_QMARK_(env,e){
var tag = cljs.analyzer.infer_tag(env,e);
var or__4131__auto__ = (function (){var fexpr__18016 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$seq,null,cljs.core.cst$sym$boolean,null], null), null);
return (fexpr__18016.cljs$core$IFn$_invoke$arity$1 ? fexpr__18016.cljs$core$IFn$_invoke$arity$1(tag) : fexpr__18016(tag));
})();
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.compiler.truthy_constant_QMARK_(e);
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$if,(function (p__18017){
var map__18018 = p__18017;
var map__18018__$1 = (((((!((map__18018 == null))))?(((((map__18018.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18018.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18018):map__18018);
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18018__$1,cljs.core.cst$kw$test);
var then = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18018__$1,cljs.core.cst$kw$then);
var else$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18018__$1,cljs.core.cst$kw$else);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18018__$1,cljs.core.cst$kw$env);
var unchecked = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18018__$1,cljs.core.cst$kw$unchecked);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
var checked = cljs.core.not((function (){var or__4131__auto__ = unchecked;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$case,(function (p__18020){
var map__18021 = p__18020;
var map__18021__$1 = (((((!((map__18021 == null))))?(((((map__18021.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18021.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18021):map__18021);
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18021__$1,cljs.core.cst$kw$test);
var nodes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18021__$1,cljs.core.cst$kw$nodes);
var default$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18021__$1,cljs.core.cst$kw$default);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18021__$1,cljs.core.cst$kw$env);
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

var seq__18023_18059 = cljs.core.seq(nodes);
var chunk__18024_18060 = null;
var count__18025_18061 = (0);
var i__18026_18062 = (0);
while(true){
if((i__18026_18062 < count__18025_18061)){
var map__18043_18063 = chunk__18024_18060.cljs$core$IIndexed$_nth$arity$2(null,i__18026_18062);
var map__18043_18064__$1 = (((((!((map__18043_18063 == null))))?(((((map__18043_18063.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18043_18063.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18043_18063):map__18043_18063);
var ts_18065 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18043_18064__$1,cljs.core.cst$kw$tests);
var map__18044_18066 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18043_18064__$1,cljs.core.cst$kw$then);
var map__18044_18067__$1 = (((((!((map__18044_18066 == null))))?(((((map__18044_18066.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18044_18066.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18044_18066):map__18044_18066);
var then_18068 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18044_18067__$1,cljs.core.cst$kw$then);
var seq__18047_18069 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$test,ts_18065));
var chunk__18048_18070 = null;
var count__18049_18071 = (0);
var i__18050_18072 = (0);
while(true){
if((i__18050_18072 < count__18049_18071)){
var test_18073 = chunk__18048_18070.cljs$core$IIndexed$_nth$arity$2(null,i__18050_18072);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",test_18073,":");


var G__18074 = seq__18047_18069;
var G__18075 = chunk__18048_18070;
var G__18076 = count__18049_18071;
var G__18077 = (i__18050_18072 + (1));
seq__18047_18069 = G__18074;
chunk__18048_18070 = G__18075;
count__18049_18071 = G__18076;
i__18050_18072 = G__18077;
continue;
} else {
var temp__5735__auto___18078 = cljs.core.seq(seq__18047_18069);
if(temp__5735__auto___18078){
var seq__18047_18079__$1 = temp__5735__auto___18078;
if(cljs.core.chunked_seq_QMARK_(seq__18047_18079__$1)){
var c__4550__auto___18080 = cljs.core.chunk_first(seq__18047_18079__$1);
var G__18081 = cljs.core.chunk_rest(seq__18047_18079__$1);
var G__18082 = c__4550__auto___18080;
var G__18083 = cljs.core.count(c__4550__auto___18080);
var G__18084 = (0);
seq__18047_18069 = G__18081;
chunk__18048_18070 = G__18082;
count__18049_18071 = G__18083;
i__18050_18072 = G__18084;
continue;
} else {
var test_18085 = cljs.core.first(seq__18047_18079__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",test_18085,":");


var G__18086 = cljs.core.next(seq__18047_18079__$1);
var G__18087 = null;
var G__18088 = (0);
var G__18089 = (0);
seq__18047_18069 = G__18086;
chunk__18048_18070 = G__18087;
count__18049_18071 = G__18088;
i__18050_18072 = G__18089;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(gs,"=",then_18068);
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(then_18068);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("break;");


var G__18090 = seq__18023_18059;
var G__18091 = chunk__18024_18060;
var G__18092 = count__18025_18061;
var G__18093 = (i__18026_18062 + (1));
seq__18023_18059 = G__18090;
chunk__18024_18060 = G__18091;
count__18025_18061 = G__18092;
i__18026_18062 = G__18093;
continue;
} else {
var temp__5735__auto___18094 = cljs.core.seq(seq__18023_18059);
if(temp__5735__auto___18094){
var seq__18023_18095__$1 = temp__5735__auto___18094;
if(cljs.core.chunked_seq_QMARK_(seq__18023_18095__$1)){
var c__4550__auto___18096 = cljs.core.chunk_first(seq__18023_18095__$1);
var G__18097 = cljs.core.chunk_rest(seq__18023_18095__$1);
var G__18098 = c__4550__auto___18096;
var G__18099 = cljs.core.count(c__4550__auto___18096);
var G__18100 = (0);
seq__18023_18059 = G__18097;
chunk__18024_18060 = G__18098;
count__18025_18061 = G__18099;
i__18026_18062 = G__18100;
continue;
} else {
var map__18051_18101 = cljs.core.first(seq__18023_18095__$1);
var map__18051_18102__$1 = (((((!((map__18051_18101 == null))))?(((((map__18051_18101.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18051_18101.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18051_18101):map__18051_18101);
var ts_18103 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18051_18102__$1,cljs.core.cst$kw$tests);
var map__18052_18104 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18051_18102__$1,cljs.core.cst$kw$then);
var map__18052_18105__$1 = (((((!((map__18052_18104 == null))))?(((((map__18052_18104.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18052_18104.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18052_18104):map__18052_18104);
var then_18106 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18052_18105__$1,cljs.core.cst$kw$then);
var seq__18055_18107 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$test,ts_18103));
var chunk__18056_18108 = null;
var count__18057_18109 = (0);
var i__18058_18110 = (0);
while(true){
if((i__18058_18110 < count__18057_18109)){
var test_18111 = chunk__18056_18108.cljs$core$IIndexed$_nth$arity$2(null,i__18058_18110);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",test_18111,":");


var G__18112 = seq__18055_18107;
var G__18113 = chunk__18056_18108;
var G__18114 = count__18057_18109;
var G__18115 = (i__18058_18110 + (1));
seq__18055_18107 = G__18112;
chunk__18056_18108 = G__18113;
count__18057_18109 = G__18114;
i__18058_18110 = G__18115;
continue;
} else {
var temp__5735__auto___18116__$1 = cljs.core.seq(seq__18055_18107);
if(temp__5735__auto___18116__$1){
var seq__18055_18117__$1 = temp__5735__auto___18116__$1;
if(cljs.core.chunked_seq_QMARK_(seq__18055_18117__$1)){
var c__4550__auto___18118 = cljs.core.chunk_first(seq__18055_18117__$1);
var G__18119 = cljs.core.chunk_rest(seq__18055_18117__$1);
var G__18120 = c__4550__auto___18118;
var G__18121 = cljs.core.count(c__4550__auto___18118);
var G__18122 = (0);
seq__18055_18107 = G__18119;
chunk__18056_18108 = G__18120;
count__18057_18109 = G__18121;
i__18058_18110 = G__18122;
continue;
} else {
var test_18123 = cljs.core.first(seq__18055_18117__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",test_18123,":");


var G__18124 = cljs.core.next(seq__18055_18117__$1);
var G__18125 = null;
var G__18126 = (0);
var G__18127 = (0);
seq__18055_18107 = G__18124;
chunk__18056_18108 = G__18125;
count__18057_18109 = G__18126;
i__18058_18110 = G__18127;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(gs,"=",then_18106);
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(then_18106);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("break;");


var G__18128 = cljs.core.next(seq__18023_18095__$1);
var G__18129 = null;
var G__18130 = (0);
var G__18131 = (0);
seq__18023_18059 = G__18128;
chunk__18024_18060 = G__18129;
count__18025_18061 = G__18130;
i__18026_18062 = G__18131;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$throw,(function (p__18132){
var map__18133 = p__18132;
var map__18133__$1 = (((((!((map__18133 == null))))?(((((map__18133.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18133.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18133):map__18133);
var throw$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18133__$1,cljs.core.cst$kw$exception);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18133__$1,cljs.core.cst$kw$env);
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
if(cljs.core.truth_(goog.string.startsWith(t,"!"))){
return ["!",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__18138 = env;
var G__18139 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(t,(1));
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(G__18138,G__18139) : cljs.compiler.resolve_type(G__18138,G__18139));
})())].join('');
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"{"))){
return t;
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"function"))){
var idx = t.lastIndexOf(":");
var vec__18140 = (((!(((-1) === idx))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(0),idx),cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(idx + (1)),cljs.core.count(t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18140,(0),null);
var rstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18140,(1),null);
var ret_t = (cljs.core.truth_(rstr)?(cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(env,rstr) : cljs.compiler.resolve_type(env,rstr)):null);
var axstr = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(fstr,(9),(cljs.core.count(fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_(axstr))?null:cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (idx,vec__18140,fstr,rstr,ret_t,axstr){
return (function (p1__18135_SHARP_){
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(env,p1__18135_SHARP_) : cljs.compiler.resolve_type(env,p1__18135_SHARP_));
});})(idx,vec__18140,fstr,rstr,ret_t,axstr))
,clojure.string.trim),clojure.string.split.cljs$core$IFn$_invoke$arity$2(axstr,/,/)));
var G__18143 = ["function(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",args_ts)),")"].join('');
if(cljs.core.truth_(ret_t)){
return [G__18143,":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ret_t)].join('');
} else {
return G__18143;
}
} else {
if(cljs.core.truth_(goog.string.endsWith(t,"="))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__18146 = env;
var G__18147 = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(0),(cljs.core.count(t) - (1)));
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(G__18146,G__18147) : cljs.compiler.resolve_type(G__18146,G__18147));
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
return ["{",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2("|",cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (ts__$1,xs){
return (function (p1__18148_SHARP_){
return cljs.compiler.resolve_type(env,p1__18148_SHARP_);
});})(ts__$1,xs))
,xs))),"}"].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find(/@param/,line))){
var vec__18149 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var seq__18150 = cljs.core.seq(vec__18149);
var first__18151 = cljs.core.first(seq__18150);
var seq__18150__$1 = cljs.core.next(seq__18150);
var p = first__18151;
var first__18151__$1 = cljs.core.first(seq__18150__$1);
var seq__18150__$2 = cljs.core.next(seq__18150__$1);
var ts = first__18151__$1;
var first__18151__$2 = cljs.core.first(seq__18150__$2);
var seq__18150__$3 = cljs.core.next(seq__18150__$2);
var n = first__18151__$2;
var xs = seq__18150__$3;
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@param",p);
if(and__4120__auto__){
var and__4120__auto____$1 = ts;
if(cljs.core.truth_(and__4120__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})())){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types(env,ts),cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(n)], null),xs));
} else {
return line;
}
} else {
if(cljs.core.truth_(cljs.core.re_find(/@return/,line))){
var vec__18152 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var seq__18153 = cljs.core.seq(vec__18152);
var first__18154 = cljs.core.first(seq__18153);
var seq__18153__$1 = cljs.core.next(seq__18153);
var p = first__18154;
var first__18154__$1 = cljs.core.first(seq__18153__$1);
var seq__18153__$2 = cljs.core.next(seq__18153__$1);
var ts = first__18154__$1;
var xs = seq__18153__$2;
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@return",p);
if(and__4120__auto__){
var and__4120__auto____$1 = ts;
if(cljs.core.truth_(and__4120__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})())){
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
var G__18156 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$options,cljs.core.cst$kw$closure_DASH_warnings,cljs.core.cst$kw$check_DASH_types], null));
var fexpr__18155 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$warning,null,cljs.core.cst$kw$error,null], null), null);
return (fexpr__18155.cljs$core$IFn$_invoke$arity$1 ? fexpr__18155.cljs$core$IFn$_invoke$arity$1(G__18156) : fexpr__18155(G__18156));
});
/**
 * Emit a nicely formatted comment string.
 */
cljs.compiler.emit_comment = (function cljs$compiler$emit_comment(var_args){
var G__18159 = arguments.length;
switch (G__18159) {
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

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2 = (function (doc,jsdoc){
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3(null,doc,jsdoc);
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3 = (function (env,doc,jsdoc){
var docs = (cljs.core.truth_(doc)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [doc], null):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = ((function (docs,docs__$1,docs__$2){
return (function cljs$compiler$print_comment_lines(e){
var vec__18167 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (docs,docs__$1,docs__$2){
return (function (p1__18157_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_())){
return cljs.compiler.munge_param_return(env,p1__18157_SHARP_);
} else {
return p1__18157_SHARP_;
}
});})(docs,docs__$1,docs__$2))
,clojure.string.split_lines(e));
var seq__18168 = cljs.core.seq(vec__18167);
var first__18169 = cljs.core.first(seq__18168);
var seq__18168__$1 = cljs.core.next(seq__18168);
var x = first__18169;
var ys = seq__18168__$1;
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(" * ",clojure.string.replace(x,"*/","* /"));

var seq__18170 = cljs.core.seq(ys);
var chunk__18171 = null;
var count__18172 = (0);
var i__18173 = (0);
while(true){
if((i__18173 < count__18172)){
var next_line = chunk__18171.cljs$core$IIndexed$_nth$arity$2(null,i__18173);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /"));


var G__18179 = seq__18170;
var G__18180 = chunk__18171;
var G__18181 = count__18172;
var G__18182 = (i__18173 + (1));
seq__18170 = G__18179;
chunk__18171 = G__18180;
count__18172 = G__18181;
i__18173 = G__18182;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__18170);
if(temp__5735__auto__){
var seq__18170__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18170__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__18170__$1);
var G__18183 = cljs.core.chunk_rest(seq__18170__$1);
var G__18184 = c__4550__auto__;
var G__18185 = cljs.core.count(c__4550__auto__);
var G__18186 = (0);
seq__18170 = G__18183;
chunk__18171 = G__18184;
count__18172 = G__18185;
i__18173 = G__18186;
continue;
} else {
var next_line = cljs.core.first(seq__18170__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /"));


var G__18187 = cljs.core.next(seq__18170__$1);
var G__18188 = null;
var G__18189 = (0);
var G__18190 = (0);
seq__18170 = G__18187;
chunk__18171 = G__18188;
count__18172 = G__18189;
i__18173 = G__18190;
continue;
}
} else {
return null;
}
}
break;
}
});})(docs,docs__$1,docs__$2))
;
if(cljs.core.seq(docs__$2)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("/**");

var seq__18174_18191 = cljs.core.seq(docs__$2);
var chunk__18175_18192 = null;
var count__18176_18193 = (0);
var i__18177_18194 = (0);
while(true){
if((i__18177_18194 < count__18176_18193)){
var e_18195 = chunk__18175_18192.cljs$core$IIndexed$_nth$arity$2(null,i__18177_18194);
if(cljs.core.truth_(e_18195)){
print_comment_lines(e_18195);
} else {
}


var G__18196 = seq__18174_18191;
var G__18197 = chunk__18175_18192;
var G__18198 = count__18176_18193;
var G__18199 = (i__18177_18194 + (1));
seq__18174_18191 = G__18196;
chunk__18175_18192 = G__18197;
count__18176_18193 = G__18198;
i__18177_18194 = G__18199;
continue;
} else {
var temp__5735__auto___18200 = cljs.core.seq(seq__18174_18191);
if(temp__5735__auto___18200){
var seq__18174_18201__$1 = temp__5735__auto___18200;
if(cljs.core.chunked_seq_QMARK_(seq__18174_18201__$1)){
var c__4550__auto___18202 = cljs.core.chunk_first(seq__18174_18201__$1);
var G__18203 = cljs.core.chunk_rest(seq__18174_18201__$1);
var G__18204 = c__4550__auto___18202;
var G__18205 = cljs.core.count(c__4550__auto___18202);
var G__18206 = (0);
seq__18174_18191 = G__18203;
chunk__18175_18192 = G__18204;
count__18176_18193 = G__18205;
i__18177_18194 = G__18206;
continue;
} else {
var e_18207 = cljs.core.first(seq__18174_18201__$1);
if(cljs.core.truth_(e_18207)){
print_comment_lines(e_18207);
} else {
}


var G__18208 = cljs.core.next(seq__18174_18201__$1);
var G__18209 = null;
var G__18210 = (0);
var G__18211 = (0);
seq__18174_18191 = G__18208;
chunk__18175_18192 = G__18209;
count__18176_18193 = G__18210;
i__18177_18194 = G__18211;
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
});

cljs.compiler.emit_comment.cljs$lang$maxFixedArity = 3;

cljs.compiler.valid_define_value_QMARK_ = (function cljs$compiler$valid_define_value_QMARK_(x){
return ((typeof x === 'string') || (x === true) || (x === false) || (typeof x === 'number'));
});
cljs.compiler.get_define = (function cljs$compiler$get_define(mname,jsdoc){
var opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),cljs.core.cst$kw$options);
var and__4120__auto__ = cljs.core.some(((function (opts){
return (function (p1__18213_SHARP_){
return goog.string.startsWith(p1__18213_SHARP_,"@define");
});})(opts))
,jsdoc);
if(cljs.core.truth_(and__4120__auto__)){
var and__4120__auto____$1 = opts;
if(cljs.core.truth_(and__4120__auto____$1)){
var and__4120__auto____$2 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$optimizations.cljs$core$IFn$_invoke$arity$1(opts),cljs.core.cst$kw$none);
if(and__4120__auto____$2){
var define = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$closure_DASH_defines,cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname)], null));
if(cljs.compiler.valid_define_value_QMARK_(define)){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([define], 0));
} else {
return null;
}
} else {
return and__4120__auto____$2;
}
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$def,(function (p__18214){
var map__18215 = p__18214;
var map__18215__$1 = (((((!((map__18215 == null))))?(((((map__18215.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18215.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18215):map__18215);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18215__$1,cljs.core.cst$kw$doc);
var jsdoc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18215__$1,cljs.core.cst$kw$jsdoc);
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18215__$1,cljs.core.cst$kw$test);
var init = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18215__$1,cljs.core.cst$kw$init);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18215__$1,cljs.core.cst$kw$name);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18215__$1,cljs.core.cst$kw$env);
var export$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18215__$1,cljs.core.cst$kw$export);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18215__$1,cljs.core.cst$kw$var);
var var_ast = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18215__$1,cljs.core.cst$kw$var_DASH_ast);
if(cljs.core.truth_((function (){var or__4131__auto__ = init;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.cst$kw$def_DASH_emits_DASH_var.cljs$core$IFn$_invoke$arity$1(env);
}
})())){
var mname = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name);
cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3(env,doc,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(jsdoc,cljs.core.cst$kw$jsdoc.cljs$core$IFn$_invoke$arity$1(init)));

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

if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.analyzer._STAR_load_tests_STAR_;
if(and__4120__auto__){
return test;
} else {
return and__4120__auto__;
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
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__18217){
var map__18218 = p__18217;
var map__18218__$1 = (((((!((map__18218 == null))))?(((((map__18218.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18218.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18218):map__18218);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18218__$1,cljs.core.cst$kw$name);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18218__$1,cljs.core.cst$kw$params);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18218__$1,cljs.core.cst$kw$env);
var arglist = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("arglist__");
var delegate_name = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name)),"__delegate"].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("(function (",arglist,"){");

var seq__18220_18244 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,cljs.core.drop_last.cljs$core$IFn$_invoke$arity$2((2),params)));
var chunk__18221_18245 = null;
var count__18222_18246 = (0);
var i__18223_18247 = (0);
while(true){
if((i__18223_18247 < count__18222_18246)){
var vec__18230_18248 = chunk__18221_18245.cljs$core$IIndexed$_nth$arity$2(null,i__18223_18247);
var i_18249 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18230_18248,(0),null);
var param_18250 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18230_18248,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(param_18250);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(" = cljs.core.first(");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(arglist,");");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(arglist," = cljs.core.next(",arglist,");");


var G__18251 = seq__18220_18244;
var G__18252 = chunk__18221_18245;
var G__18253 = count__18222_18246;
var G__18254 = (i__18223_18247 + (1));
seq__18220_18244 = G__18251;
chunk__18221_18245 = G__18252;
count__18222_18246 = G__18253;
i__18223_18247 = G__18254;
continue;
} else {
var temp__5735__auto___18255 = cljs.core.seq(seq__18220_18244);
if(temp__5735__auto___18255){
var seq__18220_18256__$1 = temp__5735__auto___18255;
if(cljs.core.chunked_seq_QMARK_(seq__18220_18256__$1)){
var c__4550__auto___18257 = cljs.core.chunk_first(seq__18220_18256__$1);
var G__18258 = cljs.core.chunk_rest(seq__18220_18256__$1);
var G__18259 = c__4550__auto___18257;
var G__18260 = cljs.core.count(c__4550__auto___18257);
var G__18261 = (0);
seq__18220_18244 = G__18258;
chunk__18221_18245 = G__18259;
count__18222_18246 = G__18260;
i__18223_18247 = G__18261;
continue;
} else {
var vec__18233_18262 = cljs.core.first(seq__18220_18256__$1);
var i_18263 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18233_18262,(0),null);
var param_18264 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18233_18262,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(param_18264);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(" = cljs.core.first(");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(arglist,");");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(arglist," = cljs.core.next(",arglist,");");


var G__18265 = cljs.core.next(seq__18220_18256__$1);
var G__18266 = null;
var G__18267 = (0);
var G__18268 = (0);
seq__18220_18244 = G__18265;
chunk__18221_18245 = G__18266;
count__18222_18246 = G__18267;
i__18223_18247 = G__18268;
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

var seq__18236_18269 = cljs.core.seq(params);
var chunk__18237_18270 = null;
var count__18238_18271 = (0);
var i__18239_18272 = (0);
while(true){
if((i__18239_18272 < count__18238_18271)){
var param_18273 = chunk__18237_18270.cljs$core$IIndexed$_nth$arity$2(null,i__18239_18272);
cljs.compiler.emit(param_18273);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18273,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18274 = seq__18236_18269;
var G__18275 = chunk__18237_18270;
var G__18276 = count__18238_18271;
var G__18277 = (i__18239_18272 + (1));
seq__18236_18269 = G__18274;
chunk__18237_18270 = G__18275;
count__18238_18271 = G__18276;
i__18239_18272 = G__18277;
continue;
} else {
var temp__5735__auto___18278 = cljs.core.seq(seq__18236_18269);
if(temp__5735__auto___18278){
var seq__18236_18279__$1 = temp__5735__auto___18278;
if(cljs.core.chunked_seq_QMARK_(seq__18236_18279__$1)){
var c__4550__auto___18280 = cljs.core.chunk_first(seq__18236_18279__$1);
var G__18281 = cljs.core.chunk_rest(seq__18236_18279__$1);
var G__18282 = c__4550__auto___18280;
var G__18283 = cljs.core.count(c__4550__auto___18280);
var G__18284 = (0);
seq__18236_18269 = G__18281;
chunk__18237_18270 = G__18282;
count__18238_18271 = G__18283;
i__18239_18272 = G__18284;
continue;
} else {
var param_18285 = cljs.core.first(seq__18236_18279__$1);
cljs.compiler.emit(param_18285);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18285,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18286 = cljs.core.next(seq__18236_18279__$1);
var G__18287 = null;
var G__18288 = (0);
var G__18289 = (0);
seq__18236_18269 = G__18286;
chunk__18237_18270 = G__18287;
count__18238_18271 = G__18288;
i__18239_18272 = G__18289;
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

var seq__18240_18290 = cljs.core.seq(params);
var chunk__18241_18291 = null;
var count__18242_18292 = (0);
var i__18243_18293 = (0);
while(true){
if((i__18243_18293 < count__18242_18292)){
var param_18294 = chunk__18241_18291.cljs$core$IIndexed$_nth$arity$2(null,i__18243_18293);
cljs.compiler.emit(param_18294);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18294,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18295 = seq__18240_18290;
var G__18296 = chunk__18241_18291;
var G__18297 = count__18242_18292;
var G__18298 = (i__18243_18293 + (1));
seq__18240_18290 = G__18295;
chunk__18241_18291 = G__18296;
count__18242_18292 = G__18297;
i__18243_18293 = G__18298;
continue;
} else {
var temp__5735__auto___18299 = cljs.core.seq(seq__18240_18290);
if(temp__5735__auto___18299){
var seq__18240_18300__$1 = temp__5735__auto___18299;
if(cljs.core.chunked_seq_QMARK_(seq__18240_18300__$1)){
var c__4550__auto___18301 = cljs.core.chunk_first(seq__18240_18300__$1);
var G__18302 = cljs.core.chunk_rest(seq__18240_18300__$1);
var G__18303 = c__4550__auto___18301;
var G__18304 = cljs.core.count(c__4550__auto___18301);
var G__18305 = (0);
seq__18240_18290 = G__18302;
chunk__18241_18291 = G__18303;
count__18242_18292 = G__18304;
i__18243_18293 = G__18305;
continue;
} else {
var param_18306 = cljs.core.first(seq__18240_18300__$1);
cljs.compiler.emit(param_18306);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18306,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18307 = cljs.core.next(seq__18240_18300__$1);
var G__18308 = null;
var G__18309 = (0);
var G__18310 = (0);
seq__18240_18290 = G__18307;
chunk__18241_18291 = G__18308;
count__18242_18292 = G__18309;
i__18243_18293 = G__18310;
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
var seq__18311 = cljs.core.seq(params);
var chunk__18312 = null;
var count__18313 = (0);
var i__18314 = (0);
while(true){
if((i__18314 < count__18313)){
var param = chunk__18312.cljs$core$IIndexed$_nth$arity$2(null,i__18314);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18315 = seq__18311;
var G__18316 = chunk__18312;
var G__18317 = count__18313;
var G__18318 = (i__18314 + (1));
seq__18311 = G__18315;
chunk__18312 = G__18316;
count__18313 = G__18317;
i__18314 = G__18318;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__18311);
if(temp__5735__auto__){
var seq__18311__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18311__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__18311__$1);
var G__18319 = cljs.core.chunk_rest(seq__18311__$1);
var G__18320 = c__4550__auto__;
var G__18321 = cljs.core.count(c__4550__auto__);
var G__18322 = (0);
seq__18311 = G__18319;
chunk__18312 = G__18320;
count__18313 = G__18321;
i__18314 = G__18322;
continue;
} else {
var param = cljs.core.first(seq__18311__$1);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18323 = cljs.core.next(seq__18311__$1);
var G__18324 = null;
var G__18325 = (0);
var G__18326 = (0);
seq__18311 = G__18323;
chunk__18312 = G__18324;
count__18313 = G__18325;
i__18314 = G__18326;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__18327){
var map__18328 = p__18327;
var map__18328__$1 = (((((!((map__18328 == null))))?(((((map__18328.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18328.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18328):map__18328);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18328__$1,cljs.core.cst$kw$body);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18328__$1,cljs.core.cst$kw$type);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18328__$1,cljs.core.cst$kw$name);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18328__$1,cljs.core.cst$kw$params);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18328__$1,cljs.core.cst$kw$env);
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18328__$1,cljs.core.cst$kw$recurs);
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
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

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
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
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__18330){
var map__18331 = p__18330;
var map__18331__$1 = (((((!((map__18331 == null))))?(((((map__18331.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18331.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18331):map__18331);
var f = map__18331__$1;
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18331__$1,cljs.core.cst$kw$body);
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18331__$1,cljs.core.cst$kw$fixed_DASH_arity);
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18331__$1,cljs.core.cst$kw$variadic_QMARK_);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18331__$1,cljs.core.cst$kw$type);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18331__$1,cljs.core.cst$kw$name);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18331__$1,cljs.core.cst$kw$params);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18331__$1,cljs.core.cst$kw$env);
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18331__$1,cljs.core.cst$kw$recurs);
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

var name_18341__$1 = (function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_18342 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_18341__$1);
var delegate_name_18343 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_18342),"__delegate"].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("(function() { ");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("var ",delegate_name_18343," = function (");

var seq__18333_18344 = cljs.core.seq(params);
var chunk__18334_18345 = null;
var count__18335_18346 = (0);
var i__18336_18347 = (0);
while(true){
if((i__18336_18347 < count__18335_18346)){
var param_18348 = chunk__18334_18345.cljs$core$IIndexed$_nth$arity$2(null,i__18336_18347);
cljs.compiler.emit(param_18348);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18348,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18349 = seq__18333_18344;
var G__18350 = chunk__18334_18345;
var G__18351 = count__18335_18346;
var G__18352 = (i__18336_18347 + (1));
seq__18333_18344 = G__18349;
chunk__18334_18345 = G__18350;
count__18335_18346 = G__18351;
i__18336_18347 = G__18352;
continue;
} else {
var temp__5735__auto___18353 = cljs.core.seq(seq__18333_18344);
if(temp__5735__auto___18353){
var seq__18333_18354__$1 = temp__5735__auto___18353;
if(cljs.core.chunked_seq_QMARK_(seq__18333_18354__$1)){
var c__4550__auto___18355 = cljs.core.chunk_first(seq__18333_18354__$1);
var G__18356 = cljs.core.chunk_rest(seq__18333_18354__$1);
var G__18357 = c__4550__auto___18355;
var G__18358 = cljs.core.count(c__4550__auto___18355);
var G__18359 = (0);
seq__18333_18344 = G__18356;
chunk__18334_18345 = G__18357;
count__18335_18346 = G__18358;
i__18336_18347 = G__18359;
continue;
} else {
var param_18360 = cljs.core.first(seq__18333_18354__$1);
cljs.compiler.emit(param_18360);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18360,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18361 = cljs.core.next(seq__18333_18354__$1);
var G__18362 = null;
var G__18363 = (0);
var G__18364 = (0);
seq__18333_18344 = G__18361;
chunk__18334_18345 = G__18362;
count__18335_18346 = G__18363;
i__18336_18347 = G__18364;
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

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("var ",mname_18342," = function (",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$var_args], null)):params)),"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("var self__ = this;");
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(" = null;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if (arguments.length > ",(cljs.core.count(params) - (1)),") {");

var a_18365 = cljs.compiler.emit_arguments_to_array((cljs.core.count(params) - (1)));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("  ",cljs.core.last(params)," = new cljs.core.IndexedSeq(",a_18365,",0,null);");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("} ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("return ",delegate_name_18343,".call(this,");

var seq__18337_18366 = cljs.core.seq(params);
var chunk__18338_18367 = null;
var count__18339_18368 = (0);
var i__18340_18369 = (0);
while(true){
if((i__18340_18369 < count__18339_18368)){
var param_18370 = chunk__18338_18367.cljs$core$IIndexed$_nth$arity$2(null,i__18340_18369);
cljs.compiler.emit(param_18370);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18370,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18371 = seq__18337_18366;
var G__18372 = chunk__18338_18367;
var G__18373 = count__18339_18368;
var G__18374 = (i__18340_18369 + (1));
seq__18337_18366 = G__18371;
chunk__18338_18367 = G__18372;
count__18339_18368 = G__18373;
i__18340_18369 = G__18374;
continue;
} else {
var temp__5735__auto___18375 = cljs.core.seq(seq__18337_18366);
if(temp__5735__auto___18375){
var seq__18337_18376__$1 = temp__5735__auto___18375;
if(cljs.core.chunked_seq_QMARK_(seq__18337_18376__$1)){
var c__4550__auto___18377 = cljs.core.chunk_first(seq__18337_18376__$1);
var G__18378 = cljs.core.chunk_rest(seq__18337_18376__$1);
var G__18379 = c__4550__auto___18377;
var G__18380 = cljs.core.count(c__4550__auto___18377);
var G__18381 = (0);
seq__18337_18366 = G__18378;
chunk__18338_18367 = G__18379;
count__18339_18368 = G__18380;
i__18340_18369 = G__18381;
continue;
} else {
var param_18382 = cljs.core.first(seq__18337_18376__$1);
cljs.compiler.emit(param_18382);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_18382,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__18383 = cljs.core.next(seq__18337_18376__$1);
var G__18384 = null;
var G__18385 = (0);
var G__18386 = (0);
seq__18337_18366 = G__18383;
chunk__18338_18367 = G__18384;
count__18339_18368 = G__18385;
i__18340_18369 = G__18386;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(");");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("};");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18342,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2(mname_18342,".cljs$lang$applyTo = ");

cljs.compiler.emit_apply_to(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(f,cljs.core.cst$kw$name,name_18341__$1));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18342,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_18343,";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("return ",mname_18342,";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("})()");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$fn,(function (p__18390){
var map__18391 = p__18390;
var map__18391__$1 = (((((!((map__18391 == null))))?(((((map__18391.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18391.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18391):map__18391);
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18391__$1,cljs.core.cst$kw$variadic_QMARK_);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18391__$1,cljs.core.cst$kw$name);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18391__$1,cljs.core.cst$kw$env);
var methods$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18391__$1,cljs.core.cst$kw$methods);
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18391__$1,cljs.core.cst$kw$max_DASH_fixed_DASH_arity);
var recur_frames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18391__$1,cljs.core.cst$kw$recur_DASH_frames);
var loop_lets = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18391__$1,cljs.core.cst$kw$loop_DASH_lets);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var loop_locals = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$params,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (map__18391,map__18391__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (p1__18387_SHARP_){
var and__4120__auto__ = p1__18387_SHARP_;
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.deref(cljs.core.cst$kw$flag.cljs$core$IFn$_invoke$arity$1(p1__18387_SHARP_));
} else {
return and__4120__auto__;
}
});})(map__18391,map__18391__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,recur_frames)], 0)),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$params,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([loop_lets], 0)))));
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
var name_18444__$1 = (function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_18445 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_18444__$1);
var maxparams_18446 = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,cljs.core.count,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$params,methods$));
var mmap_18447 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (name_18444__$1,mname_18445,maxparams_18446,loop_locals,map__18391,map__18391__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_18445),"__",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
});})(name_18444__$1,mname_18445,maxparams_18446,loop_locals,map__18391,map__18391__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,methods$));
var ms_18448 = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(((function (name_18444__$1,mname_18445,maxparams_18446,mmap_18447,loop_locals,map__18391,map__18391__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (p1__18388_SHARP_){
return cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__18388_SHARP_)));
});})(name_18444__$1,mname_18445,maxparams_18446,mmap_18447,loop_locals,map__18391,map__18391__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,cljs.core.seq(mmap_18447));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("(function() {");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",mname_18445," = null;");

var seq__18393_18449 = cljs.core.seq(ms_18448);
var chunk__18394_18450 = null;
var count__18395_18451 = (0);
var i__18396_18452 = (0);
while(true){
if((i__18396_18452 < count__18395_18451)){
var vec__18403_18453 = chunk__18394_18450.cljs$core$IIndexed$_nth$arity$2(null,i__18396_18452);
var n_18454 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18403_18453,(0),null);
var meth_18455 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18403_18453,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("var ",n_18454," = ");

if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(meth_18455))){
cljs.compiler.emit_variadic_fn_method(meth_18455);
} else {
cljs.compiler.emit_fn_method(meth_18455);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");


var G__18456 = seq__18393_18449;
var G__18457 = chunk__18394_18450;
var G__18458 = count__18395_18451;
var G__18459 = (i__18396_18452 + (1));
seq__18393_18449 = G__18456;
chunk__18394_18450 = G__18457;
count__18395_18451 = G__18458;
i__18396_18452 = G__18459;
continue;
} else {
var temp__5735__auto___18460 = cljs.core.seq(seq__18393_18449);
if(temp__5735__auto___18460){
var seq__18393_18461__$1 = temp__5735__auto___18460;
if(cljs.core.chunked_seq_QMARK_(seq__18393_18461__$1)){
var c__4550__auto___18462 = cljs.core.chunk_first(seq__18393_18461__$1);
var G__18463 = cljs.core.chunk_rest(seq__18393_18461__$1);
var G__18464 = c__4550__auto___18462;
var G__18465 = cljs.core.count(c__4550__auto___18462);
var G__18466 = (0);
seq__18393_18449 = G__18463;
chunk__18394_18450 = G__18464;
count__18395_18451 = G__18465;
i__18396_18452 = G__18466;
continue;
} else {
var vec__18406_18467 = cljs.core.first(seq__18393_18461__$1);
var n_18468 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18406_18467,(0),null);
var meth_18469 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18406_18467,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("var ",n_18468," = ");

if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(meth_18469))){
cljs.compiler.emit_variadic_fn_method(meth_18469);
} else {
cljs.compiler.emit_fn_method(meth_18469);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");


var G__18470 = cljs.core.next(seq__18393_18461__$1);
var G__18471 = null;
var G__18472 = (0);
var G__18473 = (0);
seq__18393_18449 = G__18470;
chunk__18394_18450 = G__18471;
count__18395_18451 = G__18472;
i__18396_18452 = G__18473;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18445," = function(",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(maxparams_18446),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$var_args], null)):maxparams_18446)),"){");

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(cljs.core.last(maxparams_18446));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(" = var_args;");
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("switch(arguments.length){");

var seq__18409_18474 = cljs.core.seq(ms_18448);
var chunk__18410_18475 = null;
var count__18411_18476 = (0);
var i__18412_18477 = (0);
while(true){
if((i__18412_18477 < count__18411_18476)){
var vec__18419_18478 = chunk__18410_18475.cljs$core$IIndexed$_nth$arity$2(null,i__18412_18477);
var n_18479 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18419_18478,(0),null);
var meth_18480 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18419_18478,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(meth_18480))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("default:");

var restarg_18481 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",restarg_18481," = null;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if (arguments.length > ",max_fixed_arity,") {");

var a_18482 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(restarg_18481," = new cljs.core.IndexedSeq(",a_18482,",0,null);");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic("return ",n_18479,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_18446)),(((cljs.core.count(maxparams_18446) > (1)))?", ":null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([restarg_18481,");"], 0));
} else {
var pcnt_18483 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_18480));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",pcnt_18483,":");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("return ",n_18479,".call(this",(((pcnt_18483 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_18483,maxparams_18446)),null,(1),null)),(2),null))),");");
}


var G__18484 = seq__18409_18474;
var G__18485 = chunk__18410_18475;
var G__18486 = count__18411_18476;
var G__18487 = (i__18412_18477 + (1));
seq__18409_18474 = G__18484;
chunk__18410_18475 = G__18485;
count__18411_18476 = G__18486;
i__18412_18477 = G__18487;
continue;
} else {
var temp__5735__auto___18488 = cljs.core.seq(seq__18409_18474);
if(temp__5735__auto___18488){
var seq__18409_18489__$1 = temp__5735__auto___18488;
if(cljs.core.chunked_seq_QMARK_(seq__18409_18489__$1)){
var c__4550__auto___18490 = cljs.core.chunk_first(seq__18409_18489__$1);
var G__18491 = cljs.core.chunk_rest(seq__18409_18489__$1);
var G__18492 = c__4550__auto___18490;
var G__18493 = cljs.core.count(c__4550__auto___18490);
var G__18494 = (0);
seq__18409_18474 = G__18491;
chunk__18410_18475 = G__18492;
count__18411_18476 = G__18493;
i__18412_18477 = G__18494;
continue;
} else {
var vec__18422_18495 = cljs.core.first(seq__18409_18489__$1);
var n_18496 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18422_18495,(0),null);
var meth_18497 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18422_18495,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(meth_18497))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("default:");

var restarg_18498 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",restarg_18498," = null;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if (arguments.length > ",max_fixed_arity,") {");

var a_18499 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(restarg_18498," = new cljs.core.IndexedSeq(",a_18499,",0,null);");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic("return ",n_18496,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_18446)),(((cljs.core.count(maxparams_18446) > (1)))?", ":null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([restarg_18498,");"], 0));
} else {
var pcnt_18500 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_18497));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",pcnt_18500,":");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("return ",n_18496,".call(this",(((pcnt_18500 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_18500,maxparams_18446)),null,(1),null)),(2),null))),");");
}


var G__18501 = cljs.core.next(seq__18409_18489__$1);
var G__18502 = null;
var G__18503 = (0);
var G__18504 = (0);
seq__18409_18474 = G__18501;
chunk__18410_18475 = G__18502;
count__18411_18476 = G__18503;
i__18412_18477 = G__18504;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");

var arg_count_js_18505 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$self__,cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.first(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(cljs.core.val(cljs.core.first(ms_18448)))))))?"(arguments.length - 1)":"arguments.length");
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("throw(new Error('Invalid arity: ' + ",arg_count_js_18505,"));");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("};");

if(cljs.core.truth_(variadic)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18445,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18445,".cljs$lang$applyTo = ",cljs.core.some(((function (name_18444__$1,mname_18445,maxparams_18446,mmap_18447,ms_18448,loop_locals,map__18391,map__18391__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (p1__18389_SHARP_){
var vec__18425 = p1__18389_SHARP_;
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18425,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18425,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
});})(name_18444__$1,mname_18445,maxparams_18446,mmap_18447,ms_18448,loop_locals,map__18391,map__18391__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,ms_18448),".cljs$lang$applyTo;");
} else {
}

var seq__18428_18506 = cljs.core.seq(ms_18448);
var chunk__18429_18507 = null;
var count__18430_18508 = (0);
var i__18431_18509 = (0);
while(true){
if((i__18431_18509 < count__18430_18508)){
var vec__18438_18510 = chunk__18429_18507.cljs$core$IIndexed$_nth$arity$2(null,i__18431_18509);
var n_18511 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18438_18510,(0),null);
var meth_18512 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18438_18510,(1),null);
var c_18513 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_18512));
if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(meth_18512))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18445,".cljs$core$IFn$_invoke$arity$variadic = ",n_18511,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(mname_18445,".cljs$core$IFn$_invoke$arity$",c_18513," = ",n_18511,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([";"], 0));
}


var G__18514 = seq__18428_18506;
var G__18515 = chunk__18429_18507;
var G__18516 = count__18430_18508;
var G__18517 = (i__18431_18509 + (1));
seq__18428_18506 = G__18514;
chunk__18429_18507 = G__18515;
count__18430_18508 = G__18516;
i__18431_18509 = G__18517;
continue;
} else {
var temp__5735__auto___18518 = cljs.core.seq(seq__18428_18506);
if(temp__5735__auto___18518){
var seq__18428_18519__$1 = temp__5735__auto___18518;
if(cljs.core.chunked_seq_QMARK_(seq__18428_18519__$1)){
var c__4550__auto___18520 = cljs.core.chunk_first(seq__18428_18519__$1);
var G__18521 = cljs.core.chunk_rest(seq__18428_18519__$1);
var G__18522 = c__4550__auto___18520;
var G__18523 = cljs.core.count(c__4550__auto___18520);
var G__18524 = (0);
seq__18428_18506 = G__18521;
chunk__18429_18507 = G__18522;
count__18430_18508 = G__18523;
i__18431_18509 = G__18524;
continue;
} else {
var vec__18441_18525 = cljs.core.first(seq__18428_18519__$1);
var n_18526 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18441_18525,(0),null);
var meth_18527 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18441_18525,(1),null);
var c_18528 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_18527));
if(cljs.core.truth_(cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(meth_18527))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_18445,".cljs$core$IFn$_invoke$arity$variadic = ",n_18526,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(mname_18445,".cljs$core$IFn$_invoke$arity$",c_18528," = ",n_18526,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([";"], 0));
}


var G__18529 = cljs.core.next(seq__18428_18519__$1);
var G__18530 = null;
var G__18531 = (0);
var G__18532 = (0);
seq__18428_18506 = G__18529;
chunk__18429_18507 = G__18530;
count__18430_18508 = G__18531;
i__18431_18509 = G__18532;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("return ",mname_18445,";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("})()");
}

if(loop_locals){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(";})(",cljs.compiler.comma_sep(loop_locals),"))");
} else {
return null;
}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$do,(function (p__18533){
var map__18534 = p__18533;
var map__18534__$1 = (((((!((map__18534 == null))))?(((((map__18534.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18534.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18534):map__18534);
var statements = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18534__$1,cljs.core.cst$kw$statements);
var ret = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18534__$1,cljs.core.cst$kw$ret);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18534__$1,cljs.core.cst$kw$env);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(((cljs.core.seq(statements)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("(function (){");
} else {
}

var seq__18536_18540 = cljs.core.seq(statements);
var chunk__18537_18541 = null;
var count__18538_18542 = (0);
var i__18539_18543 = (0);
while(true){
if((i__18539_18543 < count__18538_18542)){
var s_18544 = chunk__18537_18541.cljs$core$IIndexed$_nth$arity$2(null,i__18539_18543);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(s_18544);


var G__18545 = seq__18536_18540;
var G__18546 = chunk__18537_18541;
var G__18547 = count__18538_18542;
var G__18548 = (i__18539_18543 + (1));
seq__18536_18540 = G__18545;
chunk__18537_18541 = G__18546;
count__18538_18542 = G__18547;
i__18539_18543 = G__18548;
continue;
} else {
var temp__5735__auto___18549 = cljs.core.seq(seq__18536_18540);
if(temp__5735__auto___18549){
var seq__18536_18550__$1 = temp__5735__auto___18549;
if(cljs.core.chunked_seq_QMARK_(seq__18536_18550__$1)){
var c__4550__auto___18551 = cljs.core.chunk_first(seq__18536_18550__$1);
var G__18552 = cljs.core.chunk_rest(seq__18536_18550__$1);
var G__18553 = c__4550__auto___18551;
var G__18554 = cljs.core.count(c__4550__auto___18551);
var G__18555 = (0);
seq__18536_18540 = G__18552;
chunk__18537_18541 = G__18553;
count__18538_18542 = G__18554;
i__18539_18543 = G__18555;
continue;
} else {
var s_18556 = cljs.core.first(seq__18536_18550__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(s_18556);


var G__18557 = cljs.core.next(seq__18536_18550__$1);
var G__18558 = null;
var G__18559 = (0);
var G__18560 = (0);
seq__18536_18540 = G__18557;
chunk__18537_18541 = G__18558;
count__18538_18542 = G__18559;
i__18539_18543 = G__18560;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$try,(function (p__18561){
var map__18562 = p__18561;
var map__18562__$1 = (((((!((map__18562 == null))))?(((((map__18562.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18562.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18562):map__18562);
var try$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18562__$1,cljs.core.cst$kw$body);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18562__$1,cljs.core.cst$kw$env);
var catch$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18562__$1,cljs.core.cst$kw$catch);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18562__$1,cljs.core.cst$kw$name);
var finally$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18562__$1,cljs.core.cst$kw$finally);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
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
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__18564,is_loop){
var map__18565 = p__18564;
var map__18565__$1 = (((((!((map__18565 == null))))?(((((map__18565.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18565.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18565):map__18565);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18565__$1,cljs.core.cst$kw$body);
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18565__$1,cljs.core.cst$kw$bindings);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18565__$1,cljs.core.cst$kw$env);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("(function (){");
} else {
}

var _STAR_lexical_renames_STAR__orig_val__18567_18581 = cljs.compiler._STAR_lexical_renames_STAR_;
var _STAR_lexical_renames_STAR__temp_val__18568_18582 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,context))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (_STAR_lexical_renames_STAR__orig_val__18567_18581,context,map__18565,map__18565__$1,expr,bindings,env){
return (function (binding){
var name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope(binding),cljs.core.gensym.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"-"].join(''))],null));
});})(_STAR_lexical_renames_STAR__orig_val__18567_18581,context,map__18565,map__18565__$1,expr,bindings,env))
,bindings):null));
cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__temp_val__18568_18582;

try{var seq__18569_18583 = cljs.core.seq(bindings);
var chunk__18570_18584 = null;
var count__18571_18585 = (0);
var i__18572_18586 = (0);
while(true){
if((i__18572_18586 < count__18571_18585)){
var map__18577_18587 = chunk__18570_18584.cljs$core$IIndexed$_nth$arity$2(null,i__18572_18586);
var map__18577_18588__$1 = (((((!((map__18577_18587 == null))))?(((((map__18577_18587.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18577_18587.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18577_18587):map__18577_18587);
var binding_18589 = map__18577_18588__$1;
var init_18590 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18577_18588__$1,cljs.core.cst$kw$init);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(binding_18589);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" = ",init_18590,";");


var G__18591 = seq__18569_18583;
var G__18592 = chunk__18570_18584;
var G__18593 = count__18571_18585;
var G__18594 = (i__18572_18586 + (1));
seq__18569_18583 = G__18591;
chunk__18570_18584 = G__18592;
count__18571_18585 = G__18593;
i__18572_18586 = G__18594;
continue;
} else {
var temp__5735__auto___18595 = cljs.core.seq(seq__18569_18583);
if(temp__5735__auto___18595){
var seq__18569_18596__$1 = temp__5735__auto___18595;
if(cljs.core.chunked_seq_QMARK_(seq__18569_18596__$1)){
var c__4550__auto___18597 = cljs.core.chunk_first(seq__18569_18596__$1);
var G__18598 = cljs.core.chunk_rest(seq__18569_18596__$1);
var G__18599 = c__4550__auto___18597;
var G__18600 = cljs.core.count(c__4550__auto___18597);
var G__18601 = (0);
seq__18569_18583 = G__18598;
chunk__18570_18584 = G__18599;
count__18571_18585 = G__18600;
i__18572_18586 = G__18601;
continue;
} else {
var map__18579_18602 = cljs.core.first(seq__18569_18596__$1);
var map__18579_18603__$1 = (((((!((map__18579_18602 == null))))?(((((map__18579_18602.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18579_18602.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18579_18602):map__18579_18602);
var binding_18604 = map__18579_18603__$1;
var init_18605 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18579_18603__$1,cljs.core.cst$kw$init);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(binding_18604);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" = ",init_18605,";");


var G__18606 = cljs.core.next(seq__18569_18596__$1);
var G__18607 = null;
var G__18608 = (0);
var G__18609 = (0);
seq__18569_18583 = G__18606;
chunk__18570_18584 = G__18607;
count__18571_18585 = G__18608;
i__18572_18586 = G__18609;
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
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__orig_val__18567_18581;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$recur,(function (p__18610){
var map__18611 = p__18610;
var map__18611__$1 = (((((!((map__18611 == null))))?(((((map__18611.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18611.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18611):map__18611);
var frame = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18611__$1,cljs.core.cst$kw$frame);
var exprs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18611__$1,cljs.core.cst$kw$exprs);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18611__$1,cljs.core.cst$kw$env);
var temps = cljs.core.vec(cljs.core.take.cljs$core$IFn$_invoke$arity$2(cljs.core.count(exprs),cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym)));
var params = cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(frame);
var n__4607__auto___18613 = cljs.core.count(exprs);
var i_18614 = (0);
while(true){
if((i_18614 < n__4607__auto___18613)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("var ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_18614) : temps(i_18614))," = ",(exprs.cljs$core$IFn$_invoke$arity$1 ? exprs.cljs$core$IFn$_invoke$arity$1(i_18614) : exprs(i_18614)),";");

var G__18615 = (i_18614 + (1));
i_18614 = G__18615;
continue;
} else {
}
break;
}

var n__4607__auto___18616 = cljs.core.count(exprs);
var i_18617 = (0);
while(true){
if((i_18617 < n__4607__auto___18616)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((params.cljs$core$IFn$_invoke$arity$1 ? params.cljs$core$IFn$_invoke$arity$1(i_18617) : params(i_18617)))," = ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_18617) : temps(i_18617)),";");

var G__18618 = (i_18617 + (1));
i_18617 = G__18618;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("continue;");
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$letfn,(function (p__18619){
var map__18620 = p__18619;
var map__18620__$1 = (((((!((map__18620 == null))))?(((((map__18620.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18620.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18620):map__18620);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18620__$1,cljs.core.cst$kw$body);
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18620__$1,cljs.core.cst$kw$bindings);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18620__$1,cljs.core.cst$kw$env);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("(function (){");
} else {
}

var seq__18622_18634 = cljs.core.seq(bindings);
var chunk__18623_18635 = null;
var count__18624_18636 = (0);
var i__18625_18637 = (0);
while(true){
if((i__18625_18637 < count__18624_18636)){
var map__18630_18638 = chunk__18623_18635.cljs$core$IIndexed$_nth$arity$2(null,i__18625_18637);
var map__18630_18639__$1 = (((((!((map__18630_18638 == null))))?(((((map__18630_18638.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18630_18638.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18630_18638):map__18630_18638);
var binding_18640 = map__18630_18639__$1;
var init_18641 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18630_18639__$1,cljs.core.cst$kw$init);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_18640)," = ",init_18641,";");


var G__18642 = seq__18622_18634;
var G__18643 = chunk__18623_18635;
var G__18644 = count__18624_18636;
var G__18645 = (i__18625_18637 + (1));
seq__18622_18634 = G__18642;
chunk__18623_18635 = G__18643;
count__18624_18636 = G__18644;
i__18625_18637 = G__18645;
continue;
} else {
var temp__5735__auto___18646 = cljs.core.seq(seq__18622_18634);
if(temp__5735__auto___18646){
var seq__18622_18647__$1 = temp__5735__auto___18646;
if(cljs.core.chunked_seq_QMARK_(seq__18622_18647__$1)){
var c__4550__auto___18648 = cljs.core.chunk_first(seq__18622_18647__$1);
var G__18649 = cljs.core.chunk_rest(seq__18622_18647__$1);
var G__18650 = c__4550__auto___18648;
var G__18651 = cljs.core.count(c__4550__auto___18648);
var G__18652 = (0);
seq__18622_18634 = G__18649;
chunk__18623_18635 = G__18650;
count__18624_18636 = G__18651;
i__18625_18637 = G__18652;
continue;
} else {
var map__18632_18653 = cljs.core.first(seq__18622_18647__$1);
var map__18632_18654__$1 = (((((!((map__18632_18653 == null))))?(((((map__18632_18653.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18632_18653.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18632_18653):map__18632_18653);
var binding_18655 = map__18632_18654__$1;
var init_18656 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18632_18654__$1,cljs.core.cst$kw$init);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_18655)," = ",init_18656,";");


var G__18657 = cljs.core.next(seq__18622_18647__$1);
var G__18658 = null;
var G__18659 = (0);
var G__18660 = (0);
seq__18622_18634 = G__18657;
chunk__18623_18635 = G__18658;
count__18624_18636 = G__18659;
i__18625_18637 = G__18660;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$invoke,(function (p__18663){
var map__18664 = p__18663;
var map__18664__$1 = (((((!((map__18664 == null))))?(((((map__18664.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18664.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18664):map__18664);
var expr = map__18664__$1;
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18664__$1,cljs.core.cst$kw$fn);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18664__$1,cljs.core.cst$kw$args);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18664__$1,cljs.core.cst$kw$env);
var info = cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(f);
var fn_QMARK_ = (function (){var and__4120__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__4120__auto__){
var and__4120__auto____$1 = cljs.core.not(cljs.core.cst$kw$dynamic.cljs$core$IFn$_invoke$arity$1(info));
if(and__4120__auto____$1){
return cljs.core.cst$kw$fn_DASH_var.cljs$core$IFn$_invoke$arity$1(info);
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})();
var protocol = cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(info);
var tag = cljs.analyzer.infer_tag(env,cljs.core.first(cljs.core.cst$kw$args.cljs$core$IFn$_invoke$arity$1(expr)));
var proto_QMARK_ = (function (){var and__4120__auto__ = protocol;
if(cljs.core.truth_(and__4120__auto__)){
var and__4120__auto____$1 = tag;
if(cljs.core.truth_(and__4120__auto____$1)){
var or__4131__auto__ = (function (){var and__4120__auto____$2 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__4120__auto____$2){
var and__4120__auto____$3 = protocol;
if(cljs.core.truth_(and__4120__auto____$3)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(tag,cljs.core.cst$sym$not_DASH_native);
} else {
return and__4120__auto____$3;
}
} else {
return and__4120__auto____$2;
}
})();
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var and__4120__auto____$2 = (function (){var or__4131__auto____$1 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(or__4131__auto____$1){
return or__4131__auto____$1;
} else {
return cljs.core.cst$kw$protocol_DASH_inline.cljs$core$IFn$_invoke$arity$1(env);
}
})();
if(cljs.core.truth_(and__4120__auto____$2)){
var or__4131__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(protocol,tag);
if(or__4131__auto____$1){
return or__4131__auto____$1;
} else {
var and__4120__auto____$3 = (!(cljs.core.set_QMARK_(tag)));
if(and__4120__auto____$3){
var and__4120__auto____$4 = cljs.core.not((function (){var fexpr__18674 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [cljs.core.cst$sym$clj,"null",cljs.core.cst$sym$boolean,"null",cljs.core.cst$sym$object,"null",cljs.core.cst$sym$any,"null",cljs.core.cst$sym$js,"null",cljs.core.cst$sym$number,"null",cljs.core.cst$sym$clj_DASH_or_DASH_nil,"null",cljs.core.cst$sym$array,"null",cljs.core.cst$sym$string,"null",cljs.core.cst$sym$function,"null",cljs.core.cst$sym$clj_DASH_nil,"null"], null), null);
return (fexpr__18674.cljs$core$IFn$_invoke$arity$1 ? fexpr__18674.cljs$core$IFn$_invoke$arity$1(tag) : fexpr__18674(tag));
})());
if(and__4120__auto____$4){
var temp__5735__auto__ = cljs.core.cst$kw$protocols.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_existing_var(env,tag));
if(cljs.core.truth_(temp__5735__auto__)){
var ps = temp__5735__auto__;
return (ps.cljs$core$IFn$_invoke$arity$1 ? ps.cljs$core$IFn$_invoke$arity$1(protocol) : ps(protocol));
} else {
return null;
}
} else {
return and__4120__auto____$4;
}
} else {
return and__4120__auto____$3;
}
}
} else {
return and__4120__auto____$2;
}
}
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})();
var opt_not_QMARK_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info),cljs.core.cst$sym$cljs$core_SLASH_not)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.infer_tag(env,cljs.core.first(cljs.core.cst$kw$args.cljs$core$IFn$_invoke$arity$1(expr))),cljs.core.cst$sym$boolean)));
var ns = cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(info);
var js_QMARK_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.cst$sym$js)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.cst$sym$Math)));
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__4131__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.cst$sym$goog);
if(or__4131__auto__){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = (function (){var temp__5735__auto__ = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
if(cljs.core.truth_(temp__5735__auto__)){
var ns_str = temp__5735__auto__;
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.string.split.cljs$core$IFn$_invoke$arity$2(ns_str,/\./),(0),null),"goog");
} else {
return null;
}
})();
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
return (!(cljs.core.contains_QMARK_(cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)),ns)));
}
}
})():null);
var keyword_QMARK_ = (function (){var or__4131__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$cljs$core_SLASH_Keyword,cljs.analyzer.infer_tag(env,f));
if(or__4131__auto__){
return or__4131__auto__;
} else {
var f__$1 = cljs.analyzer.unwrap_quote(f);
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(f__$1),cljs.core.cst$kw$const)) && ((cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(f__$1) instanceof cljs.core.Keyword)));
}
})();
var vec__18666 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count(args);
var variadic_QMARK_ = cljs.core.cst$kw$variadic_QMARK_.cljs$core$IFn$_invoke$arity$1(info);
var mps = cljs.core.cst$kw$method_DASH_params.cljs$core$IFn$_invoke$arity$1(info);
var mfa = cljs.core.cst$kw$max_DASH_fixed_DASH_arity.cljs$core$IFn$_invoke$arity$1(info);
if(((cljs.core.not(variadic_QMARK_)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(mps),(1))))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
} else {
if(cljs.core.truth_((function (){var and__4120__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__4120__auto__)){
return (arity > mfa);
} else {
return and__4120__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__18664,map__18664__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),".cljs$core$IFn$_invoke$arity$variadic"].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__18664,map__18664__$1,expr,f,args,env){
return (function (p1__18661_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__18661_SHARP_,cljs.core.cst$kw$shadow),cljs.core.cst$kw$fn_DASH_self_DASH_name);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__18664,map__18664__$1,expr,f,args,env))
);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__18664,map__18664__$1,expr,f,args,env))
),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$max_DASH_fixed_DASH_arity,mfa], null)], null);
} else {
var arities = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.createAsIfByAssoc([arity]),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__18664,map__18664__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__18664,map__18664__$1,expr,f,args,env){
return (function (p1__18662_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__18662_SHARP_,cljs.core.cst$kw$shadow),cljs.core.cst$kw$fn_DASH_self_DASH_name);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__18664,map__18664__$1,expr,f,args,env))
);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__18664,map__18664__$1,expr,f,args,env))
),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18666,(0),null);
var variadic_invoke = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18666,(1),null);
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("(!(",cljs.core.first(args),"))");
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_18679 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.compiler.protocol_prefix(protocol))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.name(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info)))),"$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(args))].join('');
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.first(args),".",pimpl_18679,"(",cljs.compiler.comma_sep(cljs.core.cons("null",cljs.core.rest(args))),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([")"], 0));
} else {
if(keyword_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count(args),"(",cljs.compiler.comma_sep(args),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([")"], 0));
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_18680 = cljs.core.cst$kw$max_DASH_fixed_DASH_arity.cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(f__$1,"(",cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(mfa_18680,args)),(((mfa_18680 === (0)))?null:","),"cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.compiler.comma_sep(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(mfa_18680,args)),"], 0))"], 0));
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = js_QMARK_;
if(or__4131__auto____$1){
return or__4131__auto____$1;
} else {
return goog_QMARK_;
}
}
})())){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4(f__$1,"(",cljs.compiler.comma_sep(args),")");
} else {
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__4120__auto__){
var G__18678 = cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(f__$1);
var fexpr__18677 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$var,null,cljs.core.cst$kw$js_DASH_var,null,cljs.core.cst$kw$local,null], null), null);
return (fexpr__18677.cljs$core$IFn$_invoke$arity$1 ? fexpr__18677.cljs$core$IFn$_invoke$arity$1(G__18678) : fexpr__18677(G__18678));
} else {
return and__4120__auto__;
}
})())){
var fprop_18681 = [".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(args))].join('');
if(cljs.analyzer._STAR_fn_invoke_direct_STAR_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic("(",f__$1,fprop_18681," ? ",f__$1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([fprop_18681,"(",cljs.compiler.comma_sep(args),") : ",f__$1,"(",cljs.compiler.comma_sep(args),"))"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic("(",f__$1,fprop_18681," ? ",f__$1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([fprop_18681,"(",cljs.compiler.comma_sep(args),") : ",f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),"))"], 0));
}
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4(f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),")");
}

}
}
}
}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$new,(function (p__18682){
var map__18683 = p__18682;
var map__18683__$1 = (((((!((map__18683 == null))))?(((((map__18683.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18683.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18683):map__18683);
var ctor = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18683__$1,cljs.core.cst$kw$class);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18683__$1,cljs.core.cst$kw$args);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18683__$1,cljs.core.cst$kw$env);
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("(new ",ctor,"(",cljs.compiler.comma_sep(args),"))");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$set_BANG_,(function (p__18685){
var map__18686 = p__18685;
var map__18686__$1 = (((((!((map__18686 == null))))?(((((map__18686.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18686.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18686):map__18686);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18686__$1,cljs.core.cst$kw$target);
var val = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18686__$1,cljs.core.cst$kw$val);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18686__$1,cljs.core.cst$kw$env);
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3(target," = ",val);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_global_export = (function cljs$compiler$emit_global_export(ns_name,global_exports,lib){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(ns_name),".",cljs.analyzer.munge_global_export(lib)," = goog.global",cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (prop){
return ["[\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop),"\"]"].join('');
}),clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name((function (){var or__4131__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(global_exports,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(lib));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(global_exports,cljs.core.name(lib));
}
})()),/\./))),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([";"], 0));
});
cljs.compiler.load_libs = (function cljs$compiler$load_libs(libs,seen,reloads,deps,ns_name){
var map__18688 = cljs.core.deref(cljs.env._STAR_compiler_STAR_);
var map__18688__$1 = (((((!((map__18688 == null))))?(((((map__18688.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18688.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18688):map__18688);
var options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18688__$1,cljs.core.cst$kw$options);
var js_dependency_index = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18688__$1,cljs.core.cst$kw$js_DASH_dependency_DASH_index);
var map__18689 = options;
var map__18689__$1 = (((((!((map__18689 == null))))?(((((map__18689.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18689.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18689):map__18689);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18689__$1,cljs.core.cst$kw$target);
var optimizations = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18689__$1,cljs.core.cst$kw$optimizations);
var loaded_libs = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$sym$cljs$core$_STAR_loaded_DASH_libs_STAR_);
var loaded_libs_temp = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$sym$cljs$core$_STAR_loaded_DASH_libs_STAR_));
var vec__18690 = (function (){var libs__$1 = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.vals(seen)),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.vals(libs)),deps));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$nodejs,target)){
var map__18695 = cljs.core.group_by(cljs.analyzer.node_module_dep_QMARK_,libs__$1);
var map__18695__$1 = (((((!((map__18695 == null))))?(((((map__18695.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18695.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18695):map__18695);
var node_libs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18695__$1,true);
var libs_to_load = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18695__$1,false);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node_libs,libs_to_load], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,libs__$1], null);
}
})();
var node_libs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18690,(0),null);
var libs_to_load = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18690,(1),null);
var global_exports_libs = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.dep_has_global_exports_QMARK_,libs_to_load);
if(cljs.core.truth_(cljs.core.cst$kw$reload_DASH_all.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs)))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("if(!COMPILED) ",loaded_libs_temp," = ",loaded_libs," || cljs.core.set([\"cljs.core\"]);");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if(!COMPILED) ",loaded_libs," = cljs.core.set([\"cljs.core\"]);");
} else {
}

var seq__18697_18717 = cljs.core.seq(libs_to_load);
var chunk__18698_18718 = null;
var count__18699_18719 = (0);
var i__18700_18720 = (0);
while(true){
if((i__18700_18720 < count__18699_18719)){
var lib_18721 = chunk__18698_18718.cljs$core$IIndexed$_nth$arity$2(null,i__18700_18720);
if(((cljs.analyzer.foreign_dep_QMARK_(lib_18721)) && ((!(cljs.core.keyword_identical_QMARK_(optimizations,cljs.core.cst$kw$none)))))){
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = cljs.core.cst$kw$reload.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_18721),cljs.core.cst$kw$reload);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_18721),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = cljs.core.cst$kw$reload_DASH_all.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_18721),cljs.core.cst$kw$reload_DASH_all);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_18721),"', 'reload-all');");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(lib_18721,cljs.core.cst$sym$goog)){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_18721),"');");
}

}
}
}


var G__18722 = seq__18697_18717;
var G__18723 = chunk__18698_18718;
var G__18724 = count__18699_18719;
var G__18725 = (i__18700_18720 + (1));
seq__18697_18717 = G__18722;
chunk__18698_18718 = G__18723;
count__18699_18719 = G__18724;
i__18700_18720 = G__18725;
continue;
} else {
var temp__5735__auto___18726 = cljs.core.seq(seq__18697_18717);
if(temp__5735__auto___18726){
var seq__18697_18727__$1 = temp__5735__auto___18726;
if(cljs.core.chunked_seq_QMARK_(seq__18697_18727__$1)){
var c__4550__auto___18728 = cljs.core.chunk_first(seq__18697_18727__$1);
var G__18729 = cljs.core.chunk_rest(seq__18697_18727__$1);
var G__18730 = c__4550__auto___18728;
var G__18731 = cljs.core.count(c__4550__auto___18728);
var G__18732 = (0);
seq__18697_18717 = G__18729;
chunk__18698_18718 = G__18730;
count__18699_18719 = G__18731;
i__18700_18720 = G__18732;
continue;
} else {
var lib_18733 = cljs.core.first(seq__18697_18727__$1);
if(((cljs.analyzer.foreign_dep_QMARK_(lib_18733)) && ((!(cljs.core.keyword_identical_QMARK_(optimizations,cljs.core.cst$kw$none)))))){
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = cljs.core.cst$kw$reload.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_18733),cljs.core.cst$kw$reload);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_18733),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = cljs.core.cst$kw$reload_DASH_all.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_18733),cljs.core.cst$kw$reload_DASH_all);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_18733),"', 'reload-all');");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(lib_18733,cljs.core.cst$sym$goog)){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_18733),"');");
}

}
}
}


var G__18734 = cljs.core.next(seq__18697_18727__$1);
var G__18735 = null;
var G__18736 = (0);
var G__18737 = (0);
seq__18697_18717 = G__18734;
chunk__18698_18718 = G__18735;
count__18699_18719 = G__18736;
i__18700_18720 = G__18737;
continue;
}
} else {
}
}
break;
}

var seq__18701_18738 = cljs.core.seq(node_libs);
var chunk__18702_18739 = null;
var count__18703_18740 = (0);
var i__18704_18741 = (0);
while(true){
if((i__18704_18741 < count__18703_18740)){
var lib_18742 = chunk__18702_18739.cljs$core$IIndexed$_nth$arity$2(null,i__18704_18741);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(ns_name),".",cljs.analyzer.munge_node_lib(lib_18742)," = require('",lib_18742,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["');"], 0));


var G__18743 = seq__18701_18738;
var G__18744 = chunk__18702_18739;
var G__18745 = count__18703_18740;
var G__18746 = (i__18704_18741 + (1));
seq__18701_18738 = G__18743;
chunk__18702_18739 = G__18744;
count__18703_18740 = G__18745;
i__18704_18741 = G__18746;
continue;
} else {
var temp__5735__auto___18747 = cljs.core.seq(seq__18701_18738);
if(temp__5735__auto___18747){
var seq__18701_18748__$1 = temp__5735__auto___18747;
if(cljs.core.chunked_seq_QMARK_(seq__18701_18748__$1)){
var c__4550__auto___18749 = cljs.core.chunk_first(seq__18701_18748__$1);
var G__18750 = cljs.core.chunk_rest(seq__18701_18748__$1);
var G__18751 = c__4550__auto___18749;
var G__18752 = cljs.core.count(c__4550__auto___18749);
var G__18753 = (0);
seq__18701_18738 = G__18750;
chunk__18702_18739 = G__18751;
count__18703_18740 = G__18752;
i__18704_18741 = G__18753;
continue;
} else {
var lib_18754 = cljs.core.first(seq__18701_18748__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(ns_name),".",cljs.analyzer.munge_node_lib(lib_18754)," = require('",lib_18754,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["');"], 0));


var G__18755 = cljs.core.next(seq__18701_18748__$1);
var G__18756 = null;
var G__18757 = (0);
var G__18758 = (0);
seq__18701_18738 = G__18755;
chunk__18702_18739 = G__18756;
count__18703_18740 = G__18757;
i__18704_18741 = G__18758;
continue;
}
} else {
}
}
break;
}

var seq__18705_18759 = cljs.core.seq(global_exports_libs);
var chunk__18706_18760 = null;
var count__18707_18761 = (0);
var i__18708_18762 = (0);
while(true){
if((i__18708_18762 < count__18707_18761)){
var lib_18763 = chunk__18706_18760.cljs$core$IIndexed$_nth$arity$2(null,i__18708_18762);
var map__18713_18764 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(js_dependency_index,cljs.core.name(lib_18763));
var map__18713_18765__$1 = (((((!((map__18713_18764 == null))))?(((((map__18713_18764.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18713_18764.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18713_18764):map__18713_18764);
var global_exports_18766 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18713_18765__$1,cljs.core.cst$kw$global_DASH_exports);
cljs.compiler.emit_global_export(ns_name,global_exports_18766,lib_18763);


var G__18767 = seq__18705_18759;
var G__18768 = chunk__18706_18760;
var G__18769 = count__18707_18761;
var G__18770 = (i__18708_18762 + (1));
seq__18705_18759 = G__18767;
chunk__18706_18760 = G__18768;
count__18707_18761 = G__18769;
i__18708_18762 = G__18770;
continue;
} else {
var temp__5735__auto___18771 = cljs.core.seq(seq__18705_18759);
if(temp__5735__auto___18771){
var seq__18705_18772__$1 = temp__5735__auto___18771;
if(cljs.core.chunked_seq_QMARK_(seq__18705_18772__$1)){
var c__4550__auto___18773 = cljs.core.chunk_first(seq__18705_18772__$1);
var G__18774 = cljs.core.chunk_rest(seq__18705_18772__$1);
var G__18775 = c__4550__auto___18773;
var G__18776 = cljs.core.count(c__4550__auto___18773);
var G__18777 = (0);
seq__18705_18759 = G__18774;
chunk__18706_18760 = G__18775;
count__18707_18761 = G__18776;
i__18708_18762 = G__18777;
continue;
} else {
var lib_18778 = cljs.core.first(seq__18705_18772__$1);
var map__18715_18779 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(js_dependency_index,cljs.core.name(lib_18778));
var map__18715_18780__$1 = (((((!((map__18715_18779 == null))))?(((((map__18715_18779.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18715_18779.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18715_18779):map__18715_18779);
var global_exports_18781 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18715_18780__$1,cljs.core.cst$kw$global_DASH_exports);
cljs.compiler.emit_global_export(ns_name,global_exports_18781,lib_18778);


var G__18782 = cljs.core.next(seq__18705_18772__$1);
var G__18783 = null;
var G__18784 = (0);
var G__18785 = (0);
seq__18705_18759 = G__18782;
chunk__18706_18760 = G__18783;
count__18707_18761 = G__18784;
i__18708_18762 = G__18785;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$ns_STAR_,(function (p__18786){
var map__18787 = p__18786;
var map__18787__$1 = (((((!((map__18787 == null))))?(((((map__18787.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18787.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18787):map__18787);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18787__$1,cljs.core.cst$kw$name);
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18787__$1,cljs.core.cst$kw$requires);
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18787__$1,cljs.core.cst$kw$uses);
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18787__$1,cljs.core.cst$kw$require_DASH_macros);
var reloads = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18787__$1,cljs.core.cst$kw$reloads);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18787__$1,cljs.core.cst$kw$env);
var deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18787__$1,cljs.core.cst$kw$deps);
cljs.compiler.load_libs(requires,null,cljs.core.cst$kw$require.cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

cljs.compiler.load_libs(uses,requires,cljs.core.cst$kw$use.cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

if(cljs.core.truth_(cljs.core.cst$kw$repl_DASH_env.cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("'nil';");
} else {
return null;
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$ns,(function (p__18789){
var map__18790 = p__18789;
var map__18790__$1 = (((((!((map__18790 == null))))?(((((map__18790.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18790.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18790):map__18790);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18790__$1,cljs.core.cst$kw$name);
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18790__$1,cljs.core.cst$kw$requires);
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18790__$1,cljs.core.cst$kw$uses);
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18790__$1,cljs.core.cst$kw$require_DASH_macros);
var reloads = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18790__$1,cljs.core.cst$kw$reloads);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18790__$1,cljs.core.cst$kw$env);
var deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18790__$1,cljs.core.cst$kw$deps);
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$deftype,(function (p__18792){
var map__18793 = p__18792;
var map__18793__$1 = (((((!((map__18793 == null))))?(((((map__18793.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18793.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18793):map__18793);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18793__$1,cljs.core.cst$kw$t);
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18793__$1,cljs.core.cst$kw$fields);
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18793__$1,cljs.core.cst$kw$pmasks);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18793__$1,cljs.core.cst$kw$body);
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18793__$1,cljs.core.cst$kw$protocols);
var fields__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("/**");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("* @constructor");

var seq__18795_18819 = cljs.core.seq(protocols);
var chunk__18796_18820 = null;
var count__18797_18821 = (0);
var i__18798_18822 = (0);
while(true){
if((i__18798_18822 < count__18797_18821)){
var protocol_18823 = chunk__18796_18820.cljs$core$IIndexed$_nth$arity$2(null,i__18798_18822);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_18823)),"}");


var G__18824 = seq__18795_18819;
var G__18825 = chunk__18796_18820;
var G__18826 = count__18797_18821;
var G__18827 = (i__18798_18822 + (1));
seq__18795_18819 = G__18824;
chunk__18796_18820 = G__18825;
count__18797_18821 = G__18826;
i__18798_18822 = G__18827;
continue;
} else {
var temp__5735__auto___18828 = cljs.core.seq(seq__18795_18819);
if(temp__5735__auto___18828){
var seq__18795_18829__$1 = temp__5735__auto___18828;
if(cljs.core.chunked_seq_QMARK_(seq__18795_18829__$1)){
var c__4550__auto___18830 = cljs.core.chunk_first(seq__18795_18829__$1);
var G__18831 = cljs.core.chunk_rest(seq__18795_18829__$1);
var G__18832 = c__4550__auto___18830;
var G__18833 = cljs.core.count(c__4550__auto___18830);
var G__18834 = (0);
seq__18795_18819 = G__18831;
chunk__18796_18820 = G__18832;
count__18797_18821 = G__18833;
i__18798_18822 = G__18834;
continue;
} else {
var protocol_18835 = cljs.core.first(seq__18795_18829__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_18835)),"}");


var G__18836 = cljs.core.next(seq__18795_18829__$1);
var G__18837 = null;
var G__18838 = (0);
var G__18839 = (0);
seq__18795_18819 = G__18836;
chunk__18796_18820 = G__18837;
count__18797_18821 = G__18838;
i__18798_18822 = G__18839;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("*/");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){");

var seq__18799_18840 = cljs.core.seq(fields__$1);
var chunk__18800_18841 = null;
var count__18801_18842 = (0);
var i__18802_18843 = (0);
while(true){
if((i__18802_18843 < count__18801_18842)){
var fld_18844 = chunk__18800_18841.cljs$core$IIndexed$_nth$arity$2(null,i__18802_18843);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.",fld_18844," = ",fld_18844,";");


var G__18845 = seq__18799_18840;
var G__18846 = chunk__18800_18841;
var G__18847 = count__18801_18842;
var G__18848 = (i__18802_18843 + (1));
seq__18799_18840 = G__18845;
chunk__18800_18841 = G__18846;
count__18801_18842 = G__18847;
i__18802_18843 = G__18848;
continue;
} else {
var temp__5735__auto___18849 = cljs.core.seq(seq__18799_18840);
if(temp__5735__auto___18849){
var seq__18799_18850__$1 = temp__5735__auto___18849;
if(cljs.core.chunked_seq_QMARK_(seq__18799_18850__$1)){
var c__4550__auto___18851 = cljs.core.chunk_first(seq__18799_18850__$1);
var G__18852 = cljs.core.chunk_rest(seq__18799_18850__$1);
var G__18853 = c__4550__auto___18851;
var G__18854 = cljs.core.count(c__4550__auto___18851);
var G__18855 = (0);
seq__18799_18840 = G__18852;
chunk__18800_18841 = G__18853;
count__18801_18842 = G__18854;
i__18802_18843 = G__18855;
continue;
} else {
var fld_18856 = cljs.core.first(seq__18799_18850__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.",fld_18856," = ",fld_18856,";");


var G__18857 = cljs.core.next(seq__18799_18850__$1);
var G__18858 = null;
var G__18859 = (0);
var G__18860 = (0);
seq__18799_18840 = G__18857;
chunk__18800_18841 = G__18858;
count__18801_18842 = G__18859;
i__18802_18843 = G__18860;
continue;
}
} else {
}
}
break;
}

var seq__18803_18861 = cljs.core.seq(pmasks);
var chunk__18804_18862 = null;
var count__18805_18863 = (0);
var i__18806_18864 = (0);
while(true){
if((i__18806_18864 < count__18805_18863)){
var vec__18813_18865 = chunk__18804_18862.cljs$core$IIndexed$_nth$arity$2(null,i__18806_18864);
var pno_18866 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18813_18865,(0),null);
var pmask_18867 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18813_18865,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.cljs$lang$protocol_mask$partition",pno_18866,"$ = ",pmask_18867,";");


var G__18868 = seq__18803_18861;
var G__18869 = chunk__18804_18862;
var G__18870 = count__18805_18863;
var G__18871 = (i__18806_18864 + (1));
seq__18803_18861 = G__18868;
chunk__18804_18862 = G__18869;
count__18805_18863 = G__18870;
i__18806_18864 = G__18871;
continue;
} else {
var temp__5735__auto___18872 = cljs.core.seq(seq__18803_18861);
if(temp__5735__auto___18872){
var seq__18803_18873__$1 = temp__5735__auto___18872;
if(cljs.core.chunked_seq_QMARK_(seq__18803_18873__$1)){
var c__4550__auto___18874 = cljs.core.chunk_first(seq__18803_18873__$1);
var G__18875 = cljs.core.chunk_rest(seq__18803_18873__$1);
var G__18876 = c__4550__auto___18874;
var G__18877 = cljs.core.count(c__4550__auto___18874);
var G__18878 = (0);
seq__18803_18861 = G__18875;
chunk__18804_18862 = G__18876;
count__18805_18863 = G__18877;
i__18806_18864 = G__18878;
continue;
} else {
var vec__18816_18879 = cljs.core.first(seq__18803_18873__$1);
var pno_18880 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18816_18879,(0),null);
var pmask_18881 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18816_18879,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.cljs$lang$protocol_mask$partition",pno_18880,"$ = ",pmask_18881,";");


var G__18882 = cljs.core.next(seq__18803_18873__$1);
var G__18883 = null;
var G__18884 = (0);
var G__18885 = (0);
seq__18803_18861 = G__18882;
chunk__18804_18862 = G__18883;
count__18805_18863 = G__18884;
i__18806_18864 = G__18885;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$defrecord,(function (p__18886){
var map__18887 = p__18886;
var map__18887__$1 = (((((!((map__18887 == null))))?(((((map__18887.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18887.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18887):map__18887);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18887__$1,cljs.core.cst$kw$t);
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18887__$1,cljs.core.cst$kw$fields);
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18887__$1,cljs.core.cst$kw$pmasks);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18887__$1,cljs.core.cst$kw$body);
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18887__$1,cljs.core.cst$kw$protocols);
var fields__$1 = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$__meta,cljs.core.cst$sym$__extmap,cljs.core.cst$sym$__hash], null));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("/**");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("* @constructor");

var seq__18889_18913 = cljs.core.seq(protocols);
var chunk__18890_18914 = null;
var count__18891_18915 = (0);
var i__18892_18916 = (0);
while(true){
if((i__18892_18916 < count__18891_18915)){
var protocol_18917 = chunk__18890_18914.cljs$core$IIndexed$_nth$arity$2(null,i__18892_18916);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_18917)),"}");


var G__18918 = seq__18889_18913;
var G__18919 = chunk__18890_18914;
var G__18920 = count__18891_18915;
var G__18921 = (i__18892_18916 + (1));
seq__18889_18913 = G__18918;
chunk__18890_18914 = G__18919;
count__18891_18915 = G__18920;
i__18892_18916 = G__18921;
continue;
} else {
var temp__5735__auto___18922 = cljs.core.seq(seq__18889_18913);
if(temp__5735__auto___18922){
var seq__18889_18923__$1 = temp__5735__auto___18922;
if(cljs.core.chunked_seq_QMARK_(seq__18889_18923__$1)){
var c__4550__auto___18924 = cljs.core.chunk_first(seq__18889_18923__$1);
var G__18925 = cljs.core.chunk_rest(seq__18889_18923__$1);
var G__18926 = c__4550__auto___18924;
var G__18927 = cljs.core.count(c__4550__auto___18924);
var G__18928 = (0);
seq__18889_18913 = G__18925;
chunk__18890_18914 = G__18926;
count__18891_18915 = G__18927;
i__18892_18916 = G__18928;
continue;
} else {
var protocol_18929 = cljs.core.first(seq__18889_18923__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_18929)),"}");


var G__18930 = cljs.core.next(seq__18889_18923__$1);
var G__18931 = null;
var G__18932 = (0);
var G__18933 = (0);
seq__18889_18913 = G__18930;
chunk__18890_18914 = G__18931;
count__18891_18915 = G__18932;
i__18892_18916 = G__18933;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("*/");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){");

var seq__18893_18934 = cljs.core.seq(fields__$1);
var chunk__18894_18935 = null;
var count__18895_18936 = (0);
var i__18896_18937 = (0);
while(true){
if((i__18896_18937 < count__18895_18936)){
var fld_18938 = chunk__18894_18935.cljs$core$IIndexed$_nth$arity$2(null,i__18896_18937);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.",fld_18938," = ",fld_18938,";");


var G__18939 = seq__18893_18934;
var G__18940 = chunk__18894_18935;
var G__18941 = count__18895_18936;
var G__18942 = (i__18896_18937 + (1));
seq__18893_18934 = G__18939;
chunk__18894_18935 = G__18940;
count__18895_18936 = G__18941;
i__18896_18937 = G__18942;
continue;
} else {
var temp__5735__auto___18943 = cljs.core.seq(seq__18893_18934);
if(temp__5735__auto___18943){
var seq__18893_18944__$1 = temp__5735__auto___18943;
if(cljs.core.chunked_seq_QMARK_(seq__18893_18944__$1)){
var c__4550__auto___18945 = cljs.core.chunk_first(seq__18893_18944__$1);
var G__18946 = cljs.core.chunk_rest(seq__18893_18944__$1);
var G__18947 = c__4550__auto___18945;
var G__18948 = cljs.core.count(c__4550__auto___18945);
var G__18949 = (0);
seq__18893_18934 = G__18946;
chunk__18894_18935 = G__18947;
count__18895_18936 = G__18948;
i__18896_18937 = G__18949;
continue;
} else {
var fld_18950 = cljs.core.first(seq__18893_18944__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.",fld_18950," = ",fld_18950,";");


var G__18951 = cljs.core.next(seq__18893_18944__$1);
var G__18952 = null;
var G__18953 = (0);
var G__18954 = (0);
seq__18893_18934 = G__18951;
chunk__18894_18935 = G__18952;
count__18895_18936 = G__18953;
i__18896_18937 = G__18954;
continue;
}
} else {
}
}
break;
}

var seq__18897_18955 = cljs.core.seq(pmasks);
var chunk__18898_18956 = null;
var count__18899_18957 = (0);
var i__18900_18958 = (0);
while(true){
if((i__18900_18958 < count__18899_18957)){
var vec__18907_18959 = chunk__18898_18956.cljs$core$IIndexed$_nth$arity$2(null,i__18900_18958);
var pno_18960 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18907_18959,(0),null);
var pmask_18961 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18907_18959,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.cljs$lang$protocol_mask$partition",pno_18960,"$ = ",pmask_18961,";");


var G__18962 = seq__18897_18955;
var G__18963 = chunk__18898_18956;
var G__18964 = count__18899_18957;
var G__18965 = (i__18900_18958 + (1));
seq__18897_18955 = G__18962;
chunk__18898_18956 = G__18963;
count__18899_18957 = G__18964;
i__18900_18958 = G__18965;
continue;
} else {
var temp__5735__auto___18966 = cljs.core.seq(seq__18897_18955);
if(temp__5735__auto___18966){
var seq__18897_18967__$1 = temp__5735__auto___18966;
if(cljs.core.chunked_seq_QMARK_(seq__18897_18967__$1)){
var c__4550__auto___18968 = cljs.core.chunk_first(seq__18897_18967__$1);
var G__18969 = cljs.core.chunk_rest(seq__18897_18967__$1);
var G__18970 = c__4550__auto___18968;
var G__18971 = cljs.core.count(c__4550__auto___18968);
var G__18972 = (0);
seq__18897_18955 = G__18969;
chunk__18898_18956 = G__18970;
count__18899_18957 = G__18971;
i__18900_18958 = G__18972;
continue;
} else {
var vec__18910_18973 = cljs.core.first(seq__18897_18967__$1);
var pno_18974 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18910_18973,(0),null);
var pmask_18975 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18910_18973,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.cljs$lang$protocol_mask$partition",pno_18974,"$ = ",pmask_18975,";");


var G__18976 = cljs.core.next(seq__18897_18967__$1);
var G__18977 = null;
var G__18978 = (0);
var G__18979 = (0);
seq__18897_18955 = G__18976;
chunk__18898_18956 = G__18977;
count__18899_18957 = G__18978;
i__18900_18958 = G__18979;
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
cljs.compiler.emit_dot = (function cljs$compiler$emit_dot(p__18980){
var map__18981 = p__18980;
var map__18981__$1 = (((((!((map__18981 == null))))?(((((map__18981.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18981.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18981):map__18981);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18981__$1,cljs.core.cst$kw$target);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18981__$1,cljs.core.cst$kw$field);
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18981__$1,cljs.core.cst$kw$method);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18981__$1,cljs.core.cst$kw$args);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18981__$1,cljs.core.cst$kw$env);
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3(target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(field,cljs.core.PersistentHashSet.EMPTY));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep(args),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([")"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$js,(function (p__18983){
var map__18984 = p__18983;
var map__18984__$1 = (((((!((map__18984 == null))))?(((((map__18984.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18984.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__18984):map__18984);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18984__$1,cljs.core.cst$kw$op);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18984__$1,cljs.core.cst$kw$env);
var code = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18984__$1,cljs.core.cst$kw$code);
var segs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18984__$1,cljs.core.cst$kw$segs);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18984__$1,cljs.core.cst$kw$args);
if(cljs.core.truth_((function (){var and__4120__auto__ = code;
if(cljs.core.truth_(and__4120__auto__)){
var G__18986 = clojure.string.trim(code);
var G__18987 = "/*";
return goog.string.startsWith(G__18986,G__18987);
} else {
return and__4120__auto__;
}
})())){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(code);
} else {
var env__17731__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(code);
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null))));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__17731__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}
}));
cljs.compiler.emit_constants_table = (function cljs$compiler$emit_constants_table(table){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.provide('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.constants_ns_sym),"');");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("goog.require('cljs.core');");

var seq__18992 = cljs.core.seq(table);
var chunk__18993 = null;
var count__18994 = (0);
var i__18995 = (0);
while(true){
if((i__18995 < count__18994)){
var vec__19002 = chunk__18993.cljs$core$IIndexed$_nth$arity$2(null,i__18995);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19002,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19002,(1),null);
var ns_19008 = cljs.core.namespace(sym);
var name_19009 = cljs.core.name(sym);
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


var G__19010 = seq__18992;
var G__19011 = chunk__18993;
var G__19012 = count__18994;
var G__19013 = (i__18995 + (1));
seq__18992 = G__19010;
chunk__18993 = G__19011;
count__18994 = G__19012;
i__18995 = G__19013;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__18992);
if(temp__5735__auto__){
var seq__18992__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18992__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__18992__$1);
var G__19014 = cljs.core.chunk_rest(seq__18992__$1);
var G__19015 = c__4550__auto__;
var G__19016 = cljs.core.count(c__4550__auto__);
var G__19017 = (0);
seq__18992 = G__19014;
chunk__18993 = G__19015;
count__18994 = G__19016;
i__18995 = G__19017;
continue;
} else {
var vec__19005 = cljs.core.first(seq__18992__$1);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19005,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19005,(1),null);
var ns_19018 = cljs.core.namespace(sym);
var name_19019 = cljs.core.name(sym);
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


var G__19020 = cljs.core.next(seq__18992__$1);
var G__19021 = null;
var G__19022 = (0);
var G__19023 = (0);
seq__18992 = G__19020;
chunk__18993 = G__19021;
count__18994 = G__19022;
i__18995 = G__19023;
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
var G__19025 = arguments.length;
switch (G__19025) {
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

cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1 = (function (externs){
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4(cljs.core.PersistentVector.EMPTY,externs,cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY),(cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?cljs.core.cst$kw$cljs$analyzer_SLASH_externs.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)):null));
});

cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4 = (function (prefix,externs,top_level,known_externs){
var ks = cljs.core.seq(cljs.core.keys(externs));
while(true){
if(ks){
var k_19030 = cljs.core.first(ks);
var vec__19026_19031 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(prefix,k_19030);
var top_19032 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19026_19031,(0),null);
var prefix_SINGLEQUOTE__19033 = vec__19026_19031;
if(((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$prototype,k_19030)) && ((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(known_externs,prefix_SINGLEQUOTE__19033) == null)))){
if((!(((cljs.core.contains_QMARK_(cljs.core.deref(top_level),top_19032)) || (cljs.core.contains_QMARK_(known_externs,top_19032)))))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,prefix_SINGLEQUOTE__19033)),";");

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(top_level,cljs.core.conj,top_19032);
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,prefix_SINGLEQUOTE__19033)),";");
}
} else {
}

var m_19034 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(externs,k_19030);
if(cljs.core.empty_QMARK_(m_19034)){
} else {
cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4(prefix_SINGLEQUOTE__19033,m_19034,top_level,known_externs);
}

var G__19035 = cljs.core.next(ks);
ks = G__19035;
continue;
} else {
return null;
}
break;
}
});

cljs.compiler.emit_externs.cljs$lang$maxFixedArity = 4;

