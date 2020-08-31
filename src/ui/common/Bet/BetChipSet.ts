namespace we {
  export namespace ui {
    export abstract class BetChipSet extends core.BaseEUI {
      protected _denomList: number[];
      protected _selectedChipIndex: number = -1;
      // protected _chipContainer: eui.Group;
      protected _chipScale: number = 1;

      public resetDenominationList(denominationList: number[]) {}

      public resetFormat(format: any) {}

      public init(format: any, denominationList: number[]) {}

      public get selectedChipIndex() {
        return this._selectedChipIndex;
      }

      public set selectedChipIndex(index) {
        this._selectedChipIndex = index;
      }

      public $setChipScale(val: number) {
        this._chipScale = val;
      }

      public set chipScale(val: number) {
        this.$setChipScale(val);
      }

      public get chipScale(): number {
        return this._chipScale;
      }

      // public get selectedChip() {
      //   return this._denomList[this._selectedChipIndex];
      // }

      public setTouchEnabled(enable: boolean) {}

      public setUpdateChipSetSelectedChipFunc(value: (value: number, index: number) => void) {}

      // setChipSet(denominationList: number[]) {}
      // onChipSelected(index: number) {}
      public unSelect() {}
    }
  }
}
