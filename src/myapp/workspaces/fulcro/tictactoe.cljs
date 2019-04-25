(ns myapp.workspaces.fulcro.tictactoe
  (:require [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.localized-dom :as dom]
            [fulcro.client.mutations :as m]))

(defn blankTile [i j onUserMove]
  (dom/rect
    {:width   0.9
     :height  0.9
     :fill    "skyblue"
     :x       i
     :y       j
     :onClick onUserMove}))

(defn circleTile [i j]
  (dom/circle
    {:r    0.45
     :cx   (+ 0.45 i)
     :cy   (+ 0.45 j)
     :fill "coral"}))

(defn crossTile [i j]
  (dom/g {:stroke         "green"
          :stroke-width   0.15
          :stroke-linecap "round"
          :transform      (str "translate(" (+ 0.2 i) "," (+ 0.2 j) ") "
                               "scale(0.55)")}
         (dom/line {:x1 0 :y1 0 :x2 1 :y2 1})
         (dom/line {:x1 0 :y1 1 :x2 1 :y2 0})))

(defn gameBoard [board onUserMove]
  (dom/svg
    {:view-box "0 0 3 3" :width 300 :height 300}
    (let [n (count board)]
      (for [i (range n)
            j (range n)]
        (case (get-in board [i j])
          :blank (blankTile i j onUserMove)
          :user (circleTile i j)
          :AI (crossTile i j))))))

(defsc Game [this {:game/keys [id board status next-move-by-player]}]
  {:query [:game/id
           :game/board
           :game/status
           :game/next-move-by-player]
   :ident [:game/by-id :game/id]}
  (prn status)
  (dom/div
    (dom/h2 (str status))
    (gameBoard board
               #(prim/transact! this `[(mut-user-move [i j])]))
    (dom/div "Turn by: " (str next-move-by-player))
    ))

(def ui-game (prim/factory Game))

(defsc Root [this {:keys [active-game]}]
  {:query [{:active-game (prim/get-query Game)}]
   :initial-state (fn [_] {:active-game nil})}
  (prn 22 active-game)
  (if active-game
    (ui-game active-game)
    (dom/p
      (dom/button
        {:onClick #(prim/transact! this `[(mut-new-game)])}
        "New Game"))))

;;;;;;;;;;;;;;;
;; Mutations ;;
;;;;;;;;;;;;;;;

(defn new-game [id n]
  {:game/id id
   :game/board (->> (repeat n :blank)
                    vec
                    (repeat n)
                    vec)
   :game/status :unresolved
   :game/next-move-by-player :user})

(m/defmutation mut-new-game [_]
  (action [{state-atom :state}]
          (let [game-id (random-uuid)
                game-ident [:game/by-id game-id]
                game (new-game game-id 3)
                _ (prn state-atom)
                next-state (-> @state-atom
                               (assoc-in game-ident game)
                               (assoc :active-game game-ident))]
            (reset! state-atom next-state))))