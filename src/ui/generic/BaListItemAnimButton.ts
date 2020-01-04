namespace we {
  export namespace ui {
    export class BaListItemAnimButton extends BaseImageButton {
      protected _label2: eui.Label;
      protected _tw1: egret.Tween;
      protected _tw2: egret.Tween;
      protected _tw3: egret.Tween;
      protected _label2text: string;

      constructor() {
        super();
        this.touchChildren = false;
      }

      protected childrenCreated() {
        super.childrenCreated();
        // console.log('RoundButton::childrenCreated ' + this.width + ' ' + this._image.width + ' ' + this._image.source);
      }

      set label2(value) {
        this._label2 = value;
      }

      get label2() {
        return this._label2;
      }

      set label2text(value: string) {
        this._label2text = value;
        if (this._label2) {
          this._label2.text = value;
        }
      }

      get label2text(): string {
        return this._label2text;
      }

      public tweenLabel(direction: boolean) {
        egret.Tween.removeTweens(this._label);
        egret.Tween.removeTweens(this._label2);
        if (direction) {
          this._tw1 = egret.Tween.get(this._label).to({ alpha: 0 }, 250);
          this._tw2 = egret.Tween.get(this._label2).to({ alpha: 1 }, 250);
          this._tw3 = egret.Tween.get(this).to({ width: 50 }, 250);
        } else {
          this._tw1 = egret.Tween.get(this._label).to({ alpha: 1 }, 250);
          this._tw2 = egret.Tween.get(this._label2).to({ alpha: 0 }, 250);
          this._tw3 = egret.Tween.get(this).to({ width: 148 }, 250);
        }
        return [this._tw1, this._tw2, this._tw3];
      }
    }
  }
}
