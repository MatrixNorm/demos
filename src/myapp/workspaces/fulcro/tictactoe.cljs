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
  (dom/div
    (dom/h1 status)
    (gameBoard board
               #(prim/transact! this `[(mut-user-move [i j])]))
    (dom/div "Turn by: " next-move-by-player)))

(def ui-game (prim/factory Game))

(defsc Root [this {:keys [active-game]}]
  {:query [:active-game]
   :initial-state (fn [_] {})}
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
   :game/board (->> (repeat 2 :blank)
                    vec
                    (repeat 2)
                    vec)
   :game/status :unresolved
   :game/next-move-by-player :user})

(m/defmutation mut-delete-person []
  (action [{:keys [state]}]
          (let [game (new-game (random-uuid) 3)]
            (swap! state update-in [:person-list/by-id list-id :person-list/people] strip-fk))))