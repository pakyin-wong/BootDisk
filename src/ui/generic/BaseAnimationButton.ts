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
      }

      public destroy() {
        super.destroy();
        if (this._display) {
          this._display.dispose();
        }
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

      private playPromise(anim, count, progress = 0) {
        console.log('BaseAnimationButton', anim);

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

        // this._display.animation.timeScale = 5;
        await this.prevProm;
        // this._display.animation.timeScale = 1;
        // this._display.animation.stop();
        // await this.playPromise('idle', 1, 0.99);
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
        } else if (!this._active) {
          this.playPromise('idle', 0);
        }
      }
    }
  }
}
