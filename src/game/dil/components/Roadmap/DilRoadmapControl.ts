namespace we {
  export namespace dil {
    export class DilRoadmapControl {
      protected tableInfo: data.TableInfo;
      protected beadRoad: dil.DilBeadRoad;
      protected leftPanel: LeftPanel;
      protected rightPanel: RightPanel;
      public tableid: string;

      protected parser: ro.RORoadParser;
      // protected predictTimeout: number;
      protected useParser: boolean = false;

      public constructor(tableid: string = null) {
        this.tableid = tableid;
      }

      public setRoads(r1, leftPanel, rightPanel) {
        this.beadRoad = r1;
        this.leftPanel = leftPanel;
        this.rightPanel = rightPanel;
      }

      protected doParserUpdate(state: number) {
        // stae 0 = update, 1 = predict, 2 = restore from predict
        this.beadRoad.parseRoadData(this.parser.beadRoadResult, state);
      }

      protected onParserUpdate(e: egret.Event) {
        this.doParserUpdate(0);
      }

      public setTableInfo(tableInfo: data.TableInfo) {
        this.tableInfo = tableInfo;
        this.updateRoadData(0);
      }

      public updateRoadData(state: number = 0) {
        if (this.tableInfo) {
          const roadmapData = this.tableInfo.roadmap;
          if (roadmapData) {
            if (this.useParser) {
              // option 1. parse from bead road data
              this.parser.parseData(roadmapData.inGame.bead);
            } else {
              // option 2. just display all road data as it is
              // stae 0 = update, 1 = predict, 2 = restore from predict
              this.beadRoad.parseRoadData(roadmapData.inGame.bead, state);

              // update the gamestatistic
              if (this.tableInfo.gamestatistic) {
                const stat = this.tableInfo.gamestatistic;
                if (this.leftPanel) {
                }
              }
            }
          }
        }
      }

      public dispose() {
        if (this.parser.hasEventListener('onUpdate')) {
          this.parser.removeEventListener('onUpdate', this.onParserUpdate, this);
        }
      }
    }
  }
}
