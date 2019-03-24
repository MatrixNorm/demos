(ns myapp.workspaces.chap2-getting-started
  (:require
    [nubank.workspaces.core :as ws]
    [nubank.workspaces.model :as wsm]
    [nubank.workspaces.card-types.fulcro :as ct.fulcro]
    [nubank.workspaces.lib.fulcro-portal :as f.portal]
    [com.wsscode.pathom.fulcro.network :as pfn]
    [fulcro.client.data-fetch :as fetch]

    [myapp.workspaces.chap2-getting-started-part1 :as part1]
    [myapp.workspaces.chap2-getting-started-part2 :as part2]
    [myapp.workspaces.chap2-getting-started-part3 :as part3]
    [myapp.workspaces.chap2-getting-started-part4 :as part4]
    [myapp.workspaces.chap4-checkboxes :as chap4-checkboxes]
    [myapp.workspaces.chap4-focus-input :as chap4-focus-input]
    [myapp.workspaces.chap4-d3 :as chap4-d3]
    [myapp.workspaces.chap4-canvas :as chap4-canvas]
    [myapp.workspaces.chap4-victory-chart :as chap4-victory-chart]
    [myapp.workspaces.chap4-css1 :as chap4-css1]
    [myapp.workspaces.chap4-css-upsert :as chap4-css-upsert]))


(ws/defcard friends-enemies-card1
  (ct.fulcro/fulcro-card
    {::f.portal/root part1/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app] (.log js/console app))}}))


(ws/defcard friends-enemies-card2
  (ct.fulcro/fulcro-card
    {::f.portal/root part2/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app]
                          (cljs.pprint/pprint (:initial-state app)))}}))

(ws/defcard friends-enemies-card3
  (ct.fulcro/fulcro-card
    {::f.portal/root part3/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app] (.log js/console "friends-enemies-card3"))}}))


(ws/defcard friends-enemies-card4
  (ct.fulcro/fulcro-card
    {::f.portal/root part4/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app] (.log js/console "friends-enemies-card4"))}}))


(ws/defcard chap4-checkboxes-card
  (ct.fulcro/fulcro-card
    {::f.portal/root chap4-checkboxes/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
      {:client-did-mount
        (fn [app]
          (do
            (.log js/console "chap4-checkboxes: client-did-mount")
            (fetch/load app :items chap4-checkboxes/Item)))
       :networking
        {:remote (pfn/pathom-remote chap4-checkboxes/parser)}}
     }))


(ws/defcard chap4-focus-input-card
  (ct.fulcro/fulcro-card
    {::f.portal/root chap4-focus-input/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app] (.log js/console "chap4-focus-input-card"))}}))


(ws/defcard chap4-d3
  (ct.fulcro/fulcro-card
    {::f.portal/root chap4-d3/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app] (.log js/console "chap4-d3"))}}))


(ws/defcard chap4-canvas
  {::wsm/card-width 3
   ::wsm/card-height 9}
  (ct.fulcro/fulcro-card
    {::f.portal/root chap4-canvas/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app] (.log js/console "chap4-canvas"))}}))

(ws/defcard chap4-victory-chart
  {::wsm/card-width 2
   ::wsm/card-height 9}
  (ct.fulcro/fulcro-card
    {::f.portal/root chap4-victory-chart/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app] (.log js/console "chap4-victory-chart"))}}))


(ws/defcard chap4-css1
  {::wsm/card-width 2
   ::wsm/card-height 9}
  (ct.fulcro/fulcro-card
    {::f.portal/root chap4-css1/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app] (.log js/console "chap4-css1"))}}))

(ws/defcard chap4-css-upsert
  {::wsm/card-width 2
   ::wsm/card-height 9}
  (ct.fulcro/fulcro-card
    {::f.portal/root chap4-css-upsert/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app] (.log js/console "chap4-css-upsert"))}}))