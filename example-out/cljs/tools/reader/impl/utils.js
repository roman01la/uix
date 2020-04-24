// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('cljs.tools.reader.impl.utils');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('clojure.string');
goog.require('goog.string');
cljs.tools.reader.impl.utils.char$ = (function cljs$tools$reader$impl$utils$char(x){
if((x == null)){
return null;
} else {
return cljs.core.char$(x);
}
});
cljs.tools.reader.impl.utils.ex_info_QMARK_ = (function cljs$tools$reader$impl$utils$ex_info_QMARK_(ex){
return (ex instanceof cljs.core.ExceptionInfo);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
cljs.tools.reader.impl.utils.ReaderConditional = (function (splicing_QMARK_,form,__meta,__extmap,__hash){
this.splicing_QMARK_ = splicing_QMARK_;
this.form = form;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4374__auto__,k__4375__auto__){
var self__ = this;
var this__4374__auto____$1 = this;
return this__4374__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__4375__auto__,null);
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4376__auto__,k15808,else__4377__auto__){
var self__ = this;
var this__4376__auto____$1 = this;
var G__15812 = k15808;
var G__15812__$1 = (((G__15812 instanceof cljs.core.Keyword))?G__15812.fqn:null);
switch (G__15812__$1) {
case "splicing?":
return self__.splicing_QMARK_;

break;
case "form":
return self__.form;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k15808,else__4377__auto__);

}
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__4393__auto__,f__4394__auto__,init__4395__auto__){
var self__ = this;
var this__4393__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__4396__auto__,p__15813){
var vec__15814 = p__15813;
var k__4397__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15814,(0),null);
var v__4398__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15814,(1),null);
return (f__4394__auto__.cljs$core$IFn$_invoke$arity$3 ? f__4394__auto__.cljs$core$IFn$_invoke$arity$3(ret__4396__auto__,k__4397__auto__,v__4398__auto__) : f__4394__auto__(ret__4396__auto__,k__4397__auto__,v__4398__auto__));
}),init__4395__auto__,this__4393__auto____$1);
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4388__auto__,writer__4389__auto__,opts__4390__auto__){
var self__ = this;
var this__4388__auto____$1 = this;
var pr_pair__4391__auto__ = (function (keyval__4392__auto__){
return cljs.core.pr_sequential_writer(writer__4389__auto__,cljs.core.pr_writer,""," ","",opts__4390__auto__,keyval__4392__auto__);
});
return cljs.core.pr_sequential_writer(writer__4389__auto__,pr_pair__4391__auto__,"#cljs.tools.reader.impl.utils.ReaderConditional{",", ","}",opts__4390__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$splicing_QMARK_,self__.splicing_QMARK_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$form,self__.form],null))], null),self__.__extmap));
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__15807){
var self__ = this;
var G__15807__$1 = this;
return (new cljs.core.RecordIter((0),G__15807__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$splicing_QMARK_,cljs.core.cst$kw$form], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4372__auto__){
var self__ = this;
var this__4372__auto____$1 = this;
return self__.__meta;
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__4369__auto__){
var self__ = this;
var this__4369__auto____$1 = this;
return (new cljs.tools.reader.impl.utils.ReaderConditional(self__.splicing_QMARK_,self__.form,self__.__meta,self__.__extmap,self__.__hash));
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4378__auto__){
var self__ = this;
var this__4378__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__4370__auto__){
var self__ = this;
var this__4370__auto____$1 = this;
var h__4232__auto__ = self__.__hash;
if((!((h__4232__auto__ == null)))){
return h__4232__auto__;
} else {
var h__4232__auto____$1 = (function (){var fexpr__15817 = (function (coll__4371__auto__){
return (-209062840 ^ cljs.core.hash_unordered_coll(coll__4371__auto__));
});
return fexpr__15817(this__4370__auto____$1);
})();
(self__.__hash = h__4232__auto____$1);

return h__4232__auto____$1;
}
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this15809,other15810){
var self__ = this;
var this15809__$1 = this;
return (((!((other15810 == null)))) && ((this15809__$1.constructor === other15810.constructor)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this15809__$1.splicing_QMARK_,other15810.splicing_QMARK_)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this15809__$1.form,other15810.form)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this15809__$1.__extmap,other15810.__extmap)));
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4383__auto__,k__4384__auto__){
var self__ = this;
var this__4383__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$splicing_QMARK_,null,cljs.core.cst$kw$form,null], null), null),k__4384__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__4383__auto____$1),self__.__meta),k__4384__auto__);
} else {
return (new cljs.tools.reader.impl.utils.ReaderConditional(self__.splicing_QMARK_,self__.form,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__4384__auto__)),null));
}
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4381__auto__,k__4382__auto__,G__15807){
var self__ = this;
var this__4381__auto____$1 = this;
var pred__15818 = cljs.core.keyword_identical_QMARK_;
var expr__15819 = k__4382__auto__;
if(cljs.core.truth_((function (){var G__15821 = cljs.core.cst$kw$splicing_QMARK_;
var G__15822 = expr__15819;
return (pred__15818.cljs$core$IFn$_invoke$arity$2 ? pred__15818.cljs$core$IFn$_invoke$arity$2(G__15821,G__15822) : pred__15818(G__15821,G__15822));
})())){
return (new cljs.tools.reader.impl.utils.ReaderConditional(G__15807,self__.form,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__15823 = cljs.core.cst$kw$form;
var G__15824 = expr__15819;
return (pred__15818.cljs$core$IFn$_invoke$arity$2 ? pred__15818.cljs$core$IFn$_invoke$arity$2(G__15823,G__15824) : pred__15818(G__15823,G__15824));
})())){
return (new cljs.tools.reader.impl.utils.ReaderConditional(self__.splicing_QMARK_,G__15807,self__.__meta,self__.__extmap,null));
} else {
return (new cljs.tools.reader.impl.utils.ReaderConditional(self__.splicing_QMARK_,self__.form,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__4382__auto__,G__15807),null));
}
}
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4386__auto__){
var self__ = this;
var this__4386__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(cljs.core.cst$kw$splicing_QMARK_,self__.splicing_QMARK_,null)),(new cljs.core.MapEntry(cljs.core.cst$kw$form,self__.form,null))], null),self__.__extmap));
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4373__auto__,G__15807){
var self__ = this;
var this__4373__auto____$1 = this;
return (new cljs.tools.reader.impl.utils.ReaderConditional(self__.splicing_QMARK_,self__.form,G__15807,self__.__extmap,self__.__hash));
}));

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4379__auto__,entry__4380__auto__){
var self__ = this;
var this__4379__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__4380__auto__)){
return this__4379__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__4380__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__4380__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__4379__auto____$1,entry__4380__auto__);
}
}));

