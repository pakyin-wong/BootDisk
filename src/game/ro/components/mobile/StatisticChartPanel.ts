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
        this.drawRect(this._colourGroup, 10, 20, 30, 0, 95, 14, true);
        this.drawRect(this._numberGroup, 70, 500, 300, 0, 95, 14);
        this.drawRect(this._bigGroup, 70, 60, 200, 0, 95, 14);
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

        const rectGreen: egret.Shape = new egret.Shape();
        rectGreen.graphics.lineStyle(15, 0x2dc85c);
        rectGreen.graphics.drawRect(x + widthA, y, widthB, height);
        rectGreen.graphics.endFill();
        theGroup.addChild(rectGreen);

        const rectRed: egret.Shape = new egret.Shape();
        rectRed.graphics.lineStyle(15, 0xab2020);
        rectRed.graphics.drawRect(x, y, widthA, height);
        rectRed.graphics.endFill();
        theGroup.addChild(rectRed);

        const rectBlue: egret.Shape = new egret.Shape();
        if (!isBlack) {
          rectBlue.graphics.lineStyle(15, 0x607dff);
        } else {
          rectBlue.graphics.lineStyle(15, 0x000000);
        }
        rectBlue.graphics.drawRect(x + 500 - widthC, y, widthC, height);
        rectBlue.graphics.endFill();
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
