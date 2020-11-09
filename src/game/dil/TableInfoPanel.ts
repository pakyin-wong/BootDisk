namespace we {
  export namespace dil {
    export class TableInfoPanel extends ui.TableInfoPanel {
      protected threeCountLabel: eui.Label;
      protected fourCountLabel: eui.Label;
      protected fiveCountLabel: eui.Label;
      protected sixCountLabel: eui.Label;
      protected sevenCountLabel: eui.Label;
      protected eightCountLabel: eui.Label;
      protected nineCountLabel: eui.Label;
      protected tenCountLabel: eui.Label;
      protected elevenCountLabel: eui.Label;
      protected twelveCountLabel: eui.Label;
      protected thirteenCountLabel: eui.Label;
      protected fourteenCountLabel: eui.Label;
      protected fifteenCountLabel: eui.Label;
      protected sixteenCountLabel: eui.Label;
      protected seventeenCountLabel: eui.Label;
      protected eighteenCountLabel: eui.Label;

      // protected threeCountLabel: eui.Label;
      // protected threeCountLabel: eui.Label;

      protected pThreeCount: eui.Label;
      protected pFourCount: eui.Label;
      protected pFiveCount: eui.Label;
      protected pSixCount: eui.Label;
      protected pSevenCount: eui.Label;
      protected pEightCount: eui.Label;
      protected pNineCount: eui.Label;
      protected pTenCount: eui.Label;
      protected pElevenCount: eui.Label;
      protected pTwelveCount: eui.Label;
      protected pThirteenCount: eui.Label;
      protected pFourteenCount: eui.Label;
      protected pFifteenCount: eui.Label;
      protected pSixteenCount: eui.Label;
      protected pSeventeenCount: eui.Label;
      protected pEighteenCount: eui.Label;
      // protected pNineTwelveOdd: eui.Label;
      // protected pTenElevenOdd: eui.Label;

      protected pThreeMax: eui.Label;
      protected pFourMax: eui.Label;
      protected pFiveMax: eui.Label;
      protected pSixMax: eui.Label;
      protected pSevenMax: eui.Label;
      protected pEightMax: eui.Label;
      protected pNineMax: eui.Label;
      protected pTenMax: eui.Label;

      protected _mask: egret.Shape;

      protected childrenCreated(): void {
        super.childrenCreated();

        if (env.isMobile && env.orientation === 'landscape') {
          this.addGradentMask();
        }
      }

      private addGradentMask() {
        this._mask = new egret.Shape();
        const gr = this._mask.graphics;
        const matrix = new egret.Matrix();
        matrix.createGradientBox(30, 304);
        gr.beginGradientFill(egret.GradientType.LINEAR, [0x212425, 0x212425], [1, 0], [0, 255], matrix);
        gr.drawRect(0, 0, 30, 532); //
        gr.endFill();
        this.addChild(this._mask);
        this._mask.x = -1;
        this._mask.y = 0;
        this._mask.visible = true;
      }

      public changeLang() {
        super.changeLang();

        this.threeCountLabel.text = i18n.t('baccarat.totalcount') + ' 3 / 18';
        this.fourCountLabel.text = i18n.t('baccarat.totalcount') + ' 4 / 17';
        this.fiveCountLabel.text = i18n.t('baccarat.totalcount') + ' 5 / 16';
        this.sixCountLabel.text = i18n.t('baccarat.totalcount') + ' 6 / 15';
        this.sevenCountLabel.text = i18n.t('baccarat.totalcount') + ' 7 / 14';
        this.eightCountLabel.text = i18n.t('baccarat.totalcount') + ' 8 / 13';
        this.nineCountLabel.text = i18n.t('baccarat.totalcount') + ' 9 / 12';
        this.tenCountLabel.text = i18n.t('baccarat.totalcount') + ' 10 / 11';
      }

      public setValue(tableInfo: data.TableInfo) {
        super.setValue(tableInfo);

        const betLimitSet = env.betLimits.Live[env.currentSelectedBetLimitIndex];
        if (betLimitSet.limits && betLimitSet.limits.dil) {
          const limits = betLimitSet.limits.dil;
          const list = [
            { target: this.pThreeCount, value: limits.SUM_3_18.odd },
            { target: this.pFourCount, value: limits.SUM_4_17.odd },
            { target: this.pFiveCount, value: limits.SUM_5_16.odd },
            { target: this.pSixCount, value: limits.SUM_6_15.odd },
            { target: this.pSevenCount, value: limits.SUM_7_14.odd },
            { target: this.pEightCount, value: limits.SUM_8_13.odd },
            { target: this.pNineCount, value: limits.SUM_9_12.odd },
            { target: this.pTenCount, value: limits.SUM_10_11.odd },
            { target: this.pElevenCount, value: limits.SUM_10_11.odd },
            { target: this.pTwelveCount, value: limits.SUM_9_12.odd },
            { target: this.pThirteenCount, value: limits.SUM_8_13.odd },
            { target: this.pFourteenCount, value: limits.SUM_7_14.odd },
            { target: this.pFifteenCount, value: limits.SUM_6_15.odd },
            { target: this.pSixteenCount, value: limits.SUM_5_16.odd },
            { target: this.pSeventeenCount, value: limits.SUM_4_17.odd },
            { target: this.pEighteenCount, value: limits.SUM_3_18.odd },
            // { target: this.pNineTwelveOdd, value: limits.SUM_9_12.odd },
            // { target: this.pTenElevenOdd, value: limits.SUM_10_11.odd },
            { target: this.pThreeMax, value: utils.numberToFaceValue(limits.SUM_3_18.maxlimit) },
            { target: this.pFourMax, value: utils.numberToFaceValue(limits.SUM_4_17.maxlimit) },
            { target: this.pFiveMax, value: utils.numberToFaceValue(limits.SUM_5_16.maxlimit) },
            { target: this.pSixMax, value: utils.numberToFaceValue(limits.SUM_6_15.maxlimit) },
            { target: this.pSevenMax, value: utils.numberToFaceValue(limits.SUM_7_14.maxlimit) },
            { target: this.pEightMax, value: utils.numberToFaceValue(limits.SUM_8_13.maxlimit) },
            { target: this.pNineMax, value: utils.numberToFaceValue(limits.SUM_9_12.maxlimit) },
            { target: this.pTenMax, value: utils.numberToFaceValue(limits.SUM_10_11.maxlimit) },
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
    }
  }
}
