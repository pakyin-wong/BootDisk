/* tslint:disable max-classes-per-file */

class IPhone7Helper {
  constructor() {}

  public ResetScroll() {
    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  }

  public ScrollHandler() {
    this.ResetScroll();
  }
}

class IPhone8Helper extends IPhone7Helper {
  public root = null;
  public canvas = null;
  public isTouch = false;
  public isTopPanel = false;
  public isLandscape = false;
  public resetScrollTimeout = null;
  public clientHeight = 0;
  public panelHiddenTime = -1;
  public scaleRootMarginTop = -1;

  constructor() {
    super();

    this.root = null;
    this.canvas = null;
    this.isTouch = false;
    this.isTopPanel = false;
    this.isLandscape = false;
    this.resetScrollTimeout = null;
    this.clientHeight = 0;
    this.panelHiddenTime = -1;
    this.scaleRootMarginTop = -1;
  }

  public GameStarted() {
    if (!(dir.sceneCtr.currScene instanceof we.loading.Scene)) {
      return true;
    }
    return false;
  }

  public CreateElement(className, append) {
    const el = document.createElement('div');
    el.className = className;
    if (append) {
      document.body.appendChild(el);
    }
    return el;
  }

  public InitElements() {
    const self = this;
    this.CreateElement('fullscreen-reserve', true);
    this.root = this.CreateElement('fullscreen-root-hidden', true);
    this.root.addEventListener(
      'touchstart',
      function () {
        self.HandleTouchStart.apply(self, arguments);
      },
      false
    );
    this.root.addEventListener(
      'touchmove',
      function () {
        self.HandleTouchMove.apply(self, arguments);
      },
      false
    );
    this.root.addEventListener(
      'touchend',
      function () {
        self.HandleTouchEnd.apply(self, arguments);
      },
      false
    );
    this.root.addEventListener(
      'touchcancel',
      function () {
        self.HandleTouchEnd.apply(self, arguments);
      },
      false
    );
    this.root.addEventListener(
      'gesturestart',
      function () {
        self.PreventEvent.apply(self, arguments);
      },
      false
    );
    this.root.addEventListener(
      'gesturechange',
      function () {
        self.PreventEvent.apply(self, arguments);
      },
      false
    );
    this.root.addEventListener(
      'gestureend',
      function () {
        self.PreventEvent.apply(self, arguments);
      },
      false
    );
    this.canvas = document.getElementsByTagName('canvas')[0];
  }

  public PreventEvent(e: Event) {
    e.preventDefault();
  }

  public ResizeHandler(e?: Event) {
    const self = this;
    if (!this.GameStarted()) {
      setTimeout(function () {
        self.ResizeHandler();
      }, 100);
      return;
    }
    if (this.root == null) {
      this.InitElements();
    }
    const wasLandscape = this.isLandscape;
    this.isLandscape = window.innerWidth > window.innerHeight;
    if (!this.isTouch) {
      if (wasLandscape === this.isLandscape) {
        if (this.panelHiddenTime > 0) {
          if (Date.now() - this.panelHiddenTime < 69) {
            setTimeout(function () {
              self.ResizeHandler(e);
            }, 500);
            return;
          }
        }
      } else {
        this.ResetScroll();
      }
    }
    let screenHeight = this.isLandscape ? Math.min(screen.width, screen.height) : Math.max(screen.width, screen.height) - 60;
    if (!this.isLandscape && screenHeight === 752) {
      screenHeight -= 35;
    }
    if (!this.isLandscape && screenHeight === 836) {
      screenHeight -= 4;
    }
    this.clientHeight = this.GetClientHeight();
    const wasTopPanel = this.isTopPanel;
    this.isTopPanel = this.clientHeight < screenHeight;
    if (this.isTopPanel) {
      if (!wasTopPanel) {
        this.UpdateStyle(true);
        this.ResetScroll();
        this.UpdateScrollable(true);
        // UHTEventBroker.Trigger(UHTEventBroker.Type.Game, JSON.stringify({
        //   common: "EVT_FULLSCREEN_OVERLAY_SHOWN",
        //   args: null
        // }));
        this.panelHiddenTime = -1;
      }
    } else {
      if (wasTopPanel) {
        this.UpdateStyle(false);
        // UHTEventBroker.Trigger(UHTEventBroker.Type.Game, JSON.stringify({
        //   common: "EVT_FULLSCREEN_OVERLAY_HIDDEN",
        //   args: null
        // }));
        this.panelHiddenTime = Date.now();
      }
      this.UpdateScrollable(false);
    }
    if (e !== undefined) {
      setTimeout(function () {
        self.ResizeHandler();
      }, 500);
    }
  }

