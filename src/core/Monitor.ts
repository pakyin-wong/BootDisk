/** Over-Scene Global Controller */
namespace we {
  export namespace core {
    export class Monitor {
      private _nav: ui.Nav;
      private _navSilderMenu: ui.NavSilderMenu;
      private _notificationController: ui.NotificationController;
      private _liveSidePanel: ui.LiveSidePanel;
      private _overlay: ui.Overlay;
      private _msg: ui.MsgOverlay;

      private _sideGameList: ui.MobileSideGameList;

      public preload() {
        this._msg = new ui.MsgOverlay();

        dir.layerCtr.msg.addChild(this._msg);

        this.addListeners();
      }

      public start(stage: egret.Stage) {
        this._nav = new ui.Nav();
        this._navSilderMenu = new ui.NavSilderMenu();
        this._nav.touchEnabled = false;
        this._notificationController = new ui.NotificationController();
        this._overlay = new ui.Overlay();

        dir.layerCtr.nav.addChild(this._nav);
        dir.layerCtr.top.addChild(this._notificationController);
        dir.layerCtr.overlay.addChild(this._navSilderMenu);
        dir.layerCtr.overlay.addChild(this._overlay);

        this._notificationController.x = stage.stageWidth - 410;
        this._notificationController.y = 240;

        if (!env.isMobile) {
          this._liveSidePanel = new ui.LiveSidePanel();
          dir.layerCtr.top.addChild(this._liveSidePanel);
          this._liveSidePanel.right = 20;
          this._liveSidePanel.y = 80;
        } else {
          const gameListButton = new ui.GameListButton();
          dir.layerCtr.top.addChild(gameListButton);
          gameListButton.right = 50;
          gameListButton.y = 241;

          this._sideGameList = new ui.MobileSideGameList();
          dir.layerCtr.overlay.addChild(this._sideGameList);
          this._sideGameList.bottom = 0;
          this._sideGameList.setToggler(gameListButton);
          this._sideGameList.isPoppable = true;
          this._sideGameList.dismissOnClickOutside = true;
        }

        if (env.mode < 0) {
          dir.evtHandler.createOverlay({
            class: 'ModeSelect',
          });
        }
      }

      private addListeners() {
        dir.evtHandler.addEventListener(core.Event.BALANCE_UPDATE, this.updateBalance, this);
      }

      private updateBalance() {
        dir.meterCtr.rackTo('balance', env.balance, 0);
      }

      public dismissMobileGameList() {
        if (this._sideGameList) {
          this._sideGameList.hide();
        }
      }
    }
  }
}
