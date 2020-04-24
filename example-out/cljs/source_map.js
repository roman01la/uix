// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('cljs.source_map');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('goog.object');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.source_map.base64_vlq');
/**
 * Take a seq of source file names and return a map from
 * file number to integer index. For reverse source maps.
 */
cljs.source_map.indexed_sources = (function cljs$source_map$indexed_sources(sources){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,p__14713){
var vec__14714 = p__14713;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14714,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14714,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,v,i);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
}),sources));
});
/**
 * Take a seq of source file names and return a comparator
 * that can be used to construct a sorted map. For reverse
 * source maps.
 */
cljs.source_map.source_compare = (function cljs$source_map$source_compare(sources){
var sources__$1 = cljs.source_map.indexed_sources(sources);
return (function (a,b){
return cljs.core.compare((sources__$1.cljs$core$IFn$_invoke$arity$1 ? sources__$1.cljs$core$IFn$_invoke$arity$1(a) : sources__$1(a)),(sources__$1.cljs$core$IFn$_invoke$arity$1 ? sources__$1.cljs$core$IFn$_invoke$arity$1(b) : sources__$1(b)));
});
});
/**
 * Take a source map segment represented as a vector
 * and return a map.
 */
cljs.source_map.seg__GT_map = (function cljs$source_map$seg__GT_map(seg,source_map){
var vec__14717 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14717,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14717,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14717,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14717,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14717,(4),null);
return new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$gcol,gcol,cljs.core.cst$kw$source,(goog.object.get(source_map,"sources")[source]),cljs.core.cst$kw$line,line,cljs.core.cst$kw$col,col,cljs.core.cst$kw$name,(function (){var temp__5735__auto__ = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(seg));
if(cljs.core.truth_(temp__5735__auto__)){
var name__$1 = temp__5735__auto__;
return (goog.object.get(source_map,"names")[name__$1]);
} else {
return null;
}
})()], null);
});
/**
 * Combine a source map segment vector and a relative
 * source map segment vector and combine them to get
 * an absolute segment posititon information as a vector.
 */
cljs.source_map.seg_combine = (function cljs$source_map$seg_combine(seg,relseg){
var vec__14720 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14720,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14720,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14720,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14720,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14720,(4),null);
var vec__14723 = relseg;
var rgcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14723,(0),null);
var rsource = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14723,(1),null);
var rline = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14723,(2),null);
var rcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14723,(3),null);
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14723,(4),null);
var nseg = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(gcol + rgcol),((function (){var or__4120__auto__ = source;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return (0);
}
})() + rsource),((function (){var or__4120__auto__ = line;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return (0);
}
})() + rline),((function (){var or__4120__auto__ = col;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return (0);
}
})() + rcol),((function (){var or__4120__auto__ = name;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return (0);
}
})() + rname)], null);
if(cljs.core.truth_(name)){
return cljs.core.with_meta(nseg,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,(name + rname)], null));
} else {
return nseg;
}
});
/**
 * Helper for decode-reverse. Take a reverse source map and
 *   update it with a segment map.
 */
cljs.source_map.update_reverse_result = (function cljs$source_map$update_reverse_result(result,segmap,gline){
var map__14726 = segmap;
var map__14726__$1 = (((((!((map__14726 == null))))?(((((map__14726.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14726.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14726):map__14726);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14726__$1,cljs.core.cst$kw$gcol);
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14726__$1,cljs.core.cst$kw$source);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14726__$1,cljs.core.cst$kw$line);
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14726__$1,cljs.core.cst$kw$col);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14726__$1,cljs.core.cst$kw$name);
var d = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$gline,gline,cljs.core.cst$kw$gcol,gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,cljs.core.cst$kw$name,name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (m__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (v){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(v,d__$1);
}),cljs.core.PersistentVector.EMPTY));
}),cljs.core.sorted_map()));
}),cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var G__14729 = arguments.length;
switch (G__14729) {
case 1:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2(goog.object.get(source_map,"mappings"),source_map);
}));

(cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.sorted_map_by(cljs.source_map.source_compare(sources));
while(true){
if(lines__$1){
var line = cljs.core.first(lines__$1);
var vec__14733 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__14737 = cljs.core.next(segs__$1);
var G__14738 = nrelseg;
var G__14739 = cljs.source_map.update_reverse_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__14737;
relseg__$1 = G__14738;
result__$1 = G__14739;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14733,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14733,(1),null);
var G__14740 = (gline + (1));
var G__14741 = cljs.core.next(lines__$1);
var G__14742 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__14743 = result__$1;
gline = G__14740;
lines__$1 = G__14741;
relseg = G__14742;
result = G__14743;
continue;
} else {
return result;
}
break;
}
}));

(cljs.source_map.decode_reverse.cljs$lang$maxFixedArity = 2);

/**
 * Helper for decode. Take a source map and update it based on a
 *   segment map.
 */
cljs.source_map.update_result = (function cljs$source_map$update_result(result,segmap,gline){
var map__14745 = segmap;
var map__14745__$1 = (((((!((map__14745 == null))))?(((((map__14745.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14745.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14745):map__14745);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14745__$1,cljs.core.cst$kw$gcol);
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14745__$1,cljs.core.cst$kw$source);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14745__$1,cljs.core.cst$kw$line);
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14745__$1,cljs.core.cst$kw$col);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14745__$1,cljs.core.cst$kw$name);
var d = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line,cljs.core.cst$kw$col,col,cljs.core.cst$kw$source,source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,cljs.core.cst$kw$name,name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (p1__14744_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__14744_SHARP_,d__$1);
}),cljs.core.PersistentVector.EMPTY));
}),cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var G__14748 = arguments.length;
switch (G__14748) {
case 1:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2(goog.object.get(source_map,"mappings"),source_map);
}));

(cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(lines__$1){
var line = cljs.core.first(lines__$1);
var vec__14752 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__14756 = cljs.core.next(segs__$1);
var G__14757 = nrelseg;
var G__14758 = cljs.source_map.update_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__14756;
relseg__$1 = G__14757;
result__$1 = G__14758;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14752,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14752,(1),null);
var G__14759 = (gline + (1));
var G__14760 = cljs.core.next(lines__$1);
var G__14761 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__14762 = result__$1;
gline = G__14759;
lines__$1 = G__14760;
relseg = G__14761;
result = G__14762;
continue;
} else {
return result;
}
break;
}
}));

(cljs.source_map.decode.cljs$lang$maxFixedArity = 2);

/**
 * Take a nested sorted map encoding line and column information
 * for a file and return a vector of vectors of encoded segments.
 * Each vector represents a line, and the internal vectors are segments
 * representing the contents of the line.
 */
