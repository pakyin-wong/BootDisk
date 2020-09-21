namespace we {
  export namespace dt {
    export interface IDTRoadmapDisplayObject {
      iconBankerBead: DTBeadRoadIcon;
      iconPlayerBead: DTBeadRoadIcon;
      setPredictIcons(b1: any, b2: any, b3: any, p1: any, p2: any, p3: any);
    }
    export class DTRoadmapRightPanel extends ba.BARoadmapRightPanel implements IDTRoadmapDisplayObject {
      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'DTRoadmapLeftPanel');
      }

      protected init() {
        const gridSize = 21;
        this.totalCount = 0;

        this.playerButtonLabel.bold = true;
        this.bankerButtonLabel.bold = true;

        this.iconBanker = new ba.BASmallRoadIcon(24);
        this.iconBanker.x = 277;
        this.iconBanker.y = 14;
        this.iconBanker.setByObject({ v: 'b' });
        this.addChild(this.iconBanker);

        this.iconPlayer = new ba.BASmallRoadIcon(24);
        this.iconPlayer.x = 336;
        this.iconPlayer.y = 14;
        this.iconPlayer.setByObject({ v: 'p' });
        this.addChild(this.iconPlayer);

        this.iconTie = new ba.BASmallRoadIcon(24);
        this.iconTie.x = 395;
        this.iconTie.y = 14;
        this.iconTie.setByObject({ v: 't' });
        this.addChild(this.iconTie);

        this.iconPlayerBigEye = new ba.BABigEyeRoadIcon(16);
        this.iconPlayerBigEye.x = 77;
        this.iconPlayerBigEye.y = 16;
        this.iconPlayerBigEye.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerBigEye);

        this.iconPlayerSmall = new ba.BASmallRoadIcon(16);
        this.iconPlayerSmall.x = 95;
        this.iconPlayerSmall.y = 16;
        this.iconPlayerSmall.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerSmall);

        this.iconPlayerCockroach = new ba.BACockroachRoadIcon(16);
        this.iconPlayerCockroach.x = 113;
        this.iconPlayerCockroach.y = 16;
        this.iconPlayerCockroach.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerCockroach);

        this.iconBankerBigEye = new ba.BABigEyeRoadIcon(16);
        this.iconBankerBigEye.x = 210;
        this.iconBankerBigEye.y = 16;
        this.iconBankerBigEye.setByObject({ v: 'b' });
        this.addChild(this.iconBankerBigEye);

        this.iconBankerSmall = new ba.BASmallRoadIcon(16);
        this.iconBankerSmall.x = 228;
        this.iconBankerSmall.y = 16;
        this.iconBankerSmall.setByObject({ v: 'b' });
        this.addChild(this.iconBankerSmall);

        this.iconBankerCockroach = new ba.BACockroachRoadIcon(16);
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

        this.bigRoad = new ba.BABigRoad(32, gridSize);
        this.bigRoad.x = 0;
        this.bigRoad.y = 0;
        this.roadsContainer.addChild(this.bigRoad);

        this.bigEyeRoad = new ba.BABigEyeRoad(32 * 2, gridSize);
        this.bigEyeRoad.x = 0;
        this.bigEyeRoad.y = 6 * gridSize;
        this.roadsContainer.addChild(this.bigEyeRoad);

        this.smallRoad = new ba.BASmallRoad(16 * 2, gridSize);
        this.smallRoad.x = 0;
        this.smallRoad.y = 6 * gridSize + 6 * (gridSize / 2);
        this.roadsContainer.addChild(this.smallRoad);

        this.cockroachRoad = new ba.BACockroachRoad(16 * 2, gridSize);
        this.cockroachRoad.x = gridSize * 16;
        this.cockroachRoad.y = 6 * gridSize + 6 * (gridSize / 2);
        this.roadsContainer.addChild(this.cockroachRoad);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
      }

      public changeLang() {
        this.totalCountLabel.text = this.totalCount + '';
        this.playerButtonLabel.text = i18n.t('dragontiger.askDragon');
        this.bankerButtonLabel.text = i18n.t('dragontiger.askTiger');
      }

      // render text by tableInfo
      public update() {
        if (this.tableInfo) {
          if (this.tableInfo.gamestatistic) {
            this.bankerCountLabel.text = this.tableInfo.gamestatistic.bankerCount.toString();
            this.playerCountLabel.text = this.tableInfo.gamestatistic.playerCount.toString();
            this.tieCountLabel.text = this.tableInfo.gamestatistic.tieCount.toString();
            this.totalCount = this.tableInfo.gamestatistic.totalCount;
            this.changeLang();
          }
        }
      }

      // public destroy() {
      //   super.destroy();
      //   dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      // }
    }
  }
}
