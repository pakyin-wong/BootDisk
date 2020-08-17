namespace we {
  export namespace ui {
    export class Overlay extends core.BaseEUI {
      private _overlayMask: egret.Shape;
      private _onShowItem: Panel;
      private _onShowItemClass: string;

      public constructor() {
        super();
        this._overlayMask = new egret.Shape();
      }

      // protected mount() {
      //   this.width = this.stage.stageWidth;
      //   this.height = this.stage.stageHeight;
      //   this._overlayMask.graphics.beginFill(0x000000, 0.7);
      //   this._overlayMask.graphics.drawRect(0, 0, this.width, this.height);
      //   this._overlayMask.graphics.endFill();
      //   this.addListeners();
      // }

      protected initComponents() {
        super.initComponents();
        this.addListeners();
      }

      // set the position of the children components
      protected arrangeComponents() {
        super.arrangeComponents();
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this._overlayMask.graphics.beginFill(0x000000, 0.7);
        this._overlayMask.graphics.drawRect(0, 0, this.width, this.height);
        this._overlayMask.graphics.endFill();
        this._overlayMask.alpha = 0.4;
      }

      protected addListeners() {
        dir.evtHandler.$addListener(core.Event.TOGGLE_OVERLAY_PANEL, this.onToggle, this);
      }

      protected onToggle(e: egret.Event) {
        let panel: Panel;
        try {
          const opt: IOverlayOpt = e.data;
          panel = new we.overlay[opt.class](...opt.args);
        } catch (err) {
          logger.l(utils.LogTarget.UAT, `panel ${e.data} defined error`, e.data, err);
          return;
        }

        this.toggle(panel, e.data);
      }

      private async toggle(item: Panel, opt: IOverlayOpt) {
        if (opt.replace) {
          this.removeChildren();
          if (!opt.noDimmer) {
            this.addChild(this._overlayMask);
            this._overlayMask.alpha = 0;
            egret.Tween.removeTweens(this._overlayMask);
            egret.Tween.get(this._overlayMask).to({ alpha: 1 }, 250);
          }
          this.addItem(item, opt);
          return;
        }
        // check is same class and already show
        if (this._onShowItem != null && this._onShowItemClass === opt.class && this._onShowItemClass !== '') {
          if (!opt.replace) {
            return;
          }
        }

        if (this._onShowItem) {
          this.removeItem();
        } else {
          item.dismissOnClickOutside = true;
          this.removeChildren();
          if (!opt.noDimmer) {
            this.addChild(this._overlayMask);
            this._overlayMask.alpha = 0;
            egret.Tween.removeTweens(this._overlayMask);
            egret.Tween.get(this._overlayMask).to({ alpha: 1 }, 250);
          }
        }

        this.addItem(item, opt);
      }

      public get onShowItemString() {
        return this._onShowItemClass;
      }

      public hide() {
        this.removeItem();
        this.fadeout();
      }

      private fadeout() {
        egret.Tween.removeTweens(this._overlayMask);
        egret.Tween.get(this._overlayMask)
          .to({ alpha: 0 }, 250)
          .call(() => {
            this.removeChildren();
          }, this);
      }

      private async addItem(item: Panel, opt: IOverlayOpt) {
        this._onShowItem = item;
        this._onShowItemClass = opt.class;
        this._onShowItem.isPoppable = true;
        this._onShowItem.dismissOnClickOutside = opt.dismissOnClickOutside || false;
        this._onShowItem.isFocusItem = true;
        if (opt.showOptions) {
          const { originX, originY, originW, originH } = opt.showOptions;
          this._onShowItem.x = originX - this._onShowItem.width / 2 + originW / 2;
          this._onShowItem.y = originY + originH;
        } else {
          this._onShowItem.horizontalCenter = 0;
          this._onShowItem.verticalCenter = 0;
        }
        this._onShowItem.once('close', this.onItemClose, this);
        this.addChild(this._onShowItem);
        this._onShowItem.show();
      }

      private async removeItem() {
        const item = this._onShowItem;
        item.removeEventListener('close', this.onItemClose, this);
        this._onShowItem = null;
        this._onShowItemClass = '';
        await item.hide();
        item.parent && item.parent.removeChild(item);
      }

      private onItemClose() {
        const item = this._onShowItem;
        item.removeEventListener('close', this.onItemClose, this);
        this._onShowItem = null;
        this._onShowItemClass = '';
        this.fadeout();
      }

      public close() {
        this.onItemClose();
      }
    }
  }
}
