namespace we {
  export namespace ui {
    export class SidePanelAllGameDropdown extends ui.Dropdown {
      protected _toggler: eui.Component;
      protected _scroller: ui.Scroller;
      protected _list: ui.List;

      protected _toggleArrow: eui.Image;

      constructor() {
        super();
      }

      public mount() {
        super.mount();
        const gameList = ['allGame', ...utils.EnumHelpers.values(core.LiveGameTab)];
        const gameListItems = gameList.map(game => {
          return i18n.t(`live.gametype.${game}`);
        });
        this.setItems(gameListItems);
        this.selectedIndex = 0;
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.onLanguageChanged, this);
      }

      protected destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.onLanguageChanged, this);
      }

      protected onLanguageChanged(evt: eui.UIEvent) {
        const gameList = ['allGame', ...utils.EnumHelpers.values(core.LiveGameTab)];
        const gameListItems = gameList.map(game => {
          return i18n.t(`live.gametype.${game}`);
        });
        this.setItems(gameListItems);
        this.updateLabel();
      }

      public get toggler() {
        return this._toggler;
      }

      protected onToggle() {
        this.updateLabel();
      }

      protected updateLabel() {
        this._label.text = this._items.length > 0 ? this._items[this._selectedIndex] : '';
        this._toggleArrow.rotation = this._scroller.isCollapsed() ? 0 : 180;
      }
    }
  }
}
