(ns myapp.workspaces.chap1-prologue
  (:require [fulcro.client.primitives :as prim]
            [fulcro.client.localized-dom :as dom]
            [fulcro.client.mutations :as m]
            [nubank.workspaces.core :as ws]
            [nubank.workspaces.card-types.fulcro :as ct.fulcro]
            [nubank.workspaces.lib.fulcro-portal :as f.portal]))


(m/defmutation bump-number [_]
  (action [{:keys [state]}]
    (swap! state update :number inc)))


(prim/defsc Root [this {:keys [number]}]
  {:query         [:number]
   :initial-state {:number 0}}
  (let [on-click #(prim/transact! this `[(bump-number {})])]
    (dom/div
      (dom/h4 "This is an example.")
      (dom/button {:onClick on-click}
                 "You've clicked this button " number " times."))))


(ws/defcard bump-number-card
  (ct.fulcro/fulcro-card
    {::f.portal/root Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:started-callback (fn [app] (.log js/console app))}}))