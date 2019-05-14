(ns com.github.matrixnorm.tictactoe-reagent-sw.sw)


(js/oninstall (fn [event]
                (.log js/console "SW: install")))

(js/onactivate (fn [event]
                 (.log js/console "SW: activate")))