namespace we {
  export namespace lw {
    export class LwRightPanel extends core.BaseGamePanel {
      protected _lblPool: ui.RunTimeLabel;
      public _lbl_lwValue0: ui.RunTimeLabel;
      public _lbl_lwValue1: ui.RunTimeLabel;
      public _lbl_lwValue2: ui.RunTimeLabel;
      public _lbl_lwValue3: ui.RunTimeLabel;
      public _lbl_lwValue4: ui.RunTimeLabel;
      public _lbl_lwValue5: ui.RunTimeLabel;
      public _lbl_lwValue6: ui.RunTimeLabel;
      public _betInfo: any;

      protected _horizontalBarChart: we.di.HorizontalBarChart;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'LwRightPanel');
      }

      public mount() {
        this._lblPool.renderText = () => i18n.t('luckywheel.pool');
        this._horizontalBarChart = new we.di.HorizontalBarChart();
        this._horizontalBarChart.setChartStyles(
          [
            [[0x2c77cc, 0x2c77cc], [1, 1], [0, 255], 0],
            [[0x528f5b, 0x528f5b], [1, 1], [0, 255], 0],
            [[0xe99744, 0xe99744], [1, 1], [0, 255], 0],
            [[0xd95139, 0xd95139], [1, 1], [0, 255], 0],
            [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0],
            [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0],
            [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0],
            [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0],
            [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0],
            [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0],
          ],
          432,
          16,
          18
        );
        this._horizontalBarChart.x = 62;
        this._horizontalBarChart.y = 55;
        this.updateBarChart();
        // this._horizontalBarChart.setRanksAndAnimate([25080000, 18000060, 50500, 10022000, 800000, 19000010, 20012000]);
        this.addChild(this._horizontalBarChart);
      }

      public updateBarChart() {
        if (this._betInfo) {
          const arr = ['LW_0', 'LW_1', 'LW_2', 'LW_3', 'LW_4', 'LW_5', 'LW_6'];

          const amount = this._betInfo.amount;
          const amountArr = arr.map(key => {
            if (!amount[key]) {
              amount[key] = 0;
            }
            return amount[key];
          });
          // const amountArr = Object.keys(amount).sort().map(key => amount[key]);
          this._horizontalBarChart.setRanksAndAnimate(amountArr);
          for (let i = 0; i < 7; i += 1) {
            this[`_lbl_lwValue${i}`].text = amount[`LW_${i}`] ? we.utils.formatNumber(amount[`LW_${i}`], false) : 0;
          }
        }
      }

      public updateTableBetInfo() {
        this._betInfo = this.tableInfo.betInfo;
        this.updateBarChart();

        // for (let i = 0; i < 7; i += 1) {
        //   this[`_lbl_lwValue${i}`].text = this.tableInfo.betInfo.amount[`LW_${i}`] || 0;
        // }
        // if (this.tableInfo.betInfo.amount && this._horizontalBarChart) {
        //   this._horizontalBarChart.setRanksAndAnimate(this.tableInfo.betInfo.amount);
        // }
        logger.l(utils.LogTarget.DEBUG, JSON.stringify(this.tableInfo.betInfo.count));
        logger.l(utils.LogTarget.DEBUG, JSON.stringify(this.tableInfo.betInfo.amount));
      }
    }
  }
}
