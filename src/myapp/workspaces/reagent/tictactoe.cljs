(ns myapp.workspaces.reagent.tictactoe
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [reagent.core :as r]
            [cljs.core.async :as async :refer [>! <! put! chan alts!]]))


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
  (prn event-type event-data state)
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

(defonce app-state  (r/atom initial-app-state))
(def event-chan (chan 1))
(def state-chan (chan 1))

(def xform-event->state
  (comp
    (map (fn [event] [event @app-state]))
    (map (fn [[event state]] {:event event
                              :state state
                              :next-state (reducer state event)}))
    (filter (fn [{:keys [state next-state]}] (not= state next-state)))))

(async/pipeline 1
                state-chan
                xform-event->state
                event-chan)

(defn AI-move [board]
  (go
    (<! (async/timeout 2000))
    (>! event-chan [:AI-move (calculate-computer-move board)])))

(async/take!
  state-chan
  (fn [data]
    ;; update app state
    (reset! app-state (:next-state data))
    ;; AI move
    (prn @app-state)
    (prn (= (get (:event data) 0) :user-move))
    (prn (= :AI (:next-move-by-player (:next-state data))))
    (when (and (= (get (:event data) 0) :user-move)
               (= :AI (:next-move-by-player (:next-state data))))
      (AI-move (:board (:next-state data))))
    ))

(defn dispatch! [evt]
  (put! event-chan evt))

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
                (dispatch! [:user-move [i j]]))}])

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
  (let [button-text "New Game"]
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
       [:div "Turn: " (:next-move-by-player @app-state)]
       [:p
        [:button
         {:on-click
          (fn new-game-click [_]
            (dispatch! [:new-game]))}
         button-text]]])))
