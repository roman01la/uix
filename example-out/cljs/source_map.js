// Compiled by ClojureScript 1.10.520 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
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
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,p__16623){
var vec__16624 = p__16623;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16624,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16624,(1),null);
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
return ((function (sources__$1){
return (function (a,b){
return cljs.core.compare((sources__$1.cljs$core$IFn$_invoke$arity$1 ? sources__$1.cljs$core$IFn$_invoke$arity$1(a) : sources__$1(a)),(sources__$1.cljs$core$IFn$_invoke$arity$1 ? sources__$1.cljs$core$IFn$_invoke$arity$1(b) : sources__$1(b)));
});
;})(sources__$1))
});
/**
 * Take a source map segment represented as a vector
 * and return a map.
 */
cljs.source_map.seg__GT_map = (function cljs$source_map$seg__GT_map(seg,source_map){
var vec__16627 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16627,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16627,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16627,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16627,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16627,(4),null);
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
var vec__16630 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16630,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16630,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16630,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16630,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16630,(4),null);
var vec__16633 = relseg;
var rgcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16633,(0),null);
var rsource = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16633,(1),null);
var rline = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16633,(2),null);
var rcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16633,(3),null);
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16633,(4),null);
var nseg = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(gcol + rgcol),((function (){var or__4131__auto__ = source;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})() + rsource),((function (){var or__4131__auto__ = line;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})() + rline),((function (){var or__4131__auto__ = col;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})() + rcol),((function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
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
var map__16636 = segmap;
var map__16636__$1 = (((((!((map__16636 == null))))?(((((map__16636.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16636.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16636):map__16636);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16636__$1,cljs.core.cst$kw$gcol);
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16636__$1,cljs.core.cst$kw$source);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16636__$1,cljs.core.cst$kw$line);
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16636__$1,cljs.core.cst$kw$col);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16636__$1,cljs.core.cst$kw$name);
var d = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$gline,gline,cljs.core.cst$kw$gcol,gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,cljs.core.cst$kw$name,name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__16636,map__16636__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__16636,map__16636__$1,gcol,source,line,col,name,d,d__$1){
return (function (m__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__16636,map__16636__$1,gcol,source,line,col,name,d,d__$1){
return (function (v){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(v,d__$1);
});})(map__16636,map__16636__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__16636,map__16636__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});})(map__16636,map__16636__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var G__16639 = arguments.length;
switch (G__16639) {
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

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2(goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
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
var vec__16643 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__16647 = cljs.core.next(segs__$1);
var G__16648 = nrelseg;
var G__16649 = cljs.source_map.update_reverse_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__16647;
relseg__$1 = G__16648;
result__$1 = G__16649;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16643,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16643,(1),null);
var G__16650 = (gline + (1));
var G__16651 = cljs.core.next(lines__$1);
var G__16652 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__16653 = result__$1;
gline = G__16650;
lines__$1 = G__16651;
relseg = G__16652;
result = G__16653;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode_reverse.cljs$lang$maxFixedArity = 2;

/**
 * Helper for decode. Take a source map and update it based on a
 *   segment map.
 */
cljs.source_map.update_result = (function cljs$source_map$update_result(result,segmap,gline){
var map__16655 = segmap;
var map__16655__$1 = (((((!((map__16655 == null))))?(((((map__16655.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16655.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16655):map__16655);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16655__$1,cljs.core.cst$kw$gcol);
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16655__$1,cljs.core.cst$kw$source);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16655__$1,cljs.core.cst$kw$line);
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16655__$1,cljs.core.cst$kw$col);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16655__$1,cljs.core.cst$kw$name);
var d = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line,cljs.core.cst$kw$col,col,cljs.core.cst$kw$source,source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,cljs.core.cst$kw$name,name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__16655,map__16655__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__16655,map__16655__$1,gcol,source,line,col,name,d,d__$1){
return (function (p1__16654_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__16654_SHARP_,d__$1);
});})(map__16655,map__16655__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__16655,map__16655__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var G__16658 = arguments.length;
switch (G__16658) {
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

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2(goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
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
var vec__16662 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__16666 = cljs.core.next(segs__$1);
var G__16667 = nrelseg;
var G__16668 = cljs.source_map.update_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__16666;
relseg__$1 = G__16667;
result__$1 = G__16668;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16662,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16662,(1),null);
var G__16669 = (gline + (1));
var G__16670 = cljs.core.next(lines__$1);
var G__16671 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__16672 = result__$1;
gline = G__16669;
lines__$1 = G__16670;
relseg = G__16671;
result = G__16672;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode.cljs$lang$maxFixedArity = 2;

/**
 * Take a nested sorted map encoding line and column information
 * for a file and return a vector of vectors of encoded segments.
 * Each vector represents a line, and the internal vectors are segments
 * representing the contents of the line.
 */
cljs.source_map.lines__GT_segs = (function cljs$source_map$lines__GT_segs(lines){
var relseg = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (relseg){
return (function (segs,cols){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,((function (relseg){
return (function (p__16673){
var vec__16674 = p__16673;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16674,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16674,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16674,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16674,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16674,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
});})(relseg))
);

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (relseg){
return (function (cols__$1,p__16677){
var vec__16678 = p__16677;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16678,(0),null);
var sidx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16678,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16678,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16678,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16678,(4),null);
var seg = vec__16678;
var offset = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._,seg,cljs.core.deref(relseg));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,((function (offset,vec__16678,gcol,sidx,line,col,name,seg,relseg){
return (function (p__16681){
var vec__16682 = p__16681;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16682,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16682,(1),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16682,(2),null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16682,(3),null);
var lname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16682,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return lname;
}
})()], null);
});})(offset,vec__16678,gcol,sidx,line,col,name,seg,relseg))
);

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cols__$1,cljs.source_map.base64_vlq.encode(offset));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,cols));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,lines);
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
var preamble_lines = cljs.core.take.cljs$core$IFn$_invoke$arity$2((function (){var or__4131__auto__ = cljs.core.cst$kw$preamble_DASH_line_DASH_count.cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})(),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY));
var info__GT_segv = ((function (lines,names__GT_idx,name_idx,preamble_lines){
return (function (info,source_idx,line,col){
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
});})(lines,names__GT_idx,name_idx,preamble_lines))
;
var encode_cols = ((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (infos,source_idx,line,col){
var seq__16688 = cljs.core.seq(infos);
var chunk__16689 = null;
var count__16690 = (0);
var i__16691 = (0);
while(true){
if((i__16691 < count__16690)){
var info = chunk__16689.cljs$core$IIndexed$_nth$arity$2(null,i__16691);
var segv_17045 = info__GT_segv(info,source_idx,line,col);
var gline_17046 = cljs.core.cst$kw$gline.cljs$core$IFn$_invoke$arity$1(info);
var lc_17047 = cljs.core.count(cljs.core.deref(lines));
if((gline_17046 > (lc_17047 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__16688,chunk__16689,count__16690,i__16691,segv_17045,gline_17046,lc_17047,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_17046 - (lc_17047 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_17045], null));
});})(seq__16688,chunk__16689,count__16690,i__16691,segv_17045,gline_17046,lc_17047,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__16688,chunk__16689,count__16690,i__16691,segv_17045,gline_17046,lc_17047,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17046], null),cljs.core.conj,segv_17045);
});})(seq__16688,chunk__16689,count__16690,i__16691,segv_17045,gline_17046,lc_17047,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__17048 = seq__16688;
var G__17049 = chunk__16689;
var G__17050 = count__16690;
var G__17051 = (i__16691 + (1));
seq__16688 = G__17048;
chunk__16689 = G__17049;
count__16690 = G__17050;
i__16691 = G__17051;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__16688);
if(temp__5735__auto__){
var seq__16688__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__16688__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__16688__$1);
var G__17052 = cljs.core.chunk_rest(seq__16688__$1);
var G__17053 = c__4550__auto__;
var G__17054 = cljs.core.count(c__4550__auto__);
var G__17055 = (0);
seq__16688 = G__17052;
chunk__16689 = G__17053;
count__16690 = G__17054;
i__16691 = G__17055;
continue;
} else {
var info = cljs.core.first(seq__16688__$1);
var segv_17056 = info__GT_segv(info,source_idx,line,col);
var gline_17057 = cljs.core.cst$kw$gline.cljs$core$IFn$_invoke$arity$1(info);
var lc_17058 = cljs.core.count(cljs.core.deref(lines));
if((gline_17057 > (lc_17058 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__16688,chunk__16689,count__16690,i__16691,segv_17056,gline_17057,lc_17058,info,seq__16688__$1,temp__5735__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_17057 - (lc_17058 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_17056], null));
});})(seq__16688,chunk__16689,count__16690,i__16691,segv_17056,gline_17057,lc_17058,info,seq__16688__$1,temp__5735__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__16688,chunk__16689,count__16690,i__16691,segv_17056,gline_17057,lc_17058,info,seq__16688__$1,temp__5735__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17057], null),cljs.core.conj,segv_17056);
});})(seq__16688,chunk__16689,count__16690,i__16691,segv_17056,gline_17057,lc_17058,info,seq__16688__$1,temp__5735__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__17059 = cljs.core.next(seq__16688__$1);
var G__17060 = null;
var G__17061 = (0);
var G__17062 = (0);
seq__16688 = G__17059;
chunk__16689 = G__17060;
count__16690 = G__17061;
i__16691 = G__17062;
continue;
}
} else {
return null;
}
}
break;
}
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
;
var seq__16692_17063 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__16693_17064 = null;
var count__16694_17065 = (0);
var i__16695_17066 = (0);
while(true){
if((i__16695_17066 < count__16694_17065)){
var vec__16868_17067 = chunk__16693_17064.cljs$core$IIndexed$_nth$arity$2(null,i__16695_17066);
var source_idx_17068 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16868_17067,(0),null);
var vec__16871_17069 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16868_17067,(1),null);
var __17070 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16871_17069,(0),null);
var lines_17071__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16871_17069,(1),null);
var seq__16874_17072 = cljs.core.seq(lines_17071__$1);
var chunk__16875_17073 = null;
var count__16876_17074 = (0);
var i__16877_17075 = (0);
while(true){
if((i__16877_17075 < count__16876_17074)){
var vec__16916_17076 = chunk__16875_17073.cljs$core$IIndexed$_nth$arity$2(null,i__16877_17075);
var line_17077 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16916_17076,(0),null);
var cols_17078 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16916_17076,(1),null);
var seq__16919_17079 = cljs.core.seq(cols_17078);
var chunk__16920_17080 = null;
var count__16921_17081 = (0);
var i__16922_17082 = (0);
while(true){
if((i__16922_17082 < count__16921_17081)){
var vec__16929_17083 = chunk__16920_17080.cljs$core$IIndexed$_nth$arity$2(null,i__16922_17082);
var col_17084 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16929_17083,(0),null);
var infos_17085 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16929_17083,(1),null);
encode_cols(infos_17085,source_idx_17068,line_17077,col_17084);


