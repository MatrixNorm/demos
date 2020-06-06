(ns cljs.cities-app.main
  (:require
   [clojure.test.check :as tc]
   [clojure.test.check.generators :as gen]
   [clojure.test.check.properties :as prop :include-macros true]))


(gen/sample (gen/map gen/keyword gen/int))