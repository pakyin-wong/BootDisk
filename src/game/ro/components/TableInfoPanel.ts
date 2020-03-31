namespace we {
  export namespace ro {
    export class TableInfoPanel extends ui.TableInfoPanel {
      protected colorLabel: eui.Label;
      protected oddevenLabel: eui.Label;
      protected sizeLabel: eui.Label;
      protected columnbetLabel: eui.Label;
      protected rowbetLabel: eui.Label;

      protected colorLabel: eui.Label;
      protected oddevenLabel: eui.Label;
      protected sizeLabel: eui.Label;
      protected columnbetLabel: eui.Label;
      protected rowbetLabel: eui.Label;

      // protected pBanker: eui.Label;
      // protected pPlayer: eui.Label;
      // protected pTie: eui.Label;
      // protected pBankerPair: eui.Label;
      // protected pPlayerPair: eui.Label;

      // protected gameIdLabel: eui.Label;
      // protected betLimitLabel: eui.Label;

      // protected pGameID: eui.Label;
      // protected pBetLimit: eui.Label;

      public constructor() {
        super();
      }

      public changeLang() {
        super.changeLang();

        this.colorLabel.text = i18n.t('roulette.betGroup.color');
        this.oddevenLabel.text = i18n.t('roulette.betGroup.oddeven');
        this.sizeLabel.text = i18n.t('roulette.betGroup.size');
        this.columnbetLabel.text = i18n.t('roulette.betGroup.column');
        this.rowbetLabel.text = i18n.t('roulette.betGroup.row');
      }

      // public setValue(tableInfo: data.TableInfo) {
      //   this.pBanker.text = tableInfo.gamestatistic.bankerCount.toString();
      //   this.pPlayer.text = tableInfo.gamestatistic.playerCount.toString();
      //   this.pTie.text = tableInfo.gamestatistic.tieCount.toString();
      //   this.pBankerPair.text = tableInfo.gamestatistic.bankerPairCount.toString();
      //   this.pPlayerPair.text = tableInfo.gamestatistic.playerPairCount.toString();
      //   if (this.pGameID) {
      //     this.pGameID.text = tableInfo.betInfo.gameroundid.toString();
      //   }
      //   if (this.pGameID) {
      //     this.pGameID.text = data.BetLimit.toString();
      //   }
      // }
    }
  }
}
