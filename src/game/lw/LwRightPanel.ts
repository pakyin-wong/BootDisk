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

      /*newly added*/
      public updateBarChart() {
        if (this._betInfo) {
          console.log(`.......amount......${JSON.stringify(this._betInfo.amount)}`);
          let amount = this._betInfo.amount;
          amount = Object.keys(amount).map((key) =>amount[key]);
          this._horizontalBarChart.setRanksAndAnimate(amount);
          for (let i = 0; i < 7; i += 1) {
            this[`_lbl_lwValue${i}`].text = this._betInfo.amount[`LW_${i}`] || 0;
          }
        }
      }
      /*newly added*/

      public updateTableBetInfo() {
        this._betInfo = this.tableInfo.betInfo;
        this.updateBarChart();

        // for (let i = 0; i < 7; i += 1) {
        //   this[`_lbl_lwValue${i}`].text = this.tableInfo.betInfo.amount[`LW_${i}`] || 0;
        // }
        /*newly added*/
        // if (this.tableInfo.betInfo.amount && this._horizontalBarChart) {
        //   this._horizontalBarChart.setRanksAndAnimate(this.tableInfo.betInfo.amount);
        // }
        /*newly added*/
        logger.l(utils.LogTarget.DEBUG, JSON.stringify(this.tableInfo.betInfo.count));
        logger.l(utils.LogTarget.DEBUG, JSON.stringify(this.tableInfo.betInfo.amount));
      }
    }
  }
}
