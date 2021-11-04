(ns uix.rn.alpha
  "Public API"
  (:refer-clojure :exclude [require])
  (:require [uix.core :as uix]
            [uix.compiler.alpha :as compiler]
            [react-native :as rn]
            [goog.object :as gobj]))

(def ReactNative (js/require "react-native"))


;; Helpers
(defn require [path]
  (js/require path))

(defn adapt-fn [f]
  (fn [props & children]
    (into [:> f props] children)))


;; react-native top-level API


;; Registry
(def registry (.-AppRegistry ReactNative))

(defn register [app-name callback]
  (.registerComponent registry app-name callback))


;; APIs
(def AccessibilityInfo (.-AccessibilityInfo ReactNative))
(def ActionSheetIOS (.-ActionSheetIOS ReactNative))
(def Alert (.-Alert ReactNative))

(defn alert
  ([title]
   (.alert Alert title))
  ([title msg]
   (.alert Alert title msg))
  ([title msg buttons]
   (.alert Alert title msg buttons))
  ([title msg buttons options]
   (.alert Alert title msg buttons options))
  ([title msg buttons options type]
   (.alert Alert title msg buttons options type)))


;; Components
(def text (adapt-fn (.-Text ReactNative)))
(def view (adapt-fn (.-View ReactNative)))
(def image (adapt-fn (.-Image ReactNative)))
(def image-background (adapt-fn (.-ImageBackground ReactNative)))
(def touchable-highlight (adapt-fn (.-TouchableHighlight ReactNative)))
(def touchable-native-feedback (adapt-fn (.-TouchableNativeFeedback ReactNative)))
(def touchable-without-feedback (adapt-fn (.-TouchableWithoutFeedback ReactNative)))
(def touchable-opacity (adapt-fn (.-TouchableOpacity ReactNative)))
(def activity-indicator (adapt-fn (.-ActivityIndicator ReactNative)))
(def button (adapt-fn (.-Button ReactNative)))
(def date-picker-ios (adapt-fn (.-DatePickerIOS ReactNative)))
(def drawer-layout-android (adapt-fn (.-DrawerLayoutAndroid ReactNative)))
(def flat-list (adapt-fn (.-FlatList ReactNative)))
(def input-accessory-view (adapt-fn (.-InputAccessoryView ReactNative)))
(def keyboard-avoiding-view (adapt-fn (.-KeyboardAvoidingView ReactNative)))
(def modal (adapt-fn (.-Modal ReactNative)))
(def picker (adapt-fn (.-Picker ReactNative)))
(def picker-item (adapt-fn (.. ReactNative -Picker -Item)))
(def picker-ios (adapt-fn (.-PickerIOS ReactNative)))
(def progress-bar-android (adapt-fn (.-ProgressBarAndroid ReactNative)))
(def progress-view-ios (adapt-fn (.-ProgressViewIOS ReactNative)))
(def refresh-control (adapt-fn (.-RefreshControl ReactNative)))
(def safe-area-view (adapt-fn (.-SafeAreaView ReactNative)))
(def scroll-view (adapt-fn (.-ScrollView ReactNative)))
(def section-list (adapt-fn (.-SectionList ReactNative)))
(def segmented-control-ios (adapt-fn (.-SegmentedControlIOS ReactNative)))
(def snapshot-view-ios (adapt-fn (.-SnapshotViewIOS ReactNative)))
(def status-bar (adapt-fn (.-StatusBar ReactNative)))
(def switch (adapt-fn (.-Switch ReactNative)))
(def text-input (adapt-fn (.-TextInput ReactNative)))
(def toolbar-android (adapt-fn (.-ToolbarAndroid ReactNative)))
(def virtualized-list (adapt-fn (.-VirtualizedList ReactNative)))


;; StyleSheet
(def StyleSheet (.-StyleSheet ReactNative))

(defn convert-prop-value [x]
  (cond
    (compiler/js-val? x) x
    (compiler/named? x) (name x)
    (map? x) (reduce-kv compiler/kv-conv #js {} x)
    :else (clj->js x)))

(defn create-stylesheet [styles]
  (let [compiled (->> styles
                      (reduce-kv
                        (fn [o k v]
                          (gobj/set o (name k) (convert-prop-value v))
                          o)
                        #js {})
                      (.create StyleSheet))]
    (js->clj compiled :keywordize-keys true)))
