(ns myapp.workspaces.chap2-getting-started
  (:require
    [nubank.workspaces.core :as ws]
    [nubank.workspaces.card-types.fulcro :as ct.fulcro]
    [nubank.workspaces.lib.fulcro-portal :as f.portal]
    [com.wsscode.pathom.fulcro.network :as pfn]
    [fulcro.client.data-fetch :as fetch]

    [myapp.workspaces.chap2-getting-started-part1 :as part1]
    [myapp.workspaces.chap2-getting-started-part2 :as part2]
    [myapp.workspaces.chap2-getting-started-part3 :as part3]
    [myapp.workspaces.chap2-getting-started-part4 :as part4]
    [myapp.workspaces.chap4-checkboxes :as checkboxes]))


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


(ws/defcard card5
  (ct.fulcro/fulcro-card
    {::f.portal/root checkboxes/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
      {:client-did-mount
        (fn [app]
          (do
            (.log js/console "chap4-checkboxes")
            (fetch/load app :items checkboxes/Item)))
       :networking
        {:remote (pfn/pathom-remote checkboxes/parser)}}
     }))