/* tslint:disable max-classes-per-file */
namespace we {
  export namespace ui {
    export class SortableList extends eui.TabBar {
      private startPos: number;
      protected isDrag: boolean;

      protected clone: eui.Group;
      protected targetChildren: SortableItemRenderer;

      public dragThreshold: number = 30;
      public isHorizontal: boolean = true;

      protected destinationPosition: egret.Point;

      public constructor() {
        super();
        this.isDrag = false;
        this.useVirtualLayout = false;
        const tlayout = new eui.HorizontalLayout();
        tlayout.gap = 0;
        // tlayout.horizontalAlign = eui.JustifyAlign.JUSTIFY;
        this.layout = tlayout;
      }

      protected rendererAdded(renderer: eui.IItemRenderer, index: number, item: any) {
        super.rendererAdded(renderer, index, item);
        if (this.destinationPosition) {
          renderer.x = this.destinationPosition.x;
          renderer.y = this.destinationPosition.y;
          const itemRenderer = <SortableItemRenderer>renderer;
          if (itemRenderer) {
            itemRenderer.isNew = false;
          }
        }
        //   renderer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onRendererTouchMove, this);
      }

      protected rendererRemoved(renderer: eui.IItemRenderer, index: number, item: any) {
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

      // protected onRendererTouchBegin(event: egret.TouchEvent) {
      //   super.onRendererTouchBegin(event);
      //   if (!this.$stage) {
      //     return;
      //   }
      //   this.startPos = this.getTouchPos(event);
      //   const [touchedChild] = this.$children.filter((tab: egret.DisplayObject) => {
      //     if (tab.$hitTest(event.stageX, event.stageY)) {
      //       this.destinationPosition = new egret.Point(tab.x, tab.y);
      //       return true;
      //     }
      //   });
      //   if (!touchedChild) {
      //     return;
      //   }
      //   this.targetChildren = <SortableItemRenderer> touchedChild;
      //   this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
      //   this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
      //   this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
      // }
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
        // const rect = new eui.Rect();
        // rect.percentWidth = 100;
        // rect.percentHeight = 100;
        // rect.fillColor = 0xc0c0c0;
        // rect.fillAlpha = 0.6;
        // this.clone.addChild(rect);
        this.clone.alpha = 0.8;
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

            const rightmost = this.$children.reduce((prev, curr) => {
              if (curr.x > prev.x) {
                return curr;
              }
              return prev;
            });

            const releaseX = Math.max(0, Math.min(rightmost.x, this.clone.x + -this.clone.anchorOffsetX));
            const releaseGlobalCoord = this.localToGlobal(releaseX, 0);
            const outsideGapSize = ((this.$parent as we.live.SegmentedControl).tabBar.layout as eui.HorizontalLayout).gap;

            const swapChild = this.$children
              .filter((tab: egret.DisplayObject) => {
                return tab instanceof we.live.SegmentedControlTabItem;
              })
              .reduce((prev, tab: egret.DisplayObject) => {
                const adjustedReleaseX = releaseGlobalCoord.x + this.targetChildren.width / 2;
                const tabGlobalCoord = this.localToGlobal(tab.x, tab.y);
                // console.log(`${tab.width} (${tabGlobalCoord.x} - ${tabGlobalCoord.x + tab.width}) Rel: ${releaseGlobalCoord.x}, Adj: ${adjustedReleaseX}`);
                if (adjustedReleaseX >= tabGlobalCoord.x - outsideGapSize / 2 && adjustedReleaseX <= tabGlobalCoord.x + tab.width + outsideGapSize / 2) {
                  return tab;
                }
                return prev;
              }, null);

            if (!swapChild) {
              this.targetChildren = null;
              if (this.clone && this.clone.parent === this) {
                this.removeChild(this.clone);
              }
              this.clone = null;
              return;
            }

            // const [swapChild] = this.$children.filter((tab: egret.DisplayObject) => {
            //   const globalCoord2 = this.localToGlobal(tab.x, tab.y);
            //   logger.l(utils.LoggerTarget.DEBUG, tab.name, tab.x, tab.y, tab.width, tab.height, globalCoord2.x, globalCoord2.y);
            //   if (tab instanceof we.live.SegmentedControlTabItem && tab.$hitTest(globalCoord.x, globalCoord.y)) {
            //     return true;
            //   }
            // });
            // console.log('swapChild', swapChild);
            const selectedIndex = this.selectedIndex;
            const collection = <eui.ArrayCollection>this.$dataProvider;
            const remIndex = this.$children.indexOf(this.targetChildren);
            const remData = this.$dataProvider.getItemAt(remIndex);
            const addIndex = this.$children.indexOf(swapChild);
            const addData = this.$dataProvider.getItemAt(addIndex);

            if (remIndex !== addIndex) {
              collection.removeItemAt(remIndex);
              logger.l(utils.LogTarget.DEBUG, `addIndex maybe out of range: ${addIndex}`);
              collection.addItemAt(remData, addIndex);
              this.dispatchEvent(new egret.Event('REORDER', false, false, { prevIdx: remIndex, newIdx: addIndex }));
            }

            // TODO: update selected index
            if (remIndex === selectedIndex) {
              // the dragged item is the currently selected item
              logger.l(utils.LogTarget.DEBUG, 'previous selected index: ', this.selectedIndex);
              this.setSelectedIndex(addIndex, false);
              //   eui.UIEvent.dispatchEvent(this, eui.UIEvent.CHANGE);
              logger.l(utils.LogTarget.DEBUG, 'new selected index: ', this.selectedIndex);
            }

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
      private init: boolean = false;
      public isNew: boolean = true;
      public dragThreshold: number = 30;

      protected isTouchCaptured: boolean;

      public constructor() {
        super();
        this.isTouchCaptured = false;
        this.selected = false;
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

      public dataChanged() {
        if (!this.init) {
          this.selected = false;
          this.init = true;
        }
      }

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
        // logger.l(utils.LoggerTarget.DEBUG, diffX, diffY);
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
}
