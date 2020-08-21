namespace we {
  export namespace ba {
    export class StatisticChartHolder extends ui.Panel {
      protected _title01: ui.RunTimeLabel;
      protected _title02: ui.RunTimeLabel;

      public _count01_bank: ui.RunTimeLabel;
      public _count01_player: ui.RunTimeLabel;
      public _count01_tie: ui.RunTimeLabel;
      public _count02_bank: ui.RunTimeLabel;
      public _count02_player: ui.RunTimeLabel;
      public _count02_tie: ui.RunTimeLabel;

      public _countPer01_bank: ui.RunTimeLabel;
      public _countPer01_player: ui.RunTimeLabel;
      public _countPer01_tie: ui.RunTimeLabel;

      public _countPer02_bank: ui.RunTimeLabel;
      public _countPer02_player: ui.RunTimeLabel;
      public _countPer02_tie: ui.RunTimeLabel;

      public _chart_01: ui.SimpleChart;
      public _chart_02: ui.SimpleChart;

      public _roundCount01: ui.RunTimeLabel;
      public _roundCount02: ui.RunTimeLabel;

      public _roundLabel01: ui.RunTimeLabel;
      public _roundLabel02: ui.RunTimeLabel;

      public _icon01_bank: eui.Image;
      public _icon01_player: eui.Image;
      public _icon01_tie: eui.Image;

      public _icon02_bank: eui.Image;
      public _icon02_player: eui.Image;
      public _icon02_tie: eui.Image;

      public constructor() {
        super();
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }
      protected childrenCreated(): void {
        super.childrenCreated();

        let _x: number;
        let _y: number;
        if (env.orientation === 'portrait') {
          _x = 0;
          _y = 340;
        } else {
          _x = 15;
          _y = 130;
        }
      }

      protected drawChartArc(a: number, b: number, c: number, x: number, y: number, radius: number, thickness: number) {
        const totalAmount = a + b + c;
        const radiusA = 360 * (a / totalAmount);
        const radiusB = 360 * (b / totalAmount);
        const radiusC = 360 * (c / totalAmount);
        const shapeRed: egret.Shape = new egret.Shape();
        shapeRed.graphics.lineStyle(thickness, 0xff6651);
        shapeRed.graphics.drawArc(x, y, radius, 0, radiusA * (Math.PI / 180), false);
        shapeRed.graphics.endFill();
        this.addChild(shapeRed);
        const shapeBlue: egret.Shape = new egret.Shape();
        shapeBlue.graphics.lineStyle(thickness, 0x3c38ff);
        shapeBlue.graphics.drawArc(x, y, radius, radiusA * (Math.PI / 180), (radiusA + radiusB) * (Math.PI / 180), false);
        shapeBlue.graphics.endFill();
        this.addChild(shapeBlue);
        const shapeGreen: egret.Shape = new egret.Shape();
        shapeGreen.graphics.lineStyle(thickness, 0x1f86c);
        shapeGreen.graphics.drawArc(x, y, radius, (radiusA + radiusB) * (Math.PI / 180), (radiusA + radiusB + radiusC) * (Math.PI / 180), false);
        shapeGreen.graphics.endFill();
        this.addChild(shapeGreen);
      }
    }
  }
}
