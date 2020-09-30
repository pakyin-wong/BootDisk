namespace we {
  export namespace ui {
    export class EdgeDismissableAddon extends DisplayObjectAddon {
      public static _isDismiss: boolean = false;
      public static dismissableList: EdgeDismissableAddon[] = [];
      // private static isAnimating: boolean = false;

      protected target: eui.Component & IDismissable;

      protected cancelAnim: any;

      public static toggle() {
        this.dismissableList.map(dismissable => {
          // console.log(dismissable.cancelAnim);
          dismissable.cancelAnim && dismissable.cancelAnim();
        });

        logger.l(utils.LogTarget.DEBUG, 'toggle');
        if (this._isDismiss) {
          this._isDismiss = false;
          this.dismissableList.map(dismissable => dismissable.show());
        } else {
          this._isDismiss = true;
          this.dismissableList.map(dismissable => dismissable.dismiss());
        }
      }

      public static get isDismiss(): boolean {
        return this._isDismiss;
      }

      public static set isDismiss(val) {
        if (val && !this._isDismiss) {
          // need to hide immediately
          this.dismissableList.map(dismissable => {
            dismissable.cancelAnim && dismissable.cancelAnim();
            dismissable.dismiss(true);
          });
        } else if (!val && this._isDismiss) {
          // need to show immediately
          this.dismissableList.map(dismissable => {
            dismissable.cancelAnim && dismissable.cancelAnim();
            dismissable.show(true);
          });
        }
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

      public objPosX: number;
      public objPosY: number;

      constructor(displayObject: egret.DisplayObject) {
        super(displayObject);
      }

      // public set active(value: boolean) {
      //   super.$setActive(value);
      // }

      public init() {
        super.init();
        this.addToGlobalList();
        this.objPosX = this.target.x;
        this.objPosY = this.target.y;
        this.cancelAnim = null;
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

      public async show(skipAnim: boolean = false) {
        let isSkip = false;
        logger.l(utils.LogTarget.DEBUG, 'Show');
        if (!this.target || !this.target.stage) {
          return Promise.resolve();
        }
        if (skipAnim) {
          if (isNaN(this.target.dismissPosX) || isNaN(this.target.dismissPosX)) {
            this.target.dismissVisible = true;
            this.target.dismissAlpha = 1;
          } else {
            this.target.$x = this.objPosX;
            this.target.$y = this.objPosY;
          }
        } else {
          if (isNaN(this.target.dismissPosX) || isNaN(this.target.dismissPosX)) {
            // change alpha instead of position
            this.target.dismissVisible = true;
            await new Promise((resolve, reject) => {
              egret.Tween.get(this.target)
                .to({ dismissAlpha: 1 }, 300)
                .call(resolve);
              this.cancelAnim = () => {
                egret.Tween.removeTweens(this.target);
                this.cancelAnim = null;
                isSkip = true;
                resolve();
              };
            });
          } else {
            await new Promise((resolve, reject) => {
              egret.Tween.get(this.target)
                .to({ $x: this.objPosX, $y: this.objPosY }, 300)
                .call(resolve);
              this.cancelAnim = () => {
                egret.Tween.removeTweens(this.target);
                // this.target.x = this.objPos.x;
                // this.target.y = this.objPos.y;
                this.cancelAnim = null;
                isSkip = true;
                resolve();
              };
            });
          }
        }
        if (!isSkip) {
          this.cancelAnim = null;
        }

        return Promise.resolve();
      }

      public async dismiss(skipAnim: boolean = false) {
        let isSkip = false;
        logger.l(utils.LogTarget.DEBUG, 'Dismiss');
        if (!this.target || !this.target.stage) {
          return Promise.resolve();
        }
        // this.objPos = new egret.Point(this.target.x, this.target.y);
        if (skipAnim) {
          if (isNaN(this.target.dismissPosX) || isNaN(this.target.dismissPosX)) {
            this.target.dismissAlpha = 0;
            this.target.dismissVisible = false;
          } else {
            this.target.$x = this.target.dismissPosX;
            this.target.$y = this.target.dismissPosY;
          }
        } else {
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
              this.cancelAnim = () => {
                egret.Tween.removeTweens(this.target);
                this.cancelAnim = null;
                isSkip = true;
                resolve();
              };
            });
          } else {
            let destination: egret.Point;
            destination = new egret.Point(this.target.dismissPosX, this.target.dismissPosY);
            await new Promise((resolve, reject) => {
              egret.Tween.get(this.target)
                .to({ $x: destination.x, $y: destination.y }, 300)
                .call(resolve);
              this.cancelAnim = () => {
                egret.Tween.removeTweens(this.target);
                this.cancelAnim = null;
                isSkip = true;
                resolve();
              };
            });
          }
        }
        if (!isSkip) {
          this.cancelAnim = null;
        }
        return Promise.resolve();
      }
    }
  }
}
