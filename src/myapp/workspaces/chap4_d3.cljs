(ns myapp.workspaces.chap4-d3
  (:require [fulcro.client.dom :as dom]
            ["d3" :as d3] ;; REQUIRES shadow-cljs, with "d3" in package.json
            [goog.object :as gobj]
            [fulcro.client.mutations :as m :refer [defmutation]]
            [fulcro.client.primitives :as prim :refer [defsc]]))


(defn log [& x] (apply js/console.log x))

;; D3

(defn render-squares [dom-node props]
  (let [svg       (-> d3 (.select dom-node))
        data      (clj->js (:squares props))
        selection (-> svg
                      (.selectAll "rect")
                      (.data data (fn [d] (.-id d))))]
    (-> selection
        .enter
        (.append "rect")
        (.style "fill" (fn [d] (.-color d)))
        (.attr "x" "0")
        (.attr "y" "0")
        .transition
        (.attr "x" (fn [d] (.-x d)))
        (.attr "y" (fn [d] (.-y d)))
        (.attr "width" (fn [d] (.-size d)))
        (.attr "height" (fn [d] (.-size d))))
    (-> selection
        .exit
        .transition
        (.style "opacity" "0")
        .remove)
    false))

;; Mutations

(defn random-square []
  {
   :id    (rand-int 10000000)
   :x     (rand-int 900)
   :y     (rand-int 900)
   :size  30
   :color (case (rand-int 5)
            0 "red"
            1 "green"
            2 "orange"
            3 "blue"
            4 "black")})

(defmutation add-square [_]
  (action [{:keys [state]}]
          (swap! state update :squares conj (random-square))))

(defmutation clear-squares [_]
  (action [{:keys [state]}]
          (swap! state assoc :squares [])))

;; UI

(defsc D3Thing [this _]
  {:componentDidMount     (fn [_]
                            (when-let [dom-node (gobj/get this "svg")]
                              (render-squares dom-node (prim/props this))))
   :shouldComponentUpdate (fn [next-props _]
                            (when-let [dom-node (gobj/get this "svg")]
                              (render-squares dom-node next-props))
                            false)}
  (dom/svg {:style   {:backgroundColor "rgb(240,240,240)"}
            :width   200 :height 200
            :ref     (fn [r] (gobj/set this "svg" r))
            :viewBox "0 0 1000 1000"}))

(def d3-thing (prim/factory D3Thing))

(defsc Root [this props]
  {:query         [:squares]
   :initial-state {:squares []}}
  (dom/div
    (dom/button {:onClick #(prim/transact! this
                                           `[(add-square {})])} "Add Random Square")
    (dom/button {:onClick #(prim/transact! this
                                           `[(clear-squares {})])} "Clear")
    (dom/br)
    (dom/br)
    (d3-thing props)))