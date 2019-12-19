namespace we {
  export namespace ui {
    export class RunTimeLabel extends eui.Label {
      private _r: () => string;
      private _isReg: boolean = false;

      constructor() {
        super();
      }

      protected destroy() {
        i18n.drop(this);
        this._isReg = false;
      }

      public set renderText(r: () => string) {
        this._r = r;
        if (!this._isReg) {
          i18n.register(this);
          this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
        }
        this.render();
      }

      public get renderText() {
        return this._r;
      }

      public render() {
        return this._r && (this.text = this._r());
      }
    }
  }
}
