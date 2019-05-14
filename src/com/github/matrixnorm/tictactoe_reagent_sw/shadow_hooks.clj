(ns com.github.matrixnorm.tictactoe-reagent-sw.shadow-hooks
  (:require [clojure.java.io :as io]
            [clojure.string :as str]))

(defn copy-file [source-path dest-path]
  (io/copy (io/file source-path) (io/file dest-path)))

(defn index
  {:shadow.build/stage :configure}
  [build-state]
  (let [cache-abs-path (.getAbsolutePath (:cache-dir build-state))
        project-root (subs cache-abs-path
                           0
                           (str/index-of cache-abs-path ".shadow-cljs"))
        dest-path (str project-root "/cljsdev/index.html")
        source-path (str project-root
                         "src/"
                         "com/github/matrixnorm/tictactoe_reagent_sw/"
                         "index.html")
        ]
    (println source-path)
    (println dest-path)
    (copy-file source-path dest-path)
    build-state))
