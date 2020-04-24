namespace we {
  export namespace ui {
    export class GoodRoadNotificationContent extends ui.ControlItem {
      protected _label: RunTimeLabel;
      protected _lblGoodRoad: RunTimeLabel;
      protected _timer: CountdownTimer;

      protected _btnQuickBet: BaseImageButton;
      protected _btnDismiss: BaseImageButton;
      protected _touchArea: eui.Component;

      constructor() {
        super();
        this.skinName = utils.getSkinByClassname('GoodRoadNotificationContainerSkin');
        if (env.isMobile) {
          this._btnQuickBet.label.renderText = () => i18n.t('mobile_notification_quick_bet_button_label_real_mobile');
        } else {
          this._btnDismiss.label.renderText = () => i18n.t('mobile_notification_close_button_label');
          this._btnQuickBet.label.renderText = () => i18n.t('mobile_notification_quick_bet_button_label');
        }
        this._btnDismiss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
        this._btnQuickBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quickBet, this);
        this._touchArea.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterRoom, this);
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (this.tableInfo.goodRoad) {
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          this._lblGoodRoad.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        }
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
        dir.sceneCtr.goto('ba', { tableid: this.tableId });
        this.removeSelf();
      }
    }
  }
}
