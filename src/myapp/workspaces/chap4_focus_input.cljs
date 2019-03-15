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
   :initial-state (fn [{:keys [id value editing?]}]
                    {:db/id id :field/value value :field/editing? editing?})
   :componentWillReceiveProps (fn [next-props] (log next-props))}
  (dom/div
    (dom/label "Edit this:")
    (if editing?
      (dom/input {:value    value
                  ;:onChange #(m/set-string! this :event %)
                  :ref      "edit_field"})
      (dom/span {:onClick #(m/toggle! this :field/editing?)} value))))


(def ui-click-to-edit (prim/factory ClickToEditField))


(defsc Root [this {:keys [field]}]
  {:query         [{:field (prim/get-query ClickToEditField)}]
   :initial-state (fn [_] {:field (prim/get-initial-state ClickToEditField
                                       {:id          1
                                        :value    "ABC"
                                        :editing? false})})}
  (ui-click-to-edit field))