(cljs.tools.reader.impl.utils.ReaderConditional.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$splicing_QMARK_,cljs.core.cst$sym$form], null);
}));

(cljs.tools.reader.impl.utils.ReaderConditional.cljs$lang$type = true);

(cljs.tools.reader.impl.utils.ReaderConditional.cljs$lang$ctorPrSeq = (function (this__4417__auto__){
return (new cljs.core.List(null,"cljs.tools.reader.impl.utils/ReaderConditional",null,(1),null));
}));

(cljs.tools.reader.impl.utils.ReaderConditional.cljs$lang$ctorPrWriter = (function (this__4417__auto__,writer__4418__auto__){
return cljs.core._write(writer__4418__auto__,"cljs.tools.reader.impl.utils/ReaderConditional");
}));

/**
 * Positional factory function for cljs.tools.reader.impl.utils/ReaderConditional.
 */
cljs.tools.reader.impl.utils.__GT_ReaderConditional = (function cljs$tools$reader$impl$utils$__GT_ReaderConditional(splicing_QMARK_,form){
return (new cljs.tools.reader.impl.utils.ReaderConditional(splicing_QMARK_,form,null,null,null));
});

/**
 * Factory function for cljs.tools.reader.impl.utils/ReaderConditional, taking a map of keywords to field values.
 */
