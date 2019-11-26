/** Over-Scene Global Controller */
namespace we {
  export namespace core {
    export class Monitor {
      public start(stage: egret.Stage) {
        const _nav = new ui.Nav();
        dir.layerCtr.nav.addChild(_nav);

        const _betsummary = new we.ui.BetSummary();
        dir.layerCtr.nav.addChild(_betsummary);
      }

      private addListeners() {
        dir.evtHandler.addEventListener(core.Event.BALANCE_UPDATE, this.updateBalance, this);
      }

      private updateBalance() {
        dir.meterCtr.rackTo('balance', env.balance, 0);
      }
    }
  }
}
