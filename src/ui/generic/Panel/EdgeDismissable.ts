namespace we {
  export namespace ui {
    export class EdgeDismissableAddon extends DisplayObjectAddon {
      public static _isDismiss: boolean = false;
      public static dismissableList: EdgeDismissableAddon[] = [];
      private static isAnimating: boolean = false;

      protected target: eui.Component & IDismissable;

      public static toggle() {
        if (this.isAnimating) {
          return;
        }
        logger.l(utils.LogTarget.DEBUG, 'toggle');
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

      public static set isDismiss(val) {
        this._isDismiss = val;
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

      // public set active(value: boolean) {
      //   super.$setActive(value);
      // }

      public init() {
        super.init();
        this.addToGlobalList();
        this.objPos = new egret.Point(this.target.x, this.target.y);
      }

      public deactivate() {
        super.deactivate();
        this.removeFromGlobalList();
      }

      public addToGlobalList() {
        EdgeDismissableAddon.addDismissable(this);
        this.target.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromGlobalList, this);
      }

      public removeFromGlobalList() {
        // logger.l(utils.LoggerTarget.DEBUG, 'Remove');
        EdgeDismissableAddon.removeDismissable(this);
        this.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromGlobalList, this);
      }

      public async show() {
        logger.l(utils.LogTarget.DEBUG, 'Show');
        if (!this.target || !this.target.stage) {
          return Promise.resolve();
        }
        if (isNaN(this.target.dismissPosX) || isNaN(this.target.dismissPosX)) {
          // change alpha instead of position
          this.target.dismissVisible = true;
          await new Promise((resolve, reject) => {
            egret.Tween.get(this.target).to({ dismissAlpha: 1 }, 300).call(resolve);
          });
        } else {
          await new Promise((resolve, reject) => {
            egret.Tween.get(this.target).to({ $x: this.objPos.x, $y: this.objPos.y }, 300).call(resolve);
          });
        }

        return Promise.resolve();
      }

      public async dismiss() {
        logger.l(utils.LogTarget.DEBUG, 'Dismiss');
        if (!this.target || !this.target.stage) {
          return Promise.resolve();
        }
        this.objPos = new egret.Point(this.target.x, this.target.y);
        let destination: egret.Point;
        if (isNaN(this.target.dismissPosX) || isNaN(this.target.dismissPosX)) {
          // const centerPoint: egret.Point = new egret.Point(this.target.stage.stageWidth * 0.5 - this.target.width * 0.5, this.target.stage.stageHeight * 0.5 - this.target.height * 0.5);
          // const dir: egret.Point = this.objPos.subtract(centerPoint);
          // dir.normalize(Math.max(this.target.stage.stageWidth, this.target.stage.stageHeight));
          // destination = this.objPos.add(dir);
          await new Promise((resolve, reject) => {
            egret.Tween.get(this.target)
              .to({ dismissAlpha: 0 }, 300)
              .call(() => {
                this.target.dismissVisible = false;
                resolve();
              });
          });
        } else {
          destination = new egret.Point(this.target.dismissPosX, this.target.dismissPosY);
          await new Promise((resolve, reject) => {
            egret.Tween.get(this.target).to({ $x: destination.x, $y: destination.y }, 300).call(resolve);
          });
        }

        return Promise.resolve();
      }
    }
  }
}
