namespace we {
  export namespace ro {
    export class MobileBetCombinationCreateItem extends core.BaseEUI {
      protected _txt_input: eui.EditableText;
      protected _txt_bgtxt: ui.RunTimeLabel;
      protected _txt_amount: eui.Label;
      protected _btn_confirm: egret.DisplayObject;

      protected _evtHandler: egret.EventDispatcher;

      protected _data;

      public constructor(evtHandler: egret.EventDispatcher) {
        super('ro.MobileBetCombinationCreateItem');
        this._evtHandler = evtHandler;
      }

      protected mount() {
        super.mount();

        this._txt_bgtxt.renderText = () => `${i18n.t('roulette.addCustomBet')}`;

        dir.evtHandler.$addListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        utils.addButtonListener(this._btn_confirm, this.onCreate, this);

        this.currentState = 'normal';
        this.updateText();
      }

      public gc() {
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        utils.removeButtonListener(this._btn_confirm, this.onCreate, this);
      }

      protected updateText() {
        this._txt_input.prompt = i18n.t('roulette.betCombination');
      }

      protected onCreate() {
        this._evtHandler.dispatchEvent(new egret.Event('CREATE'));
      }

      public get title(): string {
        return this._txt_input.text === '' ? this._txt_input.prompt : this._txt_input.text;
      }

      public init() {
        this._txt_input.text = '';
      }

      protected onRollover() {
        this.currentState = 'edit';
      }

      protected onRollout() {
        this.currentState = 'normal';
      }

      public set amount(n: number) {
        this._txt_amount.text = '$' + (n * 0.01).toString();
      }
    }
  }
}
