/** Over-Scene Global Controller */
namespace we {
  export namespace core {
    export class Monitor {
      private _nav: ui.Nav;
      private _navMobileSilder: ui.NavMobileSilder;
      public _mDropdown: ui.MobileDropdown;
      private _notificationController: egret.DisplayObject & ui.INotificationController;
      private _liveSidePanel: ui.LiveSidePanel;
      private _overlay: ui.Overlay;
      private _msg: ui.MsgOverlay;

      public _sideGameList: ui.MobileSideGameList;

      private _initStage: egret.Stage;
      private _gameListButton: ui.GameListButton;

      public preload() {
        this._msg = new ui.MsgOverlay();

        dir.layerCtr.msg.addChild(this._msg);

        this.addListeners();
      }

      public start(stage: egret.Stage) {
        this._initStage = stage;
        this.initStage(this._initStage);
      }

      private addListeners() {
        dir.evtHandler.addEventListener(core.Event.BALANCE_UPDATE, this.updateBalance, this);
        if (env.isMobile) {
          dir.evtHandler.addEventListener(core.Event.ORIENTATION_UPDATE, this.onOrientationChange, this);
        } else {
          dir.evtHandler.removeEventListener(core.Event.ORIENTATION_UPDATE, this.onOrientationChange, this);
        }
      }

      private onOrientationChange() {
        this.arrangeStage(this._initStage);
      }

      private initStage(stage: egret.Stage) {
        // this._nav = new ui.Nav();
        this._overlay = new ui.Overlay();

        // dir.layerCtr.nav.addChild(this._nav);

        if (env.isMobile) {
          this._sideGameList = new ui.MobileSideGameList();
          this._sideGameList.bottom = 0;
          this._sideGameList.isPoppable = true;
          this._sideGameList.dismissOnClickOutside = true;

          this._navMobileSilder = new ui.NavMobileSilder();
          this._mDropdown = new ui.MobileDropdown();

          dir.layerCtr.overlay.addChild(this._sideGameList);
          dir.layerCtr.overlay.addChild(this._navMobileSilder);
          dir.layerCtr.overlay.addChild(this._overlay);
          dir.layerCtr.overlay.addChild(this._mDropdown);

          this._notificationController = new ui.MobileNotificationController();
          this._notificationController.x = 0;
          this._notificationController.y = 0;
          dir.layerCtr.notification.addChild(this._notificationController);
        } else {
          /*
          this._liveSidePanel = new ui.LiveSidePanel();
          this._liveSidePanel.right = 20;
          this._liveSidePanel.y = 80;

          const child = this._nav.getChildByName('background');
          let idx = 2;
          if (child) {
            idx = this._nav.getChildIndex(child) + 1;
          }
          this._nav.addChildAt(this._liveSidePanel, idx);
          */
          dir.layerCtr.overlay.addChild(this._overlay);

          this._notificationController = new ui.NotificationController();
          this._notificationController.x = stage.stageWidth - 410;
          this._notificationController.y = 180;
          dir.layerCtr.notification.addChild(this._notificationController);
        }

        // this._nav.touchEnabled = false;

        if (env.mode < 0) {
          dir.evtHandler.createOverlay({
            class: 'ModeSelect',
          });
        }
      }

      private initOrientationDependentStage(stage: egret.Stage) {
        this.initStage(this._initStage);
      }

      private arrangeStage(stage) {
        logger.l('arrangeStage');
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
