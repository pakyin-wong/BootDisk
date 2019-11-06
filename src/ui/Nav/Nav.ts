namespace we {
  export namespace ui {
    export class Nav extends core.BaseEUI {
      private _logo: eui.Image;
      private _user: eui.Label;
      private _time: eui.Label;
      private _profilePrc: eui.Image;
      private _userInfo_toggle: eui.Group;
      private _userInfo: Popper;
      private _menu_toggle: eui.Image;
      private _menu: Popper;
      private _balance: eui.Label;

      public constructor() {
        super('Nav');

        dir.evtHandler.addEventListener(core.Event.BALANCE_UPDATE, this.updateBalance, this);
      }

      private updateBalance() {
        this._balance.text = utils.EnumHelpers.getKeyByValue(core.Currency, env.currency) + ' ' + env.balance;
      }

      private onUpdateTimer(e: egret.Event) {
        this._time.text = moment(env.currTime).format('DD-MM-YYYY, h:mm:ss a');
        // this._time.text = new Date(env.currTime).toISOString();
      }

      protected mount() {
        this._userInfo.setToggler(this._userInfo_toggle);
        this._userInfo.dismissOnClickOutside = true;

        this._menu.setToggler(this._menu_toggle);
        this._menu.dismissOnClickOutside = true;

        this.updateBalance();

        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.onUpdateTimer, this);
      }
    }
  }
}
