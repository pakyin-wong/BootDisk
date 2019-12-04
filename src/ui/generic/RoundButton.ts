namespace we {
  export namespace ui {
    export class RoundButton extends eui.Component {
      private _image: eui.Image;
      private _resName: string = 'd_lobby_quick_bet_notification_follow_none_png';
      private _hoverResName: string = 'd_lobby_quick_bet_notification_follow_hover_png';
      private _label1: eui.Label;
      private _label2: eui.Label;
      private _tw1: egret.Tween;
      private _tw2: egret.Tween;
      private _tw3: egret.Tween;
      private _label1text: string;
      private _label2text: string;

      constructor() {
        super();
        this.skinName = utils.getSkin('RoundButton');
        this.touchChildren = false;
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.rollover, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.rollout, this);
      }

      private rollover() {
        this._image.texture = RES.getRes(this._hoverResName);
      }

      private rollout() {
        this._image.texture = RES.getRes(this._resName);
      }

      public setSize(height, width) {
        this.height = height;
        this.width = width;
      }

      set resName(value: string) {
        this._resName = value;
        this._image.texture = RES.getRes(value);
      }

      get resName() {
        return this._resName;
      }

      set width(value) {
        this.$setWidth(value);
        if (this._image) {
          this._image.width = +value;
        }
      }

      get width() {
        return this.$getWidth();
      }

      set height(value) {
        this.$setHeight(value);
        if (this._image) {
          this._image.height = +value;
        }
      }

      get height() {
        return this.$getHeight();
      }

      set scale9Grid(value) {
        const v = value.split(',');
        if (this._image) {
          this._image.fillMode = egret.BitmapFillMode.SCALE;
          this._image.scale9Grid = new egret.Rectangle(+v[0], +v[1], +v[2], +v[3]);
        }
      }

      get scale9Grid() {
        if (this._image) {
          return this._image.scale9Grid.toString();
        } else {
          return null;
        }
      }

      set hoverResName(value: string) {
        this._hoverResName = value;
      }

      get hoverResName() {
        return this._hoverResName;
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
