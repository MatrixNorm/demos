(ns myapp.workspaces.chap2-getting-started-part3
  (:require [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.localized-dom :as dom]))


(defsc Person [this {:person/keys [name age]} {:keys [onDelete]}]
  {:query [:person/name :person/age]
   :initial-state (fn [{:keys [name age]}] {:person/name name :person/age age})}
  (dom/li
   (dom/h5 (str name " (age: " age ")"))
   (dom/button {:onClick #(onDelete name)} "X")))


(def ui-person (prim/factory Person {:keyfn :person/name}))


(defsc PersonList [this {:person-list/keys [label people]}]
  {:query [:person-list/label {:person-list/people (prim/get-query Person)}]
   :initial-state
     (fn [{:keys [label]}]
       {:person-list/label  label
        :person-list/people
          (if (= label "Friends")
            [(prim/get-initial-state Person {:name "Sally" :age 32})
             (prim/get-initial-state Person {:name "Joe" :age 22})]
            [(prim/get-initial-state Person {:name "Fred" :age 11})
             (prim/get-initial-state Person {:name "Bobby" :age 55})])})}
  (let [delete-person (fn [name] (println label "asked to delete" name))
        person->ui (fn [person]
                     (-> person
                         (prim/computed {:onDelete delete-person})
                         ;(doto println)
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
        {:friends (prim/get-initial-state PersonList {:label "Friends"})
         :enemies (prim/get-initial-state PersonList {:label "Enemies"})})}
  (dom/div
    (ui-person-list friends)
    (ui-person-list enemies)))
