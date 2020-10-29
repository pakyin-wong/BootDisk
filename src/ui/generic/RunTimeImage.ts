namespace we {
  export namespace ui {
    export class RunTimeImage extends eui.Image implements ui.IRunTimeComponent {
      private _renderer: () => string;
      private _isReg: boolean = false;

      public _imageKey: string = '';

      constructor() {
        super();
        this.once(eui.UIEvent.ADDED_TO_STAGE, this.initRenderText, this);
      }

      get imageKey(): string {
        return this._imageKey;
      }

      set imageKey(value: string) {
        this._imageKey = value;
      }

      protected initRenderText() {
        if (!this._isReg && this._renderer) {
          i18n.register(this);
          this._isReg = true;
          this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
          this.render();
        } else if (this._imageKey) {
          this.renderImage = () => i18n.t(this._imageKey);
        }
      }

      protected destroy() {
        if (this._isReg) {
          i18n.drop(this);
          this._isReg = false;
        }
        this.once(eui.UIEvent.ADDED_TO_STAGE, this.initRenderText, this);
      }

      public set i18n(value: string) {
        this.renderImage = () => i18n.t(value);
      }

      public get i18n() {
        return this._renderer && this._renderer();
      }

      public set renderImage(renderer: () => string) {
        this._renderer = renderer;
        if (!this._isReg && this.$hasAddToStage) {
          i18n.register(this);
          this._isReg = true;
          this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
        }
        this.render();
      }

      public get renderImage() {
        return this._renderer;
      }

      public render() {
        return this._renderer && (this.source = this._renderer());
      }
    }
  }
}