cljs.source_map.lines__GT_segs = (function cljs$source_map$lines__GT_segs(lines){
var relseg = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (segs,cols){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,(function (p__14763){
var vec__14764 = p__14763;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14764,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14764,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14764,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14764,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14764,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
}));

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (cols__$1,p__14767){
var vec__14768 = p__14767;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14768,(0),null);
var sidx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14768,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14768,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14768,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14768,(4),null);
var seg = vec__14768;
var offset = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._,seg,cljs.core.deref(relseg));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,(function (p__14771){
var vec__14772 = p__14771;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14772,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14772,(1),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14772,(2),null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14772,(3),null);
var lname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14772,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__4120__auto__ = name;
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return lname;
}
})()], null);
}));

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cols__$1,cljs.source_map.base64_vlq.encode(offset));
}),cljs.core.PersistentVector.EMPTY,cols));
}),cljs.core.PersistentVector.EMPTY,lines);
});
/**
 * Take an internal source map representation represented as nested
 * sorted maps of file, line, column and return a source map v3 JSON
 * string.
 */
cljs.source_map.encode = (function cljs$source_map$encode(m,opts){
var lines = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY], null));
var names__GT_idx = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var name_idx = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
var preamble_lines = cljs.core.take.cljs$core$IFn$_invoke$arity$2((function (){var or__4120__auto__ = cljs.core.cst$kw$preamble_DASH_line_DASH_count.cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__4120__auto__)){
return or__4120__auto__;
} else {
return (0);
}
})(),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY));
var info__GT_segv = (function (info,source_idx,line,col){
var segv = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$gcol.cljs$core$IFn$_invoke$arity$1(info),source_idx,line,col], null);
var temp__5733__auto__ = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(temp__5733__auto__)){
var name = temp__5733__auto__;
var idx = (function (){var temp__5733__auto____$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(names__GT_idx),name);
if(cljs.core.truth_(temp__5733__auto____$1)){
var idx = temp__5733__auto____$1;
return idx;
} else {
var cidx = cljs.core.deref(name_idx);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(names__GT_idx,cljs.core.assoc,name,cidx);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(name_idx,cljs.core.inc);

return cidx;
}
})();
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(segv,idx);
} else {
return segv;
}
});
var encode_cols = (function (infos,source_idx,line,col){
var seq__14778 = cljs.core.seq(infos);
var chunk__14779 = null;
var count__14780 = (0);
var i__14781 = (0);
while(true){
if((i__14781 < count__14780)){
var info = chunk__14779.cljs$core$IIndexed$_nth$arity$2(null,i__14781);
var segv_15132 = info__GT_segv(info,source_idx,line,col);
var gline_15133 = cljs.core.cst$kw$gline.cljs$core$IFn$_invoke$arity$1(info);
var lc_15134 = cljs.core.count(cljs.core.deref(lines));
if((gline_15133 > (lc_15134 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__14778,chunk__14779,count__14780,i__14781,segv_15132,gline_15133,lc_15134,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_15133 - (lc_15134 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_15132], null));
});})(seq__14778,chunk__14779,count__14780,i__14781,segv_15132,gline_15133,lc_15134,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__14778,chunk__14779,count__14780,i__14781,segv_15132,gline_15133,lc_15134,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_15133], null),cljs.core.conj,segv_15132);
});})(seq__14778,chunk__14779,count__14780,i__14781,segv_15132,gline_15133,lc_15134,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__15135 = seq__14778;
var G__15136 = chunk__14779;
var G__15137 = count__14780;
var G__15138 = (i__14781 + (1));
seq__14778 = G__15135;
chunk__14779 = G__15136;
count__14780 = G__15137;
i__14781 = G__15138;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__14778);
if(temp__5735__auto__){
var seq__14778__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14778__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__14778__$1);
var G__15139 = cljs.core.chunk_rest(seq__14778__$1);
var G__15140 = c__4550__auto__;
var G__15141 = cljs.core.count(c__4550__auto__);
var G__15142 = (0);
seq__14778 = G__15139;
chunk__14779 = G__15140;
count__14780 = G__15141;
i__14781 = G__15142;
continue;
} else {
var info = cljs.core.first(seq__14778__$1);
var segv_15143 = info__GT_segv(info,source_idx,line,col);
var gline_15144 = cljs.core.cst$kw$gline.cljs$core$IFn$_invoke$arity$1(info);
var lc_15145 = cljs.core.count(cljs.core.deref(lines));
if((gline_15144 > (lc_15145 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__14778,chunk__14779,count__14780,i__14781,segv_15143,gline_15144,lc_15145,info,seq__14778__$1,temp__5735__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_15144 - (lc_15145 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_15143], null));
});})(seq__14778,chunk__14779,count__14780,i__14781,segv_15143,gline_15144,lc_15145,info,seq__14778__$1,temp__5735__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__14778,chunk__14779,count__14780,i__14781,segv_15143,gline_15144,lc_15145,info,seq__14778__$1,temp__5735__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_15144], null),cljs.core.conj,segv_15143);
});})(seq__14778,chunk__14779,count__14780,i__14781,segv_15143,gline_15144,lc_15145,info,seq__14778__$1,temp__5735__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__15146 = cljs.core.next(seq__14778__$1);
var G__15147 = null;
var G__15148 = (0);
var G__15149 = (0);
seq__14778 = G__15146;
chunk__14779 = G__15147;
count__14780 = G__15148;
i__14781 = G__15149;
continue;
}
} else {
return null;
}
}
break;
}
});
var seq__14782_15150 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__14783_15151 = null;
var count__14784_15152 = (0);
var i__14785_15153 = (0);
while(true){
if((i__14785_15153 < count__14784_15152)){
var vec__14958_15154 = chunk__14783_15151.cljs$core$IIndexed$_nth$arity$2(null,i__14785_15153);
var source_idx_15155 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14958_15154,(0),null);
var vec__14961_15156 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14958_15154,(1),null);
var __15157 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14961_15156,(0),null);
var lines_15158__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14961_15156,(1),null);
var seq__14964_15159 = cljs.core.seq(lines_15158__$1);
var chunk__14965_15160 = null;
var count__14966_15161 = (0);
var i__14967_15162 = (0);
while(true){
if((i__14967_15162 < count__14966_15161)){
var vec__15006_15163 = chunk__14965_15160.cljs$core$IIndexed$_nth$arity$2(null,i__14967_15162);
var line_15164 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15006_15163,(0),null);
var cols_15165 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15006_15163,(1),null);
var seq__15009_15166 = cljs.core.seq(cols_15165);
var chunk__15010_15167 = null;
var count__15011_15168 = (0);
var i__15012_15169 = (0);
while(true){
if((i__15012_15169 < count__15011_15168)){
var vec__15019_15170 = chunk__15010_15167.cljs$core$IIndexed$_nth$arity$2(null,i__15012_15169);
var col_15171 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15019_15170,(0),null);
var infos_15172 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15019_15170,(1),null);
encode_cols(infos_15172,source_idx_15155,line_15164,col_15171);


