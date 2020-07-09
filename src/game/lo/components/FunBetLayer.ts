namespace we {
  export namespace lo {
    export class FunBetLayer extends core.BaseEUI {

      protected _tabbar: eui.TabBar;
      protected _viewstack: eui.ViewStack;
      private _items: string[] = ['fun', 'num', 'dt', 'five1'];

        constructor() {
            super('lo.FunBetLayer');
        }

        protected mount() {
          super.mount();
          this._tabbar.itemRenderer = FunBetTabItemRenderer;
          this._tabbar.dataProvider = new eui.ArrayCollection(this._items);
          this._tabbar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);
        }

        protected destroy() {
          super.destroy();
          this._tabbar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);
        }

        protected handleTap() {
          this._viewstack.selectedIndex = this._tabbar.selectedIndex;
        }
    }

    class FunBetTabItemRenderer extends eui.ItemRenderer {
      private bg: ui.RoundRectShape;
      private label: ui.RunTimeLabel;

      public constructor() {
        super();
        this.skinName = utils.getSkinByClassname('lo.FunBetTabItemRenderer');
        mouse.setButtonMode(this, true);
      }

      public dataChanged() {
        super.dataChanged();
        this.label.renderText = () => `${i18n.t(`lo_fun_betlayer_tab_${this.data}`)}`;
        if(this.itemIndex != 0) {
          this.bg.cornerTL_TR_BL_BR = "0,0,0,0";
          this.bg.refresh();
        }
      }
    }
  }
}