namespace components {
  export class LobbyBacarratListItem extends eui.Component implements eui.UIComponent {
    private rect: eui.Rect;
    public constructor() {
      super();
      this.skinName = utils.getSkin('LobbyBacarratListItem');
      this.visible = false;
      this.touchEnabled = true;
      this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    public setData(test: any) {
      this.rect.fillColor = test;
      this.visible = true;
    }

    private onClick() {
      console.log('cick', this.rect.fillColor);
    }
  }
}
