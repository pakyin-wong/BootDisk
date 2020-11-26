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

      protected _btnState: string = 'idle';
      protected _animState: string = 'idle';
      protected _anim: string = 'idle';
      protected canPlayNext: boolean = true;

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

      public playBtn(btnState: string, animState: string, playAnim: string, count: number) {
        this._btnState = btnState;
        this._animState = animState;
        this._anim = playAnim;

        if (!this.canPlayNext && playAnim !== 'release') {
          // force to complete playing "release" animation, except new "release"
          return;
        } else {
          if (playAnim == 'release') {
            // if animation is "release", listen to its completion
            this.canPlayNext = false;
            this._display.armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.COMPLETE, listener, this);
          }
          this._display.animation.play(playAnim, count);
        }

        function listener() {
          this.canPlayNext = true;
          this._display.armature.eventDispatcher.removeDBEventListener(dragonBones.EventObject.COMPLETE, listener, this);
          this.playBtn(this._btnState, this._animState, this._animState, 1); 
          // after finish "release", play animationState
        }
      }

      protected async update([oldDown, oldHover]: boolean[]) {
        super.update;

        if (!this._enabled) {
          this.playBtn('disable', 'disable', 'disable', 0);
        } else if (!oldDown && this._down) {
          // if press down
          this.playBtn('hover', 'hover', 'release', 1);
        } else if (this._hover && oldDown && !this._down) {
          // if press up
          this.playBtn('hover', 'hover', 'hover', 1);
        } else if (!oldHover && this._hover) {
          // if roll over
          this.playBtn('idle_to_hover', 'hover', 'idle_to_hover', 1);
        } else if (oldHover && !this._hover) {
          // if roll out
          this.playBtn('hover_to_idle', 'idle', 'hover_to_idle', 1);
        } else {
          this.playBtn('idle', 'idle', 'idle', 0);
        }
      }
    }
  }
}
