(ns com.github.matrixnorm.tictactoe-reagent-sw.sw)


(prn 333333333)

(js/self.addEventListener
  "install"
  (fn [event]
    (prn :GGGGGGGGGGGGG)
    (.log js/console "SW: installed" event)))

(js/self.addEventListener
  "activate"
  (fn [event]
    (.log js/console "SW: activated" event)))