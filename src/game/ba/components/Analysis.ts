namespace we {
  export namespace ba {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis {
      protected _tableId;
      protected _advancedRoad: AdvancedRoad;
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
      protected _iconBankerBead: eui.Image;
      protected _iconPlayerBead: eui.Image;

      constructor() {
        super('ba.Analysis');
      }

      protected mount() {
        this._playerAskLabel.text = i18n.t('baccarat.askPlayer');
        this._bankerAskLabel.text = i18n.t('baccarat.askBanker');
        this._iconBankerBead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.askBankerRoad, this);
        this._iconPlayerBead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.askPlayerRoad, this);
      }

      public askBankerRoad(evt: egret.Event) {
        // console.log('askBanker', this.parent instanceof we.ui.LiveListAdvancedItem);
        // console.log(this);
        // console.log(this.parent);
        if (this.parent && this.parent instanceof we.ui.LiveListAdvancedItem) {
          if ((<we.ui.LiveListAdvancedItem> this.parent).advancedRoad && (<we.ui.LiveListAdvancedItem> this.parent).advancedRoad instanceof we.ba.AdvancedRoad) {
            // console.log('askBanker2');
            (<AdvancedRoad> (<we.ui.LiveListAdvancedItem> this.parent).advancedRoad).askBankerRoad();
          }
        }
      }

      public askPlayerRoad(evt: egret.Event) {
        if (this.parent && this.parent instanceof we.ui.LiveListAdvancedItem) {
          if ((<we.ui.LiveListAdvancedItem> this.parent).advancedRoad && (<we.ui.LiveListAdvancedItem> this.parent).advancedRoad instanceof we.ba.AdvancedRoad) {
            (<AdvancedRoad> (<we.ui.LiveListAdvancedItem> this.parent).advancedRoad).askPlayerRoad();
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
