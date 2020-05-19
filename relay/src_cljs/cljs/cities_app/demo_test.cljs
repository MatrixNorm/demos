(ns cljs.cities-app.demo-test
  (:require [cljs.test :refer (deftest is)]
            ["/cities_app/helpers/uuid" :refer (uuidGen)]))

(deftest a-ok-test
  (is (= 1 1)))

(deftest a-failing-test
  (do 
    (js/console.log ((uuidGen "boss")))
    (is (= 1 2))))