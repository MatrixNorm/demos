(ns myapp.workspaces.reagent.main
  (:require [nubank.workspaces.core :as ws]
            [nubank.workspaces.model :as wsm]
            [nubank.workspaces.card-types.react :as ct.react]
            [reagent.core :as r]

            [myapp.workspaces.reagent.bmi :as bmi]
            [myapp.workspaces.reagent.tictactoe :as tictactoe]))

;; Form-1

(ws/defcard hello-card
  (ct.react/react-card
    (r/as-element [:h1 "Reagent example"])))

;; Form-2

(defn counter-component []
  (let [click-count (r/atom 0)]
    (fn []
      [:div
      "The atom " [:code "click-count"] " has value: "
      @click-count ". "
      [:input {:type     "button" :value "Click me!"
               :on-click #(swap! click-count inc)}]])))

(ws/defcard counter-card
  (ct.react/react-card
    (r/as-element [counter-component])))

;; Form-3

(defn complex-component [a b c]
  (let [state (r/atom {})] ;; you can include state
    (r/create-class
      {:component-did-mount
          (fn [] (println "I mounted" a b c))

       ;; ... other methods go here
       ;; see https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle
       ;; for a complete list

       ;; name your component for inclusion in error messages
       :display-name "complex-component"

       ;; note the keyword for this method
       :reagent-render
           (fn []
             [:div {:class c}
              [:i a] " " b])})))

(ws/defcard complex-component-card
  (ct.react/react-card
    (r/as-element [(complex-component 1 2 3)])))

(ws/defcard bmi-card
  {::wsm/card-width 3
   ::wsm/card-height 8}
  (ct.react/react-card
    (r/as-element [bmi/bmi-component])))


(ws/defcard tictactoe-card
  {::wsm/card-width 3
   ::wsm/card-height 8}
  (ct.react/react-card
    (r/as-element [tictactoe/main])))