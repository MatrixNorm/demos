(ns myapp.workspaces.chap5.union1
  (:require [fulcro.client.localized-dom :as dom]
            [fulcro.client.routing :as r :refer [defsc-router]]
            [fulcro.client.primitives :as prim :refer [defsc]]))

(defn item-ident
  "Generate an ident from a person, place, or thing."
  [props] [(:kind props) (:db/id props)])

(defn item-key
  "Generate a distinct react key for a person, place, or thing"
  [props] (str (:kind props) "-" (:db/id props)))

(defn make-person [id n] {:db/id id :kind :person/by-id :person/name n})
(defn make-place [id n] {:db/id id :kind :place/by-id :place/name n})
(defn make-thing [id n] {:db/id id :kind :thing/by-id :thing/label n})

(defsc PersonDetail [this {:keys [db/id person/name] :as props}]
  ; defsc-router expects there to be an initial state for each possible target.
  ; We'll cause this to be a "no selection" state so that the detail screen
  ; that starts out will show "Nothing selected". We initialize all three in case
  ; we later re-order them in the defsc-router.
  {:ident         (fn [] (item-ident props))
   :query         [:kind :db/id :person/name]
   :initial-state {:db/id :no-selection
                   :kind :person/by-id}}
  (dom/div
    (if (= id :no-selection)
      "Nothing selected"
      (str "Details about person " name))))

(defsc PlaceDetail [this {:keys [db/id place/name] :as props}]
  {:ident         (fn [] (item-ident props))
   :query         [:kind :db/id :place/name]
   :initial-state {:db/id :no-selection
                   :kind :place/by-id}}
  (dom/div
    (if (= id :no-selection)
      "Nothing selected"
      (str "Details about place " name))))

(defsc ThingDetail [this {:keys [db/id thing/label] :as props}]
  {:ident         (fn [] (item-ident props))
   :query         [:kind :db/id :thing/label]
   :initial-state {:db/id :no-selection
                   :kind :thing/by-id}}
  (dom/div
    (if (= id :no-selection)
      "Nothing selected"
      (str "Details about thing " label))))

(defsc PersonListItem [this
                       {:keys [db/id person/name] :as props}
                       {:keys [onSelect]}]
  {:ident (fn [] (item-ident props))
   :query [:kind :db/id :person/name]}
  (dom/li {:onClick #(onSelect (item-ident props))}
          (dom/a {:href "javascript:void(0)"} (str "Person " id " " name))))

(defsc PlaceListItem [this
                      {:keys [db/id place/name] :as props}
                      {:keys [onSelect]}]
  {:ident (fn [] (item-ident props))
   :query [:kind :db/id :place/name]}
  (dom/li {:onClick #(onSelect (item-ident props))}
          (dom/a {:href "javascript:void(0)"} (str "Place " id " : " name))))

(defsc ThingListItem [this
                      {:keys [db/id thing/label] :as props}
                      {:keys [onSelect]}]
  {:ident (fn [] (item-ident props))
   :query [:kind :db/id :thing/label]}
  (dom/li {:onClick #(onSelect (item-ident props))}
          (dom/a {:href "javascript:void(0)"} (str "Thing " id " : " label))))

(def ui-person (prim/factory PersonListItem))
(def ui-place (prim/factory PlaceListItem))
(def ui-thing (prim/factory ThingListItem))

(defsc-router ItemDetail [this props]
  {:router-id      :detail-router
   :ident          (fn []
                     (prn :AAA props)
                     (item-ident props))
   :default-route  PersonDetail
   :router-targets {:person/by-id PersonDetail
                    :place/by-id  PlaceDetail
                    :thing/by-id  ThingDetail}}
  (dom/div "No route"))

(def ui-item-detail (prim/factory ItemDetail))

(defsc ItemUnion [this {:keys [kind] :as props}]
  {:ident (fn [] (item-ident props))
   :query (fn [] {:person/by-id (prim/get-query PersonListItem)
                  :place/by-id  (prim/get-query PlaceListItem)
                  :thing/by-id  (prim/get-query ThingListItem)})}
  (case kind
    :person/by-id (ui-person props)
    :place/by-id (ui-place props)
    :thing/by-id (ui-thing props)))

(def ui-item-union (prim/factory ItemUnion {:keyfn item-key}))

(defsc ItemList [this {:keys [items]} {:keys [onSelect]}]
  {:initial-state (fn [_]
                    ; These would normally be loaded...
                    ; but for demo purposes we just hand code a few
                    {:items [(make-person 1 "Tony")
                             (make-thing 2 "Toaster")
                             (make-place 3 "New York")
                             (make-person 4 "Sally")
                             (make-thing 5 "Pillow")
                             (make-place 6 "Canada")]})
   :ident (fn [] [:lists/by-id :singleton])
   :query [{:items (prim/get-query ItemUnion)}]}
  (dom/ul
    (map (fn [i] (ui-item-union (prim/computed i {:onSelect onSelect}))) items)))

(def ui-item-list (prim/factory ItemList))

(defsc Root [this {:keys [item-list item-detail]}]
  {:query [{:item-list (prim/get-query ItemList)}
           {:item-detail (prim/get-query ItemDetail)}]
   :initial-state
          (fn [_] (merge
                    (r/routing-tree
                      (r/make-route :detail
                                    [(r/router-instruction :detail-router [:param/kind :param/id])]))
                    {:item-list   (prim/get-initial-state ItemList nil)
                     :item-detail (prim/get-initial-state ItemDetail nil)}))}
  (prn :BBB)
  (.log js/console (prim/get-query this))
  (let [; This is the only thing to do:
        ; Route the to the detail screen with the given route params!
        showDetail (fn [[kind id]]
                     (prim/transact! this `[(r/route-to {:handler :detail :route-params {:kind ~kind :id ~id}})]))]
    (dom/div
      (ui-item-list (prim/computed item-list {:onSelect showDetail}))
      (ui-item-detail item-detail))))