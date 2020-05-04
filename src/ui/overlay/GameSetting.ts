namespace we {
  export namespace overlay {
    export class GameSetting extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;

      private _txt_showHint: ui.RunTimeLabel;
      private _txt_sendLiveVer: ui.RunTimeLabel;

      private _btn_sendLiveVer: eui.Component;
      protected _btn_showHint: eui.Component;
      protected switch_showHint: ui.BaseButton;

      constructor() {
        super('GameSetting');
      }

      protected mount() {
        super.mount();
      }

      protected init_menu() {
        this._txt_title.renderText = () => `${i18n.t('nav.menu.gameSet')}`;
        this._txt_showHint.renderText = () => i18n.t('overlaypanel_gameSet_showGoodRoadHint');
        this._txt_sendLiveVer.renderText = () => `${i18n.t('overlaypanel_gameSet_sendLiveVerfication')}`;

        this.switch_showHint.active = env.showGoodRoadHint;

        this.addListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected addListeners() {
        utils.addButtonListener(this._btn_showHint, this.onSwitchShowHint, this);
        this._btn_sendLiveVer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendLiveVerCall, this);
      }

      protected removeListeners() {
        this._btn_showHint.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchShowHint, this);
        this._btn_sendLiveVer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendLiveVerCall, this);
      }

      protected onSwitchShowHint(e) {
        env.showGoodRoadHint = this.switch_showHint.active = !env.showGoodRoadHint;
      }

      protected onSendLiveVerCall() {
        // OpenSendLiveVerCallPanel
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.init_menu();
      }
    }
  }
}
