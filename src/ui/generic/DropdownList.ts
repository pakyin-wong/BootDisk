/* tslint:disable max-classes-per-file */
namespace we {
  export namespace ui {
    export class DropdownList extends Panel {
      private _items = ['test', 'test222', 'etst333'];
      private _collection: eui.ArrayCollection;
      private _scroller: we.ui.Scroller;
      private _options: eui.List;

      constructor() {
        super();
        this.isPoppable = true;
        this.hideOnStart = true;
        this.dismissOnClickOutside = true;
      }

      protected mount() {
        // create list
        this._collection = new eui.ArrayCollection(this._items);
        this._options = new List();
        const vlayout = new eui.VerticalLayout();
        vlayout.gap = 1;
        this._options.layout = vlayout;
        this._options.dataProvider = this._collection;
        this._options.itemRenderer = DropdownListHolder;

        // create scroller
        this._scroller = new Scroller();
        this._scroller.percentWidth = 100;
        this._scroller.percentHeight = 100;
        this._scroller.viewport = this._options;

        const rect = new eui.Rect();
        rect.fillColor = 0x000000;
        rect.percentWidth = 100;
        rect.percentHeight = 100;

        const group = new eui.Group();
        group.percentWidth = 100;
        group.percentHeight = 100;
        group.addChild(rect);
        group.addChild(this._scroller);

        this.setContent(group);
        (this.toggler.$children[0] as eui.Label).text = this._items[0];
      }
    }

    export class DropdownListHolder extends ItemRenderer {
      public constructor() {
        super();
        this.touchEnabled = true;
        this.mount();
      }

      private async mount() {
        this.width = 200;
        this.height = 80;

        const rect = new eui.Rect();
        rect.fillColor = 0x4400aa;
        rect.percentWidth = 100;
        rect.percentHeight = 100;
        this.addChild(rect);
      }

      public itemDataChanged() {
        super.itemDataChanged();
      }
    }
  }
}