var G__15173 = seq__15009_15166;
var G__15174 = chunk__15010_15167;
var G__15175 = count__15011_15168;
var G__15176 = (i__15012_15169 + (1));
seq__15009_15166 = G__15173;
chunk__15010_15167 = G__15174;
count__15011_15168 = G__15175;
i__15012_15169 = G__15176;
continue;
} else {
var temp__5735__auto___15177 = cljs.core.seq(seq__15009_15166);
if(temp__5735__auto___15177){
var seq__15009_15178__$1 = temp__5735__auto___15177;
if(cljs.core.chunked_seq_QMARK_(seq__15009_15178__$1)){
var c__4550__auto___15179 = cljs.core.chunk_first(seq__15009_15178__$1);
var G__15180 = cljs.core.chunk_rest(seq__15009_15178__$1);
var G__15181 = c__4550__auto___15179;
var G__15182 = cljs.core.count(c__4550__auto___15179);
var G__15183 = (0);
seq__15009_15166 = G__15180;
chunk__15010_15167 = G__15181;
count__15011_15168 = G__15182;
i__15012_15169 = G__15183;
continue;
} else {
var vec__15022_15184 = cljs.core.first(seq__15009_15178__$1);
var col_15185 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15022_15184,(0),null);
var infos_15186 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15022_15184,(1),null);
encode_cols(infos_15186,source_idx_15155,line_15164,col_15185);


var G__15187 = cljs.core.next(seq__15009_15178__$1);
var G__15188 = null;
var G__15189 = (0);
var G__15190 = (0);
seq__15009_15166 = G__15187;
chunk__15010_15167 = G__15188;
count__15011_15168 = G__15189;
i__15012_15169 = G__15190;
continue;
}
} else {
}
}
break;
}


var G__15191 = seq__14964_15159;
var G__15192 = chunk__14965_15160;
var G__15193 = count__14966_15161;
var G__15194 = (i__14967_15162 + (1));
seq__14964_15159 = G__15191;
chunk__14965_15160 = G__15192;
count__14966_15161 = G__15193;
i__14967_15162 = G__15194;
continue;
} else {
var temp__5735__auto___15195 = cljs.core.seq(seq__14964_15159);
if(temp__5735__auto___15195){
var seq__14964_15196__$1 = temp__5735__auto___15195;
if(cljs.core.chunked_seq_QMARK_(seq__14964_15196__$1)){
var c__4550__auto___15197 = cljs.core.chunk_first(seq__14964_15196__$1);
var G__15198 = cljs.core.chunk_rest(seq__14964_15196__$1);
var G__15199 = c__4550__auto___15197;
var G__15200 = cljs.core.count(c__4550__auto___15197);
var G__15201 = (0);
seq__14964_15159 = G__15198;
chunk__14965_15160 = G__15199;
count__14966_15161 = G__15200;
i__14967_15162 = G__15201;
continue;
} else {
var vec__15025_15202 = cljs.core.first(seq__14964_15196__$1);
var line_15203 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15025_15202,(0),null);
var cols_15204 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15025_15202,(1),null);
var seq__15028_15205 = cljs.core.seq(cols_15204);
var chunk__15029_15206 = null;
var count__15030_15207 = (0);
var i__15031_15208 = (0);
while(true){
if((i__15031_15208 < count__15030_15207)){
var vec__15038_15209 = chunk__15029_15206.cljs$core$IIndexed$_nth$arity$2(null,i__15031_15208);
var col_15210 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15038_15209,(0),null);
var infos_15211 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15038_15209,(1),null);
encode_cols(infos_15211,source_idx_15155,line_15203,col_15210);


var G__15212 = seq__15028_15205;
var G__15213 = chunk__15029_15206;
var G__15214 = count__15030_15207;
var G__15215 = (i__15031_15208 + (1));
seq__15028_15205 = G__15212;
chunk__15029_15206 = G__15213;
count__15030_15207 = G__15214;
i__15031_15208 = G__15215;
continue;
} else {
var temp__5735__auto___15216__$1 = cljs.core.seq(seq__15028_15205);
if(temp__5735__auto___15216__$1){
var seq__15028_15217__$1 = temp__5735__auto___15216__$1;
if(cljs.core.chunked_seq_QMARK_(seq__15028_15217__$1)){
var c__4550__auto___15218 = cljs.core.chunk_first(seq__15028_15217__$1);
var G__15219 = cljs.core.chunk_rest(seq__15028_15217__$1);
var G__15220 = c__4550__auto___15218;
var G__15221 = cljs.core.count(c__4550__auto___15218);
var G__15222 = (0);
seq__15028_15205 = G__15219;
chunk__15029_15206 = G__15220;
count__15030_15207 = G__15221;
i__15031_15208 = G__15222;
continue;
} else {
var vec__15041_15223 = cljs.core.first(seq__15028_15217__$1);
var col_15224 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15041_15223,(0),null);
var infos_15225 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15041_15223,(1),null);
encode_cols(infos_15225,source_idx_15155,line_15203,col_15224);


var G__15226 = cljs.core.next(seq__15028_15217__$1);
var G__15227 = null;
var G__15228 = (0);
var G__15229 = (0);
seq__15028_15205 = G__15226;
chunk__15029_15206 = G__15227;
count__15030_15207 = G__15228;
i__15031_15208 = G__15229;
continue;
}
} else {
}
}
break;
}


var G__15230 = cljs.core.next(seq__14964_15196__$1);
var G__15231 = null;
var G__15232 = (0);
var G__15233 = (0);
seq__14964_15159 = G__15230;
chunk__14965_15160 = G__15231;
count__14966_15161 = G__15232;
i__14967_15162 = G__15233;
continue;
}
} else {
}
}
break;
}


var G__15234 = seq__14782_15150;
var G__15235 = chunk__14783_15151;
var G__15236 = count__14784_15152;
var G__15237 = (i__14785_15153 + (1));
seq__14782_15150 = G__15234;
chunk__14783_15151 = G__15235;
count__14784_15152 = G__15236;
i__14785_15153 = G__15237;
continue;
} else {
var temp__5735__auto___15238 = cljs.core.seq(seq__14782_15150);
if(temp__5735__auto___15238){
var seq__14782_15239__$1 = temp__5735__auto___15238;
if(cljs.core.chunked_seq_QMARK_(seq__14782_15239__$1)){
var c__4550__auto___15240 = cljs.core.chunk_first(seq__14782_15239__$1);
var G__15241 = cljs.core.chunk_rest(seq__14782_15239__$1);
var G__15242 = c__4550__auto___15240;
var G__15243 = cljs.core.count(c__4550__auto___15240);
var G__15244 = (0);
seq__14782_15150 = G__15241;
chunk__14783_15151 = G__15242;
count__14784_15152 = G__15243;
i__14785_15153 = G__15244;
continue;
} else {
var vec__15044_15245 = cljs.core.first(seq__14782_15239__$1);
var source_idx_15246 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15044_15245,(0),null);
var vec__15047_15247 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15044_15245,(1),null);
var __15248 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15047_15247,(0),null);
var lines_15249__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15047_15247,(1),null);
var seq__15050_15250 = cljs.core.seq(lines_15249__$1);
var chunk__15051_15251 = null;
var count__15052_15252 = (0);
var i__15053_15253 = (0);
while(true){
if((i__15053_15253 < count__15052_15252)){
var vec__15092_15254 = chunk__15051_15251.cljs$core$IIndexed$_nth$arity$2(null,i__15053_15253);
var line_15255 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15092_15254,(0),null);
var cols_15256 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15092_15254,(1),null);
var seq__15095_15257 = cljs.core.seq(cols_15256);
var chunk__15096_15258 = null;
var count__15097_15259 = (0);
var i__15098_15260 = (0);
while(true){
if((i__15098_15260 < count__15097_15259)){
var vec__15105_15261 = chunk__15096_15258.cljs$core$IIndexed$_nth$arity$2(null,i__15098_15260);
var col_15262 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15105_15261,(0),null);
var infos_15263 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15105_15261,(1),null);
encode_cols(infos_15263,source_idx_15246,line_15255,col_15262);


