namespace components {
  export class LobbyBacarratListItem extends eui.Component implements eui.UIComponent {
    private rect: eui.Rect;
    public constructor() {
      super();
      this.skinName = utils.getSkin('LobbyBacarratListItem');
      this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    public setData(data: any) {
      if (data === null) {
        this.visible = false;
      } else {
        this.rect.fillColor = data;
        this.visible = true;
      }
    }

    private onClick() {
      console.log('cick', this.rect.fillColor);
    }
  }
}
