(ns com.github.matrixnorm.shadow-tools.core
  (:require [clojure.java.io :as io]
            [clojure.string :as str]))

(defn copy-file [source-path dest-path]
  (io/copy (io/file source-path) (io/file dest-path)))

(defn index-html
  {:shadow.build/stage :configure}
  ([build-state] (index-html build-state
                             "src/com/github/matrixnorm/shadow_tools/index.html"))
  ([build-state source-rel-path]
   (let [cache-abs-path (.getAbsolutePath (:cache-dir build-state))
         project-root (subs cache-abs-path 0
                            (str/index-of cache-abs-path ".shadow-cljs"))
         dest-path (str project-root "cljsdev/index.html")
         source-path (str project-root source-rel-path)]
     (println source-path)
     (println dest-path)
     (copy-file source-path dest-path)
     build-state)))
