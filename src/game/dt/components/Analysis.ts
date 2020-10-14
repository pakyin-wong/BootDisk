namespace we {
  export namespace dt {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis, we.ba.IBARoadmapDisplayObject {
      protected _tableId;
      protected _playerAskLabel;
      protected _bankerAskLabel;

      protected _iconBankerBead: we.ba.BABeadRoadIcon;
      protected _iconPlayerBead: we.ba.BABeadRoadIcon;

      protected _dragonBeadGroup: eui.Group;
      protected _tigerBeadGroup: eui.Group;

      public iconBankerBigEye: we.ba.BABigEyeRoadIcon;
      public iconPlayerBigEye: we.ba.BABigEyeRoadIcon;
      public iconBankerSmall: we.ba.BASmallRoadIcon;
      public iconPlayerSmall: we.ba.BASmallRoadIcon;
      public iconBankerCockroach: we.ba.BACockroachRoadIcon;
      public iconPlayerCockroach: we.ba.BACockroachRoadIcon;

      // statisticChartPanels
      public _normalChartPanel: ba.StatisticChart;
      public _tieChartPanel: ba.StatisticChart;
      public _dealerChartPanel: ba.StatisticChart;

      public advancedRoad: we.ui.IAdvancedRoad;

      constructor() {
        super(env.isMobile ? null : 'dt.Analysis');
      }

      public set iconBankerBead(value: we.ba.BABeadRoadIcon) {
        this._iconBankerBead = value;
      }

      public get iconBankerBead() {
        return this._iconBankerBead;
      }

      public set iconPlayerBead(value: we.ba.BABeadRoadIcon) {
        this._iconPlayerBead = value;
      }

      public get iconPlayerBead() {
        return this._iconPlayerBead;
      }

      protected mount() {
        this._bankerAskLabel.renderText = () => i18n.t('dragontiger.askDragon');
        this._playerAskLabel.renderText = () => i18n.t('dragontiger.askTiger');

        this._dragonBeadGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.askBankerRoad, this);
        this._tigerBeadGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.askPlayerRoad, this);

        this._dragonBeadGroup.addChild(this.getBankerBeadIconGroup());
        this._tigerBeadGroup.addChild(this.getPlayerBeadIconGroup());

        mouse.setButtonMode(this._tigerBeadGroup, true);
        mouse.setButtonMode(this._dragonBeadGroup, true);
      }

      protected getBankerBeadIconGroup() {
        const bankerLayout = new eui.HorizontalLayout();
        bankerLayout.gap = 2;

        const bankerBeadIconGroup = new eui.Group();
        bankerBeadIconGroup.horizontalCenter = 0;
        bankerBeadIconGroup.y = 34;
        bankerBeadIconGroup.layout = bankerLayout;

        this.iconBankerBigEye = new ba.BABigEyeRoadIcon();
        this.iconBankerBigEye.width = 26;

        this.iconBankerSmall = new ba.BASmallRoadIcon();
        this.iconBankerSmall.width = 26;

        this.iconBankerCockroach = new ba.BACockroachRoadIcon();
        this.iconBankerCockroach.width = 26;

        bankerBeadIconGroup.addChild(this.iconBankerBigEye);
        bankerBeadIconGroup.addChild(this.iconBankerSmall);
        bankerBeadIconGroup.addChild(this.iconBankerCockroach);

        return bankerBeadIconGroup;
      }

      protected getPlayerBeadIconGroup() {
        const playerLayout = new eui.HorizontalLayout();
        playerLayout.gap = 2;

        const playerBeadIconGroup = new eui.Group();
        playerBeadIconGroup.horizontalCenter = 0;
        playerBeadIconGroup.y = 34;
        playerBeadIconGroup.layout = playerLayout;

        this.iconPlayerBigEye = new ba.BABigEyeRoadIcon();
        this.iconPlayerBigEye.width = 26;

        this.iconPlayerSmall = new ba.BASmallRoadIcon();
        this.iconPlayerSmall.width = 26;

        this.iconPlayerCockroach = new ba.BACockroachRoadIcon();
        this.iconPlayerCockroach.width = 26;

        playerBeadIconGroup.addChild(this.iconPlayerBigEye);
        playerBeadIconGroup.addChild(this.iconPlayerSmall);
        playerBeadIconGroup.addChild(this.iconPlayerCockroach);

        return playerBeadIconGroup;
      }

      public setPredictIcons(b1: any, b2: any, b3: any, p1: any, p2: any, p3: any) {
        this.iconBankerBigEye.setByObject(b1);
        this.iconBankerSmall.setByObject(b2);
        this.iconBankerCockroach.setByObject(b3);
        this.iconPlayerBigEye.setByObject(p1);
        this.iconPlayerSmall.setByObject(p2);
        this.iconPlayerCockroach.setByObject(p3);
      }

      public askBankerRoad(evt: egret.Event) {
        if (evt.target === this._iconBankerBead) {
          evt.stopPropagation();
          if (this.advancedRoad && this.advancedRoad instanceof we.dt.AdvancedRoad) {
            (<we.dt.AdvancedRoad>this.advancedRoad).askBankerRoad();
          }
        }
      }

      public askPlayerRoad(evt: egret.Event) {
        if (evt.target === this._iconPlayerBead) {
          evt.stopPropagation();
          if (this.advancedRoad && this.advancedRoad instanceof we.dt.AdvancedRoad) {
            (<we.dt.AdvancedRoad>this.advancedRoad).askPlayerRoad();
          }
        }
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

          const tieInfo = we.utils.stat.ba.getStatInfo(true, env.tableInfos[this._tableId].gamestatistic);

          this._tieChartPanel.firstCount = tieInfo.bankerCount;
          this._tieChartPanel.secondCount = tieInfo.playerCount;
          this._tieChartPanel.thirdCount = tieInfo.tieCount;
          this._tieChartPanel.firstPercentage = tieInfo.bankerPercentage;
          this._tieChartPanel.secondPercentage = tieInfo.playerPercentage;
          this._tieChartPanel.thirdPercentage = tieInfo.tiePercentage;
          this._tieChartPanel.total = tieInfo.totalCount;

          this._tieChartPanel.update();

          const dealerInfo = we.utils.stat.ba.getStatInfo(true, env.tableInfos[this._tableId].gamestatistic);

          this._dealerChartPanel.firstCount = dealerInfo.bankerCount;
          this._dealerChartPanel.secondCount = dealerInfo.playerCount;
          this._dealerChartPanel.thirdCount = dealerInfo.tieCount;
          this._dealerChartPanel.firstPercentage = dealerInfo.bankerPercentage;
          this._dealerChartPanel.secondPercentage = dealerInfo.playerPercentage;
          this._dealerChartPanel.thirdPercentage = dealerInfo.tiePercentage;
          this._dealerChartPanel.total = dealerInfo.totalCount;

          this._dealerChartPanel.update();
        }
      }
    }
  }
}
