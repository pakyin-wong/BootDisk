namespace we {
  export namespace ui {
    export class RunTimeLabel extends eui.Label implements ui.IRunTimeComponent {
      private _renderer: () => string;
      private _isReg: boolean = false;

      public _textKey: string = '';

      constructor() {
        super();
        this.once(eui.UIEvent.ADDED_TO_STAGE, this.initRenderText, this);
      }

      get textKey(): string {
        return this._textKey;
      }

      set textKey(value: string) {
        this._textKey = value;
      }

      protected initRenderText() {
        if (this._textKey) {
          this.renderText = () => i18n.t(this._textKey);
        }
      }

      protected destroy() {
        i18n.drop(this);
        this._isReg = false;
        this.once(eui.UIEvent.ADDED_TO_STAGE, this.initRenderText, this);
      }

      public set i18n(value: string) {
        this._renderer = () => i18n.t(value);
        this.render();
      }

      public get i18n() {
        return this._renderer && this._renderer();
      }

      public set renderText(renderer: () => string) {
        this._renderer = renderer;
        if (!this._isReg) {
          i18n.register(this);
          this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
        }
        this.render();
      }

      public get renderText() {
        return this._renderer;
      }

      public render() {
        return this._renderer && (this.text = this._renderer());
      }
    }
  }
}
