namespace we {
  export namespace ba {
    export class AdvancedRoad extends ui.AdvancedRoad {
      // protected _tableInfo: data.TableInfo;
      public bigRoad: BABigRoad;
      public bigEyeRoad: BABigEyeRoad;
      public smallRoad: BASmallRoad;
      public cockroachRoad: BACockroachRoad;
      public beadRoad: BABeadRoad;
      // public iconBankerBead: BABeadRoadIcon;
      // public iconPlayerBead: BABeadRoadIcon;
      public analysis: we.ui.IAnalysis;
      protected _roadmapControl: BARoadmapControl;

      protected bankerCountLabel: ui.RunTimeLabel;
      protected playerCountLabel: ui.RunTimeLabel;
      protected tieCountLabel: ui.RunTimeLabel;
      protected bankerPairCountLabel: ui.RunTimeLabel;
      protected playerPairCountLabel: ui.RunTimeLabel;
      protected totalCountLabel: ui.RunTimeLabel;
      protected playerButtonLabel: ui.RunTimeLabel;
      protected bankerButtonLabel: ui.RunTimeLabel;

      protected totalCount: number;

      // protected roadsContainer: egret.DisplayObjectContainer;
      // protected roadsContainerDisplay: egret.Bitmap;
      // protected roadsContainerRT: egret.RenderTexture;

      public constructor(skin?: string) {
        super(skin);
      }

      // protected mount() {}

      protected initRoad() {
        const gridSize = 21;
        this.totalCount = 0;

        this.roadsContainer = new egret.DisplayObjectContainer();
        this.roadsContainer.x = 0;
        this.roadsContainer.y = 0;
        this.roadsContainer.scaleX = 584 / 672;
        this.roadsContainer.scaleY = 450 / 504;
        this.addChild(this.roadsContainer);
        this.roadsContainer.visible = false;

        this.roadsContainerRT = new egret.RenderTexture();
        this.roadsContainerDisplay = new egret.Bitmap();
        this.roadsContainerDisplay.texture = this.roadsContainerRT;
        this.roadsContainerDisplay.scaleX = 584 / 672;
        this.roadsContainerDisplay.scaleY = 450 / 504;
        this.addChild(this.roadsContainerDisplay);

        this.beadRoad = new BABeadRoad(16, gridSize * 2, 1, false);
        this.beadRoad.x = 0;
        this.beadRoad.y = 0;
        this.beadRoad.initRoadData();
        // this.beadRoad.scaleX = 690 / 689;
        // this.beadRoad.scaleY = 690 / 689;
        this.roadsContainer.addChild(this.beadRoad);

        this.bigRoad = new BABigRoad(32, gridSize);
        this.bigRoad.x = 0;
        this.bigRoad.y = 12 * gridSize;
        this.bigRoad.initRoadData();
        this.roadsContainer.addChild(this.bigRoad);

        this.bigEyeRoad = new BABigEyeRoad(32 * 2, gridSize);
        this.bigEyeRoad.x = 0;
        this.bigEyeRoad.y = 12 * gridSize + 6 * gridSize;
        this.bigEyeRoad.initRoadData();
        this.roadsContainer.addChild(this.bigEyeRoad);

        this.smallRoad = new BASmallRoad(16 * 2, gridSize);
        this.smallRoad.x = 0;
        this.smallRoad.y = 12 * gridSize + 6 * gridSize + 6 * (gridSize / 2);
        this.smallRoad.initRoadData();
        this.roadsContainer.addChild(this.smallRoad);

        this.cockroachRoad = new BACockroachRoad(16 * 2, gridSize);
        this.cockroachRoad.x = gridSize * 16;
        this.cockroachRoad.y = 12 * gridSize + 6 * gridSize + 6 * (gridSize / 2);
        this.cockroachRoad.initRoadData();
        this.roadsContainer.addChild(this.cockroachRoad);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        this._roadmapControl = new BARoadmapControl();
        this._roadmapControl.setRoads(this.beadRoad, this.bigRoad, this.bigEyeRoad, this.smallRoad, this.cockroachRoad, [16, 33, 66, 34, 32], null, null, false);

        // this.changeLang();
        // this.render();
      }

      public changeLang() {
        // this.totalCountLabel.text = this.totalCount + '';
        // this.playerButtonLabel.text = i18n.t('baccarat.askPlayer');
        // this.bankerButtonLabel.text = i18n.t('baccarat.askBanker');
      }

      public askBankerRoad() {
        if (this._roadmapControl) {
          this._roadmapControl.onBankerClick(null);
          this.roadsContainer.visible = true;
          this.roadsContainerDisplay.visible = false;
          this._roadmapControl.addEventListener(BARoadmapControl.CLEAR_PREDICT_EVENT, this.clearPredict, this);
        }
      }

      public askPlayerRoad() {
        if (this._roadmapControl) {
          this._roadmapControl.onPlayerClick(null);
          this.roadsContainer.visible = true;
          this.roadsContainerDisplay.visible = false;
          this._roadmapControl.addEventListener(BARoadmapControl.CLEAR_PREDICT_EVENT, this.clearPredict, this);
        }
      }

      protected clearPredict() {
        this.roadsContainer.visible = false;
        this.roadsContainerDisplay.visible = true;
      }

      // render text by tableInfo
      public update() {
        if (this.tableInfo) {
          if (this._roadmapControl) {
            this._roadmapControl.setTableInfo(this._tableInfo);
            this._roadmapControl.setRoads(this.beadRoad, this.bigRoad, this.bigEyeRoad, this.smallRoad, this.cockroachRoad, [16, 33, 66, 34, 32], this.analysis, null, false);

            // this._roadmapControl.updateRoadData();
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
          // this.render();
        }
        super.update();
      }

      public destroy() {
        super.destroy();

        this.bigRoad.dispose();
        this.bigEyeRoad.dispose();
        this.smallRoad.dispose();
        this.cockroachRoad.dispose();

        // if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
        //   dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        // }
      }
    }
  }
}
