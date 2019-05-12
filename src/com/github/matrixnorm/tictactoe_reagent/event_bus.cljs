(ns com.github.matrixnorm.tictactoe-reagent.event_bus
  (:require [cljs.core.async :refer [put! chan]]))


(defonce event-chan (chan))

(defn dispatch! [evt]
  (put! event-chan evt))
