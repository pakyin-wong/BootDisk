namespace we {
  export namespace ba {
    export interface IBARoadmapDisplayObject {
      iconBankerBead: BABeadRoadIcon;
      iconPlayerBead: BABeadRoadIcon;
      setPredictIcons(b1: any, b2: any, b3: any, p1: any, p2: any, p3: any);
    }
    export class BARoadmapRightPanel extends core.BaseGamePanel implements IBARoadmapDisplayObject {
      public bigRoad: BABigRoad;
      public bigEyeRoad: BABigEyeRoad;
      public smallRoad: BASmallRoad;
      public cockroachRoad: BACockroachRoad;

      public iconBankerBead: BABeadRoadIcon;
      public iconPlayerBead: BABeadRoadIcon;
      protected iconBankerBigEye: BABigEyeRoadIcon;
      protected iconPlayerBigEye: BABigEyeRoadIcon;
      protected iconBankerSmall: BASmallRoadIcon;
      protected iconPlayerSmall: BASmallRoadIcon;
      protected iconBankerCockroach: BACockroachRoadIcon;
      protected iconPlayerCockroach: BACockroachRoadIcon;

      protected iconBankerCount;
      protected iconPlayerCount;
      protected iconTieCount;
      protected iconBankerPairCount;
      protected iconPlayerPairCount;

      protected bankerCountLabel: ui.RunTimeLabel;
      protected playerCountLabel: ui.RunTimeLabel;
      protected tieCountLabel: ui.RunTimeLabel;
      protected bankerPairCountLabel: ui.RunTimeLabel;
      protected playerPairCountLabel: ui.RunTimeLabel;
      protected totalCountLabel: ui.RunTimeLabel;
      protected playerButtonLabel: ui.RunTimeLabel;
      protected bankerButtonLabel: ui.RunTimeLabel;

      protected iconBanker: BASmallRoadIcon;
      protected iconPlayer: BASmallRoadIcon;
      protected iconTie: BASmallRoadIcon;

      protected roadsContainer: egret.DisplayObjectContainer;

      protected totalCount: number;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'BARoadmapRightPanel');
      }

      protected init() {
        const gridSize = 21;
        this.totalCount = 0;

        this.playerButtonLabel.bold = true;
        this.bankerButtonLabel.bold = true;

        this.iconBanker = new BASmallRoadIcon(24);
        this.iconBanker.x = 277;
        this.iconBanker.y = 14;
        this.iconBanker.setByObject({ v: 'b' });
        this.addChild(this.iconBanker);

        this.iconPlayer = new BASmallRoadIcon(24);
        this.iconPlayer.x = 336;
        this.iconPlayer.y = 14;
        this.iconPlayer.setByObject({ v: 'p' });
        this.addChild(this.iconPlayer);

        this.iconTie = new BASmallRoadIcon(24);
        this.iconTie.x = 395;
        this.iconTie.y = 14;
        this.iconTie.setByObject({ v: 't' });
        this.addChild(this.iconTie);

        this.iconPlayerBigEye = new BABigEyeRoadIcon(16);
        this.iconPlayerBigEye.x = 210;
        this.iconPlayerBigEye.y = 16;
        this.iconPlayerBigEye.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerBigEye);

        this.iconPlayerSmall = new BASmallRoadIcon(16);
        this.iconPlayerSmall.x = 95;
        this.iconPlayerSmall.y = 16;
        this.iconPlayerSmall.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerSmall);

        this.iconPlayerCockroach = new BACockroachRoadIcon(16);
        this.iconPlayerCockroach.x = 113;
        this.iconPlayerCockroach.y = 16;
        this.iconPlayerCockroach.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerCockroach);

        this.iconBankerBigEye = new BABigEyeRoadIcon(16);
        this.iconBankerBigEye.x = 77;
        this.iconBankerBigEye.y = 16;
        this.iconBankerBigEye.setByObject({ v: 'b' });
        this.addChild(this.iconBankerBigEye);

        this.iconBankerSmall = new BASmallRoadIcon(16);
        this.iconBankerSmall.x = 228;
        this.iconBankerSmall.y = 16;
        this.iconBankerSmall.setByObject({ v: 'b' });
        this.addChild(this.iconBankerSmall);

        this.iconBankerCockroach = new BACockroachRoadIcon(16);
        this.iconBankerCockroach.x = 246;
        this.iconBankerCockroach.y = 16;
        this.iconBankerCockroach.setByObject({ v: 'b' });
        this.addChild(this.iconBankerCockroach);

        this.roadsContainer = new egret.DisplayObjectContainer();
        this.roadsContainer.x = 2;
        this.roadsContainer.y = 47;
        // this.roadsContainer.scaleX = 675 / 672;
        // this.roadsContainer.scaleY = 260 / 257;
        // this.roadsContainer.alpha = 0.5;
        this.addChild(this.roadsContainer);

        this.bigRoad = new BABigRoad(32, gridSize);
        this.bigRoad.x = 0;
        this.bigRoad.y = 0;
        this.roadsContainer.addChild(this.bigRoad);

        this.bigEyeRoad = new BABigEyeRoad(32 * 2, gridSize);
        this.bigEyeRoad.x = 0;
        this.bigEyeRoad.y = 6 * gridSize;
        this.roadsContainer.addChild(this.bigEyeRoad);

        this.smallRoad = new BASmallRoad(16 * 2, gridSize);
        this.smallRoad.x = 0;
        this.smallRoad.y = 6 * gridSize + 6 * (gridSize / 2);
        this.roadsContainer.addChild(this.smallRoad);

        this.cockroachRoad = new BACockroachRoad(16 * 2, gridSize);
        this.cockroachRoad.x = gridSize * 16;
        this.cockroachRoad.y = 6 * gridSize + 6 * (gridSize / 2);
        this.roadsContainer.addChild(this.cockroachRoad);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        dir.evtHandler.addEventListener(we.core.Event.MODE_UPDATE, this.onModeUpdate, this);
        this.changeLang();
      }

      public changeLang() {
        this.totalCountLabel.text = this.totalCount + '';
        this.playerButtonLabel.text = i18n.t('baccarat.askPlayer');
        this.bankerButtonLabel.text = i18n.t('baccarat.askBanker');
      }

      // render text by tableInfo
      public update() {
        if (this.tableInfo) {
          if (this.tableInfo.gamestatistic) {
            if (this.tableInfo.gamestatistic.shoeBankerCount !== null && this.tableInfo.gamestatistic.shoeBankerCount !== undefined) {
              this.bankerCountLabel.text = this.tableInfo.gamestatistic.shoeBankerCount.toString();
            }
            if (this.tableInfo.gamestatistic.shoePlayerCount !== null && this.tableInfo.gamestatistic.shoePlayerCount !== undefined) {
              this.playerCountLabel.text = this.tableInfo.gamestatistic.shoePlayerCount.toString();
            }
            if (this.tableInfo.gamestatistic.shoeTieCount !== null && this.tableInfo.gamestatistic.shoeTieCount !== undefined) {
              this.tieCountLabel.text = this.tableInfo.gamestatistic.shoeTieCount.toString();
            }
            if (this.tableInfo.gamestatistic.shoeBankerPairCount !== null && this.tableInfo.gamestatistic.shoeBankerPairCount !== undefined) {
              this.bankerPairCountLabel.text = this.tableInfo.gamestatistic.shoeBankerPairCount.toString();
            }
            if (this.tableInfo.gamestatistic.shoePlayerPairCount !== null && this.tableInfo.gamestatistic.shoePlayerPairCount !== undefined) {
              this.playerPairCountLabel.text = this.tableInfo.gamestatistic.shoePlayerPairCount.toString();
            }
            

            this.totalCount = this.tableInfo.gamestatistic.shoeTotalCount;

            this.changeLang();
          }
        }
      }

      // called by BaRoadmapControl
      public setPredictIcons(b1: any, b2: any, b3: any, p1: any, p2: any, p3: any) {
        this.iconBankerBigEye.setByObject(b1);
        this.iconBankerSmall.setByObject(b2);
        this.iconBankerCockroach.setByObject(b3);

        this.iconPlayerBigEye.setByObject(p1);
        this.iconPlayerSmall.setByObject(p2);
        this.iconPlayerCockroach.setByObject(p3);

        this.update();
      }

      protected onModeUpdate() {
        this.iconBanker.updateDisplay();
        this.iconPlayer.updateDisplay();
        this.iconTie.updateDisplay();
      }

      public destroy() {
        this.bigRoad.dispose();
        this.bigEyeRoad.dispose();
        this.smallRoad.dispose();
        this.cockroachRoad.dispose();

        if (this.iconBankerBigEye) {
          this.iconBankerBigEye.dispose();
        }
        if (this.iconBankerSmall) {
          this.iconBankerSmall.dispose();
        }
        if (this.iconBankerCockroach) {
          this.iconBankerCockroach.dispose();
        }
        if (this.iconPlayerBigEye) {
          this.iconPlayerBigEye.dispose();
        }
        if (this.iconPlayerSmall) {
          this.iconPlayerSmall.dispose();
        }
        if (this.iconPlayerCockroach) {
          this.iconPlayerCockroach.dispose();
        }
        if (this.iconBanker) {
          this.iconBanker.dispose();
        }
        if (this.iconPlayer) {
          this.iconPlayer.dispose();
        }
        if (this.iconTie) {
          this.iconTie.dispose();
        }

        super.destroy();

          dir.evtHandler.removeEventListener(we.core.Event.MODE_UPDATE, this.onModeUpdate, this);
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }
    }
  }
}
