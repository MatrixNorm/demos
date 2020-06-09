(ns cljs.cities-app.demo-test
  (:require [clojure.test.check :as tc]
            [clojure.test.check.clojure-test :refer-macros [defspec]]
            [clojure.test.check.generators :as gen]
            ; ["/cities_app/helpers/uuid" :refer (uuidGen)]
            [clojure.test.check.properties :as prop :include-macros true]))

; (deftest a-ok-test
;   (is (= 1 1)))

; (deftest a-failing-test
;   (do 6
;     (js/console.log ((uuidGen "boss")))
;     (is (= 1 2))))

; (def sort-idempotent-prop
;   (prop/for-all [v (gen/vector gen/int)]
;                 (= (sort v) (sort (sort v)))))

;; (defspec sort-is-idempotent 100
;;   (prop/for-all [v (gen/vector gen/int)]
;;                 (= (sort v) (sort (sort v)))))

;; (gen/sample (gen/choose 2 15))

(def user-settings-fields-gen-map
  {"citiesPaginationPageSize" (gen/choose 2 15)
   "foo" gen/string
   "bar" gen/nat})

(def user-settings-gen
  (apply gen/hash-map
         (apply concat user-settings-fields-gen-map)))

(def user-settings-delta-gen
  (gen/bind
   (apply gen/tuple
          (repeat (count user-settings-fields-gen-map)
                  gen/boolean))
   (fn [bool-seq]
     (->> (map list
               (keys user-settings-fields-gen-map)
               bool-seq)
          (filter second)
          (map first)
          (select-keys user-settings-fields-gen-map)
          (apply concat)
          (apply gen/hash-map)))))

(gen/sample user-settings-delta-gen)



