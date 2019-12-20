namespace we {
  export namespace ba {
    export interface IBetChipSet {
      resetDenominationList(denominationList: number[]);
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
