// TypeScript file
namespace we {
  export namespace ui {
    export class MobileSlideUpMenu extends core.BaseEUI {
      public static Status = {
        closed: -1,
        collapse: 0,
        expand: 1,
      };

      protected _root: eui.Group;

      protected _lblTitle: RunTimeLabel;
      protected _backBtnGroup: eui.Group;
      protected _lblBackButton: RunTimeLabel;
      protected _btnClose: egret.DisplayObject;

      protected _touchArea: eui.Component;

      protected _scroller: eui.Scroller;
      protected _content: eui.Group;

      protected _currentOpt: any;
      protected _currentPage: ui.Panel;
      protected _currentStatus: number = -1;

      // protected _expandHeight: number = 1966;
      // protected _collapseHeight: number = 1343;
      public tweenDuration: number = 200;

      constructor() {
        super('SlideUpMenuSkin', false);
      }

      protected get expandHeight(): number {
        if (env.orientation == egret.OrientationMode.PORTRAIT) {
          return 1966;
        } else {
          return 1095;
        }
      }

      protected get collapseHeight(): number {
        if (env.orientation == egret.OrientationMode.PORTRAIT) {
          return 1343;
        } else {
          return 671;
        }
      }

      protected clearOrientationDependentComponent() {
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);

        this._root.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);

        this._content.removeChildren();
      }

      protected initOrientationDependentComponent() {
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this._root.y = this.expandHeight;
        this.height = this.expandHeight;

        this._root.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);

