// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('cljs_bean.core');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('cljs_bean.from.cljs.core');
goog.require('goog.object');
cljs_bean.core.lookup_sentinel = ({});
cljs_bean.core.primitive_QMARK_ = (function cljs_bean$core$primitive_QMARK_(x){
return ((typeof x === 'number') || (typeof x === 'string') || (cljs.core.boolean_QMARK_(x)) || ((x == null)));
});
cljs_bean.core.__GT_val = (function cljs_bean$core$__GT_val(x,prop__GT_key,key__GT_prop){
if(cljs_bean.core.primitive_QMARK_(x)){
return x;
} else {
if(cljs.core.object_QMARK_(x)){
return (new cljs_bean.core.Bean(null,x,prop__GT_key,key__GT_prop,true,null,null,null));
} else {
if(cljs.core.array_QMARK_(x)){
return (new cljs_bean.core.ArrayVector(null,prop__GT_key,key__GT_prop,x,null));
} else {
return x;

}
}
}
});
cljs_bean.core.unwrap = (function cljs_bean$core$unwrap(x){
if(cljs_bean.core.primitive_QMARK_(x)){
return x;
} else {
if((x instanceof cljs_bean.core.Bean)){
return x.obj;
} else {
if((x instanceof cljs_bean.core.ArrayVector)){
return x.arr;
} else {
return x;

}
}
}
});
cljs_bean.core.empty_map = cljs.core.PersistentArrayMap.EMPTY;
cljs_bean.core.snapshot = (function cljs_bean$core$snapshot(x,prop__GT_key,key__GT_prop,recursive_QMARK_){
var result = cljs.core.volatile_BANG_(cljs.core.transient$(cljs_bean.core.empty_map));
goog.object.forEach(x,(function (v,k,_){
return result.cljs$core$IVolatile$_vreset_BANG_$arity$2(null,cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(result.cljs$core$IDeref$_deref$arity$1(null),(prop__GT_key.cljs$core$IFn$_invoke$arity$1 ? prop__GT_key.cljs$core$IFn$_invoke$arity$1(k) : prop__GT_key(k)),(function (){var G__19032 = v;
if(cljs.core.truth_(recursive_QMARK_)){
return cljs_bean.core.__GT_val(G__19032,prop__GT_key,key__GT_prop);
} else {
return G__19032;
}
})()));
}));

return cljs.core.persistent_BANG_(cljs.core.deref(result));
});
cljs_bean.core.indexed_entry = (function cljs_bean$core$indexed_entry(obj,prop__GT_key,key__GT_prop,recursive_QMARK_,arr,i){
var prop = (arr[i]);
return (new cljs.core.MapEntry((prop__GT_key.cljs$core$IFn$_invoke$arity$1 ? prop__GT_key.cljs$core$IFn$_invoke$arity$1(prop) : prop__GT_key(prop)),(function (){var G__19033 = (obj[prop]);
if(recursive_QMARK_){
return cljs_bean.core.__GT_val(G__19033,prop__GT_key,key__GT_prop);
} else {
return G__19033;
}
})(),null));
});
cljs_bean.core.compatible_key_QMARK_ = (function cljs_bean$core$compatible_key_QMARK_(k,prop__GT_key){
return (((((k instanceof cljs.core.Keyword)) && ((prop__GT_key === cljs.core.keyword)))) || (((typeof k === 'string') && ((prop__GT_key === cljs.core.identity)))));
});
cljs_bean.core.compatible_value_QMARK_ = (function cljs_bean$core$compatible_value_QMARK_(v,recursive_QMARK_){
return ((cljs_bean.core.primitive_QMARK_(v)) || ((((!(((((cljs.core.map_QMARK_(v)) && ((!((v instanceof cljs_bean.core.Bean)))))) || (((cljs.core.vector_QMARK_(v)) && ((!((v instanceof cljs_bean.core.ArrayVector)))))))))) && (cljs.core.not((function (){var and__4109__auto__ = recursive_QMARK_;
if(cljs.core.truth_(and__4109__auto__)){
return ((cljs.core.object_QMARK_(v)) || (cljs.core.array_QMARK_(v)));
} else {
return and__4109__auto__;
}
})())))));
});
cljs_bean.core.snapshot_QMARK_ = (function cljs_bean$core$snapshot_QMARK_(k,v,prop__GT_key,recursive_QMARK_){
return (!(((cljs_bean.core.compatible_key_QMARK_(k,prop__GT_key)) && (cljs_bean.core.compatible_value_QMARK_(v,recursive_QMARK_)))));
});

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.ITransientMap}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ITransientCollection}
 * @implements {cljs.core.ITransientAssociative}
 * @implements {cljs.core.ILookup}
*/
cljs_bean.core.TransientBean = (function (editable_QMARK_,obj,prop__GT_key,key__GT_prop,recursive_QMARK_,__cnt){
this.editable_QMARK_ = editable_QMARK_;
this.obj = obj;
this.prop__GT_key = prop__GT_key;
this.key__GT_prop = key__GT_prop;
this.recursive_QMARK_ = recursive_QMARK_;
this.__cnt = __cnt;
this.cljs$lang$protocol_mask$partition0$ = 259;
this.cljs$lang$protocol_mask$partition1$ = 56;
});
(cljs_bean.core.TransientBean.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (_,k){
var self__ = this;
var ___$1 = this;
if(self__.editable_QMARK_){
var G__19035 = (self__.obj[(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k))]);
if(self__.recursive_QMARK_){
return cljs_bean.core.__GT_val(G__19035,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19035;
}
} else {
throw (new Error("lookup after persistent!"));
}
}));

(cljs_bean.core.TransientBean.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (_,k,not_found){
var self__ = this;
var ___$1 = this;
if(self__.editable_QMARK_){
var ret = goog.object.get(self__.obj,(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k)),not_found);
var G__19036 = ret;
if(((self__.recursive_QMARK_) && ((!((ret === not_found)))))){
return cljs_bean.core.__GT_val(G__19036,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19036;
}
} else {
throw (new Error("lookup after persistent!"));
}
}));

(cljs_bean.core.TransientBean.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if((self__.__cnt == null)){
return (self__.__cnt = ((cljs.core.js_keys(self__.obj)).length));
} else {
return self__.__cnt;
}
}));

(cljs_bean.core.TransientBean.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var self__ = this;
var tcoll__$1 = this;
return cljs_bean.from.cljs.core.TransientArrayMap_conj_BANG_(tcoll__$1,o,self__.editable_QMARK_);
}));

(cljs_bean.core.TransientBean.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var self__ = this;
var tcoll__$1 = this;
if(self__.editable_QMARK_){
(self__.editable_QMARK_ = false);

return (new cljs_bean.core.Bean(null,self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,null,self__.__cnt,null));
} else {
throw (new Error("persistent! called twice"));
}
}));

(cljs_bean.core.TransientBean.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = (function (tcoll,k,v){
var self__ = this;
var tcoll__$1 = this;
if(self__.editable_QMARK_){
if(cljs_bean.core.snapshot_QMARK_(k,v,self__.prop__GT_key,self__.recursive_QMARK_)){
return cljs.core._assoc_BANG_(cljs.core.transient$(cljs_bean.core.snapshot(self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_)),k,v);
} else {
(self__.obj[(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k))] = (function (){var G__19037 = v;
if(self__.recursive_QMARK_){
return cljs_bean.core.unwrap(G__19037);
} else {
return G__19037;
}
})());

(self__.__cnt = null);

return tcoll__$1;
}
} else {
throw (new Error("assoc! after persistent!"));
}
}));

(cljs_bean.core.TransientBean.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = (function (tcoll,k){
var self__ = this;
var tcoll__$1 = this;
if(self__.editable_QMARK_){
delete self__.obj[(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k))];

(self__.__cnt = null);

return tcoll__$1;
} else {
throw (new Error("dissoc! after persistent!"));
}
}));

(cljs_bean.core.TransientBean.prototype.call = (function() {
var G__19042 = null;
var G__19042__2 = (function (self__,k){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
if(self__.editable_QMARK_){
var G__19038 = (self__.obj[(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k))]);
if(self__.recursive_QMARK_){
return cljs_bean.core.__GT_val(G__19038,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19038;
}
} else {
throw (new Error("lookup after persistent!"));
}
});
var G__19042__3 = (function (self__,k,not_found){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
if(self__.editable_QMARK_){
var ret = goog.object.get(self__.obj,(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k)),not_found);
var G__19039 = ret;
if(((self__.recursive_QMARK_) && ((!((ret === not_found)))))){
return cljs_bean.core.__GT_val(G__19039,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19039;
}
} else {
throw (new Error("lookup after persistent!"));
}
});
G__19042 = function(self__,k,not_found){
switch(arguments.length){
case 2:
return G__19042__2.call(this,self__,k);
case 3:
return G__19042__3.call(this,self__,k,not_found);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
G__19042.cljs$core$IFn$_invoke$arity$2 = G__19042__2;
G__19042.cljs$core$IFn$_invoke$arity$3 = G__19042__3;
return G__19042;
})()
);

(cljs_bean.core.TransientBean.prototype.apply = (function (self__,args19034){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone(args19034)));
}));

