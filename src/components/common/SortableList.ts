/* tslint:disable max-classes-per-file */
namespace eui {
  export class SortableList extends eui.ListBase {
    private startPos: number;
    protected isDrag: boolean;

    protected clone: eui.Group;
    protected targetChildren: SortableItemRenderer;

    public dragThreshold: number = 30;
    public isHorizontal: boolean = true;

    public constructor() {
      super();
      this.isDrag = false;
    }

    protected rendererAdded(renderer: IItemRenderer, index: number, item: any) {
      super.rendererAdded(renderer, index, item);
      //   renderer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onRendererTouchMove, this);
    }

    protected rendererRemoved(renderer: IItemRenderer, index: number, item: any) {
      super.rendererRemoved(renderer, index, item);
      //   renderer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onRendererTouchMove, this);
    }

    protected getTouchPos(event: egret.TouchEvent): number {
      let pos = 0;
      if (this.isHorizontal) {
        pos = event.stageX;
      } else {
        pos = event.stageY;
      }
      return pos;
    }

    protected getTouchDiff(event: egret.TouchEvent): number {
      let diff = 0;
      if (this.isHorizontal) {
        diff = event.stageX - this.startPos;
      } else {
        diff = event.stageY - this.startPos;
      }
      return diff;
    }

    protected onRendererTouchBegin(event: egret.TouchEvent) {
      super.onRendererTouchBegin(event);
      if (!this.$stage) {
        return;
      }
      this.startPos = this.getTouchPos(event);
      const [touchedChild] = this.$children.filter((tab: egret.DisplayObject) => {
        return tab.$hitTest(event.stageX, event.stageY);
      });
      if (!touchedChild) {
        return;
      }
      this.targetChildren = <SortableItemRenderer>touchedChild;
      this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
      this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
      this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }
    protected onRendererTouchCancle(event: egret.TouchEvent) {
      super.onRendererTouchCancle(event);
    }
    protected onRendererTouchEnd(event: egret.TouchEvent) {
      super.onRendererTouchEnd(event);
    }

    protected createClone(itemRenderer: SortableItemRenderer) {
      this.clone = new eui.Group();
      const itemClone: SortableItemRenderer = itemRenderer.clone();
      itemClone.x = 0;
      itemClone.y = 0;
      this.clone.addChild(itemClone);
      this.clone.width = itemRenderer.width;
      this.clone.height = itemRenderer.height;
      this.clone.x = itemRenderer.x;
      this.clone.y = itemRenderer.y;
      const rect = new eui.Rect();
      rect.percentWidth = 100;
      rect.percentHeight = 100;
      rect.fillColor = 0xc0c0c0;
      rect.fillAlpha = 0.6;
      this.clone.alpha = 0.8;
      this.clone.addChild(rect);
    }

    protected onTouchMove(event: egret.TouchEvent) {
      if (!this.isDrag) {
        const diff = this.getTouchDiff(event);
        if (Math.abs(diff) > this.dragThreshold) {
          // cancel the tap check and do the sorting
          this.isDrag = true;
          this.startPos = this.getTouchPos(event);
          this.createClone(this.targetChildren);
          this.addChild(this.clone);
        }
      } else {
        const diff = this.getTouchDiff(event);
        this.clone.anchorOffsetX = diff * -1;
      }
    }
    protected onTouchCancel(event: egret.TouchEvent) {
      const stage = event.$currentTarget;
      stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
      stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
      stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
      this.isDrag = false;
      this.targetChildren = null;
      if (this.clone && this.clone.parent === this) {
        this.removeChild(this.clone);
      }
      this.clone = null;
    }
    protected onTouchEnd(event: egret.TouchEvent) {
      const stage = event.$currentTarget;
      if (this.targetChildren) {
        stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

        if (this.isDrag) {
          this.isDrag = false;

          const max = this.$children.reduce((prev, curr) => {
            if (curr.x > prev.x) {
              return curr;
            }
            return prev;
          });

          const releaseX = Math.max(0, Math.min(max.x, this.clone.x + -this.clone.anchorOffsetX)) + max.width / 2;
          const globalCoord = this.localToGlobal(releaseX, 0);
          const [swapChild] = this.$children.filter((tab: egret.DisplayObject) => {
            return tab.$hitTest(globalCoord.x, globalCoord.y);
          });
          const selectedIndex = this.selectedIndex;
          const collection = <eui.ArrayCollection>this.$dataProvider;
          const remIndex = this.$children.indexOf(this.targetChildren);
          const remData = this.$dataProvider.getItemAt(remIndex);
          const addIndex = this.$children.indexOf(swapChild);
          const addData = this.$dataProvider.getItemAt(addIndex);

          if (remIndex !== addIndex) {
            collection.removeItemAt(remIndex);
            collection.addItemAt(remData, addIndex);
          }

          // TODO: update selected index
          if (remIndex === selectedIndex) {
            // the dragged item is the currently selected item
            this.setSelectedIndex(addIndex, false);
          }
          if (addIndex === selectedIndex) {
            this.setSelectedIndex(addIndex + 1, false);
          }
          egret.log(this.selectedIndex);

          this.targetChildren = null;
          if (this.clone && this.clone.parent === this) {
            this.removeChild(this.clone);
          }
          this.clone = null;
        }
      }
    }
  }

  export class SortableItemRenderer extends eui.ItemRenderer {
    private startX: number;
    private startY: number;
    public dragThreshold: number = 30;

    protected isTouchCaptured: boolean;

    public constructor() {
      super();
      this.isTouchCaptured = false;
    }

    public clone(): any {
      const clone: egret.DisplayObject = new (<any>this.constructor)();
      clone.x = this.x;
      clone.y = this.y;
      clone.width = this.width;
      clone.height = this.height;
      clone.scaleX = clone.scaleX;
      clone.scaleY = clone.scaleY;
      return clone;
    }

    public dataChanged() {}

    protected onTouchBegin(event: egret.TouchEvent) {
      super.onTouchBegin(event);
      if (!this.$stage) {
        return;
      }
      this.startX = event.stageX;
      this.startY = event.stageY;

      this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
      this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
      this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
      this.isTouchCaptured = true;
      this.invalidateState();
      event.updateAfterEvent();
    }

    protected onTouchMove(event: egret.TouchEvent) {
      const diffX = event.stageX - this.startX;
      const diffY = event.stageY - this.startY;
      egret.log(diffX, diffY);
      if (Math.max(Math.abs(diffX), Math.abs(diffY)) > this.dragThreshold) {
        // cancel the tap check and do the sorting
        this.onTouchEnd(event);
      }
    }

    protected onTouchCancel(event: egret.TouchEvent) {
      this.isTouchCaptured = false;
      const stage = event.$currentTarget;
      stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
      stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
      stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
      this.invalidateState();
    }

    protected onTouchEnd(event: egret.TouchEvent) {
      const stage = event.$currentTarget;
      stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
      stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
      stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
      this.isTouchCaptured = false;
      this.invalidateState();
    }

    protected getCurrentState() {
      let state = 'up';
      if (!this.enabled) {
        state = 'disabled';
      }
      if (this.isTouchCaptured) {
        state = 'down';
      }
      if (this.selected) {
        const selectedState = state + 'AndSelected';
        const skin = this.skin;
        if (skin && skin.hasState(selectedState)) {
          return selectedState;
        }
        return state === 'disabled' ? 'disabled' : 'down';
      }
      return state;
    }
  }
}
