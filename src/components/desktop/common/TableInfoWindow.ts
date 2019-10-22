namespace components {
  export class TableInfoWindow extends eui.Component implements eui.UIComponent {
    private _visible;
    private _initY;
    private closeButton: eui.Button;
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
      logger.l('TableInfoWindow');
      this.skinName = utils.getSkin('TableInfoWindow');
      this._visible = false;
      super.$setVisible(false);
    }

    protected partAdded(partName: string, instance: any): void {
      super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
      super.childrenCreated();
      this._initY = this.y;
      this.alpha = 0;
      this.visible = true;
      this.closeButton.addEventListener(
        egret.TouchEvent.TOUCH_TAP,
        () => {
          this.visible = !this.visible;
        },
        this
      );
      dir.evtHandler.addEventListener(enums.i18n.event.SWITCH_LANGUAGE, this.changeLang, this);
      this.changeLang();
    }

    public get visible(): boolean {
      return this._visible;
    }

    public set visible(vis: boolean) {
      const animY = 10;
      if (!vis) {
        // hide
        this.y = this._initY;
        this.alpha = 1;
        TweenLite.to(this, 0.2, {
          y: this._initY - animY,
          alpha: 0,
        }).eventCallback('onComplete', () => {
          this._visible = false;
          super.$setVisible(false);
        });
      } else {
        // show
        this.y = this._initY - animY;
        this.alpha = 0;
        this._visible = true;
        super.$setVisible(true);
        TweenLite.to(this, 0.2, {
          y: this._initY,
          alpha: 1,
        }).eventCallback('onComplete', () => {
          // add event listener for close
          this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTapAnywhere, this);
        });
      }
    }

    private handleTapAnywhere(event: egret.TouchEvent) {
      if (this.$hitTest(event.stageX, event.stageY)) {
        // is click on this window
        return;
      }
      this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTapAnywhere, this);
      // this.visible = false;
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
