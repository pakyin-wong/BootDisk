namespace we {
  export namespace ui {
    export class Dropdown extends core.BaseEUI {
      protected _toggler: eui.Component;
      protected _scroller: Scroller;
      protected _list: List;

      protected _label: eui.Label;

      protected _items = [];
      protected _collection: eui.ArrayCollection;

      protected _selectedIndex = 0;

      protected _bg: eui.Image;

      protected _mask: eui.Component;

      constructor() {
        super();
      }

      public mount() {
        super.mount();

        this._scroller.setToggler(this._toggler, () => {
          this.onToggle();
        });
        this._collection = new eui.ArrayCollection(this._items);
        // this._list = this._scroller.viewport as List;
        this._list.dataProvider = this._collection;
        // const vLayout = new eui.VerticalLayout();
        // vLayout.gap = 0;
        // this._list.layout = vLayout;
        this._list.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);

        if (this._items.length > 0) {
          this.updateLabel();
          this._list.selectedIndex = this._selectedIndex;
        }

        if (this._bg) {
          this._bg.alpha = this._scroller.isCollapsed() ? 0 : 1;
        }

        if (this._mask) {
          this._mask.bottom = 2;
          this._mask.top = 0;
          this.mask = this._mask;
        }
      }

      protected onToggle() {
        if (this._bg) {
          egret.Tween.removeTweens(this._bg);
          if (this._scroller.isCollapsed()) {
            // this._bg.alpha = 0;
            egret.Tween.get(this._bg).to({ alpha: 0 }, 200);
          } else {
            // this._bg.alpha = 1;
            egret.Tween.get(this._bg).to({ alpha: 1 }, 200);
          }
        }
      }

      public setItems(items: string[]) {
        this._items = items;
        this._collection = new eui.ArrayCollection(this._items);
        this._list.dataProvider = this._collection;
      }

      public set selectedIndex(value: number) {
        this._selectedIndex = Math.max(0, Math.min(value, this._items.length - 1));
        if (this._items.length > 0) {
          this._list.selectedIndex = this._selectedIndex;
        }
        this.updateLabel();
      }

      public get selectedIndex(): number {
        return this._selectedIndex;
      }

      protected updateLabel() {
        this._label.text = this._items.length > 0 ? this._items[this._selectedIndex] : '';
      }

      protected onChange(evt: eui.UIEvent) {
        this.selectedIndex = this._list.selectedIndex;
        this._scroller.collapse();
        this.dispatchEvent(new eui.UIEvent(eui.UIEvent.CHANGE));
      }
    }
  }
}
