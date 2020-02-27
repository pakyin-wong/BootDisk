namespace we {
  export namespace ui {
    export class RunTimePropertyLabel extends eui.Label implements ui.IRunTimeComponent {
      private _renderer: () => {};
      private _isReg: boolean = false;

      constructor() {
        super();
      }

      protected destroy() {
        i18n.drop(this);
        this._isReg = false;
      }

      public set renderProperty(renderer: () => {}) {
        this._renderer = renderer;
        if (!this._isReg) {
          i18n.register(this);
          this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
        }
        this.render();
      }

      public get renderProperty() {
        return this._renderer;
      }

      public render() {
        if (!this._renderer) {
          return null;
        }
        const renderer = this._renderer();
        if (renderer) {
          Object.keys(renderer).map(value => {
            this[value] = renderer[value];
          });
        }
      }
    }
  }
}
