namespace we {
  export namespace ba {
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
        this.drawChartArc(400, 600, 100, 500, 340, 100, 15);
        this.drawChartArc(50, 20, 70, 1110, 340, 100, 15);
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
