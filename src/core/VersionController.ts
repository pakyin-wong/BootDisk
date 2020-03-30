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
        // Do not add on data: or blob: schemes or break the loading
        if (url.indexOf('data:') === 0 || url.indexOf('blob:') === 0) {
          return url;
        }

        return url + this._version;
      }
    }
  }
}