var G__17086 = seq__16919_17079;
var G__17087 = chunk__16920_17080;
var G__17088 = count__16921_17081;
var G__17089 = (i__16922_17082 + (1));
seq__16919_17079 = G__17086;
chunk__16920_17080 = G__17087;
count__16921_17081 = G__17088;
i__16922_17082 = G__17089;
continue;
} else {
var temp__5735__auto___17090 = cljs.core.seq(seq__16919_17079);
if(temp__5735__auto___17090){
var seq__16919_17091__$1 = temp__5735__auto___17090;
if(cljs.core.chunked_seq_QMARK_(seq__16919_17091__$1)){
var c__4550__auto___17092 = cljs.core.chunk_first(seq__16919_17091__$1);
var G__17093 = cljs.core.chunk_rest(seq__16919_17091__$1);
var G__17094 = c__4550__auto___17092;
var G__17095 = cljs.core.count(c__4550__auto___17092);
var G__17096 = (0);
seq__16919_17079 = G__17093;
chunk__16920_17080 = G__17094;
count__16921_17081 = G__17095;
i__16922_17082 = G__17096;
continue;
} else {
var vec__16932_17097 = cljs.core.first(seq__16919_17091__$1);
var col_17098 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16932_17097,(0),null);
var infos_17099 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16932_17097,(1),null);
encode_cols(infos_17099,source_idx_17068,line_17077,col_17098);


var G__17100 = cljs.core.next(seq__16919_17091__$1);
var G__17101 = null;
var G__17102 = (0);
var G__17103 = (0);
seq__16919_17079 = G__17100;
chunk__16920_17080 = G__17101;
count__16921_17081 = G__17102;
i__16922_17082 = G__17103;
continue;
}
} else {
}
}
break;
}


