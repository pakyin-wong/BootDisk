/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class MobileLiveListItem extends MobileLiveListSimpleItem {
      // protected _bigRoad: we.ba.BALobbyBigRoad;
      // protected _alreadyBetSign: eui.Group;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      // public setData(tableInfo: data.TableInfo) {
      //   super.setData(tableInfo);
      //   if (tableInfo.roadmap) {
      //     if (this._bigRoad) {
      //       this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
      //     }
      //   }
      // }

      // protected onRoadDataUpdate(evt: egret.Event) {
      //   super.onRoadDataUpdate(evt);
      //   if (evt && evt.data) {
      //     const tableInfo = <data.TableInfo> evt.data;
      //     if (tableInfo.tableid === this._tableId) {
      //       if (this._bigRoad) {
      //         this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
      //       }
      //     }
      //   }
      // }
    }
  }
}
