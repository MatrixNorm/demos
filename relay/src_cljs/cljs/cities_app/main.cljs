(ns cljs.cities-app.main
  (:require
   ["/cities_app/resolvers/citiesPagination" :as page]
   [clojure.test.check :as tc]
   [clojure.test.check.generators :as gen]
   [clojure.test.check.properties :as prop :include-macros true]))

page