var G__17104 = seq__16874_17072;
var G__17105 = chunk__16875_17073;
var G__17106 = count__16876_17074;
var G__17107 = (i__16877_17075 + (1));
seq__16874_17072 = G__17104;
chunk__16875_17073 = G__17105;
count__16876_17074 = G__17106;
i__16877_17075 = G__17107;
continue;
} else {
var temp__5735__auto___17108 = cljs.core.seq(seq__16874_17072);
if(temp__5735__auto___17108){
var seq__16874_17109__$1 = temp__5735__auto___17108;
if(cljs.core.chunked_seq_QMARK_(seq__16874_17109__$1)){
var c__4550__auto___17110 = cljs.core.chunk_first(seq__16874_17109__$1);
var G__17111 = cljs.core.chunk_rest(seq__16874_17109__$1);
var G__17112 = c__4550__auto___17110;
var G__17113 = cljs.core.count(c__4550__auto___17110);
var G__17114 = (0);
seq__16874_17072 = G__17111;
chunk__16875_17073 = G__17112;
count__16876_17074 = G__17113;
i__16877_17075 = G__17114;
continue;
} else {
var vec__16935_17115 = cljs.core.first(seq__16874_17109__$1);
var line_17116 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16935_17115,(0),null);
var cols_17117 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16935_17115,(1),null);
var seq__16938_17118 = cljs.core.seq(cols_17117);
var chunk__16939_17119 = null;
var count__16940_17120 = (0);
var i__16941_17121 = (0);
while(true){
if((i__16941_17121 < count__16940_17120)){
var vec__16948_17122 = chunk__16939_17119.cljs$core$IIndexed$_nth$arity$2(null,i__16941_17121);
var col_17123 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16948_17122,(0),null);
var infos_17124 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16948_17122,(1),null);
encode_cols(infos_17124,source_idx_17068,line_17116,col_17123);


var G__17125 = seq__16938_17118;
var G__17126 = chunk__16939_17119;
var G__17127 = count__16940_17120;
var G__17128 = (i__16941_17121 + (1));
seq__16938_17118 = G__17125;
chunk__16939_17119 = G__17126;
count__16940_17120 = G__17127;
i__16941_17121 = G__17128;
continue;
} else {
var temp__5735__auto___17129__$1 = cljs.core.seq(seq__16938_17118);
if(temp__5735__auto___17129__$1){
var seq__16938_17130__$1 = temp__5735__auto___17129__$1;
if(cljs.core.chunked_seq_QMARK_(seq__16938_17130__$1)){
var c__4550__auto___17131 = cljs.core.chunk_first(seq__16938_17130__$1);
var G__17132 = cljs.core.chunk_rest(seq__16938_17130__$1);
var G__17133 = c__4550__auto___17131;
var G__17134 = cljs.core.count(c__4550__auto___17131);
var G__17135 = (0);
seq__16938_17118 = G__17132;
chunk__16939_17119 = G__17133;
count__16940_17120 = G__17134;
i__16941_17121 = G__17135;
continue;
} else {
var vec__16951_17136 = cljs.core.first(seq__16938_17130__$1);
var col_17137 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16951_17136,(0),null);
var infos_17138 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16951_17136,(1),null);
encode_cols(infos_17138,source_idx_17068,line_17116,col_17137);


var G__17139 = cljs.core.next(seq__16938_17130__$1);
var G__17140 = null;
var G__17141 = (0);
var G__17142 = (0);
seq__16938_17118 = G__17139;
chunk__16939_17119 = G__17140;
count__16940_17120 = G__17141;
i__16941_17121 = G__17142;
continue;
}
} else {
}
}
break;
}


var G__17143 = cljs.core.next(seq__16874_17109__$1);
var G__17144 = null;
var G__17145 = (0);
var G__17146 = (0);
seq__16874_17072 = G__17143;
chunk__16875_17073 = G__17144;
count__16876_17074 = G__17145;
i__16877_17075 = G__17146;
continue;
}
} else {
}
}
break;
}


var G__17147 = seq__16692_17063;
var G__17148 = chunk__16693_17064;
var G__17149 = count__16694_17065;
var G__17150 = (i__16695_17066 + (1));
seq__16692_17063 = G__17147;
chunk__16693_17064 = G__17148;
count__16694_17065 = G__17149;
i__16695_17066 = G__17150;
continue;
} else {
var temp__5735__auto___17151 = cljs.core.seq(seq__16692_17063);
if(temp__5735__auto___17151){
var seq__16692_17152__$1 = temp__5735__auto___17151;
if(cljs.core.chunked_seq_QMARK_(seq__16692_17152__$1)){
var c__4550__auto___17153 = cljs.core.chunk_first(seq__16692_17152__$1);
var G__17154 = cljs.core.chunk_rest(seq__16692_17152__$1);
var G__17155 = c__4550__auto___17153;
var G__17156 = cljs.core.count(c__4550__auto___17153);
var G__17157 = (0);
seq__16692_17063 = G__17154;
chunk__16693_17064 = G__17155;
count__16694_17065 = G__17156;
i__16695_17066 = G__17157;
continue;
} else {
var vec__16954_17158 = cljs.core.first(seq__16692_17152__$1);
var source_idx_17159 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16954_17158,(0),null);
var vec__16957_17160 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16954_17158,(1),null);
var __17161 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16957_17160,(0),null);
var lines_17162__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16957_17160,(1),null);
var seq__16960_17163 = cljs.core.seq(lines_17162__$1);
var chunk__16961_17164 = null;
var count__16962_17165 = (0);
var i__16963_17166 = (0);
while(true){
if((i__16963_17166 < count__16962_17165)){
var vec__17002_17167 = chunk__16961_17164.cljs$core$IIndexed$_nth$arity$2(null,i__16963_17166);
var line_17168 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17002_17167,(0),null);
var cols_17169 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17002_17167,(1),null);
var seq__17005_17170 = cljs.core.seq(cols_17169);
var chunk__17006_17171 = null;
var count__17007_17172 = (0);
var i__17008_17173 = (0);
while(true){
if((i__17008_17173 < count__17007_17172)){
var vec__17015_17174 = chunk__17006_17171.cljs$core$IIndexed$_nth$arity$2(null,i__17008_17173);
var col_17175 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17015_17174,(0),null);
var infos_17176 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17015_17174,(1),null);
encode_cols(infos_17176,source_idx_17159,line_17168,col_17175);


var G__17177 = seq__17005_17170;
var G__17178 = chunk__17006_17171;
var G__17179 = count__17007_17172;
var G__17180 = (i__17008_17173 + (1));
seq__17005_17170 = G__17177;
chunk__17006_17171 = G__17178;
count__17007_17172 = G__17179;
i__17008_17173 = G__17180;
continue;
} else {
var temp__5735__auto___17181__$1 = cljs.core.seq(seq__17005_17170);
if(temp__5735__auto___17181__$1){
var seq__17005_17182__$1 = temp__5735__auto___17181__$1;
if(cljs.core.chunked_seq_QMARK_(seq__17005_17182__$1)){
var c__4550__auto___17183 = cljs.core.chunk_first(seq__17005_17182__$1);
var G__17184 = cljs.core.chunk_rest(seq__17005_17182__$1);
var G__17185 = c__4550__auto___17183;
var G__17186 = cljs.core.count(c__4550__auto___17183);
var G__17187 = (0);
seq__17005_17170 = G__17184;
chunk__17006_17171 = G__17185;
count__17007_17172 = G__17186;
i__17008_17173 = G__17187;
continue;
} else {
var vec__17018_17188 = cljs.core.first(seq__17005_17182__$1);
var col_17189 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17018_17188,(0),null);
var infos_17190 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17018_17188,(1),null);
encode_cols(infos_17190,source_idx_17159,line_17168,col_17189);


var G__17191 = cljs.core.next(seq__17005_17182__$1);
var G__17192 = null;
var G__17193 = (0);
var G__17194 = (0);
seq__17005_17170 = G__17191;
chunk__17006_17171 = G__17192;
count__17007_17172 = G__17193;
i__17008_17173 = G__17194;
continue;
}
} else {
}
}
break;
}


