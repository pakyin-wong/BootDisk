namespace we {
  export namespace ui {
    export class Button extends eui.Component {
      private _image: eui.Image;
      private _resName: string;
      private _hoverResName: string;

      constructor() {
        super();
        this.skinName = utils.getSkin('ImageButton');
        this.touchChildren = false;
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.rollover, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.rollout, this);
      }

      protected rollover() {
        if (this._image.source) {
          this._image.source = this._hoverResName;
        }
      }

      protected rollout() {
        this._image.source = this._resName;
      }

      set resName(value: string) {
        this._resName = value;
        this._image.source = value;
        this.width = this._image.width;
        this.height = this._image.height;
      }

      get resName() {
        return this._resName;
      }

      set hoverResName(value: string) {
        this._hoverResName = value;
      }

      get hoverResName() {
        return this._hoverResName;
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
    }
  }
}
