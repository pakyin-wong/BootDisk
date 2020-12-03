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
      protected _text_slot: string;
      protected _orientation: string = ''; // desktop ="", portrait="_vertical", landscape="_horizontal"
      public constructor() {
        super();
        this.orientationDependent = false;
      }
      protected mount() {
        super.mount();
        this.addEventListeners();
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
        this._display.touchEnabled = false;
        this._display.touchChildren = true;
        this.addChild(this._display);
        this.init();

        this.init_textLabel();
      }

      protected changeLang() {
        this.init_textLabel();
      }

      public set text_slot(val: string) {
        this._text_slot = val;
      }

      public init_textLabel() {
        const slot = this._display.armature.getSlot(this._text_slot);
        const textLabel = this.getLabelText();
        this.setLabel(slot, textLabel, 30, 0xffffff, 'barlow');
      }

      protected setLabel(slot: dragonBones.Slot, text: string, size: number, color = 0xffffff, fontFamily: string) {
        const r = new ui.LabelImage();
        r.fontFamily = fontFamily;
        r.size = size;
        r.text = text;
        r.textColor = color;
        r.labelRotation = this._orientation == '_vertical' ? 270 : 0;

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
        return i18n.t(`mobile_ba_AutoConfirm`);
      }

      public destroy() {
        this.removeEventListeners();
        super.destroy();
      }

      protected addEventListeners() {
        dir.evtHandler.addEventListener(core.Event.SWITCH_AUTO_CONFIRM_BET, this.switchAutoConfirm, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      protected removeEventListeners() {
        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_AUTO_CONFIRM_BET)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_AUTO_CONFIRM_BET, this.switchAutoConfirm, this);
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }

      protected clone: egret.Bitmap;

      public init() {
        const slot = this._display.armature.getSlot('blur');
        const layer: eui.Group = new eui.Group();
        const bitmap: egret.Bitmap = slot.display as egret.Bitmap;
        const clone: egret.Bitmap = new egret.Bitmap(bitmap.texture);
        clone.width = bitmap.width;
        clone.height = bitmap.height;
        clone.x = bitmap.x;
        clone.y = bitmap.y;
        clone.anchorOffsetX = bitmap.anchorOffsetX;
        clone.anchorOffsetY = bitmap.anchorOffsetY;
        this.clone = clone;
        // layer.addChild(clone);
        // slot.display = layer;
        // slot.display = this.clone;
      }

      public setColor(r, g, b) {
        const colorFilter = new egret.ColorMatrixFilter([r, 0, 0, 0, 0, 0, g, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, 1, 0]);
        this.clone.filters = [colorFilter];
      }

      // const bitmap: egret.Bitmap = slot.display as egret.Bitmap;
      // const group: eui.Group = new eui.Group();
      // const colorFilter = new egret.ColorMatrixFilter();
      // bitmap.filters = [colorFilter];
      // group.addChild(bitmap);
      // slot.display = group;

      public get orientation() {
        return this._orientation;
      }

      public set orientation(val: string) {
        this._orientation = val;
      }

      protected async switchAutoConfirm() {
        let status = '';

        if (!this._display) {
          return;
        }

        this._display.animation.reset();
        if (env.autoConfirmBet) {
          status = this._enabled ? `idle_switch_to_on${this._orientation}` : `disable_switch_to_on${this._orientation}`;
        } else {
          status = `disable_switch_to_off${this._orientation}`;
        }
        this.bettingPlaying = false;
        this._display.animation.fadeIn(status, 0, 1, 0, 'CONFIRM_GROUP2');
      }

      protected bettingPlaying: boolean = false;
      protected async update([oldDown, oldHover]: boolean[]) {
        // super.update([oldDown, oldHover]);
        const status = '';
        if (this._display) {
          switch (env.autoConfirmBet) {
            case true:
              this._display.animation.reset();
              this.bettingPlaying = false;
              this._display.animation.fadeIn(`auto_confirm_idle${this._orientation}`, 0, 1, 0, 'CONFIRM_GROUP2');
              break;
            case false:
              if (!this._enabled) {
                // if not in bet state
                console.log('........not bet state..');
                this._display.animation.reset();
                this.bettingPlaying = false;
                this._display.animation.fadeIn(`disable${this._orientation}`, 0, 1, 0, 'CONFIRM_GROUP2');
              } else if (!oldDown && this._down) {
                // if press down
                console.log('.........press down.');
                if (!this.bettingPlaying) {
                  this._display.animation.fadeIn(`betting${this._orientation}`, 0, 0, 0, 'CONFIRM_GROUP1');
                  this.bettingPlaying = true;
                }
                if (!env.isMobile) {
                  this._display.animation.fadeIn(`hover_to_press${this._orientation}`, 0, 1, 0, 'CONFIRM_GROUP2');
                }
              } else if (this._hover && oldDown && !this._down) {
                // if press up
                console.log('........press up ..');
                this._display.animation.reset();
                this.bettingPlaying = false;
                this._display.animation.fadeIn(`press_to_disable${this._orientation}`, 0, 1, 0, 'CONFIRM_GROUP2');
              } else if (!oldHover && this._hover) {
                // if roll over
                console.log('........roll over..');
                if (!this.bettingPlaying) {
                  this._display.animation.fadeIn(`betting${this._orientation}`, 0, 0, 0, 'CONFIRM_GROUP1');
                  this.bettingPlaying = true;
                }
                this._display.animation.fadeIn(`idle_to_hover${this._orientation}`, 0, 1, 0, 'CONFIRM_GROUP2');
              } else if (oldHover && !this._hover) {
                // roll out
                console.log('........roll out..');
                if (!this.bettingPlaying) {
                  this._display.animation.fadeIn(`betting${this._orientation}`, 0, 0, 0, 'CONFIRM_GROUP1');
                  this.bettingPlaying = true;
                }
                this._display.animation.fadeIn(`hover_to_idle${this._orientation}`, 0, 1, 0, 'CONFIRM_GROUP2');
              } else {
                // if idle on bet state
                console.log('.......idle on bet state...');
                if (!this.bettingPlaying) {
                  this._display.animation.fadeIn(`betting${this._orientation}`, 0, 0, 0, 'CONFIRM_GROUP1');
                  this.bettingPlaying = true;
                }
                this._display.animation.fadeIn(`disble_to_idle${this._orientation}`, 0, 1, 0, 'CONFIRM_GROUP2');
              }
              break;
          }
        }
      }
    }
  }
}
