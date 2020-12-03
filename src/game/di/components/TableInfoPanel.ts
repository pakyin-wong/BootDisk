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
      protected pBigSmallOdd: ui.RunTimeLabel;

      protected pOddEvenMax: eui.Label;
      protected pOddEvenOdd: ui.RunTimeLabel;

      protected pTripleMax: eui.Label;
      protected pTripleOdd: ui.RunTimeLabel;

      protected pTripleAllMax: eui.Label;
      protected pTripleAllOdd: ui.RunTimeLabel;

      protected pDoubleMax: eui.Label;
      protected pDoubleOdd: ui.RunTimeLabel;

      protected pFourSeventeenMax: eui.Label;
      protected pFourSeventeenOdd: ui.RunTimeLabel;

      protected pFiveSixteenMax: eui.Label;
      protected pFiveSixteenOdd: ui.RunTimeLabel;

      protected pSixFifthTeenMax: eui.Label;
      protected pSixFifthTeenOdd: ui.RunTimeLabel;

      protected pSevenFourTeenMax: eui.Label;
      protected pSevenFourTeenOdd: ui.RunTimeLabel;

      protected pEightThirdteenMax: eui.Label;
      protected pEightThirdteenOdd: ui.RunTimeLabel;

      protected pNineTenElevenTwelveMax: eui.Label;
      protected pNineTenElevenTwelveOdd: ui.RunTimeLabel;

      protected pCombineMax: eui.Label;
      protected pCombineOdd: ui.RunTimeLabel;

      protected pSpecificSingleMax: eui.Label;
      protected pSpecificSingleOdd: ui.RunTimeLabel;

      protected pSpecificDoubleMax: eui.Label;
      protected pSpecificDoubleOdd: ui.RunTimeLabel;

      protected pSpecificTripleMax: eui.Label;
      protected pSpecificTripleOdd: ui.RunTimeLabel;

      protected _scroller: eui.Scroller;
      protected _scrollArea: eui.Group;
      protected _mask: egret.Shape;

      protected childrenCreated(): void {
        super.childrenCreated();

        if (env.isMobile && env.orientation === 'landscape') {
          this.addGradentMask();
        }
        if (!env.isMobile) {
          this.addScrollerMask();
          this._scroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
          this._scroller.bounces = true;
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

      protected addScrollerMask() {
        this._mask = new egret.Shape();
        const gr = this._mask.graphics;
        const matrix = new egret.Matrix();
        matrix.createGradientBox(408, this._scrollArea.height - 20, Math.PI / 2, 0, 0);
        gr.beginGradientFill(egret.GradientType.LINEAR, [0xffffff, 0xffffff, 0xffffff, 0xffffff], [0, 1, 1, 0], [0, 20, 200, 255], matrix);
        gr.drawRect(0, 0, 408, this._scrollArea.height - 20);
        gr.endFill();
        this.addChild(this._mask);
        this._mask.x = 15;
        this._mask.y = this._scroller.y + 20;
        this._scroller.mask = this._mask;
      }

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

      public getConfig() {
        const betlimits = env.getBetLimitSet('Live', env.currentSelectedBetLimitIndex).limits.di;
        if (!betlimits) {
          return [];
        }
        return [
          { data: betlimits.BIG_SMALL, lblMax: this.pBigSmallMax, lblOdd: this.pBigSmallOdd },
          { data: betlimits.COMBINE, lblMax: this.pCombineMax, lblOdd: this.pCombineOdd },
          { data: betlimits.DOUBLE, lblMax: this.pDoubleMax, lblOdd: this.pDoubleOdd },
          { data: betlimits.ODD_EVEN, lblMax: this.pOddEvenMax, lblOdd: this.pOddEvenOdd },
          { data: betlimits.SPECIFIC_1, lblMax: this.pSpecificSingleMax, lblOdd: this.pSpecificSingleOdd },
          { data: betlimits.SPECIFIC_2, lblMax: this.pSpecificDoubleMax, lblOdd: this.pSpecificDoubleOdd },
          { data: betlimits.SPECIFIC_3, lblMax: this.pSpecificTripleMax, lblOdd: this.pSpecificTripleOdd },
          { data: betlimits.SUM_4_17, lblMax: this.pFourSeventeenMax, lblOdd: this.pFourSeventeenOdd }, 
          { data: betlimits.SUM_6_15, lblMax: this.pSixFifthTeenMax, lblOdd: this.pSixFifthTeenOdd }, 
          { data: betlimits.SUM_5_16, lblMax: this.pFiveSixteenMax, lblOdd: this.pFiveSixteenOdd },
          { data: betlimits.SUM_7_14, lblMax: this.pSevenFourTeenMax, lblOdd: this.pSevenFourTeenOdd },
          { data: betlimits.SUM_8_13, lblMax: this.pEightThirdteenMax, lblOdd: this.pEightThirdteenOdd },
          { data: betlimits.SUM_9_10_11_12, lblMax: this.pNineTenElevenTwelveMax, lblOdd: this.pNineTenElevenTwelveOdd },
          { data: betlimits.TRIPLE, lblMax: this.pTripleMax, lblOdd: this.pTripleOdd },  
          { data: betlimits.TRIPLE_ALL, lblMax: this.pTripleAllMax, lblOdd: this.pTripleAllOdd },         
        ];
        // =======
        //       public setValue(tableInfo: data.TableInfo) {
        //         super.setValue(tableInfo);
        //         if (tableInfo.gamestatistic) {
        //           this.pTiger.text = tableInfo.gamestatistic.bankerCount.toString();
        //           this.pDragon.text = tableInfo.gamestatistic.playerCount.toString();
        //           this.pTie.text = tableInfo.gamestatistic.tieCount.toString();
        //         }
        //         if (this.pGameID) {
        //           this.pGameID.text = tableInfo.betInfo.gameroundid;
        //         }
        // >>>>>>> develop
      }

      // public setValue(tableInfo: data.TableInfo) {
      //   super.setValue(tableInfo);

      //   const betLimitSet = env.getBetLimitSet('Live', env.currentSelectedBetLimitIndex);
      //   if (betLimitSet.limits && betLimitSet.limits.di) {
      //     const limits = betLimitSet.limits.di;
      //     const list = [
      //       { target: this.pOddEvenMax, value: utils.numberToFaceValue(limits.ODD_EVEN.maxlimit) },
      //       { target: this.pOddEvenOdd, value: limits.ODD_EVEN.odd },
      //       { target: this.pBigSmallMax, value: utils.numberToFaceValue(limits.BIG_SMALL.maxlimit) },
      //       { target: this.pBigSmallOdd, value: limits.BIG_SMALL.odd },
      //       { target: this.pTripleMax, value: utils.numberToFaceValue(limits.TRIPLE.maxlimit) },
      //       { target: this.pTripleOdd, value: limits.TRIPLE.odd },
      //       { target: this.pTripleAllMax, value: utils.numberToFaceValue(limits.TRIPLE_ALL.maxlimit) },
      //       { target: this.pTripleAllOdd, value: limits.TRIPLE_ALL.odd },
      //       { target: this.pDoubleMax, value: utils.numberToFaceValue(limits.DOUBLE.maxlimit) },
      //       { target: this.pDoubleOdd, value: limits.DOUBLE.odd },
      //       { target: this.pFourSeventeenMax, value: utils.numberToFaceValue(limits.SUM_4_17.maxlimit) },
      //       { target: this.pFourSeventeenOdd, value: limits.SUM_4_17.odd },
      //       { target: this.pFiveSixteenMax, value: utils.numberToFaceValue(limits.SUM_5_16.maxlimit) },
      //       { target: this.pFiveSixteenOdd, value: limits.SUM_5_16.odd },
      //       { target: this.pSixFifthTeenMax, value: utils.numberToFaceValue(limits.SUM_6_15.maxlimit) },
      //       { target: this.pSixFifthTeenOdd, value: limits.SUM_6_15.odd },
      //       { target: this.pSevenFourTeenMax, value: utils.numberToFaceValue(limits.SUM_7_14.maxlimit) },
      //       { target: this.pSevenFourTeenOdd, value: limits.SUM_7_14.odd },
      //       { target: this.pEightThirdteenMax, value: utils.numberToFaceValue(limits.SUM_8_13.maxlimit) },
      //       { target: this.pEightThirdteenOdd, value: limits.SUM_8_13.odd },
      //       { target: this.pNineTenElevenTwelveMax, value: utils.numberToFaceValue(limits.SUM_9_10_11_12.maxlimit) },
      //       { target: this.pNineTenElevenTwelveOdd, value: limits.SUM_9_10_11_12.odd },
      //       { target: this.pCombineMax, value: utils.numberToFaceValue(limits.COMBINE.maxlimit) },
      //       { target: this.pCombineOdd, value: limits.COMBINE.odd },
      //       { target: this.pSpecificSingleMax, value: utils.numberToFaceValue(limits.SPECIFIC_1.maxlimit) },
      //       { target: this.pSpecificSingleOdd, value: limits.SPECIFIC_1.odd },
      //       { target: this.pSpecificDoubleMax, value: utils.numberToFaceValue(limits.SPECIFIC_2.maxlimit) },
      //       { target: this.pSpecificDoubleOdd, value: limits.SPECIFIC_2.odd },
      //       { target: this.pSpecificTripleMax, value: utils.numberToFaceValue(limits.SPECIFIC_3.maxlimit) },
      //       { target: this.pSpecificTripleOdd, value: limits.SPECIFIC_3.odd },
      //     ];
      //     for (const { target, value } of list) {
      //       if (target) {
      //         if (value) {
      //           target.text = value.toString();
      //         } else {
      //           target.text = '-';
      //         }
      //       }
      //     }
      //   }
      // }
    }
  }
}