(cljs_bean.core.TransientBean.prototype.cljs$core$IFn$_invoke$arity$1 = (function (k){
var self__ = this;
var _ = this;
if(self__.editable_QMARK_){
var G__19040 = (self__.obj[(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k))]);
if(self__.recursive_QMARK_){
return cljs_bean.core.__GT_val(G__19040,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19040;
}
} else {
throw (new Error("lookup after persistent!"));
}
}));

(cljs_bean.core.TransientBean.prototype.cljs$core$IFn$_invoke$arity$2 = (function (k,not_found){
var self__ = this;
var _ = this;
if(self__.editable_QMARK_){
var ret = goog.object.get(self__.obj,(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k)),not_found);
var G__19041 = ret;
if(((self__.recursive_QMARK_) && ((!((ret === not_found)))))){
return cljs_bean.core.__GT_val(G__19041,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19041;
}
} else {
throw (new Error("lookup after persistent!"));
}
}));

(cljs_bean.core.TransientBean.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$editable_QMARK_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$tag,cljs.core.cst$sym$boolean,cljs.core.cst$kw$mutable,true], null)),cljs.core.cst$sym$obj,cljs.core.cst$sym$prop_DASH__GT_key,cljs.core.cst$sym$key_DASH__GT_prop,cljs.core.with_meta(cljs.core.cst$sym$recursive_QMARK_,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$sym$boolean], null)),cljs.core.with_meta(cljs.core.cst$sym$__cnt,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null);
}));

(cljs_bean.core.TransientBean.cljs$lang$type = true);

(cljs_bean.core.TransientBean.cljs$lang$ctorStr = "cljs-bean.core/TransientBean");

(cljs_bean.core.TransientBean.cljs$lang$ctorPrWriter = (function (this__4363__auto__,writer__4364__auto__,opt__4365__auto__){
return cljs.core._write(writer__4364__auto__,"cljs-bean.core/TransientBean");
}));

/**
 * Positional factory function for cljs-bean.core/TransientBean.
 */
cljs_bean.core.__GT_TransientBean = (function cljs_bean$core$__GT_TransientBean(editable_QMARK_,obj,prop__GT_key,key__GT_prop,recursive_QMARK_,__cnt){
return (new cljs_bean.core.TransientBean(editable_QMARK_,obj,prop__GT_key,key__GT_prop,recursive_QMARK_,__cnt));
});


/**
* @constructor
 * @implements {cljs_bean.core.Object}
*/
cljs_bean.core.BeanIterator = (function (obj,prop__GT_key,key__GT_prop,recursive_QMARK_,arr,i,cnt){
this.obj = obj;
this.prop__GT_key = prop__GT_key;
this.key__GT_prop = key__GT_prop;
this.recursive_QMARK_ = recursive_QMARK_;
this.arr = arr;
this.i = i;
this.cnt = cnt;
});
(cljs_bean.core.BeanIterator.prototype.hasNext = (function (){
var self__ = this;
var _ = this;
return (self__.i < self__.cnt);
}));

(cljs_bean.core.BeanIterator.prototype.next = (function (){
var self__ = this;
var _ = this;
var ret = cljs_bean.core.indexed_entry(self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,self__.arr,self__.i);
(self__.i = (self__.i + (1)));

return ret;
}));

(cljs_bean.core.BeanIterator.getBasis = (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$obj,cljs.core.cst$sym$prop_DASH__GT_key,cljs.core.cst$sym$key_DASH__GT_prop,cljs.core.with_meta(cljs.core.cst$sym$recursive_QMARK_,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$sym$boolean], null)),cljs.core.cst$sym$arr,cljs.core.with_meta(cljs.core.cst$sym$i,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.cst$sym$cnt], null);
}));

(cljs_bean.core.BeanIterator.cljs$lang$type = true);

(cljs_bean.core.BeanIterator.cljs$lang$ctorStr = "cljs-bean.core/BeanIterator");

(cljs_bean.core.BeanIterator.cljs$lang$ctorPrWriter = (function (this__4363__auto__,writer__4364__auto__,opt__4365__auto__){
return cljs.core._write(writer__4364__auto__,"cljs-bean.core/BeanIterator");
}));

/**
 * Positional factory function for cljs-bean.core/BeanIterator.
 */
cljs_bean.core.__GT_BeanIterator = (function cljs_bean$core$__GT_BeanIterator(obj,prop__GT_key,key__GT_prop,recursive_QMARK_,arr,i,cnt){
return (new cljs_bean.core.BeanIterator(obj,prop__GT_key,key__GT_prop,recursive_QMARK_,arr,i,cnt));
});


/**
* @constructor
 * @implements {cljs_bean.core.Object}
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ASeq}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.IEmptyableCollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeq}
 * @implements {cljs.core.INext}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.ISequential}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IReduce}
*/
cljs_bean.core.BeanSeq = (function (obj,prop__GT_key,key__GT_prop,recursive_QMARK_,arr,i,meta){
this.obj = obj;
this.prop__GT_key = prop__GT_key;
this.key__GT_prop = key__GT_prop;
this.recursive_QMARK_ = recursive_QMARK_;
this.arr = arr;
this.i = i;
this.meta = meta;
this.cljs$lang$protocol_mask$partition0$ = 2179858686;
this.cljs$lang$protocol_mask$partition1$ = 8192;
});
(cljs_bean.core.BeanSeq.prototype.toString = (function (){
var self__ = this;
var coll = this;
return cljs.core.pr_str_STAR_(coll);
}));

(cljs_bean.core.BeanSeq.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return this$.cljs$core$IEquiv$_equiv$arity$2(null,other);
}));

(cljs_bean.core.BeanSeq.prototype.indexOf = (function() {
var G__19043 = null;
var G__19043__1 = (function (x){
var self__ = this;
var coll = this;
return cljs_bean.from.cljs.core._indexOf.cljs$core$IFn$_invoke$arity$3(coll,x,(0));
});
var G__19043__2 = (function (x,start){
var self__ = this;
var coll = this;
return cljs_bean.from.cljs.core._indexOf.cljs$core$IFn$_invoke$arity$3(coll,x,start);
});
G__19043 = function(x,start){
switch(arguments.length){
case 1:
return G__19043__1.call(this,x);
case 2:
return G__19043__2.call(this,x,start);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__19043.cljs$core$IFn$_invoke$arity$1 = G__19043__1;
G__19043.cljs$core$IFn$_invoke$arity$2 = G__19043__2;
return G__19043;
})()
);

(cljs_bean.core.BeanSeq.prototype.lastIndexOf = (function() {
var G__19044 = null;
var G__19044__1 = (function (x){
var self__ = this;
var coll = this;
return cljs_bean.from.cljs.core._lastIndexOf.cljs$core$IFn$_invoke$arity$3(coll,x,cljs.core.count(coll));
});
var G__19044__2 = (function (x,start){
var self__ = this;
var coll = this;
return cljs_bean.from.cljs.core._lastIndexOf.cljs$core$IFn$_invoke$arity$3(coll,x,start);
});
G__19044 = function(x,start){
switch(arguments.length){
case 1:
return G__19044__1.call(this,x);
case 2:
return G__19044__2.call(this,x,start);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__19044.cljs$core$IFn$_invoke$arity$1 = G__19044__1;
G__19044.cljs$core$IFn$_invoke$arity$2 = G__19044__2;
return G__19044;
})()
);

(cljs_bean.core.BeanSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (_,n){
var self__ = this;
var ___$1 = this;
var i__$1 = (n + self__.i);
if(((((0) <= i__$1)) && ((i__$1 < self__.arr.length)))){
return cljs_bean.core.indexed_entry(self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,self__.arr,i__$1);
} else {
throw (new Error("Index out of bounds"));
}
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (_,n,not_found){
var self__ = this;
var ___$1 = this;
var i__$1 = (n + self__.i);
if(((((0) <= i__$1)) && ((i__$1 < self__.arr.length)))){
return cljs_bean.core.indexed_entry(self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,self__.arr,i__$1);
} else {
return not_found;
}
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var self__ = this;
var coll__$1 = this;
return cljs.core.pr_sequential_writer(writer,cljs.core.pr_writer,"("," ",")",opts,coll__$1);
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.meta;
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (new cljs_bean.core.BeanSeq(self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,self__.arr,self__.i,self__.meta));
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$INext$_next$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(((self__.i + (1)) < self__.arr.length)){
return (new cljs_bean.core.BeanSeq(self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,self__.arr,(self__.i + (1)),null));
} else {
return null;
}
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var x__4208__auto__ = (0);
var y__4209__auto__ = (self__.arr.length - self__.i);
return ((x__4208__auto__ > y__4209__auto__) ? x__4208__auto__ : y__4209__auto__);
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
return cljs.core.hash_ordered_coll(coll__$1);
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var self__ = this;
var coll__$1 = this;
return cljs_bean.from.cljs.core.equiv_sequential(coll__$1,other);
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.List.EMPTY;
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var self__ = this;
var coll__$1 = this;
return cljs_bean.from.cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$2(coll__$1,f);
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var self__ = this;
var coll__$1 = this;
return cljs_bean.from.cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$3(coll__$1,f,start);
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs_bean.core.indexed_entry(self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,self__.arr,self__.i);
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(((self__.i + (1)) < self__.arr.length)){
return (new cljs_bean.core.BeanSeq(self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,self__.arr,(self__.i + (1)),null));
} else {
return cljs.core.List.EMPTY;
}
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return this$__$1;
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,new_meta){
var self__ = this;
var coll__$1 = this;
if((new_meta === self__.meta)){
return coll__$1;
} else {
return (new cljs_bean.core.BeanSeq(self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,self__.arr,self__.i,new_meta));
}
}));

(cljs_bean.core.BeanSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var self__ = this;
var coll__$1 = this;
return cljs.core.cons(o,coll__$1);
}));

(cljs_bean.core.BeanSeq.getBasis = (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$obj,cljs.core.cst$sym$prop_DASH__GT_key,cljs.core.cst$sym$key_DASH__GT_prop,cljs.core.with_meta(cljs.core.cst$sym$recursive_QMARK_,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$sym$boolean], null)),cljs.core.cst$sym$arr,cljs.core.cst$sym$i,cljs.core.cst$sym$meta], null);
}));

