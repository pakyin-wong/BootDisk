namespace we {
  export namespace ui {
    export class TextField extends eui.Label {
      private _r: () => string;

      public set computed(r: () => string) {
        this.rmv();
        if (r) {
          this._r = r;
          dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this._r, this);
          this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.rmv, this);
          this.text = this._r.call(this);
        }
      }

      private rmv() {
        if (this._r) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this._r, this);
          this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.rmv, this);
          this._r = null;
        }
      }
    }
  }
}