var G__15264 = seq__15095_15257;
var G__15265 = chunk__15096_15258;
var G__15266 = count__15097_15259;
var G__15267 = (i__15098_15260 + (1));
seq__15095_15257 = G__15264;
chunk__15096_15258 = G__15265;
count__15097_15259 = G__15266;
i__15098_15260 = G__15267;
continue;
} else {
var temp__5735__auto___15268__$1 = cljs.core.seq(seq__15095_15257);
if(temp__5735__auto___15268__$1){
var seq__15095_15269__$1 = temp__5735__auto___15268__$1;
if(cljs.core.chunked_seq_QMARK_(seq__15095_15269__$1)){
var c__4550__auto___15270 = cljs.core.chunk_first(seq__15095_15269__$1);
var G__15271 = cljs.core.chunk_rest(seq__15095_15269__$1);
var G__15272 = c__4550__auto___15270;
var G__15273 = cljs.core.count(c__4550__auto___15270);
var G__15274 = (0);
seq__15095_15257 = G__15271;
chunk__15096_15258 = G__15272;
count__15097_15259 = G__15273;
i__15098_15260 = G__15274;
continue;
} else {
var vec__15108_15275 = cljs.core.first(seq__15095_15269__$1);
var col_15276 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15108_15275,(0),null);
var infos_15277 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15108_15275,(1),null);
encode_cols(infos_15277,source_idx_15246,line_15255,col_15276);


var G__15278 = cljs.core.next(seq__15095_15269__$1);
var G__15279 = null;
var G__15280 = (0);
var G__15281 = (0);
seq__15095_15257 = G__15278;
chunk__15096_15258 = G__15279;
count__15097_15259 = G__15280;
i__15098_15260 = G__15281;
continue;
}
} else {
}
}
break;
}


var G__15282 = seq__15050_15250;
var G__15283 = chunk__15051_15251;
var G__15284 = count__15052_15252;
var G__15285 = (i__15053_15253 + (1));
seq__15050_15250 = G__15282;
chunk__15051_15251 = G__15283;
count__15052_15252 = G__15284;
i__15053_15253 = G__15285;
continue;
} else {
var temp__5735__auto___15286__$1 = cljs.core.seq(seq__15050_15250);
if(temp__5735__auto___15286__$1){
var seq__15050_15287__$1 = temp__5735__auto___15286__$1;
if(cljs.core.chunked_seq_QMARK_(seq__15050_15287__$1)){
var c__4550__auto___15288 = cljs.core.chunk_first(seq__15050_15287__$1);
var G__15289 = cljs.core.chunk_rest(seq__15050_15287__$1);
var G__15290 = c__4550__auto___15288;
var G__15291 = cljs.core.count(c__4550__auto___15288);
var G__15292 = (0);
seq__15050_15250 = G__15289;
chunk__15051_15251 = G__15290;
count__15052_15252 = G__15291;
i__15053_15253 = G__15292;
continue;
} else {
var vec__15111_15293 = cljs.core.first(seq__15050_15287__$1);
var line_15294 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15111_15293,(0),null);
var cols_15295 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15111_15293,(1),null);
var seq__15114_15296 = cljs.core.seq(cols_15295);
var chunk__15115_15297 = null;
var count__15116_15298 = (0);
var i__15117_15299 = (0);
while(true){
if((i__15117_15299 < count__15116_15298)){
var vec__15124_15300 = chunk__15115_15297.cljs$core$IIndexed$_nth$arity$2(null,i__15117_15299);
var col_15301 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15124_15300,(0),null);
var infos_15302 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15124_15300,(1),null);
encode_cols(infos_15302,source_idx_15246,line_15294,col_15301);


var G__15303 = seq__15114_15296;
var G__15304 = chunk__15115_15297;
var G__15305 = count__15116_15298;
var G__15306 = (i__15117_15299 + (1));
seq__15114_15296 = G__15303;
chunk__15115_15297 = G__15304;
count__15116_15298 = G__15305;
i__15117_15299 = G__15306;
continue;
} else {
var temp__5735__auto___15307__$2 = cljs.core.seq(seq__15114_15296);
if(temp__5735__auto___15307__$2){
var seq__15114_15308__$1 = temp__5735__auto___15307__$2;
if(cljs.core.chunked_seq_QMARK_(seq__15114_15308__$1)){
var c__4550__auto___15309 = cljs.core.chunk_first(seq__15114_15308__$1);
var G__15310 = cljs.core.chunk_rest(seq__15114_15308__$1);
var G__15311 = c__4550__auto___15309;
var G__15312 = cljs.core.count(c__4550__auto___15309);
var G__15313 = (0);
seq__15114_15296 = G__15310;
chunk__15115_15297 = G__15311;
count__15116_15298 = G__15312;
i__15117_15299 = G__15313;
continue;
} else {
var vec__15127_15314 = cljs.core.first(seq__15114_15308__$1);
var col_15315 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15127_15314,(0),null);
var infos_15316 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15127_15314,(1),null);
encode_cols(infos_15316,source_idx_15246,line_15294,col_15315);


var G__15317 = cljs.core.next(seq__15114_15308__$1);
var G__15318 = null;
var G__15319 = (0);
var G__15320 = (0);
seq__15114_15296 = G__15317;
chunk__15115_15297 = G__15318;
count__15116_15298 = G__15319;
i__15117_15299 = G__15320;
continue;
}
} else {
}
}
break;
}


var G__15321 = cljs.core.next(seq__15050_15287__$1);
var G__15322 = null;
var G__15323 = (0);
var G__15324 = (0);
seq__15050_15250 = G__15321;
chunk__15051_15251 = G__15322;
count__15052_15252 = G__15323;
i__15053_15253 = G__15324;
continue;
}
} else {
}
}
break;
}


var G__15325 = cljs.core.next(seq__14782_15239__$1);
var G__15326 = null;
var G__15327 = (0);
var G__15328 = (0);
seq__14782_15150 = G__15325;
chunk__14783_15151 = G__15326;
count__14784_15152 = G__15327;
i__14785_15153 = G__15328;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__15130 = ({"version": (3), "file": cljs.core.cst$kw$file.cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys(m);
var f = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((cljs.core.cst$kw$source_DASH_map_DASH_timestamp.cljs$core$IFn$_invoke$arity$1(opts) === true)?(function (p1__14775_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__14775_SHARP_),"?rel=",cljs.core.str.cljs$core$IFn$_invoke$arity$1((new Date()).valueOf())].join('');
}):cljs.core.identity),(function (p1__14776_SHARP_){
return cljs.core.last(clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__14776_SHARP_,/\//));
}));
return cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,paths));
})(), "lineCount": cljs.core.cst$kw$lines.cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.cljs$core$IFn$_invoke$arity$2(";",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__14777_SHARP_){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",p1__14777_SHARP_);
}),cljs.source_map.lines__GT_segs(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(preamble_lines,cljs.core.deref(lines))))), "names": cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.set.map_invert(cljs.core.deref(names__GT_idx)),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.deref(names__GT_idx)))))});
if(cljs.core.truth_(cljs.core.cst$kw$sources_DASH_content.cljs$core$IFn$_invoke$arity$1(opts))){
var G__15131 = G__15130;
goog.object.set(G__15131,"sourcesContent",cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sources_DASH_content.cljs$core$IFn$_invoke$arity$1(opts)));