(cljs_bean.core.BeanSeq.cljs$lang$type = true);

(cljs_bean.core.BeanSeq.cljs$lang$ctorStr = "cljs-bean.core/BeanSeq");

(cljs_bean.core.BeanSeq.cljs$lang$ctorPrWriter = (function (this__4363__auto__,writer__4364__auto__,opt__4365__auto__){
return cljs.core._write(writer__4364__auto__,"cljs-bean.core/BeanSeq");
}));

/**
 * Positional factory function for cljs-bean.core/BeanSeq.
 */
cljs_bean.core.__GT_BeanSeq = (function cljs_bean$core$__GT_BeanSeq(obj,prop__GT_key,key__GT_prop,recursive_QMARK_,arr,i,meta){
return (new cljs_bean.core.BeanSeq(obj,prop__GT_key,key__GT_prop,recursive_QMARK_,arr,i,meta));
});


/**
* @constructor
 * @implements {cljs_bean.core.Object}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.IEditableCollection}
 * @implements {cljs.core.IFind}
 * @implements {cljs.core.IEmptyableCollection}
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
 * @implements {cljs.core.IReduce}
*/
cljs_bean.core.Bean = (function (meta,obj,prop__GT_key,key__GT_prop,recursive_QMARK_,__arr,__cnt,__hash){
this.meta = meta;
this.obj = obj;
this.prop__GT_key = prop__GT_key;
this.key__GT_prop = key__GT_prop;
this.recursive_QMARK_ = recursive_QMARK_;
this.__arr = __arr;
this.__cnt = __cnt;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2164131599;
this.cljs$lang$protocol_mask$partition1$ = 139268;
});
(cljs_bean.core.Bean.prototype.cljs$core$IFind$ = cljs.core.PROTOCOL_SENTINEL);

(cljs_bean.core.Bean.prototype.cljs$core$IFind$_find$arity$2 = (function (_,k){
var self__ = this;
var ___$1 = this;
var v = goog.object.get(self__.obj,(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k)),cljs_bean.core.lookup_sentinel);
if((v === cljs_bean.core.lookup_sentinel)){
return null;
} else {
return (new cljs.core.MapEntry(k,(function (){var G__19046 = v;
if(self__.recursive_QMARK_){
return cljs_bean.core.__GT_val(G__19046,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19046;
}
})(),null));
}
}));

(cljs_bean.core.Bean.prototype.toString = (function (){
var self__ = this;
var coll = this;
return cljs.core.pr_str_STAR_(coll);
}));

(cljs_bean.core.Bean.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return this$.cljs$core$IEquiv$_equiv$arity$2(null,other);
}));

(cljs_bean.core.Bean.prototype.keys = (function (){
var self__ = this;
var coll = this;
return cljs.core.es6_iterator(cljs.core.keys(coll));
}));

(cljs_bean.core.Bean.prototype.entries = (function (){
var self__ = this;
var coll = this;
return cljs.core.es6_entries_iterator(cljs.core.seq(coll));
}));

(cljs_bean.core.Bean.prototype.values = (function (){
var self__ = this;
var coll = this;
return cljs.core.es6_iterator(cljs.core.vals(coll));
}));

(cljs_bean.core.Bean.prototype.has = (function (k){
var self__ = this;
var coll = this;
return cljs.core.contains_QMARK_(coll,k);
}));

(cljs_bean.core.Bean.prototype.get = (function (k,not_found){
var self__ = this;
var coll = this;
return coll.cljs$core$ILookup$_lookup$arity$3(null,k,not_found);
}));

(cljs_bean.core.Bean.prototype.forEach = (function (f){
var self__ = this;
var coll = this;
var seq__19047 = cljs.core.seq(coll);
var chunk__19048 = null;
var count__19049 = (0);
var i__19050 = (0);
while(true){
if((i__19050 < count__19049)){
var vec__19057 = chunk__19048.cljs$core$IIndexed$_nth$arity$2(null,i__19050);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19057,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19057,(1),null);
(f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(v,k) : f(v,k));


var G__19079 = seq__19047;
var G__19080 = chunk__19048;
var G__19081 = count__19049;
var G__19082 = (i__19050 + (1));
seq__19047 = G__19079;
chunk__19048 = G__19080;
count__19049 = G__19081;
i__19050 = G__19082;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__19047);
if(temp__5735__auto__){
var seq__19047__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__19047__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__19047__$1);
var G__19083 = cljs.core.chunk_rest(seq__19047__$1);
var G__19084 = c__4550__auto__;
var G__19085 = cljs.core.count(c__4550__auto__);
var G__19086 = (0);
seq__19047 = G__19083;
chunk__19048 = G__19084;
count__19049 = G__19085;
i__19050 = G__19086;
continue;
} else {
var vec__19060 = cljs.core.first(seq__19047__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19060,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19060,(1),null);
(f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(v,k) : f(v,k));


var G__19087 = cljs.core.next(seq__19047__$1);
var G__19088 = null;
var G__19089 = (0);
var G__19090 = (0);
seq__19047 = G__19087;
chunk__19048 = G__19088;
count__19049 = G__19089;
i__19050 = G__19090;
continue;
}
} else {
return null;
}
}
break;
}
}));

(cljs_bean.core.Bean.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (_,k){
var self__ = this;
var ___$1 = this;
var G__19063 = (self__.obj[(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k))]);
if(self__.recursive_QMARK_){
return cljs_bean.core.__GT_val(G__19063,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19063;
}
}));

(cljs_bean.core.Bean.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (_,k,not_found){
var self__ = this;
var ___$1 = this;
var ret = goog.object.get(self__.obj,(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k)),not_found);
var G__19064 = ret;
if(((self__.recursive_QMARK_) && ((!((ret === not_found)))))){
return cljs_bean.core.__GT_val(G__19064,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19064;
}
}));

