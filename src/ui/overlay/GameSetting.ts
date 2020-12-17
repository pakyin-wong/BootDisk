namespace we {
  export namespace overlay {
    export class GameSetting extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;

      private _txt_autoBet: ui.RunTimeLabel;
      protected switch_autoBet: ui.BaseButton;

      private _txt_showHint: ui.RunTimeLabel;
      protected switch_showHint: ui.BaseButton;

      private _btn_sendLiveVer: ui.RoundRectButton;

      protected _btn_autoBet: eui.Component;
      protected _btn_showHint: eui.Component;
      constructor() {
        super('GameSetting');
      }

      protected mount() {
        super.mount();
        this.updateState();
      }

      protected updateState() {
        if (env._currGameType==null || env._currGameType === core.GameType.BAB || env._currGameType === core.GameType.DTB || env._currGameType === core.GameType.BASB || env._currGameType === core.GameType.BAMB) {
          this.currentState = 'noSendLive';
        } else this.currentState = 'sendLive';
      }
      
      protected init_menu() {
        this._txt_title.renderText = () => `${i18n.t('nav.menu.gameSet')}`;
        this._txt_showHint.renderText = () => `${i18n.t('overlaypanel_gameSet_showGoodRoadHint')}`;
        this._btn_sendLiveVer.label.renderText = () => `${i18n.t('overlaypanel_gameSet_sendLiveVerfication')}`;

        if (env.isMobile) {
          if(this._btn_sendLiveVer){
            this._btn_sendLiveVer.label.size = 60;
          }
        }

        this.switch_showHint.active = env.showGoodRoadHint;
        // if (!env.isMobile) {
        this._txt_autoBet.renderText = () => `${i18n.t('overlaypanel_gameSet_autoBet')}`;
        this.switch_autoBet.active = env.autoConfirmBet;
        // }
        this.addListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected addListeners() {
        utils.addButtonListener(this.switch_showHint, this.onSwitchShowHint, this);
        if(this._btn_sendLiveVer){
          utils.addButtonListener(this._btn_sendLiveVer, this.onSendLiveVerCall, this);
        }

        if (!env.isMobile) {
          utils.addButtonListener(this.switch_autoBet, this.onSwitchAutoBet, this);
        } else {
          utils.addButtonListener(this._btn_autoBet, this.onSwitchAutoBet, this);
          utils.addButtonListener(this._btn_showHint, this.onSwitchShowHint, this);
          // this.switch_autoBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchAutoBet, this);
        }
      }

      protected removeListeners() {
        this.switch_showHint.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchShowHint, this);
        if(this._btn_sendLiveVer){
          this._btn_sendLiveVer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendLiveVerCall, this);
        }

        if (!env.isMobile) {
          this.switch_autoBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchAutoBet, this);
        } else {
          this._btn_autoBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchAutoBet, this);
          this._btn_showHint.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchShowHint, this);
          // this.switch_autoBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchAutoBet, this);
        }
      }

      protected onSwitchShowHint(e) {
        env.showGoodRoadHint = this.switch_showHint.active = !env.showGoodRoadHint;
        // console.log('env.showGoodRoadHint', env.showGoodRoadHint);

        const rslt = env.showGoodRoadHint ? '1' : '0';
        dir.socket.updateSetting('showGoodRoadHint', env.showGoodRoadHint === true ? '1' : '0');
      }

      protected onSwitchAutoBet(e) {
        env.autoConfirmBet = this.switch_autoBet.active = !env.autoConfirmBet;

        const rslt = env.autoConfirmBet ? '1' : '0';
        dir.evtHandler.dispatch(core.Event.SWITCH_AUTO_CONFIRM_BET, env.autoConfirmBet);
        dir.socket.updateSetting('autoConfirmBet', env.autoConfirmBet === true ? '1' : '0');
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
