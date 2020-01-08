namespace we {
  export namespace ui {
    export class LabelImage extends eui.Image {
      protected _text: string;
      protected _fontFamily: string;
      protected _size: number;
      public constructor() {
        super();
      }

      set fontFamily(value: string) {
        this._fontFamily = value;
        this.render();
      }

      get fontFamily() {
        return this._fontFamily;
      }

      set size(value: number) {
        this._size = value;
        this.render();
      }

      get size() {
        return this._size;
      }

      set text(value: string) {
        this._text = value;
        this.render();
      }

      get text() {
        return this._text;
      }

      protected render() {
        const renderTexture = new egret.RenderTexture();
        const label = new eui.Label();
        if (this._text) {
          label.text = this._text;
        }
        if (this._fontFamily) {
          label.fontFamily = this._fontFamily;
        }
        if (this._size) {
          label.size = this._size;
        }
        renderTexture.drawToTexture(label);
        this.fillMode = egret.BitmapFillMode.SCALE;
        this.texture = renderTexture;
      }
    }
  }
}