  public UpdateStyle(visible) {
    const c = String(document.documentElement.className)
      .replace('fullscreen-visible', '')
      .split(' ');
    const cn = [];
    for (const str of c) {
      if (str !== '') {
        cn.push(str);
      }
    }
    if (visible) {
      cn.push('fullscreen-visible');
    }
    document.documentElement.className = cn.join(' ');
    this.root.className = visible ? 'fullscreen-root-visible' : 'fullscreen-root-hidden';
  }

  public UpdateScrollable(scrollable) {
    // document.body.style.position = scrollable ? 'static' : 'fixed';
    this.canvas.style.position = scrollable ? 'static' : 'fixed';
    if (!scrollable) {
      this.canvas.style.top = 0;
    }
  }

  public HandleTouchStart(event: Event) {
    if (this.resetScrollTimeout !== null) {
      clearTimeout(this.resetScrollTimeout);
      this.resetScrollTimeout = null;
    }
    this.isTouch = true;
    this.UpdateScrollable(false);
  }

  public HandleTouchMove(event: Event) {
    if (this.isTopPanel) {
      this.ResizeHandler(event);
    }
    if (this.isTopPanel && window.scrollY > 0) {
      this.UpdateScrollable(true);
    } else {
      this.UpdateScrollable(false);
    }
  }

  public HandleTouchEnd() {
    const self = this;
    this.isTouch = false;
    this.UpdateScrollable(false);
    this.resetScrollTimeout = setTimeout(function () {
      self.ResetScroll();
    }, 200);
  }

  public ScrollHandler() {
    if (this.clientHeight !== this.GetClientHeight()) {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, true);
      window.dispatchEvent(event);
    }
  }

  public ResetScroll() {
    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  }

  public GetClientHeight() {
    let height = window.innerHeight;
    if (!this.isTouch && this.resetScrollTimeout === null) {
      if (window.scrollY > 0) {
        height -= window.scrollY;
      }
    }
    return height;
  }
}

class FullScreenIPhoneHelper {
  public static Init() {
    if (!(env.UAInfo.device.model === 'iPhone' && env.UAInfo.browser.name === 'Mobile Safari')) {
      return;
    }
    const version = parseInt(env.UAInfo.os.version, 10);
    if (version === 7) {
      const h7 = new IPhone7Helper();
      const onScroll = function () {
        h7.ScrollHandler.apply(h7, arguments);
      };
      window.addEventListener('scroll', onScroll, false);
      h7.ScrollHandler();
    } else {
      const h = new IPhone8Helper();
      const onScroll = function () {
        h.ScrollHandler.apply(h, arguments);
      };
      const onResize = function () {
        h.ResizeHandler.apply(h, arguments);
      };
      window.addEventListener('resize', onResize, false);
      window.addEventListener('scroll', onScroll, false);
      h.ResizeHandler();
      h.ScrollHandler();
      h.ResetScroll();
    }
  }
}

class ScreenFull {
  private fn;
  private keyboardAllowed;

