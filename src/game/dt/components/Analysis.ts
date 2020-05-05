namespace we {
  export namespace dt {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis, we.ba.IBARoadmapDisplayObject {
      protected _tableId;
      protected _playerAskLabel;
      protected _bankerAskLabel;
      protected _playerCount;
      protected _bankerCount;
      protected _tieCount;
      protected _playerPairCount;
      protected _bankerPairCount;
      protected _remainingCount;
      protected _normalTotal;
      protected _pairTotal;
      protected _playerPercentage;
      protected _bankerPercentage;
      protected _tiePercentage;
      protected _playerPairPercentage;
      protected _bankerPairPercentage;
      protected _remainingPercentage;
      protected _normalChart: ui.SimpleChart;
      protected _pairChart: ui.SimpleChart;
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

      public updateTableBetInfo() { }

      public updateRoad() {
        if (!this._tableId) {
          return;
        }
        if (env && env.tableInfos && env.tableInfos[this._tableId] && env.tableInfos[this._tableId].gamestatistic) {
          const bankerCount = env.tableInfos[this._tableId].gamestatistic.bankerCount;
          const playerCount = env.tableInfos[this._tableId].gamestatistic.playerCount;
          const tieCount = env.tableInfos[this._tableId].gamestatistic.tieCount;
          const totalCount = env.tableInfos[this._tableId].gamestatistic.totalCount;
          const bankerPairCount = env.tableInfos[this._tableId].gamestatistic.bankerPairCount;
          const playerPairCount = env.tableInfos[this._tableId].gamestatistic.playerPairCount;
          const remainingCount = totalCount - bankerPairCount - playerPairCount;

          this._bankerCount.text = bankerCount;
          this._playerCount.text = playerCount;
          this._tieCount.text = tieCount;
          this._normalTotal.text = totalCount;
          this._bankerPairCount.text = bankerPairCount;
          this._playerPairCount.text = playerPairCount;
          this._remainingCount.text = remainingCount;
          this._pairTotal.text = totalCount;

          const bankerPercentage = bankerCount / totalCount;
          const playerPercentage = playerCount / totalCount;
          const tiePercentage = tieCount / totalCount;

          this._bankerPercentage.text = Math.round(bankerPercentage * 100);
          this._playerPercentage.text = Math.round(playerPercentage * 100);
          this._tiePercentage.text = Math.round(tiePercentage * 100);

          console.log('normalChart', bankerPercentage, playerPercentage);
          this._normalChart.redAngle = bankerPercentage * 360;
          this._normalChart.blueAngle = playerPercentage * 360;
          this._normalChart.drawChart();

          const bankerPairPercentage = bankerPairCount / totalCount;
          const playerPairPercentage = playerPairCount / totalCount;
          const remainingPercentage = remainingCount / totalCount;

          this._bankerPairPercentage.text = Math.round(bankerPercentage * 100);
          this._playerPairPercentage.text = Math.round(playerPercentage * 100);
          this._remainingPercentage.text = Math.round(remainingPercentage * 100);

          this._pairChart.redAngle = (bankerPairCount / totalCount) * 360;
          this._pairChart.blueAngle = (playerPairCount / totalCount) * 360;
          this._pairChart.drawChart();
        }
      }
    }
  }
}
