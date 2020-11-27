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

      protected _isBetState = true; // check if betting(have uncfm bet) if true,disable hover animation
      public constructor() {
        super();
        this.orientationDependent = false;
      }
      protected mount() {
        super.mount();
        this.addEventListeners();
      }

      protected initDisplay() {
        const factory = BaseAnimationButton.getFactory(this._dbClass);
        this._display = factory.buildArmatureDisplay(this._dbDisplay);
        utils.dblistenToSoundEffect(this._display);
        this._display.x = 0;
        this._display.y = 0;
        this.addChild(this._display);
        this.addColorFilter();
      }

      public destroy() {
        this.removeEventListeners();
        super.destroy();
      }

      protected addEventListeners() {
        dir.evtHandler.addEventListener(core.Event.SWITCH_AUTO_CONFIRM_BET, this.switchAutoConfirm, this);
      }

      protected removeEventListeners() {
        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_AUTO_CONFIRM_BET)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_AUTO_CONFIRM_BET, this.switchAutoConfirm, this);
        }
      }

      protected addColorFilter() {
        const slot = this._display.armature.getSlot('blur');
        const layer: eui.Group = new eui.Group();
        const bitmap: egret.Bitmap = slot.display as egret.Bitmap;
        const colorFilter = new egret.ColorMatrixFilter([
          0, 1, 0, 0, 0,
          0, 0, 1, 0, 0,
          1, 0, 0, 0, 0,
          0, 0, 0, 1, 0]);
        bitmap.filters = [colorFilter];
        layer.addChild(bitmap);
        slot.display = layer;
      }

      // const bitmap: egret.Bitmap = slot.display as egret.Bitmap;
      // const group: eui.Group = new eui.Group();
      // const colorFilter = new egret.ColorMatrixFilter();
      // bitmap.filters = [colorFilter];
      // group.addChild(bitmap);
      // slot.display = group;

      public set isBetState(e: boolean) {
        this._isBetState = e;
      }

      protected async switchAutoConfirm() {
        let status = '';

        if (!this._display) {
          return;
        }

        this._display.animation.reset();
        if (env.autoConfirmBet) {
          status = this._enabled ? 'idle_switch_to_on' : 'disable_switch_to_on';
        } else {
          status = this._enabled ? 'auto_confirm_idle_to_hover' : 'disable_switch_to_off';
        }
        this._display.animation.fadeIn(status, 0, 1, 0, 'CONFIRM_GROUP2');
      }

      protected async update([oldDown, oldHover]: boolean[]) {
        // super.update([oldDown, oldHover]);
        const status = '';
        if (this._display) {
          switch (env.autoConfirmBet) {
            case true:
              this._display.animation.reset();
              this._display.animation.fadeIn('auto_confirm_idle', 0, 1, 0, 'CONFIRM_GROUP2');
              break;
            case false:
              if (!this._enabled) {
                // if not in bet state
                this._display.animation.reset();
                this._display.animation.fadeIn('disable', 0, 1, 0, 'CONFIRM_GROUP2');
              } else if (!oldDown && this._down) {
                // if press down
                this._display.animation.fadeIn('betting', 0, 0, 0, 'CONFIRM_GROUP1');
                this._display.animation.fadeIn('hover_to_press', 0, 1, 0, 'CONFIRM_GROUP2');
              } else if (this._hover && oldDown && !this._down) {
                // if press up
                this._display.animation.reset();
                this._display.animation.fadeIn('press_to_disable', 0, 1, 0, 'CONFIRM_GROUP1');
              } else if (!oldHover && this._hover) {
                // if roll over
                this._display.animation.fadeIn('betting', 0, 0, 0, 'CONFIRM_GROUP1');
                this._display.animation.fadeIn('idle_to_hover', 0, 1, 0, 'CONFIRM_GROUP2');
              } else if (oldHover && !this._hover) {
                // roll out
                this._display.animation.fadeIn('betting', 0, 0, 0, 'CONFIRM_GROUP1');
                this._display.animation.fadeIn('hover_to_idle', 0, 1, 0, 'CONFIRM_GROUP2');
              } else {
                // if idle on bet state
                this._display.animation.fadeIn('betting', 0, 0, 0, 'CONFIRM_GROUP1');
                this._display.animation.fadeIn('disble_to_idle', 0, 1, 0, 'CONFIRM_GROUP2');
              }
              break;
          }
        }
      }
    }
  }
}
