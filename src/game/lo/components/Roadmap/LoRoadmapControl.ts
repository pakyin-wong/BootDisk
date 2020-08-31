namespace we {
  export namespace lo {
    export class LoRoadmapControl {
      protected tableInfo: data.TableInfo;
      protected leftPanel: LoLeftPanel;
      protected rightPanel: LoRightPanel;
      public tableid: string;

      protected parser: ro.RORoadParser;
      // protected predictTimeout: number;
      protected useParser: boolean = false;

      public constructor(tableid: string = null) {
        this.tableid = tableid;
      }

      public setRoads(leftPanel, rightPanel) {
        this.leftPanel = leftPanel;
        this.rightPanel = rightPanel;
      }

      protected doParserUpdate(state: number) {
        // stae 0 = update, 1 = predict, 2 = restore from predict
        // this.beadRoad.parseRoadData(this.parser.beadRoadResult, state);
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
              // this.beadRoad.parseRoadData(roadmapData.inGame.bead, state);
              // this.colorRoad.parseRoadData(roadmapData.inGame.color, state);
              // this.sizeRoad.parseRoadData(roadmapData.inGame.size, state);
              // this.oddRoad.parseRoadData(roadmapData.inGame.odd, state);

              // update the gamestatistic
              if (this.tableInfo.gamestatistic) {
                const stat = this.tableInfo.gamestatistic;
                if (this.leftPanel) {
                  // this.leftPanel.setHotCold(stat.hotNumbers, stat.coldNumbers);
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

        // if (dir.evtHandler.hasEventListener(we.core.Event.MODE_UPDATE)) {
        // dir.evtHandler.removeEventListener(we.core.Event.MODE_UPDATE, this.onModeUpdate, this);
        // }
      }
    }
  }
}
