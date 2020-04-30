namespace we {
  export namespace ba {
    export class TableInfoPanel extends ui.TableInfoPanel {
      protected bankerLabel: eui.Label;
      protected superSixBankerLabel: eui.Label;
      protected playerLabel: eui.Label;
      protected tieLabel: eui.Label;
      protected bankerPairLabel: eui.Label;
      protected playerPairLabel: eui.Label;
      protected superSixLabel: eui.Label;

      protected pBankerMax: eui.Label;
      protected pBankerOdd: eui.Label;

      protected pSuperSixBankerMax: eui.Label;
      protected pSuperSixBankerOdd: eui.Label;

      protected pPlayerMax: eui.Label;
      protected pPlayerOdd: eui.Label;

      protected pTieMax: eui.Label;
      protected pTieOdd: eui.Label;

      protected pBankerPairMax: eui.Label;
      protected pBankerPairOdd: eui.Label;

      protected pPlayerPairMax: eui.Label;
      protected pPlayerPairOdd: eui.Label;

      protected pSuperSixMax: eui.Label;
      protected pSuperSixOdd: eui.Label;

      public changeLang() {
        super.changeLang();

        this.bankerLabel.text = i18n.t('baccarat.banker');
        this.superSixBankerLabel.text = i18n.t('baccarat.banker') + ' (' + i18n.t('baccarat.noCommission') + ')';
        this.playerLabel.text = i18n.t('baccarat.player');
        this.tieLabel.text = i18n.t('baccarat.tie');
        this.bankerPairLabel.text = i18n.t('baccarat.bankerPair');
        this.playerPairLabel.text = i18n.t('baccarat.playerPair');
        this.superSixLabel.text = i18n.t('baccarat.superSix') + ' (' + i18n.t('baccarat.noCommission') + ')';
      }

      public setValue(tableInfo: data.TableInfo) {
        super.setValue(tableInfo);
        if (tableInfo.gamestatistic && tableInfo.gamestatistic.bankerCount) {
          this.pBankerMax.text = tableInfo.gamestatistic.bankerCount.toString();
        }
        if (tableInfo.gamestatistic && tableInfo.gamestatistic.playerCount) {
          this.pPlayerMax.text = tableInfo.gamestatistic.playerCount.toString();
        }
        if (tableInfo.gamestatistic && tableInfo.gamestatistic.tieCount) {
          this.pTieMax.text = tableInfo.gamestatistic.tieCount.toString();
        }
        if (tableInfo.gamestatistic && tableInfo.gamestatistic.bankerPairCount) {
          this.pBankerPairMax.text = tableInfo.gamestatistic.bankerPairCount.toString();
        }
        if (tableInfo.gamestatistic && tableInfo.gamestatistic.playerPairCount) {
          this.pPlayerPairMax.text = tableInfo.gamestatistic.playerPairCount.toString();
        }
      }
    }
  }
}
