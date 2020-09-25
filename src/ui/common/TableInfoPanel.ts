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

      protected pTableID: ui.RunTimeLabel;
      protected pRoundID: eui.Label;
      protected pGameID: ui.RunTimeLabel;
      protected pDealer: eui.Label;
      protected pTableBetLimit: eui.Label;
      public pBetLimit: ui.RunTimeLabel;

      public constructor() {
        super();
        this.isEdgeDismissable = true;
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        utils.disableTouchforChildren(this, obj => {
          const bool = !!(<any>obj).text;
          return bool;
        });

        this._initY = this.y;

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        dir.evtHandler.addEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitChange, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        mouse.setButtonMode(this.close, true);
        this.changeLang();
      }

      protected onBetLimitChange() {
        const betLimitSet = env.betLimits[env.currentSelectedBetLimitIndex];
        if (this.pTableBetLimit && this.pBetLimit) {
          this.pTableBetLimit.text = utils.numberToFaceValue(betLimitSet.maxlimit);
          this.pBetLimit.text = `${utils.numberToFaceValue(betLimitSet.minlimit)} - ${utils.numberToFaceValue(betLimitSet.maxlimit)}`;
        }
      }

      protected destroy(): void {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        dir.evtHandler.removeEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitChange, this);
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
        if (this.tableBetLimitLabel) {
          this.tableBetLimitLabel.text = i18n.t('tableInfo.tableBetLimit');
        }

        if (!env.isMobile) {
          this.lblBet.text = i18n.t('tableInfo.bet');
          this.lblMax.text = i18n.t('tableInfo.max');
          this.lblOdds.text = i18n.t('tableInfo.odds');
        }
      }

      public setValue(tableInfo: data.TableInfo) {
        // this.pTableID.text = tableInfo.tableid;

        this.pTableID.renderText = () => `${i18n.t('gametype_' + we.core.GameType[tableInfo.gametype])} ${env.getTableNameByID(tableInfo.tableid)}`;
        this.pGameID.text = tableInfo.data.gameroundid;
        this.pRoundID.text = tableInfo.data.round ? tableInfo.data.round : '-';

        if(!env.isMobile){
          this.pGameID.targetWidth = 200;
        }
        // if (tableInfo.betInfo) {
        //   this.pGameID.text = tableInfo.betInfo.gameroundid ? tableInfo.betInfo.gameroundid : '-';
        // } else {
        //   this.pGameID.text = '-';
        // }
        this.pDealer.text = tableInfo.dealername ? tableInfo.dealername : '-';

        const betLimitSet = env.betLimits[env.currentSelectedBetLimitIndex];
        if (this.pTableBetLimit) {
          this.pTableBetLimit.text = utils.numberToFaceValue(betLimitSet.maxlimit);
        }
        this.pBetLimit.text = `${utils.numberToFaceValue(betLimitSet.minlimit)} - ${utils.numberToFaceValue(betLimitSet.maxlimit)}`;
        // this.pBetLimit.text = `${utils.numberToFaceValue(betLimitSet.chips[0])} - ${utils.numberToFaceValue(betLimitSet.chips[betLimitSet.chips.length - 1])}`;

        const config = this.getConfig();

        config.forEach(item => {
          if (item.data) {
            if (item.lblMax) {
              item.lblMax.text = item.data.maxlimit ? utils.numberToFaceValue(item.data.maxlimit) : '-';
            }
            item.lblOdd.text = item.data.odd ? item.data.odd : '-';
          } else {
            if (item.lblMax) {
              item.lblMax.text = '-';
            }
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
