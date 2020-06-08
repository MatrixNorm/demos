(ns cljs.cities-app.main
  (:require
   [clojure.test.check :as tc]
   [clojure.test.check.generators :as gen]
   [clojure.test.check.properties :as prop :include-macros true]))


(def x 1)
x

(def user-settings-gen
  (gen/hash-map
   "citiesPaginationPageSize" (gen/choose 2 15)
   "foo" gen/string
   "bar" gen/nat))



(gen/sample user-settings-gen)