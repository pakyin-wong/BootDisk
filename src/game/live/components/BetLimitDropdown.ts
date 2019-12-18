namespace we {
  export namespace live {
    export class BetLimitDropdown extends ui.Dropdown {
      protected _toggler: eui.Component;
      protected _scroller: ui.Scroller;
      protected _list: ui.List;

      constructor() {
        super();
      }

      public mount() {
        super.mount();
        const betLimitList = env.betLimits;
        const betLimitItems = betLimitList.map(data => {
          return `${data.minlimit} - ${data.maxlimit}`;
        });
        this.setItems(betLimitItems);
        this.selectedIndex = env.currentSelectedBetLimitIndex;
        this.addEventListener(eui.UIEvent.CHANGE, this.onChanged, this);
        dir.evtHandler.addEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitChanged, this);
      }

      protected destroy() {
        dir.evtHandler.removeEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitChanged, this);
      }

      protected onChanged(evt: eui.UIEvent) {
        env.currentSelectedBetLimitIndex = this.selectedIndex;
        dir.evtHandler.dispatch(core.Event.BET_LIMIT_CHANGE);
      }

      public get toggler() {
        return this._toggler;
      }

      protected onBetLimitChanged(evt: egret.Event) {
        this.selectedIndex = env.currentSelectedBetLimitIndex;
      }
    }
  }
}
