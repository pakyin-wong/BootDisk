namespace we {
  export namespace ui {
    export class LabelImage extends eui.Image {
      protected _text: string;
      protected _fontFamily: string;
      protected _size: number;
      protected _textColor: number = 0x000000;
      protected _bold: boolean = false;
      protected _hasShadow: boolean = false;

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

      set bold(value: boolean) {
        this._bold = value;
        this.render();
      }

      get bold() {
        return this._bold;
      }

      set size(value: number) {
        this._size = value;
        this.render();
      }

      get size() {
        return this._size;
      }

      set textColor(value: number) {
        this._textColor = value;
        this.render();
      }

      get textColor() {
        return this._textColor;
      }


      set text(value: string) {
        this._text = value;
        this.render();
      }

      get text() {
        return this._text;
      }

      set hasShadow(value: boolean) {
        this._hasShadow = value;
        this.render();
      }

      get hasShadow() {
        return this._hasShadow;
      }

      protected render() {
        const renderTexture = new egret.RenderTexture();
        const label = new eui.Label();
        label.textColor = this._textColor;
        label.bold = this._bold;
        if (this._fontFamily) {
          label.fontFamily = this._fontFamily;
        }
        if (this._size) {
          label.size = this._size;
        }
        if (this._text) {
          label.text = this._text;
        }
        if (this._hasShadow) {
          const shadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(1, 90, 0x000000, 0.5, 2, 2, 2, egret.BitmapFilterQuality.LOW);
          label.filters = [shadowFilter];
        }
        const layer = new eui.Group();
        layer.addChild(label);

        renderTexture.drawToTexture(layer);
        this.fillMode = egret.BitmapFillMode.SCALE;
        this.texture = renderTexture;
      }
    }
  }
}
