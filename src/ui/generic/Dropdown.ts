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

        this._list.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);

        if (this._items.length > 0) {
          this.updateLabel();
          this._list.selectedIndex = this._selectedIndex;
        }
      }

      protected onToggle() {}

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
