(ns myapp.workspaces.chap5.routing1
  (:require [fulcro.client.localized-dom :as dom]
            [fulcro.client.routing :as r :refer [defsc-router]]
            [fulcro.client.primitives :as prim :refer [defsc]]))


(defsc Home [this {:keys [home/title home/content]}]
  {:ident [:person/by-id :db/id]
   :query [:db/id :person/name]
   :initial-state (fn [{:keys [id name]}]
                    {:db/id id :person/name name})}
  (dom/div
    (str "Details about person " name " " id)))