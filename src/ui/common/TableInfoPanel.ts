namespace we {
  export namespace ui {
    export class TableInfoPanel extends Panel {
      protected _initY;
      public close: eui.Image;
      public content: eui.Group;
      public moveArea: eui.Image;

      protected lblTableInfo: eui.Label;

      protected tableNoLabel: eui.Label;
      protected roundNoLabel: eui.Label;
      protected gameIdLabel: eui.Label;
      protected dealerLabel: eui.Label;
      protected tableBetLimitLabel: eui.Label;
      protected betLimitLabel: eui.Label;

      protected lblBet: eui.Label;
      protected lblMax: eui.Label;
      protected lblOdds: eui.Label;

      protected pTableID: eui.Label;
      protected pRoundID: eui.Label;
      protected pGameID: eui.Label;
      protected pDealer: eui.Label;
      protected pTableBetLimit: eui.Label;
      public pBetLimit: ui.RunTimeLabel;

      public constructor() {
        super();
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this._initY = this.y;

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        mouse.setButtonMode(this.close, true);
        this.changeLang();
      }

      public onExit() {
        this.destroy();
      }

      public changeLang() {
        this.lblTableInfo.text = i18n.t('tableInfo.tableInfo');

        this.tableNoLabel.text = i18n.t('tableInfo.tableNo');
        this.roundNoLabel.text = i18n.t('tableInfo.roundNo');
        this.gameIdLabel.text = i18n.t('mobile_table_info_gameID');
        this.dealerLabel.text = i18n.t('tableInfo.dealer');
        this.betLimitLabel.text = i18n.t('tableInfo.betLimit');

        if (!env.isMobile) {
          this.tableBetLimitLabel.text = i18n.t('tableInfo.tableBetLimit');
          this.lblBet.text = i18n.t('tableInfo.bet');
          this.lblMax.text = i18n.t('tableInfo.max');
          this.lblOdds.text = i18n.t('tableInfo.odds');
        }
      }

      public setValue(tableInfo: data.TableInfo) {
        this.pTableID.text = tableInfo.tableid;
        this.pRoundID.text = tableInfo.data.gameroundid;
        if (tableInfo.betInfo) this.pGameID.text = tableInfo.betInfo.gameroundid ? tableInfo.betInfo.gameroundid : '-';
        else this.pGameID.text = '-';
        this.pDealer.text = tableInfo.dealername ? tableInfo.dealername : '-';

        const betLimitSet = env.betLimits[env.currentSelectedBetLimitIndex];
        if (this.pTableBetLimit) this.pTableBetLimit.text = utils.numberToFaceValue(betLimitSet.maxlimit);
        this.pBetLimit.text = `${utils.numberToFaceValue(betLimitSet.chips[0])} -  ${utils.numberToFaceValue(betLimitSet.chips[betLimitSet.chips.length - 1])}`;

        const config = this.getConfig();

        config.forEach(item => {
          if (item.data) {
            item.lblMax.text = item.data.maxlimit ? utils.numberToFaceValue(item.data.maxlimit) : '-';
            item.lblOdd.text = item.data.odd ? item.data.odd : '-';
          } else {
            item.lblMax.text = '-';
            item.lblOdd.text = '-';
          }
        });
      }

      public getConfig(): any[] {
        return [];
      }
    }
  }
}
