(ns myapp.workspaces.fulcro.tictactoe
  (:require [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.localized-dom :as dom]
            [fulcro.client.mutations :as m]))

(defn new-board [n]
  (vec (repeat n (vec (repeat n :blank)))))

(defn blankTile [i j]
  (dom/rect
    {:width    0.9
     :height   0.9
     :fill     "skyblue"
     :x        i
     :y        j
     :on-click (fn tail-click [_]
                 (prim/transact! this `[(mut-user-move [i j])]))}))

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


(defsc Board [this {:board board}]
  {:query [:board]
   :initial-state (new-board 3)}
  (dom/svg
    {:view-box "0 0 3 3" :width 300 :height 300}
    (let [n (count board)]
      (for [i (range n)
            j (range n)]
        (case (get-in board [i j])
          :blank (blankTile i j)
          :user (circleTile i j)
          :AI (crossTile i j))))))


