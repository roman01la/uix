// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('clojure.browser.event');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventType');

/**
 * @interface
 */
clojure.browser.event.IEventType = function(){};

var clojure$browser$event$IEventType$event_types$dyn_23476 = (function (this$){
var x__4422__auto__ = (((this$ == null))?null:this$);
var m__4423__auto__ = (clojure.browser.event.event_types[goog.typeOf(x__4422__auto__)]);
if((!((m__4423__auto__ == null)))){
return (m__4423__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4423__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4423__auto__(this$));
} else {
var m__4420__auto__ = (clojure.browser.event.event_types["_"]);
if((!((m__4420__auto__ == null)))){
return (m__4420__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4420__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4420__auto__(this$));
} else {
throw cljs.core.missing_protocol("IEventType.event-types",this$);
}
}
});
clojure.browser.event.event_types = (function clojure$browser$event$event_types(this$){
if((((!((this$ == null)))) && ((!((this$.clojure$browser$event$IEventType$event_types$arity$1 == null)))))){
return this$.clojure$browser$event$IEventType$event_types$arity$1(this$);
} else {
return clojure$browser$event$IEventType$event_types$dyn_23476(this$);
}
});

(goog.events.EventTarget.prototype.clojure$browser$event$IEventType$ = cljs.core.PROTOCOL_SENTINEL);

(goog.events.EventTarget.prototype.clojure$browser$event$IEventType$event_types$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__23477){
var vec__23478 = p__23477;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23478,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23478,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k.toLowerCase()),v], null);
}),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(goog.events.EventType)], 0))));
}));
if((typeof Element !== 'undefined')){
(Element.prototype.clojure$browser$event$IEventType$ = cljs.core.PROTOCOL_SENTINEL);

(Element.prototype.clojure$browser$event$IEventType$event_types$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__23481){
var vec__23482 = p__23481;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23482,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23482,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k.toLowerCase()),v], null);
}),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(goog.events.EventType)], 0))));
}));
} else {
}
clojure.browser.event.listen = (function clojure$browser$event$listen(var_args){
var G__23486 = arguments.length;
switch (G__23486) {
case 3:
return clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$3 = (function (src,type,fn){
return clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$4(src,type,fn,false);
}));

(clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$4 = (function (src,type,fn,capture_QMARK_){
return goog.events.listen(src,cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.browser.event.event_types(src),type,type),fn,capture_QMARK_);
}));

(clojure.browser.event.listen.cljs$lang$maxFixedArity = 4);

clojure.browser.event.listen_once = (function clojure$browser$event$listen_once(var_args){
var G__23489 = arguments.length;
switch (G__23489) {
case 3:
return clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$3 = (function (src,type,fn){
return clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$4(src,type,fn,false);
}));

(clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$4 = (function (src,type,fn,capture_QMARK_){
return goog.events.listenOnce(src,cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.browser.event.event_types(src),type,type),fn,capture_QMARK_);
}));

(clojure.browser.event.listen_once.cljs$lang$maxFixedArity = 4);

clojure.browser.event.unlisten = (function clojure$browser$event$unlisten(var_args){
var G__23492 = arguments.length;
switch (G__23492) {
case 3:
return clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$3 = (function (src,type,fn){
return clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$4(src,type,fn,false);
}));

(clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$4 = (function (src,type,fn,capture_QMARK_){
return goog.events.unlisten(src,cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.browser.event.event_types(src),type,type),fn,capture_QMARK_);
}));

(clojure.browser.event.unlisten.cljs$lang$maxFixedArity = 4);

clojure.browser.event.unlisten_by_key = (function clojure$browser$event$unlisten_by_key(key){
return goog.events.unlistenByKey(key);
});
clojure.browser.event.dispatch_event = (function clojure$browser$event$dispatch_event(src,event){
return goog.events.dispatchEvent(src,event);
});
clojure.browser.event.expose = (function clojure$browser$event$expose(e){
return goog.events.expose(e);
});
clojure.browser.event.fire_listeners = (function clojure$browser$event$fire_listeners(obj,type,capture,event){
return null;
});
clojure.browser.event.total_listener_count = (function clojure$browser$event$total_listener_count(){
return goog.events.getTotalListenerCount();
});
clojure.browser.event.get_listener = (function clojure$browser$event$get_listener(src,type,listener,opt_capt,opt_handler){
return null;
});
clojure.browser.event.all_listeners = (function clojure$browser$event$all_listeners(obj,type,capture){
return null;
});
clojure.browser.event.unique_event_id = (function clojure$browser$event$unique_event_id(event_type){
return null;
});
clojure.browser.event.has_listener = (function clojure$browser$event$has_listener(obj,opt_type,opt_capture){
return null;
});
clojure.browser.event.remove_all = (function clojure$browser$event$remove_all(opt_obj,opt_type,opt_capt){
return null;
});
