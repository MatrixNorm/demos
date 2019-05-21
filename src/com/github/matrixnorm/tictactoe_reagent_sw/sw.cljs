(ns com.github.matrixnorm.tictactoe-reagent-sw.sw)

(.log js/console :service-worker js/self)

(defn ^:dev/before-load stop []
  (js/console.log "stop sw 2"))

(defn ^:dev/after-load start []
  (js/console.log "start sw"))

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

(register-service-worker "/js/service-worker.js" (fn [] (js/console.log "!!!!!")))

;(defn ^:dev/before-load-async stop [done]
;  (js/console.log "stop reg ...")
;  (-> js/navigator
;      .-serviceWorker
;      .getRegistrations
;      (.then (fn [regs]
;               (if (empty? regs)
;                 (do
;                   (js/console.log "stop reg done")
;                   (done))
;                 (doseq [r regs]
;                   (-> r
;                       .unregister
;                       (.then (fn []
;                                (js/console.log "stop reg done")
;                                (done))))))))))


(js/self.addEventListener
  "install"
  (fn [event]
    (.log js/console "SW: installed 2" event)))

(js/self.addEventListener
  "activate"
  (fn [event]
    (.log js/console "SW: activated 4" event)))