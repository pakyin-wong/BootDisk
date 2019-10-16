namespace components {
  export class TextField extends eui.Label {
    private _r: () => string;

    public set computed(r: () => string) {
      if (this._r) {
        dir.evtHandler.removeEventListener(enums.i18n.event.SWITCH_LANGUAGE, this._r, this);
      }
      if (r) {
        this._r = r;
        dir.evtHandler.addEventListener(enums.i18n.event.SWITCH_LANGUAGE, this._r, this);
      }
      this.text = this._r.call(this);
    }
  }
}
