(ns myapp.workspaces.reagent.tictactoe
  (:require [reagent.core :as r]))


(defn new-board [n]
  (vec (repeat n (vec (repeat n 0)))))

(def initial-app-state
  {:text "Tic Tac Toe"
   :board (new-board 3)})

(defonce app-state
  (r/atom initial-app-state))

(defn blank [i j]
  [:rect
   {:width  0.9
    :height 0.9
    :fill "skyblue"
    :x i
    :y j}])

(defn circle [i j]
  [:circle
   {:r 0.45
    :cx (+ 0.45 i)
    :cy (+ 0.45 j)
    :fill "coral"}])

(defn cross [i j]
  [:g {:stroke "green"
       :stroke-width 0.15
       :stroke-linecap "round"
       :transform
       (str "translate(" (+ 0.2 i) "," (+ 0.2 j) ") "
            "scale(0.55)")}
   [:line {:x1 0 :y1 0 :x2 1 :y2 1}]
   [:line {:x1 0 :y1 1 :x2 1 :y2 0}]])

(defn main []
  (fn []
    [:center
      [:h1 (:text @app-state)]
      (into
        [:svg
          {:view-box "0 0 3 3" :width 300 :height 300}]
        (let [n (count (:board @app-state))]
          (for [i (range n)
                j (range n)]
            (assoc-in
              (case (get-in @app-state [:board i j])
               0 (blank i j)
               1 (circle i j)
               (cross i j))
              [1 :on-click]
              (fn tail-click [e]
                (prn "Clicked " i j)
                (swap! app-state update-in [:board i j] inc)
                (prn @app-state))))))
      [:p
       [:button
        {:on-click
         (fn new-game-click [e]
           (swap! app-state assoc :board (new-board 3)))}
        "New Game"]]]))
