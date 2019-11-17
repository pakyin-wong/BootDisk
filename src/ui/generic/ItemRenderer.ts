namespace we {
  export namespace ui {
    export class ItemRenderer extends eui.ItemRenderer implements ITransitable, ISwipeable {
      public moveArea: eui.Component;
      public content: egret.DisplayObject;

      protected _enterFrom: string = null;
      protected _leaveTo: string = null;

      protected onEnterTransitionAddon: OnEnterTransitionAddon;
      protected onLeaveTransitionAddon: OnLeaveTransitionAddon;

      public isFadeEnter: boolean;
      public isFadeLeave: boolean;

      public set enterFrom(value: string) {
        this._enterFrom = value;
        this.onEnterTransitionAddon.active = value != null && value !== '';
        if (this.onEnterTransitionAddon.active) {
          this.onEnterTransitionAddon.direction = value;
          this.onEnterTransitionAddon.isFade = this.isFadeEnter;
        }
      }
      public get enterFrom(): string {
        return this._enterFrom;
      }
      public set leaveTo(value: string) {
        this._leaveTo = value;
        this.onLeaveTransitionAddon.active = value != null && value !== '';
        if (this.onLeaveTransitionAddon.active) {
          this.onLeaveTransitionAddon.direction = value;
          this.onLeaveTransitionAddon.isFade = this.isFadeLeave;
        }
      }
      public get leaveTo(): string {
        return this._leaveTo;
      }

      public onSwipe() {}

      protected childrenCreated(): void {
        super.childrenCreated();
      }
    }
  }
}
