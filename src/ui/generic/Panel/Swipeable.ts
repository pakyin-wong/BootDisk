/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export enum SwipeDirection {
      left = 'left',
      right = 'right',
      top = 'top',
      down = 'down',
      horizontal = 'horizontal',
      vertical = 'vertical',
    }

    export namespace SwipeDirection {
      export function equal(a: SwipeDirection, b: SwipeDirection) {
        return a.toString() === b.toString();
      }
    }

    export class SwipeableAddon extends DisplayObjectAddon {
      public swipeDirection: SwipeDirection = SwipeDirection.right;
      public duration: number = 300;
      protected target: egret.DisplayObject & ISwipeable;

      constructor(displayObject: egret.DisplayObject & ISwipeable) {
        super(displayObject);
        this.target = displayObject;
      }

      public set active(value: boolean) {
        super.$setActive(value);
      }

      public get active(): boolean {
        return this._active;
      }

      public init() {
        super.init();
        if (this.target.moveArea) {
          this.target.moveArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        } else {
          this.isInit = false;
        }
      }

      public deactivate() {
        super.deactivate();
        if (this.target.moveArea) {
          this.target.moveArea.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }
      }

      private offsetPoint;
      private initPoint;
      private initPos;
      private isAnimating: boolean;
      private isDown: boolean;
      private isMoved: boolean;

      private onTouchBegin(event: egret.TouchEvent): void {
        if (this.isAnimating) {
          return;
        }
        this.isDown = true;
        switch (this.swipeDirection) {
          case SwipeDirection.horizontal:
          case SwipeDirection.left:
          case SwipeDirection.right:
            this.offsetPoint = this.target.content.x - event.$stageX;
            this.initPoint = event.$stageX;
            this.initPos = this.target.content.x;
            break;
          case SwipeDirection.vertical:
          case SwipeDirection.top:
          case SwipeDirection.right:
            this.offsetPoint = this.target.content.y - event.$stageY;
            this.initPoint = event.$stageY;
            this.initPos = this.target.content.y;

            break;
        }
        this.target.moveArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.target.moveArea.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.target.moveArea.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
      }

      private onTouchMove(event: egret.TouchEvent): void {
        this.isMoved = true;
        switch (this.swipeDirection) {
          case SwipeDirection.horizontal:
            this.target.content.x = event.$stageX + this.offsetPoint;
            break;
          case SwipeDirection.left:
            if (this.initPoint >= event.$stageX) {
              this.target.content.x = event.$stageX + this.offsetPoint;
            }
            break;
          case SwipeDirection.right:
            if (this.initPoint <= event.$stageX) {
              this.target.content.x = event.$stageX + this.offsetPoint;
            }
            break;
          case SwipeDirection.vertical:
            this.target.content.y = event.$stageY + this.offsetPoint;
            break;
          case SwipeDirection.top:
            if (this.initPoint <= event.$stageY) {
              this.target.content.y = event.$stageY + this.offsetPoint;
            }
            break;
          case SwipeDirection.down:
            if (this.initPoint >= event.$stageY) {
              this.target.content.y = event.$stageY + this.offsetPoint;
            }
            break;
        }
      }

      private onTouchEnd(event: egret.TouchEvent): void {
        this.isDown = false;
        this.target.moveArea.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.target.moveArea.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.target.moveArea.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);

        if (this.isMoved) {
          this.isMoved = false;

          this.isAnimating = true;

          let diff = 0;
          let base = 1;
          let backOpt;
          let proceedOpt;
          let sign;
          let isValid: boolean = false;
          switch (this.swipeDirection) {
            case SwipeDirection.horizontal:
            case SwipeDirection.left:
            case SwipeDirection.right:
              diff = event.$stageX - this.initPoint;
              base = this.target.content.width;
              sign = (diff / Math.abs(diff)) * 1.1;
              isValid = SwipeDirection.equal(SwipeDirection.left, this.swipeDirection) && sign <= 0;
              isValid = isValid || (SwipeDirection.equal(SwipeDirection.right, this.swipeDirection) && sign >= 0);
              isValid = isValid || SwipeDirection.equal(SwipeDirection.horizontal, this.swipeDirection);
              backOpt = { $x: this.initPos };
              proceedOpt = { $x: base * sign };
              break;
            case SwipeDirection.vertical:
            case SwipeDirection.top:
            case SwipeDirection.right:
              diff = event.$stageY - this.initPoint;
              base = this.target.content.height;
              sign = (diff / Math.abs(diff)) * 1.1;
              isValid = SwipeDirection.equal(SwipeDirection.top, this.swipeDirection) && sign <= 0;
              isValid = isValid || (SwipeDirection.equal(SwipeDirection.down, this.swipeDirection) && sign >= 0);
              isValid = isValid || SwipeDirection.equal(SwipeDirection.vertical, this.swipeDirection);
              backOpt = { $y: this.initPos };
              proceedOpt = { $y: base * sign };
              break;
          }

          if (!isValid || Math.abs(diff) / base <= 0.4) {
            // not reach threshold, don't slide
            egret.Tween.get(this.target.content)
              .to(backOpt, this.duration)
              .call(() => {
                this.isAnimating = false;
              });
          } else {
            egret.Tween.get(this.target.content)
              .to(proceedOpt, this.duration)
              .call(() => {
                this.isAnimating = false;
                this.target.onSwipeFinished();
              });
          }
        }
      }
    }
  }
}
