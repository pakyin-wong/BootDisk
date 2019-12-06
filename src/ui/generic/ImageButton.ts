namespace we {
  export namespace ui {
    export class ImageButton extends eui.Component {
      private _image: eui.Image;
      private _resName: string;
      private _hoverResName: string;

      constructor() {
        super();
        this.skinName = utils.getSkin('ImageButton');
        this.touchChildren = false;
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.rollover, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.rollout, this);
        mouse.setButtonMode(this, true);
      }

      private rollover() {
        if (this._hoverResName) {
          this._image.source = this._hoverResName;
        }
      }

      private rollout() {
        this._image.source = this._resName;
      }

      set resName(value: string) {
        this._resName = value;
        this._image.source = value;
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
    }
  }
}
