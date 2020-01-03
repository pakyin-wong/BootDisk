/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class GoodRoadQuickBetContainer extends ba.BaControlItem {
      protected _quickbetButton: ui.RoundButton;
      protected _bigRoad: we.ba.BALobbyBigRoad;
      protected _denomLayer: eui.Component;
      protected _alreadyBetSign: eui.Group;

      public constructor(skinName: string = 'GoodRoadQuickBetContainerSkin') {
        super(skinName);
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        if (this._bettingTable.isAlreadyBet()) {
          this._alreadyBetSign.visible = true;
        } else {
          this._alreadyBetSign.visible = false;
        }
      }

      protected onTableBetInfoUpdate() {
        super.onTableBetInfoUpdate();
        if (this._bettingTable.isAlreadyBet()) {
          this._alreadyBetSign.visible = true;
        } else {
          this._alreadyBetSign.visible = false;
        }
      }

      protected addEventListeners() {
        super.addEventListeners();
      }

      protected removeEventListeners() {
        super.removeEventListeners();
      }

      public getActionButton(): eui.Component {
        return this._quickbetButton;
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (tableInfo.roadmap) {
          if (this._bigRoad) {
            this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
          }
        }
      }

      protected setBetRelatedComponentsEnabled(enable) {
        super.setBetRelatedComponentsEnabled(enable);
        if (!this._mouseOutside && enable) {
          this._quickbetButton.tweenLabel(false, false);
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo> evt.data;
          if (tableInfo.tableid === this._tableId) {
            if (this._bigRoad) {
              this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
            }
          }
        }
      }

      protected initChildren() {
        super.initChildren();
        if (this._bettingTable && this._bettingTable.denomLayer) {
          this._denomLayer = this._bettingTable.denomLayer;
          this._denomLayer.y = this._bettingTable.y;
          this._denomLayer.x = this._bettingTable.x;
          this._denomLayer.alpha = 0;
          this.addChild(this._denomLayer);
          this.setChildIndex(this._denomLayer, 30000);
        }
      }

      protected onBetDetailUpdateInBetState() {
        super.onBetDetailUpdateInBetState();
        if (this.hasBet()) {
          this.removeSelf();
        }
      }

      protected removeSelf() {
        this.dispatchEvent(new egret.Event('DISMISS'));
      }
    }
  }
}
