(ns myapp.workspaces.chap2-getting-started-part1
  (:require [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.localized-dom :as dom]))


(defsc Person [this {:person/keys [name age]}]
   (dom/li
     (dom/h5 (str name " (age: " age ")"))))


(def ui-person (prim/factory Person {:keyfn :person/name}))


(defsc PersonList [this {:person-list/keys [label people]}]
   (dom/div
     (dom/h4 label)
     (dom/ul
       (map ui-person people))))


(def ui-person-list (prim/factory PersonList))


(defsc Root [this _]
   (let [ui-data {:friends {:person-list/label "Friends"
                            :person-list/people
                               [{:person/name "Sally" :person/age 32}
                                {:person/name "Joe" :person/age 22}]}
                  :enemies {:person-list/label "Enemies"
                            :person-list/people
                               [{:person/name "Fred" :person/age 11}
                                {:person/name "Bobby" :person/age 55}]}}]
     (dom/div
       (ui-person-list (:friends ui-data))
       (ui-person-list (:enemies ui-data)))))