(cljs_bean.core.Bean.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (_,f,init){
var self__ = this;
var ___$1 = this;
try{var result = cljs.core.volatile_BANG_(init);
goog.object.forEach(self__.obj,(function (v,k,___$2){
var r = result.cljs$core$IVolatile$_vreset_BANG_$arity$2(null,(function (){var G__19066 = result.cljs$core$IDeref$_deref$arity$1(null);
var G__19067 = (self__.prop__GT_key.cljs$core$IFn$_invoke$arity$1 ? self__.prop__GT_key.cljs$core$IFn$_invoke$arity$1(k) : self__.prop__GT_key(k));
var G__19068 = (function (){var G__19069 = v;
if(self__.recursive_QMARK_){
return cljs_bean.core.__GT_val(G__19069,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19069;
}
})();
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__19066,G__19067,G__19068) : f(G__19066,G__19067,G__19068));
})());
if(cljs.core.reduced_QMARK_(r)){
throw r;
} else {
return null;
}
}));

return cljs.core.deref(result);
}catch (e19065){var x = e19065;
if(cljs.core.reduced_QMARK_(x)){
return cljs.core.deref(x);
} else {
throw x;
}
}}));

(cljs_bean.core.Bean.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var self__ = this;
var coll__$1 = this;
return cljs.core.print_map(coll__$1,cljs.core.pr_writer,writer,opts);
}));

(cljs_bean.core.Bean.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
if((self__.__arr == null)){
(self__.__arr = cljs.core.js_keys(self__.obj));
} else {
}

return (new cljs_bean.core.BeanIterator(self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,self__.__arr,(0),coll__$1.cljs$core$ICounted$_count$arity$1(null)));
}));

(cljs_bean.core.Bean.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.meta;
}));

(cljs_bean.core.Bean.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (new cljs_bean.core.Bean(self__.meta,self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,self__.__arr,self__.__cnt,self__.__hash));
}));

(cljs_bean.core.Bean.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if((self__.__cnt == null)){
if((self__.__arr == null)){
(self__.__arr = cljs.core.js_keys(self__.obj));
} else {
}

return (self__.__cnt = self__.__arr.length);
} else {
return self__.__cnt;
}
}));

(cljs_bean.core.Bean.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
var h__4232__auto__ = self__.__hash;
if((!((h__4232__auto__ == null)))){
return h__4232__auto__;
} else {
var h__4232__auto____$1 = cljs.core.hash_unordered_coll(coll__$1);
(self__.__hash = h__4232__auto____$1);

return h__4232__auto____$1;
}
}));

(cljs_bean.core.Bean.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var self__ = this;
var coll__$1 = this;
return cljs.core.equiv_map(coll__$1,other);
}));

(cljs_bean.core.Bean.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (new cljs_bean.core.TransientBean(true,goog.object.clone(self__.obj),self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,self__.__cnt));
}));

(cljs_bean.core.Bean.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (new cljs_bean.core.Bean(self__.meta,({}),self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,[],(0),null));
}));

(cljs_bean.core.Bean.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var self__ = this;
var coll__$1 = this;
return cljs.core._reduce.cljs$core$IFn$_invoke$arity$2(coll__$1.cljs$core$ISeqable$_seq$arity$1(null),f);
}));

(cljs_bean.core.Bean.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var self__ = this;
var coll__$1 = this;
return coll__$1.cljs$core$IKVReduce$_kv_reduce$arity$3(null,(function (r,k,v){
var G__19070 = r;
var G__19071 = (new cljs.core.MapEntry(k,v,null));
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__19070,G__19071) : f(G__19070,G__19071));
}),start);
}));

(cljs_bean.core.Bean.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (_,k){
var self__ = this;
var ___$1 = this;
return (new cljs_bean.core.Bean(self__.meta,(function (){var G__19072 = goog.object.clone(self__.obj);
delete G__19072[(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k))];

return G__19072;
})(),self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,null,null,null));
}));

(cljs_bean.core.Bean.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (_,k,v){
var self__ = this;
var ___$1 = this;
if(cljs_bean.core.snapshot_QMARK_(k,v,self__.prop__GT_key,self__.recursive_QMARK_)){
return cljs.core._assoc(cljs.core.with_meta(cljs_bean.core.snapshot(self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_),self__.meta),k,v);
} else {
return (new cljs_bean.core.Bean(self__.meta,(function (){var G__19073 = goog.object.clone(self__.obj);
(G__19073[(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k))] = (function (){var G__19074 = v;
if(self__.recursive_QMARK_){
return cljs_bean.core.unwrap(G__19074);
} else {
return G__19074;
}
})());

return G__19073;
})(),self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,null,null,null));
}
}));

(cljs_bean.core.Bean.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var self__ = this;
var coll__$1 = this;
return cljs.core.contains_QMARK_(coll__$1,k);
}));

(cljs_bean.core.Bean.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if((self__.__arr == null)){
(self__.__arr = cljs.core.js_keys(self__.obj));
} else {
}

if((self__.__arr.length > (0))){
return (new cljs_bean.core.BeanSeq(self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,self__.__arr,(0),null));
} else {
return null;
}
}));

(cljs_bean.core.Bean.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,new_meta){
var self__ = this;
var coll__$1 = this;
if((new_meta === self__.meta)){
return coll__$1;
} else {
return (new cljs_bean.core.Bean(new_meta,self__.obj,self__.prop__GT_key,self__.key__GT_prop,self__.recursive_QMARK_,self__.__arr,self__.__cnt,self__.__hash));
}
}));

(cljs_bean.core.Bean.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var self__ = this;
var coll__$1 = this;
return cljs_bean.from.cljs.core.PersistentArrayMap_conj(coll__$1,entry);
}));

(cljs_bean.core.Bean.prototype.call = (function() {
var G__19091 = null;
var G__19091__2 = (function (self__,k){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
var G__19075 = (self__.obj[(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k))]);
if(self__.recursive_QMARK_){
return cljs_bean.core.__GT_val(G__19075,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19075;
}
});
var G__19091__3 = (function (self__,k,not_found){
var self__ = this;
var self____$1 = this;
var _ = self____$1;
var ret = goog.object.get(self__.obj,(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k)),not_found);
var G__19076 = ret;
if(((self__.recursive_QMARK_) && ((!((ret === not_found)))))){
return cljs_bean.core.__GT_val(G__19076,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19076;
}
});
G__19091 = function(self__,k,not_found){
switch(arguments.length){
case 2:
return G__19091__2.call(this,self__,k);
case 3:
return G__19091__3.call(this,self__,k,not_found);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
G__19091.cljs$core$IFn$_invoke$arity$2 = G__19091__2;
G__19091.cljs$core$IFn$_invoke$arity$3 = G__19091__3;
return G__19091;
})()
);

(cljs_bean.core.Bean.prototype.apply = (function (self__,args19045){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone(args19045)));
}));

(cljs_bean.core.Bean.prototype.cljs$core$IFn$_invoke$arity$1 = (function (k){
var self__ = this;
var _ = this;
var G__19077 = (self__.obj[(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k))]);
if(self__.recursive_QMARK_){
return cljs_bean.core.__GT_val(G__19077,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19077;
}
}));

(cljs_bean.core.Bean.prototype.cljs$core$IFn$_invoke$arity$2 = (function (k,not_found){
var self__ = this;
var _ = this;
var ret = goog.object.get(self__.obj,(self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1 ? self__.key__GT_prop.cljs$core$IFn$_invoke$arity$1(k) : self__.key__GT_prop(k)),not_found);
var G__19078 = ret;
if(((self__.recursive_QMARK_) && ((!((ret === not_found)))))){
return cljs_bean.core.__GT_val(G__19078,self__.prop__GT_key,self__.key__GT_prop);
} else {
return G__19078;
}
}));

(cljs_bean.core.Bean.getBasis = (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$meta,cljs.core.cst$sym$obj,cljs.core.cst$sym$prop_DASH__GT_key,cljs.core.cst$sym$key_DASH__GT_prop,cljs.core.with_meta(cljs.core.cst$sym$recursive_QMARK_,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$sym$boolean], null)),cljs.core.with_meta(cljs.core.cst$sym$__arr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$__cnt,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$__hash,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null);
}));

(cljs_bean.core.Bean.cljs$lang$type = true);

(cljs_bean.core.Bean.cljs$lang$ctorStr = "cljs-bean.core/Bean");

(cljs_bean.core.Bean.cljs$lang$ctorPrWriter = (function (this__4363__auto__,writer__4364__auto__,opt__4365__auto__){
return cljs.core._write(writer__4364__auto__,"cljs-bean.core/Bean");
}));

/**
 * Positional factory function for cljs-bean.core/Bean.
 */
cljs_bean.core.__GT_Bean = (function cljs_bean$core$__GT_Bean(meta,obj,prop__GT_key,key__GT_prop,recursive_QMARK_,__arr,__cnt,__hash){
return (new cljs_bean.core.Bean(meta,obj,prop__GT_key,key__GT_prop,recursive_QMARK_,__arr,__cnt,__hash));
});


