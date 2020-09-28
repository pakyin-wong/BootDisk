namespace we {
  export namespace ui {
    export class RcSideListItem extends LotterySideListItem {
      public constructor(skinName: string = null) {
        super(skinName);
        // this._betChipSet.setUpdateChipSetSelectedChipFunc(this._betChipSetGridSelected.setSelectedChip.bind(this._betChipSetGridSelected));
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chips;
        // this._betChipSet.init(null, denominationList);
      }
    }
  }
}
