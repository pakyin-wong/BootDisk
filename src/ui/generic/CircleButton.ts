namespace we {
  export namespace ui {
    export class CircleButton extends eui.Component {
      private _resName: string;
      private _hoverResName;
      private _image: eui.Image;

      constructor() {
        super();
        this.skinName = utils.getSkin('CircleButton');
      }

      set resName(value) {
        this._resName = value;
        if (value && this._image) {
          this._image.texture = RES.getRes(value);
        }
      }
      get resName() {
        // return '1'
        return this._resName;
      }
    }
  }
}
