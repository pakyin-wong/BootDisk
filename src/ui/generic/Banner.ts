namespace we {
  export namespace ui {
    export class Banner extends eui.Component {
      private _image: eui.Image;
      private _resName: string = 'd_lobby_quick_bet_notification_follow_normal_png';
      private _label1: eui.Label;
      private _label1text: string;

      constructor() {
        super();
        this.skinName = utils.getSkin('RoundButton');
        this.touchChildren = false;
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
    }
  }
}
