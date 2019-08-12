(ns com.github.matrixnorm.pathom-hello.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require
    [com.wsscode.pathom.core :as p]
    [com.wsscode.pathom.connect :as pc]
    [cljs.core.async :refer [<!]]))


;;(shadow/nrepl-select :pathom-hello)

(pc/defresolver shit-people-resolver [_ _]
  {::pc/output [{::shit-people [:person/id]}]}
  {::shit-people [{:person/id 1}
                  {:person/id 2}]})

(pc/defresolver person-resolver [_ {:keys [person/id]}]
  {::pc/input #{:person/id}
   ::pc/output [:person/id :person/name :person/email :address/id]}
  {:person/id id :person/name "Bob" :person/email "bob@gmail.com" :address/id 12})

(pc/defresolver address-resolver [_ {:keys [address/id]}]
  {::pc/input #{:address/id}
   ::pc/output [:address/zip :address/state :address/city]}
  {:address/zip 123 :address/state "TX" :address/city "Austin"})

(pc/defresolver spam-emails-resolver [_ _]
  {::pc/output [{::spam-emails [:person/email]}]}
  {::shit-people [{:person/email "joe@hack.com"}
                  {:person/email "donald@trump.ru"}]})

(pc/defresolver person-bills-resolver [_ {:keys [person/id]}]
  {::pc/input #{:person/id}
   ::pc/output [{:person/bills [:bill/id :bill/amount :bill/date :bill/currency]}]}
  {:person/bills
   [{:bill/id 342 :bill/amount 100 :bill/date "12/07/19" :bill/currency :USD}
    {:bill/id 675 :bill/amount 200 :bill/date "12/06/19" :bill/currency :EUR}]})

(def resolvers [person-resolver
                shit-people-resolver
                address-resolver
                spam-emails-resolver
                person-bills-resolver])

(def parser
  (p/parallel-parser
    {::p/env {::p/reader [p/map-reader
                          pc/parallel-reader
                          pc/open-ident-reader
                          p/env-placeholder-reader]
              ::p/placeholder-prefixes #{">"}}
     ::p/mutate  pc/mutate-async
     ::p/plugins [(pc/connect-plugin {::pc/register resolvers})
                  p/error-handler-plugin
                  p/request-cache-plugin
                  p/trace-plugin]}))

(defn helper [query]
  (go (let [res (<! (parser {} query))]
        (println res))))

(comment
  (helper [{[:person/id 2] [:person/id
                            :person/name
                            :person/email]}])
  (helper [::shit-people])

  (helper [{::shit-people [:person/id
                           :person/name
                           :person/email
                           :address/city
                           {:person/bills [:bill/amount
                                           :bill/date
                                           :bill/currency]}]}])

  (helper [{[:address/id 1] [:address/zip
                             :address/state]}])

  (helper [{[:person/id 1] [:person/name
                            :person/email
                            :address/zip
                            :address/state]}])

  (helper [{[:person/id 8] [{:person/bills [:bill/amount
                                            :bill/currency]}]}])

  (helper [{[:person/id 8] [:person/name
                            {:person/bills [:bill/amount
                                            :bill/date
                                            :bill/currency]}]}]))









