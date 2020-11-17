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
            this.isSwitch = true;
            this.isSetting = false;
            break;
        }

        this.addEventListeners();
      }

      public destroy() {
        super.destroy();
        this.removeEventListeners();
      }

      protected addEventListeners() { }

      protected removeEventListeners() { }

      protected onRollover() {
        super.onRollover();
        this.playPromise('idle_to_hover', 1);
      }

      protected onRollout() {
        super.onRollout();
        console.log('rollOut');
        this.playPromise('release', 5);
        // const oldState = [this._down, this._hover];
        // this._down = false;
        // this._hover = false;
        // this.update(oldState);
      }
    }
  }
}
