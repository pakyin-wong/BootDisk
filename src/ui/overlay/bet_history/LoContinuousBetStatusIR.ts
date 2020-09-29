namespace we {
  export namespace overlay {
    export class LoContinuousBetStatusIR extends eui.ItemRenderer {
      protected _round: eui.Label;
      protected _rate: eui.Label;
      protected _status: eui.Label;
      protected _btn_cancel: betHistory.CancelBetbutton;
      protected _btn_detail: egret.DisplayObject;
      protected _txt_detail: eui.Label;

      protected _id;

      public constructor() {
        super();
        this.skinName = utils.getSkinByClassname('LoContinuousBetStatusIR');
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.mount, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.destroy, this);
      }

      protected mount(): void {
        // utils.addButtonListener(this._btn_cancel, this.onBtnCancel, this);
        utils.addButtonListener(this._btn_detail, this.onBtnDetail, this);
      }

      protected destroy() {
        // utils.removeButtonListener(this._btn_cancel, this.onBtnCancel, this);
        utils.removeButtonListener(this._btn_detail, this.onBtnDetail, this);
      }

      protected dataChanged(): void {
        this._btn_cancel.label.text = i18n.t('overlaypanel_bethistorylottery_continuousbet_cancel');
        this._txt_detail.text = i18n.t('overlaypanel_bethistorylottery_continuousbet_detail');

        this._id = {
          continuousbetid: this.data.continuousbetid,
          gameroundid: this.data.gameroundid,
        };

        this._btn_cancel.setKey(this.data.continuousbetid, this.data.gameroundid, this.data.tablename);

        this._round.text = this.data.gameroundid;
        this._rate.text = this.data.multiplier;
        switch (this.data.betstatus) {
          case 0:
            this._status.text = i18n.t('overlaypanel_bethistorylottery_continuousbet_betted');
            this.currentState = 'vaild';
            break;
          case 1:
          case 2:
            this._status.text = i18n.t('overlaypanel_bethistorylottery_continuousbet_completed');
            this.currentState = 'detail';
            break;
          case 3:
          case 4:
            this._status.text = i18n.t('overlaypanel_bethistorylottery_continuousbet_cancelled');
            this.currentState = 'invaild';
            break;
        }
      }

      protected onBtnDetail() {
        dir.evtHandler.dispatch('BETHISTORY_SHOW_POPUP_BET_DETAIL', this._id);
      }
    }
  }
}