return G__15131;
} else {
return G__15130;
}
})();
return JSON.stringify(source_map_file_contents);
});
/**
 * Merge an internal source map representation of a single
 * ClojureScript file mapping original to generated with a
 * second source map mapping original JS to generated JS.
 * The is to support source maps that work through multiple
 * compilation steps like Google Closure optimization passes.
 */
cljs.source_map.merge_source_maps = (function cljs$source_map$merge_source_maps(cljs_map,js_map){
var line_map_seq = cljs.core.seq(cljs_map);
var new_lines = cljs.core.sorted_map();
while(true){
if(line_map_seq){
var vec__15329 = cljs.core.first(line_map_seq);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15329,(0),null);
var col_map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15329,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq(col_map);
var new_cols = cljs.core.sorted_map();
while(true){
if(col_map_seq){
var vec__15332 = cljs.core.first(col_map_seq);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15332,(0),null);
var infos = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15332,(1),null);
var G__15338 = cljs.core.next(col_map_seq);
var G__15339 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_cols,col,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__15332,col,infos,vec__15329,line,col_map){
return (function (v,p__15335){
var map__15336 = p__15335;
var map__15336__$1 = (((((!((map__15336 == null))))?(((((map__15336.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15336.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15336):map__15336);
var gline = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15336__$1,cljs.core.cst$kw$gline);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15336__$1,cljs.core.cst$kw$gcol);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__15332,col,infos,vec__15329,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__15338;
new_cols = G__15339;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__15340 = cljs.core.next(line_map_seq);
var G__15341 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_lines,line,new_cols);
line_map_seq = G__15340;
new_lines = G__15341;
continue;
} else {
return new_lines;
}
break;
}
});
/**
 * Given a ClojureScript to JavaScript source map, invert it. Useful when
 * mapping JavaScript stack traces when environment support is unavailable.
 */
cljs.source_map.invert_reverse_map = (function cljs$source_map$invert_reverse_map(reverse_map){
var inverted = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.sorted_map());
var seq__15342_15614 = cljs.core.seq(reverse_map);
var chunk__15343_15615 = null;
var count__15344_15616 = (0);
var i__15345_15617 = (0);
while(true){
if((i__15345_15617 < count__15344_15616)){
var vec__15480_15618 = chunk__15343_15615.cljs$core$IIndexed$_nth$arity$2(null,i__15345_15617);
var line_15619 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15480_15618,(0),null);
var columns_15620 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15480_15618,(1),null);
var seq__15483_15621 = cljs.core.seq(columns_15620);
var chunk__15484_15622 = null;
var count__15485_15623 = (0);
var i__15486_15624 = (0);
while(true){
if((i__15486_15624 < count__15485_15623)){
var vec__15517_15625 = chunk__15484_15622.cljs$core$IIndexed$_nth$arity$2(null,i__15486_15624);
var column_15626 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15517_15625,(0),null);
var column_info_15627 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15517_15625,(1),null);
var seq__15520_15628 = cljs.core.seq(column_info_15627);
var chunk__15521_15629 = null;
var count__15522_15630 = (0);
var i__15523_15631 = (0);
while(true){
if((i__15523_15631 < count__15522_15630)){
var map__15528_15632 = chunk__15521_15629.cljs$core$IIndexed$_nth$arity$2(null,i__15523_15631);
var map__15528_15633__$1 = (((((!((map__15528_15632 == null))))?(((((map__15528_15632.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15528_15632.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15528_15632):map__15528_15632);
var gline_15634 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15528_15633__$1,cljs.core.cst$kw$gline);
var gcol_15635 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15528_15633__$1,cljs.core.cst$kw$gcol);
var name_15636 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15528_15633__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_15634], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__15520_15628,chunk__15521_15629,count__15522_15630,i__15523_15631,seq__15483_15621,chunk__15484_15622,count__15485_15623,i__15486_15624,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15528_15632,map__15528_15633__$1,gline_15634,gcol_15635,name_15636,vec__15517_15625,column_15626,column_info_15627,vec__15480_15618,line_15619,columns_15620,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_15635], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_15619,cljs.core.cst$kw$col,column_15626,cljs.core.cst$kw$name,name_15636], null));
});})(seq__15520_15628,chunk__15521_15629,count__15522_15630,i__15523_15631,seq__15483_15621,chunk__15484_15622,count__15485_15623,i__15486_15624,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15528_15632,map__15528_15633__$1,gline_15634,gcol_15635,name_15636,vec__15517_15625,column_15626,column_info_15627,vec__15480_15618,line_15619,columns_15620,inverted))
,cljs.core.sorted_map()));


var G__15637 = seq__15520_15628;
var G__15638 = chunk__15521_15629;
var G__15639 = count__15522_15630;
var G__15640 = (i__15523_15631 + (1));
seq__15520_15628 = G__15637;
chunk__15521_15629 = G__15638;
count__15522_15630 = G__15639;
i__15523_15631 = G__15640;
continue;
} else {
var temp__5735__auto___15641 = cljs.core.seq(seq__15520_15628);
if(temp__5735__auto___15641){
var seq__15520_15642__$1 = temp__5735__auto___15641;
if(cljs.core.chunked_seq_QMARK_(seq__15520_15642__$1)){
var c__4550__auto___15643 = cljs.core.chunk_first(seq__15520_15642__$1);
var G__15644 = cljs.core.chunk_rest(seq__15520_15642__$1);
var G__15645 = c__4550__auto___15643;
var G__15646 = cljs.core.count(c__4550__auto___15643);
var G__15647 = (0);
seq__15520_15628 = G__15644;
chunk__15521_15629 = G__15645;
count__15522_15630 = G__15646;
i__15523_15631 = G__15647;
continue;
} else {
var map__15530_15648 = cljs.core.first(seq__15520_15642__$1);
var map__15530_15649__$1 = (((((!((map__15530_15648 == null))))?(((((map__15530_15648.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15530_15648.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15530_15648):map__15530_15648);
var gline_15650 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15530_15649__$1,cljs.core.cst$kw$gline);
var gcol_15651 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15530_15649__$1,cljs.core.cst$kw$gcol);
var name_15652 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15530_15649__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_15650], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__15520_15628,chunk__15521_15629,count__15522_15630,i__15523_15631,seq__15483_15621,chunk__15484_15622,count__15485_15623,i__15486_15624,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15530_15648,map__15530_15649__$1,gline_15650,gcol_15651,name_15652,seq__15520_15642__$1,temp__5735__auto___15641,vec__15517_15625,column_15626,column_info_15627,vec__15480_15618,line_15619,columns_15620,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_15651], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_15619,cljs.core.cst$kw$col,column_15626,cljs.core.cst$kw$name,name_15652], null));
});})(seq__15520_15628,chunk__15521_15629,count__15522_15630,i__15523_15631,seq__15483_15621,chunk__15484_15622,count__15485_15623,i__15486_15624,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15530_15648,map__15530_15649__$1,gline_15650,gcol_15651,name_15652,seq__15520_15642__$1,temp__5735__auto___15641,vec__15517_15625,column_15626,column_info_15627,vec__15480_15618,line_15619,columns_15620,inverted))
,cljs.core.sorted_map()));


