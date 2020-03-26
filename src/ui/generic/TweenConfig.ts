namespace we {
  export namespace ui {
    export class TweenConfig extends eui.Component {
      public checker: egret.DisplayObject;

      // public constructor() {
      //   super();
      //   this.touchEnabled = false;
      //   this.touchChildren = false;
      // }

      public getTweenPackage() {
        return {
          x: this.checker.x,
          y: this.checker.y,
          scaleX: this.checker.scaleX,
          scaleY: this.checker.scaleY,
          alpha: this.checker.alpha,
          width: this.checker.width,
          height: this.checker.height,
        };
      }
    }
  }
}
