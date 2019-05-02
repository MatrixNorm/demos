(ns myapp.workspaces.chap5.union2a
  (:require [fulcro.client.localized-dom :as dom]
            [fulcro.client.routing :as r :refer [defsc-router]]
            [fulcro.client.primitives :as prim :refer [defsc]]))

(defn item-kind [props]
  (cond
    (:person/name props)    :person/by-id
    (:place/location props) :place/by-id
    (:thing/label props)    :thing/by-id))

(defn item-ident [{:keys [db/id] :as props}]
  ;; why is this called for many times?
  (prn :ggg (item-kind props))
  [(item-kind props) id])

(defn item-key
  "Generate a distinct react key"
  [props]
  (clojure.string/join "__" (item-ident props)))

(defsc Person [this {:keys [db/id person/name] :as props}]
  {:query [:db/id :person/name]
   :initial-state (fn [{:keys [id name]}]
                    {:db/id id :person/name name})}
  (dom/div
    (str "Details about person " name " " id)))

(defsc Place [this {:keys [db/id place/location] :as props}]
  {:query [:db/id :place/location]
   :initial-state (fn [{:keys [id location]}]
                    {:db/id id :place/location location})}
  (dom/div
    (str "Details about place " location " " id )))

(defsc Thing [this {:keys [db/id thing/label] :as props}]
  {:query [:db/id :thing/label]
   :initial-state (fn [{:keys [id label]}]
                    {:db/id id :thing/label label})}
  (dom/div
    (str "Details about thing " label " " id)))

(def ui-person (prim/factory Person))
(def ui-place (prim/factory Place))
(def ui-thing (prim/factory Thing))

(defsc Item [this props]
  {:ident (fn [] (item-ident props))
   :query (fn [] {:person/by-id (prim/get-query Person)
                  :place/by-id  (prim/get-query Place)
                  :thing/by-id  (prim/get-query Thing)})}
  (prn :yyy props (item-ident props))
  (case (item-kind props)
    :person/by-id (ui-person props)
    :place/by-id (ui-place props)
    :thing/by-id (ui-thing props)))

(def ui-item (prim/factory Item {:keyfn item-key}))

(defsc Root [this {:keys [items]}]
  {:query [{:items (prim/get-query Item)}]
   :initial-state
          (fn [_]
            {:items [(prim/get-initial-state Person {:id 1 :name "Bob"})
                     (prim/get-initial-state Person {:id 2 :name "Chad"})
                     (prim/get-initial-state Place {:id 14 :location "Lugano"})
                     (prim/get-initial-state Thing {:id 31 :label "Boot"})]})}
  (prn :xxx items)
  (prn :xxx (prim/get-query this))
  (dom/div
    (map ui-item items)))

