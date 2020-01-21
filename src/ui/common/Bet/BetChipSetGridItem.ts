namespace we {
  export namespace ui {
    export class BetChipSetGridItem extends we.ui.ItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      public static STATE_NORMAL: number = 0;
      public static STATE_FOCUS: number = 1;

      protected _holderState: number = 0;
      public content: eui.Group;

      protected _betChip: BetChip;
      protected _betChipHeight: number = 85;
      protected _betChipWidth: number = 85;

      public constructor() {
        super();
        this.addEventListeners();
        this.width = this._betChipWidth;
        this.height = this._betChipHeight;
        this._betChip = new BetChip(0);
        this._betChip.height = this._betChipHeight;
        this._betChip.width = this._betChipWidth;
        this.addChild(this._betChip);
        mouse.setButtonMode(this._betChip, true);
      }

      protected addEventListeners() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
      }

      protected onClick() {
        if (this.parent && this.parent.parent) {
          (<BetChipSetGrid> this.parent.parent).setSelectedChip(+this.itemData, +this.itemIndex);
          (<BetChipSetGrid> this.parent.parent).selectedChipIndex = +this.itemIndex;
        }
      }

      public itemDataChanged() {
        super.itemDataChanged();
        if (this.itemData) {
          this._betChip.setValue(this.itemData, this.itemIndex, we.core.ChipType.FLAT);
          this._betChip.index = this.itemIndex;
        }
      }
    }
  }
}
