namespace components {
  export class Scroller extends eui.Scroller {
    private drag: boolean = false;
    private startSV: number = -1;
    private startStageY: number = 0;

    public constructor() {
      super();

      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.doInit, this);
      this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.doRelease, this);
    }

    private throttle(func: any, wait: number, options: any = {}) {
      let context;
      let args;
      let result;
      let timeout = null;
      let previous = 0;
      const later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      };
      return function() {
        const now = Date.now();
        if (!previous && options.leading === false) {
          previous = now;
        }
        const remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = func.apply(context, args);
          if (!timeout) {
            context = args = null;
          }
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    }

    public childrenCreated(): void {
      super.childrenCreated();
      this.verticalScrollBar.width = 50;
      this.verticalScrollBar.autoVisibility = false;
      this.verticalScrollBar.visible = true;
    }

    private doInit() {
      this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.doInit, this);

      // init viewport
      const list = new eui.List();
      list.dataProvider = new eui.ArrayCollection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
      //   this._scroller.percentHeight = 20;
      //   this._scroller.percentWidth = 100;
      // this._scroller.horizontalCenter = true;
      this.viewport = list;

      // this.addEventListener(mouse.MouseEvent.WHEEL,this.onMouseWheel,this);
      //   this.dispatchEventWith(egret.TouchEvent.TOUCH_TAP, true);
      (<any>window).addEventListener('wheel', this.onMouseWheel, { passive: false });
      //   this.addEventListener('mousewheel', this.onMouseWheel, this);

      this.verticalScrollBar.touchEnabled = true;
      this.verticalScrollBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onThumbEvent, this);
      // GameLayerManager.Instance.sceneLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onThumbDrag,this);
      // GameLayerManager.Instance.upperLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onThumbDrag,this);
      this.verticalScrollBar.addEventListener(egret.TouchEvent.TOUCH_END, this.onThumbEvent, this);
      this.verticalScrollBar.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onThumbEvent, this);
      // this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => { console.log(this.viewport.scrollV); console.log(this.viewport.contentHeight); console.log(this);},this);
    }

    private doRelease() {
      this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.doRelease, this);
      // this.removeEventListener(mouse.MouseEvent.WHEEL,this.onMouseWheel,this);
      //   this.addEventListener('mousewheel', this.onMouseWheel, this);

      this.verticalScrollBar.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onThumbEvent, this);
      // GameLayerManager.Instance.sceneLayer.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onThumbDrag,this);
      // GameLayerManager.Instance.upperLayer.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onThumbDrag,this);
      this.verticalScrollBar.removeEventListener(egret.TouchEvent.TOUCH_END, this.onThumbEvent, this);
      this.verticalScrollBar.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onThumbEvent, this);
    }

    private onThumbEvent(evt: egret.TouchEvent) {
      this.drag = evt.type === egret.TouchEvent.TOUCH_BEGIN;
      const bar_height = this.verticalScrollBar.height;
      const view_height = this.viewport.contentHeight - this.height;
      const pos = evt.localY / bar_height;
      if (this.drag) {
        this.viewport.scrollV = view_height * pos;
        this.startSV = this.viewport.scrollV;
        this.startStageY = evt.stageY;
      }
    }

    private onThumbDrag(evt: egret.TouchEvent) {
      if (this.drag) {
        const bar_height = this.verticalScrollBar.height - this.verticalScrollBar.thumb.height;
        const view_height = this.viewport.contentHeight - this.height;
        const rate = view_height / bar_height;
        const diff = evt.stageY - this.startStageY;
        this.viewport.scrollV = this.startSV + diff * rate;

        if (this.viewport.scrollV < 0) {
          this.viewport.scrollV = 0;
        }
        if (this.viewport.scrollV > this.viewport.contentHeight - this.height) {
          this.viewport.scrollV = this.viewport.contentHeight - this.height;
        }

        this.startSV = this.viewport.scrollV;
        this.startStageY = evt.stageY;
      }
    }

    public _timeout = null;

    private onMouseWheel = (event: WheelEvent) => {
      event.preventDefault();
      try {
        // if (this._ch > 50) {
        //   return;
        // }

        // if (this._doNothing) {
        //   return;
        // }
        // if (this.viewport.scrollV < -250 || this.viewport.scrollV > this.viewport.contentHeight + 250) {
        //   this.viewport.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_END, true, true, 0, 0));
        //   this._doNothing = true;
        //   clearTimeout(this._waitStopLock);
        //   this._waitStopLock = setTimeout(() => {
        //     this._doNothing = false;
        //   }, 999);
        //   return;
        // }

        this.viewport.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_BEGIN, true, true, 0, 0));
        const currentPos = Math.max(0, Math.min(this.viewport.contentHeight - this.height, this.viewport.scrollV + event.deltaY));
        const bounceThreshold = 400;
        if (currentPos === 0 || currentPos === this.viewport.contentHeight - this.height) {
          if (currentPos === 0) {
            this.viewport.scrollV = 0;
          } else {
            this.viewport.scrollV = this.viewport.contentHeight - this.height;
          }
          clearTimeout(this._timeout);
          this._timeout = setTimeout(() => {
            const adj = Math.min(bounceThreshold, Math.max(-bounceThreshold, event.deltaY));
            this.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_MOVE, true, true, 0, -adj));
            this.viewport.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_END, true, true, 0, 0));
          }, 1);
          return;
        }

        // this.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_MOVE, true, true, 0, -event.deltaY));
        this.viewport.scrollV = currentPos;

        // clearTimeout(this._stopTimeout);
        // this._stopTimeout = setTimeout(() => {
        // this.viewport.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_END, true, true, 0, 0));
        //   this._stopTimeout = null;
        // }, 500);
      } catch (e) {
        console.log(e);
      }
    };

    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void {
      super.updateDisplayList(unscaledWidth, unscaledHeight);
      this.validateNow();
      if (this.viewport.contentHeight < this.height) {
        this.verticalScrollBar.visible = false;
      } else {
        this.verticalScrollBar.visible = true;
      }
    }
  }
}
