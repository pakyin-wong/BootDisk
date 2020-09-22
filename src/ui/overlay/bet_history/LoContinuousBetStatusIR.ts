namespace we {
  export namespace overlay {
    export class LoContinuousBetStatusIR extends eui.ItemRenderer {
      protected _round: eui.Label;
      protected _rate: eui.Label;
      protected _status: eui.Label;
      protected _btn_cancel: ui.RoundRectButton;

      public constructor() {
        super();
        this.skinName = utils.getSkinByClassname('LoContinuousBetStatusIR');
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.mount, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.destroy, this);
      }

      protected mount(): void {
        utils.addButtonListener(this._btn_cancel, this.onBtnCancel, this);
      }

      protected destroy() {
        utils.removeButtonListener(this._btn_cancel, this.onBtnCancel, this);
      }

      protected dataChanged(): void {}

      protected onBtnCancel() {}
    }
  }
}
