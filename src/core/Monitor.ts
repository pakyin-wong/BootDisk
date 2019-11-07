/** Over-Scene Global Controller */
namespace we {
  export namespace core {
    export class Monitor {
      public start(stage: egret.Stage) {
        const _nav = new ui.Nav();
        const _betsummary = new we.ui.BetSummary();
        dir.layerCtr.nav.addChild(_nav);
        dir.layerCtr.betinfolist.addChild(_betsummary);
      }
    }
  }
}
