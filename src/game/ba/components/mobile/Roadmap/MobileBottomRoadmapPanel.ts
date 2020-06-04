/* tslint:disable triple-equals */
namespace we {
  export namespace ba {
    export class MobileBottomRoadmapPanel extends core.BaseGamePanel implements IBARoadmapDisplayObject {
      public beadRoad: BABeadRoad;

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

      protected bankerCountLabel: ui.RunTimeLabel;
      protected playerCountLabel: ui.RunTimeLabel;
      protected tieCountLabel: ui.RunTimeLabel;
      protected bankerPairCountLabel: ui.RunTimeLabel;
      protected playerPairCountLabel: ui.RunTimeLabel;
      protected totalCountLabel: ui.RunTimeLabel;

      protected playerButtonLabel: ui.RunTimeLabel;
      protected bankerButtonLabel: ui.RunTimeLabel;

      protected totalCount: number;

      protected switchModeButton: eui.Component;

      protected roadsContainer: egret.DisplayObjectContainer;

      public constructor() {
        super();
      }

      public setTableInfo(tableInfo: data.TableInfo) {
        this.setTableInfo(tableInfo);
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        this.totalCount = 0;
        const numColumn = 8;

        switch (env.orientation) {
          case 'portrait':
            const gridSizeL = 73;
            const gridSizeR = 38;

            this.beadRoad = new BABeadRoad(numColumn, gridSizeL, 1, true);
            this.beadRoad.x = 0;
            this.beadRoad.y = 98;
            this.addChild(this.beadRoad);

            this.iconBankerBigEye = new BABigEyeRoadIcon(27);
            this.iconBankerBigEye.x = 146;
            this.iconBankerBigEye.y = 36;
            this.iconBankerBigEye.setByObject({ v: 'b' });
            this.addChild(this.iconBankerBigEye);

            this.iconBankerSmall = new BASmallRoadIcon(27);
            this.iconBankerSmall.x = 177;
            this.iconBankerSmall.y = 36;
            this.iconBankerSmall.setByObject({ v: 'b' });
            this.addChild(this.iconBankerSmall);

            this.iconBankerCockroach = new BACockroachRoadIcon(27);
            this.iconBankerCockroach.x = 208;
            this.iconBankerCockroach.y = 36;
            this.iconBankerCockroach.setByObject({ v: 'b' });
            this.addChild(this.iconBankerCockroach);

            this.iconPlayerBigEye = new BABigEyeRoadIcon(27);
            this.iconPlayerBigEye.x = 379;
            this.iconPlayerBigEye.y = 36;
            this.iconPlayerBigEye.setByObject({ v: 'p' });
            this.addChild(this.iconPlayerBigEye);

            this.iconPlayerSmall = new BASmallRoadIcon(27);
            this.iconPlayerSmall.x = 410;
            this.iconPlayerSmall.y = 36;
            this.iconPlayerSmall.setByObject({ v: 'p' });
            this.addChild(this.iconPlayerSmall);

            this.iconPlayerCockroach = new BACockroachRoadIcon(27);
            this.iconPlayerCockroach.x = 441;
            this.iconPlayerCockroach.y = 36;
            this.iconPlayerCockroach.setByObject({ v: 'p' });
            this.addChild(this.iconPlayerCockroach);

            this.roadsContainer = new egret.DisplayObjectContainer();
            this.roadsContainer.x = 0;
            this.roadsContainer.y = 0;
            this.addChild(this.roadsContainer);

            this.bigRoad = new BABigRoad(18, gridSizeR);
            this.bigRoad.x = 584;
            this.bigRoad.y = 98;
            this.roadsContainer.addChild(this.bigRoad);

            this.bigEyeRoad = new BABigEyeRoad(18 * 2, gridSizeR);
            this.bigEyeRoad.x = 584;
            this.bigEyeRoad.y = 98 + 6 * gridSizeR;
            this.roadsContainer.addChild(this.bigEyeRoad);

            this.smallRoad = new BASmallRoad(9 * 2, gridSizeR);
            this.smallRoad.x = 584;
            this.smallRoad.y = 98 + 6 * gridSizeR + 6 * (gridSizeR / 2);
            this.roadsContainer.addChild(this.smallRoad);

            this.cockroachRoad = new BACockroachRoad(9 * 2, gridSizeR);
            this.cockroachRoad.x = 584 + gridSizeR * 9;
            this.cockroachRoad.y = 98 + 6 * gridSizeR + 6 * (gridSizeR / 2);
            this.roadsContainer.addChild(this.cockroachRoad);

            break;

          case 'landscape':
            const gridSizeF = 43;

            this.beadRoad = new BABeadRoad(numColumn, gridSizeF, 1, true);
            this.beadRoad.x = 0;
            this.beadRoad.y = 0;
            this.addChild(this.beadRoad);

            this.roadsContainer = new egret.DisplayObjectContainer();
            this.roadsContainer.x = 0;
            this.roadsContainer.y = 0;
            this.addChild(this.roadsContainer);

            this.bigRoad = new BABigRoad(18, gridSizeF);
            this.bigRoad.x = 8 * gridSizeF;
            this.bigRoad.y = 0;
            this.roadsContainer.addChild(this.bigRoad);

            this.bigEyeRoad = new BABigEyeRoad(18 * 2, gridSizeF);
            this.bigEyeRoad.x = 26 * gridSizeF;
            this.bigEyeRoad.y = 0;
            this.roadsContainer.addChild(this.bigEyeRoad);

            this.smallRoad = new BASmallRoad(9 * 2, gridSizeF);
            this.smallRoad.x = 26 * gridSizeF;
            this.smallRoad.y = 3 * gridSizeF;
            this.roadsContainer.addChild(this.smallRoad);

            this.cockroachRoad = new BACockroachRoad(9 * 2, gridSizeF);
            this.cockroachRoad.x = 35 * gridSizeF;
            this.cockroachRoad.y = 3 * gridSizeF;
            this.roadsContainer.addChild(this.cockroachRoad);

            break;
        }

        this.switchModeButton.touchEnabled = true;
        this.switchModeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchModeClick, this);
        this.switchModeButton.x = 510;
        this.switchModeButton.y = 462;
        this.addChild(this.switchModeButton);
      }

