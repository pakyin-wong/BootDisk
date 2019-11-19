namespace we {
  export namespace ui {
    export class List extends eui.List {
      public enterFrom: string;
      public enterDelay: number;
      public leaveTo: string;
      public isAnimateItemTransition: boolean = false;
      public itemTransitionDuration: number = 300;

      protected tempNewItemArray: any[] = [];

      constructor() {
        super();
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

      public updateRenderer(renderer: eui.IItemRenderer, itemIndex: number, data: any): eui.IItemRenderer {
        egret.log('update:', data);
        const newIdx = this.tempNewItemArray.indexOf(data);

        const isNew = newIdx > -1;
        if (isNew) {
          this.tempNewItemArray.splice(newIdx, 1);
        }

        const wrapData = {
          item: data,
          isNew,
        };
        return super.updateRenderer(renderer, itemIndex, wrapData);
      }
    }
  }
}
