(ns com.github.matrixnorm.tictactoe-reagent-sw.core
  (:require [reagent.core :as r]
            [com.github.matrixnorm.tictactoe-reagent.core :as ttt]))


(.log js/console :core js/self 8)

(defn ^:dev/before-load stop []
  (js/console.log "stop core 7"))

(defn ^:dev/after-load start []
  (js/console.log "start core"))

(r/render [ttt/main]
          (js/document.getElementById "app"))
