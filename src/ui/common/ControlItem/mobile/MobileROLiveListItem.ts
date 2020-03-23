/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class MobileROLiveListItem extends MobileLiveListItem implements ILobbyRoad{

      protected _roadmapControl: ro.RORoadmapControl;

      protected beadRoad: ro.ROBeadRoad;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected initCustomPos() {
        this._buttonGroupShowY = 194;
        this._buttonGroupHideY = 230;
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        this._roadmapControl.setTableInfo(this._tableInfo);
      }

      protected initRoadMap() {
        this._roadmapControl = new ro.RORoadmapControl(this._tableId);

        this.beadRoad = new ro.ROBeadRoad(3, 11, 100, 1, 14, 14, 0xc1c1c1, 0.2);
        this.beadRoad.x = 0;
        this.beadRoad.y = 20;
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
      }

      public updateLobbyRoadData(roadmapData: data.RoadmapData) {
        this._roadmapControl.setTableInfo(this._tableInfo);
      }
    }
  }
}
