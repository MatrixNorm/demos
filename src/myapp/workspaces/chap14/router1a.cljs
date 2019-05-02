(ns myapp.workspaces.chap14.router1a
  (:require [fulcro.client.routing :as r :refer-macros [defsc-router]]
            [fulcro.client.dom :as dom]
            [fulcro.client :as fc]
            [fulcro.client.data-fetch :as df]
            [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.mutations :as m]))


(defsc Index [this {:keys [db/id router/page]}]
  {:query         [:db/id :router/page]
   :ident         (fn [] [page id])                         ; IMPORTANT! Look up both things, don't use the shorthand for idents on screens!
   :initial-state {:db/id 1 :router/page :PAGE/index}}
  (dom/div nil "Index Page"))

(defsc Settings [this {:keys [db/id router/page]}]
  {:query         [:db/id :router/page]
   :ident         (fn [] [page id])
   :initial-state {:db/id 1 :router/page :PAGE/settings}}
  (dom/div "Settings Page"))

(defsc
  RootRouter-Union
  [this {:keys [router/page db/id]}]
  {:ident (fn [] [page id]),
   :initial-state (fn [params] (prim/get-initial-state Index params)),
   :query (fn
            []
            {:PAGE/index (prim/get-query Index),
             :PAGE/settings (prim/get-query Settings)})}
  (let
    [props
     (prim/props this)
     page__47647__auto__
     (first (prim/get-ident this props))]
    (case
      page__47647__auto__
      :PAGE/index
      ((prim/factory Index) props)
      :PAGE/settings
      ((prim/factory Settings) props)
      (let [this this] (dom/div "Bad route")))))

(def ui-RootRouter-Union (prim/factory RootRouter-Union))

(defsc
  RootRouter
  [this {:keys [router/page db/id]}]
  {:default-route Index,
   :ident (fn [] [:fulcro.client.routing.routers/by-id :root/router]),
   :initial-state (fn
                    [params__47687__auto__]
                    {:fulcro.client.routing/id :root/router,
                     :fulcro.client.routing/current-route (prim/get-initial-state
                                                            RootRouter-Union
                                                            params__47687__auto__)}),
   :query (fn
            []
            [:fulcro.client.routing/id
             {:fulcro.client.routing/current-route (prim/get-query RootRouter-Union)}])}
  (let
    [computed__47688__auto__
     (prim/get-computed this)
     props__47689__auto__
     (:fulcro.client.routing/current-route (prim/props this))
     props-with-computed__47690__auto__
     (prim/computed props__47689__auto__ computed__47688__auto__)]
    (ui-RootRouter-Union props-with-computed__47690__auto__)))

(def ui-root-router (prim/factory RootRouter))

(defsc Root [this {:keys [router]}]
  {:initial-state (fn [p] {:router (prim/get-initial-state RootRouter {})})
   :query         [{:router (prim/get-query RootRouter)}]}
  (dom/div
    (dom/a {:onClick #(prim/transact! this
                                      `[(r/set-route {:router :root/router
                                                      :target [:PAGE/index 1]})])} "Index") " | "
    (dom/a {:onClick #(prim/transact! this
                                      `[(r/set-route {:router :root/router
                                                      :target [:PAGE/settings 1]})])} "Settings")
    (ui-root-router router)))