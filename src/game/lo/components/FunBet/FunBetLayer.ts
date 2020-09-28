namespace we {
  export namespace lo {
    export class FunBetLayer extends core.BaseEUI {
      protected _tabbar: eui.TabBar;
      protected _viewstack: eui.ViewStack;
      // protected _vh: number;

      // public items: string[] = ['fun', 'num', 'dt', 'five1'];

      constructor() {
        // super('lo.FunBetLayer');
        super();
        this.customKey = 'lo';
      }

      protected mount() {
        super.mount();

        const _arrcol = new eui.ArrayCollection();

        for (let i = 0; i < this._viewstack.length; i++) {
          _arrcol.addItem(`${this.customKey}_fun_betlayer_tab_${this._viewstack.getItemAt(i)}`);
        }

        this._tabbar.dataProvider = _arrcol;
        this._tabbar.itemRenderer = FunBetTabItemRenderer;
        this._tabbar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);

        // this._vh = this._viewstack.height;
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
