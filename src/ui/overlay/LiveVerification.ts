namespace we {
  export namespace overlay {
    export class LiveVerification extends ui.Panel {
      private liveVer_title: ui.RunTimeLabel;
      private liveVer_text: ui.RunTimeLabel;

      private firstCol: eui.Rect;
      private secCol: eui.Rect;
      private thirdCol: eui.Rect;
      private fortCol: eui.Rect;

      private _btn_sendLiveVer: eui.Component;
      protected _btn_showHint: eui.Component;
      protected switch_showHint: ui.BaseButton;

      constructor() {
        super('LiveVerification');
      }

      protected mount() {
        super.mount();
        this.addListeners();
        this.updateText();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      public updateText() {
        this.liveVer_title.text = i18n.t('mobile_game_panel_historyRoad');
        this.liveVer_text.text = i18n.t('mobile_game_panel_history');
      }

      protected addListeners() {
        // utils.addButtonListener(this._btn_showHint, this.onSwitchShowHint, this);
        // this._btn_sendLiveVer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendLiveVerCall, this);
      }

      protected removeListeners() {
        // this._btn_showHint.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchShowHint, this);
        // this._btn_sendLiveVer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendLiveVerCall, this);
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
      }
    }
  }
}
