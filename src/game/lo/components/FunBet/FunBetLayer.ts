namespace we {
  export namespace lo {
    export class FunBetLayer extends core.BaseEUI {
      protected _tabbar: eui.TabBar;
      protected _viewstack: eui.ViewStack;
      protected _vh: number;
      private _items: string[] = ['fun', 'num', 'dt', 'five1'];

      constructor() {
        // super('lo.FunBetLayer');
        super();
        this.customKey = 'lo';
      }

      protected mount() {
        super.mount();
        this._tabbar.itemRenderer = FunBetTabItemRenderer;
        this._tabbar.dataProvider = new eui.ArrayCollection(this._items);
        this._tabbar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);

        this._vh = this._viewstack.height;
      }

      protected destroy() {
        super.destroy();
        this._tabbar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);
      }

      protected handleTap() {
        this._viewstack.selectedIndex = this._tabbar.selectedIndex;
      }
    }
  }
}
