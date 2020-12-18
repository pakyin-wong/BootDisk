namespace we {
  export namespace live {
    export class MobileLobbyGridLayoutSwitch extends ALobbyGridLayoutSwitch {
      private buttons = ['lobby_mode_01', 'lobby_mode_02'];
      private image: we.ui.BaseImageButton;

      protected mount() {
        super.mount();
        this.image = new we.ui.BaseImageButton();
        this.image.percentWidth = 100;
        this.image.percentHeight = 100;
        this.image.currentState = this.buttons[env.lobbyGridType];
        this.image.skinName = utils.getSkinByClassname('MobileLobbyGridLayoutSwitch');
        this.image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
        // this.image.useColorFilter = true;
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
