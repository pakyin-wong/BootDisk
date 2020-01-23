function IPhone7Helper() {}
IPhone7Helper.prototype.ResetScroll = function () {
    if (window.scrollY != 0)
        window.scrollTo(0, 0)
};
IPhone7Helper.prototype.ScrollHandler = function () {
    this.ResetScroll()
};
IPhone8Helper.prototype = Object.create(IPhone7Helper.prototype);
IPhone8Helper.prototype.constructor = IPhone8Helper;

function IPhone8Helper() {
    IPhone7Helper.call(this);
    this.root = null;
    this.canvas = null;
    this.isTouch = false;
    this.isTopPanel = false;
    this.isLandscape = false;
    this.resetScrollTimeout = null;
    this.clientHeight = 0;
    this.panelHiddenTime = -1;
    this.scaleRootMarginTop = -1
}
IPhone8Helper.prototype.GameStarted = function () {
    var logoVisible = window["UHTLogoIsVisible"];
    var loaderVisible = window["loaderIsVisible"] != undefined ? window["loaderIsVisible"] : true;
    return !logoVisible && !loaderVisible
};
IPhone8Helper.prototype.CreateElement = function (className, append) {
    var el = document.createElement("div");
    el.className = className;
    if (append)
        document.body.appendChild(el);
    return el
};
IPhone8Helper.prototype.InitElements = function () {
    var self = this;
    this.CreateElement("fullscreen-reserve", true);
    this.root = this.CreateElement("fullscreen-root-hidden", true);
    this.root.addEventListener("touchstart", function () {
        self.HandleTouchStart.apply(self, arguments)
    }, false);
    this.root.addEventListener("touchmove", function () {
        self.HandleTouchMove.apply(self, arguments)
    }, false);
    this.root.addEventListener("touchend", function () {
        self.HandleTouchEnd.apply(self, arguments)
    }, false);
    this.root.addEventListener("touchcancel", function () {
        self.HandleTouchEnd.apply(self, arguments)
    }, false);
    this.root.addEventListener("gesturestart", function () {
        self.PreventEvent.apply(self, arguments)
    }, false);
    this.root.addEventListener("gesturechange", function () {
        self.PreventEvent.apply(self, arguments)
    }, false);
    this.root.addEventListener("gestureend", function () {
        self.PreventEvent.apply(self, arguments)
    }, false);
    this.canvas = document.getElementsByTagName("canvas")[0]
};
IPhone8Helper.prototype.PreventEvent = function (e) {
    e.preventDefault()
};
IPhone8Helper.prototype.ResizeHandler = function (e) {
    var self = this;
    if (!this.GameStarted()) {
        setTimeout(function () {
            self.ResizeHandler()
        }, 100);
        return
    }
    if (this.root == null)
        this.InitElements();
    var wasLandscape = this.isLandscape;
    this.isLandscape = window.innerWidth > window.innerHeight;
    if (!this.isTouch)
        if (wasLandscape == this.isLandscape) {
            if (this.panelHiddenTime > 0)
                if (Date.now() - this.panelHiddenTime < 69) {
                    setTimeout(function () {
                        self.ResizeHandler(e)
                    }, 500);
                    return
                }
        } else
            this.ResetScroll();
    var screenHeight = this.isLandscape ? Math.min(screen.width, screen.height) : Math.max(screen.width, screen.height) - 60;
    if (!this.isLandscape && screenHeight == 752)
        screenHeight -= 35;
    if (!this.isLandscape && screenHeight == 836)
        screenHeight -= 4;
    this.clientHeight = this.GetClientHeight();
    var wasTopPanel = this.isTopPanel;
    this.isTopPanel = this.clientHeight < screenHeight;
    if (this.isTopPanel) {
        if (!wasTopPanel) {
            this.UpdateStyle(true);
            this.ResetScroll();
            this.UpdateScrollable(true);
            UHTEventBroker.Trigger(UHTEventBroker.Type.Game, JSON.stringify({
                common: "EVT_FULLSCREEN_OVERLAY_SHOWN",
                args: null
            }));
            this.panelHiddenTime = -1
        }
    } else {
        if (wasTopPanel) {
            this.UpdateStyle(false);
            UHTEventBroker.Trigger(UHTEventBroker.Type.Game, JSON.stringify({
                common: "EVT_FULLSCREEN_OVERLAY_HIDDEN",
                args: null
            }));
            this.panelHiddenTime = Date.now()
        }
        this.UpdateScrollable(false)
    }
    if (e !== undefined)
        setTimeout(function () {
            self.ResizeHandler()
        }, 500)
};
IPhone8Helper.prototype.UpdateStyle = function (visible) {
    var c = String(document.documentElement.className).replace("fullscreen-visible", "").split(" ");
    var cn = [];
    for (var i = 0; i < c.length; ++i)
        if (c[i] != "")
            cn.push(c[i]);
    if (visible)
        cn.push("fullscreen-visible");
    document.documentElement.className = cn.join(" ");
    this.root.className = visible ? "fullscreen-root-visible" : "fullscreen-root-hidden"
};
IPhone8Helper.prototype.UpdateScrollable = function (scrollable) {
    document.body.style.position = scrollable ? "static" : "fixed";
    this.canvas.style.position = scrollable ? "fixed" : "static"
};
IPhone8Helper.prototype.HandleTouchStart = function (event) {
    if (this.resetScrollTimeout != null) {
        clearTimeout(this.resetScrollTimeout);
        this.resetScrollTimeout = null
    }
    this.isTouch = true;
    this.UpdateScrollable(false)
};
IPhone8Helper.prototype.HandleTouchMove = function (event) {
    if (this.isTopPanel)
        this.ResizeHandler();
    if (this.isTopPanel && window.scrollY > 0)
        this.UpdateScrollable(true);
    else
        this.UpdateScrollable(false)
};
IPhone8Helper.prototype.HandleTouchEnd = function () {
    var self = this;
    this.isTouch = false;
    this.UpdateScrollable(false);
    this.resetScrollTimeout = setTimeout(function () {
        self.ResetScroll()
    }, 200)
};
IPhone8Helper.prototype.ScrollHandler = function () {
    if (this.clientHeight != this.GetClientHeight()) {
        var event = document.createEvent("HTMLEvents");
        event.initEvent("resize", true, true);
        window.dispatchEvent(event)
    }
};
IPhone8Helper.prototype.ResetScroll = function () {
    if (window.scrollY != 0)
        window.scrollTo(0, 0)
};
IPhone8Helper.prototype.GetClientHeight = function () {
    var height = window.innerHeight;
    if (!this.isTouch && this.resetScrollTimeout == null)
        if (window.scrollY > 0)
            height -= window.scrollY;
    return height
};
var FullScreenIPhoneHelper = {};
FullScreenIPhoneHelper.Init = function () {
    if (UHT_FRAME)
        return;
    if (!(UHT_UA_INFO.device.model == "iPhone" && UHT_UA_INFO.browser.name == "Mobile Safari"))
        return;
    var version = _number.otoui(UHT_UA_INFO.os.version);
    if (version == 7) {
        var h = new IPhone7Helper;
        var onScroll = function () {
            h.ScrollHandler.apply(h, arguments)
        };
        window.addEventListener("scroll", onScroll, false);
        h.ScrollHandler()
    } else {
        var h = new IPhone8Helper;
        var onScroll = function () {
            h.ScrollHandler.apply(h, arguments)
        };
        var onResize = function () {
            h.ResizeHandler.apply(h, arguments)
        };
        window.addEventListener("resize", onResize, false);
        window.addEventListener("scroll", onScroll, false);
        h.ResizeHandler();
        h.ScrollHandler();
        h.ResetScroll()
    }
};
(function () {
    var keyboardAllowed = typeof Element !== "undefined" && "ALLOW_KEYBOARD_INPUT" in Element;
    var fn = function () {
        var val;
        var valLength;
        var fnMap = [
            ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
            ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
            ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
            ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
            ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
        ];
        var i = 0;
        var l = fnMap.length;
        var ret = {};
        for (; i < l; i++) {
            val = fnMap[i];
            if (val && val[1] in document) {
                for (i = 0,
                    valLength = val.length; i < valLength; i++)
                    ret[fnMap[0][i]] = val[i];
                return ret
            }
        }
        return false
    }();
    var screenfull = {
        request: function (elem) {
            if (UHT_UA_INFO.os.name == "iOS")
                return;
            var request = fn.requestFullscreen;
            elem = elem || document.documentElement;
            var isAndroidChrome71Plus = UHT_UA_INFO.os.name == "Android" && UHT_UA_INFO.browser.name == "Chrome" && _number.otoui(UHT_UA_INFO.browser.version) >= 71;
            if (isAndroidChrome71Plus)
                elem[request]({
                    navigationUI: "hide"
                });
            else if (/5\.1[\.\d]* Safari/.test(navigator.userAgent))
                elem[request]();
            else
                elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT)
        },
        exit: function () {
            document[fn.exitFullscreen]()
        },
        toggle: function (elem) {
            if (this.isFullscreen)
                this.exit();
            else
                this.request(elem)
        },
        raw: fn
    };
    if (!fn) {
        window.screenfull = false;
        return
    }
    Object.defineProperties(screenfull, {
        isFullscreen: {
            get: function () {
                return !!document[fn.fullscreenElement]
            }
        },
        element: {
            enumerable: true,
            get: function () {
                return document[fn.fullscreenElement]
            }
        },
        enabled: {
            enumerable: true,
            get: function () {
                return !!document[fn.fullscreenEnabled]
            }
        }
    });
    window.screenfull = screenfull
})();
var FullScreenManager = {};
FullScreenManager.overlay = null;
FullScreenManager.reserve = null;
FullScreenManager.RequestFullscreen = function () {
    if (!window.screenfull.isFullscreen)
        window.screenfull.request()
};
FullScreenManager.ExitFullscreen = function () {
    if (window.screenfull.isFullscreen)
        window.screenfull.exit()
};
FullScreenManager.IsFullscreen = function () {
    return window.screenfull.isFullscreen
};
FullScreenManager.Init = function () {
    if (!UHT_DEVICE_TYPE.MOBILE)
        return;
    if (UHT_GAME_CONFIG_SRC["allowFullscreen"] != undefined)
        if (window.top != window && !UHT_GAME_CONFIG_SRC["allowFullscreen"])
            return;
    var self = FullScreenManager;
    var inputMng = globalColliderInputManager;
    if (inputMng == undefined) {
        setTimeout(self.Init, 50);
        return
    }
    if (window.screenfull && window.screenfull.enabled)
        inputMng.addEventHandler(ColliderEvent.ButtonUp, new EventHandler(self, self.RequestFullscreen));
    FullScreenIPhoneHelper.Init()
};
FullScreenManager.OnLoad = function () {
    var self = FullScreenManager;
    self.Init();
    window.RequestFullscreen = self.RequestFullscreen;
    window.ExitFullscreen = self.ExitFullscreen;
    window.IsFullscreen = self.IsFullscreen
};
FullScreenManager.OnLoad();

