(ns myapp.workspaces.main
  (:require [nubank.workspaces.core :as ws]
            [myapp.workspaces.cards]
            [myapp.workspaces.custom-card]
            [myapp.workspaces.fulcro-demo-cards]
            [myapp.workspaces.chap1-prologue]
            [myapp.workspaces.chap2-getting-started]
            [myapp.workspaces.reagent.main]
            [myapp.workspaces.fulcro.main]
            [myapp.workspaces.chap5.main]
            [myapp.workspaces.chap14.main]))

(defonce init (ws/mount))
