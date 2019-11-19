namespace we {
  export namespace ui {
    export class Scroller extends eui.Scroller {
      private drag: boolean = false;
      private startSV: number = -1;
      private startStageY: number = 0;

      public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onMount, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onUnmount, this);
      }

      private throttle(func: any, wait: number, options: any = {}) {
        let context;
        let args;
        let result;
        let timeout = null;
        let previous = 0;
        const later = function () {
          previous = options.leading === false ? 0 : Date.now();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout) {
            context = args = null;
          }
        };
        return function () {
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
        // disable drag
        this.scrollPolicyV = eui.ScrollPolicy.OFF;
        this.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.verticalScrollBar.skinName = utils.getSkin('ScrollBarVertical');
        this.verticalScrollBar.autoVisibility = false;
        this.verticalScrollBar.visible = true;
        this.verticalScrollBar.touchEnabled = true;
        //   this.bounces = false;
        //   this.throwSpeed = Infinity;
      }

      private onMount() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onMount, this);

        // add mouse over/out listeners
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMouseOver, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMouseOut, this);

        // add scroll bar listeners
        this.verticalScrollBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onThumbBegin, this);
        this.verticalScrollBar.addEventListener(egret.TouchEvent.TOUCH_END, this.onThumbEnd, this);
      }

      private onUnmount() {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onUnmount, this);

        // remove mouse over/out listeners
        this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onMouseOver, this);
        this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onMouseOut, this);

        // remove scroll bar listeners
        this.verticalScrollBar.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onThumbBegin, this);
        this.verticalScrollBar.removeEventListener(egret.TouchEvent.TOUCH_END, this.onThumbEnd, this);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onMount, this);
      }

      private _firstYForMovement = 0;
      private _initProgress = 0;

      private onThumbBegin(event: egret.TouchEvent) {
        if (!this.verticalScrollBar.thumb.hitTestPoint(event.stageX, event.stageY)) {
          // only draggable if click on thumb
          return;
        }
        (<any> window).addEventListener('mousemove', this.onMouseMove, { passive: false });
        (<any> window).addEventListener('mouseup', this.onMouseUp, { passive: false });
        const viewHeight = this.viewport.contentHeight - this.height;
        this._initProgress = this.viewport.scrollV / viewHeight;
      }

      private onMouseMove = (event: MouseEvent) => {
        if (!this._firstYForMovement) {
          this._firstYForMovement = event.pageY;
          return;
        }
        const diffY = ((event.pageY - this._firstYForMovement) / egret.sys.DisplayList.$canvasScaleY) * egret.sys.DisplayList.$canvasScaleFactor;
        let progress = this._initProgress + diffY / (this.verticalScrollBar.height - this.verticalScrollBar.thumb.height);
        progress = Math.min(Math.max(progress, 0), 1);
        const viewHeight = this.viewport.contentHeight - this.height;
        this.viewport.scrollV = Math.max(0, Math.min(viewHeight, viewHeight * progress));
      }

      private onMouseUp = (event: MouseEvent) => {
        (<any> window).removeEventListener('mousemove', this.onMouseMove, { passive: false });
        (<any> window).removeEventListener('mouseup', this.onMouseUp, { passive: false });
        this._firstYForMovement = 0;
      }

      private onThumbEnd = (event: egret.TouchEvent) => {
        if (this._firstYForMovement !== 0) {
          // don't jump to click area if dragged
          return;
        }
        let progress = (event.localY - this.verticalScrollBar.thumb.height / 2) / (this.verticalScrollBar.height - this.verticalScrollBar.thumb.height);
        progress = Math.min(Math.max(progress, 0), 1);
        const viewHeight = this.viewport.contentHeight - this.height;
        this.viewport.scrollV = Math.max(0, Math.min(viewHeight, viewHeight * progress));
      }

      private onMouseOver(event: egret.TouchEvent) {
        (<any> window).addEventListener('wheel', this.onMouseWheel, { passive: false });
      }

      private onMouseOut(event: egret.TouchEvent) {
        (<any> window).removeEventListener('wheel', this.onMouseWheel, { passive: false });
      }

      public _prevDeltaY = 0;
      public _stopTimeout = null;

      private onMouseWheel = this.throttle((event: WheelEvent) => {
        event.preventDefault();
        try {
          const viewHeight = this.viewport.contentHeight - this.height;
          this.viewport.scrollV = Math.max(0, Math.min(viewHeight, this.viewport.scrollV + event.deltaY));

          // for bounce if this.scrollPolicyV = eui.ScrollPolicy.ON | AUTO;
          /*
          this.viewport.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_BEGIN, true, true, 0, 0));

          if (this.viewport.scrollV > 0 && this.viewport.scrollV < this.viewport.contentHeight - this.height) {
            this.viewport.scrollV = Math.max(0, Math.min(this.viewport.contentHeight - this.height, this.viewport.scrollV + event.deltaY));
          } else {
            this.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_MOVE, true, true, 0, -event.deltaY));
          }

          window.requestAnimationFrame(() => {
            if (this.viewport.scrollV < -100) {
              this.viewport.scrollV = -100;
            } else if (this.viewport.scrollV > this.viewport.contentHeight - this.height + 100) {
              this.viewport.scrollV = this.viewport.contentHeight - this.height + 100;
            }
            window.requestAnimationFrame(() => {
              this.viewport.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_END, true, true, 0, 0));
            });
          });
          */
        } catch (e) {
          console.log(e);
        }
      }, 1);

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
}
