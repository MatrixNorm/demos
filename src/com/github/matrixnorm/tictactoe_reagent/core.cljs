(ns com.github.matrixnorm.tictactoe-reagent.core
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [com.github.matrixnorm.tictactoe-reagent.iu :as ui]
            [com.github.matrixnorm.tictactoe-reagent.event_bus :as event-bus]
            [com.github.matrixnorm.tictactoe-reagent.reduce :as reduce]
            [reagent.core :as r]
            [cljs.core.async :as async :refer [>! <! put! chan alts!]]))


(defonce app-state  (r/atom reduce/initial-app-state))
(defonce state-chan (chan))

(async/pipeline 1
                state-chan
                (event-bus/xform-reducer app-state)
                event-bus/event-chan)

(defn AI-move [board]
  (go
    (<! (async/timeout 1000))
    (>! event-bus/event-chan [:AI-move (reduce/calculate-computer-move board)])))

(go-loop []
  (let [data (<! state-chan)]
    ; update app state
    (reset! app-state (:next-state data))
    ; AI move
    (when (and (= (get (:event data) 0) :user-move)
               (= :AI (:next-move-by-player (:next-state data))))
      (AI-move (:board (:next-state data)))))
  (recur))


(defn main []
  (fn []
    [:center
     [:h1 (:game-status @app-state)]
     [ui/boardComponent (:board @app-state)]
     [ui/footer @app-state]]))


(r/render [main]
          (js/document.getElementById "app"))