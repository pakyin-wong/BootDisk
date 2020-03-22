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
      public labelSize: number = 30;

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

      public init(format: any, denomList: number[]) {
        this.resetDenominationList(denomList);
      }

      protected mount() {
        this._chipsetList.addEventListener(eui.UIEvent.CHANGE, this.onChipChange, this);
        dir.evtHandler.addEventListener(core.Event.BET_DENOMINATION_CHANGE, this.updateSelectedChip, this);
      }

      protected destroy() {
        super.destroy();
        this._chipsetList.removeEventListener(eui.UIEvent.CHANGE, this.onChipChange, this);
        dir.evtHandler.removeEventListener(core.Event.BET_DENOMINATION_CHANGE, this.updateSelectedChip, this);
      }

      private onChipChange() {
        this.setSelectedChip(this._chipsetList.selectedIndex);
      }

      public setUpdateChipSetSelectedChipFunc(value: (value: number, index: number) => void) {
        this._setSelectedChip = value;
      }

      public setSelectedChip(index: number) {
        if (this._setSelectedChip) {
          logger.l('oldindex', this._selectedChipIndex, 'newindex', index);
          // this._setSelectedChip(this._denomList[index], index);
          this._selectedChipIndex = index;

          env.currentChipSelectedIndex = index;
          dir.evtHandler.dispatch(core.Event.BET_DENOMINATION_CHANGE);
        }
      }

      protected updateSelectedChip() {
        const index = env.currentChipSelectedIndex;
        this._selectedChipIndex = index;
        this._chipsetList.selectedIndex = index;
      }

      public resetDenominationList(denomList: number[]) {
        this._denomList = denomList;
        const newIndex = env.currentChipSelectedIndex > this._denomList.length - 1 ? this._denomList.length - 1 : env.currentChipSelectedIndex;
        this._chipsetList.dataProvider = new eui.ArrayCollection(this._denomList);
        this._chipsetList.selectedIndex = newIndex;
        // default select last item
        this.setSelectedChip(this._chipsetList.selectedIndex);
      }
    }
  }
}
