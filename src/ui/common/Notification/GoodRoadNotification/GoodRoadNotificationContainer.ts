namespace we {
  export namespace ui {
    export class GoodRoadNotificationContainer extends ui.ControlItem {
      protected _label: RunTimeLabel;
      protected _lblGoodRoad: RunTimeLabel;
      protected _timer: CountdownTimer;

      protected _btnQuickBet: BaseImageButton;
      protected _btnDismiss: BaseImageButton;

      constructor() {
        super();
        this.skinName = utils.getSkinByClassname('GoodRoadNotificationContainerSkin');
        this._btnDismiss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
        this._btnQuickBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quickBet, this);
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
    }
  }
}
