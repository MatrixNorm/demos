(ns cljs.cities-app.main
  (:require
   ["/cities_app/resolvers/citiesPagination" :as citiesPagination]
   [clojure.test.check :as tc]
   [clojure.test.check.generators :as gen]
   [clojure.test.check.properties :as prop :include-macros true]))

citiesPagination

(def cityGen gen/int)

(gen/sample (gen/map gen/keyword gen/int))