cljs.tools.reader.impl.utils.map__GT_ReaderConditional = (function cljs$tools$reader$impl$utils$map__GT_ReaderConditional(G__15811){
var extmap__4413__auto__ = (function (){var G__15825 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__15811,cljs.core.cst$kw$splicing_QMARK_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$form], 0));
if(cljs.core.record_QMARK_(G__15811)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__15825);
} else {
return G__15825;
}
})();
return (new cljs.tools.reader.impl.utils.ReaderConditional(cljs.core.cst$kw$splicing_QMARK_.cljs$core$IFn$_invoke$arity$1(G__15811),cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(G__15811),null,cljs.core.not_empty(extmap__4413__auto__),null));
});

/**
 * Return true if the value is the data representation of a reader conditional
 */
cljs.tools.reader.impl.utils.reader_conditional_QMARK_ = (function cljs$tools$reader$impl$utils$reader_conditional_QMARK_(value){
return (value instanceof cljs.tools.reader.impl.utils.ReaderConditional);
});
/**
 * Construct a data representation of a reader conditional.
 *   If true, splicing? indicates read-cond-splicing.
 */
cljs.tools.reader.impl.utils.reader_conditional = (function cljs$tools$reader$impl$utils$reader_conditional(form,splicing_QMARK_){
return (new cljs.tools.reader.impl.utils.ReaderConditional(splicing_QMARK_,form,null,null,null));
});
(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$IPrintWithWriter$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.tools.reader.impl.utils.ReaderConditional.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var coll__$1 = this;
cljs.core._write(writer,["#?",(cljs.core.truth_(coll__$1.splicing_QMARK_)?"@":null)].join(''));

return cljs.core.pr_writer(coll__$1.form,writer,opts);
}));
cljs.tools.reader.impl.utils.ws_rx = /[\s]/;
/**
 * Checks whether a given character is whitespace
 */
cljs.tools.reader.impl.utils.whitespace_QMARK_ = (function cljs$tools$reader$impl$utils$whitespace_QMARK_(ch){
if((ch == null)){
return null;
} else {
if((ch === ",")){
return true;
} else {
return cljs.tools.reader.impl.utils.ws_rx.test(ch);
}
}
});
/**
 * Checks whether a given character is numeric
 */
cljs.tools.reader.impl.utils.numeric_QMARK_ = (function cljs$tools$reader$impl$utils$numeric_QMARK_(ch){
if((ch == null)){
return null;
} else {
return goog.string.isNumeric(ch);
}
});
/**
 * Checks whether the character is a newline
 */
cljs.tools.reader.impl.utils.newline_QMARK_ = (function cljs$tools$reader$impl$utils$newline_QMARK_(c){
return ((("\n" === c)) || (("\n" === c)) || ((c == null)));
});
/**
 * Resolves syntactical sugar in metadata
 */
