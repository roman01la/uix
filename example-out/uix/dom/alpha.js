// Compiled by ClojureScript 1.10.520 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('uix.dom.alpha');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('uix.compiler.alpha');
uix.dom.alpha.global$module$react_dom = goog.global["ReactDOM"];
/**
 * Renders element into DOM node. The first argument is Hiccup or React element.
 */
uix.dom.alpha.render = (function uix$dom$alpha$render(element,node){
var G__22510 = uix.compiler.alpha.as_element(element);
var G__22511 = node;
return (uix.dom.alpha.global$module$react_dom.render.cljs$core$IFn$_invoke$arity$2 ? uix.dom.alpha.global$module$react_dom.render.cljs$core$IFn$_invoke$arity$2(G__22510,G__22511) : uix.dom.alpha.global$module$react_dom.render(G__22510,G__22511));
});
uix.dom.alpha.create_root = (function uix$dom$alpha$create_root(node){
return (uix.dom.alpha.global$module$react_dom.unstable_createRoot.cljs$core$IFn$_invoke$arity$1 ? uix.dom.alpha.global$module$react_dom.unstable_createRoot.cljs$core$IFn$_invoke$arity$1(node) : uix.dom.alpha.global$module$react_dom.unstable_createRoot(node));
});
uix.dom.alpha.render_root = (function uix$dom$alpha$render_root(element,root){
return root.render(uix.compiler.alpha.as_element(element));
});
/**
 * Hydrates server rendered document at `node` with `element`.
 */
uix.dom.alpha.hydrate = (function uix$dom$alpha$hydrate(element,node){
var G__22512 = uix.compiler.alpha.as_element(element);
var G__22513 = node;
return (uix.dom.alpha.global$module$react_dom.hydrate.cljs$core$IFn$_invoke$arity$2 ? uix.dom.alpha.global$module$react_dom.hydrate.cljs$core$IFn$_invoke$arity$2(G__22512,G__22513) : uix.dom.alpha.global$module$react_dom.hydrate(G__22512,G__22513));
});
uix.dom.alpha.flush_sync_BANG_ = (function uix$dom$alpha$flush_sync_BANG_(cb){
return (uix.dom.alpha.global$module$react_dom.flushSync.cljs$core$IFn$_invoke$arity$1 ? uix.dom.alpha.global$module$react_dom.flushSync.cljs$core$IFn$_invoke$arity$1(cb) : uix.dom.alpha.global$module$react_dom.flushSync(cb));
});
uix.dom.alpha.flush_controlled_BANG_ = (function uix$dom$alpha$flush_controlled_BANG_(cb){
return (uix.dom.alpha.global$module$react_dom.unstable_flushControlled.cljs$core$IFn$_invoke$arity$1 ? uix.dom.alpha.global$module$react_dom.unstable_flushControlled.cljs$core$IFn$_invoke$arity$1(cb) : uix.dom.alpha.global$module$react_dom.unstable_flushControlled(cb));
});
/**
 * Unmounts React component rendered into DOM node
 */
uix.dom.alpha.unmount_at_node = (function uix$dom$alpha$unmount_at_node(node){
return (uix.dom.alpha.global$module$react_dom.unmountComponentAtNode.cljs$core$IFn$_invoke$arity$1 ? uix.dom.alpha.global$module$react_dom.unmountComponentAtNode.cljs$core$IFn$_invoke$arity$1(node) : uix.dom.alpha.global$module$react_dom.unmountComponentAtNode(node));
});
/**
 * Returns top-level DOM node associated with component
 */
uix.dom.alpha.find_dom_node = (function uix$dom$alpha$find_dom_node(component){
return (uix.dom.alpha.global$module$react_dom.findDOMNode.cljs$core$IFn$_invoke$arity$1 ? uix.dom.alpha.global$module$react_dom.findDOMNode.cljs$core$IFn$_invoke$arity$1(component) : uix.dom.alpha.global$module$react_dom.findDOMNode(component));
});
/**
 * Renders Hiccup element into DOM node
 */
uix.dom.alpha.create_portal = (function uix$dom$alpha$create_portal(child,node){
var G__22514 = uix.compiler.alpha.as_element(child);
var G__22515 = node;
return (uix.dom.alpha.global$module$react_dom.createPortal.cljs$core$IFn$_invoke$arity$2 ? uix.dom.alpha.global$module$react_dom.createPortal.cljs$core$IFn$_invoke$arity$2(G__22514,G__22515) : uix.dom.alpha.global$module$react_dom.createPortal(G__22514,G__22515));
});
