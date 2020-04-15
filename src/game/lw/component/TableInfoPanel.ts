namespace we {
  export namespace lw {
    export class TableInfoPanel extends ui.TableInfoPanel {
      protected bankerLabel: eui.Label;
      protected playerLabel: eui.Label;
      protected tieLabel: eui.Label;
      protected bankerPairLabel: eui.Label;
      protected playerPairLabel: eui.Label;

      protected pBanker: eui.Label;
      protected pPlayer: eui.Label;
      protected pTie: eui.Label;
      protected pBankerPair: eui.Label;
      protected pPlayerPair: eui.Label;

      protected gameIdLabel: eui.Label;
      protected betLimitLabel: eui.Label;

      protected pGameID: eui.Label;

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
        super.changeLang();
        this.bankerLabel.text = i18n.t('baccarat.banker');
        this.playerLabel.text = i18n.t('baccarat.player');
        this.tieLabel.text = i18n.t('baccarat.tie');
        this.bankerPairLabel.text = i18n.t('baccarat.bankerPair');
        this.playerPairLabel.text = i18n.t('baccarat.playerPair');
        if (this.gameIdLabel) {
          this.gameIdLabel.text = i18n.t('mobile_table_info_gameID');
        }
        if (this.betLimitLabel) {
          this.betLimitLabel.text = i18n.t('baccarat.betLimitshort');
        }
      }

      public setValue(tableInfo: data.TableInfo) {
        super.setValue(tableInfo);
        if (tableInfo.gamestatistic.bankerCount) {
          this.pBanker.text = tableInfo.gamestatistic.bankerCount.toString();
        }
        if (tableInfo.gamestatistic.playerCount) {
          this.pPlayer.text = tableInfo.gamestatistic.playerCount.toString();
        }
        if (tableInfo.gamestatistic.tieCount) {
          this.pTie.text = tableInfo.gamestatistic.tieCount.toString();
        }
        if (tableInfo.gamestatistic.bankerPairCount) {
          this.pBankerPair.text = tableInfo.gamestatistic.bankerPairCount.toString();
        }
        if (tableInfo.gamestatistic.playerPairCount) {
          this.pPlayerPair.text = tableInfo.gamestatistic.playerPairCount.toString();
        }
        if (this.pGameID) {
          this.pGameID.text = tableInfo.betInfo.gameroundid;
        }
      }
    }
  }
}
