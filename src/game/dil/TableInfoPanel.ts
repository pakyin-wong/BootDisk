namespace we {
  export namespace dil {
    export class TableInfoPanel extends ui.TableInfoPanel {
      protected threeEieghteenLabel: eui.Label;
      protected fourSeventeenLabel: eui.Label;
      protected fiveSixteenLabel: eui.Label;
      protected sixFifteenLabel: eui.Label;
      protected sevenForteenLabel: eui.Label;
      protected eightThirteenLabel: eui.Label;
      protected nineTwelveLabel: eui.Label;
      protected tenElevenLabel: eui.Label;

      protected pThreeEighteenMax: eui.Label;
      protected pThreeEighteenOdd: eui.Label;

      protected pFourSeventeenMax: eui.Label;
      protected pFourSeventeenOdd: eui.Label;

      protected pFiveSixteenMax: eui.Label;
      protected pFiveSixteenOdd: eui.Label;

      protected pSixFifteenMax: eui.Label;
      protected pSixFifteenOdd: eui.Label;

      protected pSevenForteenMax: eui.Label;
      protected pSevenForteenOdd: eui.Label;

      protected pEightThirteenMax: eui.Label;
      protected pEightThirteenOdd: eui.Label;

      protected pNineTwelveMax: eui.Label;
      protected pNineTwelveOdd: eui.Label;

      protected pTenElevenMax: eui.Label;
      protected pTenElevenOdd: eui.Label;

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

        this.threeEieghteenLabel.text = i18n.t('dice.total') + '3 / 18';
        this.fourSeventeenLabel.text = i18n.t('dice.total') + '4 / 17';
        this.fiveSixteenLabel.text = i18n.t('dice.total') + '5 / 16';
        this.sixFifteenLabel.text = i18n.t('dice.total') + '6 / 15';
        this.sevenForteenLabel.text = i18n.t('dice.total') + '7 / 14';
        this.eightThirteenLabel.text = i18n.t('dice.total') + '8 / 13';
        this.nineTwelveLabel.text = i18n.t('dice.total') + '9 / 12';
        this.tenElevenLabel.text = i18n.t('dice.total') + '10 / 11';
      }

      public setValue(tableInfo: data.TableInfo) {
        super.setValue(tableInfo);

        const betLimitSet = env.betLimits[env.currentSelectedBetLimitIndex];
        if (betLimitSet.limits && betLimitSet.limits.dil) {
          const limits = betLimitSet.limits.dil;
          const list = [
            { target: this.pThreeEighteenMax, value: utils.numberToFaceValue(limits.SUM_3_18.maxlimit) },
            { target: this.pThreeEighteenOdd, value: limits.SUM_3_18.odd },
            { target: this.pFourSeventeenMax, value: utils.numberToFaceValue(limits.SUM_4_17.maxlimit) },
            { target: this.pFourSeventeenOdd, value: limits.SUM_4_17.odd },
            { target: this.pFiveSixteenMax, value: utils.numberToFaceValue(limits.SUM_5_16.maxlimit) },
            { target: this.pFiveSixteenOdd, value: limits.SUM_5_16.odd },
            { target: this.pSixFifteenMax, value: utils.numberToFaceValue(limits.SUM_6_15.maxlimit) },
            { target: this.pSixFifteenOdd, value: limits.SUM_6_15.odd },
            { target: this.pSevenForteenMax, value: utils.numberToFaceValue(limits.SUM_7_14.maxlimit) },
            { target: this.pSevenForteenOdd, value: limits.SUM_7_14.odd },
            { target: this.pEightThirteenMax, value: utils.numberToFaceValue(limits.SUM_8_13.maxlimit) },
            { target: this.pEightThirteenOdd, value: limits.SUM_8_13.odd },
            { target: this.pNineTwelveMax, value: utils.numberToFaceValue(limits.SUM_9_12.maxlimit) },
            { target: this.pNineTwelveOdd, value: limits.SUM_9_12.odd },
            { target: this.pTenElevenMax, value: utils.numberToFaceValue(limits.SUM_10_11.maxlimit) },
            { target: this.pTenElevenOdd, value: limits.SUM_10_11.odd },
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
