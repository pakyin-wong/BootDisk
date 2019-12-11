namespace we {
  export namespace ui {
    export interface IAutoRemove {
      content: egret.DisplayObject;
      removeSelf: (isAnimate?: boolean) => void;
    }

    export class AutoRemoveAddon extends DisplayObjectAddon {
      protected target: egret.DisplayObject & IAutoRemove;
      protected customAnimation: () => Promise<void>;
      public direction: string = 'right';
      public isFade: boolean = false;
      public duration: number = 300;
      public aliveTime: number = 4000;
      protected timeoutId: number = -1;

      constructor(displayObject: egret.DisplayObject & ITransitable) {
        super(displayObject);
      }

      protected reset() {
        if (this.timeoutId >= 0) {
          clearTimeout(this.timeoutId);
          this.timeoutId = -1;
        }
      }

      public set active(value: boolean) {
        if (this.target && this.target.parent instanceof List) {
          const list = <List> this.target.parent;
          if (value && list.useVirtualLayout) {
            egret.error('virtual layout not supported');
          }
        }
        super.$setActive(value);
      }

      public get active(): boolean {
        return this._active;
      }

      public init() {
        super.init();
        this.reset();
        if (this.target.parent) {
          this.target.once(egret.Event.ENTER_FRAME, this.start, this);
          this.target.addEventListener(mouse.MouseEvent.ROLL_OVER, this.clearAllTimeout, this);
          this.target.addEventListener(mouse.MouseEvent.ROLL_OUT, this.startAllTimeout, this);
          this.target.parent.addEventListener('CLEAR_ALL_TIMEOUT', this.reset, this);
          this.target.parent.addEventListener('Start_ALL_TIMEOUT', this.start, this);
        } else {
          this.isInit = false;
        }
      }

      public deactivate() {
        super.deactivate();
        this.reset();
        if (this.target.parent) {
          this.target.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.clearAllTimeout, this);
          this.target.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.startAllTimeout, this);
          this.target.parent.removeEventListener('CLEAR_ALL_TIMEOUT', this.reset, this);
          this.target.parent.removeEventListener('Start_ALL_TIMEOUT', this.start, this);
        }
      }

      protected clearAllTimeout() {
        egret.log('clear all timeout');
        this.target.parent.dispatchEvent(new egret.Event('CLEAR_ALL_TIMEOUT'));
      }
      public startAllTimeout() {
        egret.log('start all timeout');
        if (this.target.parent) {
          this.target.parent.dispatchEvent(new egret.Event('Start_ALL_TIMEOUT'));
        }
      }

      public setCustomAnimtion(animationFunc: () => Promise<void>) {
        this.customAnimation = animationFunc;
      }

      protected async start() {
        if (!this.target) {
          return;
        }
        this.reset();
        this.timeoutId = setTimeout(() => {
          this.startRemove();
        }, this.aliveTime);
      }

      public async startRemove() {
        this.willRemove();

        await this.startTransition();

        this.target.removeSelf(false);
      }

      public willRemove() {
        this.reset();
        this.target.touchEnabled = false;
        this.target.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.clearAllTimeout, this);
        this.target.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.startAllTimeout, this);
        this.target.parent.removeEventListener('CLEAR_ALL_TIMEOUT', this.reset, this);
        this.target.parent.removeEventListener('Start_ALL_TIMEOUT', this.start, this);
      }

      protected async startTransition() {
        switch (this.direction) {
          case 'left':
            await Transition.MoveOutToLeft(this.target.content, this.isFade, this.duration);
            break;
          case 'right':
            await Transition.MoveOutToRight(this.target.content, this.isFade, this.duration);
            break;
          default:
            await Transition.defaultOut(this.target.content, this.duration);
            break;
        }
      }
    }
  }
}
