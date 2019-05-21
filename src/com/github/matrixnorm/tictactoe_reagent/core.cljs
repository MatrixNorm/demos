(ns com.github.matrixnorm.tictactoe-reagent.core
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [com.github.matrixnorm.tictactoe-reagent.ui :as ui]
            [com.github.matrixnorm.tictactoe-reagent.event_bus :as event-bus]
            [com.github.matrixnorm.tictactoe-reagent.reduce :as reduce]
            [reagent.core :as r]
            [cljs.core.async :as async :refer [>! <! put! chan alts!]]))


(defonce app-state (r/atom reduce/initial-app-state))

(defn AI-move [board]
  (go
    (<! (async/timeout 1000))
    (>! event-bus/event-chan [:AI-move (reduce/calculate-computer-move board)])))

(go-loop []
  (let [event (<! event-bus/event-chan)
        next-state (reduce/reducer @app-state event)]
    ; update app state
    (reset! app-state next-state)
    ; AI move
    (when (and (= (get event 0) :user-move)
               (= :AI (:next-move-by-player next-state)))
      (AI-move (:board next-state))))
  (recur))

(defn main []
  (fn []
    [:center
     [:h1 (:game-status @app-state)]
     [ui/boardComponent (:board @app-state)]
     [ui/footer @app-state]]))

