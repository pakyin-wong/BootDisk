namespace we {
  export namespace lw {
    export class LwRoadmapControl {
      protected tableInfo: data.TableInfo;
      protected beadRoad: LwBeadRoad;
      protected leftPanel: LwLeftPanel;
      protected rightPanel: LwRightPanel;
      protected resultPanel: lw.LwBeadRoadResultPanel;
      public tableid: string;

      public constructor(tableid: string = null) {
        this.tableid = tableid;
      }

      public setRoads(r1, leftPanel, rightPanel, resultPanel, isInteractable = true) {
        this.beadRoad = r1;

        this.leftPanel = leftPanel;
        this.rightPanel = rightPanel;
        this.resultPanel = resultPanel;

        if (this.beadRoad && isInteractable) {
          this.beadRoad.addEventListener('RollOverResult', this.onBeadRoadOver, this);
          this.beadRoad.addEventListener('RollOutResult', this.onBeadRoadOut, this);
          this.beadRoad.addEventListener('ClickResult', this.onBeadRoadClick, this);
        }
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
                this.resultPanel._gameInfoLabel.visible = true? true : false; //todo: check if replay url is available
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

      public setTableInfo(tableInfo: data.TableInfo) {
        this.tableInfo = tableInfo;
        this.updateRoadData(0);
      }

      public updateRoadData(state: number = 0) {
        if (this.tableInfo) {
          const roadmapData = this.tableInfo.roadmap;
          if (roadmapData) {
            this.beadRoad.parseRoadData(roadmapData.inGame.bead, state);

            // update the gamestatistic
            if (this.tableInfo.gamestatistic) {
              const stat = this.tableInfo.gamestatistic;
            }
          }
        }
      }

      // dispose never be called
      public dispose() {
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