var G__17195 = seq__16960_17163;
var G__17196 = chunk__16961_17164;
var G__17197 = count__16962_17165;
var G__17198 = (i__16963_17166 + (1));
seq__16960_17163 = G__17195;
chunk__16961_17164 = G__17196;
count__16962_17165 = G__17197;
i__16963_17166 = G__17198;
continue;
} else {
var temp__5735__auto___17199__$1 = cljs.core.seq(seq__16960_17163);
if(temp__5735__auto___17199__$1){
var seq__16960_17200__$1 = temp__5735__auto___17199__$1;
if(cljs.core.chunked_seq_QMARK_(seq__16960_17200__$1)){
var c__4550__auto___17201 = cljs.core.chunk_first(seq__16960_17200__$1);
var G__17202 = cljs.core.chunk_rest(seq__16960_17200__$1);
var G__17203 = c__4550__auto___17201;
var G__17204 = cljs.core.count(c__4550__auto___17201);
var G__17205 = (0);
seq__16960_17163 = G__17202;
chunk__16961_17164 = G__17203;
count__16962_17165 = G__17204;
i__16963_17166 = G__17205;
continue;
} else {
var vec__17021_17206 = cljs.core.first(seq__16960_17200__$1);
var line_17207 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17021_17206,(0),null);
var cols_17208 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17021_17206,(1),null);
var seq__17024_17209 = cljs.core.seq(cols_17208);
var chunk__17025_17210 = null;
var count__17026_17211 = (0);
var i__17027_17212 = (0);
while(true){
if((i__17027_17212 < count__17026_17211)){
var vec__17034_17213 = chunk__17025_17210.cljs$core$IIndexed$_nth$arity$2(null,i__17027_17212);
var col_17214 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17034_17213,(0),null);
var infos_17215 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17034_17213,(1),null);
encode_cols(infos_17215,source_idx_17159,line_17207,col_17214);


var G__17216 = seq__17024_17209;
var G__17217 = chunk__17025_17210;
var G__17218 = count__17026_17211;
var G__17219 = (i__17027_17212 + (1));
seq__17024_17209 = G__17216;
chunk__17025_17210 = G__17217;
count__17026_17211 = G__17218;
i__17027_17212 = G__17219;
continue;
} else {
var temp__5735__auto___17220__$2 = cljs.core.seq(seq__17024_17209);
if(temp__5735__auto___17220__$2){
var seq__17024_17221__$1 = temp__5735__auto___17220__$2;
if(cljs.core.chunked_seq_QMARK_(seq__17024_17221__$1)){
var c__4550__auto___17222 = cljs.core.chunk_first(seq__17024_17221__$1);
var G__17223 = cljs.core.chunk_rest(seq__17024_17221__$1);
var G__17224 = c__4550__auto___17222;
var G__17225 = cljs.core.count(c__4550__auto___17222);
var G__17226 = (0);
seq__17024_17209 = G__17223;
chunk__17025_17210 = G__17224;
count__17026_17211 = G__17225;
i__17027_17212 = G__17226;
continue;
} else {
var vec__17037_17227 = cljs.core.first(seq__17024_17221__$1);
var col_17228 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17037_17227,(0),null);
var infos_17229 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17037_17227,(1),null);
encode_cols(infos_17229,source_idx_17159,line_17207,col_17228);


var G__17230 = cljs.core.next(seq__17024_17221__$1);
var G__17231 = null;
var G__17232 = (0);
var G__17233 = (0);
seq__17024_17209 = G__17230;
chunk__17025_17210 = G__17231;
count__17026_17211 = G__17232;
i__17027_17212 = G__17233;
continue;
}
} else {
}
}
break;
}


var G__17234 = cljs.core.next(seq__16960_17200__$1);
var G__17235 = null;
var G__17236 = (0);
var G__17237 = (0);
seq__16960_17163 = G__17234;
chunk__16961_17164 = G__17235;
count__16962_17165 = G__17236;
i__16963_17166 = G__17237;
continue;
}
} else {
}
}
break;
}


