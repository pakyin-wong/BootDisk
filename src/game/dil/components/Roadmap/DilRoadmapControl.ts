namespace we {
  export namespace dil {
    export class DilRoadmapControl {
      protected tableInfo: data.TableInfo;
      protected beadRoad: dil.DilBeadRoad;
      protected leftPanel: LeftPanel;
      protected rightPanel: RightPanel;
      protected resultPanel: dil.DilBeadRoadResultPanel;
      public tableid: string;

      protected parser: ro.RORoadParser;
      // protected predictTimeout: number;
      protected useParser: boolean = false;

      public constructor(tableid: string = null) {
        this.tableid = tableid;
      }

      public setRoads(r1, leftPanel, rightPanel, resultPanel) {
        this.beadRoad = r1;
        this.leftPanel = leftPanel;
        this.rightPanel = rightPanel;
        this.resultPanel = resultPanel;
        // if (this.beadRoad) {
        this.beadRoad.addEventListener('RollOverResult', this.onBeadRoadOver, this);
        this.beadRoad.addEventListener('RollOutResult', this.onBeadRoadOut, this);
        this.beadRoad.addEventListener('ClickResult', this.onBeadRoadClick, this);
        // }
        console.log('this.tableInfothis.tableInfo', this.tableInfo);
      }
      protected onBeadRoadClick(e: egret.Event) {
        if (this.tableInfo) {
          if (this.tableInfo.roadmap) {
            const roadData = this.tableInfo.roadmap;
            if (roadData.gameInfo) {
              if (e.data.gameRoundID !== undefined) {
                const rslt = roadData.gameInfo[e.data.gameRoundID];

                window.open('http://www.google.com', '_blank');
              }
            }
          }
        }
      }

      protected onBeadRoadOut(e: egret.Event) {
        if (this.tableInfo) {
          if (this.tableInfo.roadmap) {
            const data = this.tableInfo.roadmap;
            this.resultPanel.visible = false;
          }
        }
      }

      protected onBeadRoadOver(e: egret.Event) {
        if (this.tableInfo) {
          console.log('this.tableInfo', this.tableInfo);
          if (this.tableInfo.roadmap) {
            const roadData = this.tableInfo.roadmap;
            if (roadData.gameInfo) {
              console.log('roadData.gameInfo', roadData.gameInfo);
              if (e.data.gameRoundID !== undefined) {
                console.log('e.data.gameRoundID', e.data.gameRoundID);

                const rslt = roadData.gameInfo[e.data.gameRoundID];
                console.log('rslt', rslt);
                this.resultPanel.setResult(rslt);
                this.resultPanel.visible = true;
                this.resultPanel._gameInfoLabel.visible = true ? true : false; // todo: check if replay url is available
                this.resultPanel.x = e.data.mouseX - 30;
                this.resultPanel.y = e.data.mouseY - this.resultPanel.height - 10;
              } else {
                this.resultPanel.visible = false;
              }
            }
          }
        }
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

        if (this.beadRoad.hasEventListener('RollOverResult')) {
          this.beadRoad.removeEventListener('RollOverResult', this.onBeadRoadOver, this);
        }

        if (this.beadRoad.hasEventListener('RollOutResult')) {
          this.beadRoad.removeEventListener('RollOutResult', this.onBeadRoadOut, this);
        }

        if (this.beadRoad.hasEventListener('ClickResult')) {
          this.beadRoad.removeEventListener('ClickResult', this.onBeadRoadClick, this);
        }
      }
    }
  }
}
