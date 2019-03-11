(ns myapp.workspaces.chap4-checkboxes
  (:require [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.localized-dom :as dom]
            [fulcro.client.mutations :as m]
            [com.wsscode.pathom.connect :as pc]
            [com.wsscode.pathom.core :as p]))


(defsc Item [this {:keys [db/id item/text item/selected?]}]
  {:query [:db/id :item/text :item/selected?]
   :ident [:items/by-id :db/id]
   :initial-state (fn [{:keys [id text selected?]}]
                    {:db/id id :item/text text :item/selected? selected?})}
  (dom/div {:id id}
    (dom/label text)
    (dom/input #js {:className "toggle"
                :type      "checkbox"
                :checked   (boolean selected?)})))


(def ui-item (prim/factory Item {:keyfn :db/id}))


(defsc Root [this {:keys [items]}]
  {:query [:items (prim/get-query Item)]
   :initial-state (fn [_] {:items []})}

  (dom/div
    (dom/ul (map ui-item items))))


(pc/defresolver items [{::keys [records]} _]
  {::pc/output [{:items [:db/id :item/text :item/selected?]}]}
  {:items (vals @records)})


(def parser
  (p/parallel-parser
    {::p/env {::p/reader [p/map-reader
                          pc/parallel-reader
                          pc/open-ident-reader
                          p/env-placeholder-reader]
              ::p/placeholder-prefixes #{">"}
              ::records
              (atom {1 {:db/id 1 :item/text "Aaa" :item/selected? false}
                     2 {:db/id 2 :item/text "Bbb" :item/selected? false}
                     3 {:db/id 3 :item/text "Ccc" :item/selected? false}})}
     ::p/mutate  pc/mutate-async
     ::p/plugins [(pc/connect-plugin {::pc/register [items]})
                  p/error-handler-plugin
                  p/request-cache-plugin
                  p/trace-plugin]}))










