namespace we {
  export namespace lobby {
    export class LobbyBannerItem extends core.BaseEUI {
      protected _image: eui.Image;
      protected _lblTitle: eui.Label;
      protected _lblDescription: eui.Label;

      protected _link: string = null;
      protected _tex: egret.Texture = null;
      protected _title: string = null;
      protected _description: string = null;

      public hoverScale: number = 1.1;

      public constructor() {
        super();
        this.orientationDependent = false;
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
      }

      public get image() {
        return this._image;
      }
      public get titleLabel() {
        return this._title;
      }
      public get descriptionLabel() {
        return this._description;
      }

      public get link() {
        return this._link;
      }

      public set link(urlStr: string) {
        this._link = urlStr;
      }

      public get texture() {
        return this._tex;
      }

      public set texture(val: egret.Texture) {
        this._tex = val;
        if (this._image) {
          this._image.source = val;
        }
      }

      public get title() {
        return this._title;
      }

      public set title(val: string) {
        this._title = val;
        if (this._lblTitle) {
          this._lblTitle.text = val;
        }
      }

      public get description() {
        return this._description;
      }

      public set description(val: string) {
        this._description = val;
        if (this._lblDescription) {
          this._lblDescription.text = val;
        }
      }

      public initComponents() {
        super.initComponents();

        if (this._image && this._tex) {
          this._image.source = this._tex;
        }
        if (this._lblTitle && this._title) {
          this._lblTitle.text = this._title;
        }
        if (this._lblDescription && this._description) {
          this._lblDescription.text = this._description;
        }
        // add touch action
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        this._image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
      }

      protected onRollOver(e: mouse.MouseEvent) {
        this.scaleUp(true);
      }
      protected onRollOut(e: mouse.MouseEvent) {
        this.scaleUp(false);
      }

      protected onTap(e: egret.TouchEvent) {
        if (this._link) {
          utils.linkTo(this._link);
        }
      }

      protected scaleUp(isScaleUp: boolean) {
        egret.Tween.removeTweens(this._image);
        const scale = isScaleUp ? this.hoverScale : 1;
        egret.Tween.get(this._image).to({ scaleX: scale, scaleY: scale }, 300);
      }
    }
  }
}
