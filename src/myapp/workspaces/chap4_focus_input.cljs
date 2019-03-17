(ns myapp.workspaces.chap4-focus-input
  (:require [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.localized-dom :as dom]
            [fulcro.client.mutations :as m]
            [com.wsscode.pathom.connect :as pc]
            [com.wsscode.pathom.core :as p]))


(defn log [& x] (apply js/console.log x))


(defsc ClickToEditField [this {:keys [db/id field/value field/editing?]}]
  {:query [:db/id :field/value :field/editing?]
   :ident [:field/by-id :db/id]
   :initial-state
      (fn [{:keys [id value editing?]}]
          {:db/id id :field/value value :field/editing? editing?})
   :initLocalState (fn []
                     (set! (.-saveref this)
                           (fn [el] (set! (.-inputRef this) el)))
                     {})
   :componentDidUpdate
      (fn [prev-props _]
        (let [curr-props (prim/props this)
              prev-edit (:field/editing? prev-props)
              curr-edit (:field/editing? curr-props)]
          (when (and (not prev-edit) curr-edit)
            (.focus (.-inputRef this)))))}
  (dom/div
    (dom/label "Edit this:")
    (if editing?
      (dom/input {:value value
                  :onBlur #(m/toggle! this :field/editing?)
                  :onChange
                    (fn [evt]
                      (let [input-value (.. evt -target -value)
                            data {:db/id id :field/value input-value}]
                        (prim/transact! this `[(mut-input-change ~data)])))
                  :ref (.-saveref this)})
      (dom/span {:onClick #(m/toggle! this :field/editing?)} value))))


(def ui-click-to-edit (prim/factory ClickToEditField))


(defsc Root [this {:keys [field]}]
  {:query         [{:field (prim/get-query ClickToEditField)}]
   :initial-state (fn [_] {:field (prim/get-initial-state ClickToEditField
                                       {:id          1
                                        :value    "ABC"
                                        :editing? false})})}
  (ui-click-to-edit field))


(m/defmutation mut-input-change [{:keys [db/id field/value]}]
  (action [{:keys [state]}]
    (swap! state assoc-in [:field/by-id id :field/value] value)))