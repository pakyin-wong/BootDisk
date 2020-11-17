namespace we {
  export namespace ui {
    export class BetConfirmButton extends we.core.BaseEUI {
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
    }
  }
}
