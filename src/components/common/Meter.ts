namespace components {
  export class Meter extends eui.Label {
    private _r: () => string;

    public set computed(r: () => string) {
      this.rmv();
      if (r) {
        this._r = r;
        dir.evtHandler.addEventListener(enums.i18n.event.SWITCH_LANGUAGE, this._r, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.rmv, this);
        this.text = this._r.call(this);
      }
    }

    private rmv() {
      if (this._r) {
        dir.evtHandler.removeEventListener(enums.i18n.event.SWITCH_LANGUAGE, this._r, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.rmv, this);
        this._r = null;
      }
    }
  }
}
