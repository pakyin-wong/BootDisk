namespace we {
  export namespace ui {
    export class BetConfirmButton extends BaseAnimationButton implements IButton {
      /**
       * requirement:
       * support mode: auto_confirm, normal
       * support button state: idle, hovered, pressed, disabled
       * support animation (state): idle, hover, press, disable
       * support transition animation: [state_A]_to_[state_B] (e.g. idle_to_hover, hover_to_idle, hover_to_release, release_to_hover, ...)
       * logic: each time when changing state, i.e. from A to B, check if animation with name "[state_A]_to_[state_B]" exists, if yes, play it, else play "[state_B]"
       * change mode logic: when mode changed, (e.g. from normal to auto_confirm), play normal_to_auto_confirm_[idle/disable] (e.g. normal_to_auto_confirm_idle) if exists, else just play auto_confirm_idle
       * betting logic: play "betting" when there is unconfirm bet exists
       * use animation.fadeIn with different group name instead of animation.play to play the animation so that you can play multiple animation at the same time ("betting" in one group and others in another group)
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
          this.playPromise('disable', 0);
          console.log('disable');
        } else if (!oldDown && this._down) {
          // if press down
          this.prevProm = this.playPromise('press', 1);
          console.log('press');
        } else if (this._hover && oldDown && !this._down) {
          // if press up
          await this.prevProm;
          this.playPromise('hover', 1);
          console.log('hover');
        } else if (!oldHover && this._hover) {
          // if roll over
          await this.prevProm;
          this.playPromise('idle_to_hover', 1);
          console.log('idle_to_hover');
        } else if (oldHover && !this._hover) {
          // if roll out
          //   if (oldDown) {
          //     await this.playPromise('release', 1);
          //   }
          await this.prevProm;
          this.playPromise('hover_to_idle', 1);
          console.log('hover to idle');
        } else {
          await this.prevProm;
          this.playPromise('idle', 0);
          console.log('idle');
        }
      }
    }
  }
}
