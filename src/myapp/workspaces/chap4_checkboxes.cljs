(ns myapp.workspaces.chap4-checkboxes
  (:require [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.localized-dom :as dom]
            [fulcro.client.mutations :as m]
            [com.wsscode.pathom.connect :as pc]
            [com.wsscode.pathom.core :as p]))

(defn log [& x] (apply js/console.log x))

;;
;; UI
;; =>

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
   :initial-state (fn [_] {:items []})
   :pre-merge (fn [env] (log "PRE MERGE: " env))
   :initLocalState (fn []
                     (set! (.-saveref this)
                         (fn [r]
                           (set! (.-ref this) r)
                           (log "A: " r this)))
                     (log "B: " (.-saveref this))
                     {})}
  (let [check (fn [item-id]
                (prim/transact! this `[(item-select ~{:id item-id})]))
        uncheck (fn [item-id]
                (prim/transact! this `[(item-unselect ~{:id item-id})]))
        item->ui (fn [item] (-> item
                                (prim/computed {:check check
                                                :uncheck uncheck})
                                ui-item))]
    (dom/div
      (dom/div
        (dom/label "Select All")
        (dom/input {:className "toggle"
                    :type      "checkbox"
                    :checked   (every? #(:item/selected? %) items)
                    :onChange (fn [_] (prim/transact! this
                                          `[(all-items-toggle)]))
                    :ref (.-saveref this)}))
      (dom/ul (map item->ui items)))))

;;
;; Mutations.
;; =>

(defn set-item-selected*
  [state-map id selected?]
  (assoc-in state-map [:item/by-id id :item/selected?] selected?))

(defn all-items-selected?* [state-map]
  (every? #(:item/selected? %) (vals (:item/by-id state-map))))

(defn set-all-items-selected*
  [state-map selected?]
  (let [reducer (fn [m k v] (assoc m k (assoc-in v [:item/selected?] selected?)))
        make-new-map #(reduce-kv reducer {} %)]
    (update-in state-map [:item/by-id] make-new-map)))

(m/defmutation item-select [{:keys [id]}]
  (action [{:keys [state]}]
    (swap! state set-item-selected* id true)))

(m/defmutation item-unselect [{:keys [id]}]
  (action [{:keys [state]}]
    (swap! state set-item-selected* id false)))

(m/defmutation all-items-toggle [_]
  (action [{:keys [state]}]
    (let [all-selected? (all-items-selected?* @state)]
      (swap! state set-all-items-selected* (not all-selected?)))))

;;
;; Resolvers.
;; =>

(pc/defresolver items [{::keys [database]} _]
                {::pc/output [{:items [:db/id :item/text :item/selected?]}]}
                {:items (vals @database)})

(def database (atom {1 {:db/id 1 :item/text "Aaa" :item/selected? false}
                     2 {:db/id 2 :item/text "Bbb" :item/selected? true}
                     3 {:db/id 3 :item/text "Ccc" :item/selected? false}}))

(def parser
  (p/parallel-parser
    {::p/env {::p/reader [p/map-reader
                          pc/parallel-reader
                          pc/open-ident-reader
                          p/env-placeholder-reader]
              ::p/placeholder-prefixes #{">"}
              ::database database}
     ::p/mutate  pc/mutate-async
     ::p/plugins [(pc/connect-plugin {::pc/register [items]})
                  p/error-handler-plugin
                  p/request-cache-plugin
                  p/trace-plugin]}))










