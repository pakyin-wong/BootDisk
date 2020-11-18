// TypeScript file
namespace we {
  export namespace ui {
    export class BetRelatedAnimationButton extends BaseAnimationButton implements IButton {
      /**
       * requirement: (may consider modify or override BaseAnimationButton)
       * support button state: idle, hovered, pressed, disabled
       * support animation (state): idle, hover, release, disable
       * support transition animation: [state_A]_to_[state_B] (e.g. idle_to_hover, hover_to_idle, hover_to_release, release_to_hover, ...)
       * logic: each time when changing state, i.e. from A to B, check if animation with name "[state_A]_to_[state_B]" exists, if yes, play it, else play "[state_B]"
       *        when playing "release", no matter the button changed to hovered/ idle/ disabled, it needs to wait for "release" animation completed before playing another animation
       *        (e.g. player "release" -> state to hovered -> state to idle -> "release" completed -> check if "release_to_idle" exist, else play "idle")
       *        when playing "release", user press the button again (i.e. followed by another "release" animation), the new "release" animation will be played immediately
       **/
      public constructor() {
        super();
        this.orientationDependent = false;
      }

      protected mount() {
        super.mount();
        switch (this._dbDisplay) {
          default:
            this.active = true;
            this.isSetting = false;
            break;
        }

        this.addEventListeners();
      }

      public destroy() {
        super.destroy();
        this.removeEventListeners();
      }

      protected addEventListeners() {
      }

      protected removeEventListeners() {}

      protected onRollover() {
        super.onRollover;
        this.playPromise('idle_to_hover', 1);
      }

      protected onRollout() {
        super.onRollout;
        this.playPromise('hover_to_idle', 1);
      }

      protected onTouchDown() {
        super.onTouchDown;
        this.playPromise('release', 1);
      }

      protected onTouchUp() {
        super.onTouchUp;
        this.playPromise('release', 1);
      }

      protected async update([oldDown, oldHover]: boolean[]) {
        super.update;

        if (!this._display) {
          return;
        }
        if (this.isSetting) {
          return;
        }
        await this.prevProm;

        if (!this._enabled) {
          // if disable
          this.playPromise('disable', 0);
          console.log('disable');
        } else if (!oldDown && this._down) {
          // if press down
          this.playPromise('release', 1);
          this.prevProm = this.playPromise('release', 1);
          console.log('release');
        } else if (this._hover && oldDown && !this._down) {
          // if press up
          this.prevProm = this.playPromise('release', 1);
          console.log('release');
        } else if (!oldHover && this._hover) {
          // if roll over
          this.playPromise('idle_to_hover', 1);
          console.log('idle to hover');
        } else if (oldHover && !this._hover) {
          // if roll out
          //   if (oldDown) {
          //     await this.playPromise('release', 1);
          //   }
          this.playPromise('hover_to_idle', 1);
          console.log('hover to idle');
        } else {
          this.playPromise('idle', 0);
          console.log('idle');
        }
      }
    }
  }
}
