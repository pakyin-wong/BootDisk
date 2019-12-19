namespace we {
  export namespace ui {
    export class RunTimeLabel extends eui.Label {
      private _r: () => string;

      constructor() {
        super();
        i18n.register(this);
        this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
      }

      protected destroy() {
        i18n.drop(this);
      }

      public set renderText(r: () => string) {
        this._r = r;
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
