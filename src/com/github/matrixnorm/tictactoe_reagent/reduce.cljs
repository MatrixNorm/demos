(ns com.github.matrixnorm.tictactoe-reagent.reduce
  (:require [cljs.test :as t]
            [cljs.spec.alpha :as s]
            [cljs.spec.test.alpha :as stest]))

(defn new-board [n]
  (vec (repeat n (vec (repeat n :blank)))))

(def initial-app-state
  {:board     (new-board 3)
   :game-status :unresolved
   :next-move-by-player :user})

(def next-player-map
  {:user :AI
   :AI :user})

(defn reducer-player-move [state player [i j]]
  (if (and (= player (:next-move-by-player state))
           (= :blank (get-in (:board state) [i j])))
    (-> state
        (assoc-in [:board i j] player)
        (assoc :next-move-by-player (player next-player-map)))
    state))

(defn reducer-new-game [state]
  (-> state
      (assoc :board (new-board 3))
      (assoc :game-status :unresolved)
      (assoc :next-move-by-player :user)))

(declare game-status)

(defn reducer* [state [event-type event-data]]
  (if (contains? #{:user-move :AI-move} event-type)
    (when (= (:game-status state) :unresolved)
      (let [next-state (case event-type
                         :user-move (reducer-player-move state :user event-data)
                         :AI-move (reducer-player-move state :AI event-data))]
        (assoc next-state :game-status (game-status (:board next-state)))))
    (case event-type
      :new-game (reducer-new-game state)
      state)))

(defn reducer [state event]
  (let [next-state (reducer* state event)]
    (prn :111 next-state)
    (if next-state
      next-state
      state)))

(defn calculate-computer-move [board]
  (let [N (count board)
        vacant-cells (for [i (range N)
                           j (range N)
                           :when (= :blank (get-in board [i j]))]
                       [i j])]
    (rand-nth vacant-cells)))

;; Game over conditions

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


(s/fdef reducer-player-move*
        :args (s/cat :state map?
                     :player #{:user :AI}
                     :coords (s/coll-of int? :kind vector? :count 2))
        :ret (s/nilable map?)
        :fn (fn [this]
              (prn this)
              (let [[i j] (-> this :args :coords)
                    n (-> this :args :state :board count)]
                (prn j i n)
                (and (<= i n) (> j n)))))

(stest/instrument `reducer-player-move*)

;; Tests

(t/deftest test-reducer-player-move
           (t/is (nil? (reducer-player-move {:game-over true} :user [0 0]))))

(t/deftest test-game-status
           (t/is (= :user-wins
                    (game-status [[:AI    :blank :user]
                                  [:blank :user  :blank]
                                  [:user  :AI    :blank]])))
           (t/is (= :draw
                    (game-status [[:user  :AI   :user]
                                  [:AI    :AI   :user]
                                  [:user  :user :AI]]))))

(t/run-tests)
