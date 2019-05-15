(ns com.github.matrixnorm.tictactoe-reagent-sw.core)


(.log js/console "HIII****!!!")


(defn is-service-worker-supported? []
  (exists? js/navigator.serviceWorker))

(defn register-service-worker
  [path-to-sw]
  (when (is-service-worker-supported?)
    (-> js/navigator
        .-serviceWorker
        (.register path-to-sw)
        (.then (fn [reg]
                 ;(.update reg)
                 (.log js/console "SW OK")))
        (.catch (fn [reg] (.log js/console "SW FAIL"))))))


(register-service-worker "/js/service-worker.js")


