namespace we {
  export namespace ui {
    export class BetChipSetGridSelected extends BetChip {
      public constructor() {
        super();
      }

      protected mount() {
        super.mount();
        mouse.setButtonMode(this, true);
        this.touchEnabled = true;
        this.updateSelectedChip();
        dir.evtHandler.addEventListener(core.Event.BET_DENOMINATION_CHANGE, this.updateSelectedChip, this);
      }

      protected destroy() {
        dir.evtHandler.removeEventListener(core.Event.BET_DENOMINATION_CHANGE, this.updateSelectedChip, this);
      }

      protected updateSelectedChip() {
        const value = env.betLimits[env.currentSelectedBetLimitIndex].chipList[env.currentChipSelectedIndex];
        this.highlight = true;
        this.setValue(value, env.currentChipSelectedIndex, we.core.ChipType.FLAT);
      }

      public setSelectedChip(value: number, index: number) {
        this.highlight = true;
        this.setValue(value, index, we.core.ChipType.FLAT);
      }
    }
  }
}
