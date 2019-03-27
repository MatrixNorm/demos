(ns myapp.workspaces.reagent.tictactoe
  (:require [reagent.core :as r]))

(def app-state (r/atom {:text "fuck off"}))

(defn main []
  (fn []
    [:center
     [:h1 (:text @app-state)]
     [:svg
      {:view-box "0 0 30 30" :width 300 :height 300}
      [:circle {:r 30 :cx 30 :cy 30}]]]))