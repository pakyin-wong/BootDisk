/** Over-Scene Global Controller */
namespace we {
  export namespace core {
    export class Monitor {
      private _nav: ui.Nav;
      private _betsummary: ui.BetSummary;
      private _overlay: ui.Overlay;

      public start(stage: egret.Stage) {
        this._nav = new ui.Nav();
        this._betsummary = new ui.BetSummary();
        this._overlay = new ui.Overlay();

        dir.layerCtr.nav.addChild(this._nav);
        dir.layerCtr.top.addChild(this._betsummary);
        dir.layerCtr.overlay.addChild(this._overlay);
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
