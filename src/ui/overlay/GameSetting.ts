namespace we {
  export namespace overlay {
    export class GameSetting extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;

      private _txt_autoBet: ui.RunTimeLabel;
      protected switch_autoBet: ui.BaseButton;

      private _txt_showHint: ui.RunTimeLabel;
      protected switch_showHint: ui.BaseButton;

      private _btn_sendLiveVer: ui.RoundRectButton;

      constructor() {
        super('GameSetting');
      }

      protected mount() {
        super.mount();
      }

      protected init_menu() {
        this._txt_title.renderText = () => `${i18n.t('nav.menu.gameSet')}`;
        this._txt_showHint.renderText = () => `${i18n.t('overlaypanel_gameSet_showGoodRoadHint')}`;
        this._btn_sendLiveVer.label.renderText = () => `${i18n.t('overlaypanel_gameSet_sendLiveVerfication')}`;

        if (env.isMobile) {
          this._btn_sendLiveVer.label.size = 60;
        }

        this.switch_showHint.active = env.showGoodRoadHint;
        if (!env.isMobile) {
          this._txt_autoBet.renderText = () => `${i18n.t('overlaypanel_gameSet_autoBet')}`;
          this.switch_autoBet.active = env.autoConfirmBet;
        }
        this.addListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected addListeners() {
        utils.addButtonListener(this.switch_showHint, this.onSwitchShowHint, this);
        utils.addButtonListener(this._btn_sendLiveVer, this.onSendLiveVerCall, this);

        if (!env.isMobile) {
          utils.addButtonListener(this.switch_autoBet, this.onSwitchAutoBet, this);
        }
      }

      protected removeListeners() {
        this.switch_showHint.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchShowHint, this);
        this._btn_sendLiveVer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendLiveVerCall, this);

        if (!env.isMobile) {
          this.switch_autoBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchAutoBet, this);
        }
      }

      protected onSwitchShowHint(e) {
        env.showGoodRoadHint = this.switch_showHint.active = !env.showGoodRoadHint;
      }

      protected onSwitchAutoBet(e) {
        env.autoConfirmBet = this.switch_autoBet.active = !env.autoConfirmBet;
      }

      protected onSendLiveVerCall() {
        dir.evtHandler.createOverlay({
          class: 'LiveVerification',
        });
        logger.l(utils.LogTarget.DEBUG, `GameSetting::LiveVerification`);
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.init_menu();
      }
    }
  }
}
