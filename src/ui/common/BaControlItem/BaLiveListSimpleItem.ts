/* tslint:disable triple-equals */
namespace we {
  export namespace ba {
    export class BaLiveListSimpleItem extends BaListBaseItem {
      protected _bigRoad: we.ba.BALobbyBigRoad;

      public constructor(skinName: string = 'BaLiveListSimpleItemSkin') {
        super(skinName);
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
