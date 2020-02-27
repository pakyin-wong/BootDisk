namespace we {
  export namespace ba {
    export class BARoadmapControl {
      protected tableInfo: data.TableInfo;
      protected beadRoad: BABeadRoad;
      protected bigRoad: BABigRoad;
      protected bigEyeRoad: BABigEyeRoad;
      protected smallRoad: BASmallRoad;
      protected cockroachRoad: BACockroachRoad;
      protected targetPanel: core.BaseGamePanel & IBARoadmapDisplayObject; // BARoadmapRightPanel;
      protected beadResultPanel: BaBeadRoadResultPanel;
      public tableid: string;

      protected parser: BARoadParser;
      protected predictTimeout: number;
      protected useParser: boolean = false;

      public constructor(tableid: string = null) {
        this.tableid = tableid;
      }

      public setRoads(r1, r2, r3, r4, r5, columnArray, panel, beadResultPanel) {
        this.beadRoad = r1;
        this.bigRoad = r2;
        this.bigEyeRoad = r3;
        this.smallRoad = r4;
        this.cockroachRoad = r5;
        this.beadResultPanel = beadResultPanel;

        this.targetPanel = panel;

        this.beadRoad.addEventListener('RollOverResult', this.onBeadRoadOver, this);
        this.beadRoad.addEventListener('RollOutResult', this.onBeadRoadOut, this);
        this.beadRoad.addEventListener('ClickResult', this.onBeadRoadClick, this);

        this.parser = new BARoadParser(columnArray);
        this.parser.addEventListener('onUpdate', this.onParserUpdate, this);
        this.parser.addEventListener('onPredict', this.onParserPredict, this);
        this.parser.addEventListener('onRestore', this.onParserRestore, this);

        this.onDisplayUpdate(null);

        // predict roads

        this.targetPanel.iconBankerBead.touchEnabled = true;
        this.targetPanel.iconBankerBead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankerClick, this);

        this.targetPanel.iconPlayerBead.touchEnabled = true;
        this.targetPanel.iconPlayerBead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayerClick, this);
        // dark/light mode
        // dir.evtHandler.addEventListener(we.core.Event.MODE_UPDATE, this.onModeUpdate, this);
        // this.onModeUpdate(null);
      }

      protected onBeadRoadOver(e: egret.Event) {
        if (this.tableInfo) {
          if (this.tableInfo.roadmap) {
            const roadData = this.tableInfo.roadmap;
            if (roadData.gameInfo) {
              if (e.data.index >= 0 && e.data.index + roadData.inGameInfoStart < roadData.gameInfo.length) {
                const rslt = roadData.gameInfo[e.data.index + roadData.inGameInfoStart];

                const gameData: GameData = new GameData();
                gameData.a1 = rslt.a1;
                gameData.a2 = rslt.a2;
                gameData.a3 = rslt.a3;
                gameData.b1 = rslt.b1;
                gameData.b2 = rslt.b2;
                gameData.b3 = rslt.b3;
                gameData.bankerpoint = rslt.bv;
                gameData.playerpoint = rslt.pv;
                gameData.wintype = rslt.result;
                gameData.gameroundid = rslt.gameRoundID;

                this.beadResultPanel.setCardResult(gameData);

                this.beadResultPanel.visible = true;
                this.beadResultPanel.x = e.data.mouseX - 30;
                this.beadResultPanel.y = e.data.mouseY - this.beadResultPanel.height - 10;
              } else {
                this.beadResultPanel.visible = false;
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
              if (e.data.index >= 0 && e.data.index + roadData.inGameInfoStart < roadData.gameInfo.length) {
                const rslt = roadData.gameInfo[e.data.index + roadData.inGameInfoStart];
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
            this.beadResultPanel.visible = false;
          }
        }
      }

      // predict banker win
      protected onBankerClick(e: egret.TouchEvent) {
        this.doPredict(0);
      }

      // predict banker win
      protected onPlayerClick(e: egret.TouchEvent) {
        this.doPredict(1);
      }

      protected doPredict(v: number) {
        if (this.useParser) {
          this.parser.predictWin(v);
        } else {
          if (this.tableInfo) {
            if (this.tableInfo.roadmap) {
              const data = this.tableInfo.roadmap;

              // merge the animation index into the road data
              this.parser.mergePredictAnimationData(data.inGameB, data.inGameP);

              if (v === 0) {
                // banker
                this.beadRoad.parseRoadData(data.inGameB.bead, 1);
                this.bigRoad.parseRoadData(data.inGameB.bigRoad, 1);
                this.bigEyeRoad.parseRoadData(data.inGameB.bigEye, 1);
                this.smallRoad.parseRoadData(data.inGameB.small, 1);
                this.cockroachRoad.parseRoadData(data.inGameB.roach, 1);
              } else {
                // player
                this.beadRoad.parseRoadData(data.inGameP.bead, 1);
                this.bigRoad.parseRoadData(data.inGameP.bigRoad, 1);
                this.bigEyeRoad.parseRoadData(data.inGameP.bigEye, 1);
                this.smallRoad.parseRoadData(data.inGameP.small, 1);
                this.cockroachRoad.parseRoadData(data.inGameP.roach, 1);
              }
            }
          }
        }
        if (this.predictTimeout) {
          egret.clearTimeout(this.predictTimeout);
        }
        this.predictTimeout = egret.setTimeout(this.clearPredict, this, 3000);
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

      protected clearPredict() {
        if (this.useParser) {
          this.parser.clearPredict();
        } else {
          this.onDisplayUpdate(null);
        }
      }

      protected onDisplayUpdate(e: egret.Event) {
        if (this.predictTimeout) {
          egret.clearTimeout(this.predictTimeout);
        }

        if (this.tableInfo) {
          if (this.tableInfo.roadmap) {
            this.updateRoadData(2);
          }
        }
      }

      protected doParserUpdate(state: number) {
        // stae 0 = update, 1 = predict, 2 = restore from predict
        this.beadRoad.parseRoadData(this.parser.beadRoadResult, state);
        this.bigRoad.parseRoadData(this.parser.bigRoadResult, state);
        this.bigEyeRoad.parseRoadData(this.parser.bigEyeRoadResult, state);
        this.smallRoad.parseRoadData(this.parser.smallRoadResult, state);
        this.cockroachRoad.parseRoadData(this.parser.cockroachRoadResult, state);
      }

      protected onParserUpdate(e: egret.Event) {
        this.doParserUpdate(0);
      }

      protected onParserPredict(e: egret.Event) {
        this.doParserUpdate(1);
      }

      protected onParserRestore(e: egret.Event) {
        this.doParserUpdate(2);
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

              // update the gamestatistic
              if (this.tableInfo) {
                if (this.tableInfo.gamestatistic) {
                  const stats = this.parser.getIconsFromBeadResult(roadmapData.inGame.bead);
                  const data = this.tableInfo.gamestatistic;
                  this.targetPanel.setPredictIcons(
                    stats.predictBankerIcons[0],
                    stats.predictBankerIcons[1],
                    stats.predictBankerIcons[2],
                    stats.predictPlayerIcons[0],
                    stats.predictPlayerIcons[1],
                    stats.predictPlayerIcons[2]
                  );
                }
              }

              this.parser.parseData(roadmapData.inGame.bead);
            } else {
              // option 2. just display all road data as it is
              // stae 0 = update, 1 = predict, 2 = restore from predict
              this.beadRoad.parseRoadData(roadmapData.inGame.bead, state);
              this.bigRoad.parseRoadData(roadmapData.inGame.bigRoad, state);
              this.bigEyeRoad.parseRoadData(roadmapData.inGame.bigEye, state);
              this.smallRoad.parseRoadData(roadmapData.inGame.small, state);
              this.cockroachRoad.parseRoadData(roadmapData.inGame.roach, state);

              // update the gamestatistic
              if (this.tableInfo) {
                if (this.tableInfo.gamestatistic) {
                  const prediction = this.parser.getIconsFromRoadPredictData(roadmapData.inGameB, roadmapData.inGameP);
                  const stat = this.tableInfo.gamestatistic;
                  this.targetPanel.setPredictIcons(
                    prediction.predictBankerIcons[0],
                    prediction.predictBankerIcons[1],
                    prediction.predictBankerIcons[2],
                    prediction.predictPlayerIcons[0],
                    prediction.predictPlayerIcons[1],
                    prediction.predictPlayerIcons[2]
                  );
                }
              }
            }
          }
        }
      }

      public dispose() {
        if (this.predictTimeout) {
          egret.clearTimeout(this.predictTimeout);
        }

        if (this.parser.hasEventListener('onUpdate')) {
          this.parser.removeEventListener('onUpdate', this.onParserUpdate, this);
        }

        if (this.parser.hasEventListener('onPredict')) {
          this.parser.removeEventListener('onPredict', this.onParserPredict, this);
        }

        if (this.parser.hasEventListener('onRestore')) {
          this.parser.removeEventListener('onRestore', this.onParserRestore, this);
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

        if (this.targetPanel.iconBankerBead.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this.targetPanel.iconBankerBead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankerClick, this);
        }
        if (this.targetPanel.iconPlayerBead.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this.targetPanel.iconPlayerBead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayerClick, this);
        }

        // if (dir.evtHandler.hasEventListener(we.core.Event.MODE_UPDATE)) {
        // dir.evtHandler.removeEventListener(we.core.Event.MODE_UPDATE, this.onModeUpdate, this);
        // }
      }
    }
  }
}