  private fsfn() {
    let val;
    let valLength;
    const fnMap = [
      ['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
      ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
      ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'],
      ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'],
      ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError'],
    ];
    let i = 0;
    const l = fnMap.length;
    const ret = {};
    for (; i < l; i++) {
      val = fnMap[i];
      if (val && val[1] in document) {
        for (i = 0, valLength = val.length; i < valLength; i++) {
          ret[fnMap[0][i]] = val[i];
        }
        return ret;
      }
    }
    return false;
  }

  constructor() {
    this.fn = this.fsfn();
    this.keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;
  }

  public request(elem) {
    if (env.UAInfo.os.name === 'iOS') {
      return;
    }
    const request = this.fn.requestFullscreen;
    elem = elem || document.documentElement;
    const isAndroidChrome71Plus = env.UAInfo.os.name === 'Android' && env.UAInfo.browser.name === 'Chrome' && parseInt(env.UAInfo.browser.version, 10) >= 71;
    if (isAndroidChrome71Plus) {
      elem[request]({
        navigationUI: 'hide',
      });
    } else if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
      elem[request]();
    } else {
      elem[request](this.keyboardAllowed && elem.ALLOW_KEYBOARD_INPUT);
    }
  }

  public exit() {
    document[this.fn.exitFullscreen]();
  }

  public toggle(elem) {
    if (this.isFullscreen) {
      this.exit();
    } else {
      this.request(elem);
    }
  }

  public get isFullscreen() {
    return !!document[this.fn.fullscreenElement];
  }

  public get element() {
    return document[this.fn.fullscreenElement];
  }

  public get enabled() {
    return !!document[this.fn.fullscreenEnabled];
  }
}

(<any> window).screenfull = new ScreenFull();

class FullScreenManager {
  public static overlay = null;
  public static reserve = null;
  private static screenfull = (<any> window).screenfull;

  public static RequestFullscreen() {
    if (!this.screenfull.isFullscreen) {
      this.screenfull.request();
    }
  }

  public static ExitFullscreen() {
    if (this.screenfull.isFullscreen) {
      this.screenfull.exit();
    }
  }

  public static IsFullscreen() {
    return this.screenfull.isFullscreen;
  }

  public static Init() {
    if (env.UAInfo.device.type !== 'mobile') {
      return;
    }
    // if (UHT_GAME_CONFIG_SRC["allowFullscreen"] != undefined)
    //   if (window.top != window && !UHT_GAME_CONFIG_SRC["allowFullscreen"])
    //     return;
    const self = FullScreenManager;
    // var inputMng = globalColliderInputManager;
    // if (inputMng == undefined) {
    //   setTimeout(self.Init, 50);
    //   return
    // }
    // if (this.screenfull && this.screenfull.enabled)
    //   inputMng.addEventHandler(ColliderEvent.ButtonUp, new EventHandler(self, self.RequestFullscreen));
    FullScreenIPhoneHelper.Init();
  }

  public static OnLoad() {
    const self = FullScreenManager;
    self.Init();
    (<any> window).RequestFullscreen = self.RequestFullscreen;
    (<any> window).ExitFullscreen = self.ExitFullscreen;
    (<any> window).IsFullscreen = self.IsFullscreen;
  }
}

class IPhoneChromeFullscreen {
  public root;
  public reserve;
  public canvas;
  public minHeight;
  public maxHeight;
  public topBarHeightLand;
  public topBarHeightPort;
  public isInit;
  public isLand;
  public isVisible;
  public isResized;
  public gameJustStarted;
  public timer;
  public currTime;
  public scrollY;
  public static instance = null;

  constructor() {
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
    this.currTime = 0;
    this.scrollY = 0;
  }

  public CreateElement(className, append) {
    const el = document.createElement('div');
    el.className = className;
    if (append) {
      document.body.appendChild(el);
    }
    return el;
  }

  public UpdateStyle(visible) {
    const c = String(document.documentElement.className)
      .replace('fullscreen-visible', '')
      .split(' ');
    const cn = [];
    for (const str of c) {
      if (str !== '') {
        cn.push(str);
      }
    }
    if (visible) {
      cn.push('fullscreen-visible');
    }
    document.documentElement.className = cn.join(' ');
    this.root.className = visible ? 'fullscreen-root-visible' : 'fullscreen-root-hidden';

    this.canvas.style.position = 'fixed';
    if (!visible) {
      this.canvas.style.top = 0;
    }
  }