var G__15653 = cljs.core.next(seq__15520_15642__$1);
var G__15654 = null;
var G__15655 = (0);
var G__15656 = (0);
seq__15520_15628 = G__15653;
chunk__15521_15629 = G__15654;
count__15522_15630 = G__15655;
i__15523_15631 = G__15656;
continue;
}
} else {
}
}
break;
}


var G__15657 = seq__15483_15621;
var G__15658 = chunk__15484_15622;
var G__15659 = count__15485_15623;
var G__15660 = (i__15486_15624 + (1));
seq__15483_15621 = G__15657;
chunk__15484_15622 = G__15658;
count__15485_15623 = G__15659;
i__15486_15624 = G__15660;
continue;
} else {
var temp__5735__auto___15661 = cljs.core.seq(seq__15483_15621);
if(temp__5735__auto___15661){
var seq__15483_15662__$1 = temp__5735__auto___15661;
if(cljs.core.chunked_seq_QMARK_(seq__15483_15662__$1)){
var c__4550__auto___15663 = cljs.core.chunk_first(seq__15483_15662__$1);
var G__15664 = cljs.core.chunk_rest(seq__15483_15662__$1);
var G__15665 = c__4550__auto___15663;
var G__15666 = cljs.core.count(c__4550__auto___15663);
var G__15667 = (0);
seq__15483_15621 = G__15664;
chunk__15484_15622 = G__15665;
count__15485_15623 = G__15666;
i__15486_15624 = G__15667;
continue;
} else {
var vec__15532_15668 = cljs.core.first(seq__15483_15662__$1);
var column_15669 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15532_15668,(0),null);
var column_info_15670 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15532_15668,(1),null);
var seq__15535_15671 = cljs.core.seq(column_info_15670);
var chunk__15536_15672 = null;
var count__15537_15673 = (0);
var i__15538_15674 = (0);
while(true){
if((i__15538_15674 < count__15537_15673)){
var map__15543_15675 = chunk__15536_15672.cljs$core$IIndexed$_nth$arity$2(null,i__15538_15674);
var map__15543_15676__$1 = (((((!((map__15543_15675 == null))))?(((((map__15543_15675.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15543_15675.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15543_15675):map__15543_15675);
var gline_15677 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15543_15676__$1,cljs.core.cst$kw$gline);
var gcol_15678 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15543_15676__$1,cljs.core.cst$kw$gcol);
var name_15679 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15543_15676__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_15677], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__15535_15671,chunk__15536_15672,count__15537_15673,i__15538_15674,seq__15483_15621,chunk__15484_15622,count__15485_15623,i__15486_15624,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15543_15675,map__15543_15676__$1,gline_15677,gcol_15678,name_15679,vec__15532_15668,column_15669,column_info_15670,seq__15483_15662__$1,temp__5735__auto___15661,vec__15480_15618,line_15619,columns_15620,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_15678], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_15619,cljs.core.cst$kw$col,column_15669,cljs.core.cst$kw$name,name_15679], null));
});})(seq__15535_15671,chunk__15536_15672,count__15537_15673,i__15538_15674,seq__15483_15621,chunk__15484_15622,count__15485_15623,i__15486_15624,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15543_15675,map__15543_15676__$1,gline_15677,gcol_15678,name_15679,vec__15532_15668,column_15669,column_info_15670,seq__15483_15662__$1,temp__5735__auto___15661,vec__15480_15618,line_15619,columns_15620,inverted))
,cljs.core.sorted_map()));


var G__15680 = seq__15535_15671;
var G__15681 = chunk__15536_15672;
var G__15682 = count__15537_15673;
var G__15683 = (i__15538_15674 + (1));
seq__15535_15671 = G__15680;
chunk__15536_15672 = G__15681;
count__15537_15673 = G__15682;
i__15538_15674 = G__15683;
continue;
} else {
var temp__5735__auto___15684__$1 = cljs.core.seq(seq__15535_15671);
if(temp__5735__auto___15684__$1){
var seq__15535_15685__$1 = temp__5735__auto___15684__$1;
if(cljs.core.chunked_seq_QMARK_(seq__15535_15685__$1)){
var c__4550__auto___15686 = cljs.core.chunk_first(seq__15535_15685__$1);
var G__15687 = cljs.core.chunk_rest(seq__15535_15685__$1);
var G__15688 = c__4550__auto___15686;
var G__15689 = cljs.core.count(c__4550__auto___15686);
var G__15690 = (0);
seq__15535_15671 = G__15687;
chunk__15536_15672 = G__15688;
count__15537_15673 = G__15689;
i__15538_15674 = G__15690;
continue;
} else {
var map__15545_15691 = cljs.core.first(seq__15535_15685__$1);
var map__15545_15692__$1 = (((((!((map__15545_15691 == null))))?(((((map__15545_15691.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15545_15691.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15545_15691):map__15545_15691);
var gline_15693 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15545_15692__$1,cljs.core.cst$kw$gline);
var gcol_15694 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15545_15692__$1,cljs.core.cst$kw$gcol);
var name_15695 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15545_15692__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_15693], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__15535_15671,chunk__15536_15672,count__15537_15673,i__15538_15674,seq__15483_15621,chunk__15484_15622,count__15485_15623,i__15486_15624,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15545_15691,map__15545_15692__$1,gline_15693,gcol_15694,name_15695,seq__15535_15685__$1,temp__5735__auto___15684__$1,vec__15532_15668,column_15669,column_info_15670,seq__15483_15662__$1,temp__5735__auto___15661,vec__15480_15618,line_15619,columns_15620,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_15694], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_15619,cljs.core.cst$kw$col,column_15669,cljs.core.cst$kw$name,name_15695], null));
});})(seq__15535_15671,chunk__15536_15672,count__15537_15673,i__15538_15674,seq__15483_15621,chunk__15484_15622,count__15485_15623,i__15486_15624,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15545_15691,map__15545_15692__$1,gline_15693,gcol_15694,name_15695,seq__15535_15685__$1,temp__5735__auto___15684__$1,vec__15532_15668,column_15669,column_info_15670,seq__15483_15662__$1,temp__5735__auto___15661,vec__15480_15618,line_15619,columns_15620,inverted))
,cljs.core.sorted_map()));


var G__15696 = cljs.core.next(seq__15535_15685__$1);
var G__15697 = null;
var G__15698 = (0);
var G__15699 = (0);
seq__15535_15671 = G__15696;
chunk__15536_15672 = G__15697;
count__15537_15673 = G__15698;
i__15538_15674 = G__15699;
continue;
}
} else {
}
}
break;
}


