namespace we {
  export namespace ui {
    export class BetRelatedGroup extends core.BaseGamePanel {
      public _confirmButton: eui.Button;
      public _repeatButton: ui.BaseImageButton;
      public _cancelButton: ui.BaseImageButton;
      public _doubleButton: ui.BaseImageButton;
      public _undoButton: ui.BaseImageButton;

      public _repeatLabel: ui.RunTimeLabel;
      public _cancelLabel: ui.RunTimeLabel;
      public _doubleLabel: ui.RunTimeLabel;
      public _undoLabel: ui.RunTimeLabel;

      public _roundPanel: ui.RoundRectShape;
      public _timer: ui.CountdownTimer;

      public constructor(skin?: string) {
        super('BetRelatedGroup');
      }

      protected mount() {
        super.mount();
        // mouse.setButtonMode(this._btnBack, true);
        mouse.setButtonMode(this._confirmButton, true);
        this.addListeners();
      }

      public destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected addListeners() {
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
      }

      protected removeListeners() {
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
      }

      public changeBtnState(isEnable: boolean = true) {
        this._undoButton.touchChildren = this._undoButton.touchEnabled = isEnable;
        this._cancelButton.touchChildren = this._cancelButton.touchEnabled = isEnable;
        this._confirmButton.touchChildren = this._confirmButton.touchEnabled = isEnable;
        // this._doubleButton.touchChildren = this._doubleButton.touchEnabled = this._chipLayer.getTotalCfmBetAmount() ? true : false;
        this._repeatButton.touchChildren = this._repeatButton.touchEnabled = this.tableInfo.prevbets && this.tableInfo.prevroundid && this.tableInfo.prevroundid === this.tableInfo.prevbetsroundid;
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
    }
  }
}