/**
* @constructor
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ITransientCollection}
 * @implements {cljs.core.ITransientVector}
 * @implements {cljs.core.ITransientAssociative}
 * @implements {cljs.core.ILookup}
*/
cljs_bean.core.TransientArrayVector = (function (editable_QMARK_,arr,prop__GT_key,key__GT_prop){
this.editable_QMARK_ = editable_QMARK_;
this.arr = arr;
this.prop__GT_key = prop__GT_key;
this.key__GT_prop = key__GT_prop;
this.cljs$lang$protocol_mask$partition1$ = 88;
this.cljs$lang$protocol_mask$partition0$ = 275;
});
(cljs_bean.core.TransientArrayVector.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var self__ = this;
var tcoll__$1 = this;
if(self__.editable_QMARK_){
if((!(cljs_bean.core.compatible_value_QMARK_(o,true)))){
return cljs.core._conj_BANG_(cljs.core.transient$(cljs.core.vec(self__.arr)),o);
} else {
self__.arr.push(cljs_bean.core.unwrap(o));

return tcoll__$1;
}
} else {
throw (new Error("conj! after persistent!"));
}
}));

(cljs_bean.core.TransientArrayVector.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(self__.editable_QMARK_){
(self__.editable_QMARK_ = false);

return (new cljs_bean.core.ArrayVector(null,self__.prop__GT_key,self__.key__GT_prop,self__.arr,null));
} else {
throw (new Error("persistent! called twice"));
}
}));

(cljs_bean.core.TransientArrayVector.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = (function (tcoll,key,val){
var self__ = this;
var tcoll__$1 = this;
return cljs_bean.from.cljs.core.TransientVector_assoc_BANG_(tcoll__$1,key,val,"TransientArrayVector");
}));

(cljs_bean.core.TransientArrayVector.prototype.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 = (function (tcoll,n,val){
var self__ = this;
var tcoll__$1 = this;
if(self__.editable_QMARK_){
if((!(cljs_bean.core.compatible_value_QMARK_(val,true)))){
return cljs.core._assoc_n_BANG_(cljs.core.transient$(cljs.core.vec(self__.arr)),n,val);
} else {
if(((((0) <= n)) && ((n < self__.arr.length)))){
(self__.arr[n] = cljs_bean.core.unwrap(val));

return tcoll__$1;
} else {
if((n === self__.arr.length)){
return tcoll__$1.cljs$core$ITransientCollection$_conj_BANG_$arity$2(null,val);
} else {
throw (new Error(["Index ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)," out of bounds for TransientArrayVector of length",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.arr.length)].join('')));

}
}
}
} else {
throw (new Error("assoc! after persistent!"));
}
}));

(cljs_bean.core.TransientArrayVector.prototype.cljs$core$ITransientVector$_pop_BANG_$arity$1 = (function (tcoll){
var self__ = this;
var tcoll__$1 = this;
if(self__.editable_QMARK_){
if((self__.arr.length === (0))){
throw (new Error("Can't pop empty vector"));
} else {
(self__.arr = self__.arr.slice((0),(self__.arr.length - (1))));

return tcoll__$1;
}
} else {
throw (new Error("pop! after persistent!"));
}
}));

(cljs_bean.core.TransientArrayVector.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(self__.editable_QMARK_){
return self__.arr.length;
} else {
throw (new Error("count after persistent!"));
}
}));

(cljs_bean.core.TransientArrayVector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (_,n){
var self__ = this;
var ___$1 = this;
if(self__.editable_QMARK_){
return cljs_bean.core.__GT_val((self__.arr[n]),self__.prop__GT_key,self__.key__GT_prop);
} else {
throw (new Error("nth after persistent!"));
}
}));

(cljs_bean.core.TransientArrayVector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var self__ = this;
var coll__$1 = this;
if(((((0) <= n)) && ((n < self__.arr.length)))){
return coll__$1.cljs$core$IIndexed$_nth$arity$2(null,n);
} else {
return not_found;
}
}));

(cljs_bean.core.TransientArrayVector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var self__ = this;
var coll__$1 = this;
return coll__$1.cljs$core$ILookup$_lookup$arity$3(null,k,null);
}));

(cljs_bean.core.TransientArrayVector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var self__ = this;
var coll__$1 = this;
if(typeof k === 'number'){
return coll__$1.cljs$core$IIndexed$_nth$arity$3(null,k,not_found);
} else {
return not_found;
}
}));

(cljs_bean.core.TransientArrayVector.prototype.call = (function() {
var G__19093 = null;
var G__19093__2 = (function (self__,k){
var self__ = this;
var self____$1 = this;
var coll = self____$1;
return coll.cljs$core$ILookup$_lookup$arity$2(null,k);
});
var G__19093__3 = (function (self__,k,not_found){
var self__ = this;
var self____$1 = this;
var coll = self____$1;
return coll.cljs$core$ILookup$_lookup$arity$3(null,k,not_found);
});
G__19093 = function(self__,k,not_found){
switch(arguments.length){
case 2:
return G__19093__2.call(this,self__,k);
case 3:
return G__19093__3.call(this,self__,k,not_found);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
G__19093.cljs$core$IFn$_invoke$arity$2 = G__19093__2;
G__19093.cljs$core$IFn$_invoke$arity$3 = G__19093__3;
return G__19093;
})()
);

(cljs_bean.core.TransientArrayVector.prototype.apply = (function (self__,args19092){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone(args19092)));
}));

(cljs_bean.core.TransientArrayVector.prototype.cljs$core$IFn$_invoke$arity$1 = (function (k){
var self__ = this;
var coll = this;
return coll.cljs$core$ILookup$_lookup$arity$2(null,k);
}));

(cljs_bean.core.TransientArrayVector.prototype.cljs$core$IFn$_invoke$arity$2 = (function (k,not_found){
var self__ = this;
var coll = this;
return coll.cljs$core$ILookup$_lookup$arity$3(null,k,not_found);
}));

(cljs_bean.core.TransientArrayVector.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$editable_QMARK_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$tag,cljs.core.cst$sym$boolean,cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$arr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.cst$sym$prop_DASH__GT_key,cljs.core.cst$sym$key_DASH__GT_prop], null);
}));

(cljs_bean.core.TransientArrayVector.cljs$lang$type = true);

(cljs_bean.core.TransientArrayVector.cljs$lang$ctorStr = "cljs-bean.core/TransientArrayVector");

(cljs_bean.core.TransientArrayVector.cljs$lang$ctorPrWriter = (function (this__4363__auto__,writer__4364__auto__,opt__4365__auto__){
return cljs.core._write(writer__4364__auto__,"cljs-bean.core/TransientArrayVector");
}));

/**
 * Positional factory function for cljs-bean.core/TransientArrayVector.
 */
cljs_bean.core.__GT_TransientArrayVector = (function cljs_bean$core$__GT_TransientArrayVector(editable_QMARK_,arr,prop__GT_key,key__GT_prop){
return (new cljs_bean.core.TransientArrayVector(editable_QMARK_,arr,prop__GT_key,key__GT_prop));
});


/**
* @constructor
 * @implements {cljs_bean.core.Object}
*/
cljs_bean.core.ArrayVectorIterator = (function (prop__GT_key,key__GT_prop,arr,i,cnt){
this.prop__GT_key = prop__GT_key;
this.key__GT_prop = key__GT_prop;
this.arr = arr;
this.i = i;
this.cnt = cnt;
});
(cljs_bean.core.ArrayVectorIterator.prototype.hasNext = (function (){
var self__ = this;
var _ = this;
return (self__.i < self__.cnt);
}));

(cljs_bean.core.ArrayVectorIterator.prototype.next = (function (){
var self__ = this;
var _ = this;
var ret = cljs_bean.core.__GT_val((self__.arr[self__.i]),self__.prop__GT_key,self__.key__GT_prop);
(self__.i = (self__.i + (1)));

return ret;
}));

(cljs_bean.core.ArrayVectorIterator.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$prop_DASH__GT_key,cljs.core.cst$sym$key_DASH__GT_prop,cljs.core.cst$sym$arr,cljs.core.with_meta(cljs.core.cst$sym$i,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.cst$sym$cnt], null);
}));

(cljs_bean.core.ArrayVectorIterator.cljs$lang$type = true);

(cljs_bean.core.ArrayVectorIterator.cljs$lang$ctorStr = "cljs-bean.core/ArrayVectorIterator");

(cljs_bean.core.ArrayVectorIterator.cljs$lang$ctorPrWriter = (function (this__4363__auto__,writer__4364__auto__,opt__4365__auto__){
return cljs.core._write(writer__4364__auto__,"cljs-bean.core/ArrayVectorIterator");
}));

