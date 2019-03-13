(ns myapp.workspaces.chap4-checkboxes
  (:require [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.localized-dom :as dom]
            [fulcro.client.mutations :as m]
            [com.wsscode.pathom.connect :as pc]
            [com.wsscode.pathom.core :as p]))


(defsc Item [this {:keys [db/id item/text item/selected?]}
                  {:keys [check uncheck]}]
  {:query [:db/id :item/text :item/selected?]
   :ident [:item/by-id :db/id]
   :initial-state (fn [{:keys [id text selected?]}]
                    {:db/id id :item/text text :item/selected? selected?})}
  (dom/div {:id id}
    (dom/label text)
    (dom/input {:className "toggle"
                :type      "checkbox"
                :checked   (boolean selected?)
                :onChange  #(if selected? (uncheck id) (check id))})))

(def ui-item (prim/factory Item {:keyfn :db/id}))


(defsc Root [this {:keys [items]}]
  {:query [{:items (prim/get-query Item)}]
   :initial-state (fn [_] {:items []})}
  (let [check (fn [item-id]
                (prim/transact! this `[(item-select ~{:id item-id})]))
        uncheck (fn [item-id]
                (prim/transact! this `[(item-unselect ~{:id item-id})]))
        item->ui (fn [item] (-> item
                                (prim/computed {:check check
                                                :uncheck uncheck})
                                ui-item))]
    (dom/ul (map item->ui items))))


(pc/defresolver items [{::keys [records]} _]
  {::pc/output [{:items [:db/id :item/text :item/selected?]}]}
  {:items (vals @records)})

(defn set-item-selected*
  [state-map id selected?]
  (assoc-in state-map [:item/by-id id :item/selected?] selected?))

(m/defmutation item-select [{:keys [id]}]
  (action [{:keys [state]}]
          (swap! state set-item-selected* id true)))

(m/defmutation item-unselect [{:keys [id]}]
             (action [{:keys [state]}]
                     (swap! state set-item-selected* id false)))

(def parser
  (p/parallel-parser
    {::p/env {::p/reader [p/map-reader
                          pc/parallel-reader
                          pc/open-ident-reader
                          p/env-placeholder-reader]
              ::p/placeholder-prefixes #{">"}
              ::records
              (atom {1 {:db/id 1 :item/text "Aaa" :item/selected? false}
                     2 {:db/id 2 :item/text "Bbb" :item/selected? true}
                     3 {:db/id 3 :item/text "Ccc" :item/selected? false}})}
     ::p/mutate  pc/mutate-async
     ::p/plugins [(pc/connect-plugin {::pc/register [items]})
                  p/error-handler-plugin
                  p/request-cache-plugin
                  p/trace-plugin]}))










