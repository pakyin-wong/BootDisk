namespace we {
  export namespace ba {
    export class StatisticChartHolder extends ui.Panel {
      // public _title01: ui.RunTimeLabel;
      // public _title02: ui.RunTimeLabel;

      // private _count01_bank: eui.Label;
      // private _count01_player: eui.Label;
      // private _count01_tie: eui.Label;
      // private _count02_bank: eui.Label;
      // private _count02_player: eui.Label;
      // private _count02_tie: eui.Label;

      // private _countPer01_bank: eui.Label;
      // private _countPer01_player: eui.Label;
      // private _countPer01_tie: eui.Label;

      // private _countPer02_bank: eui.Label;
      // private _countPer02_player: eui.Label;
      // private _countPer02_tie: eui.Label;

      // private _chart_01: ui.SimpleChart;
      // private _chart_02: ui.SimpleChart;

      // private _roundCount01: eui.Label;
      // private _roundCount02: eui.Label;

      // public _icon01: eui.Group;
      // public _icon02: eui.Group;
      // public _icon01_pair: eui.Group;
      // public _icon02_pair: eui.Group;

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

        // let _x: number;
        // let _y: number;
        // if (env.orientation === 'portrait') {
        //   _x = 0;
        //   _y = 340;
        // } else {
        //   _x = 15;
        //   _y = 130;
        // }
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
    //   public set count01_bank(value: number) {
    //     this._count01_bank.text = value.toString();
    //   }

    //   public set count01_player(value: number) {
    //     this._count01_player.text = value.toString();
    //   }

    //   public set count01_tie(value: number) {
    //     this._count01_tie.text = value.toString();
    //   }

    //   public set count02_bank(value: number) {
    //     this._count02_bank.text = value.toString();
    //   }

    //   public set count02_player(value: number) {
    //     this._count02_player.text = value.toString();
    //   }

    //   public set count02_tie(value: number) {
    //     this._count02_tie.text = value.toString();
    //   }

    //   public set countPer01_bank(value: number) {
    //     this._countPer01_bank.text = value.toString();
    //   }

    //   public set countPer01_player(value: number) {
    //     this._countPer01_player.text = value.toString();
    //   }

    //   public set countPer01_tie(value: number) {
    //     this._countPer01_tie.text = value.toString();
    //   }

    //   public set countPer02_bank(value: number) {
    //     this._countPer02_bank.text = value.toString();
    //   }

    //   public set countPer02_player(value: number) {
    //     this._countPer02_player.text = value.toString();
    //   }

    //   public set countPer02_tie(value: number) {
    //     this._countPer02_tie.text = value.toString();
    //   }

    //   public set roundCount01(value: number) {
    //     this._roundCount01.text = value.toString();
    //   }

    //   public set roundCount02(value: number) {
    //     this._roundCount02.text = value.toString();
    //   }

    //   public get chart_01() {
    //     return this._chart_01;
    //   }

    //   public get chart_02() {
    //     return this._chart_02;
    //   }

    //   protected drawChartArc(a: number, b: number, c: number, x: number, y: number, radius: number, thickness: number) {
    //     const totalAmount = a + b + c;
    //     const radiusA = 360 * (a / totalAmount);
    //     const radiusB = 360 * (b / totalAmount);
    //     const radiusC = 360 * (c / totalAmount);
    //     const shapeRed: egret.Shape = new egret.Shape();
    //     shapeRed.graphics.lineStyle(thickness, 0xff6651);
    //     shapeRed.graphics.drawArc(x, y, radius, 0, radiusA * (Math.PI / 180), false);
    //     shapeRed.graphics.endFill();
    //     this.addChild(shapeRed);
    //     const shapeBlue: egret.Shape = new egret.Shape();
    //     shapeBlue.graphics.lineStyle(thickness, 0x3c38ff);
    //     shapeBlue.graphics.drawArc(x, y, radius, radiusA * (Math.PI / 180), (radiusA + radiusB) * (Math.PI / 180), false);
    //     shapeBlue.graphics.endFill();
    //     this.addChild(shapeBlue);
    //     const shapeGreen: egret.Shape = new egret.Shape();
    //     shapeGreen.graphics.lineStyle(thickness, 0x1f86c);
    //     shapeGreen.graphics.drawArc(x, y, radius, (radiusA + radiusB) * (Math.PI / 180), (radiusA + radiusB + radiusC) * (Math.PI / 180), false);
    //     shapeGreen.graphics.endFill();
    //     this.addChild(shapeGreen);
    //   }
    // }
  }
}
