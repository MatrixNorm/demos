(ns com.github.matrixnorm.tictactoe-reagent.event_bus
  (:require [cljs.core.async :refer [put! chan]]
            [com.github.matrixnorm.tictactoe-reagent.reduce :as reduce]))


(defonce event-chan (chan))


(defn dispatch! [evt]
  (put! event-chan evt))

(defn xform-reducer [state-atom]
  (comp
    (map (fn [event] [event @state-atom]))
    (map (fn [[event state]] {:event event
                              :state state
                              :next-state (reduce/reducer state event)}))
    (filter (fn [{:keys [state next-state]}] (not= state next-state)))))

