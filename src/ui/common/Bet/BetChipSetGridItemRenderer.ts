namespace we {
  export namespace ui {
    export class BetChipSetGridItemRenderer extends ui.ItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      public static STATE_NORMAL: number = 0;
      public static STATE_FOCUS: number = 1;

      protected _holderState: number = 0;
      public content: eui.Group;

      protected _betChip: BetChip;
      protected _betChipHeight: number = 56;
      protected _betChipWidth: number = 70;

      protected get betChipSetGrid(): BetChipSetGrid {
        if (this.parent) {
          return this.parent.parent as BetChipSetGrid;
        }
        return null;
      }

      public constructor() {
        super();
        this.once(eui.UIEvent.ADDED_TO_STAGE, this.setSize, this);
        this.height = this.betChipSetGrid ? this.betChipSetGrid.betChipHeight : this._betChipHeight;
        this.width = this.betChipSetGrid ? this.betChipSetGrid.betChipWidth : this._betChipWidth;
        this._betChip = new BetChip(0);

        this._betChip.height = this.betChipSetGrid ? this.betChipSetGrid.betChipHeight : this._betChipHeight;
        this._betChip.width = this.betChipSetGrid ? this.betChipSetGrid.betChipWidth : this._betChipWidth;
        this.addChild(this._betChip);
        mouse.setButtonMode(this._betChip, true);
      }

      protected setSize() {
        this.height = this.betChipSetGrid ? this.betChipSetGrid.betChipHeight : this._betChipHeight;
        this.width = this.betChipSetGrid ? this.betChipSetGrid.betChipWidth : this._betChipWidth;
        this._betChip.height = this.betChipSetGrid ? this.betChipSetGrid.betChipHeight : this._betChipHeight;
        this._betChip.width = this.betChipSetGrid ? this.betChipSetGrid.betChipWidth : this._betChipWidth;
      }

      public dataChanged() {
        super.dataChanged();

        console.log('dataChanged', this.getCurrentState(), this.selected);
      }

      public itemDataChanged() {
        super.itemDataChanged();
        console.log('itemDataChanged', this.getCurrentState(), this.selected);
        if (this.itemData) {
          this._betChip.setValue(this.itemData, this.itemIndex, we.core.ChipType.PERSPECTIVE);
          this._betChip.index = this.itemIndex;
        }
      }
    }
  }
}