var G__17238 = cljs.core.next(seq__16692_17152__$1);
var G__17239 = null;
var G__17240 = (0);
var G__17241 = (0);
seq__16692_17063 = G__17238;
chunk__16693_17064 = G__17239;
count__16694_17065 = G__17240;
i__16695_17066 = G__17241;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__17040 = ({"version": (3), "file": cljs.core.cst$kw$file.cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys(m);
var f = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((cljs.core.cst$kw$source_DASH_map_DASH_timestamp.cljs$core$IFn$_invoke$arity$1(opts) === true)?((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__16685_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__16685_SHARP_),"?rel=",cljs.core.str.cljs$core$IFn$_invoke$arity$1((new Date()).valueOf())].join('');
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
:cljs.core.identity),((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__16686_SHARP_){
return cljs.core.last(clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__16686_SHARP_,/\//));
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
);
return cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,paths));
})(), "lineCount": cljs.core.cst$kw$lines.cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.cljs$core$IFn$_invoke$arity$2(";",cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__16687_SHARP_){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",p1__16687_SHARP_);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,cljs.source_map.lines__GT_segs(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(preamble_lines,cljs.core.deref(lines))))), "names": cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.set.map_invert(cljs.core.deref(names__GT_idx)),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.deref(names__GT_idx)))))});
if(cljs.core.truth_(cljs.core.cst$kw$sources_DASH_content.cljs$core$IFn$_invoke$arity$1(opts))){
var G__17041 = G__17040;
var G__17042_17242 = G__17041;
var G__17043_17243 = "sourcesContent";
var G__17044_17244 = cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sources_DASH_content.cljs$core$IFn$_invoke$arity$1(opts));
goog.object.set(G__17042_17242,G__17043_17243,G__17044_17244);

return G__17041;
} else {
return G__17040;
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
var vec__17245 = cljs.core.first(line_map_seq);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17245,(0),null);
var col_map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17245,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq(col_map);
var new_cols = cljs.core.sorted_map();
while(true){
if(col_map_seq){
var vec__17248 = cljs.core.first(col_map_seq);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17248,(0),null);
var infos = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17248,(1),null);
var G__17254 = cljs.core.next(col_map_seq);
var G__17255 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_cols,col,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__17248,col,infos,vec__17245,line,col_map){
return (function (v,p__17251){
var map__17252 = p__17251;
var map__17252__$1 = (((((!((map__17252 == null))))?(((((map__17252.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17252.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17252):map__17252);
var gline = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17252__$1,cljs.core.cst$kw$gline);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17252__$1,cljs.core.cst$kw$gcol);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__17248,col,infos,vec__17245,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__17254;
new_cols = G__17255;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__17256 = cljs.core.next(line_map_seq);
var G__17257 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_lines,line,new_cols);
line_map_seq = G__17256;
new_lines = G__17257;
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
var seq__17258_17530 = cljs.core.seq(reverse_map);
var chunk__17259_17531 = null;
var count__17260_17532 = (0);
var i__17261_17533 = (0);
while(true){
if((i__17261_17533 < count__17260_17532)){
var vec__17396_17534 = chunk__17259_17531.cljs$core$IIndexed$_nth$arity$2(null,i__17261_17533);
var line_17535 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17396_17534,(0),null);
var columns_17536 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17396_17534,(1),null);
var seq__17399_17537 = cljs.core.seq(columns_17536);
var chunk__17400_17538 = null;
var count__17401_17539 = (0);
var i__17402_17540 = (0);
while(true){
if((i__17402_17540 < count__17401_17539)){
var vec__17433_17541 = chunk__17400_17538.cljs$core$IIndexed$_nth$arity$2(null,i__17402_17540);
var column_17542 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17433_17541,(0),null);
var column_info_17543 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17433_17541,(1),null);
var seq__17436_17544 = cljs.core.seq(column_info_17543);
var chunk__17437_17545 = null;
var count__17438_17546 = (0);
var i__17439_17547 = (0);
while(true){
if((i__17439_17547 < count__17438_17546)){
var map__17444_17548 = chunk__17437_17545.cljs$core$IIndexed$_nth$arity$2(null,i__17439_17547);
var map__17444_17549__$1 = (((((!((map__17444_17548 == null))))?(((((map__17444_17548.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17444_17548.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17444_17548):map__17444_17548);
var gline_17550 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17444_17549__$1,cljs.core.cst$kw$gline);
var gcol_17551 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17444_17549__$1,cljs.core.cst$kw$gcol);
var name_17552 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17444_17549__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17550], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17436_17544,chunk__17437_17545,count__17438_17546,i__17439_17547,seq__17399_17537,chunk__17400_17538,count__17401_17539,i__17402_17540,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17444_17548,map__17444_17549__$1,gline_17550,gcol_17551,name_17552,vec__17433_17541,column_17542,column_info_17543,vec__17396_17534,line_17535,columns_17536,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17551], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_17535,cljs.core.cst$kw$col,column_17542,cljs.core.cst$kw$name,name_17552], null));
});})(seq__17436_17544,chunk__17437_17545,count__17438_17546,i__17439_17547,seq__17399_17537,chunk__17400_17538,count__17401_17539,i__17402_17540,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17444_17548,map__17444_17549__$1,gline_17550,gcol_17551,name_17552,vec__17433_17541,column_17542,column_info_17543,vec__17396_17534,line_17535,columns_17536,inverted))
,cljs.core.sorted_map()));


var G__17553 = seq__17436_17544;
var G__17554 = chunk__17437_17545;
var G__17555 = count__17438_17546;
var G__17556 = (i__17439_17547 + (1));
seq__17436_17544 = G__17553;
chunk__17437_17545 = G__17554;
count__17438_17546 = G__17555;
i__17439_17547 = G__17556;
continue;
} else {
var temp__5735__auto___17557 = cljs.core.seq(seq__17436_17544);
if(temp__5735__auto___17557){
var seq__17436_17558__$1 = temp__5735__auto___17557;
if(cljs.core.chunked_seq_QMARK_(seq__17436_17558__$1)){
var c__4550__auto___17559 = cljs.core.chunk_first(seq__17436_17558__$1);
var G__17560 = cljs.core.chunk_rest(seq__17436_17558__$1);
var G__17561 = c__4550__auto___17559;
var G__17562 = cljs.core.count(c__4550__auto___17559);
var G__17563 = (0);
seq__17436_17544 = G__17560;
chunk__17437_17545 = G__17561;
count__17438_17546 = G__17562;
i__17439_17547 = G__17563;
continue;
} else {
var map__17446_17564 = cljs.core.first(seq__17436_17558__$1);
var map__17446_17565__$1 = (((((!((map__17446_17564 == null))))?(((((map__17446_17564.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17446_17564.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17446_17564):map__17446_17564);
var gline_17566 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17446_17565__$1,cljs.core.cst$kw$gline);
var gcol_17567 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17446_17565__$1,cljs.core.cst$kw$gcol);
var name_17568 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17446_17565__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17566], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17436_17544,chunk__17437_17545,count__17438_17546,i__17439_17547,seq__17399_17537,chunk__17400_17538,count__17401_17539,i__17402_17540,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17446_17564,map__17446_17565__$1,gline_17566,gcol_17567,name_17568,seq__17436_17558__$1,temp__5735__auto___17557,vec__17433_17541,column_17542,column_info_17543,vec__17396_17534,line_17535,columns_17536,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17567], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_17535,cljs.core.cst$kw$col,column_17542,cljs.core.cst$kw$name,name_17568], null));
});})(seq__17436_17544,chunk__17437_17545,count__17438_17546,i__17439_17547,seq__17399_17537,chunk__17400_17538,count__17401_17539,i__17402_17540,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17446_17564,map__17446_17565__$1,gline_17566,gcol_17567,name_17568,seq__17436_17558__$1,temp__5735__auto___17557,vec__17433_17541,column_17542,column_info_17543,vec__17396_17534,line_17535,columns_17536,inverted))
,cljs.core.sorted_map()));


var G__17569 = cljs.core.next(seq__17436_17558__$1);
var G__17570 = null;
var G__17571 = (0);
var G__17572 = (0);
seq__17436_17544 = G__17569;
chunk__17437_17545 = G__17570;
count__17438_17546 = G__17571;
i__17439_17547 = G__17572;
continue;
}
} else {
}
}
break;
}


