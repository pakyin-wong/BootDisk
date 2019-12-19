namespace we {
  export namespace ba {
    export class BaSideListItem extends BaLiveListSimpleItem {
      protected _bigRoad: we.ba.BetInfoBigRoad;
      protected _quickbetButton: ui.RoundButton;
      protected _quickbetEnable: boolean = false;
      protected _quickBetGroup: eui.Group;
      protected _goodRoadLabel: ui.GoodRoadLabel;

      protected _tweenInterval1: number = 250;

      // protected _originalyhover: number;
      protected _originaly: number;
      protected _originalQuickBetButtonY: number;
      protected _targetQuickBetButtonY: number;
      protected _originalQuickBetPanelY: number;
      protected _targetQuickbetPanelY: number;
      protected _offsetY: number;
      protected _offsetLimit: number;
      protected _offsetMovement: number;

      public constructor(skinName: string = 'BaSideListItemSkin') {
        super(skinName);
      }

      protected initCustomPos() {
        this._targetQuickBetButtonY = 250;
        this._originalQuickBetButtonY = 137;
        this._targetQuickbetPanelY = 251;
        this._originalQuickBetPanelY = 0;
        this._offsetLimit = 10000;
        this._offsetMovement = 0;
        this._hoverScale = 1;
      }

      protected initChildren() {
        super.initChildren();
        this._betChipSet.setVisibleDenominationCount(1);
        this._betChipSet.setLast();
        this._goodRoadLabel.visible = false;
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (this.tableInfo.goodRoad) {
          this._goodRoadLabel.visible = true;
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          this._goodRoadLabel.text = goodRoadName;
        } else {
          this._goodRoadLabel.visible = false;
        }
      }
    }
  }
}
