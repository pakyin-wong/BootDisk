namespace we {
  export namespace ro {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis {
      protected _tableId;
      protected _colorChart: ro.BarChart;
      protected _oddChart: ro.BarChart;
      protected _bigChart: ro.BarChart;
      protected _hotNumber1Img: eui.Image;
      protected _hotNumber1Text: eui.Label;
      protected _hotNumber2Img: eui.Image;
      protected _hotNumber2Text: eui.Label;
      protected _hotNumber3Img: eui.Image;
      protected _hotNumber3Text: eui.Label;
      protected _hotNumber4Img: eui.Image;
      protected _hotNumber4Text: eui.Label;
      protected _coldNumber1Img: eui.Image;
      protected _coldNumber1Text: eui.Label;
      protected _coldNumber2Img: eui.Image;
      protected _coldNumber2Text: eui.Label;
      protected _coldNumber3Img: eui.Image;
      protected _coldNumber3Text: eui.Label;
      protected _coldNumber4Img: eui.Image;
      protected _coldNumber4Text: eui.Label;

      public advancedRoad: we.ui.IAdvancedRoad;

      constructor() {
        super(env.isMobile ? null : 'ro.Analysis');
      }

      protected mount() {
        super.mount();
        this.updateBarChart();

        /*

        this._oddChart.setParam(230, 70, 500, 300, 0, 30, 10);
        this._oddChart.draw();
        this._bigChart.setParam(230, 70, 60, 200, 0, 30, 10);
        this._bigChart.draw();
        */
      }

      protected updateBarChart() {
        if (!this._tableId) {
          return;
        }
        if (env && env.tableInfos && env.tableInfos[this._tableId] && env.tableInfos[this._tableId].gamestatistic) {
          const statColor = env.tableInfos[this._tableId].gamestatistic.roRed;
          if (statColor) {
            this._colorChart.setParam(230, statColor.red, statColor.zero, statColor.black, 0, 30, 10, [0x474747, 0x000000]);
            this._colorChart.draw();
          }
          const statOdd = env.tableInfos[this._tableId].gamestatistic.roOdd;
          if (statOdd) {
            this._oddChart.setParam(230, statOdd.odd, statOdd.zero, statOdd.even, 0, 30, 10);
            this._oddChart.draw();
          }
          const statSmall = env.tableInfos[this._tableId].gamestatistic.roSmall;
          if (statSmall) {
            this._bigChart.setParam(230, statSmall.small, statSmall.zero, statSmall.big, 0, 30, 10);
            this._bigChart.draw();
          }
        }
      }

      public set tableId(value: string) {
        this._tableId = value;
      }

      public get tableId() {
        return this._tableId;
      }

      public updateTableBetInfo() {}

      public updateRoad() {
        if (!this._tableId) {
          return;
        }

        const hotNumbersImg = [this._hotNumber1Img, this._hotNumber2Img, this._hotNumber3Img, this._hotNumber4Img];
        const hotNumbersText = [this._hotNumber1Text, this._hotNumber2Text, this._hotNumber3Text, this._hotNumber4Text];
        const coldNumbersImg = [this._coldNumber1Img, this._coldNumber2Img, this._coldNumber3Img, this._coldNumber4Img];
        const coldNumbersText = [this._coldNumber1Text, this._coldNumber2Text, this._coldNumber3Text, this._coldNumber4Text];

        if (env && env.tableInfos && env.tableInfos[this._tableId] && env.tableInfos[this._tableId].gamestatistic) {
          // console.log('RO/ROL Analysis ', env.tableInfos[this._tableId].gametype, env.tableInfos[this._tableId].gamestatistic);
          if (env.tableInfos[this._tableId].gamestatistic.hotNumbers) {
            env.tableInfos[this._tableId].gamestatistic.hotNumbers.map((value, index) => {
              if (hotNumbersImg[index]) {
                hotNumbersImg[index].source = this.getNumberSource(value);
                hotNumbersText[index].text = value.toString();
              }
            });
          }
          if (env.tableInfos[this._tableId].gamestatistic.coldNumbers) {
            env.tableInfos[this._tableId].gamestatistic.coldNumbers.map((value, index) => {
              if (coldNumbersImg[index]) {
                coldNumbersImg[index].source = this.getNumberSource(value);
                coldNumbersText[index].text = value.toString();
              }
            });
          }
        }
        this.updateBarChart();
      }

      public getNumberSource(value: number) {
        if (value) {
          switch (ro.RACETRACK_COLOR[value]) {
            case ro.Color.GREEN:
              return 'd_ro_history_hotclod_green_ball_extra_large_png';
            case ro.Color.BLACK:
              return 'd_ro_history_hotclod_black_ball_extra_large_png';
            case ro.Color.RED:
              return 'd_ro_history_hotclod_red_ball_extra_large_png';
            default:
              return null;
          }
        }
        return null;
      }
    }
  }
}
