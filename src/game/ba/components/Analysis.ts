namespace we {
  export namespace ba {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis, IBARoadmapDisplayObject {
      protected _tableId;

      protected _playerAskLabel: ui.RunTimeLabel;
      protected _bankerAskLabel: ui.RunTimeLabel;
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
      protected _iconBankerBead: BABeadRoadIcon;
      protected _iconPlayerBead: BABeadRoadIcon;
      protected _bankerBeadGroup: eui.Group;
      protected _playerBeadGroup: eui.Group;
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

        mouse.setButtonMode(this._bankerBeadGroup, true);
        mouse.setButtonMode(this._playerBeadGroup, true);
      }

      public askBankerRoad(evt: egret.Event) {
        if (evt.target === this._iconBankerBead) {
          evt.stopPropagation();
          if (this.advancedRoad && this.advancedRoad instanceof we.ba.AdvancedRoad) {
            (<we.ba.AdvancedRoad>this.advancedRoad).askBankerRoad();
          }
        }
      }

      public askPlayerRoad(evt: egret.Event) {
        if (evt.target === this._iconPlayerBead) {
          evt.stopPropagation();
          if (this.advancedRoad && this.advancedRoad instanceof we.ba.AdvancedRoad) {
            (<we.ba.AdvancedRoad>this.advancedRoad).askPlayerRoad();
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

          // console.log('normalChart', bankerPercentage, playerPercentage);
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
