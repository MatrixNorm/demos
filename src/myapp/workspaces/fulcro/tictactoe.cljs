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

(defn calculate-AI-move [board]
  (let [N (count board)
        vacant-cells (for [i (range N)
                           j (range N)
                           :when (= :blank (get-in board [i j]))]
                       [i j])]
    (rand-nth vacant-cells)))

(defn player-move-reducer
  [state {:keys [game-id coords player next-player] :as xxx}]
  (let [[i j] coords
        game-path [:game/by-id game-id]
        board-path (conj game-path :game/board)
        game (get-in state game-path)]
    (when (and (= (:game/status game) :unresolved)
               (= (:game/next-move-by-player game) player))
      (as->
        state $
        (assoc-in $
                  (into board-path [i j]) player)
        (assoc-in $
                  (conj game-path :game/next-move-by-player) next-player)
        (assoc-in $
                  (conj game-path :game/status)
                  (game-status (get-in $ board-path)))))))

(defn new-game-reducer [state]
  (let [game-id (random-uuid)
        game-ident [:game/by-id game-id]
        game (new-game game-id 3)]
    (-> state
        (assoc-in game-ident game)
        (assoc :active-game game-ident))))

(m/defmutation mut-new-game [_]
  (action [{state-atom :state}]
          (let [next-state (new-game-reducer @state-atom)]
            (reset! state-atom next-state))))


(m/defmutation mut-user-move [{:keys [game-id coords]}]
  (action [{state-atom :state}]
          (when-let [next-state (player-move-reducer @state-atom
                                                     {:game-id game-id
                                                      :coords coords
                                                      :player :user
                                                      :next-player :AI})]
            (reset! state-atom next-state)
            ;(let [AI-move (calculate-AI-move
            ;                (get-in @state-atom [:game/by-id game-id :game/board]))]
            ;  (js/setTimeout
            ;    #(prim/transact! this
            ;                     `[(mut-new-game {:game-id ~id :coords [~i ~j]})])
            ;    1000))

            )))

(m/defmutation mut-AI-move [{:keys [game-id coords]}]
  (action [{state-atom :state}]
          (when-let [next-state (player-move-reducer @state-atom
                                                     {:game-id game-id
                                                      :coords coords
                                                      :player :AI
                                                      :next-player :user})]
            (reset! state-atom next-state))))