namespace we {
  export namespace ba {
    export class StatisticChartPanel extends ui.Panel {
      protected _leftTitle: ui.RunTimeLabel;
      protected _rightTitle: ui.RunTimeLabel;

      protected roundLabelLeft: ui.RunTimeLabel;
      protected roundLabelRight: ui.RunTimeLabel;

      protected totalBankerCount: ui.RunTimeLabel;
      protected totalBankerCountPer: ui.RunTimeLabel;
      protected totalPlayerCount: ui.RunTimeLabel;
      protected totalPlayerCountPer: ui.RunTimeLabel;
      protected totalTieCount: ui.RunTimeLabel;
      protected totalTieCountPer: ui.RunTimeLabel;

      protected bankerPairCount: ui.RunTimeLabel;
      protected bankerPairCountPer: ui.RunTimeLabel;

      protected playerPairCount: ui.RunTimeLabel;
      protected playerPairCountPer: ui.RunTimeLabel;

      protected tiePairCount: ui.RunTimeLabel;
      protected tiePairCountPer: ui.RunTimeLabel;

      protected roundCount: ui.RunTimeLabel;
      protected roundPairCount: ui.RunTimeLabel;

      protected roundCounter: number = 99;
      protected roundPairCounter: number = 1;

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

        this.drawChartArc(400, 600, 100, _x + 500, _y, 100, 15);
        this.drawChartArc(50, 20, 70, _x + 1110, _y, 100, 15);

        this.roundCount.text = this.roundCounter.toString();
        this.roundPairCount.text = this.roundPairCounter.toString();

        if (this.roundCounter === 1) {
          this.roundLabelLeft.textKey = 'baccarat.round';
        }

        if (this.roundPairCounter === 1) {
          this.roundLabelRight.textKey = 'baccarat.round';
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

      public setValue(tableInfo: data.TableInfo) {
        if (tableInfo.gamestatistic.bankerCount) {
          this.totalBankerCount && (this.totalBankerCount.text = tableInfo.gamestatistic.bankerCount.toString());
        }
        if (tableInfo.gamestatistic.playerCount) {
          this.totalPlayerCount && (this.totalPlayerCount.text = tableInfo.gamestatistic.playerCount.toString());
        }
        if (tableInfo.gamestatistic.tieCount) {
          this.totalTieCount && (this.totalTieCount.text = tableInfo.gamestatistic.tieCount.toString());
        }
        if (tableInfo.gamestatistic.bankerPairCount) {
          this.bankerPairCount && (this.bankerPairCount.text = tableInfo.gamestatistic.bankerPairCount.toString());
        }
        if (tableInfo.gamestatistic.playerPairCount) {
          this.playerPairCountPer && (this.playerPairCountPer.text = tableInfo.gamestatistic.playerPairCount.toString());
        }
      }
    }
  }
}
