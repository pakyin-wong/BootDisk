namespace we {
  export namespace ba {
    export class StatisticChartHolder extends ui.Panel {
      protected _title01: ui.RunTimeLabel;
      protected _title02: ui.RunTimeLabel;

      protected _chart01: ui.SimpleChart;
      protected _chart02: ui.SimpleChart;

      protected tableInfo: data.TableInfo;

      protected _roundLabel01: ui.RunTimeLabel;
      protected _roundLabel02: ui.RunTimeLabel;

      protected _count01_a: ui.RunTimeLabel;
      protected _count01_b: ui.RunTimeLabel;
      protected _count01_c: ui.RunTimeLabel;
      protected _count02_a: ui.RunTimeLabel;
      protected _count02_b: ui.RunTimeLabel;
      protected _count02_c: ui.RunTimeLabel;

      protected _countPer01_a: ui.RunTimeLabel;
      protected _countPer01_b: ui.RunTimeLabel;
      protected _countPer01_c: ui.RunTimeLabel;

      protected _countPer02_a: ui.RunTimeLabel;
      protected _countPer02_b: ui.RunTimeLabel;
      protected _countPer02_c: ui.RunTimeLabel;

      protected _roundCount01: ui.RunTimeLabel;
      protected _roundCount02: ui.RunTimeLabel;

      protected _img01_a: eui.Image;
      protected _img01_b: eui.Image;
      protected _img01_c: eui.Image;

      protected _img02_a: eui.Image;
      protected _img02_b: eui.Image;
      protected _img02_c: eui.Image;

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

      // public setValue(tableInfo: data.TableInfo) {
      //   this.tableInfo = tableInfo;

      //   if (!this.tableInfo.gamestatistic) {
      //     return;
      //   }

      //   const bankerCount = this.tableInfo.gamestatistic.bankerCount;
      //   const playerCount = this.tableInfo.gamestatistic.playerCount;
      //   const tieCount = this.tableInfo.gamestatistic.tieCount;

      //   const totalCount = this.tableInfo.gamestatistic.totalCount;
      //   const bankerPairCount = this.tableInfo.gamestatistic.bankerPairCount;
      //   const playerPairCount = this.tableInfo.gamestatistic.playerPairCount;
      //   const remainingCount = totalCount - bankerPairCount - playerPairCount;

      //   const bankerPercentage = Math.round((bankerCount / totalCount) * 100);
      //   const playerPercentage = Math.round((playerCount / totalCount) * 100);
      //   const tiePercentage = Math.round((tieCount / totalCount) * 100);

      //   const bankerPairPercentage = Math.round((bankerPairCount / totalCount) * 100);
      //   const playerPairPercentage = Math.round((playerPairCount / totalCount) * 100);
      //   const remainingPercentage = Math.round((remainingCount / totalCount) * 100);

      //   this.roundCount.text = totalCount.toString();
      //   this.roundPairCount.text = totalCount.toString();

      //   this._normalChart.redAngle = bankerPercentage * 3.6;
      //   this._normalChart.blueAngle = playerPercentage * 3.6;
      //   this._normalChart.drawChart();

      //   this._pairChart.redAngle = bankerPairPercentage * 3.6;
      //   this._pairChart.blueAngle = playerPairPercentage * 3.6;
      //   this._pairChart.drawChart();

      //   // Count
      //   if (bankerCount || Math.round(bankerCount) === 0) {
      //     this.totalBankerCount && (this.totalBankerCount.text = bankerCount.toString());
      //   }
      //   if (playerCount || Math.round(playerCount) === 0) {
      //     this.totalPlayerCount && (this.totalPlayerCount.text = playerCount.toString());
      //   }
      //   if (tieCount || Math.round(tieCount) === 0) {
      //     this.totalTieCount && (this.totalTieCount.text = tieCount.toString());
      //   }
      //   if (bankerPairCount || Math.round(bankerPairCount) === 0) {
      //     this.bankerPairCount && (this.bankerPairCount.text = bankerPairCount.toString());
      //   }
      //   if (playerPairCount || Math.round(playerPairCount) === 0) {
      //     this.playerPairCount && (this.playerPairCount.text = playerPairCount.toString());
      //   }
      //   if (remainingCount || Math.round(remainingCount) === 0) {
      //     this.tiePairCount && (this.tiePairCount.text = remainingCount.toString());
      //   }

      //   // Percentage
      //   if (bankerPercentage || Math.round(bankerPercentage) === 0) {
      //     this.totalBankerCountPer && (this.totalBankerCountPer.text = bankerPercentage.toString());
      //   }
      //   if (playerPercentage || Math.round(playerPercentage) === 0) {
      //     this.totalPlayerCountPer && (this.totalPlayerCountPer.text = playerPercentage.toString());
      //   }
      //   if (tiePercentage || Math.round(tiePercentage) === 0) {
      //     this.totalTieCountPer && (this.totalTieCountPer.text = tiePercentage.toString());
      //   }
      //   if (bankerPairPercentage || Math.round(bankerPairPercentage) === 0) {
      //     this.bankerPairCountPer && (this.bankerPairCountPer.text = bankerPairPercentage.toString());
      //   }
      //   if (playerPairPercentage || Math.round(playerPairPercentage) === 0) {
      //     this.playerPairCountPer && (this.playerPairCountPer.text = playerPairPercentage.toString());
      //   }
      //   if (remainingPercentage || Math.round(remainingPercentage) === 0) {
      //     this.tiePairCountPer && (this.tiePairCountPer.text = remainingPercentage.toString());
      //   }
      // }

      // public update() {
      //   if (this.tableInfo && this.tableInfo.gamestatistic) {
      //     this.setValue(this.tableInfo);
      //   }
      // }
    }
  }
}
