namespace we {
  export namespace di {
    export class AdvancedRoad extends ui.AdvancedRoad {
      // protected _tableInfo: data.TableInfo;

      public beadRoad: we.di.DiBeadRoad;
      public sizeBigRoad: DiSizeBigRoad;
      public oddBigRoad: DiOddBigRoad;
      protected _roadmapControl: we.di.DiRoadmapControl;

      public analysis: we.ui.IAnalysis;

      // protected roadsContainer: egret.DisplayObjectContainer;

      protected totalCount: number;

      public constructor(skin?: string) {
        super(skin);
      }

      // public set tableInfo(value: data.TableInfo) {
      //   this._tableInfo = value;
      // }

      // public get tableInfo() {
      //   return this._tableInfo;
      // }

      // protected mount() {
      //   this.init();
      // }

      protected initRoad() {
        const layout = new eui.VerticalLayout();
        const group = new eui.Group();
        group.layout = layout;

        const bgShape = new ui.RoundRectShape();
        bgShape.setRoundRectStyle(580, 437, { tl: 0, tr: 12, bl: 0, br: 12 }, '0xffffff', 1, 0);
        this.addChild(bgShape);
        bgShape.x = 0;
        bgShape.y = 2;

        const options = {
          paddingX: 2,
          paddingY: 2,
          gapX: 4,
          gapY: 10,
          iconItemColors: [0xe4493a, 0x6dd400, 0x2da1fe, 0x184077, 1],
          iconHeight: 149,
          iconItemYOffset: 4,
          textPadding: 1,
          textSize: 20,
          diceSize: 26,
          highlightRadius: 8,
          firstItemPadding: 5,
          showOuterGrid: true,
          showGrid: true,
        };

        this.beadRoad = new DiBeadRoad(580, 1, 13, 46, 1, options); // in game
        this.beadRoad.x = 1;
        this.beadRoad.y = 2;
        this.beadRoad.scaleX = 1;
        this.beadRoad.width = 576;
        this.beadRoad.height = 157;
        this.beadRoad.expandRoad(false);
        this.beadRoad.initRoadData();
        this.beadRoad.setGridCorners({ tl: 0, tr: 12, br: 0, bl: 0 });

        this.sizeBigRoad = new DiSizeBigRoad(25, 24, 1, false);
        this.sizeBigRoad.x = 1;
        this.sizeBigRoad.y = 157;
        this.sizeBigRoad.scaleX = 576 / 600;
        this.sizeBigRoad.scaleY = 138 / 144;
        this.sizeBigRoad.initRoadData();

        this.oddBigRoad = new DiOddBigRoad(25, 24, 1, false);
        this.oddBigRoad.x = 1;
        this.oddBigRoad.y = 157 + 138;
        this.oddBigRoad.scaleX = 576 / 600;
        this.oddBigRoad.scaleY = 138 / 144;
        this.oddBigRoad.initRoadData();
        this.oddBigRoad.setGridCorners({ tl: 0, tr: 0, br: 12, bl: 0 });

        this.roadsContainer = new egret.DisplayObjectContainer();
        this.roadsContainer.x = 0;
        this.roadsContainer.y = 2;
        // this.roadsContainer.scaleX = 584 / 600;
        // this.roadsContainer.scaleY = 450 / (159 + 12 * 24);
        this.addChild(this.roadsContainer);

        this.roadsContainer.addChild(this.beadRoad);
        this.roadsContainer.addChild(this.sizeBigRoad);
        this.roadsContainer.addChild(this.oddBigRoad);

        // this.roadsContainerRT = new egret.RenderTexture();
        this.roadsContainerDisplay = new egret.Bitmap();
        // this.roadsContainerDisplay.texture = this.roadsContainerRT;
        this.roadsContainerDisplay.scaleX = 584 / 600;
        this.roadsContainerDisplay.scaleY = 450 / (190 + 12 * 24);
        this.addChild(this.roadsContainerDisplay);

        // dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        // this.changeLang();
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
            this._roadmapControl = new DiRoadmapControl(this._tableInfo.tableid);
            this._roadmapControl.setRoads(this.beadRoad, null, this.sizeBigRoad, this.oddBigRoad, null, null, null);
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

        this.beadRoad.dispose();
        this.sizeBigRoad.dispose();
        this.oddBigRoad.dispose();

        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }
    }
  }
}
