(ns com.github.matrixnorm.serene-hello.core
  (:require
    [clojure.spec.alpha :as s]
    [paren.serene :as serene]
    [paren.serene.schema :as schema]
    ["graphql" :as gql]))


(def schema-str "type Query { hello: String }")
(def schema (gql/buildSchema schema-str))
(js/console.log schema)
