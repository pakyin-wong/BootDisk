namespace we {
  export namespace di {
    export class DiRoadmapControl {
      protected tableInfo: data.TableInfo;
      protected beadRoad: DiBeadRoad;
      protected sumRoad: DiSumBigRoad;
      protected sizeRoad: DiSizeBigRoad;
      protected oddRoad: DiOddBigRoad;
      protected leftPanel: DiLeftPanel;
      protected rightPanel: DiRightPanel;
      protected resultPanel: di.DiBigRoadResultPanel;
      public tableid: string;

      protected parser: ba.BARoadParser;
      // protected predictTimeout: number;
      protected useParser: boolean = false;

      public constructor(tableid: string = null) {
        this.tableid = tableid;
      }

      public setRoads(r1, r2, r3, r4, leftPanel, rightPanel, resultPanel) {
        this.beadRoad = r1;
        this.sumRoad = r2;
        this.sizeRoad = r3;
        this.oddRoad = r4;
        this.leftPanel = leftPanel;
        this.rightPanel = rightPanel;
        this.resultPanel = resultPanel;

        this.sumRoad.addEventListener('RollOverResult', this.onBeadRoadOver, this);
        this.sumRoad.addEventListener('RollOutResult', this.onBeadRoadOut, this);
        this.sumRoad.addEventListener('ClickResult', this.onBeadRoadClick, this);

        this.sizeRoad.addEventListener('RollOverResult', this.onBeadRoadOver, this);
        this.sizeRoad.addEventListener('RollOutResult', this.onBeadRoadOut, this);
        this.sizeRoad.addEventListener('ClickResult', this.onBeadRoadClick, this);

        this.oddRoad.addEventListener('RollOverResult', this.onBeadRoadOver, this);
        this.oddRoad.addEventListener('RollOutResult', this.onBeadRoadOut, this);
        this.oddRoad.addEventListener('ClickResult', this.onBeadRoadClick, this);

        // this.parser = new ba.BARoadParser(columnArray);
        // this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

        // dark/light mode
        // dir.evtHandler.addEventListener(we.core.Event.MODE_UPDATE, this.onModeUpdate, this);
        // this.onModeUpdate(null);
      }

      protected onBeadRoadOver(e: egret.Event) {
        if (this.tableInfo) {
          if (this.tableInfo.roadmap) {
            const roadData = this.tableInfo.roadmap;
            if (roadData.gameInfo) {
              if (e.data.gameRoundID !== undefined) {
                const rslt = roadData.gameInfo[e.data.gameRoundID];

                this.resultPanel.setResult(rslt);
                this.resultPanel.visible = true;
                this.resultPanel.x = e.data.mouseX - 30;
                this.resultPanel.y = e.data.mouseY - this.resultPanel.height - 10;
              } else {
                this.resultPanel.visible = false;
              }
            }
          }
        }
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

      // DarkMode
      /*
      protected onModeUpdate(e: egret.Event) {
        this.beadRoad.DarkMode = env.mode === 1 ? 1 : 0;
        this.bigRoad.DarkMode = this.beadRoad.DarkMode;
        this.bigEyeRoad.DarkMode = this.beadRoad.DarkMode;
        this.smallRoad.DarkMode = this.beadRoad.DarkMode;
        this.cockroachRoad.DarkMode = this.beadRoad.DarkMode;
      }*/

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
              if (roadmapData.inGame) {
                this.beadRoad.parseRoadData(roadmapData.inGame.bead, state);
                this.sumRoad.parseRoadData(roadmapData.inGame.sum, state);
                this.sizeRoad.parseRoadData(roadmapData.inGame.size, state);
                this.oddRoad.parseRoadData(roadmapData.inGame.odd, state);
              }

              // update the gamestatistic
              if (this.tableInfo.gamestatistic) {
                const stat = this.tableInfo.gamestatistic;
                // this.leftPanel.setHotCold(stat.hotNumbers, stat.coldNumbers);
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

        // if (dir.evtHandler.hasEventListener(we.core.Event.MODE_UPDATE)) {
        // dir.evtHandler.removeEventListener(we.core.Event.MODE_UPDATE, this.onModeUpdate, this);
        // }
      }
    }
  }
}
