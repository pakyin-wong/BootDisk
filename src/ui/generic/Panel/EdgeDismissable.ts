namespace we {
  export namespace ui {
    export class EdgeDismissableAddon extends DisplayObjectAddon {
      public static _isDismiss: boolean = false;
      public static dismissableList: EdgeDismissableAddon[] = [];
      private static isAnimating: boolean = false;

      public static toggle() {
        if (this.isAnimating) {
          return;
        }
        egret.log('toggle');
        this.isAnimating = true;
        if (this._isDismiss) {
          this._isDismiss = false;
          Promise.all(this.dismissableList.map(dismissable => dismissable.show())).then(() => {
            this.isAnimating = false;
          });
        } else {
          this._isDismiss = true;
          Promise.all(this.dismissableList.map(dismissable => dismissable.dismiss())).then(() => {
            this.isAnimating = false;
          });
        }
      }
      public static get isDismiss(): boolean {
        return this._isDismiss;
      }

      public static addDismissable(object: EdgeDismissableAddon) {
        const idx = this.dismissableList.indexOf(object);
        if (idx < 0) {
          this.dismissableList.push(object);
        }
      }

      public static removeDismissable(object: EdgeDismissableAddon) {
        const idx = this.dismissableList.indexOf(object);
        if (idx >= 0) {
          this.dismissableList.splice(idx, 1);
        }
      }

      protected objPos: egret.Point;

      constructor(displayObject: egret.DisplayObject) {
        super(displayObject);
      }

      public set active(value: boolean) {
        super.$setActive(value);
        if (value) {
          this.addToGlobalList();
          this.init();
        } else {
          this.removeFromGlobalList();
        }
      }

      public init() {
        this.objPos = new egret.Point(this.target.x, this.target.y);
      }

      public addToGlobalList() {
        EdgeDismissableAddon.addDismissable(this);
        this.target.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromGlobalList, this);
      }

      public removeFromGlobalList() {
        egret.log('Remove');
        EdgeDismissableAddon.removeDismissable(this);
        this.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromGlobalList, this);
      }

      public async show() {
        egret.log('Show');
        if (!this.target || !this.target.stage) {
          return Promise.resolve();
        }
        await new Promise((resolve, reject) => {
          egret.Tween.get(this.target)
            .to({ $x: this.objPos.x, $y: this.objPos.y }, 200)
            .call(resolve);
        });
        return Promise.resolve();
      }

      public async dismiss() {
        egret.log('Dismiss');
        if (!this.target || !this.target.stage) {
          return Promise.resolve();
        }
        this.objPos = new egret.Point(this.target.x, this.target.y);
        const centerPoint: egret.Point = new egret.Point(this.target.stage.stageWidth * 0.5 - this.target.width * 0.5, this.target.stage.stageHeight * 0.5 - this.target.height * 0.5);
        const dir: egret.Point = this.objPos.subtract(centerPoint);
        dir.normalize(Math.max(this.target.stage.stageWidth, this.target.stage.stageHeight));
        const destination: egret.Point = this.objPos.add(dir);

        await new Promise((resolve, reject) => {
          egret.Tween.get(this.target)
            .to({ $x: destination.x, $y: destination.y }, 200)
            .call(resolve);
        });
        return Promise.resolve();
      }
    }
  }
}
