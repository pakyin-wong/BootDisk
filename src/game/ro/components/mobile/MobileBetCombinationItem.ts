namespace we {
  export namespace ro {
    export class MobileBetCombinationItem extends core.BaseEUI {
      protected _bg: egret.DisplayObject;
      protected _btn_delete: egret.DisplayObject;
      protected _txt_title: eui.Label;
      protected _txt_amount: eui.Label;
      protected _evtHandler: egret.EventDispatcher;

      protected _data;

      public constructor(evtHandler: egret.EventDispatcher) {
        super('ro.MobileBetCombinationItem');
        this._evtHandler = evtHandler;
      }

      protected mount() {
        super.mount();
        utils.addButtonListener(this._bg, this.onClick, this);
        utils.addButtonListener(this._btn_delete, this.onRemove, this);
      }

      public gc() {
        utils.removeButtonListener(this._bg, this.onClick, this);
        utils.removeButtonListener(this._btn_delete, this.onRemove, this);
      }

      public set data(d) {
        this._data = d;

        this._txt_title.text = this._data.title;
        this.amount = this.betAmount;
      }

      public set amount(n: number) {
        this._txt_amount.text = '$' + (n * 0.01).toString();
      }

      protected onClick() {
        this._data && this._evtHandler.dispatchEvent(new egret.Event('SELECT', false, false, this._data));
      }

      protected onRemove() {
        this._data && this._evtHandler.dispatchEvent(new egret.Event('REMOVE', false, false, this._data));
      }

      protected get betAmount() {
        let amount: number = 0;
        if (this._data && this._data.optionsList) {
          amount = this._data.optionsList.reduce((a, b) => a + b.amount, 0);
        }
        return amount;
      }
    }
  }
}
