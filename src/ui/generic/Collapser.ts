namespace we {
  export namespace ui {
    export class Collapser extends eui.Scroller implements IRunTimeComponent {
      protected _viewPort: eui.Group;
      protected _list: egret.DisplayObject[] = [];
      protected _direction = 'topdown'; // topdown / bottomup
      protected _snapTo = 'right'; // right / left
      protected _mode = 'fit'; // scroll / fit
      protected _fadeSpeed = 500;
      protected _fadeDistance = 50;
      protected _mounted = false;

      constructor() {
        super();
        this._viewPort = new eui.Group();
      }

      public childrenCreated(): void {
        super.childrenCreated();
        this.viewport = this._viewPort;
        this._mounted = true;
        this.verticalScrollBar.autoVisibility = false;
        this.verticalScrollBar.visible = this._mode === 'scroll';
        this.render();
      }

      public setItem(list: egret.DisplayObject[]) {
        for (const item of this._list) {
          egret.Tween.removeTweens(item);
          item.$parent.removeChild(item);
        }
        this._list = list;

        this.render();
      }

      public addItem(item: egret.DisplayObject) {
        if (this._list.indexOf(item) >= 0 || this._viewPort.contains(item)) {
          return;
        }
        item.$parent && item.$parent.removeChild(item);
        this._list.unshift(item);
        this.render();
      }

      public removeItem(item: egret.DisplayObject) {
        if (this._list.indexOf(item) >= 0 || this._viewPort.contains(item)) {
          this._list.splice(this._list.indexOf(item), 1);
          this.fadeOutItem(item);
          this.render();
        }
      }

      public setToScrollMode() {
        this._mode = 'scroll';
        this._mounted && (this.verticalScrollBar.visible = this._mode === 'scroll');
        this.render();
      }

      public setToFitMode() {
        this._mode = 'fit';
        this._mounted && (this.verticalScrollBar.visible = this._mode === 'scroll');
        this.render();
      }

      public set direction(d: string) {
        this._direction = d;
        this.render();
      }

      public set snap(s: string) {
        this._snapTo = s;
        this.render();
      }

      public render() {
        if (!this._mounted) {
          return;
        }

        let idx: number;
        let totalHeight = 0;

        for (idx = 0; idx < this._list.length; idx++) {
          const item: egret.DisplayObject = this._list[idx];
          if (totalHeight + item.$getHeight() >= this.height && this._mode === 'fit') {
            break;
          }
          totalHeight += item.$getHeight();
        }

        while (idx < this._list.length) {
          const item: egret.DisplayObject = this._list.pop();
          this.fadeOutItem(item);
        }

        let cY = 0;
        for (const item of this._list) {
          if (!this._viewPort.contains(item)) {
            this.fadeInItem(item, cY, totalHeight);
          } else {
            this.fadeMove(item, cY, totalHeight);
          }
          cY += item.$getHeight();
        }
      }

      private fadeMove(item: egret.DisplayObject, cY: number, totalHeight: number) {
        const targetY = this._direction === 'topdown' ? cY : Math.max(this.height, totalHeight) - cY - item.$getHeight();
        if (item.$y !== targetY) {
          egret.Tween.removeTweens(item);
          egret.Tween.get(item).to({ $y: targetY }, this._fadeSpeed);
        }
      }

      private fadeInItem(item: egret.DisplayObject, cY: number, totalHeight: number) {
        egret.Tween.removeTweens(item);
        item.$parent && item.$parent.removeChild(item);
        this._viewPort.addChild(item);
        item.$y = this._direction === 'topdown' ? cY : Math.max(this.height, totalHeight) - cY - item.$getHeight();
        const targetX = this._snapTo === 'right' ? this.width - item.width : 0;
        item.$x = this._snapTo === 'right' ? targetX + this._fadeDistance : targetX - this._fadeDistance;
        item.alpha = 0;
        egret.Tween.get(item).to({ $x: targetX, alpha: 1 }, this._fadeSpeed);
      }

      private fadeOutItem(item: egret.DisplayObject) {
        egret.Tween.removeTweens(item);
        item.$parent && item.$parent.removeChild(item);
        this.addChild(item);
        const targetX = this._snapTo === 'right' ? item.$x + this._fadeDistance : item.$x - this._fadeDistance;
        egret.Tween.get(item)
          .to({ $x: targetX, alpha: 0 }, this._fadeSpeed)
          .call(() => {
            item.$parent.removeChild(item);
          });
      }
    }
  }
}
