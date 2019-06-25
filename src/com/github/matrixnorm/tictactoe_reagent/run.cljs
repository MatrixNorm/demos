(ns com.github.matrixnorm.tictactoe-reagent.run
  (:require [reagent.core :as r]
            [reitit.frontend :as rtf]
            [reitit.frontend.easy :as rtfe]
            [com.github.matrixnorm.tictactoe-reagent.event_bus :refer [dispatch!]]
            [com.github.matrixnorm.tictactoe-reagent.route :refer [route-table]]
            [com.github.matrixnorm.tictactoe-reagent.core :refer [main]]))


(rtfe/start!
  ;; router
  (rtf/router route-table)
  ;; on-navigate: called when URL changes
  (fn [match]
    (js/console.log match)
    (dispatch! [:navigation match]))
  {:use-fragment false})

(r/render [main]
          (js/document.getElementById "app"))