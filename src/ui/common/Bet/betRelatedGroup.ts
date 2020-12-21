namespace we {
  export namespace ui {
    export class BetRelatedGroup extends core.BaseGamePanel {
      public _confirmButton: ui.IButton | ui.BetConfirmButton;
      protected _repeatButton: ui.BaseImageButton;
      protected _cancelButton: ui.BaseImageButton;
      protected _doubleButton: ui.BaseImageButton;
      protected _undoButton: ui.BaseImageButton;

      protected _repeatLabel: ui.RunTimeLabel;
      protected _cancelLabel: ui.RunTimeLabel;
      protected _doubleLabel: ui.RunTimeLabel;
      protected _undoLabel: ui.RunTimeLabel;

      protected isPlaySound: boolean;

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
        this._timer._isColorTransform = true;
        this.currentState = env.leftHandMode ? 'left_hand_mode' : 'right_hand_mode';
        this._timer.addEventListener('UPDATE', this.onRemainingTimeUpdate, this);
        this.isPlaySound = false;
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
        this._timer.stop();
        this.isPlaySound = false;
      }

      protected onRemainingTimeUpdate(evt: egret.Event) {
        const confirmButton = this._confirmButton as ui.BetConfirmButton;
        const remainingTime: number = evt.data;
        if (confirmButton && confirmButton.setColor) {

          if (remainingTime > 10000) {
            confirmButton.setColor(0, 1, 0);
          } else if (remainingTime > 5000) {
            confirmButton.setColor(1, 1, 0);
          } else {
            confirmButton.setColor(1, 0, 0);
          }
        }
        if(remainingTime > 3000 && this.isPlaySound){
          this.isPlaySound = false;
        }else if(remainingTime <= 3000 && !this.isPlaySound){
            this.isPlaySound = true;
            dir.audioCtr.play('ui_sfx_bet_time_out_mp3', 3);
        }
      }

      protected addListeners() {
        dir.evtHandler.addEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
        if (this._confirmButton) {
          this._confirmButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
          this._confirmButton.addEventListener('CLICKED', this.onConfirmPressed, this);
          this._confirmButton.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
          this._confirmButton.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        }
        if (this._repeatButton) {
          this._repeatButton.addEventListener('CLICKED', this.onRepeatPressed, this);
        }
        if (this._doubleButton) {
          this._doubleButton.addEventListener('CLICKED', this.onDoublePressed, this);
        }
        if (this._undoButton) {
          this._undoButton.addEventListener('CLICKED', this.onUndoPressed, this);
        }
        if (this._cancelButton) {
          this._cancelButton.addEventListener('CLICKED', this.onCancelPressed, this);
        }
        dir.evtHandler.addEventListener(core.Event.SWITCH_AUTO_CONFIRM_BET, this.changeTimerBg, this);
      }

      protected removeListeners() {
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
        if (this._confirmButton) {
          this._confirmButton.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
          this._confirmButton.removeEventListener('CLICKED', this.onConfirmPressed, this);
          this._confirmButton.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
          this._confirmButton.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        }
        if (this._repeatButton) {
          this._repeatButton.removeEventListener('CLICKED', this.onRepeatPressed, this);
        }
        if (this._doubleButton) {
          this._doubleButton.removeEventListener('CLICKED', this.onDoublePressed, this);
        }
        if (this._undoButton) {
          this._undoButton.removeEventListener('CLICKED', this.onUndoPressed, this);
        }
        if (this._cancelButton) {
          this._cancelButton.removeEventListener('CLICKED', this.onCancelPressed, this);
        }
        dir.evtHandler.removeEventListener(core.Event.SWITCH_AUTO_CONFIRM_BET, this.changeTimerBg, this);
      }

      public changeBtnState(isEnable: boolean = true, totalUncfmBetAmount: number = 0, isPrevBet: boolean = false, isBetState: boolean = true, isRepeatClicked: boolean = false) {
        const hasUncfmBet = totalUncfmBetAmount !== 0; // change to boolean
        const enableRepeat = isPrevBet && !isRepeatClicked
        // this._undoButton.touchEnabled = isEnable;
        // this._cancelButton.touchChildren = this._cancelButton.touchEnabled = isEnable;
        // // double btn check uncfm btn , not cfmbtn
        // this._doubleButton.touchChildren = this._doubleButton.touchEnabled = totalUncfmBetAmount ? true : false;
        // this._repeatButton.touchChildren = this._repeatButton.touchEnabled = enableRepeat;

        this._undoButton.buttonEnabled = isEnable;
        this._cancelButton.buttonEnabled = isEnable;
        this._repeatButton.buttonEnabled = enableRepeat;
        this._doubleButton.buttonEnabled = hasUncfmBet;
        (this._confirmButton as ui.BetConfirmButton).buttonEnabled = isBetState && hasUncfmBet;
        this._timer.bg_flash(false, isEnable);
      }
      protected onConfirmPressed() {
          this.dispatchEvent(new egret.Event('ON_CONFIRM_PRESS'));
      }
      protected onCancelPressed(evt: egret.Event) {
          this.dispatchEvent(new egret.Event('ON_CANCEL_PRESS'));
        // this.changeBtnState(false);
      }

      protected onRepeatPressed() {
          this.dispatchEvent(new egret.Event('ON_REPEAT_PRESS'));
        // this.changeBtnState(true);
      }

      protected onDoublePressed() {
        // this.changeBtnState(true);
          this.dispatchEvent(new egret.Event('ON_DOUBLE_PRESS'));
      }

      protected onUndoPressed() {
          this.dispatchEvent(new egret.Event('ON_UNDO_PRESS'));
      }

      protected onTouchDown() {
        if ((this._confirmButton as ui.BetConfirmButton).buttonEnabled) {
          this._timer.bg_flash(true, true, true);
        }
      }

      protected onRollover() {
        if ((this._confirmButton as ui.BetConfirmButton).buttonEnabled) {
          this._timer.bg_flash(true, true);
        }
      }

      protected onRollout() {
        if ((this._confirmButton as ui.BetConfirmButton).buttonEnabled) {
          this._timer.bg_flash(false, true);
        }
      }

      protected changeTimerBg() {
        if (this._timer) {
          this._timer.bg_flash(false);
        }
      }

      set enableConfirm(e: boolean) {
        (this._confirmButton as ui.BetConfirmButton).buttonEnabled = e;
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
