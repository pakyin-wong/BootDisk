namespace we {
  export namespace lo {
    export class FunBetLayer extends core.BaseEUI {

      protected _toggler: egret.DisplayObject;

      protected _tabbar: eui.TabBar;
      protected _viewstack: eui.ViewStack;
      
      protected _descTogger: egret.DisplayObject;
      protected _desc: FunBetDescription;

      protected _txt_infoToggler: ui.RunTimeLabel;

      constructor() {
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

        this._txt_infoToggler && (this._txt_infoToggler.renderText = ()=> i18n.t(`lo_fun_betlayer_info`));

        this._desc.setToggler(this._descTogger);
        utils.addButtonListener(this._descTogger, this.onDescTogger, this);
      }

      protected destroy() {
        super.destroy();
        this._tabbar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);

        this._desc.removeToggler();
        utils.removeButtonListener(this._descTogger, this.onDescTogger, this);
      }

      protected handleTap() {
        this._viewstack.selectedIndex = this._tabbar.selectedIndex;
      }

      protected onDescTogger() {
        this._desc.setText(i18n.t(`${this.customKey}_fun_betlayer_info_${this._viewstack.getItemAt(this._tabbar.selectedIndex)}`));
      }

      public get toggler() {
        return this._toggler;
      }
    }
  }
}
