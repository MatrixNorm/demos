(ns com.github.matrixnorm.tictactoe-reagent.routes)


(def route-table
  [["/" :route/home]
   ["/game/:id" :route/game]])