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

      protected roadsContainer: egret.DisplayObjectContainer;

      protected totalCount: number;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'BARoadmapRightPanel');
      }

      protected init() {
        const gridSize = 22;
        this.totalCount = 0;

        this.iconPlayerBigEye = new BABigEyeRoadIcon(16);
        this.iconPlayerBigEye.x = 77;
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
        this.iconBankerBigEye.x = 210;
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
        this.roadsContainer.scaleX = 671 / 672;
        this.roadsContainer.scaleY = 260 / 257;
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
            if (this.tableInfo.gamestatistic.bankerCount !== null && this.tableInfo.gamestatistic.bankerCount !== undefined) {
              this.bankerCountLabel.text = this.tableInfo.gamestatistic.bankerCount.toString();
            }
            if (this.tableInfo.gamestatistic.playerCount !== null && this.tableInfo.gamestatistic.playerCount !== undefined) {
              this.playerCountLabel.text = this.tableInfo.gamestatistic.playerCount.toString();
            }
            if (this.tableInfo.gamestatistic.tieCount !== null && this.tableInfo.gamestatistic.tieCount !== undefined) {
              this.tieCountLabel.text = this.tableInfo.gamestatistic.tieCount.toString();
            }
            if (this.tableInfo.gamestatistic.bankerPairCount !== null && this.tableInfo.gamestatistic.bankerPairCount !== undefined) {
              this.bankerPairCountLabel.text = this.tableInfo.gamestatistic.bankerPairCount.toString();
            }
            if (this.tableInfo.gamestatistic.playerPairCount !== null && this.tableInfo.gamestatistic.playerPairCount !== undefined) {
              this.playerPairCountLabel.text = this.tableInfo.gamestatistic.playerPairCount.toString();
            }

            this.totalCount = this.tableInfo.gamestatistic.totalCount;

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

      public destroy() {
        super.destroy();

        this.bigRoad.dispose();
        this.bigEyeRoad.dispose();
        this.smallRoad.dispose();
        this.cockroachRoad.dispose();

        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }
    }
  }
}
