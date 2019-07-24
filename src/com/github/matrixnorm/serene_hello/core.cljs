(ns com.github.matrixnorm.serene-hello.core
  (:require
    [clojure.spec.alpha :as s]
    [clojure.test.check.generators]
    [clojure.spec.gen.alpha :as gen]
    [com.github.matrixnorm.serene-hello.specs]))


(js/console.log (s/valid? :gql.Query/hello "Foo"))
(js/console.log (gen/generate (s/gen :gql.Query/hello)))

;; OLD STUFF

;(def schema-str "type Query { hello: String }")
;(def schema (gql/buildSchema schema-str))
;(def clj-schema
;  (-> schema
;      (gql/graphqlSync introspection-query)
;      js/JSON.stringify
;      js/JSON.parse
;      (js->clj :keywordize-keys true)))
;; See link below why all these JSON woodod
;;https://stackoverflow.com/questions/34721251/inspect-by-new-constructed-javascript-objects-at-the-clojurescript-repl
;;(js/console.log edn-schema)