var G__17573 = seq__17399_17537;
var G__17574 = chunk__17400_17538;
var G__17575 = count__17401_17539;
var G__17576 = (i__17402_17540 + (1));
seq__17399_17537 = G__17573;
chunk__17400_17538 = G__17574;
count__17401_17539 = G__17575;
i__17402_17540 = G__17576;
continue;
} else {
var temp__5735__auto___17577 = cljs.core.seq(seq__17399_17537);
if(temp__5735__auto___17577){
var seq__17399_17578__$1 = temp__5735__auto___17577;
if(cljs.core.chunked_seq_QMARK_(seq__17399_17578__$1)){
var c__4550__auto___17579 = cljs.core.chunk_first(seq__17399_17578__$1);
var G__17580 = cljs.core.chunk_rest(seq__17399_17578__$1);
var G__17581 = c__4550__auto___17579;
var G__17582 = cljs.core.count(c__4550__auto___17579);
var G__17583 = (0);
seq__17399_17537 = G__17580;
chunk__17400_17538 = G__17581;
count__17401_17539 = G__17582;
i__17402_17540 = G__17583;
continue;
} else {
var vec__17448_17584 = cljs.core.first(seq__17399_17578__$1);
var column_17585 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17448_17584,(0),null);
var column_info_17586 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17448_17584,(1),null);
var seq__17451_17587 = cljs.core.seq(column_info_17586);
var chunk__17452_17588 = null;
var count__17453_17589 = (0);
var i__17454_17590 = (0);
while(true){
if((i__17454_17590 < count__17453_17589)){
var map__17459_17591 = chunk__17452_17588.cljs$core$IIndexed$_nth$arity$2(null,i__17454_17590);
var map__17459_17592__$1 = (((((!((map__17459_17591 == null))))?(((((map__17459_17591.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17459_17591.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17459_17591):map__17459_17591);
var gline_17593 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17459_17592__$1,cljs.core.cst$kw$gline);
var gcol_17594 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17459_17592__$1,cljs.core.cst$kw$gcol);
var name_17595 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17459_17592__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17593], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17451_17587,chunk__17452_17588,count__17453_17589,i__17454_17590,seq__17399_17537,chunk__17400_17538,count__17401_17539,i__17402_17540,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17459_17591,map__17459_17592__$1,gline_17593,gcol_17594,name_17595,vec__17448_17584,column_17585,column_info_17586,seq__17399_17578__$1,temp__5735__auto___17577,vec__17396_17534,line_17535,columns_17536,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17594], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_17535,cljs.core.cst$kw$col,column_17585,cljs.core.cst$kw$name,name_17595], null));
});})(seq__17451_17587,chunk__17452_17588,count__17453_17589,i__17454_17590,seq__17399_17537,chunk__17400_17538,count__17401_17539,i__17402_17540,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17459_17591,map__17459_17592__$1,gline_17593,gcol_17594,name_17595,vec__17448_17584,column_17585,column_info_17586,seq__17399_17578__$1,temp__5735__auto___17577,vec__17396_17534,line_17535,columns_17536,inverted))
,cljs.core.sorted_map()));


var G__17596 = seq__17451_17587;
var G__17597 = chunk__17452_17588;
var G__17598 = count__17453_17589;
var G__17599 = (i__17454_17590 + (1));
seq__17451_17587 = G__17596;
chunk__17452_17588 = G__17597;
count__17453_17589 = G__17598;
i__17454_17590 = G__17599;
continue;
} else {
var temp__5735__auto___17600__$1 = cljs.core.seq(seq__17451_17587);
if(temp__5735__auto___17600__$1){
var seq__17451_17601__$1 = temp__5735__auto___17600__$1;
if(cljs.core.chunked_seq_QMARK_(seq__17451_17601__$1)){
var c__4550__auto___17602 = cljs.core.chunk_first(seq__17451_17601__$1);
var G__17603 = cljs.core.chunk_rest(seq__17451_17601__$1);
var G__17604 = c__4550__auto___17602;
var G__17605 = cljs.core.count(c__4550__auto___17602);
var G__17606 = (0);
seq__17451_17587 = G__17603;
chunk__17452_17588 = G__17604;
count__17453_17589 = G__17605;
i__17454_17590 = G__17606;
continue;
} else {
var map__17461_17607 = cljs.core.first(seq__17451_17601__$1);
var map__17461_17608__$1 = (((((!((map__17461_17607 == null))))?(((((map__17461_17607.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17461_17607.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17461_17607):map__17461_17607);
var gline_17609 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17461_17608__$1,cljs.core.cst$kw$gline);
var gcol_17610 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17461_17608__$1,cljs.core.cst$kw$gcol);
var name_17611 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17461_17608__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17609], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17451_17587,chunk__17452_17588,count__17453_17589,i__17454_17590,seq__17399_17537,chunk__17400_17538,count__17401_17539,i__17402_17540,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17461_17607,map__17461_17608__$1,gline_17609,gcol_17610,name_17611,seq__17451_17601__$1,temp__5735__auto___17600__$1,vec__17448_17584,column_17585,column_info_17586,seq__17399_17578__$1,temp__5735__auto___17577,vec__17396_17534,line_17535,columns_17536,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17610], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_17535,cljs.core.cst$kw$col,column_17585,cljs.core.cst$kw$name,name_17611], null));
});})(seq__17451_17587,chunk__17452_17588,count__17453_17589,i__17454_17590,seq__17399_17537,chunk__17400_17538,count__17401_17539,i__17402_17540,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17461_17607,map__17461_17608__$1,gline_17609,gcol_17610,name_17611,seq__17451_17601__$1,temp__5735__auto___17600__$1,vec__17448_17584,column_17585,column_info_17586,seq__17399_17578__$1,temp__5735__auto___17577,vec__17396_17534,line_17535,columns_17536,inverted))
,cljs.core.sorted_map()));


var G__17612 = cljs.core.next(seq__17451_17601__$1);
var G__17613 = null;
var G__17614 = (0);
var G__17615 = (0);
seq__17451_17587 = G__17612;
chunk__17452_17588 = G__17613;
count__17453_17589 = G__17614;
i__17454_17590 = G__17615;
continue;
}
} else {
}
}
break;
}


var G__17616 = cljs.core.next(seq__17399_17578__$1);
var G__17617 = null;
var G__17618 = (0);
var G__17619 = (0);
seq__17399_17537 = G__17616;
chunk__17400_17538 = G__17617;
count__17401_17539 = G__17618;
i__17402_17540 = G__17619;
continue;
}
} else {
}
}
break;
}


