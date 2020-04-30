namespace we {
  export namespace ro {
    export class TableInfoPanel extends ui.TableInfoPanel {
      protected directLabel: eui.Label;
      protected separateLabel: eui.Label;
      protected streetLabel: eui.Label;
      protected cornerLabel: eui.Label;
      protected lineLabel: eui.Label;
      protected rowbetLabel: eui.Label;
      protected columnbetLabel: eui.Label;
      protected colorLabel: eui.Label;
      protected oddevenLabel: eui.Label;
      protected sizeLabel: eui.Label;

      protected pDirectMax: eui.Label;
      protected pDirectOdd: eui.Label;

      protected pSeparateMax: eui.Label;
      protected pSeparateOdd: eui.Label;

      protected pStreetMax: eui.Label;
      protected pStreetOdd: eui.Label;

      protected pCornerMax: eui.Label;
      protected pCornerOdd: eui.Label;

      protected pLineMax: eui.Label;
      protected pLineOdd: eui.Label;

      protected pRowMax: eui.Label;
      protected pRowOdd: eui.Label;

      protected pDozenMax: eui.Label;
      protected pDozenOdd: eui.Label;

      protected pRedBlackMax: eui.Label;
      protected pRedBlackOdd: eui.Label;

      protected pOddEvenMax: eui.Label;
      protected pOddEvenOdd: eui.Label;

      protected pBigSmallMax: eui.Label;
      protected pBigSmallOdd: eui.Label;

      public changeLang() {
        super.changeLang();

        this.directLabel.text = i18n.t('roulette.betGroup.direct');
        this.separateLabel.text = i18n.t('roulette.betGroup.separate');
        this.streetLabel.text = i18n.t('roulette.betGroup.street');
        this.cornerLabel.text = i18n.t('roulette.betGroup.corner');
        this.lineLabel.text = i18n.t('roulette.betGroup.line');
        this.rowbetLabel.text = i18n.t('roulette.betGroup.row');
        this.columnbetLabel.text = i18n.t('roulette.betGroup.column');
        this.colorLabel.text = i18n.t('roulette.betGroup.color');
        this.oddevenLabel.text = i18n.t('roulette.betGroup.oddeven');
        this.sizeLabel.text = i18n.t('roulette.betGroup.size');
      }

      public setValue(tableInfo: data.TableInfo) {
        super.setValue(tableInfo);

        const betLimitSet = env.betLimits[env.currentSelectedBetLimitIndex];
        if (betLimitSet.limits && betLimitSet.limits.ro) {
          const limits = betLimitSet.limits.ro;
          const list = [
            { target: this.pDirectMax, value: limits.DIRECT.maxlimit },
            { target: this.pDirectOdd, value: limits.DIRECT.odd },
            { target: this.pSeparateMax, value: limits.SEPARATE.maxlimit },
            { target: this.pSeparateOdd, value: limits.SEPARATE.odd },
            { target: this.pStreetMax, value: limits.STREET.maxlimit },
            { target: this.pStreetOdd, value: limits.STREET.odd },
            { target: this.pCornerMax, value: limits.CORNER.maxlimit },
            { target: this.pCornerOdd, value: limits.CORNER.odd },
            { target: this.pLineMax, value: limits.LINE.maxlimit },
            { target: this.pLineOdd, value: limits.LINE.odd },
            { target: this.pRowMax, value: limits.ROW.maxlimit },
            { target: this.pRowOdd, value: limits.ROW.odd },
            { target: this.pDozenMax, value: limits.DOZEN.maxlimit },
            { target: this.pDozenOdd, value: limits.DOZEN.odd },
            { target: this.pRedBlackMax, value: limits.RED_BLACK.maxlimit },
            { target: this.pRedBlackOdd, value: limits.RED_BLACK.odd },
            { target: this.pOddEvenMax, value: limits.ODD_EVEN.maxlimit },
            { target: this.pOddEvenOdd, value: limits.ODD_EVEN.odd },
            { target: this.pBigSmallMax, value: limits.BIG_SMALL.maxlimit },
            { target: this.pBigSmallOdd, value: limits.BIG_SMALL.odd },
          ];
          for (const { target, value } of list) {
            target.text = value.toString();
          }
        }
      }
    }
  }
}
