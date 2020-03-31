/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class MobileLiveListSimpleItem extends MobileListBaseItem {
      protected _bigRoad: we.ui.ILobbyRoad;
      protected _alreadyBetSign: eui.Group;
      protected _goodRoadLabel: ui.GoodRoadLabel;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected initChildren() {
        super.initChildren();
        if (this._goodRoadLabel) {
          this._goodRoadLabel.visible = false;
        }
        if (this._alreadyBetSign) {
          this._alreadyBetSign.visible = false;
        }
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        if (this.tableInfo.totalBet > 0) {
          // this._alreadyBetSign.visible = true;
        } else {
          // this._alreadyBetSign.visible = false;
        }
      }

      protected onTableBetInfoUpdate() {
        super.onTableBetInfoUpdate();
        if (this.tableInfo.totalBet > 0) {
          this._alreadyBetSign.visible = true;
        } else {
          this._alreadyBetSign.visible = false;
        }
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (tableInfo.roadmap) {
          if (this._bigRoad) {
            this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
          }
        }
        if (this.tableInfo.goodRoad) {
          this._goodRoadLabel.visible = true;
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          // this._goodRoadLabel.text = goodRoadName;
          this._goodRoadLabel.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        } else {
          // this._goodRoadLabel.visible = false;
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

      protected onMatchGoodRoadUpdate() {
        if (this.tableInfo.goodRoad) {
          this._goodRoadLabel.visible = true;
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          // this._goodRoadLabel.text = goodRoadName;
          this._goodRoadLabel.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        } else {
          this._goodRoadLabel.visible = false;
        }
      }
    }
  }
}
