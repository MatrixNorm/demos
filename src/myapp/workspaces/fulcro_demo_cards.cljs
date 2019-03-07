(ns myapp.workspaces.fulcro-demo-cards
  (:require [fulcro.client.primitives :as fp]
            [fulcro.client.localized-dom :as dom]
            [nubank.workspaces.core :as ws]
            [nubank.workspaces.card-types.fulcro :as ct.fulcro]
            [nubank.workspaces.lib.fulcro-portal :as f.portal]
            [fulcro.client.mutations :as fm]))


(fp/defsc Counter
  [this {:counter/keys [id value]}]
  {:initial-state (fn [{:keys [id value]}] {:counter/id id :counter/value value})
   :ident         [:counter/by-id :counter/id]
   :query         [:counter/id :counter/value]}
  (let [inc-counter (fn []
                      (fp/transact! this `[(mut-inc-counter {:counter/id ~id})]))]
    (dom/div
      (str "Fulcro counter #" id " [" value "]")
      (dom/button {:onClick inc-counter} "+"))))


(def ui-counter (fp/factory Counter {:keyfn :counter/id}))


(fp/defsc DoubleCounter
  [this {:keys [counters]}]
  {:query [{:counters (fp/get-query Counter)}]}
  (dom/div (map ui-counter counters)))


(fm/defmutation mut-inc-counter
  [{:keys [counter/id]}]
  (action [{:keys [state]}]
          (swap! state update-in
                 [:counter/by-id id :counter/value] inc)))


(ws/defcard double-counter-card
  (ct.fulcro/fulcro-card
    {::f.portal/root DoubleCounter

     ::f.portal/app
     {:started-callback (fn [app] (.log js/console app))}

     ::f.portal/initial-state
     (fn [_] {:counters [{:counter/id 1 :counter/value 0}
                         {:counter/id 2 :counter/value -4}]})

     ::f.portal/root-state
     {:qwer 123}}))

(fp/defsc AddableCounter
  [this {:keys [counters]}]
  {:query [{:counters (fp/get-query Counter)}]}
  (let [add-new-counter (fn []
          (fp/transact! this `[(mut-add-new-counter)]))]
    (dom/div
      (dom/button {:onClick add-new-counter} "add Counter")
      (dom/div (map ui-counter counters)))))


(fm/defmutation mut-add-new-counter
  [_]
  (action [{:keys [state]}]
    (let [curr-table (:counter/by-id @state)
          max-id (reduce max 0 (keys curr-table))
          next-id (inc max-id)
          next-table (assoc curr-table next-id {:counter/id next-id :counter/value 0})]
      ;(.log js/console state)
      ;(.log js/console curr-table)
      ;(.log js/console next-table)
      (swap! state assoc-in [:counter/by-id] next-table))))


(ws/defcard addable-counter-card
    (ct.fulcro/fulcro-card
      {::f.portal/root AddableCounter

       ::f.portal/app
       {:started-callback (fn [app] (.log js/console app))}

       ::f.portal/initial-state
       (fn [_] {:counters []})}))
