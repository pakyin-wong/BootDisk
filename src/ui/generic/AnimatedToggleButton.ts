namespace we {
  export namespace ui {
    export class AnimatedToggleButton extends BaseAnimationButton {
      public static FACTORIES: any = {};

      public static getFactory(dbClass): dragonBones.EgretFactory {
        if (!AnimatedToggleButton.FACTORIES[dbClass]) {
          const skeletonData = RES.getRes(`${dbClass}_ske_json`);
          const textureData = RES.getRes(`${dbClass}_tex_json`);
          const texture = RES.getRes(`${dbClass}_tex_png`);
          const factory = new dragonBones.EgretFactory();
          factory.parseDragonBonesData(skeletonData);
          factory.parseTextureAtlasData(textureData, texture);
          AnimatedToggleButton.FACTORIES[dbClass] = factory;
        }
        return AnimatedToggleButton.FACTORIES[dbClass];
      }

      // components
      protected _dbClass: string = null;
      protected _dbDisplay: string = null;
      protected _group: eui.Group;
      public _display: dragonBones.EgretArmatureDisplay = null;

      // class attributes
      public pressScaleOffset: number = 0.9;

      // button states
      protected _enabled: boolean = false;
      protected _hover: boolean = false;
      protected _active: boolean = false;
      protected _down: boolean = false;

      protected _externalClickHandling: boolean = false;

      public get dbClass() {
        return this._dbClass;
      }
      public set dbClass(value: string) {
        this._dbClass = value;
      }

      public get dbDisplay() {
        return this._dbDisplay;
      }
      public set dbDisplay(value: string) {
        this._dbDisplay = value;
      }

      public get externalClickHandling() {
        return this._externalClickHandling;
      }

      public set externalClickHandling(value: boolean) {
        this._externalClickHandling = value;
        // if (value) {
        //   if (!this.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
        //     this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        //   }
        // } else {
        //   if (this.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
        //     this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        //   }
        // }
      }

      constructor() {
        super();
        // this.touchChildren = false;
        this.buttonEnabled = true;
      }

      protected mount() {
        super.mount();
        if (!this._dbClass) {
          throw new Error('Missing property dbClass in BaseAnimationButton');
        }
        if (!this._dbDisplay) {
          throw new Error('Missing property dbDisplay in BaseAnimationButton');
        }
        if (!this._display) {
          const factory = BaseAnimationButton.getFactory(this._dbClass);
          this._display = factory.buildArmatureDisplay(this._dbDisplay);
          this._group = new eui.Group();
          this._group.width = 0;
          this._group.height = 0;
          this._display.x = this.width / -2;
          this._display.y = this.height / -2;
          this._group.verticalCenter = 0;
          this._group.horizontalCenter = 0;

          utils.dblistenToSoundEffect(this._display);
          this._group.addChild(this._display);
          this.addChild(this._group);
        }

        // call update on mount to set initial button state
        const oldState = [this._down, this._hover];
        this.update(oldState);
      }

      protected addedAgain() {
        this.mount();
        this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
      }

      public get buttonEnabled() {
        return this._enabled;
      }

      public set buttonEnabled(enabled: boolean) {
        if (enabled === this._enabled) {
          return;
        }

        if (enabled) {
          this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
          this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
          this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
          this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
          this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
          mouse.setButtonMode(this, true);
        } else {
          this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
          this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
          this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
          this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
          this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
          mouse.setButtonMode(this, false);
        }
        const oldState = [this._down, this._hover];
        this._enabled = enabled;
        window.requestAnimationFrame(() => {
          this.update(oldState);
        });
      }

      public get active() {
        return this._active;
      }

      public set active(active) {
        const oldState = [this._down, this._hover];
        this._active = active;
        // must add async to play animation on some case (isSwitch)
        window.requestAnimationFrame(() => {
          this.update(oldState);
        });
      }

      /* internal button lifecycle methods */
      protected onRollover() {
        const oldState = [this._down, this._hover];
        this._hover = true;
        this.update(oldState);
      }

      protected onRollout() {
        const oldState = [this._down, this._hover];
        this._down = false;
        this._hover = false;
        this.update(oldState);
      }

      protected onTouchDown() {
        const oldState = [this._down, this._hover];
        this._down = true;
        this.update(oldState);
      }

      protected onTouchUp() {
        const oldState = [this._down, this._hover];
        this._down = false;
        this.update(oldState);
      }

      protected onClick() {
        if (!this._externalClickHandling) {
          this.toggle();
        }
        this.dispatchEvent(new egret.Event('CLICKED'));
      }

      public toggle() {
        this._active = !this._active;
        const switch_suffix = this._active ? '_on' : '_off';
        this.playPromise(`switch_to${switch_suffix}`, 1);
      }

      public playPromise(anim, count) {
        // console.log('BaseAnimationButton', anim);

        if (!this._display) {
          logger.l(utils.LogTarget.DEBUG, 'Missing display: ' + this._dbClass + ', ' + this._dbDisplay + ',' + anim);
          return;
          // throw new Error('Missing display: ' + this._dbClass + ', ' + this._dbDisplay + ',' + anim);
        }

        if (!this._display.armature) {
          throw new Error('Animation missing armature: ' + this._dbClass);
        }

        return new Promise(resolve => {
          const listener = () => {
            this._display.armature.eventDispatcher.removeDBEventListener(dragonBones.EventObject.COMPLETE, listener, this);
            resolve();
          };
          this._display.armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.COMPLETE, listener, this);
          this._display.animation.play(anim, count);
        });
      }

      protected prevProm: Promise<any> = Promise.resolve();
      protected async update([oldDown, oldHover]: boolean[]) {
        if (!this._display) {
          return;
        }

        await this.prevProm;

        const anim_suffix = this._active ? '_on' : '_off';
        const switch_suffix = this._active ? '_off' : '_on';

        if (!this._enabled) {
          this.playPromise(`disable${anim_suffix}`, 0);
        } else if (this._hover && !oldDown && this._down) {
          egret.Tween.removeTweens(this);
          egret.Tween.get(this._group).to({ scaleX: this.pressScaleOffset, scaleY: this.pressScaleOffset }, 150);
        } else if (this._hover && oldDown && !this._down) {
          egret.Tween.removeTweens(this);
          egret.Tween.get(this._group).to({ scaleX: 1.0, scaleY: 1.0 }, 150);
        } else {
          this.playPromise(`idle${anim_suffix}`, 0);
        }
      }
    }
  }
}
