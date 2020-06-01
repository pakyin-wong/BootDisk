namespace we {
  export namespace ui {
    export class GoodRoadNotificationContent extends ui.ControlItem {
      protected _label: RunTimeLabel;
      protected _lblGoodRoad: RunTimeLabel;
      protected _timer: ui.CountdownTimer;

      protected _btnQuickBet: BaseImageButton;
      protected _btnDismiss: BaseImageButton;
      protected _touchArea: eui.Component;
      protected _touchArea2: eui.Group;

      constructor() {
        super();
        this.skinName = utils.getSkinByClassname('GoodRoadNotificationContainerSkin');
        if (env.isMobile) {
          this._touchArea2.touchEnabled = true;
          this._touchArea2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterRoom, this);
          this._btnQuickBet.label.renderText = () => i18n.t('mobile_notification_quick_bet_button_label_real_mobile');
        } else {
          this._btnDismiss.label.renderText = () => i18n.t('mobile_notification_close_button_label');
          this._btnQuickBet.label.renderText = () => i18n.t('mobile_notification_quick_bet_button_label');
          this._touchArea.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterRoom, this);
        }
        this._btnDismiss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
        this._btnQuickBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quickBet, this);
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        const gameType = tableInfo.gametype;
        const tableNo = tableInfo.tablename;
        this._label.renderText = () => `${i18n.t('gametype_' + we.core.GameType[gameType])} ${tableNo}`;
        if (this.tableInfo.goodRoad) {
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          this._lblGoodRoad.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        }
        // if (this._timer) {
        //   this._timer.countdownValue = 10 * 1000;
        //   this._timer.remainingTime = 10 * 1000;
        //   this._timer.visible = true;
        //   this._timer.start();
        //   console.log('this._timer exist');
        // }
      }

      protected onMatchGoodRoadUpdate() {
        if (this.tableInfo.goodRoad) {
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          this._lblGoodRoad.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        } else {
          this.removeSelf();
        }
      }

      protected setStateDeal(isInit: boolean = false) {
        super.setStateDeal(isInit);
        this.removeSelf();
      }

      protected removeSelf() {
        this.dispatchEvent(new egret.Event('DISMISS'));
      }

      protected quickBet() {
        this.dispatchEvent(new egret.Event('QUICK_BET'));
      }

      protected enterRoom() {
        switch (this.tableInfo.gametype) {
          case 0:
          case 1:
          case 2:
            dir.sceneCtr.goto('ba', { tableid: this.tableId }); // BA
            break;
          case 5:
            dir.sceneCtr.goto('dt', { tableid: this.tableId }); // DT
            break;
          case 16:
            dir.sceneCtr.goto('lw', { tableid: this.tableId }); // LW
            break;
          case 14:
            dir.sceneCtr.goto('ro', { tableid: this.tableId }); // RO
            break;
          case 12:
            dir.sceneCtr.goto('di', { tableid: this.tableId }); // DI
            break;
          default:
            console.log('not yet done');
            break;
        }
        // dir.sceneCtr.goto('ba', { tableid: this.tableId });
        this.removeSelf();
      }
    }
  }
}
