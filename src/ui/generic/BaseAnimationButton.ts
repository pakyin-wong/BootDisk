namespace we {
  export namespace ui {
    enum BaseAnimationButtonState {
      normal = 'normal',
      down = 'pressed',
      disabled = 'disabled',
      hover = 'hover',
    }

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

      // components
      protected _dbClass: string = null;
      protected _dbDisplay: string = null;
      protected _display: dragonBones.EgretArmatureDisplay = null;

      // button states
      protected _buttonState: BaseAnimationButtonState = BaseAnimationButtonState.normal;
      protected _enabled: boolean = false;
      protected _hover: boolean = false;
      protected _active: boolean = false;
      protected _down: boolean = false;

      public useColorFilter: boolean = false;
      public pressScaleOffset: number = 0.9;
      public downColorOffset: number = -30;
      public hoverColorOffset: number = 30;

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
        this.touchChildren = false;
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
          const group = new eui.Group();
          const tl = new eui.TileLayout();
          tl.horizontalAlign = egret.HorizontalAlign.CENTER;
          tl.verticalAlign = egret.VerticalAlign.MIDDLE;
          group.layout = tl;
          group.width = this.width;
          group.height = this.height;
          // this._display.x = this._display.width / -2;
          // this._display.y = this._display.height / -2;
          // group.verticalCenter = 0;
          // group.horizontalCenter = 0;
          // group.addChild(this._display);
          group.addChild(this._display);
          this.addChild(group);
          // this.width = this._display.width;
          // this.height = this._display.height;
        }
        const oldState = [this._down, this._hover];
        this.update(oldState);
      }

      // enter scene have bug causing destroy called
      // protected destroy() {
      //   super.destroy();
      //   if (this._display) {
      //     this._display.dispose();
      //   }
      // }

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
        this._enabled = enabled;
        const oldState = [this._down, this._hover];
        this.update(oldState);
      }

      public get active() {
        return this._active;
      }

      public set active(active) {
        const oldState = [this._down, this._hover];
        this._active = active;
        this.update(oldState);
      }

      protected updateColorFilter(buttonState) {
        let colorMatrix;
        let offset = 0;
        switch (buttonState) {
          case BaseAnimationButtonState.hover:
            offset = this.hoverColorOffset;
            break;
          case BaseAnimationButtonState.down:
            offset = this.downColorOffset;
            break;
        }
        if (buttonState === BaseAnimationButtonState.disabled) {
          colorMatrix = [0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0];
        } else {
          colorMatrix = [1, 0, 0, 0, offset, 0, 1, 0, 0, offset, 0, 0, 1, 0, offset, 0, 0, 0, 1, 0];
        }
        const colorFilter = new egret.ColorMatrixFilter(colorMatrix);
        this.filters = [colorFilter];
      }

      private onRollover() {
        if (this.useColorFilter) {
          this.updateColorFilter(BaseAnimationButtonState.hover);
        }
      }

      private onRollout() {
        if (this.useColorFilter) {
          this.updateColorFilter(BaseAnimationButtonState.normal);
        }
      }

      private onTouchDown() {
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ scaleX: this.pressScaleOffset, scaleY: this.pressScaleOffset }, 150);
      }

      private onTouchUp() {
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ scaleX: 1.0, scaleY: 1.0 }, 150);
        // play release
        this.playPromise('release', 1);
      }

      private onClick() {
        this.dispatchEvent(new egret.Event('CLICKED'));
      }

      private playPromise(anim, count) {
        console.log('BaseAnimationButton', anim);

        if (!this._display.armature) {
          throw new Error('Animation missing armature');
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
        // console.log('BaseAnimationButto oldDown', oldDown);
        // console.log('BaseAnimationButto _down', this._down);
        // console.log('BaseAnimationButto oldHover', oldHover);
        // console.log('BaseAnimationButto _hover', this._hover);

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
        } else if (this._active) {
          this.playPromise('active', 0);
        } else {
          this.playPromise('inactive', 0);
        }
      }

      public playAnimation(anim, count) {
        this.playPromise(anim, count);
      }
    }
  }
}
