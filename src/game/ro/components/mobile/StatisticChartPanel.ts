namespace we {
  export namespace ro {
    export class StatisticChartPanel extends ui.Panel {
      protected _colourGroup: eui.Group;
      protected _numberGroup: eui.Group;
      protected _bigGroup: eui.Group;

      protected _greenGroup: eui.Group;

      protected _totalRedCount: ui.RunTimeLabel;
      protected _totalGreenCount: ui.RunTimeLabel;
      protected _totalBlackCount: ui.RunTimeLabel;

      protected _zeroGroup: eui.Group;

      protected _oddLabel: ui.RunTimeLabel;
      protected _zeroLabel: ui.RunTimeLabel;
      protected _evenLabel: ui.RunTimeLabel;

      protected _totalOddCount: ui.RunTimeLabel;
      protected _totalZeroCount: ui.RunTimeLabel;
      protected _totalEvenCount: ui.RunTimeLabel;

      protected _bigZeroGroup: eui.Group;

      protected _bigLabel: ui.RunTimeLabel;
      protected _bigZeroLabel: ui.RunTimeLabel;
      protected _smallLabel: ui.RunTimeLabel;

      protected _totalBigCount: ui.RunTimeLabel;
      protected _totalBigZeroCount: ui.RunTimeLabel;
      protected _totalSmallCount: ui.RunTimeLabel;

      protected moveGroup: eui.Group;
      protected _colourMask: eui.Image;

      public constructor() {
        super();
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
        this.drawRect(this._colourGroup, 10, 20, 30, 0, 80, 30, true);
        this.drawRect(this._numberGroup, 70, 500, 300, 0, 80, 30);
        this.drawRect(this._bigGroup, 70, 60, 200, 0, 80, 30);
      }

      protected drawRect(theGroup: eui.Group, a: number, b: number, c: number, x: number, y: number, height: number, isBlack: boolean = false) {
        const totalAmount = a + b + c;
        const widthA = 500 * (a / totalAmount);
        const widthB = 500 * (b / totalAmount);
        const widthC = 500 * (c / totalAmount);

        switch (theGroup) {
          case this._colourGroup:
            this.moveGroup = this._greenGroup;
            break;
          case this._numberGroup:
            this.moveGroup = this._zeroGroup;
            break;
          case this._bigGroup:
            this.moveGroup = this._bigZeroGroup;
            break;
        }

        this.moveGroup.x = (x + widthA + widthB) / 2 + 27.5;

        const matrixGreen = new egret.Matrix();
        matrixGreen.createGradientBox(widthB, height, 0, 0, 0);

        const rectGreen: egret.Shape = new egret.Shape();
        rectGreen.graphics.beginGradientFill(egret.GradientType.RADIAL, [0x188d43, 0x2dc85c], [1, 1], [0, 255], matrixGreen);
        rectGreen.graphics.drawRect(x + widthA, y, widthB, height);
        rectGreen.graphics.endFill();
        rectGreen.mask = this._colourMask;
        theGroup.addChild(rectGreen);

        const matrixRed = new egret.Matrix();
        matrixRed.createGradientBox(widthA, height, 0, 0, 0);

        const rectRed: egret.Shape = new egret.Shape();
        rectRed.graphics.beginGradientFill(egret.GradientType.RADIAL, [0xff3c3c, 0xab2020], [1, 1], [0, 255], matrixRed);
        rectRed.graphics.drawRect(x, y, widthA, height);
        rectRed.graphics.endFill();
        rectRed.mask = this._colourMask;
        theGroup.addChild(rectRed);

        const matrixBlue = new egret.Matrix();
        matrixBlue.createGradientBox(widthC, height, 0, 0, 0);

        const rectBlue: egret.Shape = new egret.Shape();
        if (!isBlack) {
          rectBlue.graphics.beginGradientFill(egret.GradientType.RADIAL, [0x3050e0, 0x607dff], [1, 1], [0, 255], matrixBlue);
        } else {
          rectBlue.graphics.beginGradientFill(egret.GradientType.RADIAL, [0x474747, 0x000000], [1, 1], [0, 255], matrixBlue);
        }
        rectBlue.graphics.drawRect(x + 500 - widthC, y, widthC, height);
        rectBlue.graphics.endFill();
        rectBlue.mask = this._colourMask;
        theGroup.addChild(rectBlue);
      }

      public changeLang() {
        this._oddLabel.text = i18n.t('roulette.odd');
        this._zeroLabel.text = i18n.t('roulette.zeroShort');
        this._evenLabel.text = i18n.t('roulette.even');
        this._bigLabel.text = i18n.t('roulette.roadBig');
        this._bigZeroLabel.text = i18n.t('roulette.zeroShort');
        this._smallLabel.text = i18n.t('roulette.roadSmall');
      }

      public setValue(tableInfo: data.TableInfo) {
        // if (tableInfo.gamestatistic.bankerCount) {
        //   this.totalBankerCount.text = tableInfo.gamestatistic.bankerCount.toString();
        // }
        // if (tableInfo.gamestatistic.playerCount) {
        //   this.totalPlayerCount.text = tableInfo.gamestatistic.playerCount.toString();
        // }
        // if (tableInfo.gamestatistic.tieCount) {
        //   this.totalTieCount.text = tableInfo.gamestatistic.tieCount.toString();
        // }
        // if (tableInfo.gamestatistic.bankerPairCount) {
        //   this.bankerPairCount.text = tableInfo.gamestatistic.bankerPairCount.toString();
        // }
        // if (tableInfo.gamestatistic.playerPairCount) {
        //   this.playerPairCountPer.text = tableInfo.gamestatistic.playerPairCount.toString();
      }
    }
  }
}