/**
 * Positional factory function for cljs-bean.core/ArrayVectorIterator.
 */
cljs_bean.core.__GT_ArrayVectorIterator = (function cljs_bean$core$__GT_ArrayVectorIterator(prop__GT_key,key__GT_prop,arr,i,cnt){
return (new cljs_bean.core.ArrayVectorIterator(prop__GT_key,key__GT_prop,arr,i,cnt));
});


/**
* @constructor
 * @implements {cljs_bean.core.Object}
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ASeq}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.IEmptyableCollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeq}
 * @implements {cljs.core.INext}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.ISequential}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IReduce}
*/
cljs_bean.core.ArrayVectorSeq = (function (prop__GT_key,key__GT_prop,arr,i,meta){
this.prop__GT_key = prop__GT_key;
this.key__GT_prop = key__GT_prop;
this.arr = arr;
this.i = i;
this.meta = meta;
this.cljs$lang$protocol_mask$partition0$ = 2179858686;
this.cljs$lang$protocol_mask$partition1$ = 8192;
});
(cljs_bean.core.ArrayVectorSeq.prototype.toString = (function (){
var self__ = this;
var coll = this;
return cljs.core.pr_str_STAR_(coll);
}));

(cljs_bean.core.ArrayVectorSeq.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return this$.cljs$core$IEquiv$_equiv$arity$2(null,other);
}));

(cljs_bean.core.ArrayVectorSeq.prototype.indexOf = (function() {
var G__19094 = null;
var G__19094__1 = (function (x){
var self__ = this;
var coll = this;
return cljs_bean.from.cljs.core._indexOf.cljs$core$IFn$_invoke$arity$3(coll,x,(0));
});
var G__19094__2 = (function (x,start){
var self__ = this;
var coll = this;
return cljs_bean.from.cljs.core._indexOf.cljs$core$IFn$_invoke$arity$3(coll,x,start);
});
G__19094 = function(x,start){
switch(arguments.length){
case 1:
return G__19094__1.call(this,x);
case 2:
return G__19094__2.call(this,x,start);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__19094.cljs$core$IFn$_invoke$arity$1 = G__19094__1;
G__19094.cljs$core$IFn$_invoke$arity$2 = G__19094__2;
return G__19094;
})()
);

(cljs_bean.core.ArrayVectorSeq.prototype.lastIndexOf = (function() {
var G__19095 = null;
var G__19095__1 = (function (x){
var self__ = this;
var coll = this;
return cljs_bean.from.cljs.core._lastIndexOf.cljs$core$IFn$_invoke$arity$3(coll,x,cljs.core.count(coll));
});
var G__19095__2 = (function (x,start){
var self__ = this;
var coll = this;
return cljs_bean.from.cljs.core._lastIndexOf.cljs$core$IFn$_invoke$arity$3(coll,x,start);
});
G__19095 = function(x,start){
switch(arguments.length){
case 1:
return G__19095__1.call(this,x);
case 2:
return G__19095__2.call(this,x,start);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__19095.cljs$core$IFn$_invoke$arity$1 = G__19095__1;
G__19095.cljs$core$IFn$_invoke$arity$2 = G__19095__2;
return G__19095;
})()
);

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (_,n){
var self__ = this;
var ___$1 = this;
var i__$1 = (n + self__.i);
if(((((0) <= i__$1)) && ((i__$1 < self__.arr.length)))){
return cljs_bean.core.__GT_val((self__.arr[i__$1]),self__.prop__GT_key,self__.key__GT_prop);
} else {
throw (new Error("Index out of bounds"));
}
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (_,n,not_found){
var self__ = this;
var ___$1 = this;
var i__$1 = (n + self__.i);
if(((((0) <= i__$1)) && ((i__$1 < self__.arr.length)))){
return cljs_bean.core.__GT_val((self__.arr[i__$1]),self__.prop__GT_key,self__.key__GT_prop);
} else {
return not_found;
}
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var self__ = this;
var coll__$1 = this;
return cljs.core.pr_sequential_writer(writer,cljs.core.pr_writer,"("," ",")",opts,coll__$1);
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.meta;
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (new cljs_bean.core.ArrayVectorSeq(self__.prop__GT_key,self__.key__GT_prop,self__.arr,self__.i,self__.meta));
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$INext$_next$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(((self__.i + (1)) < self__.arr.length)){
return (new cljs_bean.core.ArrayVectorSeq(self__.prop__GT_key,self__.key__GT_prop,self__.arr,(self__.i + (1)),null));
} else {
return null;
}
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var x__4208__auto__ = (0);
var y__4209__auto__ = (self__.arr.length - self__.i);
return ((x__4208__auto__ > y__4209__auto__) ? x__4208__auto__ : y__4209__auto__);
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
return cljs.core.hash_ordered_coll(coll__$1);
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var self__ = this;
var coll__$1 = this;
return cljs_bean.from.cljs.core.equiv_sequential(coll__$1,other);
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.List.EMPTY;
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var self__ = this;
var coll__$1 = this;
return cljs_bean.from.cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$2(coll__$1,f);
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var self__ = this;
var coll__$1 = this;
return cljs_bean.from.cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$3(coll__$1,f,start);
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs_bean.core.__GT_val((self__.arr[self__.i]),self__.prop__GT_key,self__.key__GT_prop);
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(((self__.i + (1)) < self__.arr.length)){
return (new cljs_bean.core.ArrayVectorSeq(self__.prop__GT_key,self__.key__GT_prop,self__.arr,(self__.i + (1)),null));
} else {
return cljs.core.List.EMPTY;
}
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return this$__$1;
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,new_meta){
var self__ = this;
var coll__$1 = this;
if((new_meta === self__.meta)){
return coll__$1;
} else {
return (new cljs_bean.core.ArrayVectorSeq(self__.prop__GT_key,self__.key__GT_prop,self__.arr,self__.i,new_meta));
}
}));

(cljs_bean.core.ArrayVectorSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var self__ = this;
var coll__$1 = this;
return cljs.core.cons(o,coll__$1);
}));

(cljs_bean.core.ArrayVectorSeq.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$prop_DASH__GT_key,cljs.core.cst$sym$key_DASH__GT_prop,cljs.core.cst$sym$arr,cljs.core.cst$sym$i,cljs.core.cst$sym$meta], null);
}));

(cljs_bean.core.ArrayVectorSeq.cljs$lang$type = true);

(cljs_bean.core.ArrayVectorSeq.cljs$lang$ctorStr = "cljs-bean.core/ArrayVectorSeq");

(cljs_bean.core.ArrayVectorSeq.cljs$lang$ctorPrWriter = (function (this__4363__auto__,writer__4364__auto__,opt__4365__auto__){
return cljs.core._write(writer__4364__auto__,"cljs-bean.core/ArrayVectorSeq");
}));

/**
 * Positional factory function for cljs-bean.core/ArrayVectorSeq.
 */
cljs_bean.core.__GT_ArrayVectorSeq = (function cljs_bean$core$__GT_ArrayVectorSeq(prop__GT_key,key__GT_prop,arr,i,meta){
return (new cljs_bean.core.ArrayVectorSeq(prop__GT_key,key__GT_prop,arr,i,meta));
});


/**
* @constructor
 * @implements {cljs_bean.core.Object}
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.IVector}
 * @implements {cljs.core.IReversible}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.IEditableCollection}
 * @implements {cljs.core.IFind}
 * @implements {cljs.core.IEmptyableCollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IStack}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IComparable}
 * @implements {cljs.core.ISequential}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.ILookup}
 * @implements {cljs.core.IReduce}
*/
cljs_bean.core.ArrayVector = (function (meta,prop__GT_key,key__GT_prop,arr,__hash){
this.meta = meta;
this.prop__GT_key = prop__GT_key;
this.key__GT_prop = key__GT_prop;
this.arr = arr;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2315150111;
this.cljs$lang$protocol_mask$partition1$ = 141316;
});
(cljs_bean.core.ArrayVector.prototype.cljs$core$IFind$ = cljs.core.PROTOCOL_SENTINEL);

(cljs_bean.core.ArrayVector.prototype.cljs$core$IFind$_find$arity$2 = (function (coll,n){
var self__ = this;
var coll__$1 = this;
if(((((0) <= n)) && ((n < self__.arr.length)))){
return (new cljs.core.MapEntry(n,cljs_bean.core.__GT_val((self__.arr[n]),self__.prop__GT_key,self__.key__GT_prop),null));
} else {
return null;
}
}));

