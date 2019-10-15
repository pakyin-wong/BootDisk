namespace baccarat {
  export class BetChipSet extends eui.Component
    implements eui.UIComponent, IBetChipSet {
    private currentDenomination: number[];

    private chipList: Array<IBetChip & egret.DisplayObject> = [];

    public constructor(denominationList: number[]) {
      super();
      this.currentDenomination = denominationList;
    }

    protected partAdded(partName: string, instance: any): void {
      super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
      super.childrenCreated();
      this.setChipSet(this.currentDenomination);
    }

    public setChipSet(denominationList: number[]) {
      const chipInterval = 10;
      this.currentDenomination = denominationList;

      // check if the currentChipSelectedIndex exceed the denomination list length
      env.currentChipSelectedIndex = Math.min(
        denominationList.length - 1,
        env.currentChipSelectedIndex
      );
      const selectedIdx = env.currentChipSelectedIndex;
      this.clearChipList();

      let newWidth = 0;
      this.height = 0;

      let idx = 0;
      for (const value of denominationList) {
        const betChip = new BetChip(value);
        this.addChild(betChip);
        const chipIdx = idx;
        betChip.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          e => this.onChipSelected(chipIdx),
          this
        );
        betChip.x = (betChip.width + 10) * idx;
        betChip.y = 0;
        if (selectedIdx === idx) {
          betChip.highlight = true;
        }
        this.chipList.push(betChip);
        newWidth += betChip.width + chipInterval;
        this.height = Math.max(this.height, betChip.height);
        idx++;
      }

      this.width = newWidth - chipInterval;
    }

    private clearChipList() {
      for (const betChip of this.chipList) {
        this.removeChild(betChip);
      }
      this.chipList = [];
    }

    public onChipSelected(index: number) {
      const prevSelectedIndex = env.currentChipSelectedIndex;
      this.chipList[prevSelectedIndex].highlight = false;

      env.currentChipSelectedIndex = index;
      this.chipList[index].highlight = true;
    }
  }
}
