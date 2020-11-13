namespace we {
  export namespace ui {
    export class SidePanelGameGroupDropdown extends core.BaseEUI {
      protected _label: ui.RunTimeLabel;
      protected _toggler: eui.Component;
      protected _dmm: ui.Panel;

      protected _toggleArrow: eui.Image;
      protected _source;

      constructor() {
        super();
        this._source = env.sideGameCategories;
        // this._source = utils.EnumHelpers.values(core.GameGroupTab);
      }

      public mount() {
        super.mount();

        this._dmm.isDropdown = true;
        this._dmm.isPoppable = true;
        this._dmm.dismissOnClickOutside = true;
        this._dmm.setToggler(this._toggler);
        this._dmm.dropdown.review = this._label;
        this._dmm.dropdown.itemSkin = 'SidePanelGameDropDownIR';
        const gameListItems = this._source.map(game => {
          return ui.NewDropdownItem(game, () => i18n.t(`gamegroup_tab_${game}`));
        });
        this._dmm.dropdown.data.replaceAll(gameListItems);
        this._dmm.dropdown.select(this._source[0]);

        this._dmm.addEventListener('DROPDOWN_ITEM_CHANGE', this.onChanged, this);
        this._dmm.addEventListener('POPPER_SHOW', this.onRollToTop, this);
        this._dmm.addEventListener('POPPER_HIDE', this.onRollToDown, this);
      }

      protected destroy() {
        super.destroy();
        this._dmm.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onChanged, this);
        this._dmm.removeEventListener('POPPER_SHOW', this.onRollToTop, this);
        this._dmm.removeEventListener('POPPER_HIDE', this.onRollToDown, this);
      }

      public get toggler() {
        return this._toggler;
      }

      protected onChanged(e) {
        this.dispatchEvent(new egret.Event(eui.UIEvent.CHANGE, false, false, e.data));
      }

      public hide() {
        this._dmm.hide();
      }

      protected onRollToTop() {
        egret.Tween.removeTweens(this._toggleArrow);
        egret.Tween.get(this._toggleArrow).to({ rotation: 180 }, 200);
      }

      protected onRollToDown() {
        egret.Tween.removeTweens(this._toggleArrow);
        egret.Tween.get(this._toggleArrow).to({ rotation: 0 }, 200);
      }
    }
  }
}
