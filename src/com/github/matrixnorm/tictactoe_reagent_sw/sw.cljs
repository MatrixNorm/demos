(ns com.github.matrixnorm.tictactoe-reagent-sw.sw)



(defn ^:dev/before-load stop []
  (js/console.log "stop sw"))

(defn ^:dev/after-load start []
  (js/console.log "start sw"))

(js/self.addEventListener
  "install"
  (fn [event]
    (.log js/console "SW: installed 11" event)))

(js/self.addEventListener
  "activate"
  (fn [event]
    (.log js/console "SW: activated 1" event)))