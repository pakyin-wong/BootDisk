namespace we {
  export namespace ui {
    export class ImageButton extends BaseButton {
      protected _image: eui.Image;
      protected _hoverImage: eui.Image;
      protected _resName: string;
      protected _hoverResName: string;

      constructor() {
        super('ImageButton');
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
        this._hoverResName = value;
        if (this._hoverImage) {
          this._hoverImage.source = value;
        }
      }

      get hoverResName() {
        return this._hoverResName;
      }
    }
  }
}
