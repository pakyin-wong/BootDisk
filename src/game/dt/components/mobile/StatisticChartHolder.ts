namespace we {
  export namespace dt {
    export class StatisticChartHolder extends ui.Panel {
      protected _statisticChart1: StatisticChart;
      protected _statisticChart2: StatisticChart;

      public constructor() {
        super();
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }
      protected childrenCreated(): void {
        super.childrenCreated();
      }

      public setupChart1(titleRenderText: () => string, isShowPair: boolean) {
        this._statisticChart1.setMode(isShowPair);
        this._statisticChart1.title.renderText = titleRenderText;
      }
      public setupChart2(titleRenderText: () => string, isShowPair: boolean) {
        this._statisticChart2.setMode(isShowPair);
        this._statisticChart2.title.renderText = titleRenderText;
      }
      public updateChart1(info: any) {
        this._statisticChart1.firstCount = info.firstCount;
        this._statisticChart1.secondCount = info.secondCount;
        this._statisticChart1.thirdCount = info.thirdCount;
        this._statisticChart1.firstPercentage = info.firstPercentage;
        this._statisticChart1.secondPercentage = info.secondPercentage;
        this._statisticChart1.thirdPercentage = info.thirdPercentage;
        this._statisticChart1.total = info.totalCount;
        this._statisticChart1.update();
      }
      public updateChart2(info: any) {
        this._statisticChart2.firstCount = info.firstCount;
        this._statisticChart2.secondCount = info.secondCount;
        this._statisticChart2.thirdCount = info.thirdCount;
        this._statisticChart2.firstPercentage = info.firstPercentage;
        this._statisticChart2.secondPercentage = info.secondPercentage;
        this._statisticChart2.thirdPercentage = info.thirdPercentage;
        this._statisticChart2.total = info.totalCount;
        this._statisticChart2.update();
      }
    }
  }
}
