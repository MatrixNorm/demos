(ns myapp.workspaces.chap5.main
  (:require [nubank.workspaces.core :as ws]
            [nubank.workspaces.model :as wsm]
            [nubank.workspaces.card-types.fulcro :as ct.fulcro]
            [nubank.workspaces.lib.fulcro-portal :as f.portal]
            [myapp.workspaces.chap5.union1 :as union1]))

(ws/defcard union1-card
  (ct.fulcro/fulcro-card
    {::f.portal/root union1/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app] (.log js/console app))}}))