function IPhoneChromeFullscreen() {
    this.root = null;
    this.reserve = null;
    this.minHeight = -1;
    this.maxHeight = -1;
    this.topBarHeightLand = -1;
    this.topBarHeightPort = -1;
    this.isInit = false;
    this.isLand = false;
    this.isVisible = false;
    this.isResized = false;
    this.gameJustStarted = true;
    this.timer = 0;
    this.CreateElement = IPhone8Helper.prototype.CreateElement;
    this.UpdateStyle = IPhone8Helper.prototype.UpdateStyle;
    this.GameStarted = IPhone8Helper.prototype.GameStarted
}
IPhoneChromeFullscreen.instance = null;
IPhoneChromeFullscreen.prototype.UpdateReserve = function () {
    this.reserve.style.height = (this.isLand ? this.minHeight : this.maxHeight) + Math.max(0, window.scrollY) + "px"
};
IPhoneChromeFullscreen.prototype.FixScroll = function () {
    if (window.scrollY < this.scrollY)
        window.scrollTo(0, this.scrollY);
    this.UpdateReserve()
};
IPhoneChromeFullscreen.prototype.Init = function () {
    var min = Math.min(screen.width, screen.height);
    var max = Math.max(screen.width, screen.height);
    if (min == 320 && max == 568)
        this.topBarHeightLand = this.topBarHeightPort = this.scrollY = 76;
    if (min == 375 && max == 667)
        this.topBarHeightLand = this.topBarHeightPort = this.scrollY = 76;
    if (min == 414 && max == 736)
        this.topBarHeightLand = this.topBarHeightPort = this.scrollY = 76;
    if (min == 375 && max == 812) {
        this.topBarHeightLand = 56;
        this.topBarHeightPort = this.scrollY = 100
    }
    if (min == 414 && max == 896) {
        this.topBarHeightLand = 56;
        this.topBarHeightPort = this.scrollY = 100
    }
    this.minHeight = min;
    this.maxHeight = max;
    this.root = this.CreateElement("fullscreen-root-hidden", true);
    this.reserve = document.createElement("div");
    document.body.insertBefore(this.reserve, document.getElementsByTagName("canvas")[0]);
    this.UpdateReserve();
    this.isInit = true
};
IPhoneChromeFullscreen.prototype.IsMinimalMode = function () {
    this.isLand = window.innerWidth > window.innerHeight;
    var h = this.isLand ? this.minHeight : this.maxHeight;
    return h - window.innerHeight < (this.isLand ? this.topBarHeightLand : this.topBarHeightPort)
};
IPhoneChromeFullscreen.prototype.OnUHTResize = function (unused) {
    if (!this.isInit)
        this.Init();
    if (!this.IsMinimalMode()) {
        if (!this.isVisible) {
            window.scrollTo(0, 0);
            this.UpdateReserve();
            this.isVisible = true;
            this.UpdateStyle(true);
            UHTEventBroker.Trigger(UHTEventBroker.Type.Game, JSON.stringify({
                common: "EVT_FULLSCREEN_OVERLAY_SHOWN",
                args: null
            }))
        }
    } else if (this.isVisible) {
        this.isVisible = false;
        this.UpdateStyle(false);
        UHTEventBroker.Trigger(UHTEventBroker.Type.Game, JSON.stringify({
            common: "EVT_FULLSCREEN_OVERLAY_HIDDEN",
            args: null
        }))
    }
    this.isResized = true
};
IPhoneChromeFullscreen.prototype.OnUHTUpdate = function (unused) {
    if (this.gameJustStarted)
        if (this.GameStarted()) {
            this.OnUHTResize(null);
            this.gameJustStarted = false
        }
    if (!this.isInit)
        return;
    if (this.isResized) {
        this.isResized = false;
        this.timer = 0;
        return
    }
    if (this.IsMinimalMode())
        if (this.timer > 1) {
            this.timer = 0;
            this.FixScroll()
        } else
            this.timer += Time.deltaTime
};
IPhoneChromeFullscreen.OnLoad = function () {
    if (!UHT_FRAME && UHT_UA_INFO.device.model == "iPhone" && UHT_UA_INFO.browser.name == "Chrome") {
        var instance = IPhoneChromeFullscreen.instance = new IPhoneChromeFullscreen;
        EventManager.AddHandler("EVT_UHT_RESIZE", instance.OnUHTResize, instance);
        EventManager.AddHandler("EVT_UHT_UPDATE", instance.OnUHTUpdate, instance)
    }
};
IPhoneChromeFullscreen.OnLoad();
var NoSleep = {};
NoSleep.os = null;
NoSleep.uap = null;
NoSleep.browserName = "";
NoSleep.Android = function () {
    var srcWebM = document.createElement("source");
    srcWebM.src = "data:video/webm;base64,GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA=";
    srcWebM.type = "video/webm";
    var srcMP4 = document.createElement("source");
    srcMP4.src = "data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAG21kYXQAAAGzABAHAAABthADAowdbb9/AAAC6W1vb3YAAABsbXZoZAAAAAB8JbCAfCWwgAAAA+gAAAAAAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIVdHJhawAAAFx0a2hkAAAAD3wlsIB8JbCAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAIAAAACAAAAAABsW1kaWEAAAAgbWRoZAAAAAB8JbCAfCWwgAAAA+gAAAAAVcQAAAAAAC1oZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAAAVxtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAEcc3RibAAAALhzdHNkAAAAAAAAAAEAAACobXA0dgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAIAAgASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAFJlc2RzAAAAAANEAAEABDwgEQAAAAADDUAAAAAABS0AAAGwAQAAAbWJEwAAAQAAAAEgAMSNiB9FAEQBFGMAAAGyTGF2YzUyLjg3LjQGAQIAAAAYc3R0cwAAAAAAAAABAAAAAQAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAAAEwAAAAEAAAAUc3RjbwAAAAAAAAABAAAALAAAAGB1ZHRhAAAAWG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAK2lsc3QAAAAjqXRvbwAAABtkYXRhAAAAAQAAAABMYXZmNTIuNzguMw==";
    srcMP4.type = "video/mp4";
    var video = document.createElement("video");
    video.setAttribute("loop", "");
    video.appendChild(srcWebM);
    video.appendChild(srcMP4);
    video.play();
    renderCanvas.removeEventListener("touchend", NoSleep.Android, false);
    NoSleep = null
};
NoSleep.IOS10 = function () {
    var video = document.createElement("video");
    video.setAttribute("playsinline", "");
    video.setAttribute("src", "data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC8wYF///v3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiByMjQ3OSBkZDc5YTYxIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTEgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MToweDExMSBtZT1oZXggc3VibWU9MiBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0wIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MCA4eDhkY3Q9MCBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0wIHRocmVhZHM9NiBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTMgYl9weXJhbWlkPTIgYl9hZGFwdD0xIGJfYmlhcz0wIGRpcmVjdD0xIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MSBrZXlpbnQ9MzAwIGtleWludF9taW49MzAgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD0xMCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIwLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IHZidl9tYXhyYXRlPTIwMDAwIHZidl9idWZzaXplPTI1MDAwIGNyZl9tYXg9MC4wIG5hbF9ocmQ9bm9uZSBmaWxsZXI9MCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAOWWIhAA3//p+C7v8tDDSTjf97w55i3SbRPO4ZY+hkjD5hbkAkL3zpJ6h/LR1CAABzgB1kqqzUorlhQAAAAxBmiQYhn/+qZYADLgAAAAJQZ5CQhX/AAj5IQAD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");
    video.addEventListener("timeupdate", function () {
        if (video.currentTime > .5)
            video.currentTime = Math.random()
    });
    video.play();
    document.removeEventListener("touchend", NoSleep.IOS10, false);
    NoSleep = null
};
NoSleep.Init = function () {
    if (NoSleep.uap == null) {
        NoSleep.uap = new UAParser2;
        NoSleep.os = NoSleep.uap.getOS() || {
            name: "",
            version: "0"
        };
        NoSleep.browserName = NoSleep.uap.getBrowser().name
    }
    if (NoSleep.os.name == "Android" && NoSleep.uap.getBrowser().name == "Chrome" && !IS_UCBROWSER) {
        if (renderCanvas == undefined) {
            setTimeout(NoSleep.Init, 100);
            return
        }
        renderCanvas.addEventListener("touchend", NoSleep.Android, false)
    } else if (NoSleep.os.name == "iOS" && (NoSleep.browserName.indexOf("Safari") != -1 || NoSleep.browserName.indexOf("Chrome") != -1))
        if (parseFloat(NoSleep.os.version) >= 10)
            document.addEventListener("touchend", NoSleep.IOS10, false)
};
NoSleep.Init();
