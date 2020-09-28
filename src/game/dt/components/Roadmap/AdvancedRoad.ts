namespace we {
  export namespace dt {
    export class AdvancedRoad extends ui.AdvancedRoad {
      // protected _tableInfo: data.TableInfo;
      public bigRoad: we.ba.BABigRoad;
      public bigEyeRoad: we.ba.BABigEyeRoad;
      public smallRoad: we.ba.BASmallRoad;
      public cockroachRoad: we.ba.BACockroachRoad;
      public beadRoad: we.dt.DTBeadRoad;
      protected _roadmapControl: we.dt.DTRoadmapControl;

      protected bankerCountLabel: ui.RunTimeLabel;
      protected playerCountLabel: ui.RunTimeLabel;
      protected tieCountLabel: ui.RunTimeLabel;
      protected bankerPairCountLabel: ui.RunTimeLabel;
      protected playerPairCountLabel: ui.RunTimeLabel;
      protected totalCountLabel: ui.RunTimeLabel;
      protected playerButtonLabel: ui.RunTimeLabel;
      protected bankerButtonLabel: ui.RunTimeLabel;

      // protected roadsContainer: egret.DisplayObjectContainer;

      protected totalCount: number;

      public analysis: we.ui.IAnalysis;

      public constructor(skin?: string) {
        super(skin);
      }

      protected initRoad() {
        const gridSize = 21;
        this.totalCount = 0;

        const bgShape = new ui.RoundRectShape();
        bgShape.setRoundRectStyle(580, 437, { tl: 0, tr: 12, bl: 0, br: 12 }, '0xffffff', 1, 0);
        this.addChild(bgShape);
        bgShape.x = 0;
        bgShape.y = 2;

        this.roadsContainer = new egret.DisplayObjectContainer();
        this.roadsContainer.scaleX = 576 / 672;
        this.roadsContainer.scaleY = 433 / 504;
        this.addChild(this.roadsContainer);
        this.roadsContainer.x = 2;
        this.roadsContainer.y = 4;

        // this.roadsContainerRT = new egret.RenderTexture();
        this.roadsContainerDisplay = new egret.Bitmap();
        // this.roadsContainerDisplay.texture = this.roadsContainerRT;
        this.roadsContainerDisplay.scaleY = 433 / 432;
        this.addChild(this.roadsContainerDisplay);
        this.roadsContainerDisplay.visible = false;

        this.beadRoad = new we.dt.DTBeadRoad(16, gridSize * 2, 1, false);
        this.beadRoad.x = 0;
        this.beadRoad.y = 0;
        this.beadRoad.initRoadData();
        this.beadRoad.setGridCorners({ tl: 0, tr: 14, br: 0, bl: 0 });
        // this.beadRoad.scaleX = 690 / 689;
        // this.beadRoad.scaleY = 690 / 689;
        this.roadsContainer.addChild(this.beadRoad);

        this.bigRoad = new we.ba.BABigRoad(32, gridSize);
        this.bigRoad.x = 0;
        this.bigRoad.y = 12 * gridSize;
        this.bigRoad.initRoadData();
        this.roadsContainer.addChild(this.bigRoad);

        this.bigEyeRoad = new we.ba.BABigEyeRoad(32 * 2, gridSize);
        this.bigEyeRoad.x = 0;
        this.bigEyeRoad.y = 12 * gridSize + 6 * gridSize;
        this.bigEyeRoad.initRoadData();
        this.roadsContainer.addChild(this.bigEyeRoad);

        this.smallRoad = new we.ba.BASmallRoad(16 * 2, gridSize);
        this.smallRoad.x = 0;
        this.smallRoad.y = 12 * gridSize + 6 * gridSize + 6 * (gridSize / 2);
        this.smallRoad.initRoadData();
        this.roadsContainer.addChild(this.smallRoad);

        this.cockroachRoad = new we.ba.BACockroachRoad(16 * 2, gridSize);
        this.cockroachRoad.x = gridSize * 16;
        this.cockroachRoad.y = 12 * gridSize + 6 * gridSize + 6 * (gridSize / 2);
        this.cockroachRoad.setGridCorners({ tl: 0, tr: 0, br: 14, bl: 0 });
        this.cockroachRoad.initRoadData();
        this.roadsContainer.addChild(this.cockroachRoad);

        // dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        // this.changeLang();

        this._roadmapControl = new we.dt.DTRoadmapControl();
        this._roadmapControl.setRoads(this.beadRoad, this.bigRoad, this.bigEyeRoad, this.smallRoad, this.cockroachRoad, [16, 33, 66, 34, 32], null, null, false);
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
          this._roadmapControl.addEventListener(DTRoadmapControl.CLEAR_PREDICT_EVENT, this.clearPredict, this);
        }
      }

      public askPlayerRoad() {
        if (this._roadmapControl) {
          this._roadmapControl.onPlayerClick(null);
          this.roadsContainer.visible = true;
          this.roadsContainerDisplay.visible = false;
          this._roadmapControl.addEventListener(DTRoadmapControl.CLEAR_PREDICT_EVENT, this.clearPredict, this);
        }
      }

      protected clearPredict() {
        this.roadsContainer.visible = false;
        this.roadsContainerDisplay.visible = true;
      }

      // render text by tableInfo
      public update() {
        if (this.tableInfo) {
          if (!this._roadmapControl) {
            this._roadmapControl = new DTRoadmapControl(this._tableInfo.tableid);
          }
          if (this._roadmapControl) {
            this._roadmapControl.setRoads(this.beadRoad, this.bigRoad, this.bigEyeRoad, this.smallRoad, this.cockroachRoad, [16, 33, 66, 34, 32], this.analysis, null, false);
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
        super.update();
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

        // if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
        //   dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        // }
      }
    }
  }
}
