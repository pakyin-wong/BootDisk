namespace we {
  export namespace ui {
    export class RoundButton extends OldImageButton {
      private _label1: eui.Label;
      private _label2: eui.Label;
      private _tw1: egret.Tween;
      private _tw2: egret.Tween;
      private _tw3: egret.Tween;
      private _tw4: egret.Tween;
      private _label1text: string;
      private _label2text: string;

      constructor() {
        super('RoundButton');
        this.touchChildren = false;
      }

      set width(value: number) {
        this.$setWidth(value);
        if (this._image) {
          this._image.width = value;
        }
      }

      get width() {
        return this.$getWidth();
      }

      set height(value: number) {
        this.$setHeight(value);
        if (this._image) {
          this._image.height = value;
        }
      }

      get height() {
        return this.$getHeight();
      }

      set label1(value) {
        this._label1 = value;
      }

      get label1() {
        return this._label1;
      }

      set label1text(value: string) {
        this._label1text = value;
        if (this._label1) {
          this._label1.text = value;
        }
      }
      get label1text(): string {
        return this._label1text;
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

      set scale9Grid(value) {
        const v = value.split(',');
        if (this._image) {
          this._image.fillMode = egret.BitmapFillMode.SCALE;
          this._image.scale9Grid = new egret.Rectangle(+v[0], +v[1], +v[2], +v[3]);
        }
        if (this._hoverImage) {
          this._hoverImage.fillMode = egret.BitmapFillMode.SCALE;
          this._hoverImage.scale9Grid = new egret.Rectangle(+v[0], +v[1], +v[2], +v[3]);
        }
      }

      get scale9Grid() {
        if (this._image && this._image.scale9Grid) {
          return this._image.scale9Grid.toString();
        } else {
          return null;
        }
      }

      public tweenLabel(direction: boolean) {
        egret.Tween.removeTweens(this._label1);
        egret.Tween.removeTweens(this._label2);
        if (direction) {
          this._tw1 = egret.Tween.get(this._label1).to({ alpha: 0 }, 250);
          this._tw2 = egret.Tween.get(this._label2).to({ alpha: 1 }, 250);
          this._tw3 = egret.Tween.get(this._image).to({ width: 50 }, 250);
        } else {
          this._tw1 = egret.Tween.get(this._label1).to({ alpha: 1 }, 250);
          this._tw2 = egret.Tween.get(this._label2).to({ alpha: 0 }, 250);
          this._tw3 = egret.Tween.get(this._image).to({ width: 148 }, 250);
        }
        return [this._tw1, this._tw2, this._tw3];
      }
    }
  }
}
