/* tslint:disable triple-equals */
namespace we {
  export namespace lw {
    export class MobileBottomRoadmapPanel extends core.BaseGamePanel {
      public beadRoad: LwBeadRoad;

      public constructor() {
        super();
      }

      public setTableInfo(tableInfo: data.TableInfo) {
        this.setTableInfo(tableInfo);
      }

      protected childrenCreated() {
        super.childrenCreated();
        // this.init();
      }

      protected init() {
        if (env.orientation === 'portrait') {
          this.beadRoad = new LwBeadRoad(4, 11, 112, 122, 72, 72, 1, 0x000000, 0.85, 0x3a3f48, true); // in game
          this.beadRoad.x = 0;
          this.beadRoad.y = 0;
        } else {
          this.beadRoad = new LwBeadRoad(3, 11, 96, 105, 58, 58, 1, 0x000000, 0.85, 0x3a3f48, true); // in game
          this.beadRoad.x = 0;
          this.beadRoad.y = 0;
        }

        const rdata: any = [];
        this.beadRoad.parseRoadData(rdata);
        this.addChild(this.beadRoad);
      }

      public destroy() {
        super.destroy();
        this.beadRoad.dispose();
      }
    }
  }
}
