(ns myapp.workspaces.reagent.main
  (:require [nubank.workspaces.core :as ws]
            [nubank.workspaces.model :as wsm]
            [nubank.workspaces.card-types.react :as ct.react]
            [reagent.core :as r]))


(ws/defcard hello-card
  (ct.react/react-card
    (r/as-element [:h1 "Reagent example"])))


(ws/defcard counter-example-card
  (let [click-count (r/atom 0)]
    (ct.react/react-card
      click-count
      (r/as-element [:div
                     "The atom " [:code "click-count"] " has value: "
                     @click-count ". "
                     [:input {:type "button" :value "Click me!"
                              :on-click #(swap! click-count inc)}]]))))

(defn timer-component []
  (let [seconds-elapsed (r/atom 0)]
    (fn []
      (js/setTimeout #(swap! seconds-elapsed inc) 1000)
      [:div
       "Seconds Elapsed: " @seconds-elapsed])))

(ws/defcard timer
  (ct.react/react-card
    (r/as-element [timer-component])))


(defn counter-component []
  (let [click-count (r/atom 0)]
    (fn []
      [:div
      "The atom " [:code "click-count"] " has value: "
      @click-count ". "
      [:input {:type     "button" :value "Click me!"
               :on-click #(swap! click-count inc)}]])))

(ws/defcard counter
  (ct.react/react-card
    (r/as-element [counter-component])))