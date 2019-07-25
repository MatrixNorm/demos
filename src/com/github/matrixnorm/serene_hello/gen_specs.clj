(ns com.github.matrixnorm.serene-hello.gen-specs
  (:require [clojure.spec.alpha :as s]
            [clojure.spec.gen.alpha :as gen]
            [clojure.java.io :as io]
            [com.walmartlabs.lacinia.parser.schema :refer [parse-schema]]
            [com.walmartlabs.lacinia.schema :as sch]
            [com.walmartlabs.lacinia :refer [execute]]
            [paren.serene :as serene]
            [paren.serene.schema :refer [query]
             :rename {query introspection-query}]))

(def schema
  (-> "resourses/serene_hello/schema.graphql"
      io/resource
      slurp
      (parse-schema {
                     ;:resolvers {:Query {:getBooks   (constantly nil)
                     ;                    :getAuthors (constantly nil)}}
                     })
      sch/compile))

(def introspection-data (execute schema introspection-query nil nil))

(macroexpand-1 '(serene/def-specs introspection-data {:prefix :gql}))

(serene/def-specs introspection-data {:prefix :gql
                                      :gen-object-fields true})

(serene/spit-specs "src/com/github/matrixnorm/serene_hello/specs.cljs"
                   'com.github.matrixnorm.serene-hello.specs
                   introspection-data
                   {:prefix :gql})

(s/valid? :gql.Author/name "Foo")
(s/valid? :gql.Author/name 11)
;
;(s/explain :gql.Query/hello "Foo")
;(s/explain :gql.Query/hello 2)
;
(binding [s/*recursion-limit* 2] (gen/generate (s/gen :gql.Query/getBooks)))