var G__15700 = cljs.core.next(seq__15483_15662__$1);
var G__15701 = null;
var G__15702 = (0);
var G__15703 = (0);
seq__15483_15621 = G__15700;
chunk__15484_15622 = G__15701;
count__15485_15623 = G__15702;
i__15486_15624 = G__15703;
continue;
}
} else {
}
}
break;
}


var G__15704 = seq__15342_15614;
var G__15705 = chunk__15343_15615;
var G__15706 = count__15344_15616;
var G__15707 = (i__15345_15617 + (1));
seq__15342_15614 = G__15704;
chunk__15343_15615 = G__15705;
count__15344_15616 = G__15706;
i__15345_15617 = G__15707;
continue;
} else {
var temp__5735__auto___15708 = cljs.core.seq(seq__15342_15614);
if(temp__5735__auto___15708){
var seq__15342_15709__$1 = temp__5735__auto___15708;
if(cljs.core.chunked_seq_QMARK_(seq__15342_15709__$1)){
var c__4550__auto___15710 = cljs.core.chunk_first(seq__15342_15709__$1);
var G__15711 = cljs.core.chunk_rest(seq__15342_15709__$1);
var G__15712 = c__4550__auto___15710;
var G__15713 = cljs.core.count(c__4550__auto___15710);
var G__15714 = (0);
seq__15342_15614 = G__15711;
chunk__15343_15615 = G__15712;
count__15344_15616 = G__15713;
i__15345_15617 = G__15714;
continue;
} else {
var vec__15547_15715 = cljs.core.first(seq__15342_15709__$1);
var line_15716 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15547_15715,(0),null);
var columns_15717 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15547_15715,(1),null);
var seq__15550_15718 = cljs.core.seq(columns_15717);
var chunk__15551_15719 = null;
var count__15552_15720 = (0);
var i__15553_15721 = (0);
while(true){
if((i__15553_15721 < count__15552_15720)){
var vec__15584_15722 = chunk__15551_15719.cljs$core$IIndexed$_nth$arity$2(null,i__15553_15721);
var column_15723 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15584_15722,(0),null);
var column_info_15724 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15584_15722,(1),null);
var seq__15587_15725 = cljs.core.seq(column_info_15724);
var chunk__15588_15726 = null;
var count__15589_15727 = (0);
var i__15590_15728 = (0);
while(true){
if((i__15590_15728 < count__15589_15727)){
var map__15595_15729 = chunk__15588_15726.cljs$core$IIndexed$_nth$arity$2(null,i__15590_15728);
var map__15595_15730__$1 = (((((!((map__15595_15729 == null))))?(((((map__15595_15729.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15595_15729.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15595_15729):map__15595_15729);
var gline_15731 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15595_15730__$1,cljs.core.cst$kw$gline);
var gcol_15732 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15595_15730__$1,cljs.core.cst$kw$gcol);
var name_15733 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15595_15730__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_15731], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__15587_15725,chunk__15588_15726,count__15589_15727,i__15590_15728,seq__15550_15718,chunk__15551_15719,count__15552_15720,i__15553_15721,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15595_15729,map__15595_15730__$1,gline_15731,gcol_15732,name_15733,vec__15584_15722,column_15723,column_info_15724,vec__15547_15715,line_15716,columns_15717,seq__15342_15709__$1,temp__5735__auto___15708,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_15732], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_15716,cljs.core.cst$kw$col,column_15723,cljs.core.cst$kw$name,name_15733], null));
});})(seq__15587_15725,chunk__15588_15726,count__15589_15727,i__15590_15728,seq__15550_15718,chunk__15551_15719,count__15552_15720,i__15553_15721,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15595_15729,map__15595_15730__$1,gline_15731,gcol_15732,name_15733,vec__15584_15722,column_15723,column_info_15724,vec__15547_15715,line_15716,columns_15717,seq__15342_15709__$1,temp__5735__auto___15708,inverted))
,cljs.core.sorted_map()));


var G__15734 = seq__15587_15725;
var G__15735 = chunk__15588_15726;
var G__15736 = count__15589_15727;
var G__15737 = (i__15590_15728 + (1));
seq__15587_15725 = G__15734;
chunk__15588_15726 = G__15735;
count__15589_15727 = G__15736;
i__15590_15728 = G__15737;
continue;
} else {
var temp__5735__auto___15738__$1 = cljs.core.seq(seq__15587_15725);
if(temp__5735__auto___15738__$1){
var seq__15587_15739__$1 = temp__5735__auto___15738__$1;
if(cljs.core.chunked_seq_QMARK_(seq__15587_15739__$1)){
var c__4550__auto___15740 = cljs.core.chunk_first(seq__15587_15739__$1);
var G__15741 = cljs.core.chunk_rest(seq__15587_15739__$1);
var G__15742 = c__4550__auto___15740;
var G__15743 = cljs.core.count(c__4550__auto___15740);
var G__15744 = (0);
seq__15587_15725 = G__15741;
chunk__15588_15726 = G__15742;
count__15589_15727 = G__15743;
i__15590_15728 = G__15744;
continue;
} else {
var map__15597_15745 = cljs.core.first(seq__15587_15739__$1);
var map__15597_15746__$1 = (((((!((map__15597_15745 == null))))?(((((map__15597_15745.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15597_15745.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15597_15745):map__15597_15745);
var gline_15747 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15597_15746__$1,cljs.core.cst$kw$gline);
var gcol_15748 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15597_15746__$1,cljs.core.cst$kw$gcol);
var name_15749 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15597_15746__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_15747], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__15587_15725,chunk__15588_15726,count__15589_15727,i__15590_15728,seq__15550_15718,chunk__15551_15719,count__15552_15720,i__15553_15721,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15597_15745,map__15597_15746__$1,gline_15747,gcol_15748,name_15749,seq__15587_15739__$1,temp__5735__auto___15738__$1,vec__15584_15722,column_15723,column_info_15724,vec__15547_15715,line_15716,columns_15717,seq__15342_15709__$1,temp__5735__auto___15708,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_15748], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_15716,cljs.core.cst$kw$col,column_15723,cljs.core.cst$kw$name,name_15749], null));
});})(seq__15587_15725,chunk__15588_15726,count__15589_15727,i__15590_15728,seq__15550_15718,chunk__15551_15719,count__15552_15720,i__15553_15721,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15597_15745,map__15597_15746__$1,gline_15747,gcol_15748,name_15749,seq__15587_15739__$1,temp__5735__auto___15738__$1,vec__15584_15722,column_15723,column_info_15724,vec__15547_15715,line_15716,columns_15717,seq__15342_15709__$1,temp__5735__auto___15708,inverted))
,cljs.core.sorted_map()));


var G__15750 = cljs.core.next(seq__15587_15739__$1);
var G__15751 = null;
var G__15752 = (0);
var G__15753 = (0);
seq__15587_15725 = G__15750;
chunk__15588_15726 = G__15751;
count__15589_15727 = G__15752;
i__15590_15728 = G__15753;
continue;
}
} else {
}
}
break;
}


