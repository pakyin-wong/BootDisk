namespace we {
  export namespace ui {
    export class BaseAnimationButton extends we.core.BaseEUI implements IButton {
      public static FACTORIES: any = {};

      public static getFactory(dbClass): dragonBones.EgretFactory {
        if (!BaseAnimationButton.FACTORIES[dbClass]) {
          const skeletonData = RES.getRes(`${dbClass}_ske_json`);
          const textureData = RES.getRes(`${dbClass}_tex_json`);
          const texture = RES.getRes(`${dbClass}_tex_png`);
          const factory = new dragonBones.EgretFactory();
          factory.parseDragonBonesData(skeletonData);
          factory.parseTextureAtlasData(textureData, texture);
          BaseAnimationButton.FACTORIES[dbClass] = factory;
        }
        return BaseAnimationButton.FACTORIES[dbClass];
      }

      // determine button is a single choice switch button
      public isSwitch: boolean = false;

      // components
      protected _dbClass: string = null;
      protected _dbDisplay: string = null;
      protected _group: eui.Group;
      public _display: dragonBones.EgretArmatureDisplay = null;

      // class attributes
      public pressScaleOffset: number = 0.9;
      public useColorFilter: boolean = false;
      public downColorOffset: number = -30;
      public hoverColorOffset: number = 30;

      // button states
      protected _enabled: boolean = false;
      protected _hover: boolean = false;
      protected _active: boolean = false;
      protected _down: boolean = false;

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

          this._group.addChild(this._display);
          this.addChild(this._group);
        }

        // call update on mount to set initial button state
        const oldState = [this._down, this._hover];
        this.update(oldState);
      }

      public destroy() {
        super.destroy();
        if (this._display) {
          this._display.dispose();
          this._display = null;
          this.removeChild(this._group);
        }
        // since ingame header button is being removed once in order to move to headerComponent
        this.once(eui.UIEvent.ADDED_TO_STAGE, this.addedAgain, this);
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

      protected updateColorFilter() {
        let colorMatrix;
        let offset = 0;
        if (this._hover) {
          offset = this.hoverColorOffset;
        } else if (this._down) {
          offset = this.downColorOffset;
        }
        if (!this._enabled) {
          colorMatrix = [0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0];
        } else {
          colorMatrix = [1, 0, 0, 0, offset, 0, 1, 0, 0, offset, 0, 0, 1, 0, offset, 0, 0, 0, 1, 0];
        }
        const colorFilter = new egret.ColorMatrixFilter(colorMatrix);
        this.filters = [colorFilter];
      }

      /* internal button lifecycle methods */
      private onRollover() {
        const oldState = [this._down, this._hover];
        this._hover = true;
        this.update(oldState);
      }

      private onRollout() {
        const oldState = [this._down, this._hover];
        this._down = false;
        this._hover = false;
        this.update(oldState);
      }

      private onTouchDown() {
        const oldState = [this._down, this._hover];
        this._down = true;
        this.update(oldState);
      }

      private onTouchUp() {
        const oldState = [this._down, this._hover];
        this._down = false;
        this.update(oldState);
      }

      private onClick() {
        this.dispatchEvent(new egret.Event('CLICKED'));
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

      private prevProm: Promise<any> = Promise.resolve();
      private async update([oldDown, oldHover]: boolean[]) {
        if (!this._display) {
          return;
        }

        await this.prevProm;

        // handle switch button
        if (this.isSwitch) {
          // console.log('oldDown ', oldDown);
          // console.log('this._down ', this._down);
          // console.log('this._active ', this._active);
          // console.log('this._hover ', this._hover);
          // console.log('========= ');

          if (this._hover && !oldDown && this._down) {
            egret.Tween.removeTweens(this);
            egret.Tween.get(this._group).to({ scaleX: this.pressScaleOffset, scaleY: this.pressScaleOffset }, 150);
          } else if (this._hover && oldDown && !this._down) {
            egret.Tween.removeTweens(this);
            egret.Tween.get(this._group).to({ scaleX: 1.0, scaleY: 1.0 }, 150);
            // play release
            this.prevProm = this.playPromise('release', 1);
          } else if (!this._hover) {
            if (this._active) {
              this.playPromise('idle', 0);
            } else {
              this.playPromise('disable', 0);
            }
          }
          return;
        }

        if (!this._enabled) {
          this.playPromise('disable', 0);
        } else if (this._hover && !oldDown && this._down) {
          this.playPromise('press', 1);
        } else if (this._hover && oldDown && !this._down) {
          this.prevProm = this.playPromise('release', 1);
        } else if (!oldHover && this._hover) {
          this.playPromise('mouse_in', 1);
        } else if (oldHover && !this._hover) {
          //   if (oldDown) {
          //     await this.playPromise('release', 1);
          //   }
          this.playPromise('mouse_out', 1);
        } else {
          this.playPromise('idle', 0);
        }
      }
    }
  }
}
