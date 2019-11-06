/** Over-Scene Global Controller */
namespace we {
  export namespace core {
    export class Monitor {
      public start(stage: egret.Stage) {
        const _nav = new ui.Nav();
        dir.layerCtr.nav.addChild(_nav);
      }
    }
  }
}
