namespace we {
  export namespace ui {
    export class BetInfoBaItem extends core.BaseEUI {
      private _bettingTable: we.ba.BettingTable;
      private _bettingChip: we.ba.BetChipSet;
      private _tableId: string;
      private _quickbetButton: we.ui.RoundButton;
      private _group: eui.Group;

      public constructor() {
        super();
        this.skinName = utils.getSkin('BetInfoBaItem');
      }

      public set tableId(value: string) {
        this._tableId = value;
      }

      public get tableId() {
        return this._tableId;
      }

      public getQuickbetButton(): ui.RoundButton {
        return this._quickbetButton;
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x += this.anchorOffsetX;
        this.y += this.anchorOffsetY;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this._group.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this._group.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        this._quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        // this._dropdown.items = ['test 1', 'test 2'];
        // this._dropdown.setToggler(this._dropdown_toggle);
        this.mount();

        this.setEventListeners();
        // this._group.setChildIndex(this._timer, 2500);
      }

      protected onTouchTap() {}

      protected onRollover() {}

      protected onRollout() {}

      protected onClickButton() {}

      protected setEventListeners() {}
    }
  }
}