var G__15754 = seq__15550_15718;
var G__15755 = chunk__15551_15719;
var G__15756 = count__15552_15720;
var G__15757 = (i__15553_15721 + (1));
seq__15550_15718 = G__15754;
chunk__15551_15719 = G__15755;
count__15552_15720 = G__15756;
i__15553_15721 = G__15757;
continue;
} else {
var temp__5735__auto___15758__$1 = cljs.core.seq(seq__15550_15718);
if(temp__5735__auto___15758__$1){
var seq__15550_15759__$1 = temp__5735__auto___15758__$1;
if(cljs.core.chunked_seq_QMARK_(seq__15550_15759__$1)){
var c__4550__auto___15760 = cljs.core.chunk_first(seq__15550_15759__$1);
var G__15761 = cljs.core.chunk_rest(seq__15550_15759__$1);
var G__15762 = c__4550__auto___15760;
var G__15763 = cljs.core.count(c__4550__auto___15760);
var G__15764 = (0);
seq__15550_15718 = G__15761;
chunk__15551_15719 = G__15762;
count__15552_15720 = G__15763;
i__15553_15721 = G__15764;
continue;
} else {
var vec__15599_15765 = cljs.core.first(seq__15550_15759__$1);
var column_15766 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15599_15765,(0),null);
var column_info_15767 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15599_15765,(1),null);
var seq__15602_15768 = cljs.core.seq(column_info_15767);
var chunk__15603_15769 = null;
var count__15604_15770 = (0);
var i__15605_15771 = (0);
while(true){
if((i__15605_15771 < count__15604_15770)){
var map__15610_15772 = chunk__15603_15769.cljs$core$IIndexed$_nth$arity$2(null,i__15605_15771);
var map__15610_15773__$1 = (((((!((map__15610_15772 == null))))?(((((map__15610_15772.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15610_15772.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15610_15772):map__15610_15772);
var gline_15774 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15610_15773__$1,cljs.core.cst$kw$gline);
var gcol_15775 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15610_15773__$1,cljs.core.cst$kw$gcol);
var name_15776 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15610_15773__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_15774], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__15602_15768,chunk__15603_15769,count__15604_15770,i__15605_15771,seq__15550_15718,chunk__15551_15719,count__15552_15720,i__15553_15721,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15610_15772,map__15610_15773__$1,gline_15774,gcol_15775,name_15776,vec__15599_15765,column_15766,column_info_15767,seq__15550_15759__$1,temp__5735__auto___15758__$1,vec__15547_15715,line_15716,columns_15717,seq__15342_15709__$1,temp__5735__auto___15708,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_15775], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_15716,cljs.core.cst$kw$col,column_15766,cljs.core.cst$kw$name,name_15776], null));
});})(seq__15602_15768,chunk__15603_15769,count__15604_15770,i__15605_15771,seq__15550_15718,chunk__15551_15719,count__15552_15720,i__15553_15721,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15610_15772,map__15610_15773__$1,gline_15774,gcol_15775,name_15776,vec__15599_15765,column_15766,column_info_15767,seq__15550_15759__$1,temp__5735__auto___15758__$1,vec__15547_15715,line_15716,columns_15717,seq__15342_15709__$1,temp__5735__auto___15708,inverted))
,cljs.core.sorted_map()));


var G__15777 = seq__15602_15768;
var G__15778 = chunk__15603_15769;
var G__15779 = count__15604_15770;
var G__15780 = (i__15605_15771 + (1));
seq__15602_15768 = G__15777;
chunk__15603_15769 = G__15778;
count__15604_15770 = G__15779;
i__15605_15771 = G__15780;
continue;
} else {
var temp__5735__auto___15781__$2 = cljs.core.seq(seq__15602_15768);
if(temp__5735__auto___15781__$2){
var seq__15602_15782__$1 = temp__5735__auto___15781__$2;
if(cljs.core.chunked_seq_QMARK_(seq__15602_15782__$1)){
var c__4550__auto___15783 = cljs.core.chunk_first(seq__15602_15782__$1);
var G__15784 = cljs.core.chunk_rest(seq__15602_15782__$1);
var G__15785 = c__4550__auto___15783;
var G__15786 = cljs.core.count(c__4550__auto___15783);
var G__15787 = (0);
seq__15602_15768 = G__15784;
chunk__15603_15769 = G__15785;
count__15604_15770 = G__15786;
i__15605_15771 = G__15787;
continue;
} else {
var map__15612_15788 = cljs.core.first(seq__15602_15782__$1);
var map__15612_15789__$1 = (((((!((map__15612_15788 == null))))?(((((map__15612_15788.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15612_15788.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15612_15788):map__15612_15788);
var gline_15790 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15612_15789__$1,cljs.core.cst$kw$gline);
var gcol_15791 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15612_15789__$1,cljs.core.cst$kw$gcol);
var name_15792 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15612_15789__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_15790], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__15602_15768,chunk__15603_15769,count__15604_15770,i__15605_15771,seq__15550_15718,chunk__15551_15719,count__15552_15720,i__15553_15721,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15612_15788,map__15612_15789__$1,gline_15790,gcol_15791,name_15792,seq__15602_15782__$1,temp__5735__auto___15781__$2,vec__15599_15765,column_15766,column_info_15767,seq__15550_15759__$1,temp__5735__auto___15758__$1,vec__15547_15715,line_15716,columns_15717,seq__15342_15709__$1,temp__5735__auto___15708,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_15791], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_15716,cljs.core.cst$kw$col,column_15766,cljs.core.cst$kw$name,name_15792], null));
});})(seq__15602_15768,chunk__15603_15769,count__15604_15770,i__15605_15771,seq__15550_15718,chunk__15551_15719,count__15552_15720,i__15553_15721,seq__15342_15614,chunk__15343_15615,count__15344_15616,i__15345_15617,map__15612_15788,map__15612_15789__$1,gline_15790,gcol_15791,name_15792,seq__15602_15782__$1,temp__5735__auto___15781__$2,vec__15599_15765,column_15766,column_info_15767,seq__15550_15759__$1,temp__5735__auto___15758__$1,vec__15547_15715,line_15716,columns_15717,seq__15342_15709__$1,temp__5735__auto___15708,inverted))
,cljs.core.sorted_map()));


var G__15793 = cljs.core.next(seq__15602_15782__$1);
var G__15794 = null;
var G__15795 = (0);
var G__15796 = (0);
seq__15602_15768 = G__15793;
chunk__15603_15769 = G__15794;
count__15604_15770 = G__15795;
i__15605_15771 = G__15796;
continue;
}
} else {
}
}
break;
}


var G__15797 = cljs.core.next(seq__15550_15759__$1);
var G__15798 = null;
var G__15799 = (0);
var G__15800 = (0);
seq__15550_15718 = G__15797;
chunk__15551_15719 = G__15798;
count__15552_15720 = G__15799;
i__15553_15721 = G__15800;
continue;
}
} else {
}
}
break;
}


var G__15801 = cljs.core.next(seq__15342_15709__$1);
var G__15802 = null;
var G__15803 = (0);
var G__15804 = (0);
seq__15342_15614 = G__15801;
chunk__15343_15615 = G__15802;
count__15344_15616 = G__15803;
i__15345_15617 = G__15804;
continue;
}
} else {
}
}
break;
}

return cljs.core.deref(inverted);
});
