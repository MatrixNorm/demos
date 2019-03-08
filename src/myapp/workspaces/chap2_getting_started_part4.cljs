(ns myapp.workspaces.chap2-getting-started-part4
  (:require [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.localized-dom :as dom]
            [fulcro.client.mutations :as m]))


(defsc Person [this {:keys [db/id person/name person/age]} {:keys [onDelete]}]
  {:query [:db/id :person/name :person/age]
   :ident [:person/by-id :db/id]
   :initial-state (fn [{:keys [id name age]}]
                    {:db/id id :person/name name :person/age age})}
  (dom/li
   (dom/h5 (str name " (age: " age ")"))
   (dom/button {:onClick #(onDelete id)} "X")))


(def ui-person (prim/factory Person {:keyfn :db/id}))


(defsc PersonList [this {:keys [db/id person-list/label person-list/people]}]
  {:query [:db/id :person-list/label {:person-list/people (prim/get-query Person)}]
   :ident [:person-list/by-id :db/id]
   :initial-state
     (fn [{:keys [id label]}]
       {:db/id id
        :person-list/label label
        :person-list/people
          (if (= label "Friends")
            [(prim/get-initial-state Person {:id 1 :name "Sally" :age 32})
             (prim/get-initial-state Person {:id 2 :name "Joe" :age 22})]
            [(prim/get-initial-state Person {:id 3 :name "Fred" :age 11})
             (prim/get-initial-state Person {:id 4 :name "Bobby" :age 55})])})}
  (let [delete-person
          (fn [person-id] (prim/transact! this
                `[(mut-delete-person {:list-id ~id :person-id ~person-id})]))
        person->ui (fn [person]
                     (-> person
                         (prim/computed {:onDelete delete-person})
                         (doto println)
                         ui-person))]
    (dom/div
     (dom/h4 label)
     (dom/ul
       (map person->ui people)))))


(def ui-person-list (prim/factory PersonList))


(defsc Root [this {:keys [friends enemies]}]
  {:query [{:friends (prim/get-query PersonList)}
           {:enemies (prim/get-query PersonList)}]
   :initial-state (fn [_]
        {:friends (prim/get-initial-state PersonList {:id :friends :label "Friends"})
         :enemies (prim/get-initial-state PersonList {:id :enemies :label "Enemies"})})}
  (dom/div
    (ui-person-list friends)
    (ui-person-list enemies)))


(m/defmutation mut-delete-person [{:keys [list-id person-id]}]
  (action [{:keys [state]}]
    (let [ident-to-remove [:person/by-id person-id]
          strip-fk (fn [old-fks]
                     (vec (filter #(not= ident-to-remove %) old-fks)))]
      (swap! state update-in [:person-list/by-id list-id :person-list/people] strip-fk))))