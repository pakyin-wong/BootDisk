/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class MobileLiveListSimpleItem extends MobileListBaseItem {
      protected _bigRoad: we.ba.BALobbyBigRoad;
      protected _alreadyBetSign: eui.Group;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        if (this.tableInfo.totalBet > 0) {
          this._alreadyBetSign.visible = true;
        } else {
          this._alreadyBetSign.visible = false;
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
    }
  }
}
