namespace we {
  export namespace ui {
    export class ItemRenderer extends eui.ItemRenderer implements ITransitable, ISwipeable, IAutoRemove {
      public moveArea: eui.Component;
      public content: egret.DisplayObject;

      protected _enterFrom: string = null;
      protected _leaveTo: string = null;
      protected _isSwipeable: boolean;
      protected swipeDirection: SwipeDirection = SwipeDirection.left;

      protected onEnterTransitionAddon: OnEnterTransitionAddon;
      protected autoRemoveAddon: AutoRemoveAddon;
      protected swipeableAddon: SwipeableAddon;

      public isFadeEnter: boolean;
      public isFadeLeave: boolean;

      public itemData: any;
      protected destinationX: number = Infinity;
      protected destinationY: number = Infinity;
      protected isDirty: boolean = true;

      constructor() {
        super();
        this.onEnterTransitionAddon = new OnEnterTransitionAddon(this);
        this.autoRemoveAddon = new AutoRemoveAddon(this);
        this.swipeableAddon = new SwipeableAddon(this);
      }

      public set enterFrom(value: string) {
        this._enterFrom = value;
        this.onEnterTransitionAddon.active = !(value == null || value === '');
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
        this.autoRemoveAddon.active = !(value == null || value === '');
        if (this.autoRemoveAddon.active) {
          this.autoRemoveAddon.direction = value;
          this.autoRemoveAddon.isFade = this.isFadeLeave;
        }
      }
      public get leaveTo(): string {
        return this._leaveTo;
      }
      public set isSwipeable(value: boolean) {
        this._isSwipeable = value;
        this.swipeableAddon.active = value;
        if (value) {
          this.swipeableAddon.swipeDirection = this.swipeDirection;
        }
      }
      public get isSwipeable(): boolean {
        return this._isSwipeable;
      }

      public removeSelf(isAnimate: boolean = false) {
        if (isAnimate) {
          this.autoRemoveAddon.startRemove();
        } else {
          if (this.parent instanceof List) {
            const list = <List>this.parent;
            const collection = <eui.ArrayCollection>list.dataProvider;
            const idx = collection.getItemIndex(this.itemData);
            if (idx >= 0) {
              collection.removeItemAt(idx);
            }
          }
        }
      }

      public onSwipe() {}

      public dataChanged(): void {
        super.dataChanged();
        this.isDirty = true;
        const isNew = this.data.isNew;
        this.itemData = this.data.item;
        if (isNew) {
          if (this.parent instanceof List) {
            const list = <List>this.parent;
            this.enterFrom = list.enterFrom;
            this.leaveTo = list.leaveTo;
            this.swipeDirection = list.swipeDirection;
            this.isSwipeable = list.isSwipeable;
          }
        }
        this.itemDataChanged();
      }

      public itemDataChanged() {}

      private isDeltaIdentity(m) {
        return m.a === 1 && m.b === 0 && m.c === 0 && m.d === 1;
      }

      public setLayoutBoundsPosition(x: number, y: number) {
        if (this.parent instanceof List) {
          const list = <List>this.parent;
          const matrix = this.$getMatrix();
          if (!this.isDeltaIdentity(matrix) || this.anchorOffsetX !== 0 || this.anchorOffsetY !== 0) {
            const bounds = egret.$TempRectangle;
            this.getLayoutBounds(bounds);
            x += this.$getX() - bounds.x;
            y += this.$getY() - bounds.y;
          }
          if (this.isDirty || !list.isAnimateItemTransition) {
            this.isDirty = false;
            this.destinationX = x;
            this.destinationY = y;
            const changed = super.$setX.call(this, x);
            if (super.$setY.call(this, y) || changed) {
              eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
            }
          } else {
            if (this.destinationX !== x || this.destinationY !== y) {
              this.destinationX = x;
              this.destinationY = y;
              // cancel current tween
              egret.Tween.removeTweens(this);
              // tween move to new position
              const previousTouchSetting = this.touchEnabled;
              this.touchEnabled = false;
              egret.Tween.get(this)
                .to({ x, y }, list.itemTransitionDuration)
                .call(() => {
                  this.touchEnabled = previousTouchSetting;
                });
              // dispatch move event
              eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
            }
          }
        } else {
          super.setLayoutBoundsPosition(x, y);
        }
      }
    }
  }
}
