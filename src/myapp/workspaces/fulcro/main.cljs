(ns myapp.workspaces.fulcro.main
  (:require [nubank.workspaces.core :as ws]
            [nubank.workspaces.model :as wsm]
            [nubank.workspaces.card-types.fulcro :as ct.fulcro]
            [nubank.workspaces.lib.fulcro-portal :as f.portal]
            [myapp.workspaces.fulcro.tictactoe :as tictactoe]))


(ws/defcard tictactoe-card
  (ct.fulcro/fulcro-card
    {::f.portal/root tictactoe/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app] (.log js/console app))}}))
