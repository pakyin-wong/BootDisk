namespace we {
  export namespace ui {
    export class BetRelatedGroup extends core.BaseGamePanel {
      public _confirmButton: eui.Button;
      protected _repeatButton: ui.BaseImageButton;
      protected _cancelButton: ui.BaseImageButton;
      protected _doubleButton: ui.BaseImageButton;
      protected _undoButton: ui.BaseImageButton;

      protected _repeatLabel: ui.RunTimeLabel;
      protected _cancelLabel: ui.RunTimeLabel;
      protected _doubleLabel: ui.RunTimeLabel;
      protected _undoLabel: ui.RunTimeLabel;

      protected _roundPanel: ui.RoundRectShape;
      public _timer: ui.CountdownTimer;

      public constructor(skin: string = 'BetRelatedGroup') {
        if (env.orientation === 'portrait') {
          switch (env._currGameType) {
            case 12: // DI
            case 14: // RO
            case 17: // ROL
              skin = 'BetRelatedGroupVertical';
              break;
          }
        }
        super(skin);
      }

      protected mount() {
        super.mount();
        // mouse.setButtonMode(this._btnBack, true);
        mouse.setButtonMode(this._confirmButton, true);
        this.addListeners();
        this.changeLang();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
        this._timer.stop();
      }

      protected addListeners() {
        dir.evtHandler.addEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
        if (this._confirmButton) {
          this._confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
        }
        if (this._repeatButton) {
          this._repeatButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRepeatPressed, this, true);
        }
        if (this._doubleButton) {
          this._doubleButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoublePressed, this, true);
        }
        if (this._undoButton) {
          this._undoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUndoPressed, this, true);
        }
        if (this._cancelButton) {
          this._cancelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPressed, this, true);
        }
        if (env.isMobile) {
          dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }

      protected removeListeners() {
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
        if (this._confirmButton) {
          this._confirmButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
        }
        if (this._repeatButton) {
          this._repeatButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRepeatPressed, this, true);
        }
        if (this._doubleButton) {
          this._doubleButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoublePressed, this, true);
        }
        if (this._undoButton) {
          this._undoButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUndoPressed, this, true);
        }
        if (this._cancelButton) {
          this._cancelButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPressed, this, true);
        }
        if (env.isMobile) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }

      public changeBtnState(isEnable: boolean = true, totalCfmBetAmount: number = 0, isPrevBet: boolean = false) {
        this._undoButton.touchEnabled = isEnable;
        this._cancelButton.touchChildren = this._cancelButton.touchEnabled = isEnable;
        this._confirmButton.touchChildren = this._confirmButton.touchEnabled = isEnable;
        this._doubleButton.touchChildren = this._doubleButton.touchEnabled = totalCfmBetAmount ? true : false;
        this._repeatButton.touchChildren = this._repeatButton.touchEnabled = isPrevBet;
        this._undoButton.alpha = isEnable ? 1 : 0.5;
        this._cancelButton.alpha = isEnable ? 1 : 0.5;
        this._confirmButton.alpha = isEnable ? 1 : 0.3;
        this._repeatButton.alpha = this._repeatButton.touchEnabled ? 1 : 0.5;
        this._doubleButton.alpha = this._doubleButton.touchEnabled ? 1 : 0.5;
        if (this._timer.bg_color) {
          this._timer.bg_color.alpha = isEnable ? 0.7 : 0;
          if (isEnable) {
            this._timer.bg_flash();
          } else {
            this._timer.removebg_flash();
          }
        }
      }
      protected onConfirmPressed() {
        this.dispatchEvent(new egret.Event('ON_CONFIRM_PRESS'));
      }
      protected onCancelPressed(evt: egret.Event) {
        this.dispatchEvent(new egret.Event('ON_CANCEL_PRESS'));
        this.changeBtnState(false);
      }

      protected onRepeatPressed() {
        this.dispatchEvent(new egret.Event('ON_REPEAT_PRESS'));
        this.changeBtnState(true);
      }

      protected onDoublePressed() {
        this.changeBtnState(true);
        this.dispatchEvent(new egret.Event('ON_DOUBLE_PRESS'));
      }

      protected onUndoPressed() {
        this.dispatchEvent(new egret.Event('ON_UNDO_PRESS'));
      }

      set enableConfirm(e: boolean) {
        this._confirmButton.touchEnabled = e;
      }

      set enableCancel(e: boolean) {
        this._cancelButton.touchEnabled = e;
      }

      set isTimerVisible(e: boolean) {
        if (this._timer) {
          this._timer.visible = e;
        }
      }

      public updateCountdownTimer(gameData: any) {
        if (this._timer) {
          this._timer.countdownValue = gameData.countdown * 1000;
          this._timer.remainingTime = gameData.countdown * 1000 - (env.currTime - gameData.starttime);
          this._timer.start();
        }
      }

      protected changeLang() {
        // for mobile only
        if (env.isMobile) {
          this._repeatLabel.text = i18n.t('mobile_ba_repeat');
          this._repeatLabel.targetWidth = 120;
          this._cancelLabel.text = i18n.t('mobile_ba_clear');
          this._cancelLabel.targetWidth = 120;
          this._doubleLabel.text = i18n.t('mobile_ba_double');
          this._doubleLabel.targetWidth = 120;
          this._undoLabel.text = i18n.t('mobile_ba_undo');
          this._undoLabel.targetWidth = 120;
        }
      }

      protected changeHandMode() {
        if (env.leftHandMode) {
          this.currentState = 'left_hand_mode';
        } else {
          this.currentState = 'right_hand_mode';
        }
        this.invalidateState();
      }
    }
  }
}
