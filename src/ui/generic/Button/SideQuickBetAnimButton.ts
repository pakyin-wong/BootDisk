namespace we {
  export namespace ui {
    export class SideQuickBetAnimButton extends BaseButton implements IQuickBetAnimButton {
      protected _image: eui.Image;
      protected _hoverImage: eui.Image;
      protected _resName: string;
      protected _hoverResName: string;
      private _label1: eui.Label;
      private _label2: eui.Label;
      private _tw1: egret.Tween;
      private _tw2: egret.Tween;
      private _label1text: string;
      private _label2text: string;
      private _originalWidth: number;

      constructor(skin: string = 'QuickBetAnimButton') {
        super(skin);
        this.touchChildren = false;
      }

      set resName(value: string) {
        this._resName = value;
        if (this._image) {
          this._image.source = value;
        }
      }

      get resName() {
        return this._resName;
      }

      set hoverResName(value: string) {
        this._hoverResName = this._resName;
        if (value) {
          this._hoverResName = value;
        }
        if (this._hoverImage) {
          this._hoverImage.source = value;
        }
      }

      get hoverResName() {
        return this._hoverResName;
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

      public tween(direction: boolean, isAnimate: boolean = true) {
        egret.Tween.removeTweens(this._label1);
        egret.Tween.removeTweens(this._image);

        if (isAnimate) {
          if (direction) {
            this._tw1 = egret.Tween.get(this._label1)
              .to({ alpha: 0 }, 250)
              .set({ visible: false });
            this._tw2 = egret.Tween.get(this._image)
              .to({ width: 0 }, 250)
              .set({ visible: false });
          } else {
            this._tw1 = egret.Tween.get(this._label1)
              .set({ visible: true })
              .to({ alpha: 1 }, 250);
            this._tw2 = egret.Tween.get(this._image)
              .set({ visible: true })
              .to({ width: 148 }, 250);
          }
          return [this._tw1, this._tw2];
        } else {
          if (direction) {
            this._label1.alpha = 0;
            this._label1.visible = false;
            this._image.width = 0;
            this._image.visible = false;
          } else {
            this._label1.alpha = 1;
            this._label1.visible = true;
            this._image.width = 148;
            this._label1.visible = true;
          }
        }
      }
    }
  }
}
