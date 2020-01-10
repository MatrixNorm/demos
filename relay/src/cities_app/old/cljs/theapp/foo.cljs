(ns theapp.foo
  (:require 
   [clojure.test.check.generators]
   [clojure.spec.alpha :as s]
   [clojure.spec.gen.alpha :as gen]))

(defn a1 [x] (s/valid? even? x))
(defn a2 [] (to-array (gen/sample (s/gen int?))))