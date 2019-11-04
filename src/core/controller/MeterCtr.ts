namespace we {
  export namespace core {
    export class MeterCtr {
      private _local = {};

      constructor() {}

      public updateTo(key: string, value: number) {
        this._local[key] = value;
        dir.evtHandler.dispatch(core.Event.METER_UPDATE, { key, value });
      }

      public rackTo(key: string, value: number) {}
    }
  }
}
