namespace we {
  export namespace ba {
    export abstract class BARoadIconBase extends egret.DisplayObjectContainer {
      protected size: number;
      protected tween: egret.Tween;
      protected value: any;
      protected darkModeNumber: number;

      public constructor(size: number) {
        super();
        this.darkModeNumber = 0;
        this.size = size;
      }

      protected abstract initGraphics();

      public abstract setByObject(value: any);

      public abstract reset();

      public animate() {
        egret.Tween.removeTweens(this);
        egret.Tween.get(this)
          .to({ alpha: 0.2 }, 300)
          .to({ alpha: 1 }, 300)
          .wait(400)
          .to({ alpha: 0.2 }, 300)
          .to({ alpha: 1 }, 300)
          .wait(400)
          .to({ alpha: 0.2 }, 300)
          .to({ alpha: 1 }, 300)
          .wait(400);
      }

      public stopAnimate() {
        egret.Tween.removeTweens(this);
      }

      public dispose() {
        this.stopAnimate();
      }

      public set DarkMode(n: number) {
        this.darkModeNumber = n;
        if (this.value) {
          this.setByObject(this.value);
        }
      }

      public get DarkMode(): number {
        return this.darkModeNumber;
      }
    }
  }
}
