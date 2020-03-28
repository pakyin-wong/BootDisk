/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class MobileROLiveListItem extends MobileLiveListSimpleItem implements ILobbyRoad {
      protected _roadmapControl: ro.RORoadmapControl;
      protected _roadsContainer: eui.Group;
      protected beadRoad: ro.ROBeadRoad;

      public constructor(skinName: string = null) {
        super(skinName);
        this.cacheAsBitmap = true;
      }

      protected initCustomPos() {
        this._buttonGroupShowY = 194;
        this._buttonGroupHideY = 230;
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
      }

      protected initRoadMap() {
        this.beadRoad = new ro.ROBeadRoad(3, 11, 83, 1, 19, 10, 0xc1c1c1, 0.2);
        this.beadRoad.x = 19;
        this.beadRoad.y = 2;

        this._roadsContainer.addChild(this.beadRoad);
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        this.updateRoadData(this.tableInfo.roadmap);
      }

      public updateRoadData(roadmapData: data.RoadmapData) {
        if (roadmapData) {
          if (this.beadRoad) {
            this.beadRoad.parseRoadData(roadmapData.inGame.bead);
          }
        }
      }

      public updateLobbyRoadData(roadmapData: data.RoadmapData) {
        if (roadmapData && roadmapData.inGame) {
          if (this.beadRoad) {
            this.beadRoad.parseRoadData(roadmapData.inGame.bead);
          }
        }
      }

      public updateSideBarRoadData(roadmapData: data.RoadmapData) {
        if (roadmapData && roadmapData.inGame) {
          if (this.beadRoad) {
            this.beadRoad.parseRoadData(roadmapData.inGame.bead);
          }
        }
      }
    }
  }
}
