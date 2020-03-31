/* tslint:disable triple-equals */
namespace we {
  export namespace ro {
    export class MobileLiveListRoadmap extends ui.Panel implements we.ui.ILobbyRoad {
      protected _roadmapControl: ro.RORoadmapControl;
      protected _roadsContainer: eui.Group;
      protected beadRoad: ro.ROBeadRoad;

      public constructor() {
        super();
        this.cacheAsBitmap = true;
      }

      public setTableInfo(tableInfo: data.TableInfo) {
        // this._roadmapControl.setTableInfo(tableInfo);
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        this._roadmapControl = new ro.RORoadmapControl();

        this.beadRoad = new ro.ROBeadRoad(3, 11, 83, 1, 19, 10, 0xc1c1c1, 0.2);
        this.beadRoad.x = 19;
        this.beadRoad.y = 2;

        const rdata: any = [];
        this.beadRoad.parseRoadData(rdata);

        this.addChild(this.beadRoad);
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
