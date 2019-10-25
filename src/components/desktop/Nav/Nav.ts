namespace components {
  export class Nav extends BaseEUI {
    private _logo: eui.Image;
    private _user: eui.Label;
    private _time: eui.Label;
    private _profilePrc: eui.Image;
    private _userInfo_toggle: eui.Group;
    private _userInfo: components.Popper;
    private _menu_toggle: eui.Image;
    private _menu: components.Popper;
    private _balance: eui.Label;

    public constructor() {
      super('Nav');

      dir.evtHandler.addEventListener(enums.event.event.BALANCE_UPDATE, this.updateBalance, this);
    }

    private updateBalance() {
      this._balance.text = EnumHelpers.getKeyByValue(enums.socket.Currency, env.currency) + ' ' + env.balance;
    }

    protected mount() {
      this._userInfo.setToggle(this._userInfo_toggle);
      this._userInfo.dismissByOutside = true;

      this._menu.setToggle(this._menu_toggle);
      this._menu.dismissByOutside = true;
    }
  }
}
