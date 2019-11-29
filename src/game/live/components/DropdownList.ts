namespace we {
  export namespace live {
    export class DropdownList extends we.ui.Panel {
      private _group: eui.Group;
      private _items;
      public selectedItemIndex: number
      public isExpanded: boolean

      constructor() {
        super();
        this._group = new eui.Group();
      }

      protected childrenCreated() {
        super.childrenCreated();
        this._group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleDropdown, this)
      }

      protected handleDropdown() {

      }

      public get items() {
          return this._items
      }

      public set items(items) {
          this._items = items
          this.selectedItemIndex = 0
          this.isExpanded = false
      }
    }
  }
}
