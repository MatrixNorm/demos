(ns com.github.matrixnorm.tictactoe-reagent.core
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [com.github.matrixnorm.tictactoe-reagent.ui :as ui]
            [com.github.matrixnorm.tictactoe-reagent.event-bus :refer [event-bus]]
            [com.github.matrixnorm.tictactoe-reagent.reduce :as reduce]
            [reagent.core :as r]
            [cljs.core.async :as async :refer [>! <! put! chan alts!]]))


(defonce app-db (r/atom reduce/initial-app-state))
(defonce event-handler-map (atom {}))
(defonce command-exec-map (atom {}))

(defn reg-event-handler [event-type event-handler]
  (swap! event-handler-map (fn [old-map]
                             (assoc old-map event-type event-handler))))

(defn reg-command-exec [command-type command-exec]
  (swap! command-exec-map (fn [old-map]
                             (assoc old-map command-type command-exec))))

(defn AI-move [board]
  (go
    (<! (async/timeout 1000))
    (>! event-bus/event-chan [:AI-move (reduce/calculate-computer-move board)])))

(go-loop []
  (let [[ev-type ev-data] (<! event-bus)
        event-handler (ev-type event-handler-map)
        current-state @app-db
        [next-state, command] (event-handler current-state ev-data)
        command-exec! ((first command) command-exec-map)]
    ; update app state
    (when (and next-state (!= next-state current-state))
      (reset! app-db next-state))
    ; execute command
    (when command-exec!
      (command-exec! command)))
  (recur))

(defn main []
  (fn []
    [:center
     [:h1 (:game-status @app-state)]
     [ui/boardComponent (:board @app-state)]
     [ui/footer @app-state]]))

