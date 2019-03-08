(ns myapp.workspaces.main
  (:require [nubank.workspaces.core :as ws]
            [myapp.workspaces.cards]
            [myapp.workspaces.custom-card]
            [myapp.workspaces.fulcro-demo-cards]
            [myapp.workspaces.reframe-demo-cards]
            [myapp.workspaces.chap1-prologue]
            [myapp.workspaces.chap2-getting-started]))

(defonce init (ws/mount))
