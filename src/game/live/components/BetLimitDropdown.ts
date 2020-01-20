namespace we {
  export namespace live {
    export class BetLimitDropdown extends ui.Dropdown {
      protected _toggler: eui.Component;
      protected _scroller: ui.Scroller;
      protected _list: ui.List;

      protected _toggleArrow: eui.Image;

      constructor() {
        super();
      }

      public mount() {
        super.mount();
        const betLimitList = env.betLimits;
        const betLimitItems = betLimitList.map(data => {
          return `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`;
        });
        this.setItems(betLimitItems);
        this.selectedIndex = env.currentSelectedBetLimitIndex;
        this.addEventListener(eui.UIEvent.CHANGE, this.onChanged, this);
        dir.evtHandler.addEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitChanged, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.onLanguageChanged, this);
      }

      protected destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitChanged, this);
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.onLanguageChanged, this);
      }

      protected onLanguageChanged(evt: eui.UIEvent) {
        this.updateLabel();
      }

      protected onChanged(evt: eui.UIEvent) {
        env.currentSelectedBetLimitIndex = this.selectedIndex;
        dir.evtHandler.dispatch(core.Event.BET_LIMIT_CHANGE);
      }

      public get toggler() {
        return this._toggler;
      }

      protected onToggle() {
        super.onToggle();
        this.updateLabel();
      }

      protected updateLabel() {
        this._label.text = `${i18n.t('baccarat.betLimitshort')} ${this._items.length > 0 ? this._items[this._selectedIndex] : ''}`;
        if (this._toggleArrow) {
          this._toggleArrow.rotation = this._scroller.isCollapsed() ? 0 : 180;
        }
      }

      protected onBetLimitChanged(evt: egret.Event) {
        this.selectedIndex = env.currentSelectedBetLimitIndex;
      }
    }
  }
}
