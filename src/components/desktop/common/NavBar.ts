namespace components {
  export class NavBar extends eui.Component implements eui.UIComponent {
    private userInfo: eui.Group;
    private userInfoWindow: components.UserInfoWindow;
    private balance: eui.Label;

    public constructor() {
      super();
      this.skinName = utils.getSkin('NavBar');
      this.userInfo.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onUserInfoOver, this);
      this.userInfo.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onUserInfoOut, this);
      this.userInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUserInfoTap, this);
      dir.evtHandler.addEventListener(enums.event.event.BALANCE_UPDATE, this.processBalanceEvent, this);
    }

    public processBalanceEvent(evt: egret.Event) {
      this.balance.text = EnumHelpers.getKeyByValue(enums.socket.Currency, env.currency) + ' ' + env.balance.toString();
    }

    protected partAdded(partName: string, instance: any): void {
      super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
      super.childrenCreated();
    }

    private onUserInfoOver() {
      document.body.style.cursor = 'pointer';
    }

    private onUserInfoOut() {
      document.body.style.cursor = 'auto';
    }

    private onUserInfoTap() {
      this.userInfoWindow.visible = true;
    }
  }
}
