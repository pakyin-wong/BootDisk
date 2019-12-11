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

        const notificationController = new ui.NotificationController();
        notificationController.x = stage.stageWidth - 410;
        notificationController.y = 240;
        dir.layerCtr.overlay.addChild(notificationController);

        const liveSidePanel = new ui.LiveSidePanel();
        liveSidePanel.x = 2050;
        liveSidePanel.y = 120;
        dir.layerCtr.overlay.addChild(liveSidePanel);

        this.addListeners();
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
