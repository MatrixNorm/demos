(ns myapp.workspaces.chap2-getting-started-part3
  (:require [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.localized-dom :as dom]
            [fulcro.client.mutations :as m]))


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
  (let [delete-person (fn [name]
                        (do
                          (println "XXX: " this)
                          (prim/transact! this
                                         `[(mut-delete-person {:list-name ~label :name ~name})])))
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
        {:friends (prim/get-initial-state PersonList {:label "Friends"})
         :enemies (prim/get-initial-state PersonList {:label "Enemies"})})}
  (dom/div
    (ui-person-list friends)
    (ui-person-list enemies)))


(m/defmutation mut-delete-person [{:keys [list-name name]}]
  (action [{:keys [state]}]
     (let [path  (if (= "Friends" list-name)
                    [:friends :person-list/people]
                    [:enemies :person-list/people])
           old-list (get-in @state path)
           new-list (vec (filter #(not= (:person/name %) name) old-list))]
       (println path)
       (swap! state assoc-in path new-list))))