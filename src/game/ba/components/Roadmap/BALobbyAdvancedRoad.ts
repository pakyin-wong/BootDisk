namespace we {
  export namespace ba {
    export class BALobbyAdvancedRoad extends core.BaseEUI implements we.ui.IAdvancedRoad {
      protected _tableInfo: data.TableInfo;
      public bigRoad: BABigRoad;
      public bigEyeRoad: BABigEyeRoad;
      public smallRoad: BASmallRoad;
      public cockroachRoad: BACockroachRoad;
      public beadRoad: BABeadRoad;
      protected _roadmapControl: BARoadmapControl;

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
        super(skin);
      }

      public set tableInfo(value: data.TableInfo) {
        this._tableInfo = value;
      }

      public get tableInfo() {
        return this._tableInfo;
      }

      protected mount() {
        this.init();
      }

      protected init() {
        const gridSize = 21;
        this.totalCount = 0;

        this.roadsContainer = new egret.DisplayObjectContainer();
        this.roadsContainer.x = 0;
        this.roadsContainer.y = 0;
        // this.roadsContainer.scaleX = 584 / 672;
        this.roadsContainer.scaleX = 584 / 672;
        this.roadsContainer.scaleY = 0.9;
        // this.roadsContainer.alpha = 0.5;
        this.addChild(this.roadsContainer);

        this.beadRoad = new BABeadRoad(16, gridSize, 2, false);
        this.beadRoad.x = 0;
        this.beadRoad.y = 0;
        this.beadRoad.scaleX = 690 / 689;
        // this.beadRoad.scaleY = 690 / 689;
        this.roadsContainer.addChild(this.beadRoad);

        this.bigRoad = new BABigRoad(32, gridSize);
        this.bigRoad.x = 0;
        this.bigRoad.y = 12 * gridSize;
        this.roadsContainer.addChild(this.bigRoad);

        this.bigEyeRoad = new BABigEyeRoad(32 * 2, gridSize);
        this.bigEyeRoad.x = 0;
        this.bigEyeRoad.y = 12 * gridSize + 6 * gridSize;
        this.roadsContainer.addChild(this.bigEyeRoad);

        this.smallRoad = new BASmallRoad(16 * 2, gridSize);
        this.smallRoad.x = 0;
        this.smallRoad.y = 12 * gridSize + 6 * gridSize + 6 * (gridSize / 2);
        this.roadsContainer.addChild(this.smallRoad);

        this.cockroachRoad = new BACockroachRoad(16 * 2, gridSize);
        this.cockroachRoad.x = gridSize * 16;
        this.cockroachRoad.y = 12 * gridSize + 6 * gridSize + 6 * (gridSize / 2);
        this.roadsContainer.addChild(this.cockroachRoad);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        this.changeLang();
      }

      public changeLang() {
        // this.totalCountLabel.text = this.totalCount + '';
        // this.playerButtonLabel.text = i18n.t('baccarat.askPlayer');
        // this.bankerButtonLabel.text = i18n.t('baccarat.askBanker');
      }

      // render text by tableInfo
      public update() {
        if (this.tableInfo) {
          if (!this._roadmapControl) {
            this._roadmapControl = new BARoadmapControl(this._tableInfo.tableid);
            this._roadmapControl.setRoads(this.beadRoad, this.bigRoad, this.bigEyeRoad, this.smallRoad, this.cockroachRoad, [16, 33, 66, 34, 32], null, null, false);
          }
          if (this._roadmapControl) {
            this._roadmapControl.setTableInfo(this._tableInfo);
            this._roadmapControl.updateRoadData();
          }
          if (this.tableInfo.gamestatistic) {
            // this.bankerCountLabel.text = this.tableInfo.gamestatistic.bankerCount.toString();
            // this.playerCountLabel.text = this.tableInfo.gamestatistic.playerCount.toString();
            // this.tieCountLabel.text = this.tableInfo.gamestatistic.tieCount.toString();
            // this.bankerPairCountLabel.text = this.tableInfo.gamestatistic.bankerPairCount.toString();
            // this.playerPairCountLabel.text = this.tableInfo.gamestatistic.playerPairCount.toString();
            // this.totalCount = this.tableInfo.gamestatistic.totalCount;
            // this.changeLang();
          }
        }
      }

      // called by BaRoadmapControl
      /*
      public setPredictIcons(b1: any, b2: any, b3: any, p1: any, p2: any, p3: any) {
        this.iconBankerBigEye.setByObject(b1);
        this.iconBankerSmall.setByObject(b2);
        this.iconBankerCockroach.setByObject(b3);

        this.iconPlayerBigEye.setByObject(p1);
        this.iconPlayerSmall.setByObject(p2);
        this.iconPlayerCockroach.setByObject(p3);

        this.update();
      }*/

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