(cljs_bean.core.ArrayVector.prototype.toString = (function (){
var self__ = this;
var coll = this;
return cljs.core.pr_str_STAR_(coll);
}));

(cljs_bean.core.ArrayVector.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return this$.cljs$core$IEquiv$_equiv$arity$2(null,other);
}));

(cljs_bean.core.ArrayVector.prototype.indexOf = (function() {
var G__19100 = null;
var G__19100__1 = (function (x){
var self__ = this;
var coll = this;
return cljs_bean.from.cljs.core._indexOf.cljs$core$IFn$_invoke$arity$3(coll,x,(0));
});
var G__19100__2 = (function (x,start){
var self__ = this;
var coll = this;
return cljs_bean.from.cljs.core._indexOf.cljs$core$IFn$_invoke$arity$3(coll,x,start);
});
G__19100 = function(x,start){
switch(arguments.length){
case 1:
return G__19100__1.call(this,x);
case 2:
return G__19100__2.call(this,x,start);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__19100.cljs$core$IFn$_invoke$arity$1 = G__19100__1;
G__19100.cljs$core$IFn$_invoke$arity$2 = G__19100__2;
return G__19100;
})()
);

(cljs_bean.core.ArrayVector.prototype.lastIndexOf = (function() {
var G__19101 = null;
var G__19101__1 = (function (x){
var self__ = this;
var coll = this;
return cljs_bean.from.cljs.core._lastIndexOf.cljs$core$IFn$_invoke$arity$2(coll,x);
});
var G__19101__2 = (function (x,start){
var self__ = this;
var coll = this;
return cljs_bean.from.cljs.core._lastIndexOf.cljs$core$IFn$_invoke$arity$3(coll,x,start);
});
G__19101 = function(x,start){
switch(arguments.length){
case 1:
return G__19101__1.call(this,x);
case 2:
return G__19101__2.call(this,x,start);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__19101.cljs$core$IFn$_invoke$arity$1 = G__19101__1;
G__19101.cljs$core$IFn$_invoke$arity$2 = G__19101__2;
return G__19101;
})()
);

(cljs_bean.core.ArrayVector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var self__ = this;
var coll__$1 = this;
return coll__$1.cljs$core$ILookup$_lookup$arity$3(null,k,null);
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var self__ = this;
var coll__$1 = this;
return cljs_bean.from.cljs.core.PersistentVector_lookup(coll__$1,k,not_found);
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (v,f,init){
var self__ = this;
var v__$1 = this;
var i = (0);
var init__$1 = init;
while(true){
if((i < self__.arr.length)){
var len = self__.arr.length;
var init__$2 = (function (){var j = (0);
var init__$2 = init__$1;
while(true){
if((j < len)){
var init__$3 = (function (){var G__19097 = init__$2;
var G__19098 = (j + i);
var G__19099 = cljs_bean.core.__GT_val((self__.arr[j]),self__.prop__GT_key,self__.key__GT_prop);
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__19097,G__19098,G__19099) : f(G__19097,G__19098,G__19099));
})();
if(cljs.core.reduced_QMARK_(init__$3)){
return init__$3;
} else {
var G__19102 = (j + (1));
var G__19103 = init__$3;
j = G__19102;
init__$2 = G__19103;
continue;
}
} else {
return init__$2;
}
break;
}
})();
if(cljs.core.reduced_QMARK_(init__$2)){
return cljs.core.deref(init__$2);
} else {
var G__19104 = (i + len);
var G__19105 = init__$2;
i = G__19104;
init__$1 = G__19105;
continue;
}
} else {
return init__$1;
}
break;
}
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var self__ = this;
var coll__$1 = this;
if(((((0) <= n)) && ((n < self__.arr.length)))){
return cljs_bean.core.__GT_val((self__.arr[n]),self__.prop__GT_key,self__.key__GT_prop);
} else {
throw (new Error(["No item ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)," in vector of length ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.arr.length)].join('')));
}
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var self__ = this;
var coll__$1 = this;
if(((((0) <= n)) && ((n < self__.arr.length)))){
return cljs_bean.core.__GT_val((self__.arr[n]),self__.prop__GT_key,self__.key__GT_prop);
} else {
return not_found;
}
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var self__ = this;
var coll__$1 = this;
return cljs.core.pr_sequential_writer(writer,cljs.core.pr_writer,"["," ","]",opts,coll__$1);
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (coll,n,val){
var self__ = this;
var coll__$1 = this;
if(((((0) <= n)) && ((n < self__.arr.length)))){
if((!(cljs_bean.core.compatible_value_QMARK_(val,true)))){
return cljs.core._assoc_n(cljs.core.vec(self__.arr),n,val);
} else {
var new_arr = cljs.core.aclone(self__.arr);
(new_arr[n] = cljs_bean.core.unwrap(val));

return (new cljs_bean.core.ArrayVector(self__.meta,self__.prop__GT_key,self__.key__GT_prop,new_arr,null));
}
} else {
if((n === self__.arr.length)){
return coll__$1.cljs$core$ICollection$_conj$arity$2(null,val);
} else {
throw (new Error(["Index ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)," out of bounds  [0,",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.arr.length),"]"].join('')));

}
}
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (new cljs_bean.core.ArrayVectorIterator(self__.prop__GT_key,self__.key__GT_prop,self__.arr,(0),self__.arr.length));
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
return self__.meta;
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (new cljs_bean.core.ArrayVector(self__.meta,self__.prop__GT_key,self__.key__GT_prop,self__.arr,self__.__hash));
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
return self__.arr.length;
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
if((self__.arr.length > (0))){
return coll__$1.cljs$core$IIndexed$_nth$arity$2(null,(self__.arr.length - (1)));
} else {
return null;
}
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
if((self__.arr.length === (0))){
throw (new Error("Can't pop empty vector"));
} else {
if(((1) === self__.arr.length)){
return coll__$1.cljs$core$IEmptyableCollection$_empty$arity$1(null);
} else {
var new_arr = cljs.core.aclone(self__.arr);
return (new cljs_bean.core.ArrayVector(self__.meta,self__.prop__GT_key,self__.key__GT_prop,new_arr.slice((0),(new_arr.length - (1))),null));

}
}
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
if((self__.arr.length > (0))){
return (new cljs.core.RSeq(coll__$1,(self__.arr.length - (1)),null));
} else {
return null;
}
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
var h__4232__auto__ = self__.__hash;
if((!((h__4232__auto__ == null)))){
return h__4232__auto__;
} else {
var h__4232__auto____$1 = cljs.core.hash_ordered_coll(coll__$1);
(self__.__hash = h__4232__auto____$1);

return h__4232__auto____$1;
}
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var self__ = this;
var coll__$1 = this;
return cljs_bean.from.cljs.core.PersistentVector_equiv(coll__$1,other,cljs_bean.core.ArrayVector,self__.arr.length);
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
return (new cljs_bean.core.TransientArrayVector(true,cljs.core.aclone(self__.arr),self__.prop__GT_key,self__.key__GT_prop));
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
return (new cljs_bean.core.ArrayVector(self__.meta,self__.prop__GT_key,self__.key__GT_prop,[],null));
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (v,f){
var self__ = this;
var v__$1 = this;
return cljs_bean.from.cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$2(v__$1,f);
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (v,f,init){
var self__ = this;
var v__$1 = this;
return cljs_bean.from.cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$3(v__$1,f,init);
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var self__ = this;
var coll__$1 = this;
return cljs_bean.from.cljs.core.PersistentVector_assoc(coll__$1,k,v);
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var self__ = this;
var coll__$1 = this;
return cljs_bean.from.cljs.core.PersistentVector_contains_key_QMARK_(coll__$1,k,self__.arr.length);
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
if((self__.arr.length > (0))){
return (new cljs_bean.core.ArrayVectorSeq(self__.prop__GT_key,self__.key__GT_prop,self__.arr,(0),null));
} else {
return null;
}
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,new_meta){
var self__ = this;
var coll__$1 = this;
if((new_meta === self__.meta)){
return coll__$1;
} else {
return (new cljs_bean.core.ArrayVector(new_meta,self__.prop__GT_key,self__.key__GT_prop,self__.arr,self__.__hash));
}
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$ICollection$_conj$arity$2 = (function (_,o){
var self__ = this;
var ___$1 = this;
if((!(cljs_bean.core.compatible_value_QMARK_(o,true)))){
return cljs.core._conj(cljs.core.vec(self__.arr),o);
} else {
var new_arr = cljs.core.aclone(self__.arr);
(new_arr[new_arr.length] = cljs_bean.core.unwrap(o));

return (new cljs_bean.core.ArrayVector(self__.meta,self__.prop__GT_key,self__.key__GT_prop,new_arr,null));
}
}));

(cljs_bean.core.ArrayVector.prototype.call = (function() {
var G__19106 = null;
var G__19106__2 = (function (self__,k){
var self__ = this;
var self____$1 = this;
var coll = self____$1;
return coll.cljs$core$IIndexed$_nth$arity$2(null,k);
});
var G__19106__3 = (function (self__,k,not_found){
var self__ = this;
var self____$1 = this;
var coll = self____$1;
return coll.cljs$core$IIndexed$_nth$arity$3(null,k,not_found);
});
G__19106 = function(self__,k,not_found){
switch(arguments.length){
case 2:
return G__19106__2.call(this,self__,k);
case 3:
return G__19106__3.call(this,self__,k,not_found);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
G__19106.cljs$core$IFn$_invoke$arity$2 = G__19106__2;
G__19106.cljs$core$IFn$_invoke$arity$3 = G__19106__3;
return G__19106;
})()
);

(cljs_bean.core.ArrayVector.prototype.apply = (function (self__,args19096){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone(args19096)));
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IFn$_invoke$arity$1 = (function (k){
var self__ = this;
var coll = this;
return coll.cljs$core$IIndexed$_nth$arity$2(null,k);
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IFn$_invoke$arity$2 = (function (k,not_found){
var self__ = this;
var coll = this;
return coll.cljs$core$IIndexed$_nth$arity$3(null,k,not_found);
}));

(cljs_bean.core.ArrayVector.prototype.cljs$core$IComparable$_compare$arity$2 = (function (x,y){
var self__ = this;
var x__$1 = this;
if(cljs.core.vector_QMARK_(y)){
return cljs_bean.from.cljs.core.compare_indexed.cljs$core$IFn$_invoke$arity$2(x__$1,y);
} else {
throw (new Error(["Cannot compare ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x__$1)," to ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(y)].join('')));
}
}));

(cljs_bean.core.ArrayVector.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$meta,cljs.core.cst$sym$prop_DASH__GT_key,cljs.core.cst$sym$key_DASH__GT_prop,cljs.core.cst$sym$arr,cljs.core.with_meta(cljs.core.cst$sym$__hash,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null);
}));

(cljs_bean.core.ArrayVector.cljs$lang$type = true);

(cljs_bean.core.ArrayVector.cljs$lang$ctorStr = "cljs-bean.core/ArrayVector");

(cljs_bean.core.ArrayVector.cljs$lang$ctorPrWriter = (function (this__4363__auto__,writer__4364__auto__,opt__4365__auto__){
return cljs.core._write(writer__4364__auto__,"cljs-bean.core/ArrayVector");
}));

/**
 * Positional factory function for cljs-bean.core/ArrayVector.
 */
cljs_bean.core.__GT_ArrayVector = (function cljs_bean$core$__GT_ArrayVector(meta,prop__GT_key,key__GT_prop,arr,__hash){
return (new cljs_bean.core.ArrayVector(meta,prop__GT_key,key__GT_prop,arr,__hash));
});

cljs_bean.core.default_key__GT_prop = (function cljs_bean$core$default_key__GT_prop(x){
if((x instanceof cljs.core.Keyword)){
return x.fqn;
} else {
return null;
}
});
/**
 * Takes a JavaScript object and returns a read-only implementation of the map
 *   abstraction backed by the object.
 * 
 *   By default, bean produces beans that keywordize the keys. Supply
 *   :keywordize-keys false to suppress this behavior. You can alternatively
 *   supply :prop->key and :key->prop with functions that control the mapping
 *   between properties and keys.
 * 
 *   Supply :recursive true to create a bean which recursively converts
 *   JavaScript object values to beans and JavaScript arrays into vectors.
 * 
 *   Calling (bean) produces an empty bean.
 */
cljs_bean.core.bean = (function cljs_bean$core$bean(var_args){
var G__19110 = arguments.length;
switch (G__19110) {
case 0:
return cljs_bean.core.bean.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs_bean.core.bean.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
var args_arr__4751__auto__ = [];
var len__4730__auto___19114 = arguments.length;
var i__4731__auto___19115 = (0);
while(true){
if((i__4731__auto___19115 < len__4730__auto___19114)){
args_arr__4751__auto__.push((arguments[i__4731__auto___19115]));

var G__19116 = (i__4731__auto___19115 + (1));
i__4731__auto___19115 = G__19116;
continue;
} else {
}
break;
}

var argseq__4752__auto__ = (new cljs.core.IndexedSeq(args_arr__4751__auto__.slice((1)),(0),null));
return cljs_bean.core.bean.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4752__auto__);

}
});

(cljs_bean.core.bean.cljs$core$IFn$_invoke$arity$0 = (function (){
return (new cljs_bean.core.Bean(null,({}),cljs.core.keyword,cljs_bean.core.default_key__GT_prop,false,[],(0),null));
}));

(cljs_bean.core.bean.cljs$core$IFn$_invoke$arity$1 = (function (x){
return (new cljs_bean.core.Bean(null,x,cljs.core.keyword,cljs_bean.core.default_key__GT_prop,false,null,null,null));
}));

(cljs_bean.core.bean.cljs$core$IFn$_invoke$arity$variadic = (function (x,opts){
var map__19111 = opts;
var map__19111__$1 = (((((!((map__19111 == null))))?(((((map__19111.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19111.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19111):map__19111);
var keywordize_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19111__$1,cljs.core.cst$kw$keywordize_DASH_keys);
var prop__GT_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19111__$1,cljs.core.cst$kw$prop_DASH__GT_key);
var key__GT_prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19111__$1,cljs.core.cst$kw$key_DASH__GT_prop);
var recursive = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19111__$1,cljs.core.cst$kw$recursive);
if(keywordize_keys === false){
return (new cljs_bean.core.Bean(null,x,cljs.core.identity,cljs.core.identity,cljs.core.boolean$(recursive),null,null,null));
} else {
if((((!((prop__GT_key == null)))) && ((!((key__GT_prop == null)))))){
return (new cljs_bean.core.Bean(null,x,prop__GT_key,key__GT_prop,cljs.core.boolean$(recursive),null,null,null));
} else {
return (new cljs_bean.core.Bean(null,x,cljs.core.keyword,cljs_bean.core.default_key__GT_prop,cljs.core.boolean$(recursive),null,null,null));

}
}
}));

/** @this {Function} */
(cljs_bean.core.bean.cljs$lang$applyTo = (function (seq19108){
var G__19109 = cljs.core.first(seq19108);
var seq19108__$1 = cljs.core.next(seq19108);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__19109,seq19108__$1);
}));

(cljs_bean.core.bean.cljs$lang$maxFixedArity = (1));

/**
 * Returns true if x is a bean.
 */
cljs_bean.core.bean_QMARK_ = (function cljs_bean$core$bean_QMARK_(x){
return (x instanceof cljs_bean.core.Bean);
});
/**
 * Takes a bean and returns a JavaScript object.
 */
cljs_bean.core.object = (function cljs_bean$core$object(b){
return b.obj;
});
/**
 * Recursively converts JavaScript values to ClojureScript.
 * 
 *   JavaScript objects are converted to beans with keywords for keys.
 * 
 *   JavaScript arrays are converted to read-only implementations of the vector
 *   abstraction, backed by the supplied array.
 */
cljs_bean.core.__GT_clj = (function cljs_bean$core$__GT_clj(x){
return cljs_bean.core.__GT_val(x,cljs.core.keyword,cljs_bean.core.default_key__GT_prop);
});
/**
 * Recursively converts ClojureScript values to JavaScript.
 * 
 *   Where possible, directly returns the backing objects and arrays for values
 *   produced using ->clj and bean.
 */
cljs_bean.core.__GT_js = (function cljs_bean$core$__GT_js(x){
if((x instanceof cljs_bean.core.Bean)){
return x.obj;
} else {
if((x instanceof cljs_bean.core.ArrayVector)){
return x.arr;
} else {
return cljs.core.clj__GT_js.cljs$core$IFn$_invoke$arity$variadic(x,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$keyword_DASH_fn,cljs_bean.core.default_key__GT_prop], 0));

}
}
});
/**
 * Set empty map and array to Bean and ArrayVector. Useful for testing.
 */
cljs_bean.core.set_empty_colls_BANG_ = (function cljs_bean$core$set_empty_colls_BANG_(){
(cljs.core.PersistentArrayMap.EMPTY = cljs_bean.core.__GT_clj(({})));

(cljs.core.PersistentVector.EMPTY = cljs_bean.core.__GT_clj([]));

return null;
});
