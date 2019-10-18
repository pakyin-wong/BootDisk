namespace components {
  export class LobbyBacarratListItem extends eui.Component implements eui.UIComponent {
    private rect: eui.Rect;
    public constructor() {
      super();
      this.skinName = utils.getSkin('LobbyBacarratListItem');
      this.visible = false;
    }

    public setData(test: any) {
      this.rect.fillColor = test;
      this.visible = true;
    }
  }
}