      public setPredictIcons(b1: any, b2: any, b3: any, p1: any, p2: any, p3: any) {
        if (env.orientation === 'portrait') {
          this.iconBankerBigEye.setByObject(b1);
          this.iconBankerSmall.setByObject(b2);
          this.iconBankerCockroach.setByObject(b3);

          this.iconPlayerBigEye.setByObject(p1);
          this.iconPlayerSmall.setByObject(p2);
          this.iconPlayerCockroach.setByObject(p3);

          this.update();
        }
      }

      public update() {
        if (this.tableInfo) {
          if (this.tableInfo.gamestatistic) {
            if (this.tableInfo.gamestatistic.bankerCount) {
              this.bankerCountLabel.text = this.tableInfo.gamestatistic.bankerCount.toString();
            }
            if (this.tableInfo.gamestatistic.playerCount) {
              this.playerCountLabel.text = this.tableInfo.gamestatistic.playerCount.toString();
            }
            if (this.tableInfo.gamestatistic.tieCount) {
              this.tieCountLabel.text = this.tableInfo.gamestatistic.tieCount.toString();
            }
            if (this.tableInfo.gamestatistic.bankerPairCount) {
              this.bankerPairCountLabel.text = this.tableInfo.gamestatistic.bankerPairCount.toString();
            }
            if (this.tableInfo.gamestatistic.playerPairCount) {
              this.playerPairCountLabel.text = this.tableInfo.gamestatistic.playerPairCount.toString();
            }
            if (this.tableInfo.gamestatistic.totalCount) {
              this.totalCount = this.tableInfo.gamestatistic.totalCount;
            }
          }
        }
      }

      protected onSwitchModeClick(e: egret.TouchEvent) {
        this.beadRoad.Mode = ++this.beadRoad.Mode % 2;
      }

      public destroy() {
        super.destroy();
        this.beadRoad.dispose();
        this.bigRoad.dispose();
        this.bigEyeRoad.dispose();
        this.smallRoad.dispose();
        this.cockroachRoad.dispose();
        // this.removeChild(this.roadsContainer);

        if (this.switchModeButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this.switchModeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchModeClick, this);
        }
      }
    }
  }
}
