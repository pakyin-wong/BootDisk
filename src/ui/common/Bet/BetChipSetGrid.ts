namespace we {
  export namespace ui {
    export class BetChipSetGrid extends core.BaseEUI implements IBetChipSet {
      protected _numberOfChipsInRow = 4;
      protected _chipContainer: eui.Group;
      protected _selectedChipIndex: number = 10;
      protected _denomList: number[];
      protected _chipsetList: ui.List;
      protected _chipsetLayout: eui.TileLayout;
      protected _normalGapSize: number = 5;
      protected _setSelectedChip: (value: number, index: number) => void;
      public selectedIndex: number;

      public constructor() {
        super();

        this._chipsetLayout = new eui.TileLayout();
        this._chipsetLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this._chipsetLayout.horizontalGap = this._normalGapSize;
        this._chipsetLayout.verticalGap = this._normalGapSize;
        this._chipsetLayout.paddingBottom = this._normalGapSize;
        this._chipsetLayout.requestedColumnCount = this._numberOfChipsInRow;

        this._chipsetList = new ui.List();
        this._chipsetList.layout = this._chipsetLayout;
        this._chipsetList.itemRenderer = BetChipSetGridItem;
        this.addChild(this._chipsetList);
      }

      public getSelectedChipIndex() {
        return this.selectedIndex;
      }

      public resetDenominationList(denomList: number[]) {}
      public resetFormat(format: any) {}
      public init(format: any, denominationList: number[]) {
        this._chipsetList.dataProvider = new eui.ArrayCollection(denominationList);
      }
      public setTouchEnabled(enable: boolean) {}
      public injectSetSelectedChip(value: (value: number, index: number) => void) {
        this._setSelectedChip = value;
      }

      public setSelectedChip(value: number, index: number) {
        if (this._setSelectedChip) {
          this._setSelectedChip(value, index);
        }
      }
    }
  }
}
