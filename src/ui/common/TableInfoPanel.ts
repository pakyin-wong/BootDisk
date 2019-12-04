namespace we {
  export namespace ui {
    export class TableInfoPanel extends Panel {
      private _visible;
      private _initY;
      public close: eui.Label;
      public content: eui.Group;
      public moveArea: eui.Component;

      private lblTableInfo: eui.Label;

      private tableNoLabel: eui.Label;
      private roundNoLabel: eui.Label;
      private dealerLabel: eui.Label;
      private timeLabel: eui.Label;

      private bankerLabel: eui.Label;
      private playerLabel: eui.Label;
      private tieLabel: eui.Label;
      private bankerPairLabel: eui.Label;
      private playerPairLabel: eui.Label;

      private pTableID: eui.Label;
      private pRoundID: eui.Label;
      private pDealer: eui.Label;
      private pTime: eui.Label;

      private pBanker: eui.Label;
      private pPlayer: eui.Label;
      private pTie: eui.Label;
      private pBankerPair: eui.Label;
      private pPlayerPair: eui.Label;

      public constructor() {
        super();
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this._initY = this.y;
        // this.alpha = 0;
        // this.visible = true;
        // this.close.addEventListener(
        //   egret.TouchEvent.TOUCH_TAP,
        //   () => {
        //     this.visible = !this.visible;
        //   },
        //   this
        // );
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        mouse.setButtonMode(this.close, true);
        this.changeLang();
      }

      public onExit() {
        this.destroy();
      }

      public changeLang() {
        this.tableNoLabel.text = i18n.t('baccarat.tableNo');
        this.roundNoLabel.text = i18n.t('baccarat.roundNo');
        this.dealerLabel.text = i18n.t('baccarat.dealer');
        this.timeLabel.text = i18n.t('baccarat.time');
        this.lblTableInfo.text = i18n.t('baccarat.tableInfo');
        this.bankerLabel.text = i18n.t('baccarat.banker');
        this.playerLabel.text = i18n.t('baccarat.player');
        this.tieLabel.text = i18n.t('baccarat.tie');
        this.bankerPairLabel.text = i18n.t('baccarat.bankerPair');
        this.playerPairLabel.text = i18n.t('baccarat.playerPair');
      }

      public setValue(tableInfo: data.TableInfo) {
        this.pTableID.text = tableInfo.tableid;
        this.pRoundID.text = tableInfo.data.gameroundid;
        this.pDealer.text = tableInfo.dealername ? tableInfo.dealername : '-';
        this.pTime.text = moment(env.currTime).format('YYYY/MM/DD');
        if (tableInfo.gamestatistic) {
          this.pBanker.text = tableInfo.gamestatistic.bankerCount.toString();
          this.pPlayer.text = tableInfo.gamestatistic.playerCount.toString();
          this.pTie.text = tableInfo.gamestatistic.tieCount.toString();
          this.pBankerPair.text = tableInfo.gamestatistic.bankerPairCount.toString();
          this.pPlayerPair.text = tableInfo.gamestatistic.playerPairCount.toString();
        }
      }
    }
  }
}
