(ns myapp.workspaces.reagent.tictactoe
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [reagent.core :as r]
            [cljs.core.async :as async :refer [>! <! put! chan alts!]]
            [cljs.test :as t]
            [cljs.spec.alpha :as s]
            [cljs.spec.test.alpha :as stest]))

;;;;;;;;;;
;; pure ;;
;;;;;;;;;;

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

(defn reducer-player-move* [state player [i j]]
  (let [tile (get-in (:board state) [i j])]
    (when (= tile :blank)
      (-> state
          (assoc-in [:board i j] player)
          (assoc :next-move-by-player (player next-player-map))))))

(defn reducer-player-move [state player coords]
  (when (and (not (:game-over state)) (= player (:next-move-by-player state)))
    (reducer-player-move* state player coords)))

(defn reducer-new-game [state]
  (-> state
      (assoc :board (new-board 3))
      (assoc :game-over false)
      (assoc :next-move-by-player :user)))

(defn reducer* [state [event-type event-data]]
  (case event-type
    :user-move (reducer-player-move state :user event-data)
    :AI-move (reducer-player-move state :AI event-data)
    :new-game (reducer-new-game state)))

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

;; Specs

(s/fdef reducer-player-move*
        :args (s/cat :state map?
                     :player #{:user :AI}
                     :coords (s/coll-of int? :kind vector? :count 2))
        :ret (s/nilable map?))

(stest/instrument `reducer-player-move*)

;; Tests

(t/deftest test-reducer-player-move
  (t/is (nil? (reducer-player-move {:game-over true} :user [0 0]))))

(t/run-tests)

;;;;;;;;;;;;;;;;;;
;; moving parts ;;
;;;;;;;;;;;;;;;;;;

(defonce app-state  (r/atom initial-app-state))
(defonce event-chan (chan))
(defonce state-chan (chan))

(defn dispatch! [evt]
  (put! event-chan evt))

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
    (<! (async/timeout 1000))
    (>! event-chan [:AI-move (calculate-computer-move board)])))

(go-loop []
  (let [data (<! state-chan)]
    ; update app state
    (reset! app-state (:next-state data))
    ; AI move
    (when (and (= (get (:event data) 0) :user-move)
               (= :AI (:next-move-by-player (:next-state data))))
      (AI-move (:board (:next-state data)))))
  (recur))

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
