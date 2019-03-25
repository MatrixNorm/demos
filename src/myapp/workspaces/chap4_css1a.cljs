(ns myapp.workspaces.chap4-css1a
  (:require [fulcro.client.localized-dom :as dom]
            [fulcro-css.css :as css]
            [fulcro.client.primitives :as prim :refer [defsc]]))


(defsc ListItem [this {:keys [label]}]
  {:css [[:.item {:font-weight "bold"
                  :color "#b6f4fc"}]]}
  (dom/li :.item label))

(def ui-list-item (prim/factory ListItem {:keyfn :id}))


(defsc ListComponent [this {:keys [id items]}]
  {:css [[:.items-wrapper {:background-color "#0083cb"}]
         [:.items-header {:color "#ebdc56"}]]
   :css-include [ListItem]}
  (dom/div :.items-wrapper
           (dom/h2 :.items-header (str "List " id))
           (dom/ul (map ui-list-item items))))

(def ui-list (prim/factory ListComponent {:keyfn :id}))


(defsc Root [this props]
  {:css [[:.container {:background-color "red"}]]
   :css-include [ListComponent]}
  (let [the-list {:id 1 :items [{:id 1 :label "A"} {:id 2 :label "B"}]}]
    (dom/div :.container
             (ui-list the-list))))

; Add the CSS from Root as a HEAD style element. If it already exists, replace it.
; This will recursively follow all of the CSS includes *just* for components
; that Root includes!
;(css/upsert-css "myapp.workspaces.chap4-css1" Root)