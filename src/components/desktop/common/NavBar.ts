namespace components {
  export class NavBar extends eui.Component implements eui.UIComponent {
    private userInfo: eui.Group;
    private userInfoWindow: components.UserInfoWindow;

    public constructor() {
      super();
      this.addEventListener(eui.UIEvent.COMPLETE, this.mount, this);
      this.skinName = utils.getSkin('NavBar');
      this.userInfo.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onUserInfoOver, this);
      this.userInfo.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onUserInfoOut, this);
      this.userInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUserInfoTap, this);
      this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
      this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
    }

    protected partAdded(partName: string, instance: any): void {
      super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
      super.childrenCreated();
      mouse.setButtonMode(this.userInfo, true);
    }

    protected mount(): void {}

    private onUserInfoOver() {
      console.log('child rollover');
    }

    private onUserInfoOut() {
      console.log('child rollout');
    }

    private onUserInfoTap() {
      this.userInfoWindow.visible = true;
    }
    private onRollOver() {
      console.log('rollover');
    }
    private onRollOut() {
      console.log('rollout');
    }
  }
}
