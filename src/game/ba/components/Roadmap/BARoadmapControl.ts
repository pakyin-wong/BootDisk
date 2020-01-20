namespace we {
  export namespace ba {
    export class BARoadmapControl {
      private beadRoad: BABeadRoad;
      private bigRoad: BABigRoad;
      private bigEyeRoad: BABigEyeRoad;
      private smallRoad: BASmallRoad;
      private cockroachRoad: BACockroachRoad;
      private rightPanel: BARoadmapRightPanel;
      private beadResultPanel: BaBeadRoadResultPanel;
      public tableid: string;

      private parser: BARoadParser;
      private predictTimeout: number;
      private useParser: boolean = true;

      public constructor(tableid: string = null) {
        this.tableid = tableid;
      }

      public setRoads(r1, r2, r3, r4, r5, columnArray, rightPanel, beadResultPanel) {
        this.beadRoad = r1;
        this.bigRoad = r2;
        this.bigEyeRoad = r3;
        this.smallRoad = r4;
        this.cockroachRoad = r5;
        this.rightPanel = rightPanel;
        this.beadResultPanel = beadResultPanel;

        this.beadRoad.addEventListener('RollOverResult', this.onBeadRoadOver, this);
        this.beadRoad.addEventListener('RollOutResult', this.onBeadRoadOut, this);
        this.beadRoad.addEventListener('ClickResult', this.onBeadRoadClick, this);

        this.parser = new BARoadParser(columnArray);
        this.parser.addEventListener('onUpdate', this.onParserUpdate, this);
        this.parser.addEventListener('onPredict', this.onParserPredict, this);
        this.parser.addEventListener('onRestore', this.onParserRestore, this);

        this.onDisplayUpdate(null);

        // predict roads
        this.rightPanel.iconBankerBead.touchEnabled = true;
        this.rightPanel.iconBankerBead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankerClick, this);

        this.rightPanel.iconPlayerBead.touchEnabled = true;
        this.rightPanel.iconPlayerBead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayerClick, this);

        // dark/light mode
        dir.evtHandler.addEventListener(we.core.Event.MODE_UPDATE, this.onModeUpdate, this);
      }

      private onBeadRoadOver(e: egret.Event) {
        if (env.tableInfos[this.tableid]) {
          if (env.tableInfos[this.tableid].roadmap) {
            const roadData = env.tableInfos[this.tableid].roadmap;
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

      private onBeadRoadClick(e: egret.Event) {
        if (env.tableInfos[this.tableid]) {
          if (env.tableInfos[this.tableid].roadmap) {
            const roadData = env.tableInfos[this.tableid].roadmap;
            if (roadData.gameInfo) {
              if (e.data.index >= 0 && e.data.index + roadData.inGameInfoStart < roadData.gameInfo.length) {
                const rslt = roadData.gameInfo[e.data.index + roadData.inGameInfoStart];
                window.open('http://www.google.com', '_blank');
              }
            }
          }
        }
      }

      private onBeadRoadOut(e: egret.Event) {
        if (env.tableInfos[this.tableid]) {
          if (env.tableInfos[this.tableid].roadmap) {
            const data = env.tableInfos[this.tableid].roadmap;
            this.beadResultPanel.visible = false;
          }
        }
      }

      // predict banker win
      private onBankerClick(e: egret.TouchEvent) {
        this.doPredict(0);
      }

      // predict banker win
      private onPlayerClick(e: egret.TouchEvent) {
        this.doPredict(1);
      }

      private doPredict(v: number) {
        if (this.useParser) {
          this.parser.predictWin(v);
        } else {
          if (env.tableInfos[this.tableid]) {
            if (env.tableInfos[this.tableid].roadmap) {
              const data = env.tableInfos[this.tableid].roadmap;

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
      private onModeUpdate(e: egret.Event) {
        this.beadRoad.DarkMode = e.data.mode === 1 ? 1 : 0;
        this.bigRoad.DarkMode = this.beadRoad.DarkMode;
        this.bigEyeRoad.DarkMode = this.beadRoad.DarkMode;
        this.smallRoad.DarkMode = this.beadRoad.DarkMode;
        this.cockroachRoad.DarkMode = this.beadRoad.DarkMode;
      }

      private clearPredict() {
        if (this.useParser) {
          this.parser.clearPredict();
        } else {
          this.onDisplayUpdate(null);
        }
      }

      private onDisplayUpdate(e: egret.Event) {
        if (this.predictTimeout) {
          egret.clearTimeout(this.predictTimeout);
        }

        if (env.tableInfos[this.tableid]) {
          if (env.tableInfos[this.tableid].roadmap) {
            const data = env.tableInfos[this.tableid].roadmap;
            this.updateRoadData(data, 2);
          }
        }
      }

      private doParserUpdate(state: number) {
        // stae 0 = update, 1 = predict, 2 = restore from predict
        this.beadRoad.parseRoadData(this.parser.beadRoadResult, state);
        this.bigRoad.parseRoadData(this.parser.bigRoadResult, state);
        this.bigEyeRoad.parseRoadData(this.parser.bigEyeRoadResult, state);
        this.smallRoad.parseRoadData(this.parser.smallRoadResult, state);
        this.cockroachRoad.parseRoadData(this.parser.cockroachRoadResult, state);
      }

      private onParserUpdate(e: egret.Event) {
        this.doParserUpdate(0);
      }

      private onParserPredict(e: egret.Event) {
        this.doParserUpdate(1);
      }

      private onParserRestore(e: egret.Event) {
        this.doParserUpdate(2);
      }

      public updateRoadData(roadmapData: any, state: number = 0) {
        if (roadmapData) {
          if (this.useParser) {
            // option 1. parse from bead road data

            // update the gamestatistic
            if (env.tableInfos[this.tableid]) {
              if (env.tableInfos[this.tableid].gamestatistic) {
                const stats = this.parser.getIconsFromBeadResult(roadmapData.inGame.bead);
                const data = env.tableInfos[this.tableid].gamestatistic;
                this.rightPanel.setStats(
                  data.bankerCount,
                  data.playerCount,
                  data.tieCount,
                  data.bankerPairCount,
                  data.playerPairCount,
                  data.totalCount,
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
            if (env.tableInfos[this.tableid]) {
              if (env.tableInfos[this.tableid].gamestatistic) {
                const prediction = this.parser.getIconsFromRoadPredictData(roadmapData.inGameB, roadmapData.inGameP);
                const stat = env.tableInfos[this.tableid].gamestatistic;
                this.rightPanel.setStats(
                  stat.bankerCount,
                  stat.playerCount,
                  stat.tieCount,
                  stat.bankerPairCount,
                  stat.playerPairCount,
                  stat.totalCount,
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

        if (this.rightPanel.iconBankerBead.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this.rightPanel.iconBankerBead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankerClick, this);
        }
        if (this.rightPanel.iconPlayerBead.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this.rightPanel.iconPlayerBead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayerClick, this);
        }

        if (dir.evtHandler.hasEventListener(we.core.Event.MODE_UPDATE)) {
          dir.evtHandler.removeEventListener(we.core.Event.MODE_UPDATE, this.onModeUpdate, this);
        }
      }
    }
  }
}
