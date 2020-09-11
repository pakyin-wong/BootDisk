namespace we {
  export namespace lw {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis {
      protected _tableId;

      protected _lblPool: ui.RunTimeLabel;
      protected _horizontalBarChart: we.di.HorizontalBarChart;

      public _lbl_lwValue0: ui.RunTimeLabel;
      public _lbl_lwValue1: ui.RunTimeLabel;
      public _lbl_lwValue2: ui.RunTimeLabel;
      public _lbl_lwValue3: ui.RunTimeLabel;
      public _lbl_lwValue4: ui.RunTimeLabel;
      public _lbl_lwValue5: ui.RunTimeLabel;
      public _lbl_lwValue6: ui.RunTimeLabel;

      public advancedRoad: we.ui.IAdvancedRoad;

      public set tableId(value: string) {
        this._tableId = value;
      }

      public get tableId() {
        return this._tableId;
      }

      constructor() {
        super(env.isMobile ? null : 'lw.Analysis');
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
          228,
          10,
          45
        );
        this._horizontalBarChart.x = 25;
        this._horizontalBarChart.y = 82;
        this._horizontalBarChart.setRanksAndAnimate([25080000, 18000060, 50500, 10022000, 800000, 19000010, 20012000]);
        this.addChild(this._horizontalBarChart);
      }

      public updateTableBetInfo() {
        const data = env.tableInfos[this._tableId].betInfo;
        for (let i = 0; i < 7; i += 1) {
          this[`_lbl_lwValue${i}`].text = data.amount[`LW_${i}`] || 0;
        }
      }

      public updateRoad() {}
    }
  }
}
