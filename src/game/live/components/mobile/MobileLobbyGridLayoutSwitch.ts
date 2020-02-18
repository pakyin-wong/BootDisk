namespace we {
  export namespace live {
    export class MobileLobbyGridLayoutSwitch extends ALobbyGridLayoutSwitch {
      private buttons = ['lobby_mode_02', 'lobby_mode_01'];
      private image: we.ui.BaseImageButton;

      constructor() {
        super();
        this.image = new we.ui.BaseImageButton();
        this.image.currentState = this.buttons[env.lobbyGridType];
        this.image.skinName = utils.getSkin('imagebutton/ImageButtonSkinLobby');
        this.image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
        this.image.useColorFilter = true;
        this.addChild(this.image);
      }

      protected onToggle() {
        const nextLayoutType: number = (env.lobbyGridType + 1) % 2;
        this.setGridType(nextLayoutType);
        this.image.currentState = this.buttons[nextLayoutType];
      }
    }
  }
}