cljs.tools.reader.impl.utils.desugar_meta = (function cljs$tools$reader$impl$utils$desugar_meta(f){
if((f instanceof cljs.core.Keyword)){
return cljs.core.PersistentArrayMap.createAsIfByAssoc([f,true]);
} else {
if((f instanceof cljs.core.Symbol)){
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,f], null);
} else {
if(typeof f === 'string'){
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,f], null);
} else {
return f;

}
}
}
});
cljs.tools.reader.impl.utils.last_id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
cljs.tools.reader.impl.utils.next_id = (function cljs$tools$reader$impl$utils$next_id(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.tools.reader.impl.utils.last_id,cljs.core.inc);
});
cljs.tools.reader.impl.utils.namespace_keys = (function cljs$tools$reader$impl$utils$namespace_keys(ns,keys){
var iter__4523__auto__ = (function cljs$tools$reader$impl$utils$namespace_keys_$_iter__15827(s__15828){
return (new cljs.core.LazySeq(null,(function (){
var s__15828__$1 = s__15828;
while(true){
var temp__5735__auto__ = cljs.core.seq(s__15828__$1);
if(temp__5735__auto__){
var s__15828__$2 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(s__15828__$2)){
var c__4521__auto__ = cljs.core.chunk_first(s__15828__$2);
var size__4522__auto__ = cljs.core.count(c__4521__auto__);
var b__15830 = cljs.core.chunk_buffer(size__4522__auto__);
if((function (){var i__15829 = (0);
while(true){
if((i__15829 < size__4522__auto__)){
var key = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__4521__auto__,i__15829);
cljs.core.chunk_append(b__15830,(((((key instanceof cljs.core.Symbol)) || ((key instanceof cljs.core.Keyword))))?(function (){var vec__15831 = (function (){var fexpr__15834 = cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace,cljs.core.name);
return (fexpr__15834.cljs$core$IFn$_invoke$arity$1 ? fexpr__15834.cljs$core$IFn$_invoke$arity$1(key) : fexpr__15834(key));
})();
var key_ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15831,(0),null);
var key_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15831,(1),null);
var __GT_key = (((key instanceof cljs.core.Symbol))?cljs.core.symbol:cljs.core.keyword);
if((key_ns == null)){
return (__GT_key.cljs$core$IFn$_invoke$arity$2 ? __GT_key.cljs$core$IFn$_invoke$arity$2(ns,key_name) : __GT_key(ns,key_name));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("_",key_ns)){
return (__GT_key.cljs$core$IFn$_invoke$arity$1 ? __GT_key.cljs$core$IFn$_invoke$arity$1(key_name) : __GT_key(key_name));
} else {
return key;

}
}
})():key));

var G__15839 = (i__15829 + (1));
i__15829 = G__15839;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__15830),cljs$tools$reader$impl$utils$namespace_keys_$_iter__15827(cljs.core.chunk_rest(s__15828__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__15830),null);
}
} else {
var key = cljs.core.first(s__15828__$2);
return cljs.core.cons((((((key instanceof cljs.core.Symbol)) || ((key instanceof cljs.core.Keyword))))?(function (){var vec__15835 = (function (){var fexpr__15838 = cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace,cljs.core.name);
return (fexpr__15838.cljs$core$IFn$_invoke$arity$1 ? fexpr__15838.cljs$core$IFn$_invoke$arity$1(key) : fexpr__15838(key));
})();
var key_ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15835,(0),null);
var key_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15835,(1),null);
var __GT_key = (((key instanceof cljs.core.Symbol))?cljs.core.symbol:cljs.core.keyword);
if((key_ns == null)){
return (__GT_key.cljs$core$IFn$_invoke$arity$2 ? __GT_key.cljs$core$IFn$_invoke$arity$2(ns,key_name) : __GT_key(ns,key_name));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("_",key_ns)){
return (__GT_key.cljs$core$IFn$_invoke$arity$1 ? __GT_key.cljs$core$IFn$_invoke$arity$1(key_name) : __GT_key(key_name));
} else {
return key;

}
}
})():key),cljs$tools$reader$impl$utils$namespace_keys_$_iter__15827(cljs.core.rest(s__15828__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4523__auto__(keys);
});
cljs.tools.reader.impl.utils.second_SINGLEQUOTE_ = (function cljs$tools$reader$impl$utils$second_SINGLEQUOTE_(p__15840){
var vec__15841 = p__15840;
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15841,(0),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15841,(1),null);
if(cljs.core.truth_(a)){
return null;
} else {
return b;
}
});
cljs.tools.reader.impl.utils.char_code = (function cljs$tools$reader$impl$utils$char_code(ch,base){
var code = parseInt(ch,base);
if(cljs.core.truth_(isNaN(code))){
return (-1);
} else {
return code;
}
});
