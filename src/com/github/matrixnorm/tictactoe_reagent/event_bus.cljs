(ns com.github.matrixnorm.tictactoe-reagent.event-bus
  (:require [cljs.core.async :refer [put! chan]]))

(defonce event-bus (chan))

(defn dispatch! [evt]
  (put! event-bus evt))
