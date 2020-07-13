namespace we {
  export namespace lw {
    export class TableInfoPanel extends ui.TableInfoPanel {
      protected eastLabel: eui.Label;
      protected southLabel: eui.Label;
      protected westLabel: eui.Label;
      protected northLabel: eui.Label;
      protected whiteLabel: eui.Label;
      protected redLabel: eui.Label;
      protected greenLabel: eui.Label;

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

      protected pRedMax: eui.Label;
      protected pRedOdd: eui.Label;

      protected pGreenMax: eui.Label;
      protected pGreenOdd: eui.Label;

      protected _mask: egret.Shape;

      public changeLang() {
        super.changeLang();

        this.eastLabel.text = i18n.t('luckywheel.east');
        this.southLabel.text = i18n.t('luckywheel.south');
        this.westLabel.text = i18n.t('luckywheel.west');
        this.northLabel.text = i18n.t('luckywheel.north');
        this.whiteLabel.text = i18n.t('luckywheel.white');
        this.redLabel.text = i18n.t('luckywheel.red');
        this.greenLabel.text = i18n.t('luckywheel.green');
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
            { target: this.pRedMax, value: utils.numberToFaceValue(limits.LW_5.maxlimit) },
            { target: this.pRedOdd, value: limits.LW_5.odd },
            { target: this.pGreenMax, value: utils.numberToFaceValue(limits.LW_6.maxlimit) },
            { target: this.pGreenOdd, value: limits.LW_6.odd },
          ];
          for (const { target, value } of list) {
            if (target) {
              if (value) {
                target.text = value.toString();
              } else {
                target.text = '-';
              }
            }
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
        if (env.isMobile && env.orientation === 'landscape') {
          this.addGradentMask();
        }
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        mouse.setButtonMode(this.close, true);
      }

      public onExit() {
        this.destroy();
      }

      private addGradentMask() {
        this._mask = new egret.Shape();
        const gr = this._mask.graphics;
        const matrix = new egret.Matrix();
        matrix.createGradientBox(10, 304);
        gr.beginGradientFill(egret.GradientType.LINEAR, [0x212425, 0x212425], [1, 0], [0, 255], matrix);
        gr.drawRect(0, 0, 10, 532); //
        gr.endFill();
        this.addChild(this._mask);
        this._mask.x = -1;
        this._mask.y = 0;
        this._mask.visible = true;
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
