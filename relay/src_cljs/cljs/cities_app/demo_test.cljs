(ns cljs.cities-app.demo-test
  (:require [clojure.test.check :as tc]
            [clojure.test.check.clojure-test :refer-macros [defspec]]
            [clojure.test.check.generators :as gen]
            ; ["/cities_app/helpers/uuid" :refer (uuidGen)]
            [clojure.test.check.properties :as prop :include-macros true]))

; (deftest a-ok-test
;   (is (= 1 1)))

; (deftest a-failing-test
;   (do 
;     (js/console.log ((uuidGen "boss")))
;     (is (= 1 2))))

; (def sort-idempotent-prop
;   (prop/for-all [v (gen/vector gen/int)]
;                 (= (sort v) (sort (sort v)))))

(defspec sort-is-idempotent 100
  (prop/for-all [v (gen/vector gen/int)]
                (= (sort v) (sort (sort v)))))

(println (+ 1 2))
;; => 
