namespace we {
  export namespace ui {
    export class List extends eui.List {
      public enterFrom: string;
      public enterDelay: number;
      public leaveTo: string;
      public isSwipeable: boolean;
      public swipeDirection: SwipeDirection;
      public isAnimateItemTransition: boolean = false;
      public itemTransitionDuration: number = 300;
      public maxDisplayCount: number = -1;
      public isFade: boolean = false;

      protected itemQueue: any[] = [];

      protected tempNewItemArray: any[] = [];

      constructor() {
        super();
      }

      public addItem(item: any) {
        if (this.maxDisplayCount <= 0 || this.dataProvider.length < this.maxDisplayCount) {
          const collection = <eui.ArrayCollection> this.dataProvider;
          collection.addItem(item);
        } else {
          this.itemQueue.push(item);
        }
      }

      public addItemAt(item: any, index: number) {
        if (this.maxDisplayCount > 0) {
          egret.error('queue is enabled. cannot use addItemAt. Fallback to addItem');
          this.addItem(item);
        } else {
          const collection = <eui.ArrayCollection> this.dataProvider;
          collection.addItemAt(item, index);
        }
      }

      public removeItem(item: any) {
        const collection = <eui.ArrayCollection> this.dataProvider;
        let idx = collection.getItemIndex(item);
        if (idx >= 0) {
          collection.removeItemAt(idx);
        }
        if (this.maxDisplayCount > 0) {
          idx = this.itemQueue.indexOf(item);
          if (idx >= 0) {
            this.itemQueue.splice(idx, 1);
          }
        }
      }

      public itemAdded(item: any, index: number) {
        this.tempNewItemArray.push(item);
        super.itemAdded(item, index);
        setTimeout(() => {
          const newIdx = this.tempNewItemArray.indexOf(item);
          const isNew = newIdx > -1;
          if (isNew) {
            this.tempNewItemArray.splice(newIdx, 1);
          }
        }, 100);
      }

      public itemRemoved(item: any, index: number) {
        super.itemRemoved(item, index);
        if (this.maxDisplayCount > 0) {
          const nextItem = this.itemQueue.shift();
          if (nextItem) {
            this.addItem(nextItem);
          }
        }
      }

      public updateRenderer(renderer: eui.IItemRenderer, itemIndex: number, data: any): eui.IItemRenderer {
        const wrapData = this.wrapData(renderer, itemIndex, data);
        return super.updateRenderer(renderer, itemIndex, wrapData);
      }

      protected wrapData(renderer: eui.IItemRenderer, itemIndex: number, data: any) {
        const newIdx = this.tempNewItemArray.indexOf(data);

        const isNew = newIdx > -1;
        if (isNew) {
          this.tempNewItemArray.splice(newIdx, 1);
        }

        return {
          item: data,
          isNew,
        };
      }
    }
  }
}
