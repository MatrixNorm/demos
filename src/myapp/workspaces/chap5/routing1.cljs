(ns myapp.workspaces.chap5.routing1
  (:require [fulcro.client.localized-dom :as dom]
            [fulcro.client.routing :as r :refer [defsc-router]]
            [fulcro.client.primitives :as prim :refer [defsc]]))


(defsc Home [this {:keys [page/id page/content]}]
  {:query [:page/id :page/content]
   :initial-state (fn [{:keys [id content]}]
                    {:page/id id :page/content content})}
  (dom/div
    (dom/h2 id)
    (dom/p content)))

(defsc About [this {:keys [page/id page/content]}]
  {:query [:page/id :page/content]
   :initial-state (fn [{:keys [id content]}]
                    {:page/id id :page/content content})}
  (dom/div
    (dom/h2 id)
    (dom/p content)))

(defsc Settings [this {:keys [page/id page/content]}]
  {:query [:page/id :page/content]
   :initial-state (fn [{:keys [id content]}]
                    {:page/id id :page/content content})}
  (dom/div
    (dom/h2 id)
    (dom/p content)))

(def ui-home (prim/factory Home))
(def ui-about (prim/factory About))
(def ui-settings (prim/factory Settings))


(defsc PageUnion [this props]
  {:ident (fn [] [(:page/id props) :singleton])
   :query (fn [] {:home     (prim/get-query Home)
                  :about    (prim/get-query About)
                  :settings (prim/get-query Settings)})
   :initial-state
          (fn [initial-route]
            (prim/get-initial-state ({:home     Home
                                      :about    About
                                      :settings Settings} initial-route) nil))}
  (case (:page/id props)
    :home (ui-home props)
    :about (ui-about props)
    :settings (ui-settings props)))

(def ui-page-union (prim/factory PageUnion))


(defsc PageContent [this {:keys [router/active-route]}]
  {:ident         (fn [] [:router/by-id :page-content-router])
   :query         [:router/id {:router/active-route (prim/get-query PageUnion)}]
   :initial-state (fn [{:keys [initial-route]}]
                    {:router/id           :page-content-router
                     :router/active-route (prim/get-initial-state PageUnion initial-route)})}
  (ui-page-union active-route))

(def ui-page-content (prim/factory PageContent))


(defsc Navigation [this _]
  {}
  (dom/ul
    (dom/li "Home")
    (dom/li "About")
    (dom/li "Settings")))

(def ui-navigation (prim/factory Navigation))


(defsc Root [this {:keys [page-content]}]
  {:query [{:page-content (prim/get-query PageContent)}]
   :initial-data (fn [_]
            {:page-content (prim/get-initial-state PageContent {:initial-route :home})})}
  (dom/div
    (ui-navigation)
    (ui-page-content page-content)))
