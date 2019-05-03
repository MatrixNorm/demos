(ns myapp.workspaces.fulcro.tictactoe
  (:require [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.localized-dom :as dom]
            [fulcro.client.mutations :as m]))

(defn blankTile [i j key on-user-move]
  (dom/rect
    {:width   0.9
     :height  0.9
     :fill    "skyblue"
     :x       i
     :y       j
     :key key
     :onClick on-user-move}))

(defn circleTile [i j key]
  (dom/circle
    {:r    0.45
     :cx   (+ 0.45 i)
     :cy   (+ 0.45 j)
     :key key
     :fill "coral"}))

(defn crossTile [i j key]
  (dom/g {:stroke         "green"
          :stroke-width   0.15
          :stroke-linecap "round"
          :transform      (str "translate(" (+ 0.2 i) "," (+ 0.2 j) ") "
                               "scale(0.55)")
          :key key}
         (dom/line {:x1 0 :y1 0 :x2 1 :y2 1})
         (dom/line {:x1 0 :y1 1 :x2 1 :y2 0})))

(defn gameBoard [board on-user-move]
  (dom/svg
    {:viewBox "0 0 3 3" :width 300 :height 300}
    (let [n (count board)]
      (for [i (range n)
            j (range n)]
        (let [key (+ j (* n i))
              tile (get-in board [i j])]
          (case tile
            :blank (blankTile i j key #(on-user-move i j))
            :user (circleTile i j key)
            :AI (crossTile i j key)))))))

(defsc Game [this {:game/keys [id board status next-move-by-player]}]
  {:query [:game/id
           :game/board
           :game/status
           :game/next-move-by-player]
   :ident [:game/by-id :game/id]}
  (let [on-user-move (fn [i j]
                        (prim/transact!
                          this
                          `[(mut-user-move {:game-id ~id :coords [~i ~j]})]))]
    (dom/div
     (dom/h2 "Status: " (str status))
     (gameBoard board on-user-move)
     (dom/div "Turn by: " (str next-move-by-player)))))

(def ui-game (prim/factory Game))

(defsc GameTableView [this {:game/keys [id status]}]
  {:query [:game/id :game/status]
   :ident [:game/by-id :game/id]}
  (dom/div (str status)))

(def ui-game-table-view (prim/factory GameTableView))

(defsc GameList [this {:game-list/keys [id games]}]
  {:query [:game-list/id {:game-list/games (prim/get-query GameTableView)}]
   :ident [:game-list/by-id :game-list/id]}
  (dom/ul
    (map ui-game-table-view games)))

(defsc Root [this {:keys [active-game]}]
  {:query [{:active-game (prim/get-query Game)}]
   :initial-state {:active-game {}}}
  (dom/div
    (when (:game/id active-game)
      (ui-game active-game))
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

(defn segment-status [segment]
  (case (set segment)
    #{:user}            :user-wins
    #{:AI}              :AI-wins
    #{:user :AI}        :draw
    #{:user :AI :blank} :draw
    :unresolved))

(defn game-status [board]
  (let [n (count board)
        columns board
        rows (for [i (range n)]
               (map #(nth % i) board))
        diagonals [(for [i (range n)]
                     (get-in board [i i]))
                   (for [i (range n)]
                     (get-in board [i (- n 1 i)]))]
        segments (concat columns rows diagonals)]
    (reduce (fn [acc status]
              (if (contains? #{:user-wins :AI-wins} status)
                (reduced status)
                (if (= status :unresolved)
                  :unresolved
                  acc)))
            :draw
            (map segment-status segments))))

(m/defmutation mut-new-game [_]
  (action [{state-atom :state}]
          (let [game-id (random-uuid)
                game-ident [:game/by-id game-id]
                game (new-game game-id 3)
                next-state (-> @state-atom
                               (assoc-in game-ident game)
                               (assoc :active-game game-ident))]
            (reset! state-atom next-state))))

(m/defmutation mut-user-move [{:keys [game-id coords]}]
  (action [{state-atom :state}]
          (let [[i j] coords
                game (get-in @state-atom [:game/by-id game-id])]
            (when (and (= (:game/status game) :unresolved)
                       (= (:game/next-move-by-player game) :user))
                (swap! state-atom
                       #(as->
                          % $
                          (assoc-in $
                                    [:game/by-id game-id :game/board i j]
                                    :user)
                          (assoc-in $
                                    [:game/by-id game-id :game/status]
                                    (game-status (get-in $ [:game/by-id game-id :game/board])))))))))