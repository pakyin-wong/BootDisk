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

        this.iconBankerBigEye = new we.ba.BABigEyeRoadIcon();
        this.iconBankerBigEye.x = 20;
        this.iconBankerBigEye.y = 34;
        this.iconBankerBigEye.width = 14;
        this.iconBankerBigEye.height = 14;

        this.iconBankerSmall = new we.ba.BASmallRoadIcon();
        this.iconBankerSmall.horizontalCenter = 0;
        this.iconBankerSmall.y = 34;
        this.iconBankerSmall.width = 14;
        this.iconBankerSmall.height = 14;

        this.iconBankerCockroach = new we.ba.BACockroachRoadIcon();
        this.iconBankerCockroach.right = 20;
        this.iconBankerCockroach.y = 34;
        this.iconBankerCockroach.width = 14;
        this.iconBankerCockroach.height = 14;

        this.iconPlayerBigEye = new we.ba.BABigEyeRoadIcon();
        this.iconPlayerBigEye.x = 20;
        this.iconPlayerBigEye.y = 34;
        this.iconPlayerBigEye.width = 14;
        this.iconPlayerBigEye.height = 14;

        this.iconPlayerSmall = new we.ba.BASmallRoadIcon();
        this.iconPlayerSmall.horizontalCenter = 0;
        this.iconPlayerSmall.y = 34;
        this.iconPlayerSmall.width = 14;
        this.iconPlayerSmall.height = 14;

        this.iconPlayerCockroach = new we.ba.BACockroachRoadIcon();
        this.iconPlayerCockroach.right = 20;
        this.iconPlayerCockroach.y = 34;
        this.iconPlayerCockroach.width = 14;
        this.iconPlayerCockroach.height = 14;

        this._dragonBeadGroup.addChild(this.iconBankerBigEye);
        this._dragonBeadGroup.addChild(this.iconBankerSmall);
        this._dragonBeadGroup.addChild(this.iconBankerCockroach);

        this._tigerBeadGroup.addChild(this.iconPlayerBigEye);
        this._tigerBeadGroup.addChild(this.iconPlayerSmall);
        this._tigerBeadGroup.addChild(this.iconPlayerCockroach);

        mouse.setButtonMode(this._tigerBeadGroup, true);
        mouse.setButtonMode(this._dragonBeadGroup, true);
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
