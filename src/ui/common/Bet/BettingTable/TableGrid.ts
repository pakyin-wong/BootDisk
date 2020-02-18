namespace we {
  export namespace ui {
    export namespace bt {
      export class TableGrid extends core.BaseEUI {
        protected _image: eui.Image;
        protected _textLabel: eui.Label;
        protected _text: string;
        protected _hoverRes: string;

        public constructor() {
          super('ro/BettingTable/TableGrid');
        }

        public set hoverRes(value: string) {
          this._hoverRes = value;
          if (this._image) {
            this._image.source = value;
          }
        }

        public get hoverRes() {
          return this._hoverRes;
        }

        public set text(value: string) {
          if (this._textLabel) {
            this._text = value;
          }
        }

        public get text() {
          return this._text;
        }
      }
    }
  }
}
