(ns com.github.matrixnorm.bidi-routing.core
  (:require [reagent.core :as r]
            [bidi.bidi :as bidi]
            [pushy.core :as pushy]))

(declare app-state)

(def routes-table
  ["/" {"" :route/home
        "sports" :route/sports
        "pol" :route/pol
        "random" :route/random
        true :route/err404}])

(def url-for (partial bidi/path-for routes-table))

(defmulti page-view identity)

(defmethod page-view :route/home []
  [:p "Home"])

(defmethod page-view :route/sports []
  [:p "Sports"])

(defmethod page-view :route/pol []
  [:p "Pol"])

(defmethod page-view :route/random []
  [:p "Random"])

(defmethod page-view :route/err404 []
  [:p "404"])

(defn main-view []
  (fn []
    [:div [:ul
      [:li [:a {:href (url-for :route/home)} "Home"]]
      [:li [:a {:href (url-for :route/sports)} "Sports"]]
      [:li [:a {:href (url-for :route/pol)} "Pol"]]
      [:li [:a {:href (url-for :route/random)} "Random"]]]
     [:div (page-view (:current-route @app-state))]
     [:p "Footer"]]))


(defn dispatch-route [matched-route]
  (swap! app-state assoc :current-route (matched-route :handler))
  (js/console.log app-state))


(defonce app-state
         (r/atom {:current-route :route/home}))

(defonce html5-history
         (pushy/pushy dispatch-route
                      (partial bidi/match-route routes-table)))

(pushy/start! html5-history)

(r/render [main-view]
          (js/document.getElementById "app"))