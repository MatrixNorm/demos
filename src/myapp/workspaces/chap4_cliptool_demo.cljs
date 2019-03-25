(ns myapp.workspaces.chap4-cliptool-demo
  (:require [cljs.pprint :refer [cl-format]]
            [fulcro.ui.clip-tool :as ct]
            [fulcro.ui.clip-geometry :as cg]
            [fulcro.client.cards :refer [defcard-fulcro]]
            [fulcro.client.mutations :as m :refer [defmutation]]
            [fulcro.client.dom :as dom]
            [fulcro.client.primitives :as prim :refer [defsc]]))

(defn log [& x] (apply js/console.log x))
(def minion-image "/img/minion.jpg")

(defsc ClipTool [this {:keys [id size]}]
  {:initial-state
      (fn [{:keys [image-url id aspect-ratio handle-size width height]
            :or   {id "clip-1" aspect-ratio 1 width 400 height 400 handle-size 10} :as params}]
        {:id           id
         :url          image-url
         :aspect-ratio aspect-ratio
         :handle-size  handle-size
         :size         {:width width :height height}})
   :query [:id :url :size :aspect-ratio :handle-size]
   :ident [:clip-tools/by-id :id]
   :protocols [Object
       (initLocalState [this]
           (let [img (js/Image.)]
             (log :BBB img)
             (set! (.-onload img)
                 (fn []
                      (log :AAA)
                      (set! (.-onload img) nil)
                      (ct/set-initial-clip this img)
                      (let [{:keys [size]} (prim/props this)
                            onChange (prim/get-computed this :onChange)
                            {:keys [clip-region]} (prim/get-state this)]
                        (when onChange (onChange (assoc (prim/get-state this) :clip-region (ct/translate-clip-region clip-region size img)))))
                      (ct/refresh-clip-region this (prim/props this))
                   ))
             {:image-object    img
              :origin          (cg/->Point 0 0)
              :clip-region     (cg/->Rectangle (cg/->Point 0 0)
                                               (cg/->Point 0 0))
              :activeOperation :none
              :min-size        20}))
       (shouldComponentUpdate [this next-props next-state] false)
       (componentWillReceiveProps [this props]
          ;(log :TTT)
          (ct/refresh-clip-region this props)) ; for URL changes
       (componentDidMount [this]
          (let [{:keys [url handle-size aspect-ratio size]} (prim/props this)
                {:keys [image-object clip-region] :as state} (prim/get-state this)]
            (prim/update-state! this assoc :aspect-ratio aspect-ratio :handle-size (or handle-size 10))
            (log :componentDidMount)
            (set! (.-src image-object) url)))]}
  (let [onChange (prim/get-computed this :onChange)]
    (dom/div {:style {:width "300px"}}
       (dom/canvas {:ref         (fn [ele]
                                   (when ele (prim/update-state! this assoc :canvas ele)))
                    :id          id
                    :width       (str (:width size) "px")
                    :height      (str (:height size) "px")
                    :onMouseDown (fn [evt]
                                   (log :onMouseDown evt)
                                   (ct/mouseDown this evt))
                    :onMouseMove (fn [evt]
                                   ;(log :onMouseMove evt)
                                   (ct/mouseMoved this evt onChange))
                    :onMouseUp   (fn [evt]
                                   (log :onMouseUp evt)
                                   (ct/mouseUp this evt))
                    :className   "clip-tool"}))))

(defsc PreviewClip [this {:keys [filename width height clip-region]}]
  {}
  (let [{:keys [ul lr]} clip-region]
    (dom/div
      (dom/canvas {:ref (fn [elem]
                          (when elem (ct/refresh-image elem this)))
                   :style     {:border "1px solid black"}
                   :width     (str width "px")
                   :height    (str height "px")
                   :className "preview-clip"})
      (dom/div (str "x1=" (-> ul :x int)
                   "&y1=" (-> ul :y int)
                   "&x2=" (-> lr :x int)
                   "&y2=" (-> lr :y int)
                   "&width=" width)))))


(def ui-clip-tool (prim/factory ClipTool))
(def ui-preview-clip (prim/factory PreviewClip))

(defsc Root [this {:keys [ctool]}]
  {:initial-state
      (fn [p] {:ctool (prim/get-initial-state ct/ClipTool
                          {:id :clipper
                           :aspect-ratio 0.5
                           :width 300 :height 300
                           :image-url minion-image})})
   :query [:ctool]}
  (dom/div
    (ui-clip-tool
      (prim/computed ctool {:onChange (fn [props]
                                        (prim/set-state! this props))}))
    (ui-preview-clip
      (merge (prim/get-state this) {:filename "minions.jpg"
                                    :width 100
                                    :height 200}))))