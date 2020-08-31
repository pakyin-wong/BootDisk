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
        this._chipAnim = this.createChipAnim();
        this._chipAnim.touchEnabled = true;
        this._chipAnim.touchChildren = false;
        this._chipAnim.scaleX = this._chipScale * 0.7;
        this._chipAnim.scaleY = this._chipScale * 0.7;
        this._chipAnim.y = 30;
        this.addChild(this._chipAnim);

        this._value = env.betLimits[env.currentSelectedBetLimitIndex].chips[env.currentChipSelectedIndex];
        this._type = core.ChipType.FLAT;
        console.log('this._chipAnim.x,y', [this._chipAnim.x, this._chipAnim.y]);
        this.setChipValueSlot();
        this.setChipSelectSlot();
        // this.setChipDeselectSlot();
        this.draw();
        dir.evtHandler.addEventListener(core.Event.BET_DENOMINATION_CHANGE, this.updateSelectedChip, this);
      }

      protected setChipSelectSlot() {
        if (!(this._chipAnim && (this._index || this._index === 0) && (this._value || this._value === 0))) {
          return null;
        }
        const chip = new eui.Image();
        chip.source = this.getChipSource(we.core.ChipType.FLAT);
        chip.horizontalCenter = 0;
        chip.verticalCenter = 0;

        const group = new eui.Group();
        group.width = 0;
        group.height = 0;
        group.addChild(chip);

        const chipSlot = this._chipAnim.armature.getSlot('chips_select');
        chipSlot.display = group;
      }

      protected updateSelectedChip() {
        this._value = env.betLimits[env.currentSelectedBetLimitIndex].chips[env.currentChipSelectedIndex];
        this._index = env.currentChipSelectedIndex;
        this.setValue(this._value, this._index, we.core.ChipType.FLAT);
        this.setChipValueSlot();
        this.setChipSelectSlot();
        // this.setChipDeselectSlot();
        this.draw();
      }

      public setSelectedChip(value: number, index: number) {
        this.highlight = true;
        this.setValue(value, index, we.core.ChipType.FLAT);
        // this.setValue(value, index, we.core.ChipType.PERSPECTIVE);
        // console.log('getChipSource', this.getChipSource(we.core.ChipType.PERSPECTIVE));
        // this.draw();
      }

      public draw(noAnim: boolean = false) {
        if (!this._chipAnim) {
          return;
        }

        if (this._prevType === this._type) {
          return;
        }

        if (this._prevType === null || noAnim) {
          switch (this._type) {
            case we.core.ChipType.FLAT:
              (async () => {
                if (!this._chipAnim) {
                  return;
                }
                this._chipAnim.animation.stop();
                // const p2 = we.utils.waitDragonBone(this._chipAnim);
                this._chipAnim.animation.play('loop',0);
                // await p2;
              })();
              break;
            default:
            break;
          }
          return;
        }
      }

    }
  }
}
