// Compiled by ClojureScript 1.10.739 {:static-fns true, :fn-invoke-direct true, :optimize-constants true}
goog.provide('uix.dom.alpha');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('uix.compiler.alpha');
uix.dom.alpha.global$module$react_dom = goog.global["ReactDOM"];
/**
 * Renders element into DOM node. The first argument is Hiccup or React element.
 */
uix.dom.alpha.render = (function uix$dom$alpha$render(element,node){
var G__23449 = uix.compiler.alpha.as_element(element);
var G__23450 = node;
return uix.dom.alpha.global$module$react_dom.render(G__23449,G__23450);
});
uix.dom.alpha.create_root = (function uix$dom$alpha$create_root(node){
return uix.dom.alpha.global$module$react_dom.unstable_createRoot(node);
});
uix.dom.alpha.render_root = (function uix$dom$alpha$render_root(element,root){
return root.render(uix.compiler.alpha.as_element(element));
});
/**
 * Hydrates server rendered document at `node` with `element`.
 */
uix.dom.alpha.hydrate = (function uix$dom$alpha$hydrate(element,node){
var G__23451 = uix.compiler.alpha.as_element(element);
var G__23452 = node;
return uix.dom.alpha.global$module$react_dom.hydrate(G__23451,G__23452);
});
uix.dom.alpha.flush_sync_BANG_ = (function uix$dom$alpha$flush_sync_BANG_(cb){
return uix.dom.alpha.global$module$react_dom.flushSync(cb);
});
uix.dom.alpha.flush_controlled_BANG_ = (function uix$dom$alpha$flush_controlled_BANG_(cb){
return uix.dom.alpha.global$module$react_dom.unstable_flushControlled(cb);
});
/**
 * Unmounts React component rendered into DOM node
 */
uix.dom.alpha.unmount_at_node = (function uix$dom$alpha$unmount_at_node(node){
return uix.dom.alpha.global$module$react_dom.unmountComponentAtNode(node);
});
/**
 * Returns top-level DOM node associated with component
 */
uix.dom.alpha.find_dom_node = (function uix$dom$alpha$find_dom_node(component){
return uix.dom.alpha.global$module$react_dom.findDOMNode(component);
});
/**
 * Renders Hiccup element into DOM node
 */
uix.dom.alpha.create_portal = (function uix$dom$alpha$create_portal(child,node){
var G__23453 = uix.compiler.alpha.as_element(child);
var G__23454 = node;
return uix.dom.alpha.global$module$react_dom.createPortal(G__23453,G__23454);
});
uix.dom.alpha.render_to_string = (function uix$dom$alpha$render_to_string(element){

return ReactDOMServer.renderToString(uix.compiler.alpha.as_element(element));
});
uix.dom.alpha.render_to_static_markup = (function uix$dom$alpha$render_to_static_markup(element){

return ReactDOMServer.renderToStaticMarkup(uix.compiler.alpha.as_element(element));
});
uix.dom.alpha.render_to_stream = (function uix$dom$alpha$render_to_stream(element){
return ReactDOMServer.renderToNodeStream(uix.compiler.alpha.as_element(element));
});
uix.dom.alpha.render_to_static_stream = (function uix$dom$alpha$render_to_static_stream(element){
return ReactDOMServer.renderToStaticNodeStream(uix.compiler.alpha.as_element(element));
});
