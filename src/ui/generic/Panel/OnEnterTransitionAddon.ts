namespace we {
  export namespace ui {
    export class OnEnterTransitionAddon extends DisplayObjectAddon {
      protected target: egret.DisplayObject & ITransitable;
      protected customAnimation: () => Promise<void>;
      public direction: string = 'right';
      public isFade: boolean = false;
      public duration: number = 300;
      public delay: number = 300;

      constructor(displayObject: egret.DisplayObject & ITransitable) {
        super(displayObject);
      }

      public set active(value: boolean) {
        if (this.target && this.target.parent instanceof List) {
          const list = <List> this.target.parent;
          if (list.useVirtualLayout) {
            egret.error('virtual layout not supported');
          }
        }
        super.$setActive(value);
      }

      public get active(): boolean {
        return this._active;
      }

      public reset() {
        this.target.content.alpha = 0;
        this.target.content.x = 0;
        this.target.content.y = 0;
        this.target.touchEnabled = false;
      }

      public init() {
        super.init();
        this.reset();
        this.target.once(egret.Event.ENTER_FRAME, this.start, this);
      }

      public setCustomAnimtion(animationFunc: () => Promise<void>) {
        this.customAnimation = animationFunc;
      }

      protected async start() {
        if (!this.target) {
          return;
        }
        this.target.touchEnabled = false;

        await this.startTransition();

        this.target.touchEnabled = true;
      }

      protected async startTransition() {
        switch (this.direction) {
          case 'left':
            await Transition.MoveInFromLeft(this.target.content, this.isFade, this.duration, this.delay);
            break;
          case 'right':
            await Transition.MoveInFromRight(this.target.content, this.isFade, this.duration, this.delay);
            break;
          default:
            await Transition.defaultIn(this.target.content, this.duration, this.delay);
            break;
        }
      }
    }
  }
}
