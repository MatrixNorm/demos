(ns myapp.workspaces.reagent.tictactoe
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [reagent.core :as r]
            [cljs.core.async :as async :refer [>! <! offer! chan alts!]]))


(defn new-board [n]
  (vec (repeat n (vec (repeat n :blank)))))

(def initial-app-state
  {:text      "Tic Tac Toe"
   :board     (new-board 3)
   :next-turn :user})

(defonce app-state
         (r/atom initial-app-state))

(defn calculate-computer-move [board]
  (let [N (count board)
        blank? #(= (get-in board [%1 %2]) :blank)
        vacant-cells (for [i (range N)
                           j (range N)
                           :when (blank? i j)]
                       [i j])]
     (prn vacant-cells)
     (rand-nth vacant-cells)))

(defn game-over? [board]
  false)

(defn user-step [user-move-chan]
  (go
    (let [[i j] (<! user-move-chan)]
      ;; XXX check if vacant
      (swap! app-state assoc-in [:board i j] :circle))))

(defn computer-step []
  (go
    (<! (async/timeout 3000))
    (swap! app-state assoc-in
           (into [:board] (calculate-computer-move (:board @app-state)))
           :cross)))

(defn game-process [user-move-chan]
  (go-loop []
     (when-not (game-over? (:board @app-state))
        (<! (user-step user-move-chan))
        (when-not (game-over? (:board @app-state))
           (<! (computer-step))
           (recur)))))

(defn app-process []
  (go-loop [[action payload] (<! action-bus)]

           (recur (<! action-bus))))

;; ======================================

(def user-chan (chan))



(defn user-process []
  (let [control (chan)]
    (go-loop []
      (<! control)
      (loop [[action payload] (<! user-chan)]
        (if (= action :action/user-move)
          (do
            (prn :AAA action payload)
            (let [[i j] payload]
              (swap! app-state assoc-in [:board i j] :circle))
            (>! control 1))
          (do
            (prn :BBB action)
            (case action
              :action/new-game (swap! app-state assoc :board (new-board 3)))
            (recur (<! user-chan)))))
      (recur))
    control))

(defn computer-process []
  (let [control (chan)]
    (go-loop []
      (<! control)
      (prn :COMPUTER)
      (swap! app-state assoc :next-turn :computer)
      (<! (async/timeout 3000))
      (swap! app-state assoc-in
             (into [:board] (calculate-computer-move (:board @app-state)))
             :cross)
      (>! control 1)
      (recur))
    control))



(defn run-game []
  (let [user (user-process)
        computer (computer-process)]
    (go-loop []
      (swap! app-state assoc :next-turn :user)
      (>! user 1)
      (<! user)
      ;; check if game is over
      (swap! app-state assoc :next-turn :computer)
      (>! computer 1)
      (<! computer)
      (recur))))

(defn blank [i j]
  [:rect
   {:width  0.9
    :height 0.9
    :fill   "skyblue"
    :x      i
    :y      j}])

(defn circle [i j]
  [:circle
   {:r    0.45
    :cx   (+ 0.45 i)
    :cy   (+ 0.45 j)
    :fill "coral"}])


(defn cross [i j]
  [:g {:stroke         "green"
       :stroke-width   0.15
       :stroke-linecap "round"
       :transform
                       (str "translate(" (+ 0.2 i) "," (+ 0.2 j) ") "
                            "scale(0.55)")}
   [:line {:x1 0 :y1 0 :x2 1 :y2 1}]
   [:line {:x1 0 :y1 1 :x2 1 :y2 0}]])

(defn main []
  (let [button-text "New Game"
        _ (run-game)]
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
                 :blank (blank i j)
                 :circle (circle i j)
                 :cross (cross i j))
               [1 :on-click]
               (fn tail-click [_]
                 (offer! user-chan [:action/user-move [i j]]))))))
       [:div "Turn: " (:next-turn @app-state)]
       [:p
        [:button
         {:on-click
          (fn new-game-click [_]
            (offer! user-chan [:action/new-game]))}
         button-text]]])))
