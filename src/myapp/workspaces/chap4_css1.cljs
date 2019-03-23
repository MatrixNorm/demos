(ns myapp.workspaces.chap4-css1
  (:require [fulcro.client.dom :as dom]
            [fulcro-css.css :as css]
            [fulcro.client.primitives :as prim :refer [defsc]]))


; the item binding is destructured as the fourth param. The actual CSS classname
; will be namespaced to the component as <namespace>_ListItem__item, but will be
; available as the value :item in css-classnames map parameter, so you can easily
; destructure and use it in the DOM without having to worry about how it is prefixed.
(defsc ListItem [this     {:keys [label] :as props}
                 computed {:keys [item] :as css-classes}]
  {:css [[:.item {:font-weight "bold"
                  :color "#b6f4fc"}]]}
  (dom/li {:className item} label))

(def ui-list-item (prim/factory ListItem {:keyfn :id}))


(defsc ListComponent [this     {:keys [id items]}
                      computed {:keys [items-wrapper items-header]}]
  {; this component's css
   :css [[:.items-wrapper {:background-color "#0083cb"}]
         [:.items-header {:color "#ebdc56"}]]
   ; components whose CSS should be included if this
   ; component is included (optional in 2.6+)
   :css-include [ListItem]}
  (dom/div {:className items-wrapper}
           (dom/h2 {:className items-header} (str "List " id))
           (dom/ul (map ui-list-item items))))

(def ui-list (prim/factory ListComponent {:keyfn :id}))


(defsc Root [this props computed {:keys [text]}]
  {:css [[:.container {:background-color "red"}]]
   :css-include [ListComponent]} ; NOTE: optional in Fulcro 2.6+
  (let [the-list {:id 1 :items [{:id 1 :label "A"} {:id 2 :label "B"}]}]
    (dom/div {:className text}
             (ui-list the-list))))