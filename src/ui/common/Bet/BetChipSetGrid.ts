namespace we {
  export namespace ui {
    export class BetChipSetGrid extends BetChipSet {
      private _numberOfChipsInRow = 4;
      private _chipsetList: ui.List;
      private _chipsetLayout: eui.AnimTileLayout;
      private _normalGapSize: number = 15;
      private _setSelectedChip: (value: number, index: number) => void;

      public betChipHeight: number = 56;
      public betChipWidth: number = 70;

      public constructor() {
        super();
        this._chipsetLayout = new eui.AnimTileLayout();
        this._chipsetLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this._chipsetLayout.horizontalGap = this._normalGapSize;
        this._chipsetLayout.verticalGap = this._normalGapSize;
        this._chipsetLayout.paddingBottom = this._normalGapSize;
        this._chipsetLayout.requestedColumnCount = this._numberOfChipsInRow;

        this._chipsetList = new ui.List();
        this._chipsetList.layout = this._chipsetLayout;
        this._chipsetList.itemRenderer = BetChipSetGridItemRenderer;
        this._chipsetList.useVirtualLayout = false;
        this.addChild(this._chipsetList);
        this._chipsetList.left = 0;
        this._chipsetList.right = 0;
      }

      protected mount() {
        this._chipsetList.addEventListener(eui.UIEvent.CHANGE, this.onChipChange, this);
      }

      protected destroy() {
        this._chipsetList.removeEventListener(eui.UIEvent.CHANGE, this.onChipChange, this);
      }

      private onChipChange() {
        this.setSelectedChip(this._denomList[this._chipsetList.selectedIndex], this._chipsetList.selectedIndex);
        this.selectedChipIndex = this._chipsetList.selectedIndex;
      }

      public init(format: any, denomList: number[]) {
        this._denomList = denomList;
        this._chipsetList.dataProvider = new eui.ArrayCollection(denomList);
        this._selectedChipIndex = this._denomList.length - 1;
        this.setSelectedChip(this._denomList[this._denomList.length - 1], this._denomList.length - 1);
      }

      public setUpdateChipSetSelectedChipFunc(value: (value: number, index: number) => void) {
        this._setSelectedChip = value;
      }

      public setSelectedChip(value: number, index: number) {
        if (this._setSelectedChip) {
          this._setSelectedChip(value, index);
        }
      }

      public resetDenominationList(denomList: number[]) {
        this._denomList = denomList;
        this._chipsetList.dataProvider = new eui.ArrayCollection(denomList);
        this._selectedChipIndex = this._denomList.length - 1;
        this.setSelectedChip(denomList[this._denomList.length - 1], this._denomList.length - 1);
      }
    }
  }
}
