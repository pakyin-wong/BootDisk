namespace we {
  export namespace live {
    export class LiveDisplayModeSwitch extends ALobbyGridLayoutSwitch {
      private container: eui.Group;
      private buttons = ['lobby_mode_01', 'lobby_mode_02', 'lobby_mode_03'];
      private images: we.ui.BaseImageButton[] = [];
      private selectedIndex: number;

      constructor() {
        super();
      }

      protected mount() {
        super.mount();
        this.right = 0;
        this.verticalCenter = 0;
        this.container = new eui.Group();
        const hlayout = new eui.HorizontalLayout();
        hlayout.gap = 20;
        this.container.layout = hlayout;
        this.buttons.forEach((btn, idx) => {
          const img = new we.ui.BaseImageButton();
          img.currentState = btn;
          img.skinName = utils.getSkinByClassname('ImageButtonSkinLobby');
          img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemClick.bind(this, idx), this);
          //   img.height = 50;
          //   img.width = 50;
          this.container.addChild(img);
          this.images.push(img);
        });
        this.addChild(this.container);
        // set initial active btn
        this._setSelectedIndex(1);
      }

      private _setSelectedIndex(selectedIndex: number) {
        this.selectedIndex = selectedIndex;
        this.images.forEach((img, idx) => {
          img.active = idx === selectedIndex;
        });
        this.setGridType(selectedIndex);
      }

      public onItemClick(index: number) {
        if (!env.livepageLocked) {
          this._setSelectedIndex(index);
        }
      }
    }
  }
}
