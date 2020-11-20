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
        this.addEventListeners();
      }

      public destroy() {
        super.destroy();
        this.removeEventListeners();
      }

      protected addEventListeners() {
        dir.evtHandler.addEventListener(core.Event.SWITCH_AUTO_CONFIRM_BET, this.switchAutoConfirm, this);
      }

      protected removeEventListeners() {
        dir.evtHandler.removeEventListener(core.Event.SWITCH_AUTO_CONFIRM_BET, this.switchAutoConfirm, this);
      }

      protected async switchAutoConfirm() {
        let status = '';

        if (!this._enabled) {
          status = env.autoConfirmBet ? 'disable_switch_to_on' : 'disable_switch_to_off';
          this.playPromise(status, 1);
        } else {
          status = env.autoConfirmBet ? 'idle_switch_to_on' : 'idle_switch_to_off';
          this.playPromise(status, 1);
        }
      }

      protected async update([oldDown, oldHover]: boolean[]) {
        super.update;
        let status = '';

        if (!this._enabled) {
          // if not in bet state
          status = env.autoConfirmBet ? 'auto_confirm_idle' : 'idle';
          await this.prevProm;
          this.playPromise(status, 1);
          console.log(status);
        } else if (!oldDown && this._down) {
          // if press down
          if (env.autoConfirmBet) return;
          this.prevProm = this.playPromise('hover_to_press', 1);
          console.log('hover_to_press');
        } else if (this._hover && oldDown && !this._down) {
          // if press up
          if (env.autoConfirmBet) return;
          await this.prevProm;
          this.prevProm = this.playPromise('press_to_disable', 1);
          console.log('press_to_disable');
        } else if (!oldHover && this._hover) {
          // if roll over
          if (env.autoConfirmBet) return;
          await this.prevProm;
          this.playPromise('idle_to_hover', 1);
          console.log('idle_to_hover');
        } else if (oldHover && !this._hover) {
          // roll out
          if (env.autoConfirmBet) return;
          await this.prevProm;
          this.playPromise('hover_to_idle', 1);
          console.log('hover to idle');
        } else {
          // if idle on bet state
          status = env.autoConfirmBet ? 'auto_confirm_idle' : 'disble_to_idle';
          await this.prevProm;
          this.playPromise(status, 1);
          console.log(status);
        }
      }
    }
  }
}