var G__17620 = seq__17258_17530;
var G__17621 = chunk__17259_17531;
var G__17622 = count__17260_17532;
var G__17623 = (i__17261_17533 + (1));
seq__17258_17530 = G__17620;
chunk__17259_17531 = G__17621;
count__17260_17532 = G__17622;
i__17261_17533 = G__17623;
continue;
} else {
var temp__5735__auto___17624 = cljs.core.seq(seq__17258_17530);
if(temp__5735__auto___17624){
var seq__17258_17625__$1 = temp__5735__auto___17624;
if(cljs.core.chunked_seq_QMARK_(seq__17258_17625__$1)){
var c__4550__auto___17626 = cljs.core.chunk_first(seq__17258_17625__$1);
var G__17627 = cljs.core.chunk_rest(seq__17258_17625__$1);
var G__17628 = c__4550__auto___17626;
var G__17629 = cljs.core.count(c__4550__auto___17626);
var G__17630 = (0);
seq__17258_17530 = G__17627;
chunk__17259_17531 = G__17628;
count__17260_17532 = G__17629;
i__17261_17533 = G__17630;
continue;
} else {
var vec__17463_17631 = cljs.core.first(seq__17258_17625__$1);
var line_17632 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17463_17631,(0),null);
var columns_17633 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17463_17631,(1),null);
var seq__17466_17634 = cljs.core.seq(columns_17633);
var chunk__17467_17635 = null;
var count__17468_17636 = (0);
var i__17469_17637 = (0);
while(true){
if((i__17469_17637 < count__17468_17636)){
var vec__17500_17638 = chunk__17467_17635.cljs$core$IIndexed$_nth$arity$2(null,i__17469_17637);
var column_17639 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17500_17638,(0),null);
var column_info_17640 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17500_17638,(1),null);
var seq__17503_17641 = cljs.core.seq(column_info_17640);
var chunk__17504_17642 = null;
var count__17505_17643 = (0);
var i__17506_17644 = (0);
while(true){
if((i__17506_17644 < count__17505_17643)){
var map__17511_17645 = chunk__17504_17642.cljs$core$IIndexed$_nth$arity$2(null,i__17506_17644);
var map__17511_17646__$1 = (((((!((map__17511_17645 == null))))?(((((map__17511_17645.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17511_17645.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17511_17645):map__17511_17645);
var gline_17647 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17511_17646__$1,cljs.core.cst$kw$gline);
var gcol_17648 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17511_17646__$1,cljs.core.cst$kw$gcol);
var name_17649 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17511_17646__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17647], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17503_17641,chunk__17504_17642,count__17505_17643,i__17506_17644,seq__17466_17634,chunk__17467_17635,count__17468_17636,i__17469_17637,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17511_17645,map__17511_17646__$1,gline_17647,gcol_17648,name_17649,vec__17500_17638,column_17639,column_info_17640,vec__17463_17631,line_17632,columns_17633,seq__17258_17625__$1,temp__5735__auto___17624,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17648], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_17632,cljs.core.cst$kw$col,column_17639,cljs.core.cst$kw$name,name_17649], null));
});})(seq__17503_17641,chunk__17504_17642,count__17505_17643,i__17506_17644,seq__17466_17634,chunk__17467_17635,count__17468_17636,i__17469_17637,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17511_17645,map__17511_17646__$1,gline_17647,gcol_17648,name_17649,vec__17500_17638,column_17639,column_info_17640,vec__17463_17631,line_17632,columns_17633,seq__17258_17625__$1,temp__5735__auto___17624,inverted))
,cljs.core.sorted_map()));


var G__17650 = seq__17503_17641;
var G__17651 = chunk__17504_17642;
var G__17652 = count__17505_17643;
var G__17653 = (i__17506_17644 + (1));
seq__17503_17641 = G__17650;
chunk__17504_17642 = G__17651;
count__17505_17643 = G__17652;
i__17506_17644 = G__17653;
continue;
} else {
var temp__5735__auto___17654__$1 = cljs.core.seq(seq__17503_17641);
if(temp__5735__auto___17654__$1){
var seq__17503_17655__$1 = temp__5735__auto___17654__$1;
if(cljs.core.chunked_seq_QMARK_(seq__17503_17655__$1)){
var c__4550__auto___17656 = cljs.core.chunk_first(seq__17503_17655__$1);
var G__17657 = cljs.core.chunk_rest(seq__17503_17655__$1);
var G__17658 = c__4550__auto___17656;
var G__17659 = cljs.core.count(c__4550__auto___17656);
var G__17660 = (0);
seq__17503_17641 = G__17657;
chunk__17504_17642 = G__17658;
count__17505_17643 = G__17659;
i__17506_17644 = G__17660;
continue;
} else {
var map__17513_17661 = cljs.core.first(seq__17503_17655__$1);
var map__17513_17662__$1 = (((((!((map__17513_17661 == null))))?(((((map__17513_17661.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17513_17661.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17513_17661):map__17513_17661);
var gline_17663 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17513_17662__$1,cljs.core.cst$kw$gline);
var gcol_17664 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17513_17662__$1,cljs.core.cst$kw$gcol);
var name_17665 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17513_17662__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17663], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17503_17641,chunk__17504_17642,count__17505_17643,i__17506_17644,seq__17466_17634,chunk__17467_17635,count__17468_17636,i__17469_17637,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17513_17661,map__17513_17662__$1,gline_17663,gcol_17664,name_17665,seq__17503_17655__$1,temp__5735__auto___17654__$1,vec__17500_17638,column_17639,column_info_17640,vec__17463_17631,line_17632,columns_17633,seq__17258_17625__$1,temp__5735__auto___17624,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17664], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_17632,cljs.core.cst$kw$col,column_17639,cljs.core.cst$kw$name,name_17665], null));
});})(seq__17503_17641,chunk__17504_17642,count__17505_17643,i__17506_17644,seq__17466_17634,chunk__17467_17635,count__17468_17636,i__17469_17637,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17513_17661,map__17513_17662__$1,gline_17663,gcol_17664,name_17665,seq__17503_17655__$1,temp__5735__auto___17654__$1,vec__17500_17638,column_17639,column_info_17640,vec__17463_17631,line_17632,columns_17633,seq__17258_17625__$1,temp__5735__auto___17624,inverted))
,cljs.core.sorted_map()));


var G__17666 = cljs.core.next(seq__17503_17655__$1);
var G__17667 = null;
var G__17668 = (0);
var G__17669 = (0);
seq__17503_17641 = G__17666;
chunk__17504_17642 = G__17667;
count__17505_17643 = G__17668;
i__17506_17644 = G__17669;
continue;
}
} else {
}
}
break;
}


