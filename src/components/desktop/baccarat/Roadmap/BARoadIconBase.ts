namespace baccarat {
  export abstract class BARoadIconBase extends egret.DisplayObjectContainer {
    protected lang: string = 'en';
    protected size: number;
    protected tween: egret.Tween;

    public constructor(size: number) {
      super();
      this.size = size;
    }

    public setLang(lang: string) {
      this.lang = lang;
    }

    protected abstract initGraphics();

    public abstract setByObject(value: any);

    public abstract reset();

    public animate() {
      this.tween = egret.Tween.get(this);
      this.tween
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

    public dispose() {
      if (this.tween) {
        egret.Tween.removeTweens(this.tween);
      }
    }
  }
}
