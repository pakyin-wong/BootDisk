namespace we {
  export namespace ba {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis, IBARoadmapDisplayObject {
      protected _tableId;

      protected _playerAskLabel: ui.RunTimeLabel;
      protected _bankerAskLabel: ui.RunTimeLabel;

      protected _iconBankerBead: BABeadRoadIcon;
      protected _iconPlayerBead: BABeadRoadIcon;
      protected _bankerBeadGroup: eui.Group;
      protected _playerBeadGroup: eui.Group;
      protected _analysisGroup: eui.Group;

      // statisticChartPanels
      public _normalChartPanel: ba.StatisticChart;
      public _normalPairChartPanel: ba.StatisticChart;
      public _shoeChartPanel: ba.StatisticChart;
      public _shoePairChartPanel: ba.StatisticChart;

      public advancedRoad: we.ui.IAdvancedRoad;

      public iconBankerBigEye: BABigEyeRoadIcon;
      public iconPlayerBigEye: BABigEyeRoadIcon;
      public iconBankerSmall: BASmallRoadIcon;
      public iconPlayerSmall: BASmallRoadIcon;
      public iconBankerCockroach: BACockroachRoadIcon;
      public iconPlayerCockroach: BACockroachRoadIcon;

      constructor() {
        super(env.isMobile ? null : 'ba.Analysis');
      }

      public set iconBankerBead(value: BABeadRoadIcon) {
        this._iconBankerBead = value;
      }

      public get iconBankerBead() {
        return this._iconBankerBead;
      }

      public set iconPlayerBead(value: BABeadRoadIcon) {
        this._iconPlayerBead = value;
      }

      public get iconPlayerBead() {
        return this._iconPlayerBead;
      }

      public setPredictIcons(b1: any, b2: any, b3: any, p1: any, p2: any, p3: any) {
        this.iconBankerBigEye.setByObject(b1);
        this.iconBankerSmall.setByObject(b2);
        this.iconBankerCockroach.setByObject(b3);
        this.iconPlayerBigEye.setByObject(p1);
        this.iconPlayerSmall.setByObject(p2);
        this.iconPlayerCockroach.setByObject(p3);
      }

      protected mount() {
        this._bankerBeadGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.askBankerRoad, this);
        this._playerBeadGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.askPlayerRoad, this);
        this._analysisGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stopProg, this);

        this._bankerAskLabel.renderText = () => i18n.t('baccarat.askBanker');
        this._playerAskLabel.renderText = () => i18n.t('baccarat.askPlayer');

        this.iconBankerBigEye = new BABigEyeRoadIcon();
        this.iconBankerBigEye.x = 20;
        this.iconBankerBigEye.y = 34;
        this.iconBankerBigEye.width = 14;
        this.iconBankerBigEye.height = 14;

        this.iconBankerSmall = new BASmallRoadIcon();
        this.iconBankerSmall.horizontalCenter = 0;
        this.iconBankerSmall.y = 34;
        this.iconBankerSmall.width = 14;
        this.iconBankerSmall.height = 14;

        this.iconBankerCockroach = new BACockroachRoadIcon();
        this.iconBankerCockroach.right = 20;
        this.iconBankerCockroach.y = 34;
        this.iconBankerCockroach.width = 14;
        this.iconBankerCockroach.height = 14;

        this.iconPlayerBigEye = new BABigEyeRoadIcon();
        this.iconPlayerBigEye.x = 20;
        this.iconPlayerBigEye.y = 34;
        this.iconPlayerBigEye.width = 14;
        this.iconPlayerBigEye.height = 14;

        this.iconPlayerSmall = new BASmallRoadIcon();
        this.iconPlayerSmall.horizontalCenter = 0;
        this.iconPlayerSmall.y = 34;
        this.iconPlayerSmall.width = 14;
        this.iconPlayerSmall.height = 14;

        this.iconPlayerCockroach = new BACockroachRoadIcon();
        this.iconPlayerCockroach.right = 20;
        this.iconPlayerCockroach.y = 34;
        this.iconPlayerCockroach.width = 14;
        this.iconPlayerCockroach.height = 14;

        this._bankerBeadGroup.addChild(this.iconBankerBigEye);
        this._bankerBeadGroup.addChild(this.iconBankerSmall);
        this._bankerBeadGroup.addChild(this.iconBankerCockroach);

        this._playerBeadGroup.addChild(this.iconPlayerBigEye);
        this._playerBeadGroup.addChild(this.iconPlayerSmall);
        this._playerBeadGroup.addChild(this.iconPlayerCockroach);

        mouse.setButtonMode(this._analysisGroup, true);
        mouse.setButtonMode(this._bankerBeadGroup, true);
        mouse.setButtonMode(this._playerBeadGroup, true);
      }

      public askBankerRoad(evt: egret.Event) {
        if (evt.target === this._iconBankerBead) {
          evt.stopPropagation();
          if (this.advancedRoad && this.advancedRoad instanceof we.ba.AdvancedRoad) {
            (<we.ba.AdvancedRoad> this.advancedRoad).askBankerRoad();
          }
        }
      }

      public askPlayerRoad(evt: egret.Event) {
        if (evt.target === this._iconPlayerBead) {
          evt.stopPropagation();
          if (this.advancedRoad && this.advancedRoad instanceof we.ba.AdvancedRoad) {
            (<we.ba.AdvancedRoad> this.advancedRoad).askPlayerRoad();
          }
        }
      }

      public stopProg(evt: egret.Event) {
        evt.stopPropagation();
      }

      public set tableId(value: string) {
        this._tableId = value;
      }

      public get tableId() {
        return this._tableId;
      }

      public updateTableBetInfo() {}

      public updateRoad() {
        if (!this._tableId) {
          return;
        }
        if (env && env.tableInfos && env.tableInfos[this._tableId] && env.tableInfos[this._tableId].gamestatistic) {
          const normalInfo = we.utils.stat.ba.getStatInfo(false, env.tableInfos[this._tableId].gamestatistic);

          this._normalChartPanel.firstCount = normalInfo.bankerCount;
          this._normalChartPanel.secondCount = normalInfo.playerCount;
          this._normalChartPanel.thirdCount = normalInfo.tieCount;
          this._normalChartPanel.firstPercentage = normalInfo.bankerPercentage;
          this._normalChartPanel.secondPercentage = normalInfo.playerPercentage;
          this._normalChartPanel.thirdPercentage = normalInfo.tiePercentage;
          this._normalChartPanel.total = normalInfo.totalCount;
          this._normalChartPanel.update();

          this._normalPairChartPanel.firstCount = normalInfo.bankerPairCount;
          this._normalPairChartPanel.secondCount = normalInfo.playerPairCount;
          this._normalPairChartPanel.thirdCount = normalInfo.remainingCount;
          this._normalPairChartPanel.firstPercentage = normalInfo.bankerPairPercentage;
          this._normalPairChartPanel.secondPercentage = normalInfo.playerPairPercentage;
          this._normalPairChartPanel.thirdPercentage = normalInfo.remainingPercentage;
          this._normalPairChartPanel.total = normalInfo.totalCount;
          this._normalPairChartPanel.update();

          const shoeInfo = we.utils.stat.ba.getStatInfo(true, env.tableInfos[this._tableId].gamestatistic);

          this._shoeChartPanel.firstCount = shoeInfo.bankerCount;
          this._shoeChartPanel.secondCount = shoeInfo.playerCount;
          this._shoeChartPanel.thirdCount = shoeInfo.tieCount;
          this._shoeChartPanel.firstPercentage = shoeInfo.bankerPercentage;
          this._shoeChartPanel.secondPercentage = shoeInfo.playerPercentage;
          this._shoeChartPanel.thirdPercentage = shoeInfo.tiePercentage;
          this._shoeChartPanel.total = shoeInfo.totalCount;

          this._shoeChartPanel.update();

          this._shoePairChartPanel.firstCount = shoeInfo.bankerPairCount;
          this._shoePairChartPanel.secondCount = shoeInfo.playerPairCount;
          this._shoePairChartPanel.thirdCount = shoeInfo.remainingCount;
          this._shoePairChartPanel.firstPercentage = shoeInfo.bankerPairPercentage;
          this._shoePairChartPanel.secondPercentage = shoeInfo.playerPairPercentage;
          this._shoePairChartPanel.thirdPercentage = shoeInfo.remainingPercentage;
          this._shoePairChartPanel.total = shoeInfo.totalCount;
          this._shoePairChartPanel.update();
        }
      }
    }
  }
}
