namespace we {
  export namespace ba {
    export class StatisticChartPanel extends ui.Panel {
      // protected bankerLabel: eui.Label;
      // protected playerLabel: eui.Label;
      // protected tieLabel: eui.Label;
      // protected bankerPairLabel: eui.Label;
      // protected playerPairLabel: eui.Label;

      // protected pBanker: eui.Label;
      // protected pPlayer: eui.Label;
      // protected pTie: eui.Label;
      // protected pBankerPair: eui.Label;
      // protected pPlayerPair: eui.Label;

      // protected gameIdLabel: eui.Label;
      // protected betLimitLabel: eui.Label;

      // protected pGameID: eui.Label;

      // public pBetLimit: ui.RunTimeLabel;

      public constructor() {
        super();
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        // dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        // this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        mouse.setButtonMode(this.close, true);
        // this.changeLang();
      }

      public onExit() {
        this.destroy();
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
    }
  }
}
