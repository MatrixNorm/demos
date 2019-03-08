(ns myapp.workspaces.chap2-getting-started-part2
  (:require [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.localized-dom :as dom]))


(defsc Person [this {:person/keys [name age]}]
  {:initial-state (fn [{:keys [name age]}] {:person/name name :person/age age})}
  (dom/li
   (dom/h5 (str name " (age: " age ")"))))


(def ui-person (prim/factory Person {:keyfn :person/name}))


(defsc PersonList [this {:person-list/keys [label people]}]
  {:initial-state
     (fn [{:keys [label]}]
       {:person-list/label  label
        :person-list/people
          (if (= label "Friends")
            [(prim/get-initial-state Person {:name "Sally" :age 32})
             (prim/get-initial-state Person {:name "Joe" :age 22})]
            [(prim/get-initial-state Person {:name "Fred" :age 11})
             (prim/get-initial-state Person {:name "Bobby" :age 55})])})}
  (dom/div
   (dom/h4 label)
   (dom/ul
     (map ui-person people))))


(def ui-person-list (prim/factory PersonList))


(defsc Root [this {:keys [friends enemies]}]
  {:initial-state (fn [_]
        {:friends (prim/get-initial-state PersonList {:label "Friends"})
         :enemies (prim/get-initial-state PersonList {:label "Enemies"})})}
  (dom/div
    (ui-person-list friends)
    (ui-person-list enemies)))
