(ns myapp.workspaces.reagent.tictactoe
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [reagent.core :as r]
            [cljs.core.async :as async :refer [>! <! offer! chan alts!]]))


(defn new-board [n]
  (vec (repeat n (vec (repeat n :blank)))))

(def initial-app-state
  {:text      "Tic Tac Toe"
   :board     (new-board 3)
   :game-over false
   :next-move-by-player :user})

(def next-player-map
  {:user :AI
   :AI :user})

(defn reducer-player-move [state player [i j]]
  (when (and (not (:game-over state)) (= player (:next-move-by-player state)))
    (let [tile (get-in (:board state) [i j])]
      (when (= tile :blank)
        (-> state
            (assoc-in [:board i j] player)
            (assoc :next-move-by-player (player next-player-map)))))))

(defn reducer* [state [event-type event-data]]
  (case event-type
    :user-move (reducer-player-move state :user event-data)
    :AI-move (reducer-player-move state :AI event-data)
    :new-game (-> state
                  (assoc :board (new-board 3))
                  (assoc :game-over false))))

(defn reducer [state event]
  (let [next-state (reducer* state event)]
    (if next-state
      next-state
      state)))

(defn calculate-computer-move [board]
  (let [N (count board)
        vacant-cells (for [i (range N)
                           j (range N)
                           :when (= :blank (get-in board [i j]))]
                       [i j])]
    (prn vacant-cells)
    (rand-nth vacant-cells)))

(defn game-over? [board]
  false)

;;;;;;;;;
;;
;;;;;;;;;

(defonce app-state
         (r/atom initial-app-state))

(defn AI-move []
  (go
    (<! (async/timeout 2000))
    (>! event-bus (calculate-computer-move (:board app-state)))))

(defn create-state-chan [state-atom event-chan reducer]
  (let [state-chan (chan)]
    (go-loop []
     (let [current-state @state-atom
           next-state (reducer current-state (<! event-chan))]
       (when (not= next-state current-state)
         (swap! state-atom next-state)
         (when (and (= :user (:next-move-by-player current-state))
                    (= :AI (:next-move-by-player next-state)))
           (AI-move)))
       (recur)))
    state-chan))

(defonce event-chan (chan 1))
(defonce state-chan (chan 1 ))
;;(defonce sink-chan (async/mult state-chan))

(def xform
  (comp
    (map (fn [event] [event @app-state]))
    (map (fn [event state] {:event event
                            :state state
                            :next-state (reducer state event)}))
    (filter (fn [{:keys [state next-state]}] (not= state next-state)))))

(async/pipeline 1 state-chan xform event-chan)

(async/take!
  state-chan
  (fn [data]
    (swap! app-state (:next-state data))
    (AI-move)))
;;(defonce state-chan (create-state-chan app-state event-chan reducer))

;;;;;;;;;;;;;;;;
;; transducers
;;;;;;;;;;;;;;;;

;;;;;;;;
;; UI ;;
;;;;;;;;

(defn blank [i j]
  [:rect
   {:width  0.9
    :height 0.9
    :fill   "skyblue"
    :x      i
    :y      j
    :on-click (fn tail-click [_]
                (put! event-chan [:user-move [i j]]))}])

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
       :transform      (str "translate(" (+ 0.2 i) "," (+ 0.2 j) ") "
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
             (case (get-in @app-state [:board i j])
               :blank (blank i j)
               :user (circle i j)
               :AI (cross i j)))))
       [:div "Turn: " (:next-turn @app-state)]
       [:p
        [:button
         {:on-click
          (fn new-game-click [_]
            (put! event-chan [:new-game]))}
         button-text]]])))
