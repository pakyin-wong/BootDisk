namespace we {
  export namespace ba {
    export class StatisticPairChartHolder extends ui.Panel {
      protected _statisticPairChart1: StatisticChart;
      protected _statisticPairChart2: StatisticChart;

      public constructor() {
        super();
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }
      protected childrenCreated(): void {
        super.childrenCreated();
      }

      public setupPairChart1(titleRenderText: () => string, isShowPair: boolean) {
        // this._statisticPairChart1.setMode(isShowPair);
        this._statisticPairChart1.title.renderText = titleRenderText;
      }
      public setupPairChart2(titleRenderText: () => string, isShowPair: boolean) {
        // this._statisticPairChart2.setMode(isShowPair);
        this._statisticPairChart2.title.renderText = titleRenderText;
      }

      public updatePairChart1(info: any) {
        this._statisticPairChart1.firstCount = info.firstCount;  
        this._statisticPairChart1.secondCount = info.secondCount;
        this._statisticPairChart1.thirdCount = info.thirdCount;
        this._statisticPairChart1.firstPercentage = info.firstPercentage;
        this._statisticPairChart1.secondPercentage = info.secondPercentage;
        this._statisticPairChart1.thirdPercentage = info.thirdPercentage;
        this._statisticPairChart1.total = info.totalCount;
        this._statisticPairChart1.pairChartUpdate(); 
      }
      public updatePairChart2(info: any) {
        this._statisticPairChart2.firstCount = info.firstCount;  
        this._statisticPairChart2.secondCount = info.secondCount;
        this._statisticPairChart2.thirdCount = info.thirdCount;
        this._statisticPairChart2.firstPercentage = info.firstPercentage;
        this._statisticPairChart2.secondPercentage = info.secondPercentage;
        this._statisticPairChart2.thirdPercentage = info.thirdPercentage;
        this._statisticPairChart2.total = info.totalCount;
        this._statisticPairChart2.pairChartUpdate(); 
      }
    }
  }
}
