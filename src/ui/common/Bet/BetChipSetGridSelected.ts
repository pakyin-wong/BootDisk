namespace we {
  export namespace ui {
    // export class BetChipSetGridSelected extends BetChip {
    export class BetChipSetGridSelected extends AnimBetChip {
      public constructor() {
        super();
      }

      // protected mount() {
      //   super.mount();
      //   mouse.setButtonMode(this, true);
      //   this.touchEnabled = true;
      //   this._chipAnim.scaleX = 0.7;
      //   this._chipAnim.scaleY = 0.7;
      //   this.updateSelectedChip();
      //   dir.evtHandler.addEventListener(core.Event.BET_DENOMINATION_CHANGE, this.updateSelectedChip, this);
      // }

      protected destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.BET_DENOMINATION_CHANGE, this.updateSelectedChip, this);
      }

      protected mount() {
        // this.debugRect = new eui.Rect();
        // this.debugRect.fillColor = 0xffffff;
        // this.addChild(this.debugRect);

        this._chipAnim = this.createChipAnim();
        this._chipAnim.touchEnabled = true;
        this._chipAnim.touchChildren = false;
        this._chipAnim.scaleX = this._chipScale * 0.7;
        this._chipAnim.scaleY = this._chipScale * 0.7;
        this.addChild(this._chipAnim);

        this._value = env.betLimits[env.currentSelectedBetLimitIndex].chips[env.currentChipSelectedIndex];

        this.setChipValueSlot();
        this.setChipSelectSlot();
        this.setChipDeselectSlot();
        this._type = this._type || core.ChipType.PERSPECTIVE;
        this.draw(true);
        dir.evtHandler.addEventListener(core.Event.BET_DENOMINATION_CHANGE, this.updateSelectedChip, this);
      }

      protected updateSelectedChip() {
        this._value = env.betLimits[env.currentSelectedBetLimitIndex].chips[env.currentChipSelectedIndex];
        this.highlight = true;
        // this.setValue(value, env.currentChipSelectedIndex, we.core.ChipType.FLAT);
        this.setValue(this._value, env.currentChipSelectedIndex, we.core.ChipType.PERSPECTIVE);
        console.log('getChipSource', this.getChipSource(we.core.ChipType.PERSPECTIVE));
        this.draw();
      }

      public setSelectedChip(value: number, index: number) {
        this.highlight = true;
        // this.setValue(value, index, we.core.ChipType.FLAT);
        this.setValue(value, index, we.core.ChipType.PERSPECTIVE);
        // console.log('getChipSource', this.getChipSource(we.core.ChipType.PERSPECTIVE));
        // this.draw();
      }
    }
  }
}
