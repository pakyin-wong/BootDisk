namespace we {
  export namespace ui {
    export abstract class BetChipSet extends core.BaseEUI {
      protected _denomList: number[];
      protected _selectedChipIndex: number = 10;
      protected _chipContainer: eui.Group;

      public resetDenominationList(denominationList: number[]) {}

      public resetFormat(format: any) {}

      public init(format: any, denominationList: number[]) {}

      public get selectedChipIndex() {
        return this._selectedChipIndex;
      }

      public set selectedChipIndex(index) {
        this._selectedChipIndex = index;
      }

      public setTouchEnabled(enable: boolean) {}

      public injectSetSelectedChip(value: (value: number, index: number) => void) {}

      // setChipSet(denominationList: number[]) {}
      // onChipSelected(index: number) {}
    }
  }
}
