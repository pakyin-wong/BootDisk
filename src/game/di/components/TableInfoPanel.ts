namespace we {
  export namespace di {
    export class TableInfoPanel extends ui.TableInfoPanel {
      protected sizeLabel: eui.Label;
      protected oddevenLabel: eui.Label;
      protected tripleLabel: eui.Label;
      protected allTripleLabel: eui.Label;
      protected doubleLabel: eui.Label;
      protected fourSeventeenLabel: eui.Label;
      protected fiveSixteenLabel: eui.Label;
      protected sixFifthteenLabel: eui.Label;
      protected sevenFourteenLabel: eui.Label;
      protected eightThirdteenLabel: eui.Label;
      protected nineTenElevenTwelveLabel: eui.Label;
      protected combineLabel: eui.Label;
      protected specificSingleLabel: eui.Label;
      protected specificDoubleLabel: eui.Label;
      protected specificTripleLabel: eui.Label;

      protected pBigSmallMax: eui.Label;
      protected pBigSmallOdd: eui.Label;

      protected pOddEvenMax: eui.Label;
      protected pOddEvenOdd: eui.Label;

      protected pTripleMax: eui.Label;
      protected pTripleOdd: eui.Label;

      protected pTripleAllMax: eui.Label;
      protected pTripleAllOdd: eui.Label;

      protected pDoubleMax: eui.Label;
      protected pDoubleOdd: eui.Label;

      protected pFourSeventeenMax: eui.Label;
      protected pFourSeventeenOdd: eui.Label;

      protected pFiveSixteenMax: eui.Label;
      protected pFiveSixteenOdd: eui.Label;

      protected pSixFifthTeenMax: eui.Label;
      protected pSixFifthTeenOdd: eui.Label;

      protected pSevenFourTeenMax: eui.Label;
      protected pSevenFourTeenOdd: eui.Label;

      protected pEightThirdteenMax: eui.Label;
      protected pEightThirdteenOdd: eui.Label;

      protected pNineTenElevenTwelveMax: eui.Label;
      protected pNineTenElevenTwelveOdd: eui.Label;

      protected pCombineMax: eui.Label;
      protected pCombineOdd: eui.Label;

      protected pSpecificSingleMax: eui.Label;
      protected pSpecificSingleOdd: eui.Label;

      protected pSpecificDoubleMax: eui.Label;
      protected pSpecificDoubleOdd: eui.Label;

      protected pSpecificTripleMax: eui.Label;
      protected pSpecificTripleOdd: eui.Label;

      public changeLang() {
        super.changeLang();

        this.sizeLabel.text = i18n.t('dice.big') + ' / ' + i18n.t('dice.small');
        this.oddevenLabel.text = i18n.t('dice.odd') + ' / ' + i18n.t('dice.even');
        this.tripleLabel.text = i18n.t('dice.tripleLong');
        this.allTripleLabel.text = i18n.t('dice.allTriple');
        this.doubleLabel.text = i18n.t('dice.doubleLong');
        this.fourSeventeenLabel.text = i18n.t('dice.total') + '4 / 17';
        this.fiveSixteenLabel.text = i18n.t('dice.total') + '5 / 16';
        this.sixFifthteenLabel.text = i18n.t('dice.total') + '6 / 15';
        this.sevenFourteenLabel.text = i18n.t('dice.total') + '7 / 14';
        this.eightThirdteenLabel.text = i18n.t('dice.total') + '8 / 13';
        this.nineTenElevenTwelveLabel.text = i18n.t('dice.total') + '9 / 10 / 11 / 12';
        this.combineLabel.text = i18n.t('dice.combine');
        this.specificSingleLabel.text = i18n.t('dice.specificSingle');
        this.specificDoubleLabel.text = i18n.t('dice.specificDouble');
        this.specificTripleLabel.text = i18n.t('dice.specificTriple');
      }

      public setValue(tableInfo: data.TableInfo) {
        super.setValue(tableInfo);

        const betLimitSet = env.betLimits[env.currentSelectedBetLimitIndex];
        if (betLimitSet.limits && betLimitSet.limits.di) {
          const limits = betLimitSet.limits.di;
          const list = [
            { target: this.pOddEvenMax, value: utils.numberToFaceValue(limits.ODD_EVEN.maxlimit) },
            { target: this.pOddEvenOdd, value: limits.ODD_EVEN.odd },
            { target: this.pBigSmallMax, value: utils.numberToFaceValue(limits.BIG_SMALL.maxlimit) },
            { target: this.pBigSmallOdd, value: limits.BIG_SMALL.odd },
            { target: this.pTripleMax, value: utils.numberToFaceValue(limits.TRIPLE.maxlimit) },
            { target: this.pTripleOdd, value: limits.TRIPLE.odd },
            { target: this.pTripleAllMax, value: utils.numberToFaceValue(limits.TRIPLE_ALL.maxlimit) },
            { target: this.pTripleAllOdd, value: limits.TRIPLE_ALL.odd },
            { target: this.pDoubleMax, value: utils.numberToFaceValue(limits.DOUBLE.maxlimit) },
            { target: this.pDoubleOdd, value: limits.DOUBLE.odd },
            { target: this.pFourSeventeenMax, value: utils.numberToFaceValue(limits.SUM_4_17.maxlimit) },
            { target: this.pFourSeventeenOdd, value: limits.SUM_4_17.odd },
            { target: this.pFiveSixteenMax, value: utils.numberToFaceValue(limits.SUM_5_16.maxlimit) },
            { target: this.pFiveSixteenOdd, value: limits.SUM_5_16.odd },
            { target: this.pSixFifthTeenMax, value: utils.numberToFaceValue(limits.SUM_6_15.maxlimit) },
            { target: this.pSixFifthTeenOdd, value: limits.SUM_6_15.odd },
            { target: this.pSevenFourTeenMax, value: utils.numberToFaceValue(limits.SUM_7_14.maxlimit) },
            { target: this.pSevenFourTeenOdd, value: limits.SUM_7_14.odd },
            { target: this.pEightThirdteenMax, value: utils.numberToFaceValue(limits.SUM_8_13.maxlimit) },
            { target: this.pEightThirdteenOdd, value: limits.SUM_8_13.odd },
            { target: this.pNineTenElevenTwelveMax, value: utils.numberToFaceValue(limits.SUM_9_10_11_12.maxlimit) },
            { target: this.pNineTenElevenTwelveOdd, value: limits.SUM_9_10_11_12.odd },
            { target: this.pCombineMax, value: utils.numberToFaceValue(limits.COMBINE.maxlimit) },
            { target: this.pCombineOdd, value: limits.COMBINE.odd },
            { target: this.pSpecificSingleMax, value: utils.numberToFaceValue(limits.SPECIFIC_1.maxlimit) },
            { target: this.pSpecificSingleOdd, value: limits.SPECIFIC_1.odd },
            { target: this.pSpecificDoubleMax, value: utils.numberToFaceValue(limits.SPECIFIC_2.maxlimit) },
            { target: this.pSpecificDoubleOdd, value: limits.SPECIFIC_2.odd },
            { target: this.pSpecificTripleMax, value: utils.numberToFaceValue(limits.SPECIFIC_3.maxlimit) },
            { target: this.pSpecificTripleOdd, value: limits.SPECIFIC_3.odd },
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
