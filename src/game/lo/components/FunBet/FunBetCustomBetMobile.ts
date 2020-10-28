namespace we {
  export namespace lo {
    export class FunBetCustomBetMobile extends core.BaseEUI {

    protected _btn_custom: ui.RoundRectButton;
    protected _txt_value: eui.Label;
    protected _input: eui.EditableText;
    protected _currBet = 0;
    protected _isSelected = false;

      public constructor() {
        super('lo.FunBetCustomBetMobile');
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this.verticalCenter = 20;
        this.horizontalCenter = 0;
        this._btn_custom.label.renderText = () => `${i18n.t('lo_fun_custombet')}`;
        
        this._input.inputType = egret.TextFieldInputType.TEL;
        this._input.restrict = '0-9';
        dir.evtHandler.addEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitChange, this);
        this._input.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
        this._input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
      }

      public dispose() {
        dir.evtHandler.removeEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitChange, this);
        this._input.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
        this._input.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
      }

      protected onFocusIn() {
        this._btn_custom.label.alpha = 0;
        this._txt_value.alpha = 0;
      }

      protected onFocusOut() {
        if(this._input.text.length > 0 && !this._input.text.match(/[^0-9]/g)) {
          this.currentBet = parseInt(this._input.text, 10) * 100;
          this.checkbetLimit();
          this.dispatchEvent(new egret.Event('CUSTOMBET_SELECTED'));
        }
        this._btn_custom.label.alpha = 1;
        this._txt_value.alpha = 1;
        this._input.text = '';
      }

      protected onBetLimitChange() {
        if(this._isSelected) {
          this.checkbetLimit();
          this.dispatchEvent(new egret.Event('CUSTOMBET_SELECTED'));
        }
      }

      protected checkbetLimit() {
        const betLimit = env.betLimits.Lottery[env.currentSelectedBetLimitIndex];
        if (this.currentBet < betLimit.minlimit) {
          this.currentBet = betLimit.minlimit;
        } else if (this.currentBet > betLimit.maxlimit) {
          this.currentBet = betLimit.maxlimit;
        }
      }

      public set currentBet(n: number) {
        this._currBet = n;
        this._txt_value.text = (n * 0.01).toString(10);
      }

      public get currentBet(): number {
        return this._currBet;
      }

      public set selected(b) {
        this._isSelected = b;
        this.currentState = b? 'down' : 'up';
      }

      public get selected() {
        return this._isSelected;
      }
    }
  }
}