namespace controller {
  export class MeterCtr {
    private _local = {};

    constructor() {}

    public updateTo(key: string, value: number) {
      this._local[key] = value;
      dir.evtHandler.dispatch(enums.event.meter.UPDATE, { key, value });
    }

    public rackTo(key: string, value: number) {}
  }
}
