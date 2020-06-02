namespace we {
  export namespace lw {
    export class TableInfoPanel extends ui.TableInfoPanel {
      protected eastLabel: eui.Label;
      protected southLabel: eui.Label;
      protected westLabel: eui.Label;
      protected northLabel: eui.Label;
      protected whiteLabel: eui.Label;
      protected centerLabel: eui.Label;
      protected fatLabel: eui.Label;

      protected pEastMax: eui.Label;
      protected pEastOdd: eui.Label;

      protected pSouthMax: eui.Label;
      protected pSouthOdd: eui.Label;

      protected pWestMax: eui.Label;
      protected pWestOdd: eui.Label;

      protected pNorthMax: eui.Label;
      protected pNorthOdd: eui.Label;

      protected pWhiteMax: eui.Label;
      protected pWhiteOdd: eui.Label;

      protected pCenterMax: eui.Label;
      protected pCenterOdd: eui.Label;

      protected pFatMax: eui.Label;
      protected pFatOdd: eui.Label;

      public changeLang() {
        super.changeLang();

        this.eastLabel.text = i18n.t('luckywheel.east');
        this.southLabel.text = i18n.t('luckywheel.south');
        this.westLabel.text = i18n.t('luckywheel.west');
        this.northLabel.text = i18n.t('luckywheel.north');
        this.whiteLabel.text = i18n.t('luckywheel.white');
        this.centerLabel.text = i18n.t('luckywheel.red');
        this.fatLabel.text = i18n.t('luckywheel.green');
      }

      public setValue(tableInfo: data.TableInfo) {
        super.setValue(tableInfo);

        const betLimitSet = env.betLimits[env.currentSelectedBetLimitIndex];
        if (betLimitSet.limits && betLimitSet.limits.lw) {
          const limits = betLimitSet.limits.lw;
          const list = [
            { target: this.pEastMax, value: utils.numberToFaceValue(limits.LW_0.maxlimit) },
            { target: this.pEastOdd, value: limits.LW_0.odd },
            { target: this.pSouthMax, value: utils.numberToFaceValue(limits.LW_1.maxlimit) },
            { target: this.pSouthOdd, value: limits.LW_1.odd },
            { target: this.pWestMax, value: utils.numberToFaceValue(limits.LW_2.maxlimit) },
            { target: this.pWestOdd, value: limits.LW_2.odd },
            { target: this.pNorthMax, value: utils.numberToFaceValue(limits.LW_3.maxlimit) },
            { target: this.pNorthOdd, value: limits.LW_3.odd },
            { target: this.pWhiteMax, value: utils.numberToFaceValue(limits.LW_4.maxlimit) },
            { target: this.pWhiteOdd, value: limits.LW_4.odd },
            { target: this.pCenterMax, value: utils.numberToFaceValue(limits.LW_5.maxlimit) },
            { target: this.pCenterOdd, value: limits.LW_5.odd },
            { target: this.pFatMax, value: utils.numberToFaceValue(limits.LW_6.maxlimit) },
            { target: this.pFatOdd, value: limits.LW_6.odd },
          ];
          for (const { target, value } of list) {
            target.text = value.toString();
          }
        }
      }
      // =======
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

      public onExit() {
        this.destroy();
      }

      //       public setValue(tableInfo: data.TableInfo) {
      //         super.setValue(tableInfo);
      //         if (tableInfo.gamestatistic.bankerCount) {
      //           this.pBanker.text = tableInfo.gamestatistic.bankerCount.toString();
      //         }
      //         if (tableInfo.gamestatistic.playerCount) {
      //           this.pPlayer.text = tableInfo.gamestatistic.playerCount.toString();
      //         }
      //         if (tableInfo.gamestatistic.tieCount) {
      //           this.pTie.text = tableInfo.gamestatistic.tieCount.toString();
      //         }
      //         if (tableInfo.gamestatistic.bankerPairCount) {
      //           this.pBankerPair.text = tableInfo.gamestatistic.bankerPairCount.toString();
      //         }
      //         if (tableInfo.gamestatistic.playerPairCount) {
      //           this.pPlayerPair.text = tableInfo.gamestatistic.playerPairCount.toString();
      //         }
      //         if (this.pGameID) {
      //           this.pGameID.text = tableInfo.betInfo.gameroundid;
      // >>>>>>> develop
      //         }
      //       }
    }
  }
}
