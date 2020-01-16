namespace we {
  export namespace ui {
    export class BetChipSetGrid extends BetChipSet {
      private _numberOfChipsInRow = 4;
      private _chipsetList: ui.List;
      private _chipsetLayout: eui.TileLayout;
      private _normalGapSize: number = 5;
      private _setSelectedChip: (value: number, index: number) => void;

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

      public init(format: any, denominationList: number[]) {
        this._chipsetList.dataProvider = new eui.ArrayCollection(denominationList);
      }

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
