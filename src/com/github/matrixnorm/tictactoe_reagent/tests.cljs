(ns com.github.matrixnorm.tictactoe-reagent.tests
  [cljs.test :as t]
  [com.github.matrixnorm.tictactoe-reagent.reduce :as r])


(t/deftest test-reducer-player-move
           (t/is (nil? (r/reducer-player-move {:game-over true} :user [0 0]))))

(t/deftest test-game-status
           (t/is (= :user-wins
                    (r/game-status [[:AI    :blank :user]
                                  [:blank :user  :blank]
                                  [:user  :AI    :blank]])))
           (t/is (= :draw
                    (r/game-status [[:user  :AI   :user]
                                  [:AI    :AI   :user]
                                  [:user  :user :AI]]))))

;(t/run-tests)
