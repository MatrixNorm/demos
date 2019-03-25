(ns myapp.workspaces.chap4-css-localized-dom
  (:require
    [fulcro-css.css :as css]
    [fulcro-css.css-injection :as injection]
    [fulcro.client.mutations :refer [defmutation]]
    [fulcro.client.primitives :as prim :refer [defsc InitialAppState initial-state]]
    [fulcro.client.localized-dom :as dom]))

(defmutation toggle-child [{:keys [id]}]
  (action [{:keys [state]}]
          (swap! state update-in [:child/by-id id :invisible?] not)))

(defmutation change-child-theme [{:keys [id theme]}]
  (action [{:keys [state]}]
          (println theme)
          (swap! state assoc-in [:child/by-id id :theme] theme)))

(defsc Child [this {:keys [label invisible? theme]}]
  {:css           [[:.blue {:color :blue}]
                   [:.red {:color :red}]]
   :query         [:id :label :invisible? :theme]
   :initial-state {:id :param/id
                   :invisible? false
                   :label :param/label
                   :theme :param/theme}
   :ident         [:child/by-id :id]}
  (dom/div (case theme
             :blue :.blue
             :red :.red
             :.xxx)
           {:classes [(when invisible? :$hide)]} label))

(def ui-child (prim/factory Child))


(defsc Root [this {:keys [child]}]
  {:css           [[:$hide {:display :none}]]
   :query         [{:child (prim/get-query Child)}]
   :initial-state {:child {:id 1
                           :label "Hello World"
                           :theme :blue}}
   :css-include   [Child]}
  (dom/div
    (dom/button {:onClick (fn [e] (prim/transact! this `[(change-child-theme {:id 1 :theme :blue})]))}
                "Use Blue Theme")
    (dom/button {:onClick (fn [e] (prim/transact! this `[(change-child-theme {:id 1 :theme :red})]))}
                "Use Red Theme")
    (dom/button {:onClick (fn [e] (prim/transact! this `[(toggle-child {:id 1})]))}
                "Toggle visible")
    (ui-child child)))

(defn upsert-css []
  (css/upsert-css "myapp.workspaces.chap4-css-localized-dom" Root))

;(defn change-color [c]
;  (reset! theme-color c)
;  (upsert-css))

; Push the real CSS to the DOM via a component.
; One or more of these could be done to, for example,
; include CSS from different modules or libraries into different style elements.
(upsert-css )