var G__17670 = seq__17466_17634;
var G__17671 = chunk__17467_17635;
var G__17672 = count__17468_17636;
var G__17673 = (i__17469_17637 + (1));
seq__17466_17634 = G__17670;
chunk__17467_17635 = G__17671;
count__17468_17636 = G__17672;
i__17469_17637 = G__17673;
continue;
} else {
var temp__5735__auto___17674__$1 = cljs.core.seq(seq__17466_17634);
if(temp__5735__auto___17674__$1){
var seq__17466_17675__$1 = temp__5735__auto___17674__$1;
if(cljs.core.chunked_seq_QMARK_(seq__17466_17675__$1)){
var c__4550__auto___17676 = cljs.core.chunk_first(seq__17466_17675__$1);
var G__17677 = cljs.core.chunk_rest(seq__17466_17675__$1);
var G__17678 = c__4550__auto___17676;
var G__17679 = cljs.core.count(c__4550__auto___17676);
var G__17680 = (0);
seq__17466_17634 = G__17677;
chunk__17467_17635 = G__17678;
count__17468_17636 = G__17679;
i__17469_17637 = G__17680;
continue;
} else {
var vec__17515_17681 = cljs.core.first(seq__17466_17675__$1);
var column_17682 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17515_17681,(0),null);
var column_info_17683 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17515_17681,(1),null);
var seq__17518_17684 = cljs.core.seq(column_info_17683);
var chunk__17519_17685 = null;
var count__17520_17686 = (0);
var i__17521_17687 = (0);
while(true){
if((i__17521_17687 < count__17520_17686)){
var map__17526_17688 = chunk__17519_17685.cljs$core$IIndexed$_nth$arity$2(null,i__17521_17687);
var map__17526_17689__$1 = (((((!((map__17526_17688 == null))))?(((((map__17526_17688.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17526_17688.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17526_17688):map__17526_17688);
var gline_17690 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17526_17689__$1,cljs.core.cst$kw$gline);
var gcol_17691 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17526_17689__$1,cljs.core.cst$kw$gcol);
var name_17692 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17526_17689__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17690], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17518_17684,chunk__17519_17685,count__17520_17686,i__17521_17687,seq__17466_17634,chunk__17467_17635,count__17468_17636,i__17469_17637,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17526_17688,map__17526_17689__$1,gline_17690,gcol_17691,name_17692,vec__17515_17681,column_17682,column_info_17683,seq__17466_17675__$1,temp__5735__auto___17674__$1,vec__17463_17631,line_17632,columns_17633,seq__17258_17625__$1,temp__5735__auto___17624,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17691], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_17632,cljs.core.cst$kw$col,column_17682,cljs.core.cst$kw$name,name_17692], null));
});})(seq__17518_17684,chunk__17519_17685,count__17520_17686,i__17521_17687,seq__17466_17634,chunk__17467_17635,count__17468_17636,i__17469_17637,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17526_17688,map__17526_17689__$1,gline_17690,gcol_17691,name_17692,vec__17515_17681,column_17682,column_info_17683,seq__17466_17675__$1,temp__5735__auto___17674__$1,vec__17463_17631,line_17632,columns_17633,seq__17258_17625__$1,temp__5735__auto___17624,inverted))
,cljs.core.sorted_map()));


var G__17693 = seq__17518_17684;
var G__17694 = chunk__17519_17685;
var G__17695 = count__17520_17686;
var G__17696 = (i__17521_17687 + (1));
seq__17518_17684 = G__17693;
chunk__17519_17685 = G__17694;
count__17520_17686 = G__17695;
i__17521_17687 = G__17696;
continue;
} else {
var temp__5735__auto___17697__$2 = cljs.core.seq(seq__17518_17684);
if(temp__5735__auto___17697__$2){
var seq__17518_17698__$1 = temp__5735__auto___17697__$2;
if(cljs.core.chunked_seq_QMARK_(seq__17518_17698__$1)){
var c__4550__auto___17699 = cljs.core.chunk_first(seq__17518_17698__$1);
var G__17700 = cljs.core.chunk_rest(seq__17518_17698__$1);
var G__17701 = c__4550__auto___17699;
var G__17702 = cljs.core.count(c__4550__auto___17699);
var G__17703 = (0);
seq__17518_17684 = G__17700;
chunk__17519_17685 = G__17701;
count__17520_17686 = G__17702;
i__17521_17687 = G__17703;
continue;
} else {
var map__17528_17704 = cljs.core.first(seq__17518_17698__$1);
var map__17528_17705__$1 = (((((!((map__17528_17704 == null))))?(((((map__17528_17704.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17528_17704.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17528_17704):map__17528_17704);
var gline_17706 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17528_17705__$1,cljs.core.cst$kw$gline);
var gcol_17707 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17528_17705__$1,cljs.core.cst$kw$gcol);
var name_17708 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17528_17705__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_17706], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__17518_17684,chunk__17519_17685,count__17520_17686,i__17521_17687,seq__17466_17634,chunk__17467_17635,count__17468_17636,i__17469_17637,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17528_17704,map__17528_17705__$1,gline_17706,gcol_17707,name_17708,seq__17518_17698__$1,temp__5735__auto___17697__$2,vec__17515_17681,column_17682,column_info_17683,seq__17466_17675__$1,temp__5735__auto___17674__$1,vec__17463_17631,line_17632,columns_17633,seq__17258_17625__$1,temp__5735__auto___17624,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_17707], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_17632,cljs.core.cst$kw$col,column_17682,cljs.core.cst$kw$name,name_17708], null));
});})(seq__17518_17684,chunk__17519_17685,count__17520_17686,i__17521_17687,seq__17466_17634,chunk__17467_17635,count__17468_17636,i__17469_17637,seq__17258_17530,chunk__17259_17531,count__17260_17532,i__17261_17533,map__17528_17704,map__17528_17705__$1,gline_17706,gcol_17707,name_17708,seq__17518_17698__$1,temp__5735__auto___17697__$2,vec__17515_17681,column_17682,column_info_17683,seq__17466_17675__$1,temp__5735__auto___17674__$1,vec__17463_17631,line_17632,columns_17633,seq__17258_17625__$1,temp__5735__auto___17624,inverted))
,cljs.core.sorted_map()));


var G__17709 = cljs.core.next(seq__17518_17698__$1);
var G__17710 = null;
var G__17711 = (0);
var G__17712 = (0);
seq__17518_17684 = G__17709;
chunk__17519_17685 = G__17710;
count__17520_17686 = G__17711;
i__17521_17687 = G__17712;
continue;
}
} else {
}
}
break;
}


var G__17713 = cljs.core.next(seq__17466_17675__$1);
var G__17714 = null;
var G__17715 = (0);
var G__17716 = (0);
seq__17466_17634 = G__17713;
chunk__17467_17635 = G__17714;
count__17468_17636 = G__17715;
i__17469_17637 = G__17716;
continue;
}
} else {
}
}
break;
}


var G__17717 = cljs.core.next(seq__17258_17625__$1);
var G__17718 = null;
var G__17719 = (0);
var G__17720 = (0);
seq__17258_17530 = G__17717;
chunk__17259_17531 = G__17718;
count__17260_17532 = G__17719;
i__17261_17533 = G__17720;
continue;
}
} else {
}
}
break;
}

return cljs.core.deref(inverted);
});
