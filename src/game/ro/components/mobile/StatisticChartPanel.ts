namespace we {
  export namespace ro {
    export class StatisticChartPanel extends ui.Panel {
      protected _leftTitle: eui.Label;
      protected _rightTitle: eui.Label;
      protected roundLabelLeft: eui.Label;
      protected roundLabelRight: eui.Label;

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
      protected roundPairCountPer: ui.RunTimeLabel;

      public constructor() {
        super();
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        // this.changeLang();
        this.drawRect(10, 20, 30, 250, 150, 14, true);
        this.drawRect(70, 500, 300, 250, 350, 14);
      }

      protected drawRect(a: number, b: number, c: number, x: number, y: number, height: number, isBlack: boolean = false) {
        const totalAmount = a + b + c;
        const widthA = 500 * (a / totalAmount);
        const widthB = 500 * (b / totalAmount);
        const widthC = 500 * (c / totalAmount);

        const rectRed: egret.Shape = new egret.Shape();
        rectRed.graphics.lineStyle(15, 0xab2020);
        rectRed.graphics.drawRect(x, y, widthA, height);
        rectRed.graphics.endFill();
        this.addChild(rectRed);

        const rectBlue: egret.Shape = new egret.Shape();
        rectBlue.graphics.lineStyle(15, 0x607dff);
        rectBlue.graphics.drawRect(x + widthA, y, widthB, height);
        rectBlue.graphics.endFill();
        this.addChild(rectBlue);

        const rectGreen: egret.Shape = new egret.Shape();
        if (isBlack) {
          rectGreen.graphics.lineStyle(15, 0x2dc85c);
        } else {
          rectGreen.graphics.lineStyle(15, 0x000000);
        }
        rectGreen.graphics.drawRect(x + 500 - widthC, y, widthC, height);
        rectGreen.graphics.endFill();
        this.addChild(rectGreen);
      }

      public changeLang() {
        // this.bankerLabel.text = i18n.t('baccarat.banker');
        // this.playerLabel.text = i18n.t('baccarat.player');
        // this.tieLabel.text = i18n.t('baccarat.tie');
        // this.bankerPairLabel.text = i18n.t('baccarat.bankerPair');
        // this.playerPairLabel.text = i18n.t('baccarat.playerPair');
        // if (this.gameIdLabel) {
        //   this.gameIdLabel.text = i18n.t('mobile_table_info_gameID');
        // }
        // if (this.betLimitLabel) {
        //   this.betLimitLabel.text = i18n.t('baccarat.betLimitshort');
        // }
      }

      public setValue(tableInfo: data.TableInfo) {
        if (tableInfo.gamestatistic.bankerCount) {
          this.totalBankerCount.text = tableInfo.gamestatistic.bankerCount.toString();
        }
        if (tableInfo.gamestatistic.playerCount) {
          this.totalPlayerCount.text = tableInfo.gamestatistic.playerCount.toString();
        }
        if (tableInfo.gamestatistic.tieCount) {
          this.totalTieCount.text = tableInfo.gamestatistic.tieCount.toString();
        }
        if (tableInfo.gamestatistic.bankerPairCount) {
          this.bankerPairCount.text = tableInfo.gamestatistic.bankerPairCount.toString();
        }
        if (tableInfo.gamestatistic.playerPairCount) {
          this.playerPairCountPer.text = tableInfo.gamestatistic.playerPairCount.toString();
        }
      }
    }
  }
}
