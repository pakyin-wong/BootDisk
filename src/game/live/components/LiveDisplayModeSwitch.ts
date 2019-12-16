namespace we {
  export namespace live {
    export class LiveDisplayModeSwitch extends we.core.BaseEUI {
      private container: eui.Group;
      private buttons = ['lobby_mode_01', 'lobby_mode_02'];
      private images = [];
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
          const img = new ui.BaseImageButton();
          img.skinName = utils.getSkin('imagebutton/ImageButtonSkinLobby');
          img.currentState = btn;
          img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemClick.bind(this, idx), this);
          //   img.height = 50;
          //   img.width = 50;
          this.container.addChild(img);
          this.images.push(img);
        });
        this.addChild(this.container);
        this._setSelectedIndex(1);
      }

      private _setSelectedIndex(selectedIndex: number) {
        this.selectedIndex = selectedIndex;
        this.images.forEach((img, idx) => {
          let source = this.buttons[idx];
          if (idx === selectedIndex) {
            source = source.replace('none', 'hover');
          }
          img.resName = source;
        });
        dir.evtHandler.dispatch(core.Event.LIVE_DISPLAY_MODE, selectedIndex);
      }

      public onItemClick(index: number) {
        this._setSelectedIndex(index);
      }
    }
  }
}
