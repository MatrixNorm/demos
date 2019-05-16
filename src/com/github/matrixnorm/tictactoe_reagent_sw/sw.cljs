(ns com.github.matrixnorm.tictactoe-reagent-sw.sw)

(.log js/console :service-worker)

(js/self.addEventListener
  "install"
  (fn [event]
    (.log js/console "SW: installed 16" event)))

(js/self.addEventListener
  "activate"
  (fn [event]
    (.log js/console "SW: activated 1" event)))