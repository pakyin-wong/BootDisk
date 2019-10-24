namespace controller {
  export class MeterCtr {
    private _local = {};

    constructor() {}

    updateMeter(key:string, value:number) {
      this._local[key] = value;
      dir.evtHandler.dispatch()
    }
  }
}
