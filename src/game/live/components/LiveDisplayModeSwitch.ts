namespace we {
  export namespace live {
    export class LiveDisplayModeSwitch extends we.core.BaseEUI {
      private container: eui.Group;
      private buttons = ['d_lobby_icon_view_01_none_png', 'd_lobby_icon_view_02_none_png', 'd_lobby_icon_view_03_none_png'];
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
          const img = new eui.Image();
          img.source = RES.getRes(btn);
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
          img.source = RES.getRes(source);
        });
      }

      public onItemClick(index: number) {
        this._setSelectedIndex(index);
      }
    }
  }
}
