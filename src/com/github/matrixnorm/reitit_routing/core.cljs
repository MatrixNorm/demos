(ns com.github.matrixnorm.reitit-routing.core
  (:require [reagent.core :as r]
            [reitit.frontend :as rtf]
            [reitit.frontend.easy :as rtfe]
            [reitit.frontend.controllers :as rtfc]))

(defn log [what]
  (js/console.log what))

(declare app-db)

(def routes-table
  [["/" {:name :route/home
         :human-name "Home"
         :controllers [{:start (fn [] (log "start Home"))
                        :stop (fn [] (log "stop Home"))}]}]
   ["/sports" {:name :route/sports
               :human-name "Sports"
               :controllers [{:start (fn [] (log "start Sports"))
                              :stop (fn [] (log "stop Sports"))}]}]
   ["/pol" {:name :route/pol
            :human-name "Politics"
            :controllers [{:start (fn [] (log "start Politics"))
                           :stop (fn [] (log "stop Politics"))}]}]
   ["/random" {:name :route/random
               :human-name "Random"
               :controllers [{:start (fn [] (log "start Random"))
                              :stop (fn [] (log "stop Random"))}]}]])

(defmulti page-view identity)

(defmethod page-view :route/home []
  [:h2 "Home"])

(defmethod page-view :route/sports []
  [:h2 "Sports"])

(defmethod page-view :route/pol []
  [:h2 "Politics"])

(defmethod page-view :route/random []
  [:h2 "Random"])

(defmethod page-view :default []
  [:h2 "404"])

(defn ui-footer []
  (let [css {:background-color "#20b2aa"
             :margin           0
             :padding          10}]
    [:p {:style css} "Footer"]))

(defn ui-nav-bar [active-route-name]
  (let [ul-css {:list-style "none"}
        li-css {:display      "inline-block"
                :margin-right 10}
        nav-item (fn [{:keys [name human-name]}]
                  [:li {:key name
                        :style li-css}
                   (if (= name active-route-name)
                     [:b human-name]
                     [:a {:href (rtfe/href name)} human-name])
                   ])]
    [:ul {:style ul-css}
     (->> routes-table
          (map second)
          (map nav-item))]))

(defn ui-main []
  (let [active-route-name (get-in @app-db [:route/match :data :name])]
    [:div
      [ui-nav-bar active-route-name]
      [:div [page-view active-route-name]]
      [ui-footer]]))

;;;;;;;;;;;;;;;;;;;
; Statefull stuff ;
;;;;;;;;;;;;;;;;;;;

(defn dispatch-route! [match]
  (swap! app-db assoc :route/match match))

(defonce app-db
         (r/atom {:route/match :route/home}))

(rtfe/start!
  (rtf/router routes-table)
  (fn [match]
    (js/console.log match)
    (dispatch-route! (assoc match :controllers
                                  (rtfc/apply-controllers
                                    (get-in @app-db [:route/match :controllers])
                                    match))))
  {:use-fragment false})


(r/render [ui-main]
          (js/document.getElementById "app"))