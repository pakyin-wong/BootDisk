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
      }

      public destroy() {
        super.destroy();
      }

      protected async update([oldDown, oldHover]: boolean[]) {
        super.update;

        if (!this._enabled) {
          // if disable
          await this.prevProm;
          // this._display.animation.fadeIn('disable',0,0,0,'CONFIRM_GROUP')
          this.playPromise('disable', 0);
        } else if (!oldDown && this._down) {
          // if press down
          this.prevProm = this.playPromise('release', 1);
        } else if (this._hover && oldDown && !this._down) {
          // if press up
          await this.prevProm;
          // this._display.animation.fadeIn('hover',0,1,0,'CONFIRM_GROUP')
          this.playPromise('hover', 1);
        } else if (!oldHover && this._hover) {
          // if roll over
          await this.prevProm;
          // this._display.animation.fadeIn('idle_to_hover',0,1,0,'CONFIRM_GROUP')
          this.playPromise('idle_to_hover', 1);
        } else if (oldHover && !this._hover) {
          // if roll out
          await this.prevProm;
          // this._display.animation.fadeIn('hover_to_idle',0,1,0,'CONFIRM_GROUP')
          this.playPromise('hover_to_idle', 1);
        } else {
          await this.prevProm;
          // this._display.animation.fadeIn('idle',0,0,0,'CONFIRM_GROUP')
          this.playPromise('idle', 0);
        }
      }
    }
  }
}
