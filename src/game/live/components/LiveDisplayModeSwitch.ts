namespace we {
  export namespace live {
    export class LiveDisplayModeSwitch extends we.core.BaseEUI {
      private container: eui.Group;
      private buttons = ['lobby_mode_01', 'lobby_mode_02'];
      private images: we.ui.BaseImageButton[] = [];
      private selectedIndex: number;

      constructor() {
        super();
        this.right = 0;
        this.verticalCenter = 0;
        this.container = new eui.Group();
        const hlayout = new eui.HorizontalLayout();
        hlayout.gap = 20;
        this.container.layout = hlayout;
        this.buttons.forEach((btn, idx) => {
          const img = new we.ui.BaseImageButton();
          img.skinName = utils.getSkin('imagebutton/ImageButtonSkinLobby');
          img.currentState = btn;
          img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemClick.bind(this, idx), this);
          //   img.height = 50;
          //   img.width = 50;
          this.container.addChild(img);
          this.images.push(img);
        });
        this.addChild(this.container);
      }

      public mount() {
        // todo better on mounr check
        // for setting initial active item,
        // need wait mounted otherwise will have state bug
        window.requestAnimationFrame(() => {
          // set initial active btn
          this._setSelectedIndex(1);
        });
      }

      private _setSelectedIndex(selectedIndex: number) {
        this.selectedIndex = selectedIndex;
        this.images.forEach((img, idx) => {
          if (idx === selectedIndex) {
            console.log('yes', img);
          } else {
            console.log('noo', img);
          }
          img.active = idx === selectedIndex;
        });
        dir.evtHandler.dispatch(core.Event.LIVE_DISPLAY_MODE, selectedIndex);
      }

      public onItemClick(index: number) {
        this._setSelectedIndex(index);
      }
    }
  }
}
