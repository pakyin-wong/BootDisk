namespace we {
  export namespace ui {
    export class DraggableAddon extends DisplayObjectAddon {
      protected target: eui.Component & IDraggable;

      constructor(displayObject: eui.Component & IDraggable) {
        super(displayObject);
      }

      // public set active(value: boolean) {
      //   super.$setActive(value);
      // }
      // public get active(): boolean {
      //   return this._active;
      // }

      public init() {
        super.init();
        if (this.target.moveArea) {
          this.target.moveArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
          const storedPos = env.storedPositions[this.target.panelName];
          if (storedPos) {
            this.target.x = storedPos.x;
            this.target.y = storedPos.y;
          }
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

      private offsetPointX;
      private offsetPointY;

      protected onTouchBegin(event: egret.TouchEvent): void {
        this.target.$includeInLayout = false;
        this.offsetPointX = this.target.x - event.$stageX;
        this.offsetPointY = this.target.y - event.$stageY;
        this.target.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.target.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
      }

      protected onTouchMove(event: egret.TouchEvent): void {
        this.target.x = event.$stageX + this.offsetPointX;
        this.target.y = event.$stageY + this.offsetPointY;
      }

      protected onTouchEnd(event: egret.TouchEvent): void {
        const stage = event.$currentTarget;
        stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.validatePosition();
        this.updateStoredPosition();
      }
      protected validatePosition() {
        // check position to avoid exceeding the screen
        const bound = this.target.getBounds();
        this.target.getLayoutBounds(bound);
        this.target.x = Math.max(0, Math.min(this.target.stage.stageWidth - bound.width, bound.x));
        this.target.y = Math.max(0, Math.min(this.target.stage.stageHeight - bound.height, bound.y));
      }
      protected updateStoredPosition() {
        const pos = { x: this.target.x, y: this.target.y };
        env.storedPositions[this.target.panelName] = pos;
        logger.l(utils.LogTarget.DEBUG, env.storedPositions);
        // TODO: upload to server
      }
    }
  }
}
