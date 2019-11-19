namespace we {
  export namespace ui {
    export class VBDList extends eui.Component implements IRunTimeComponent {
      protected _direction = 'topdown'; // topdown / bottomup
      protected _mounted = false;

      protected displayItemList: egret.DisplayObject[] = [];
      protected itemQueue: egret.DisplayObject[] = [];

      public maxDisplayCount: number = -1;
      public itemAddToTop: boolean = true;
      public enterFrom: string;
      public enterDelay: number;
      public leaveTo: string;
      public isAnimateItemTransition: boolean = false;
      public itemTransitionDuration: number = 300;

      public paddingLeft: number = 5;
      public paddingRight: number = 5;
      public paddingTop: number = 5;
      public paddingButtom: number = 5;

      constructor() {
        super();
      }

      public childrenCreated(): void {
        super.childrenCreated();
        this._mounted = true;
        this.render();
      }

      public reset() {
        for (const item of this.displayItemList) {
          egret.Tween.removeTweens(item);
          item.$parent.removeChild(item);
        }
        this.itemQueue = [];
        this.displayItemList = [];
      }

      public hasItem(item: egret.DisplayObject) {
        return this.displayItemList.indexOf(item) >= 0 || this.itemQueue.indexOf(item) >= 0;
      }

      public setItems(list: egret.DisplayObject[]) {
        this.reset();
        if (this.maxDisplayCount > -1 && list.length > this.maxDisplayCount) {
          this.displayItemList = list.slice(0, this.maxDisplayCount);
          this.itemQueue = list.slice(this.maxDisplayCount);
        } else {
          this.displayItemList = list;
        }
        this.render();
      }

      public addItem(item: egret.DisplayObject) {
        if (this.hasItem(item)) {
          return;
        }
        item.$parent && item.$parent.removeChild(item);

        // add item to appropriate list
        if (this.maxDisplayCount > -1 && this.displayItemList.length > this.maxDisplayCount) {
          this.itemQueue.push(item);
        } else {
          if (this.itemAddToTop) {
            this.displayItemList.unshift(item);
          } else {
            this.displayItemList.push(item);
          }
          this.render();
        }
      }

      public removeItem(item: egret.DisplayObject) {
        if (this.displayItemList.indexOf(item) >= 0) {
          this.displayItemList.splice(this.displayItemList.indexOf(item), 1);
          // this.fadeOutItem(item);
          this.render();
        }
      }

      public set direction(d: string) {
        this._direction = d;
        this.render();
      }

      public render() {
        // if (!this._mounted) {
        //   return;
        // }
        // let idx: number;
        // let totalHeight = 0;
        // for (idx = 0; idx < this.displayItemList.length; idx++) {
        //   const item: egret.DisplayObject = this.displayItemList[idx];
        //   if (totalHeight + item.$getHeight() >= this.height && this._mode === 'fit') {
        //     break;
        //   }
        //   totalHeight += item.$getHeight();
        // }
        // while (idx < this.displayItemList.length) {
        //   const item: egret.DisplayObject = this.displayItemList.pop();
        //   this.fadeOutItem(item);
        // }
        // let cY = 0;
        // for (const item of this.displayItemList) {
        //   if (!this._viewPort.contains(item)) {
        //     this.fadeInItem(item, cY, totalHeight);
        //   } else {
        //     this.fadeMove(item, cY, totalHeight);
        //   }
        //   cY += item.$getHeight();
        // }
      }

      // private fadeMove(item: egret.DisplayObject, cY: number, totalHeight: number) {
      //   const targetY = this._direction === 'topdown' ? cY : Math.max(this.height, totalHeight) - cY - item.$getHeight();
      //   if (item.$y !== targetY) {
      //     egret.Tween.removeTweens(item);
      //     egret.Tween.get(item).to({ $y: targetY }, this._fadeSpeed);
      //   }
      // }

      // private fadeInItem(item: egret.DisplayObject, cY: number, totalHeight: number) {
      //   egret.Tween.removeTweens(item);
      //   item.$parent && item.$parent.removeChild(item);
      //   this._viewPort.addChild(item);
      //   item.$y = this._direction === 'topdown' ? cY : Math.max(this.height, totalHeight) - cY - item.$getHeight();
      //   const targetX = this._snapTo === 'right' ? this.width - item.width : 0;
      //   item.$x = this._snapTo === 'right' ? targetX + this._fadeDistance : targetX - this._fadeDistance;
      //   item.alpha = 0;
      //   egret.Tween.get(item).to({ $x: targetX, alpha: 1 }, this._fadeSpeed);
      // }

      // private fadeOutItem(item: egret.DisplayObject) {
      //   egret.Tween.removeTweens(item);
      //   item.$parent && item.$parent.removeChild(item);
      //   this.addChild(item);
      //   const targetX = this._snapTo === 'right' ? item.$x + this._fadeDistance : item.$x - this._fadeDistance;
      //   egret.Tween.get(item)
      //     .to({ $x: targetX, alpha: 0 }, this._fadeSpeed)
      //     .call(() => {
      //       item.$parent.removeChild(item);
      //     });
      // }
    }
  }
}
