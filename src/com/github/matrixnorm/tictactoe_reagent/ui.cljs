(ns com.github.matrixnorm.tictactoe-reagent.ui
  (:require [com.github.matrixnorm.tictactoe-reagent.event_bus :refer [dispatch!]]))

(defn blankTile [i j]
  [:rect
   {:width  0.9
    :height 0.9
    :fill   "skyblue"
    :x      i
    :y      j
    :on-click (fn tail-click [_]
                (dispatch! [:user-move [i j]]))}])

(defn circleTile [i j]
  [:circle
   {:r    0.45
    :cx   (+ 0.45 i)
    :cy   (+ 0.45 j)
    :fill "coral"}])

(defn crossTile [i j]
  [:g {:stroke         "green"
       :stroke-width   0.15
       :stroke-linecap "round"
       :transform      (str "translate(" (+ 0.2 i) "," (+ 0.2 j) ") "
                            "scale(0.55)")}
   [:line {:x1 0 :y1 0 :x2 1 :y2 1}]
   [:line {:x1 0 :y1 1 :x2 1 :y2 0}]])

(defn boardComponent [board]
  (into
    [:svg
     {:view-box "0 0 3 3" :width 300 :height 300}]
    (let [n (count board)]
      (for [i (range n)
            j (range n)]
        (case (get-in board [i j])
          :blank [blankTile i j]
          :user [circleTile i j]
          :AI [crossTile i j])))))

(defn footer [state]
  [:div "Turn: " (:next-move-by-player state)])

(defmulti view identity)

(defmethod view :route/root []
  [:p
   [:button
    {:on-click (fn new-game-click [_]
                 (dispatch! [:new-game]))}
    "New Game"]])

(defmethod view :route/game []
  )



