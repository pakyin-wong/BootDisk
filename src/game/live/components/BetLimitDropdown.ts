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
          return `${data.minLimit} - ${data.maxLimit}`;
        });
        this.setItems(betLimitItems);
        this.selectedIndex = env.currentSelectedBetLimitIndex;
        this.addEventListener(eui.UIEvent.CHANGE, this.onChanged, this);
      }

      protected onChanged(evt: eui.UIEvent) {
        env.currentSelectedBetLimitIndex = this.selectedIndex;
        dir.evtHandler.dispatch(core.Event.BET_LIMIT_CHANGE);
      }

      public get toggler() {
        return this._toggler;
      }
    }
  }
}
