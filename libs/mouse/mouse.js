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
    mouse.enable = function (stage) {
        isPC = egret.Capabilities.os == "Windows PC" || egret.Capabilities.os == "Mac OS";
        stageObj = currentTarget = stage;
        // if (isPC) {
        //     addMouseWheelEvent();
        // }

        var check = function (x, y) {
            var pointer = false;
            var detectRollOver = function (displayObject) {
                if(!displayObject["isRollOver"]) {
                    egret.TouchEvent.dispatchTouchEvent(displayObject, mouse.MouseEvent.ROLL_OVER, false, false, x, y, null);
                    displayObject["isRollOver"] = true;
                }
                if (displayObject["buttonModeForMouse"]) {
                    pointer = true;
                }
            }
            var detectRollOut = function (displayObject) {
                if (displayObject["isRollOver"]) {
                    egret.TouchEvent.dispatchTouchEvent(displayObject, mouse.MouseEvent.ROLL_OUT, false, false, x, y, null);
                    delete displayObject["isRollOver"];
                }
            }
            var $hitTest = egret.DisplayObjectContainer.prototype.$hitTest;
            egret.DisplayObjectContainer.prototype.$hitTest = function (stageX, stageY) {
                var rs = $hitTest.call(this, stageX, stageY);
                if (rs != null) {
                    detectRollOver(this);
                } else {
                    detectRollOut(this);
                }
                return rs;
            }
            var target = stageObj.$hitTest(x,y);
            detectRollOver(target);
            if (target != currentTarget) {
                detectRollOut(currentTarget);
                currentTarget = target;
            }
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
    var addMouseWheelEvent = function () {
        var type = "mousewheel";
        var _eventCompat = function (event) {
            var type = event.type;
            if (type == "DOMMouseScroll" || type == "mousewheel") {
                event.delta = event.wheelDelta ? event.wheelDelta : -(event.detail || 0);
                stageObj.dispatchEventWith(mouse.MouseEvent.MOUSE_WHEEL, false, event.delta);
            }
        };
        if (window.addEventListener) {
            if (type === "mousewheel" && document["mozFullScreen"] !== undefined) {
                type = "DOMMouseScroll";
            }
            window.addEventListener(type, function (event) {
                _eventCompat(event);
            }, false);
        }
        else if (window["attachEvent"]) {
            window["attachEvent"]("on" + type, function (event) {
                event = event || window.event;
                _eventCompat(event);
            });
        }
    };
})(mouse || (mouse = {}));
