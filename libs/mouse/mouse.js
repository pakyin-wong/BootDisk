var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};

var mouse;
(function (mouse) {
    var MouseEvent = (function () {
        function MouseEvent() {
        }
        MouseEvent.MOUSE_MOVE = "mouseMove";
        // MouseEvent.MOUSE_OVER = "mouseOver";
        // MouseEvent.MOUSE_OUT = "mouseOut";
        MouseEvent.ROLL_OVER = "rollOver";
        MouseEvent.ROLL_OUT = "rollOut";
        // MouseEvent.MOUSE_WHEEL = "mouseWheel";
        return MouseEvent;
    }());
    mouse.MouseEvent = MouseEvent;
    __reflect(MouseEvent.prototype, "mouse.MouseEvent");
})(mouse || (mouse = {}));

var mouse;

(function (mouse) {
    var currentTarget;
    var stageObj;
    var isPC;
    /**
     * @language en_US
     * Enable mouse detection.
     * @version Egret 3.1.0
     * @platform Web
     */
    /**
     * @language zh_CN
     * 启用mouse检测。
     * @version Egret 3.1.0
     * @platform Web
     */
    egret.DisplayObject.prototype.tooltipText = '';
    egret.DisplayObject.prototype.tooltipPosition = 'below';
    mouse.enable = function (stage) {
        isPC = egret.Capabilities.os == "Windows PC" || egret.Capabilities.os == "Mac OS";
        stageObj = stage;
        currentTarget = [stageObj];


        // Tooltip Impl
        // Referenced from Egret Inspector v3, preview-inject.js
        (() => {
            // const stageEventHandler = (event) => {
            //     switch (event.type) {
            //         case egret.Event.ADDED:
            //         case egret.Event.REMOVED:
            //             // this.sendDisplayListInfo();
            //             break;
            //         case egret.Event.CHANGE:
            //             // this.registerToUpdate_Property(event.target)
            //     }
            // };
            // stageObj.addEventListener(egret.Event.ADDED, stageEventHandler, null);
            // stageObj.addEventListener(egret.Event.REMOVED, stageEventHandler, null);
            // stageObj.addEventListener(egret.Event.CHANGE, stageEventHandler, null);
            const hitTest = (e, t) => {
                if (t instanceof egret.DisplayObjectContainer) {
                    for (var n = t.$children.length - 1; n >= 0; n--) {
                        var r = t.$children[n];
                        if (!r.__debug__ && r.visible) {
                            var i = hitTest(e, r);
                            if (i) return i
                        }
                    }
                }
                return t.getTransformedBounds(stageObj).containsPoint(e) ? t : null
            }
            const enteredTarget =  {}
            let prevTarget = null
            const triggerTooltip = (displayObject, eventType, x, y) => {
                if (displayObject.tooltipText.length < 1) {
                    return
                }
                const event = new egret.Event(eventType, false, false, { displayObject, x, y });
                stageObj.dispatchEvent(event);
            }
            const canvasMouseHandler = (event) => {
                var n = stageObj.$screen.webTouchHandler.getLocation(event);

                // const checkContainer = function(dispObj, posX, posY) {
                //     if (!dispObj.visible) {
                //         return null
                //     }
                //     console.log('dispObj', dispObj)
                //     /*if (dispObj.scrollRect) {
                //         console.log('dispObj', dispObj, '\n', 'dispObj.scrollRect', '\n', dispObj.scrollRect, '==')
                //         if (posX < dispObj.scrollRect.x || posY < dispObj.scrollRect.y || posX > dispObj.scrollRect.x + dispObj.scrollRect.width || posY > dispObj.scrollRect.y + dispObj.scrollRect.height) {
                //             return null
                //         }
                // } else */if (dispObj.mask) {
                //         if (dispObj.mask.x > posX || posX > dispObj.mask.x + dispObj.mask.width || dispObj.mask.y > posY || posY > dispObj.mask.y + dispObj.mask.height) {
                //             return null
                //         }
                //     }
                //     if (!dispObj.$children) {
                //         return null
                //     }
                //     var childCount = dispObj.$children.length;
                //     var h = dispObj.$touchChildren;
                //     for (var l = childCount - 1; l >= 0; l--) {
                //         var c = dispObj.$children[l];
                //         var matrix = c.$getMatrix();
                //         // var d = c.scrollRect;
                //         // if (d) {
                //         //     matrix.append(1, 0, 0, 1, -d.x, -d.y)
                //         // }
                //         matrix.invert();
                //         const transformCoords = (matrix, x, y) => {
                //             var resultPoint = {};
                //             resultPoint.x = matrix.a * x + matrix.c * y + matrix.tx;
                //             resultPoint.y = matrix.d * y + matrix.b * x + matrix.ty;
                //             return resultPoint;
                //         }
                //         var p = transformCoords(matrix, posX, posY);
                //         var result = checkContainer(c, p.x, p.y);
                //         if (result) {
                //             if (!h) {
                //                 return dispObj
                //             }
                //             return result
                //         }
                //     }
                //     return null
                // };
                // console.log('aaa ', checkContainer(stageObj, n.x, n.y))

                
                var r = hitTest(n, stageObj);
                switch (r || (r = stageObj), event.type) {
                    case "mousemove":
                        var stagePosRect = r.getTransformedBounds(stageObj);
                        console.log('mouse | move',r,stagePosRect)
                        if (r.$hashCode === prevTarget) {
                            return
                        }
                        if (enteredTarget[prevTarget] !== undefined) {
                            // trigger out
                            triggerTooltip(enteredTarget[prevTarget], 'TOOLTIP_HIDE', n.x, n.y)
                        }
                        prevTarget = r.$hashCode
                        enteredTarget[prevTarget] = r
                        triggerTooltip(enteredTarget[prevTarget], 'TOOLTIP_SHOW', n.x, n.y)
                        break;
                    case "mouseleave":
                        // e.markTraget(null);
                        break;
                    case "mousedown":
                        event.stopPropagation();
                        // e.selectTarget(r)
                        console.log('mouse | down', r)
                }
            }
            stageObj.$screen.webTouchHandler.canvas.addEventListener("mousemove", canvasMouseHandler);
            stageObj.$screen.webTouchHandler.canvas.addEventListener("mouseleave", canvasMouseHandler);
            stageObj.$screen.webTouchHandler.canvas.addEventListener("mousedown", canvasMouseHandler);
        })();
        // Tooltip Impl

        var check = function (x, y) {
            var pointer = false;
            var targetList = [];
            var detectRollOver = function (displayObject) {
                if(!displayObject["isRollOver"]) {
                    egret.TouchEvent.dispatchTouchEvent(displayObject, mouse.MouseEvent.ROLL_OVER, false, false, x, y, null);
                    displayObject["isRollOver"] = true;
                    // if (egret.getQualifiedClassName(displayObject).indexOf('TooltipMessageWrapper') > 0) {
                    // if (displayObject.tooltipText.length > 0) {
                    //     const event = new egret.Event('TOOLTIP_SHOW', false, false, { displayObject, x, y });
                    //     stageObj.dispatchEvent(event);
                    // }
                }
                if (displayObject["buttonModeForMouse"]) {
                    pointer = true;
                }
            }
            var detectRollOut = function (displayObject) {
                if (displayObject["isRollOver"]) {
                    egret.TouchEvent.dispatchTouchEvent(displayObject, mouse.MouseEvent.ROLL_OUT, false, false, x, y, null);
                    delete displayObject["isRollOver"];
                    // if (displayObject.tooltipText.length > 0) {
                    //     const event = new egret.Event('TOOLTIP_HIDE', false, false, { displayObject, x, y });
                    //     stageObj.dispatchEvent(event);
                    // }
                }
            }
            var $hitTest = egret.DisplayObjectContainer.prototype.$hitTest;
            var touchChildrenLock = 0;
            egret.DisplayObjectContainer.prototype.$hitTest = function (stageX, stageY) {
                if (!this.$touchEnabled && !this.$touchChildren) return null;
                !this.$touchChildren && touchChildrenLock++;
                var rs = $hitTest.call(this, stageX, stageY);
                !this.$touchChildren && touchChildrenLock--;
                if (touchChildrenLock == 0){
                    if (rs != null) {
                        detectRollOver(this);
                        targetList.push(this);
                    } else {
                        detectRollOut(this);
                    }
                }
                return rs;
            }
            var target = stageObj.$hitTest(x,y);
            if (target != null) {
                detectRollOver(target);
                targetList.push(target);
            }

            currentTarget.forEach(function(i){
                if(targetList.indexOf(i) < 0) {
                    detectRollOut(i);
                }
            })

            currentTarget = targetList;
            if (isPC) {
                try {
                    var canvas = stageObj.$displayList.renderBuffer.surface;
                    if (pointer) {
                        canvas.style.cursor = "pointer";
                    }
                    else {
                        canvas.style.cursor = "auto";
                    }
                }
                catch (e) {
                }
            }
            egret.DisplayObjectContainer.prototype.$hitTest = $hitTest;
        };

        var mouseX = NaN;
        var mouseY = NaN;
        
        var onTouchMove = egret.sys.TouchHandler.prototype.onTouchMove;
        egret.sys.TouchHandler.prototype.onTouchMove = function (x, y, touchPointID) {
            onTouchMove.call(this, x, y, touchPointID);
        };
        var onTouchBegin = egret.sys.TouchHandler.prototype.onTouchBegin;
        egret.sys.TouchHandler.prototype.onTouchBegin = function (x, y, touchPointID) {
            onTouchBegin.call(this, x, y, touchPointID);
        };
        var onDrag = false;
        var getLocation = egret["web"].WebTouchHandler.prototype.getLocation;
        egret["web"].WebTouchHandler.prototype.getLocation = function (event) {
            onDrag = event.buttons > 0;
            return getLocation.call(this, event);
        };
        var onTouchEnd = egret.sys.TouchHandler.prototype.onTouchEnd;
        egret.sys.TouchHandler.prototype.onTouchEnd = function (x, y, touchPointID) {
            onTouchEnd.call(this, x, y, touchPointID);
            if (!onDrag) {
                mouseX = x;
                mouseY = y;
                if (mouseMoveEnabled) {
                    egret.TouchEvent.dispatchTouchEvent(stageObj, mouse.MouseEvent.MOUSE_MOVE, true, true, x, y, touchPointID, true);
                }
                check(mouseX, mouseY);
            }
        };

        document.querySelector('canvas').addEventListener('mouseleave', function() {
            check(NaN,NaN);
        });
    };
    /**
     * @language en_US
     * Set a target of buttonMode property setting is true, when the mouse rolls over the object becomes hand type.
     * @version Egret 3.1.0
     * @platform Web
     */
    /**
     * @language zh_CN
     * 设置一个对象的buttonMode属性，设置为true后，当鼠标滑过该对象会变手型。
     * @version Egret 3.1.0
     * @platform Web
     */
    mouse.setButtonMode = function (displayObjcet, buttonMode) {
        displayObjcet["buttonModeForMouse"] = buttonMode;
    };
    
    var mouseMoveEnabled = false;
    /**
     * @language en_US
     * Setting ON mouseMove event detection, after opening slightly impacts performance, default is not open.
     * @version Egret 3.1.0
     * @platform Web
     */
    /**
     * @language zh_CN
     * 设置开启mouseMove事件检测，开启后性能会稍有影响，默认为不开启。
     * @version Egret 3.1.0
     * @platform Web
     */
    mouse.setMouseMoveEnabled = function (enabled) {
        mouseMoveEnabled = enabled;
    };

})(mouse || (mouse = {}));