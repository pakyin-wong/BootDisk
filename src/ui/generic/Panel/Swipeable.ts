namespace we {
  export namespace ui {
    export interface ISwipeable {
      moveArea: egret.DisplayObject;
      onSwipe(): void;
    }

    export enum SwipeDirection {
      left = 'left',
      right = 'right',
      top = 'top',
      down = 'down',
      horizontal = 'horizontal',
      vertical = 'vertical',
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
        if (value) {
          this.target.moveArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
          this.init();
        }
      }

      public get active(): boolean {
        return this._active;
      }

      private offsetPoint;
      private initPoint;
      private isAnimating: boolean;
      private isDown: boolean;
      private isMoved: boolean;

      private onTouchBegin(event: egret.TouchEvent): void {
        this.isDown = true;
        switch (this.swipeDirection) {
          case SwipeDirection.horizontal:
          case SwipeDirection.left:
          case SwipeDirection.right:
            this.offsetPoint = this.target.x - event.$stageX;
            this.initPoint = event.$stageX;
            break;
          case SwipeDirection.vertical:
          case SwipeDirection.top:
          case SwipeDirection.right:
            this.offsetPoint = this.target.y - event.$stageY;
            this.initPoint = event.$stageY;
            break;
        }
        this.target.moveArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.target.moveArea.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
      }

      private onTouchMove(event: egret.TouchEvent): void {
        this.isMoved = true;
        switch (this.swipeDirection) {
          case SwipeDirection.horizontal:
            this.target.x = event.$stageX + this.offsetPoint;
            break;
          case SwipeDirection.left:
            if (this.initPoint >= event.$stageX) {
              this.target.x = event.$stageX + this.offsetPoint;
            }
            break;
          case SwipeDirection.right:
            if (this.initPoint <= event.$stageX) {
              this.target.x = event.$stageX + this.offsetPoint;
            }
            break;
          case SwipeDirection.vertical:
            this.target.y = event.$stageY + this.offsetPoint;
            break;
          case SwipeDirection.top:
            if (this.initPoint <= event.$stageY) {
              this.target.y = event.$stageY + this.offsetPoint;
            }
            break;
          case SwipeDirection.down:
            if (this.initPoint >= event.$stageY) {
              this.target.y = event.$stageY + this.offsetPoint;
            }
            break;
        }
      }

      private onTouchEnd(event: egret.TouchEvent): void {
        this.isDown = false;
        this.target.moveArea.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.target.moveArea.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

        if (this.isMoved) {
          this.isMoved = false;

          this.isAnimating = true;

          let diff = 0;
          let base = 1;
          switch (this.swipeDirection) {
            case SwipeDirection.horizontal:
            case SwipeDirection.left:
            case SwipeDirection.right:
              diff = event.$stageX - this.initPoint;
              base = this.target.width;
              break;
            case SwipeDirection.vertical:
            case SwipeDirection.top:
            case SwipeDirection.right:
              diff = event.$stageY - this.initPoint;
              base = this.target.height;
              break;
          }

          if (Math.abs(diff) / base <= 0.4) {
            // not reach threshold, don't slide
            egret.Tween.get(this.target)
              .to({ $x: 0 }, this.duration)
              .call(() => {
                this.isAnimating = false;
              });
          } else {
            const sign = (diff / Math.abs(diff)) * 1.1;
            egret.Tween.get(this.target)
              .to({ $x: base * sign }, this.duration)
              .call(() => {
                this.isAnimating = false;
              });
          }
        }
      }
    }
  }
}
