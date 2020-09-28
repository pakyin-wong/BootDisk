namespace we {
  export namespace lo {
    export class FunBetCustomBet extends core.BaseEUI {
      protected _custombetBtn: ui.RoundRectButton;
      protected _custombetBtnSelect: ui.RoundRectButton;
      protected _custombetField: eui.TextInput;
      protected _custombetPop: ui.Group;
      protected _onFocus: boolean = false;
      protected _onSelect: boolean = false;
      protected _currBet: number = 0;

      protected mount() {
        super.mount();
        this._custombetBtn.label.renderText = () => `${i18n.t('lo_fun_custombet')}`;
        this._custombetBtnSelect.label.renderText = () => `${i18n.t('lo_fun_custombet')}`;
        this._custombetField.textDisplay.restrict = '0-9';
        this.checkbetLimit();

        this._custombetBtn.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        this._custombetField.textDisplay.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
        this._custombetField.textDisplay.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
        this._custombetField.textDisplay.addEventListener(egret.Event.CHANGE, this.onInput, this);
        dir.evtHandler.addEventListener(core.Event.BET_LIMIT_CHANGE, this.checkbetLimit, this);
        utils.addButtonListener(this._custombetBtn, this.onClick, this);
      }

      protected destroy() {
        super.destroy();
        this._custombetBtn.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        this._custombetField.textDisplay.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
        this._custombetField.textDisplay.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
        this._custombetField.textDisplay.removeEventListener(egret.Event.CHANGE, this.onInput, this);
        dir.evtHandler.removeEventListener(core.Event.BET_LIMIT_CHANGE, this.checkbetLimit, this);
        utils.removeButtonListener(this._custombetBtn, this.onClick, this);
      }

      protected onFocusIn() {
        this._onFocus = true;
      }

      protected onFocusOut() {
        this._onFocus = false;
      }

      protected onRollover() {
        this._custombetPop.visible = true;
      }

      protected onRollOut() {
        !this._onFocus && (this._custombetPop.visible = false);
      }

      protected onInput() {
        this._currBet = parseInt(this._custombetField.text, 10) * 100;
        this.checkbetLimit();

        if (this._onSelect) {
          utils.getFunBet().bet = this.currentBet;
        }
      }

      protected onClick() {
        this.dispatchEvent(new egret.Event('CUSTOMBET_SELECTED'));
      }

      protected checkbetLimit() {
        const betLimit = env.betLimits[env.currentSelectedBetLimitIndex];
        if (this.currentBet < betLimit.minlimit) {
          this.currentBet = betLimit.minlimit;
        } else if (this.currentBet > betLimit.maxlimit) {
          this.currentBet = betLimit.maxlimit;
        }
      }

      public set currentBet(n: number) {
        this._currBet = n;
        this._custombetField.text = (n * 0.01).toString(10);
      }

      public get currentBet(): number {
        return this._currBet;
      }

      public set enabled(b) {
        this._custombetField.enabled = b;

        if (!b && this._onFocus) {
          const activename = document.activeElement;
          if (activename && activename['blur']) {
            activename['blur']();
          }
          this._onFocus = false;
        }
      }

      public set selected(b) {
        this._onSelect = b;
        this.currentState = b ? 'select' : 'normal';
      }
    }
  }
}
