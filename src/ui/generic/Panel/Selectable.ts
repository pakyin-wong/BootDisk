namespace we {
  export namespace ui {
    export interface ISelectable {
      itemScroller: ui.Scroller;
    }

    export class SelectableAddon extends DisplayObjectAddon {
      protected target: egret.DisplayObject & ISelectable;
      private _dataCollection: eui.ArrayCollection;
      private _list: eui.List;
      private _review: eui.Label;

      constructor(displayObject: egret.DisplayObject & ISelectable) {
        super(displayObject);
        this._dataCollection = new eui.ArrayCollection();
        this._list = new eui.List();
        this._list.dataProvider = this._dataCollection;
      }

      public init() {
        if (this.target.stage && this.target.itemScroller) {
          super.init();
          this._list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
          this.target.itemScroller.viewport = this._list;
        }
      }

      public deactivate() {
        super.deactivate();
        this._list.parent && this._list.parent.removeChild(this._list);
        this._list = null;
        this._review = null;
      }

      public set review(label: eui.Label) {
        this._review = label;
      }

      public set renderer(r: eui.IItemRenderer) {
        this._list.itemRenderer = r;
      }

      protected onTapItem(e: eui.PropertyEvent) {}
    }
  }
}
