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
          // this._display.x = this._display.width / -2;
          // this._display.y = this._display.height / -2;
          // const group = new eui.Group();
          // group.verticalCenter = 0;
          // group.horizontalCenter = 0;
          // group.addChild(this._display);
          this.addChild(this._display);
          // this.width = this._display.width;
          // this.height = this._display.height;
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
        this.update();
      }

      public get active() {
        return this._active;
      }

      public set active(active) {
        this._active = active;
        this.update();
      }

      private onRollover() {
        this._hover = true;
        this.update();
      }

      private onRollout() {
        this._hover = false;
        this._down = false;
        this.update();
      }

      private onTouchDown() {
        this._down = true;
        this.update();
      }

      private onTouchUp() {
        this._down = false;
        this.update();
      }

      private onClick() {
        this.dispatchEvent(new egret.Event('CLICKED'));
      }

      private update() {
        let buttonState;
        if (!this._enabled) {
          buttonState = BaseAnimationButtonState.disabled;
        } else if (this._down) {
          buttonState = BaseAnimationButtonState.down;
        } else if (this._active || this._hover) {
          buttonState = BaseAnimationButtonState.hover;
        } else {
          buttonState = BaseAnimationButtonState.normal;
        }
        // nothing changed
        if (buttonState === this._buttonState) {
          return;
        }

        if (!this._display) {
          return;
        }

        this.updateSource(buttonState);
        this._buttonState = buttonState;
      }

      protected updateSource(buttonState) {
        // this._display.armature.eventDispatcher.addDBEventListener(
        //   dragonBones.EventObject.COMPLETE,
        //   () => {
        //     this.visible = false;
        //   },
        //   this
        // );

        if (buttonState === BaseAnimationButtonState.disabled) {
          this._display.animation.play('disable', 0);
        } else if (buttonState === BaseAnimationButtonState.down) {
          this._display.animation.play('press', 1);
        } else if (buttonState === BaseAnimationButtonState.hover) {
          this._display.animation.play('mouse_in', 1);
        } else {
          this._display.animation.play('idle', 0);
        }
        console.log(buttonState);
        // // update button's apperance
        // const source = this._background.source;
        // if (!source || source instanceof egret.Texture) {
        //   // throw new Error('Source cannot be texture');
        //   return;
        // }
        // const newSource = source.replace(this._buttonState.toString(), buttonState);
        // if (RES.getRes(newSource)) {
        //   // use res string to allow replace
        //     //   this.changeSourceWithAnimation(source, newSource);
        // }
      }
    }
  }
}
