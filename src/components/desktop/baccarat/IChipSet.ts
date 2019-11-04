namespace baccarat {
  export interface IBetChipSet {
    setChipSet(denominationList: number[]);
    onChipSelected(index: number);
  }

  export interface IBetChip {
    getValue();
    setValue(value: number); // update the chip appearance according to the value
    highlight: boolean; // indicate whether the chip is being selected
  }
}
