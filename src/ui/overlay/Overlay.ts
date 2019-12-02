namespace we {
  export namespace ui {
    export class Overlay extends core.BaseEUI {
      private _overlayMask: egret.Shape;
      private _onShowItem: Panel;
      private _onShowItemId: string;

      public constructor() {
        super();
        this._overlayMask = new egret.Shape();
      }

      protected mount() {
        this._overlayMask.graphics.beginFill(0x000000, 0.7);
        this._overlayMask.graphics.drawRect(0, 0, this.stage.width, this.stage.height);
        this._overlayMask.graphics.endFill();
      }

      protected addListeners() {
        //   dir.evtHandler.
      }

      public show(item: Panel, id: string) {
        if (this._onShowItem != null && this._onShowItemId === id && this._onShowItemId !== '') {
          return;
        }

        if (this._onShowItem) {
          this.closeItem();
        } else {
          this.removeChildren();
          this.addChild(this._overlayMask);
          this._overlayMask.alpha = 0;
          egret.Tween.removeTweens(this._overlayMask);
          egret.Tween.get(this._overlayMask).to({ alpha: 1 }, 1000);
        }

        this.addItem(item, id);
      }

      public hide() {
        this.closeItem();
        egret.Tween.removeTweens(this._overlayMask);
        egret.Tween.get(this._overlayMask)
          .to({ alpha: 0 }, 1000)
          .call(() => {
            this.removeChildren();
          }, this);
      }

      private addItem(item: Panel, id: string) {
        this._onShowItem = item;
        this._onShowItemId = id;
        item.once('close', this.hide, this);
        this.addChild(item);
        item.show();
      }

      private async closeItem() {
        const item = this._onShowItem;
        item.removeEventListener('close', this.hide, this);
        this._onShowItem = null;
        this._onShowItemId = '';
        await item.hide();
        item.parent && item.parent.removeChild(item);
      }
    }
  }
}
