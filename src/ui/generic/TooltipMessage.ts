namespace we {
  export namespace ui {
    export class TooltipMessageWrapper extends eui.Group {
      private _text: string = null;

      public get tooltipText() {
        return this._text;
      }

      public set tooltipText(text) {
        this._text = text;
      }
    }
  }
}
