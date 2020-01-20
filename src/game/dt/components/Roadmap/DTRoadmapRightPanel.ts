namespace we {
  export namespace dt {
    export class DTRoadmapRightPanel extends ba.BARoadmapRightPanel {
      public constructor(skin?: string) {
        super(skin ? skin : 'dt/DTRoadmapRightPanel');
      }

      protected init() {
        const gridSize = 21;
        this.totalCount = 0;

        this.iconBankerBead = new DTBeadRoadIcon(30);
        this.iconBankerBead.x = 10;
        this.iconBankerBead.y = 9;
        this.iconBankerBead.setByObject({ v: 'b' });
        this.addChild(this.iconBankerBead);

        this.iconBankerBigEye = new ba.BABigEyeRoadIcon(18);
        this.iconBankerBigEye.x = 77;
        this.iconBankerBigEye.y = 16;
        this.iconBankerBigEye.setByObject({ v: 'b' });
        this.addChild(this.iconBankerBigEye);

        this.iconBankerSmall = new ba.BASmallRoadIcon(18);
        this.iconBankerSmall.x = 95;
        this.iconBankerSmall.y = 16;
        this.iconBankerSmall.setByObject({ v: 'b' });
        this.addChild(this.iconBankerSmall);

        this.iconBankerCockroach = new ba.BACockroachRoadIcon(18);
        this.iconBankerCockroach.x = 113;
        this.iconBankerCockroach.y = 16;
        this.iconBankerCockroach.setByObject({ v: 'b' });
        this.addChild(this.iconBankerCockroach);

        this.iconPlayerBead = new DTBeadRoadIcon(30);
        this.iconPlayerBead.x = 143;
        this.iconPlayerBead.y = 9;
        this.iconPlayerBead.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerBead);

        this.iconPlayerBigEye = new ba.BABigEyeRoadIcon(18);
        this.iconPlayerBigEye.x = 210;
        this.iconPlayerBigEye.y = 16;
        this.iconPlayerBigEye.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerBigEye);

        this.iconPlayerSmall = new ba.BASmallRoadIcon(18);
        this.iconPlayerSmall.x = 228;
        this.iconPlayerSmall.y = 16;
        this.iconPlayerSmall.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerSmall);

        this.iconPlayerCockroach = new ba.BACockroachRoadIcon(18);
        this.iconPlayerCockroach.x = 246;
        this.iconPlayerCockroach.y = 16;
        this.iconPlayerCockroach.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerCockroach);

        this.roadsContainer = new egret.DisplayObjectContainer();
        this.roadsContainer.x = 4;
        this.roadsContainer.y = 47;
        this.roadsContainer.scaleX = 690 / 693;
        this.roadsContainer.scaleY = 260 / 257;
        // this.roadsContainer.alpha = 0.5;
        this.addChild(this.roadsContainer);

        this.bigRoad = new ba.BABigRoad(33, gridSize);
        this.bigRoad.x = 0;
        this.bigRoad.y = 0;
        this.roadsContainer.addChild(this.bigRoad);

        this.bigEyeRoad = new ba.BABigEyeRoad(33 * 2, gridSize);
        this.bigEyeRoad.x = 0;
        this.bigEyeRoad.y = 6 * gridSize;
        this.roadsContainer.addChild(this.bigEyeRoad);

        this.smallRoad = new ba.BASmallRoad(17 * 2, gridSize);
        this.smallRoad.x = 0;
        this.smallRoad.y = 6 * gridSize + 6 * (gridSize / 2);
        this.roadsContainer.addChild(this.smallRoad);

        this.cockroachRoad = new ba.BACockroachRoad(16 * 2, gridSize);
        this.cockroachRoad.x = gridSize * 17;
        this.cockroachRoad.y = 6 * gridSize + 6 * (gridSize / 2);
        this.roadsContainer.addChild(this.cockroachRoad);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
      }

      public changeLang() {
        this.totalCountLabel.text = i18n.t('baccarat.totalcount') + ' ' + this.totalCount;
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
    }
  }
}
