namespace we {
  export namespace core {
    export class VersionController implements RES.VersionController {
      private _version: string;
      public constructor() {
        // this._version = "?v=" + window["app_version"];
        // this._version = '?v=' + env.version;
      }
      public async init() {
        this._version = '?v=' + env.version;
      }

      public getVirtualUrl(url): any {
        return url + this._version;
      }
    }
  }
}
