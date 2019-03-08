(ns myapp.workspaces.chap2-getting-started
  (:require
    [nubank.workspaces.core :as ws]
    [nubank.workspaces.card-types.fulcro :as ct.fulcro]
    [nubank.workspaces.lib.fulcro-portal :as f.portal]

    [myapp.workspaces.chap2-getting-started-part1 :as part1]
    [myapp.workspaces.chap2-getting-started-part2 :as part2]
    [myapp.workspaces.chap2-getting-started-part3 :as part3]))


(ws/defcard friends-enemies-card1
  (ct.fulcro/fulcro-card
    {::f.portal/root part1/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:started-callback (fn [app] (.log js/console app))}}))


(ws/defcard friends-enemies-card2
  (ct.fulcro/fulcro-card
    {::f.portal/root part2/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:started-callback (fn [app]
                          (cljs.pprint/pprint (:initial-state app)))}}))

(ws/defcard friends-enemies-card3
  (ct.fulcro/fulcro-card
    {::f.portal/root part3/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:started-callback (fn [app] (.log js/console "friends-enemies-card"))}}))