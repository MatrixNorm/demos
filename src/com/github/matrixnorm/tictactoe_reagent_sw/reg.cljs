(ns com.github.matrixnorm.tictactoe-reagent-sw.reg
  (:require [com.github.matrixnorm.tictactoe-reagent-sw.sw])
  )

(prn :reg)

(defn is-service-worker-supported?
  []
  (exists? js/navigator.serviceWorker))

(defn register-service-worker
  [path-to-sw done-callback]
  (when (is-service-worker-supported?)
    (-> js/navigator
        .-serviceWorker
        (.register path-to-sw)
        (.then (fn [reg]
                 (.log js/console "start reg done" reg)
                 (done-callback)))
        (.catch (fn [reg] (.log js/console "SW FAIL"))))))

(defn ^:dev/before-load-async stop [done]
  (js/console.log "stop reg ...")
  (-> js/navigator
      .-serviceWorker
      .getRegistrations
      (.then (fn [regs]
               (if (empty? regs)
                 (do
                   (js/console.log "stop reg done")
                   (done))
                 (doseq [r regs]
                   (-> r
                       .unregister
                       (.then (fn []
                                (js/console.log "stop reg done")
                                (done))))))))))

(defn ^:dev/after-load-async start [done]
  (js/console.log "start reg ...")
  (register-service-worker "/js/service-worker.js" done))