  public GameStarted() {
    if (!(dir.sceneCtr.currScene instanceof we.loading.Scene)) {
      return true;
    }
    return false;
  }

  public UpdateReserve() {
    this.reserve.style.height = (this.isLand ? this.minHeight : this.maxHeight) + Math.max(0, window.scrollY) + 'px';
  }

  public FixScroll() {
    if (window.scrollY < this.scrollY) {
      window.scrollTo(0, this.scrollY);
    }
    this.UpdateReserve();
  }

  public Init() {
    const min = Math.min(screen.width, screen.height);
    const max = Math.max(screen.width, screen.height);
    if (min === 320 && max === 568) {
      this.topBarHeightLand = this.topBarHeightPort = this.scrollY = 76;
    }
    if (min === 375 && max === 667) {
      this.topBarHeightLand = this.topBarHeightPort = this.scrollY = 76;
    }
    if (min === 414 && max === 736) {
      this.topBarHeightLand = this.topBarHeightPort = this.scrollY = 76;
    }
    if (min === 375 && max === 812) {
      this.topBarHeightLand = 56;
      this.topBarHeightPort = this.scrollY = 100;
    }
    if (min === 414 && max === 896) {
      this.topBarHeightLand = 56;
      this.topBarHeightPort = this.scrollY = 100;
    }
    this.minHeight = min;
    this.maxHeight = max;
    this.root = this.CreateElement('fullscreen-root-hidden', true);
    this.reserve = document.createElement('div');
    // document.body.insertBefore(this.reserve, document.getElementsByTagName('canvas')[0]);
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.canvas.parentNode.insertBefore(this.reserve, this.canvas);
    this.UpdateReserve();
    this.isInit = true;
  }

  public IsMinimalMode() {
    this.isLand = window.innerWidth > window.innerHeight;
    const h = this.isLand ? this.minHeight : this.maxHeight;
    return h - window.innerHeight < (this.isLand ? this.topBarHeightLand : this.topBarHeightPort);
  }

  public OnResize(unused) {
    if (!this.isInit) {
      this.Init();
    }
    if (!this.IsMinimalMode()) {
      if (!this.isVisible) {
        window.scrollTo(0, 0);
        this.UpdateReserve();
        this.isVisible = true;
        this.UpdateStyle(true);
        // UHTEventBroker.Trigger(UHTEventBroker.Type.Game, JSON.stringify({
        //     common: "EVT_FULLSCREEN_OVERLAY_SHOWN",
        //     args: null
        // }))
      }
    } else if (this.isVisible) {
      this.isVisible = false;
      this.UpdateStyle(false);
      // UHTEventBroker.Trigger(UHTEventBroker.Type.Game, JSON.stringify({
      //     common: "EVT_FULLSCREEN_OVERLAY_HIDDEN",
      //     args: null
      // }))
    }
    this.isResized = true;
  }

  public OnUpdate(unused) {
    if (this.gameJustStarted) {
      if (this.GameStarted()) {
        this.OnResize(null);
        this.gameJustStarted = false;
      }
    }
    if (!this.isInit) {
      return;
    }
    if (this.isResized) {
      this.isResized = false;
      this.timer = 0;
      this.currTime = egret.getTimer();
      return;
    }
    if (this.IsMinimalMode()) {
      if (egret.getTimer() - this.currTime > 1) {
        this.timer = 0;
        this.currTime = egret.getTimer();
        this.FixScroll();
      }
    }
  }
  public static OnLoad(stage: egret.Stage) {
    // if (env.UAInfo.device.model === 'iPhone' && env.UAInfo.browser.name === 'Chrome') {
    IPhoneChromeFullscreen.instance = new IPhoneChromeFullscreen();
    const instance = IPhoneChromeFullscreen.instance;
    stage.addEventListener(egret.Event.RESIZE, instance.OnResize, instance);
    stage.addEventListener(egret.Event.ENTER_FRAME, instance.OnUpdate, instance);
    // }
  }
}
