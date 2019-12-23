namespace we {
  export namespace ba {
    export class BARoadmapControl {
      private beadRoad: BABeadRoad;
      private bigRoad: BABigRoad;
      private bigEyeRoad: BABigEyeRoad;
      private smallRoad: BASmallRoad;
      private cockroachRoad: BACockroachRoad;
      private rightPanel: BARoadmapRightPanel;
      public tableid: string;

      private parser: BARoadParser;
      private predictTimeout: number;
      private useParser: boolean = false;

      public constructor(tableid: string = null) {
        this.tableid = tableid;
      }

      public setRoads(r1, r2, r3, r4, r5, columnArray, rightPanel) {
        this.beadRoad = r1;
        this.bigRoad = r2;
        this.bigEyeRoad = r3;
        this.smallRoad = r4;
        this.cockroachRoad = r5;
        this.rightPanel = rightPanel;

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
              const animated = data.animateCell;

              const animatedIndex = ['bbead', 'bbigRoad', 'bbigEye', 'bsmall', 'broach', 'pbead', 'pbigRoad', 'pbigEye', 'psmall', 'proach'];
              try {
                for (let i = 0; i < animated.length; i++) {
                  if (animated[i] > -1) {
                    data[animatedIndex[i]][animated[i]].isPredict = 1;
                  }
                }
              } catch (e) {
                console.error('doPredict Error');
              }

              if (v === 0) {
                this.beadRoad.parseRoadData(data.bbead, 1);
                this.bigRoad.parseRoadData(data.bbigRoad, 1);
                this.bigEyeRoad.parseRoadData(data.bbigEye, 1);
                this.smallRoad.parseRoadData(data.bsmall, 1);
                this.cockroachRoad.parseRoadData(data.broach, 1);
              } else {
                this.beadRoad.parseRoadData(data.pbead, 1);
                this.bigRoad.parseRoadData(data.pbigRoad, 1);
                this.bigEyeRoad.parseRoadData(data.pbigEye, 1);
                this.smallRoad.parseRoadData(data.psmall, 1);
                this.cockroachRoad.parseRoadData(data.proach, 1);
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
                const stats = this.parser.getIconsFromBeadResult(roadmapData.bead);
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

            this.parser.parseData(roadmapData.bead);
          } else {
            // option 2. just display all road data as it is
            // stae 0 = update, 1 = predict, 2 = restore from predict
            this.beadRoad.parseRoadData(roadmapData.bead, state);
            this.bigRoad.parseRoadData(roadmapData.bigRoad, state);
            this.bigEyeRoad.parseRoadData(roadmapData.bigEye, state);
            this.smallRoad.parseRoadData(roadmapData.small, state);
            this.cockroachRoad.parseRoadData(roadmapData.roach, state);

            // update the gamestatistic
            if (env.tableInfos[this.tableid]) {
              if (env.tableInfos[this.tableid].gamestatistic) {
                const stats = this.parser.getIconsFromRoadData(roadmapData);
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
