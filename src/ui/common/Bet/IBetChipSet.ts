namespace we {
  export namespace ui {
    export interface IBetChipSet {
      resetDenominationList(denominationList: number[]);
      resetFormat(format: any);
      init(format: any, denominationList: number[]);
      getSelectedChipIndex();
      setTouchEnabled(enable: boolean);

      // setChipSet(denominationList: number[]);
      // onChipSelected(index: number);
    }

    export interface IBetChip {
      getValue();
      setValue(value: number); // update the chip appearance according to the value
      highlight: boolean; // indicate whether the chip is being selected
    }
  }
}
