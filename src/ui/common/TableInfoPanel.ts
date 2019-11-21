namespace we {
  export namespace ui {
    export class TableInfoPanel extends Panel {
      private _visible;
      private _initY;
      public close: eui.Button;
      public content: eui.Group;
      public moveArea: eui.Component;
      private tableNoLabel: eui.Label;
      private roundNoLabel: eui.Label;
      private dealerLabel: eui.Label;
      private timeLabel: eui.Label;
      private betLimitLabel: eui.Label;
      private bankerLabel: eui.Label;
      private playerLabel: eui.Label;
      private tieLabel: eui.Label;
      private bankerPairLabel: eui.Label;
      private playerPairLabel: eui.Label;

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
        this.changeLang();
      }

      public onExit() {
        this.destroy();
      }

      public changeLang() {
        this.tableNoLabel.text = i18n.t('baccarat.tableNo');
        this.roundNoLabel.text = i18n.t('baccarat.roundNo');
        this.dealerLabel.text = i18n.t('baccarat.tableNo');
        this.timeLabel.text = i18n.t('baccarat.time');
        this.betLimitLabel.text = i18n.t('baccarat.betLimit');
        this.bankerLabel.text = i18n.t('baccarat.banker');
        this.playerLabel.text = i18n.t('baccarat.player');
        this.tieLabel.text = i18n.t('baccarat.tie');
        this.bankerPairLabel.text = i18n.t('baccarat.bankerPair');
        this.playerPairLabel.text = i18n.t('baccarat.playerPair');
      }
    }
  }
}
