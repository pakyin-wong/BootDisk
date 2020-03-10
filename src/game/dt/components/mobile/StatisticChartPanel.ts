namespace we {
  export namespace dt {
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
        this.drawChartArc();
      }

      protected drawChartArc() {
        const shapeRed: egret.Shape = new egret.Shape();
        shapeRed.graphics.lineStyle(15, 0xff6651);
        shapeRed.graphics.drawArc(500, 340, 100, 0, 120 * (Math.PI / 180), false);
        shapeRed.graphics.endFill();
        this.addChild(shapeRed);

        const shapeBlue: egret.Shape = new egret.Shape();
        shapeBlue.graphics.lineStyle(15, 0x3c38ff);
        shapeBlue.graphics.drawArc(500, 340, 100, 120 * (Math.PI / 180), 240 * (Math.PI / 180), false);
        shapeBlue.graphics.endFill();
        this.addChild(shapeBlue);

        const shapeGreen: egret.Shape = new egret.Shape();
        shapeGreen.graphics.lineStyle(15, 0x1f86c);
        shapeGreen.graphics.drawArc(500, 340, 100, 240 * (Math.PI / 180), 360 * (Math.PI / 180), false);
        shapeGreen.graphics.endFill();
        this.addChild(shapeGreen);

        const shapeRedPair: egret.Shape = new egret.Shape();
        shapeRedPair.graphics.lineStyle(15, 0xff6651);
        shapeRedPair.graphics.drawArc(1110, 340, 100, 0, 120 * (Math.PI / 180), false);
        shapeRedPair.graphics.endFill();
        this.addChild(shapeRedPair);

        const shapeBluePair: egret.Shape = new egret.Shape();
        shapeBluePair.graphics.lineStyle(15, 0x3c38ff);
        shapeBluePair.graphics.drawArc(1110, 340, 100, 120 * (Math.PI / 180), 240 * (Math.PI / 180), false);
        shapeBluePair.graphics.endFill();
        this.addChild(shapeBluePair);

        const shapeGreenPair: egret.Shape = new egret.Shape();
        shapeGreenPair.graphics.lineStyle(15, 0x1f86c);
        shapeGreenPair.graphics.drawArc(1110, 340, 100, 240 * (Math.PI / 180), 360 * (Math.PI / 180), false);
        shapeGreenPair.graphics.endFill();
        this.addChild(shapeGreenPair);
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
