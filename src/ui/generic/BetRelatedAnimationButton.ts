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

      protected _text_slot: string;
      protected _labelText: string;
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
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      protected initDisplay() {
        const rect = new eui.Rect();
        rect.left = 0;
        rect.right = 0;
        rect.top = 0;
        rect.bottom = 0;
        rect.alpha = 0;
        this.addChild(rect);

        const factory = BaseAnimationButton.getFactory(this._dbClass);
        this._display = factory.buildArmatureDisplay(this._dbDisplay);
        utils.dblistenToSoundEffect(this._display);
        this._display.x = 0;
        this._display.y = 0;
        this.addChild(this._display);
        if (env.isMobile) {
          this.init_textLabel();
        }
      }

      public set text_slot(val: string) {
        this._text_slot = val;
      }

      public set labelText(val: string) {
        this._labelText = val;
      }

      public init_textLabel() {
        const slot = this._display.armature.getSlot(this._text_slot);
        const winText = this.getLabelText();
        this.setLabel(slot, winText, 32, 0xffffff, 'barlow');
      }

      protected setLabel(slot: dragonBones.Slot, text: string, size: number, color = 0xffffff, fontFamily: string) {
        const r = new ui.LabelImage();
        r.fontFamily = fontFamily;
        r.size = size;
        r.text = text;
        r.textColor = color;

        // create a new ImageDisplayData with a EgretTextureData holding the new texture
        const displayData: dragonBones.ImageDisplayData = new dragonBones.ImageDisplayData();
        const textureData: dragonBones.EgretTextureData = new dragonBones.EgretTextureData();
        textureData.renderTexture = r.texture;
        textureData.region.x = 0;
        textureData.region.y = 0;
        textureData.region.width = textureData.renderTexture.textureWidth;
        textureData.region.height = textureData.renderTexture.textureHeight;
        textureData.parent = new dragonBones.EgretTextureAtlasData();
        textureData.parent.scale = 1;
        displayData.texture = textureData;
        displayData.pivot.x = 0.5;
        displayData.pivot.y = 0.5;

        // type 0 is ImageDisplayData
        displayData.type = 0;

        slot.replaceDisplayData(displayData, 0);

        // set the displayIndex to non zero since new value == current index will not trigger redraw
        slot.displayIndex = -1;
        slot.displayIndex = 0;
      }

      protected getLabelText() {
        // return `live.tooltip.${this._labelText}`;
        return i18n.t(`live.tooltip.${this._labelText}`)
      }

      protected changeLang() {
        this.init_textLabel();
      }

      public destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      public playBtn(btnState: string, animState: string, playAnim: string, count: number) {
        if (!this._display) {
          return;
        }

        this._btnState = btnState;
        this._animState = animState;
        this._anim = playAnim;

        if (!this.canPlayNext && playAnim !== 'release') {
          // force to complete playing "release" animation, except new "release"
          return;
        }
        if (playAnim == 'release') {
          // if animation is "release", listen to its completion
          this.canPlayNext = false;
          this._display.armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.COMPLETE, listener, this);
        }
        this._display.animation.play(playAnim, count);

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
          this.playBtn('hover', 'hover', 'hover_to_idle', 1);
        } else if (!oldHover && this._hover) {
          // if roll over
          this.playBtn('hover', 'hover', 'idle_to_hover', 1);
        } else if (oldHover && !this._hover) {
          // if roll out
          this.playBtn('idle', 'hover_to_idle', 'hover_to_idle', 1);
        } else {
          this.playBtn('idle', 'idle', 'idle', 0);
        }
      }
    }
  }
}
