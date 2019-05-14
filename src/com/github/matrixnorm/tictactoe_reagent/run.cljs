(ns com.github.matrixnorm.tictactoe-reagent.run
  (:require [reagent.core :as r]
            [com.github.matrixnorm.tictactoe-reagent.core :refer [main]]))


(r/render [main]
          (js/document.getElementById "app"))