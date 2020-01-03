namespace we {
  export namespace ba {
    export class BetChipSetGrid extends core.BaseEUI implements IBetChipSet {
      protected _numberOfChipsInRow = 4;
      protected _chipContainer: eui.Group;
      protected _selectedChipIndex: number = 10;
      protected _denomList: number[];
      protected _chipsetList: ui.TableList;
      protected _chipsetLayout: eui.TileLayout;
      protected _normalGapSize: number = 10;

      public constructor() {
        super();
        // init room grids
        this._chipsetLayout = new eui.TileLayout();
        this._chipsetLayout.horizontalGap = this._normalGapSize;
        this._chipsetLayout.verticalGap = this._normalGapSize;
        this._chipsetLayout.paddingBottom = this._normalGapSize * 3;
        this._chipsetLayout.requestedColumnCount = 4;

        this._chipsetList = new ui.TableList();
        this._chipsetList.isFreezeScrolling = true;
        this._chipsetList.isGlobalLock = true;
        this._chipsetList.itemRenderer = this.addChild(this._chipsetList);
      }

      public getSelectedChipIndex() {
        return this._selectedChipIndex;
      }

      public resetDenominationList(denomList: number[]) {}
      public resetFormat(format: any) {}
      public init(format: any, denominationList: number[]) {}
      public setTouchEnabled(enable: boolean) {}
    }
  }
}