        if (this._currentOpt) {
          const page = new this._currentOpt.class();
          if (this._currentOpt.skinName) {
            page.skinName = this._currentOpt.skinName;
          }
          this._content.addChild(page);
          this._currentPage = page;
          this._currentPage.left = 0;
          this._currentPage.right = 0;

          this._lblTitle.renderText = () => i18n.t(this._currentOpt.title ? this._currentOpt.title : '');

          if (this._currentOpt.backClass) {
            this._backBtnGroup.visible = true;
            this._lblBackButton.renderText = () => i18n.t(this._currentOpt.backTitle ? this._currentOpt.backTitle : '');
          } else {
            this._backBtnGroup.visible = false;
          }

          // if page has scroller, add listeners
          const scroller = this._currentPage['_scroller'];
          if (scroller) {
            this._scroller = scroller;
            scroller.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onScrollerTouchBegin, this);
            scroller.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onScrollerTouchMove, this);
            scroller.addEventListener(egret.TouchEvent.TOUCH_END, this.onScrollerTouchEnd, this);
            scroller.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onScrollerTouchCancel, this);
          }
        }

        switch (this._currentStatus) {
          case MobileSlideUpMenu.Status.collapse:
            this.tweenTo(this.expandHeight - this.collapseHeight);
            break;
          case MobileSlideUpMenu.Status.expand:
            this.tweenTo(0);
            break;
        }
      }

      protected destroy() {
        super.destroy();
      }

      public show() {
        // tween root
        if (this._currentStatus < 0) {
          this.tweenTo(this.expandHeight - this.collapseHeight);
          this._currentStatus = 0;
        }
      }

      public hide() {
        egret.Tween.removeTweens(this._root);
        if (this._root.y >= this.expandHeight) {
          this._currentStatus = -1;
        } else {
          egret.Tween.get(this._root)
            .to({ y: this.expandHeight }, this.tweenDuration)
            .call(() => {
              this._currentStatus = -1;
            });
        }
      }

      public setPage(opt: any) {
        // clear previous pages
        this._currentPage = null;
        this._scroller = null;
        this._content.removeChildren();
        this._currentOpt = opt;
        const page = new opt.class();
        if (this._currentOpt.skinName) {
          page.skinName = this._currentOpt.skinName;
        }

        this._lblTitle.renderText = () => i18n.t(this._currentOpt.title ? this._currentOpt.title : '');

        if (this._currentOpt.backClass) {
          this._backBtnGroup.visible = true;
          this._lblBackButton.renderText = () => i18n.t(this._currentOpt.backTitle ? this._currentOpt.backTitle : '');
        } else {
          this._backBtnGroup.visible = false;
        }

        // add page to stack and add to _content
        this._content.addChild(page);
        this._currentPage = page;
        this._currentPage.left = 0;
        this._currentPage.right = 0;

        const scroller = this._currentPage['_scroller'];
        if (scroller) {
          this._scroller = scroller;
          scroller.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onScrollerTouchBegin, this);
          scroller.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onScrollerTouchMove, this);
          scroller.addEventListener(egret.TouchEvent.TOUCH_END, this.onScrollerTouchEnd, this);
          scroller.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onScrollerTouchCancel, this);
        }

      }

      protected _startY: number;
      protected _prevTouchY: number;
      protected _startPosY: number;
      protected _startHeight: number;
      protected _diff: number;
      protected _velocity: number;
      protected onTouchBegin(evt: egret.TouchEvent) {
        this._root.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this._root.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this._root.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd, this);
        this._root.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);

        this._startY = evt.stageY;
        this._prevTouchY = evt.stageY;
        this._startPosY = this._root.y;
        this._startHeight = this._root.height;
        this._diff = 0;
        this._velocity = 0;
        this.isEnd = false;
      }

      protected onTouchMove(evt: egret.TouchEvent) {
        const touchY = evt.stageY;
        this._diff = touchY - this._startY;
        this._velocity = touchY - this._prevTouchY;
        this._prevTouchY = evt.stageY;

        // prevent expand/ collapse if scroller touched, is expanded, or !(scrollV == 0 && diff<=0)
        if (this._isScrollerTouched && !this._preventScroll) {
          return;
        }
        if (Math.abs(this._diff) < 50) {
          return;
        }
        this._root.y = Math.max(0, this._startPosY + this._diff);
        this._root.height = Math.min(this._startHeight - this._diff, this.expandHeight);
      }

      protected isEnd:boolean = false;
      protected onTouchEnd(evt: egret.TouchEvent) {
        if (this.isEnd) {
          return;
        }
        this.isEnd = true;
        if (this._isScrollerTouched && !this._preventScroll) {
          this._isScrollerTouched = false;
          return;
        }
        const tempY = this._root.y;
        const expandDiff = tempY;
        const collapseDiff = Math.abs(tempY - (this.expandHeight - this.collapseHeight));
        const closeDiff = Math.abs(tempY - this.expandHeight);
        const minDiff = Math.min(Math.min(collapseDiff, expandDiff), closeDiff);

        if (Math.abs(this._velocity) > 20) {
          if (this._velocity > 0) {
            // tween down for one level
            switch (minDiff) {
              case expandDiff:
                this.tweenTo(this.expandHeight - this.collapseHeight);
                this._currentStatus = 0;
                break;
              case collapseDiff:
                this.hide();
                break;
              case closeDiff:
                this.hide();
                break;
            }
          } else {
            // tween up for one level if applicable
            switch (minDiff) {
              case expandDiff:
                this.tweenTo(0);
                this._currentStatus = 1;
                break;
              case collapseDiff:
                this.tweenTo(0);
                this._currentStatus = 1;
                break;
              case closeDiff:
                this.tweenTo(this.expandHeight - this.collapseHeight);
                this._currentStatus = 0;
                break;
            }
          }
        } else {
          // snap root position and height
          switch (minDiff) {
            case expandDiff:
              this.tweenTo(0);
              this._currentStatus = 1;
              break;
            case collapseDiff:
              this.tweenTo(this.expandHeight - this.collapseHeight);
              this._currentStatus = 0;
              break;
            case closeDiff:
              this.hide();
              break;
          }
        }

        this._root.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this._root.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this._root.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd, this);
        this._root.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);

        // const y = this._startPosY + this._diff;
        // const finalY = y > this.expandHeight - y? this.expandHeight : 0;
        // const finalHeight = finalY>0
        // if (y > this.expandHeight - y) {

        // }
      }

      protected tweenTo(y: number) {
        egret.Tween.removeTweens(this._root);
        const targetY = y;
        const targetHeight = this.expandHeight - y;
        egret.Tween.get(this._root).to({ y: targetY, height: targetHeight }, this.tweenDuration);
      }

      protected _isScrollerTouched: boolean = false;
      protected _preventScroll: boolean = false;

      protected onScrollerTouchBegin(evt: egret.TouchEvent) {
        this._isScrollerTouched = true;
        evt.preventDefault();

        // prevent scroll if not expand, and scrollV < 10
        if (this._root.y > 0 && this._scroller.viewport.scrollV < 10) {
          this._scroller.viewport.scrollV = 0;
          this._preventScroll = true;
        } else {
          this._preventScroll = false;
        }
      }
      protected onScrollerTouchMove(evt: egret.TouchEvent) {
        console.log('scroll move');
        if (this._preventScroll) {
          evt.preventDefault();
        }
      }
      protected onScrollerTouchEnd(evt: egret.TouchEvent) {
        console.log('scroll end');
        if (this._preventScroll) {
          evt.preventDefault();
        }
      }
      protected onScrollerTouchCancel(evt: egret.TouchEvent) {
        console.log('scroll cancel');
        if (this._preventScroll) {
          evt.preventDefault();
        }
      }
    }
  }
}
