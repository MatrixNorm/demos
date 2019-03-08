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


(fp/defsc DoubleCounterRoot
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
    {::f.portal/root DoubleCounterRoot
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:started-callback (fn [app] (.log js/console app))}

     ::f.portal/initial-state
     (fn [_] {:counters [{:counter/id 1 :counter/value 0}
                         {:counter/id 2 :counter/value -4}]})

     ::f.portal/root-state
     {:qwer 123}}))


(fp/defsc AddableCountersRoot
  [this {:keys [counters]}]
  {:initial-state (fn [_] {:counters []})
   :query [{:counters (fp/get-query Counter)}]}
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
          new-counter {:counter/id next-id :counter/value 0}
          counter-ident (fp/ident Counter new-counter)]
      (swap! state (fn [s]
         (-> s
           (assoc-in counter-ident new-counter)
           (fm/integrate-ident* counter-ident
                                :append [:counters])))))))


(ws/defcard addable-counter-card
    (ct.fulcro/fulcro-card
      {::f.portal/root AddableCountersRoot
       ::f.portal/wrap-root? false

       ::f.portal/app
       {:started-callback (fn [app] (.log js/console app))}}))
