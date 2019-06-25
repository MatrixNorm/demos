(ns com.github.matrixnorm.tictactoe-reagent.event-handler)

(defonce event-handler-map (atom {}))

(defn register [event-type event-handler]
  (swap! event-handler-map (fn [old-map]
                             (assoc old-map event-type event-handler))))
