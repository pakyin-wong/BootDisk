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
      // protected gameIdLabel: ui.RunTimeLabel;
      // protected betLimitLabel: ui.RunTimeLabel;

      protected pPlayerMax: eui.Label;
      protected pPlayerOdd: eui.Label;

      protected pTieMax: eui.Label;
      protected pTieOdd: eui.Label;

      protected pBankerPairMax: eui.Label;
      protected pBankerPairOdd: eui.Label;

      protected pPlayerPairMax: eui.Label;
      protected pPlayerPairOdd: eui.Label;

      protected childrenCreated(): void {
        super.childrenCreated();
        this._initY = this.y;
        // this.alpha = 0;
        // this.visible = true;
        // this.close.addEventListener(
        //   egret.TouchEvent.TOUCH_TAP,
        //   () => {
        //     this.visible = !this.visible;
        //   },
        //   this
        // );

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        mouse.setButtonMode(this.close, true);
      }

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

      public getConfig() {
        const betlimits = env.betLimits[env.currentSelectedBetLimitIndex].limits.ba;
        return [
          { data: betlimits.BANKER, lblMax: this.pBankerMax, lblOdd: this.pBankerOdd },
          { data: betlimits.PLAYER, lblMax: this.pPlayerMax, lblOdd: this.pPlayerOdd },
          { data: betlimits.BANKER_PAIR, lblMax: this.pBankerPairMax, lblOdd: this.pBankerPairOdd },
          { data: betlimits.PLAYER_PAIR, lblMax: this.pPlayerPairMax, lblOdd: this.pPlayerPairOdd },
          { data: betlimits.TIE, lblMax: this.pTieMax, lblOdd: this.pTieOdd },
          { data: betlimits.SUPER_SIX, lblMax: this.pSuperSixMax, lblOdd: this.pSuperSixOdd },
          { data: betlimits.SUPER_SIX_BANKER, lblMax: this.pSuperSixBankerMax, lblOdd: this.pSuperSixBankerOdd },
        ];
        // =======
        //       public setValue(tableInfo: data.TableInfo) {
        //         super.setValue(tableInfo);
        //         if (tableInfo.gamestatistic && tableInfo.gamestatistic.bankerCount) {
        //           this.pBanker.text = tableInfo.gamestatistic.bankerCount.toString();
        //         }
        //         if (tableInfo.gamestatistic && tableInfo.gamestatistic.playerCount) {
        //           this.pPlayer.text = tableInfo.gamestatistic.playerCount.toString();
        //         }
        //         if (tableInfo.gamestatistic && tableInfo.gamestatistic.tieCount) {
        //           this.pTie.text = tableInfo.gamestatistic.tieCount.toString();
        //         }
        //         if (tableInfo.gamestatistic && tableInfo.gamestatistic.bankerPairCount) {
        //           this.pBankerPair.text = tableInfo.gamestatistic.bankerPairCount.toString();
        //         }
        //         if (tableInfo.gamestatistic && tableInfo.gamestatistic.playerPairCount) {
        //           this.pPlayerPair.text = tableInfo.gamestatistic.playerPairCount.toString();
        //         }
        //         if (this.pGameID) {
        //           this.pGameID.text = tableInfo.betInfo.gameroundid;
        //         }
        // >>>>>>> develop
      }
    }
  }
}
