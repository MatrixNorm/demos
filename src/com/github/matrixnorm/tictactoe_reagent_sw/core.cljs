(ns com.github.matrixnorm.tictactoe-reagent-sw.core)


(.log js/console :core)

(defn ^:dev/before-load stop []
  (js/console.log "stop core"))

(defn ^:dev/after-load start []
  (js/console.log "start core"))
